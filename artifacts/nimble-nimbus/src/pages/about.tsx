import { Compass, Zap, Target, Sparkles } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { PageHero } from "@/components/layout/page-hero";
import { RouteBridge } from "@/components/layout/route-bridge";
import { principles } from "@/data/content";

const principleIcons: Record<string, typeof Compass> = {
  Altitude: Compass,
  Velocity: Zap,
  Candor: Target,
  Care: Sparkles,
};

export default function About() {
  return (
    <Shell>
      <PageHero
        tag="About"
        title="Bring ideas to"
        emphasis="life."
        description="Nimble Nimbus is an independent idea accelerator lab for people with a sharp idea and no appetite for unnecessary ceremony."
      />
      <section
        className="section editorial-body"
        data-testid="section-about-mission"
      >
        <div className="section-inner editorial-split">
          <span className="editorial-label mono reveal">
            Background &amp; Mission
          </span>
          <div className="editorial-copy reveal delay-1">
            <p>
              We started Nimble Nimbus because the earliest stage of an idea
              deserves more than a pitch deck and less than a machine.
            </p>
            <p>
              Our job is to make the signal visible. We ask the unsparing
              question, build enough to learn, and stay close until the next
              move is obvious.
            </p>
            <p className="small-copy">
              That can mean a week of solo discovery, a prototype that makes the
              risk tangible, or a longer partnership that carries a product
              through its first real mile. The shape changes. The standard does
              not.
            </p>
          </div>
        </div>
      </section>
      <section className="section quote-band">
        <div className="section-inner">
          <p className="quote-mark reveal">
            The best work begins when an idea has room to become{" "}
            <em>specific.</em>
          </p>
          <div className="principles">
            {principles.map(({ title, copy }) => {
              const Icon = principleIcons[title] ?? Compass;
              return (
                <article className="principle reveal" key={title}>
                  <span className="principle-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <RouteBridge
        next="/labs"
        nextLabel="See the Labs"
        label="Next / Rapid discovery and prototypes"
      />
    </Shell>
  );
}
