import Image from "next/image";
import Link from "next/link";

const plans = [
  {
    badge: "SELF-SERVE",
    title: "Run it yourself.",
    description:
      "For teams that want the infrastructure to run creator campaigns in-house.",
    price: "€0",
    priceNote: "/ month",
    features: [
      "Creator marketplace access",
      "AI-powered brief creation",
      "Track clicks, companies and pipeline",
      "Automatic creator payouts",
    ],
    cta: "Start for free",
    href: "/register",
    button: false,
  },
  {
    badge: "MANAGED CAMPAIGNS",
    title: "Get your time back.",
    description:
      "For teams that want Naano to operate their creator channel end to end.",
    price: "Custom quote",
    priceNote: "",
    features: [
      "Campaign strategy and positioning",
      "Creator sourcing and coordination",
      "Brief creation and campaign launch",
      "Reporting and optimisation",
    ],
    cta: "Book a campaign call",
    href: "/creators",
    button: true,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-[#f4f6f8] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <Image
        src="/images/results-clouds.png"
        alt=""
        width={1600}
        height={400}
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-60"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="lp-h2-cta">Pricing.</h2>
          <p className="lp-lead-strong mt-[26px]">
            Start free. Upgrade when you want your time back.
          </p>
          <p className="lp-lead mt-3">
            Choose whether you want to run creator campaigns in-house or have
            Naano operate them.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.badge}
              className="flex flex-col rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_16px_50px_-30px_rgba(23,24,28,0.35)] sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {plan.badge}
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-tight">
                {plan.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {plan.description}
              </p>

              <div className="mt-8">
                <span className="text-4xl font-bold tracking-tight">
                  {plan.price}
                </span>
                {plan.priceNote && (
                  <span className="ml-1 text-sm text-muted">{plan.priceNote}</span>
                )}
              </div>

              <ul className="mt-8 flex-1 divide-y divide-border border-y border-border">
                {plan.features.map((feature) => (
                  <li key={feature} className="py-3 text-sm text-foreground/85">
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.button ? (
                <Link
                  href={plan.href}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {plan.cta}
                  <span aria-hidden>→</span>
                </Link>
              ) : (
                <Link
                  href={plan.href}
                  className="mt-8 inline-flex w-fit items-center gap-1 text-sm font-semibold text-foreground transition hover:opacity-70"
                >
                  {plan.cta}
                  <span aria-hidden>→</span>
                </Link>
              )}
            </article>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-muted">
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-foreground/20 text-[9px]">
            ✓
          </span>
          Campaign spend is separate. No lock-in. Cancel anytime.
        </p>
      </div>
    </section>
  );
}
