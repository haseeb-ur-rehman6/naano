import Image from "next/image";

const caseStats = [
  { value: "9", label: "creators activated" },
  { value: "2,940", label: "qualified clicks" },
  { value: "512", label: "trials started" },
];

const trustedLogos = [
  { name: "lemlist", src: "/images/logo-lemlist.png" },
  { name: "folk", src: "/images/logo-folk.png" },
  { name: "Leadbay", src: "/images/logo-leadbay.png" },
  { name: "Ringover", src: "/images/logo-ringover.png" },
  { name: "Attio", src: "/images/logo-attio.jpg" },
  { name: "La Growth Machine", src: "/images/logo-lagrowthmachine.png" },
  { name: "gojiberry", src: "/images/logo-gojiberry.png" },
  { name: "ChatSEO", src: "/images/logo-chatseo.png" },
];

export default function CaseStudy() {
  return (
    <section
      id="case-study"
      className="bg-[#f5f6f8] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="lp-h2">
            Real teams. Measurable pipeline.
          </h2>
          <p className="lp-lead mt-4 max-w-2xl">
            See how B2B teams turn creator trust into attributable demand with
            Naano.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_20px_60px_-40px_rgba(23,24,28,0.35)]">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Video testimonial
              </p>

              <div className="relative overflow-hidden rounded-2xl bg-foreground">
                <Image
                  src="/images/blogseo-vincent-video-poster.png"
                  alt="Vincent Josse video testimonial"
                  width={720}
                  height={1280}
                  className="aspect-[4/3] w-full object-cover object-top sm:aspect-video"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                <button
                  type="button"
                  aria-label="Play testimonial"
                  className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-xl transition hover:scale-105"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-0.5 h-6 w-6 fill-current"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>

                <p className="absolute bottom-3 left-3 text-xs font-medium text-white sm:text-sm">
                  Vincent Josse, Founder of BlogSEO
                </p>
                <span className="absolute bottom-3 right-3 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white">
                  2:40
                </span>
              </div>

              <blockquote className="mt-6 text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
                “Naano became one of our fastest acquisition channels. We know
                exactly what every creator brings.”
              </blockquote>
            </div>

            <div className="flex flex-col p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Case study
                </p>
                <Image
                  src="/images/logo-blogseo.png"
                  alt="BlogSEO"
                  width={110}
                  height={28}
                  className="h-6 w-auto object-contain"
                />
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                How BlogSEO turned creator content into product signups
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                BlogSEO briefed SEO & SaaS creators on LinkedIn and X, then
                traced every trial back to the post that drove it, all in Naano.
              </p>

              <div className="my-8 border-t border-border" />

              <div className="grid grid-cols-3 gap-4">
                {caseStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-muted sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <a
                href="#case-study"
                className="mt-8 inline-flex w-fit items-center gap-1 text-sm font-semibold text-foreground transition hover:opacity-70"
              >
                Read case study
                <span aria-hidden>→</span>
              </a>

              <div className="mt-auto border-t border-border pt-6">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Trusted by teams at
                </p>
                <div className="grid grid-cols-4 gap-x-4 gap-y-5">
                  {trustedLogos.map((logo) => (
                    <Image
                      key={logo.name}
                      src={logo.src}
                      alt={logo.name}
                      width={90}
                      height={24}
                      className="h-5 w-auto object-contain opacity-50 grayscale"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
