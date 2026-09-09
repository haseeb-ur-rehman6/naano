"use client";

import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "For companies", href: "#marketplace" },
  { label: "For creators", href: "#creators" },
  { label: "For agencies", href: "#how-it-works" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Resources", href: "#faq", hasMenu: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Matches naano.com: logo left, links + actions grouped on the right */}
      <div className="flex w-full items-center justify-between px-4 py-4 sm:px-8 lg:px-14">
        <a href="#" className="shrink-0">
          <Image
            src="/images/naano-logo-nav.png"
            alt="naano"
            width={120}
            height={30}
            className="h-[30px] w-auto"
            priority
          />
        </a>

        <div className="hidden items-center gap-2.5 lg:flex">
          <nav className="mr-[22px] flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-[5px] text-[15px] font-medium text-[#17181C] transition hover:opacity-70"
              >
                {link.label}
                {link.hasMenu && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-2 py-2 text-[15px] font-medium text-[#17181C]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[15px] w-[15px] stroke-current"
              fill="none"
              strokeWidth="1.8"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
            </svg>
            EN
          </button>

          <a
            href="#signin"
            className="whitespace-nowrap rounded-full border border-[#E8E6E2] bg-white px-[18px] py-2.5 text-[15px] font-semibold text-[#17181C]"
          >
            Sign in
          </a>
          <a
            href="#signup"
            className="whitespace-nowrap rounded-full bg-[#17181C] px-5 py-[11px] text-[15px] font-semibold text-white transition hover:opacity-90"
          >
            Sign up
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#E8E6E2] bg-white text-[#17181C] lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-[#E8E6E2] bg-white px-4 py-3 lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-1.5 py-3 text-base font-medium text-[#17181C]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-2 flex flex-col gap-2 border-t border-[#E8E6E2] pt-3">
            <a
              href="#signin"
              className="rounded-full border border-[#E8E6E2] bg-white px-4 py-3 text-center text-[15px] font-semibold text-[#17181C]"
              onClick={() => setOpen(false)}
            >
              Sign in
            </a>
            <a
              href="#signup"
              className="rounded-full bg-[#17181C] px-4 py-3 text-center text-[15px] font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
