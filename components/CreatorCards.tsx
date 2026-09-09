import Image from "next/image";

const creators = [
  {
    name: "Thomas Higadère",
    meta: "Creator · B2B & AI · 34K followers",
    post: "How AI changed our prospecting workflow for wealth managers and private bankers.",
    image: "/images/marketplace-atmosphere.png",
    imageFit: "object-cover",
    stats: [
      { value: "42.8K", label: "Impressions" },
      { value: "312", label: "Clicks" },
      { value: "18", label: "Leads" },
    ],
    company: "lemlist",
    companyLogo: "/images/logo-lemlist.png",
    avatar: "/images/avatar-a.png",
  },
  {
    name: "Robin Tempe",
    meta: "Creator · Sales & AI · 12K followers",
    post: "I run my entire prospecting workflow through an AI. Here is how.",
    image: "/images/photo-claude-mcp-leadbay.png",
    imageFit: "object-cover",
    stats: [
      { value: "9K", label: "Impressions" },
      { value: "100", label: "Clicks" },
      { value: "50", label: "Leads" },
    ],
    company: "Leadbay",
    companyLogo: "/images/logo-leadbay.png",
    avatar: "/images/avatar-b.png",
  },
  {
    name: "Eric Djavid",
    meta: "Sales Leader · B2B · 40K followers",
    post: "Most sales teams spend 80% of their time on the wrong leads. Here is how I changed that.",
    image: "/images/photo-leadbay-app.png",
    imageFit: "object-cover",
    stats: [
      { value: "20K", label: "Impressions" },
      { value: "350", label: "Clicks" },
      { value: "80", label: "Leads" },
    ],
    company: "Leadbay",
    companyLogo: "/images/logo-leadbay.png",
    avatar: "/images/avatar-c.png",
  },
  {
    name: "Marina Panova",
    meta: "Content Creator · B2B · 34K followers",
    post: "How I build my 30-day LinkedIn content system, the exact playbook.",
    image: "/images/photo-marina-laptop.png",
    imageFit: "object-cover object-top",
    stats: [
      { value: "100K", label: "Impressions" },
      { value: "1,600", label: "Clicks" },
      { value: "320", label: "Leads" },
    ],
    company: "Abyssale",
    companyLogo: "/images/logo-abyssale.png",
    avatar: "/images/avatar-d.png",
  },
];

export default function CreatorCards() {
  return (
    <section id="creators" className="bg-[#f3f7fb] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {creators.map((creator) => (
            <article
              key={creator.name}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              <div className="flex items-start gap-2.5 p-3 pb-0">
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <p className="truncate text-[13px] font-bold">{creator.name}</p>
                    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] bg-[#0A66C2] text-[7px] font-bold text-white">
                      in
                    </span>
                  </div>
                  <p className="truncate text-[10px] text-muted">{creator.meta}</p>
                </div>
                <span className="text-sm text-muted" aria-hidden>
                  ···
                </span>
              </div>

              <p className="px-3 pt-3 text-[13px] font-semibold leading-snug">
                {creator.post}
              </p>

              <div className="relative mx-3 mt-3 aspect-[4/3] overflow-hidden rounded-xl bg-[#eef3f8]">
                <Image
                  src={creator.image}
                  alt=""
                  fill
                  className={creator.imageFit}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="mx-3 mt-3 grid grid-cols-3 gap-1 rounded-xl bg-[#f4f6f8] px-2 py-2.5 text-center">
                {creator.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-sm font-bold">{stat.value}</p>
                    <p className="text-[9px] font-medium uppercase tracking-wide text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-2 border-t border-border px-3 py-3">
                <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-muted">
                  <span>For</span>
                  <Image
                    src={creator.companyLogo}
                    alt={creator.company}
                    width={64}
                    height={16}
                    className="h-3.5 w-auto max-w-[72px] object-contain opacity-70 grayscale"
                  />
                </div>
                <a
                  href="#view-post"
                  className="shrink-0 text-[12px] font-semibold text-accent"
                >
                  View post ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-[15px] font-semibold text-white transition hover:opacity-90"
          >
            Get started
            <span aria-hidden>→</span>
          </a>
          <p className="mt-3 text-sm text-muted">
            Start free. Pay per post when you&apos;re ready.
          </p>
        </div>
      </div>
    </section>
  );
}
