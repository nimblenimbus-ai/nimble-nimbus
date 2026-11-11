interface PageHeroProps {
  number?: string;
  tag?: string;
  title: string;
  emphasis: string;
  description: string;
}

export function PageHero({
  number,
  tag,
  title,
  emphasis,
  description,
}: PageHeroProps) {
  const kickerLabel = tag ?? (number ? `Nimble Nimbus // ${number}` : "Nimble Nimbus");
  const testId = tag
    ? tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    : (number ?? "hero");

  return (
    <section className="page-hero" data-testid={`section-page-hero-${testId}`}>
      <div className="page-hero-inner">
        <div className="page-kicker mono reveal visible">
          {tag ? `Nimble Nimbus // ${tag}` : kickerLabel}
        </div>
        <h1 className="page-title display reveal visible delay-1">
          {title}
          <br />
          <em>{emphasis}</em>
        </h1>
        <p className="page-dek reveal visible delay-2">{description}</p>
      </div>
    </section>
  );
}
