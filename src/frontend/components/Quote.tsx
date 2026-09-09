"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const quoteWords = [
  "We",
  "manage",
  "€10M+",
  "of",
  "influence",
  "budget",
  "every",
  "year.",
  "For",
  "B2B,",
  "Naano",
  "simply",
  "makes",
  "our",
  "life",
  "easier",
];

export default function Quote() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const next = scrollable > 0 ? scrolled / scrollable : 1;
      setProgress(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-white">
      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-center px-4 py-24 sm:px-6">
        <Image
          src="/images/logo-zmirov.png"
          alt="Zmirov Communication"
          width={180}
          height={50}
          className="mb-10 h-10 w-auto object-contain sm:h-12"
        />

        <blockquote className="lp-quote mx-auto max-w-[1160px] text-balance text-center">
          <span aria-hidden>“</span>
          {quoteWords.map((word, index) => {
            const start = index / quoteWords.length;
            const end = (index + 1) / quoteWords.length;
            let opacity = 0.14;
            if (progress >= end) opacity = 1;
            else if (progress > start) {
              opacity = 0.14 + ((progress - start) / (end - start)) * 0.86;
            }

            const isLast = index === quoteWords.length - 1;

            return (
              <span
                key={`${word}-${index}`}
                className="inline-block transition-[opacity,color] duration-75"
                style={{
                  opacity,
                  color: isLast ? "#1240c4" : undefined,
                }}
              >
                {word}
                {!isLast && "\u00A0"}
              </span>
            );
          })}
          <span aria-hidden>”</span>
        </blockquote>

        <div className="mt-12 flex flex-col items-center text-center">
          <Image
            src="/images/photo-david-zmirov.png"
            alt="David Zmirov"
            width={104}
            height={104}
            className="h-[88px] w-[88px] rounded-full object-cover object-[center_18%] sm:h-[104px] sm:w-[104px]"
          />
          <p className="mt-5 text-lg font-bold text-foreground sm:text-[19px]">
            David Zmirov
          </p>
          <p className="mt-1 text-sm text-muted sm:text-base">
            CEO, Zmirov Communication
          </p>
          <p className="mt-0.5 text-sm text-muted/80">Influence agency</p>
        </div>
      </div>
    </section>
  );
}
