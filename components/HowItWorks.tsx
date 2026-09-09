import Image from "next/image";

const findCreators = [
  { name: "Eric", fit: "92%", avatar: "/images/avatar-a.png" },
  { name: "Robin", fit: "88%", avatar: "/images/avatar-b.png" },
  { name: "Aya", fit: "84%", avatar: "/images/avatar-c.png" },
];

const collaborators = [
  {
    name: "Raphael",
    status: "Draft ready",
    tone: "bg-sky-50 text-sky-700",
    avatar: "/images/avatar-d.png",
  },
  {
    name: "Thomas",
    status: "Scheduled",
    tone: "bg-slate-100 text-slate-600",
    avatar: "/images/avatar-e.png",
  },
  {
    name: "Nada",
    status: "Live",
    tone: "bg-violet-50 text-violet-700",
    avatar: "/images/avatar-f.png",
  },
];

const steps = [
  {
    number: "01",
    title: "Find creators your buyers trust",
    visual: (
      <div className="flex h-full items-center justify-around gap-1 px-1">
        {findCreators.map((person) => (
          <div key={person.name} className="flex flex-col items-center text-center">
            <Image
              src={person.avatar}
              alt={person.name}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
            />
            <p className="mt-2 text-[11px] font-semibold">{person.name}</p>
            <p className="text-[10px] font-medium text-accent">Fit {person.fit}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "02",
    title: "Build a campaign brief in minutes",
    visual: (
      <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-[#fafafa] p-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold">Campaign brief</p>
          <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold text-white">
            AI
          </span>
        </div>
        <ul className="mt-2 space-y-1.5 text-[11px] text-muted">
          {[
            "Objectives and key messages",
            "Creator guidelines",
            "Tracking links ready",
          ].map((item) => (
            <li key={item} className="flex items-start gap-1.5">
              <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-accent text-[8px] text-white">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sky-100">
          <div className="h-full w-[82%] rounded-full bg-accent" />
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Manage every collaboration",
    visual: (
      <div className="flex h-full flex-col justify-center gap-2">
        {collaborators.map((person) => (
          <div
            key={person.name}
            className="flex items-center justify-between rounded-xl border border-border bg-[#fafafa] px-2 py-1.5"
          >
            <div className="flex items-center gap-2">
              <Image
                src={person.avatar}
                alt={person.name}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="text-[11px] font-semibold">{person.name}</span>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${person.tone}`}
            >
              {person.status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "04",
    title: "Track reach, clicks, and leads",
    visual: (
      <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-[#fafafa] p-3">
        <div>
          <p className="text-[10px] font-medium text-muted">Attributed pipeline</p>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-xl font-bold tracking-tight">€48.2K</p>
            <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
              +24%
            </span>
          </div>
        </div>
        <div className="mt-3 flex h-10 items-end gap-1">
          {[40, 55, 35, 70, 50, 85, 60].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-accent/80"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[11px]">
          <p>
            <span className="font-bold">124K</span>{" "}
            <span className="text-muted">views</span>
          </p>
          <p>
            <span className="font-bold">418</span>{" "}
            <span className="text-muted">leads</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "05",
    title: "Pay creators without the admin",
    visual: (
      <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-[#fafafa] p-3">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] text-white">
            ✓
          </span>
          <div>
            <p className="text-xs font-semibold">Payment scheduled</p>
            <p className="text-[10px] text-muted">Handled by Naano</p>
          </div>
        </div>
        <div className="rounded-xl bg-white px-3 py-2">
          <p className="text-[10px] text-muted">Creator payout</p>
          <p className="text-lg font-bold">€1,240</p>
        </div>
        <div className="flex gap-1.5">
          {["Contract", "Invoice", "Payout"].map((item) => (
            <span
              key={item}
              className="rounded-full bg-white px-2 py-1 text-[9px] font-semibold text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#f7f9fc] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <Image
        src="/images/journey-cloud.png"
        alt=""
        width={1600}
        height={400}
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-70"
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="lp-eyebrow mb-4 flex items-center gap-2 text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          One platform, from brief to results
        </p>

        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <h2 className="lp-h2-sm">
            Run creator campaigns from one place.
          </h2>
          <p className="lp-lead max-w-md lg:justify-self-end lg:text-right">
            Find the right voices, launch faster, and connect every post to
            measurable business results.
          </p>
        </div>

        {/* Steps with dashed connector */}
        <div className="relative mt-16">
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-4 hidden border-t border-dashed border-foreground/15 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {steps.map((step) => (
              <article key={step.number} className="flex flex-col items-center">
                <span className="relative z-10 mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-[11px] font-bold text-muted shadow-sm">
                  {step.number}
                </span>

                <div className="h-[168px] w-full rounded-2xl border border-border bg-white p-3 shadow-[0_12px_40px_-24px_rgba(23,24,28,0.35)]">
                  {step.visual}
                </div>

                <h3 className="mt-4 text-center text-sm font-semibold leading-snug text-foreground">
                  {step.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
