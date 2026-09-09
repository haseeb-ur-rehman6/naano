"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Naano?",
    answer:
      "Naano is a B2B LinkedIn creator marketplace: companies discover and book vetted creators for sponsored LinkedIn campaigns, each at a fixed price per post set by the creator. The marketplace spans creators from niche voices with around 1,000 followers to established B2B creators with audiences of several hundred thousand.",
  },
  {
    question: "How does Naano find the right creators?",
    answer:
      "Our matching engine scores every creator on audience fit, category relevance and engagement quality across LinkedIn, X and YouTube, so you rank creators by who actually reaches your buyers, not by follower count.",
  },
  {
    question: "Which networks do you support?",
    answer:
      "LinkedIn, X and YouTube today, with more on the way. You can compare creators and track performance across every network in one place.",
  },
  {
    question: "How does per-post pricing work?",
    answer:
      "Campaigns start from €20 per published post, you only pay for posts that go live, with no retainer. Prefer a hands-off setup? Done for you adds our team executing everything end to end.",
  },
  {
    question: "How does attribution work?",
    answer:
      "Naano places a tracking pixel at every stage of the funnel, so each click, lead, pipeline and revenue is tied back to the exact creator and post that drove it.",
  },
  {
    question: "Do you handle creator payouts?",
    answer:
      "Yes. Approve content and pay every creator in one click, securely via Stripe Connect, invoices and approvals are handled for you.",
  },
  {
    question: "What's the difference between Free and Done for you?",
    answer:
      "Free gives your team the platform to source creators and run simple campaigns yourselves. Done for you adds hands-on execution by the Naano team, sourcing, briefs, reporting and optimisation.",
  },
  {
    question: "Can I upgrade or cancel anytime?",
    answer:
      "Absolutely. Plans are month-to-month, you can upgrade, downgrade or cancel whenever you like.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16">
        <div>
          <h2 className="lp-h2">Frequently asked questions.</h2>
          <p className="lp-lead mt-4">
            Everything you need to know before getting started.
          </p>
          <a
            href="#cta"
            className="mt-6 inline-flex items-center gap-1 text-[15px] text-muted transition hover:text-foreground"
          >
            Still have questions?{" "}
            <span className="font-semibold text-foreground">
              Talk to our team
            </span>
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="lp-faq-q">{faq.question}</span>
                  <span
                    className={`shrink-0 text-muted transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ⌄
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-muted sm:text-base">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
