import Image from "next/image";

const productLinks = [
  "Features",
  "Pricing",
  "FAQs",
  "Blog",
  "Reports & benchmarks",
  "About",
];

const companyLinks = [
  "Help Center",
  "Privacy",
  "Terms of Sale & Use",
  "For AI agents",
  "llms.txt",
  "pricing.md",
  "Reports & data",
];

const pressLinks = [
  "Interview Thomas Marcelle, Xymag.tv",
  "Naano on FounderTrace",
  "Naano on TechnicalBeep",
];

const resourceLinksLeft = [
  "LinkedIn creator marketplace",
  "B2B influencer marketing cost",
  "LinkedIn Creator Marketplace in Europe",
  "Creator Marketplace explained",
  "Creator-led growth for B2B",
  "Nano vs macro creators in B2B",
  "Founder-led distribution for SaaS",
];

const resourceLinksRight = [
  "Best B2B influencer platforms 2026",
  "Launch a LinkedIn creator campaign",
  "How to pay B2B creators",
  "What is a B2B creator marketplace?",
  "LinkedIn Ads vs creator-led CPL",
  "B2B influence on LinkedIn",
  "Naano vs alternatives",
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-foreground/75 transition hover:text-foreground"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-sky-100 bg-[#eef5ff] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <Image
        src="/images/results-clouds.png"
        alt=""
        fill
        className="object-cover object-top opacity-40"
        sizes="100vw"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_2.1fr]">
          <div>
            <Image
              src="/images/naano-logo-nav.png"
              alt="naano"
              width={120}
              height={28}
              className="h-7 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Turn LinkedIn creators into your best acquisition channel.
            </p>
            <a
              href="#"
              aria-label="Naano on LinkedIn"
              className="mt-5 inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#0A66C2] text-[10px] font-bold text-white"
            >
              in
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.6fr]">
            <LinkColumn title="Product" links={productLinks} />
            <LinkColumn title="Company" links={companyLinks} />
            <LinkColumn title="Press" links={pressLinks} />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Resources
              </p>
              <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
                <ul className="space-y-2.5">
                  {resourceLinksLeft.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-foreground/75 transition hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="mt-2.5 space-y-2.5 sm:mt-0">
                  {resourceLinksRight.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-foreground/75 transition hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-sky-200/70 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © 2026 naano. All rights reserved.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition hover:text-foreground"
          >
            <span className="text-[#00b67a]">★</span>
            Trustpilot reviews
          </a>
        </div>
      </div>
    </footer>
  );
}
