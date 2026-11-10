import { Crosshair, FlaskConical, ArrowUpRight } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { PageHero } from "@/components/layout/page-hero";
import { RouteBridge } from "@/components/layout/route-bridge";

const cycleIcons = {
  Frame: Crosshair,
  Test: FlaskConical,
  "Hand off": ArrowUpRight,
};

export default function Labs() {
  return (
    <Shell>
      <PageHero
        tag="Discipline // Labs (North)"
        title="Find the"
        emphasis="signal."
        description="Rapid solo discovery and prototyping sprints for the moment when the question is still more valuable than the answer."
      />
      <section
        className="section editorial-body"
        data-testid="section-labs-sprint"
      >
        <div className="section-inner">
          <div className="section-kicker reveal">
            <span className="line" aria-hidden="true" />
            <span className="mono">Labs / Short runway, real signal</span>
          </div>
          <div className="lab-sprint">
            <div className="sprint-figure reveal" aria-hidden="true">
              <div className="sprint-orbit" />
              <span className="sprint-word">Discover</span>
            </div>
            <div className="sprint-copy reveal delay-1">
              <strong>
                One focused sprint.
                <br />A more useful unknown.
              </strong>
              <p>
                We work beside you, not around you. A compact run of interviews,
                framing, experiments, and one convincing prototype turns the fog
                into a decision.
              </p>
              <p>
                Labs is designed for solo founders, independent operators, and
                small teams before the overhead arrives.
              </p>
            </div>
          </div>
          <div className="incubation-line">
            {[
              {
                tag: "CYCLE // FRAME",
                title: "Frame",
                copy: "The sharpest version of the problem and the audience who feels it.",
              },
              {
                tag: "CYCLE // TEST",
                title: "Test",
                copy: "Fast artifacts that invite a real response instead of a polite opinion.",
              },
              {
                tag: "CYCLE // HANDOFF",
                title: "Hand off",
                copy: "A clear next move: build, partner, pause, or let it go.",
              },
            ].map(({ tag, title, copy }) => {
              const Icon = cycleIcons[title as keyof typeof cycleIcons] ?? Crosshair;
              return (
                <article className="incubation-item reveal" key={title}>
                  <div className="taxonomy-eyebrow mono">
                    <Icon size={15} strokeWidth={1.8} className="taxonomy-icon" aria-hidden="true" />
                    <span className="taxonomy-tag">{tag}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <RouteBridge
        next="/ventures"
        nextLabel="Enter Ventures"
        label="Next / Solution acceleration until MVP"
      />
    </Shell>
  );
}
