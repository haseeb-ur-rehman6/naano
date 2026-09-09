import Image from "next/image";

const stats = [
  { value: "5M+", label: "Impressions generated" },
  { value: "30K+", label: "Leads generated" },
  { value: "2,000+", label: "Creators on Naano" },
  { value: "5K+", label: "Posts published" },
];

export default function Results() {
  return (
    <section
      id="results"
      className="relative overflow-hidden bg-[#f3f7fb] px-4 pt-20 sm:px-6 lg:px-8 lg:pt-28"
    >
      <Image
        src="/images/results-clouds.png"
        alt=""
        fill
        className="object-cover object-bottom opacity-50"
        sizes="100vw"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="lp-eyebrow flex items-center justify-center gap-2 text-sky-700/70">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          The results
        </p>
        <h2 className="lp-h2 mx-auto mt-6 max-w-[820px] text-center">
          Proven across thousands of campaigns.
        </h2>

        <div className="mt-12 rounded-[2rem] border border-white/70 bg-white/45 p-3 shadow-[0_20px_60px_-40px_rgba(23,24,28,0.25)] backdrop-blur-sm sm:p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/70 bg-white px-5 py-7 text-center shadow-sm"
              >
                <p className="lp-stat">{stat.value}</p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
