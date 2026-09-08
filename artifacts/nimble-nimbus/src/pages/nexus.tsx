import { Shell } from "@/components/layout/shell";
import { PageHero } from "@/components/layout/page-hero";
import { RouteBridge } from "@/components/layout/route-bridge";

export default function Nexus() {
  return (
    <Shell>
      <PageHero
        number="04"
        title="Bring the right"
        emphasis="orbit."
        description="The Talent Syndicate & Partnership layer that brings an idea to life — with the exact people its next chapter needs."
      />
      <section className="section editorial-body">
        <div className="section-inner editorial-split">
          <span className="editorial-label mono reveal">
            Nexus / The partnership layer
          </span>
          <div className="editorial-copy reveal delay-1">
            <p>
              The right collaborator does more than add capacity. They change
              the quality of the room.
            </p>
            <p>
              Nexus is our trusted network of builders, operators, storytellers,
              and specialists. We bring people in around a real need, with a
              clear role and enough context to make a meaningful contribution.
            </p>
            <p className="small-copy">
              No endless bench. No warm-body staffing. A carefully composed
              orbit for the work in front of you.
            </p>
          </div>
        </div>
        <div className="nexus-roster">
          {[
            [
              "01",
              "Builders",
              "Technical range for making the first durable version.",
            ],
            [
              "02",
              "Operators",
              "Practical judgment when the product meets the world.",
            ],
            [
              "03",
              "Storytellers",
              "Language and narrative that make the idea legible.",
            ],
            [
              "04",
              "Specialists",
              "Deep context for the exact edge that matters.",
            ],
          ].map(([number, title, copy]) => (
            <article className="roster-item reveal" key={number}>
              <span className="mono">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <RouteBridge
        next="/insights"
        nextLabel="Read Insights"
        label="Next / Knowledge base and deep dives"
      />
    </Shell>
  );
}
