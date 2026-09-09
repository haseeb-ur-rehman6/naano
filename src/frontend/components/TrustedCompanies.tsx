const companies = [
  "lemlist",
  "folk",
  "Leadbay",
  "Ringover",
  "Attio",
  "La Growth Machine",
  "gojiberry",
  "ChatSEO",
  "Abyssale",
];

type TrustedCompaniesProps = {
  title?: string;
  showPlus?: boolean;
  id?: string;
  embedded?: boolean;
};

export default function TrustedCompanies({
  title = "Trusted by modern B2B teams",
  showPlus = false,
  id,
  embedded = false,
}: TrustedCompaniesProps) {
  const Wrapper = embedded ? "div" : "section";

  return (
    <Wrapper
      id={id}
      className={
        embedded
          ? "py-2"
          : "border-y border-border/70 bg-[#f7f6f3] px-4 py-10 sm:px-6 lg:px-8"
      }
    >
      <div className={embedded ? "" : "mx-auto max-w-6xl"}>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
          {companies.map((name) => (
            <span
              key={name}
              className="text-sm font-semibold tracking-tight text-foreground/35 grayscale transition hover:text-foreground/60 sm:text-base"
            >
              {name}
            </span>
          ))}
          {showPlus && (
            <span className="rounded-full border border-border bg-card px-3 py-1 text-sm font-semibold text-muted">
              +30
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
