#!/usr/bin/env python3
"""Automatic Cursor agent capture: prompt + final response only."""

from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

AUTHOR = "haseeb"
PROJECT = "naano"
TOOL = "cursor"


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


def utc_stamp_for_filename(iso: str) -> str:
    # 2026-09-09T12:05:59.253Z -> 2026-09-09_12-05-59
    return (
        iso.replace("T", "_")
        .replace(":", "-")
        .split(".")[0]
        .replace("Z", "")
    )


def project_root(payload: dict) -> Path:
    env = os.environ.get("CURSOR_PROJECT_DIR")
    if env:
        return Path(env)
    roots = payload.get("workspace_roots") or []
    if roots:
        return Path(roots[0])
    return Path.cwd()


def model_name(payload: dict) -> str:
    return (
        payload.get("model")
        or payload.get("model_id")
        or "unknown"
    )


def session_id(payload: dict) -> str:
    return payload.get("conversation_id") or payload.get("session_id") or "unknown-session"


def load_json(path: Path, default):
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default


def save_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def short_id(sid: str) -> str:
    return sid.split("-")[0] if sid else "unknown"


def render_header(meta: dict) -> str:
    return (
        "---\n"
        f"session_id: {meta['session_id']}\n"
        f"date: {meta['date']}\n"
        f"author: {meta['author']}\n"
        f"model: {meta['model']}\n"
        f"tool: {meta['tool']}\n"
        f"project: {meta['project']}\n"
        f"total_exchanges: {meta['total_exchanges']}\n"
        f"first_prompt_time: {meta['first_prompt_time']}\n"
        f"last_prompt_time: {meta['last_prompt_time']}\n"
        "---\n"
        f"\n# Session Log - {meta['date']}\n"
        f"\nSession: `{short_id(meta['session_id'])}` | "
        f"Project: `{meta['project']}` | Author: `{meta['author']}`\n"
        "\n---\n"
    )


def ensure_session_file(logs_dir: Path, state: dict, sid: str, model: str, ts: str) -> Path:
    """Create or resolve the per-session markdown log file."""
    path_str = state.get("log_path")
    if path_str and Path(path_str).exists():
        return Path(path_str)

    stamp = utc_stamp_for_filename(ts)
    filename = f"{stamp}_{sid}.md"
    path = logs_dir / filename

    meta = {
        "session_id": sid,
        "date": ts[:10],
        "author": AUTHOR,
        "model": model,
        "tool": TOOL,
        "project": PROJECT,
        "total_exchanges": 0,
        "first_prompt_time": ts,
        "last_prompt_time": ts,
    }
    path.write_text(render_header(meta) + "\n", encoding="utf-8")
    state["log_path"] = str(path)
    state["meta"] = meta
    return path


def rewrite_header(path: Path, meta: dict) -> None:
    text = path.read_text(encoding="utf-8")
    # Split after the second '---' that closes YAML, then session title block ends at next '---'
    parts = text.split("\n---\n", 2)
    if len(parts) >= 3:
        body = parts[2]
        # body may start with blank / title leftover; keep everything after the header separator
        # Our format: header YAML, blank, title block, blank, ---, then entries
        # After split on first two ---, parts[2] is content after the third --- line... wait
        # Actually: "---\nYAML\n---\n\n# Session...\n\n---\n\nentries"
        # split("\n---\n", 2) with max 2:
        # parts[0] = "---\nYAML"  NO - the string starts with --- so first split is weird
        pass

    # Rebuild: keep entries only (everything after the header's trailing ---\n)
    marker = "\n---\n\n"
    # Find the LOG_ENTRY start; if none, keep trailing after third ---
    idx = text.find("[LOG_ENTRY")
    if idx == -1:
        path.write_text(render_header(meta) + "\n", encoding="utf-8")
        return
    entries = text[idx:]
    path.write_text(render_header(meta) + "\n" + entries, encoding="utf-8")


def append_entry(path: Path, entry_type: str, num: int, sid: str, ts: str, model: str, body: str) -> None:
    block = (
        f"[LOG_ENTRY type={entry_type} num={num} session={short_id(sid)}]\n"
        f"timestamp: {ts}\n"
        f"model: {model}\n"
        f"\n{body.rstrip()}\n"
        f"\n"
    )
    with path.open("a", encoding="utf-8") as f:
        f.write(block)


def flush_pending_response(logs_dir: Path, state: dict, sid: str) -> None:
    pending = state.get("pending_response")
    if not pending:
        return
    path = Path(state["log_path"])
    meta = state["meta"]
    num = pending["num"]
    append_entry(
        path,
        "RESPONSE",
        num,
        sid,
        pending["timestamp"],
        pending["model"],
        pending["text"],
    )
    meta["model"] = pending["model"]
    meta["total_exchanges"] = max(meta.get("total_exchanges", 0), num)
    rewrite_header(path, meta)
    state["pending_response"] = None
    state["awaiting_response"] = False


def handle_prompt(payload: dict, logs_dir: Path, state_path: Path) -> dict:
    sid = session_id(payload)
    state = load_json(state_path, {})
    # Flush any unflushed response from previous turn before new prompt
    if state.get("pending_response"):
        flush_pending_response(logs_dir, state, sid)

    ts = utc_now()
    model = model_name(payload)
    path = ensure_session_file(logs_dir, state, sid, model, ts)
    meta = state["meta"]

    num = int(state.get("exchange_num", 0)) + 1
    state["exchange_num"] = num
    state["awaiting_response"] = True
    state["current_generation_id"] = payload.get("generation_id")

    prompt = payload.get("prompt") or ""
    append_entry(path, "PROMPT", num, sid, ts, model, prompt)

    meta["last_prompt_time"] = ts
    meta["model"] = model
    meta["total_exchanges"] = num
    if not meta.get("first_prompt_time"):
        meta["first_prompt_time"] = ts
    rewrite_header(path, meta)

    save_json(state_path, state)
    return {"continue": True}


def handle_response(payload: dict, logs_dir: Path, state_path: Path) -> dict:
    sid = session_id(payload)
    state = load_json(state_path, {})
    if not state.get("log_path"):
        # Response without prior prompt in this process — create session shell
        ts = utc_now()
        ensure_session_file(logs_dir, state, sid, model_name(payload), ts)
        state["exchange_num"] = state.get("exchange_num", 0) or 1

    text = payload.get("text") or ""
    state["pending_response"] = {
        "num": int(state.get("exchange_num", 1)),
        "timestamp": utc_now(),
        "model": model_name(payload),
        "text": text,
        "generation_id": payload.get("generation_id"),
    }
    # Keep overwriting until stop / next prompt so only the last assistant
    # message for the turn is recorded.
    save_json(state_path, state)
    return {}


def handle_stop(payload: dict, logs_dir: Path, state_path: Path) -> dict:
    sid = session_id(payload)
    state = load_json(state_path, {})
    if state.get("log_path") and state.get("pending_response"):
        flush_pending_response(logs_dir, state, sid)
        save_json(state_path, state)
    return {}


def main() -> None:
    try:
        raw = sys.stdin.read()
        payload = json.loads(raw) if raw.strip() else {}
    except Exception:
        # Fail open
        print("{}")
        return

    event = payload.get("hook_event_name") or ""
    root = project_root(payload)
    logs_dir = root / ".agent-logs"
    logs_dir.mkdir(parents=True, exist_ok=True)
    state_dir = root / ".cursor" / "hooks" / "state"
    state_dir.mkdir(parents=True, exist_ok=True)

    sid = session_id(payload)
    state_path = state_dir / f"{sid}.json"

    try:
        if event == "beforeSubmitPrompt":
            out = handle_prompt(payload, logs_dir, state_path)
        elif event == "afterAgentResponse":
            out = handle_response(payload, logs_dir, state_path)
        elif event == "stop":
            out = handle_stop(payload, logs_dir, state_path)
        else:
            out = {}
    except Exception as exc:
        # Fail open, but leave a breadcrumb for debugging install issues
        err_path = logs_dir / ".capture-errors.log"
        with err_path.open("a", encoding="utf-8") as f:
            f.write(f"{utc_now()} event={event} error={exc!r}\n")
        out = {"continue": True} if event == "beforeSubmitPrompt" else {}

    sys.stdout.write(json.dumps(out))
    sys.stdout.flush()


if __name__ == "__main__":
    main()
