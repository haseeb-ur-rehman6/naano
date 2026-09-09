import Image from "next/image";
import Link from "next/link";

const sessionPoints = [
  "Creator strategy",
  "Campaign format",
  "Budget recommendation",
];

export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-gradient-to-b from-white via-[#f3f8ff] to-[#eaf3ff] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="lp-eyebrow text-[#315B7C]">Ready to launch?</p>
        <h2 className="lp-h2-cta mt-5">
          Your next creator campaign starts here.
        </h2>
        <p className="lp-lead mx-auto mt-4 max-w-xl">
          Get a clear creator strategy, campaign format and estimated budget for
          your next launch.
        </p>

        <div className="mx-auto mt-10 max-w-md rounded-[1.75rem] border border-border bg-white p-6 text-left shadow-[0_24px_70px_-36px_rgba(23,24,28,0.4)] sm:p-8">
          <div className="flex items-center gap-3">
            <Image
              src="/images/photo-book-call.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Campaign strategy call
            </p>
          </div>

          <h3 className="mt-5 text-2xl font-bold tracking-tight">
            30-minute working session
          </h3>
          <p className="mt-2 text-sm text-muted">
            Leave with a concrete plan for your next creator campaign.
          </p>

          <ul className="mt-6 space-y-3">
            {sessionPoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm">
                <span className="h-2 w-2 rounded-[2px] bg-foreground/25" />
                {point}
              </li>
            ))}
          </ul>

          <Link
            href="/creators"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Book a campaign call
            <span aria-hidden>→</span>
          </Link>
          <p className="mt-3 text-center text-xs text-muted">
            Pick a time on the next page.
          </p>

          <Link
            href="/register"
            className="mt-6 flex items-center justify-center gap-1 text-sm text-muted transition hover:text-foreground"
          >
            Prefer to start yourself?{" "}
            <span className="font-semibold text-foreground">Start for free →</span>
          </Link>
        </div>

        <p className="mt-10 text-sm text-muted">
          Trusted by B2B teams building creator-led acquisition.
        </p>
      </div>
    </section>
  );
}
