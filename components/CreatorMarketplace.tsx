import Image from "next/image";

const creators = [
  {
    name: "Aymane Junior",
    niche: "AI · SaaS",
    country: "Germany",
    flag: "🇩🇪",
    bio: "I help B2B teams turn AI into clear GTM plays that buyers actually click.",
    matching: 97,
    followers: "14.1K",
    views: "18.7K",
    cost: "€360",
    avatar: "/images/avatar-a.png",
  },
  {
    name: "Emma Guetta",
    niche: "AI · Media / Content",
    country: "France",
    flag: "🇫🇷",
    bio: "Building audience-first content systems for SaaS brands on LinkedIn.",
    matching: 96,
    followers: "7.8K",
    views: "25.6K",
    cost: "€480",
    avatar: "/images/avatar-b.png",
  },
  {
    name: "Augustin Rudigoz",
    niche: "Productivity · Fintech",
    country: "France",
    flag: "🇫🇷",
    bio: "Sharing practical workflows for operators who want less busywork.",
    matching: 92,
    followers: "14K",
    views: "11.2K",
    cost: "€960",
    avatar: "/images/avatar-c.png",
  },
  {
    name: "Raghav Jerath",
    niche: "Growth / GTM · Software",
    country: "France",
    flag: "🇫🇷",
    bio: "Breaking down modern growth loops for early-stage B2B teams.",
    matching: 90,
    followers: "2.4K",
    views: "2.1K",
    cost: "€84",
    avatar: "/images/avatar-d.png",
  },
  {
    name: "Daniel Meisen",
    niche: "Growth / GTM · Agencies",
    country: "Germany",
    flag: "🇩🇪",
    bio: "Helping agencies productize LinkedIn influence into pipeline.",
    matching: 89,
    followers: "5.9K",
    views: "2.8K",
    cost: "€120",
    avatar: "/images/avatar-e.png",
  },
  {
    name: "Pierre Davadan",
    niche: "SaaS · AI",
    country: "France",
    flag: "🇫🇷",
    bio: "Founder-led content on shipping AI products people pay for.",
    matching: 89,
    followers: "4.2K",
    views: "2.2K",
    cost: "€84",
    avatar: "/images/avatar-f.png",
  },
];

const sidebarIcons = ["▦", "◎", "◆", "☰", "💬", "💳"];

const featureAvatars = [
  "/images/avatar-a.png",
  "/images/avatar-b.png",
  "/images/avatar-c.png",
  "/images/avatar-d.png",
  "/images/avatar-e.png",
];

const countryFlags = ["🇫🇷", "🇺🇸", "🇩🇪", "🇬🇧", "🇪🇸", "🇨🇦", "🇳🇱", "🇧🇪"];

export default function CreatorMarketplace() {
  return (
    <section
      id="marketplace"
      className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section intro */}
        <div className="mx-auto max-w-[840px] text-center">
          <span className="lp-eyebrow-soft inline-flex items-center gap-2 rounded-full border border-[#11131814] bg-white/70 px-3.5 py-1.5 text-[#555b63] shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            The Naano creator marketplace
          </span>
          <h2 className="lp-h2-xl mx-auto mt-6 max-w-[840px] text-balance">
            Work with all the best creators.
          </h2>
          <p className="lp-lead mx-auto mt-[18px] max-w-[650px] text-[#525861]">
            Find the right B2B voices, compare their audience fit, and book
            every collaboration from one place.
          </p>
        </div>

        {/* Soft blue atmosphere + browser mockup */}
        <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-sky-100 bg-[#eaf4ff] p-3 sm:p-5 lg:p-8">
          <Image
            src="/images/marketplace-atmosphere.png"
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="100vw"
          />

          <div className="relative overflow-hidden rounded-[1.4rem] border border-black/5 bg-white shadow-[0_30px_80px_-40px_rgba(23,24,28,0.45)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="mx-auto flex max-w-xs flex-1 items-center justify-center gap-1.5 rounded-full bg-[#f4f4f5] px-3 py-1 text-[11px] text-muted">
                <span className="text-[10px]">🔒</span>
                naano.co/marketplace
              </div>
            </div>

            <div className="flex min-h-[420px]">
              {/* Sidebar */}
              <aside className="hidden w-14 shrink-0 flex-col items-center gap-3 border-r border-border py-4 sm:flex">
                <span className="mb-2 text-[10px] font-bold">naano</span>
                {sidebarIcons.map((icon, index) => (
                  <span
                    key={icon}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm ${
                      index === 1
                        ? "bg-accent/10 text-accent"
                        : "text-foreground/35"
                    }`}
                  >
                    {icon}
                  </span>
                ))}
              </aside>

              {/* Creator cards grid */}
              <div className="flex-1 bg-[#f7f8fa] p-3 sm:p-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {creators.map((creator, index) => (
                    <article
                      key={creator.name}
                      className="relative overflow-hidden rounded-2xl border border-border bg-white p-3 shadow-sm"
                    >
                      <span className="pointer-events-none absolute left-3 top-2 text-4xl font-bold text-black/[0.04]">
                        {index + 1}
                      </span>

                      <div className="relative mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-foreground/40">
                          <span className="h-3.5 w-3.5 rounded border border-current" />
                          <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#0A66C2] text-[8px] font-bold text-white">
                            in
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button className="rounded-md border border-border px-2 py-0.5 text-[10px] font-semibold">
                            Book
                          </button>
                          <span className="text-xs text-foreground/30">★</span>
                        </div>
                      </div>

                      <div className="relative flex flex-col items-center text-center">
                        <p className="mb-2 text-[10px] font-bold tracking-tight text-foreground/50">
                          naano
                        </p>
                        <Image
                          src={creator.avatar}
                          alt={creator.name}
                          width={64}
                          height={64}
                          className="h-14 w-14 rounded-full object-cover"
                        />
                        <p className="mt-2 text-sm font-bold">{creator.name}</p>
                        <p className="text-[11px] text-muted">{creator.niche}</p>
                        <p className="mt-0.5 text-[11px] text-muted">
                          {creator.flag} {creator.country}
                        </p>
                        <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-muted">
                          {creator.bio}
                        </p>
                      </div>

                      <div className="mt-3">
                        <div className="mb-1 flex items-center justify-between text-[10px]">
                          <span className="font-semibold tracking-wide text-accent">
                            ● MATCHING
                          </span>
                          <span className="font-semibold text-foreground/70">
                            {creator.matching}/100
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-sky-100">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${creator.matching}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-[#f7f8fa] px-2 py-2 text-center">
                        <div>
                          <p className="text-xs font-bold">{creator.followers}</p>
                          <p className="text-[8px] font-semibold uppercase tracking-wide text-muted">
                            Followers
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold">{creator.views}</p>
                          <p className="text-[8px] font-semibold uppercase tracking-wide text-muted">
                            Median views
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold">{creator.cost}</p>
                          <p className="text-[8px] font-semibold uppercase tracking-wide text-muted">
                            Post cost
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating search under mockup */}
          <div className="relative z-10 mx-auto mt-5 flex w-full max-w-xl items-center gap-3 rounded-full border border-black/5 bg-white px-4 py-3 shadow-lg">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-[10px] font-bold text-white">
              AI
            </span>
            <input
              type="text"
              readOnly
              placeholder="What can I help you find?"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
            <span className="text-foreground/30" aria-hidden>
              ⌄
            </span>
          </div>
        </div>

        {/* Three feature cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-5 flex -space-x-3">
              {featureAvatars.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <h3 className="text-xl font-bold">3,000+ vetted creators</h3>
            <p className="mt-2 text-sm text-muted">
              Specialist B2B voices, ready to collaborate.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-5 flex flex-wrap gap-2 text-xl">
              {countryFlags.map((flag) => (
                <span
                  key={flag}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f8fa]"
                >
                  {flag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold">Across 100 countries</h3>
            <p className="mt-2 text-sm text-muted">
              Local expertise with genuinely global reach.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="text-center">
                <Image
                  src="/images/avatar-g.png"
                  alt=""
                  width={40}
                  height={40}
                  className="mx-auto h-10 w-10 rounded-full object-cover"
                />
                <p className="mt-1 text-[10px] text-muted">AI & SaaS creator</p>
              </div>
              <span className="text-muted">···</span>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-accent/20 bg-accent/10 text-sm font-bold text-accent">
                96%
              </div>
              <div className="flex flex-col gap-1">
                {["Founders", "Sales leaders", "GTM teams"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-[#f7f8fa] px-2 py-0.5 text-[10px] font-medium text-muted"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="text-xl font-bold">Matched to your buyers</h3>
            <p className="mt-2 text-sm text-muted">
              Audience fit comes before follower count.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
