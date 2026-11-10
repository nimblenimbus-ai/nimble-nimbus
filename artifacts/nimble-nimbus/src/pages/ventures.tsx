import { Layers, Cpu, ShieldCheck } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { PageHero } from "@/components/layout/page-hero";
import { RouteBridge } from "@/components/layout/route-bridge";

const stageIcons = {
  Shape: Layers,
  Make: Cpu,
  Prove: ShieldCheck,
};

export default function Ventures() {
  return (
    <Shell>
      <PageHero
        tag="Discipline // Ventures (Nova)"
        title="Stay for the"
        emphasis="build."
        description="Solution acceleration until an MVP is built, tested, and ready for the kind of attention that makes it stronger."
      />
      <section className="section editorial-body">
        <div className="section-inner editorial-split">
          <span className="editorial-label mono reveal">
            Ventures / Solution acceleration
          </span>
          <div className="editorial-copy reveal delay-1">
            <p>
              Some ideas need a longer runway. Ventures is the close, practical
              partnership between a promising prototype and a first product
              people can use.
            </p>
            <p>
              We shape the product, the story, and the operating rhythm together
              — keeping the team small enough to hear what the work is saying.
            </p>
            <p className="small-copy">
              The milestone is not a launch-shaped date. It is a tested MVP with
              a reason to keep going.
            </p>
          </div>
        </div>
        <div className="incubation-line">
          {[
            {
              tag: "STAGE // SHAPE",
              title: "Shape",
              copy: "Turn the prototype into a product point of view with edges.",
            },
            {
              tag: "STAGE // MAKE",
              title: "Make",
              copy: "Design, engineering, and the unglamorous decisions between them.",
            },
            {
              tag: "STAGE // PROVE",
              title: "Prove",
              copy: "Put the MVP in the world and learn what deserves another mile.",
            },
          ].map(({ tag, title, copy }) => {
            const Icon = stageIcons[title as keyof typeof stageIcons] ?? Layers;
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
      </section>
      <section className="section quote-band">
        <div className="section-inner">
          <p className="quote-mark reveal">
            Build the thing that lets the <em>next question</em> appear.
          </p>
        </div>
      </section>
      <RouteBridge
        next="/nexus"
        nextLabel="Meet Nexus"
        label="Next / Talent syndicate and partnerships"
      />
    </Shell>
  );
}
