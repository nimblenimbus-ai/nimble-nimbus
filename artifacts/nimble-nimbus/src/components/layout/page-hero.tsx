interface PageHeroProps {
  number: string;
  title: string;
  emphasis: string;
  description: string;
}

export function PageHero({
  number,
  title,
  emphasis,
  description,
}: PageHeroProps) {
  return (
    <section className="page-hero" data-testid={`section-page-hero-${number}`}>
      <div className="page-hero-inner">
        <div className="page-kicker mono reveal visible">
          Nimble Nimbus / {number}
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
