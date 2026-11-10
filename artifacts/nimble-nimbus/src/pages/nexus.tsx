import { Cpu, Gauge, PenTool, Binary } from "lucide-react";
import { Shell } from "@/components/layout/shell";
import { PageHero } from "@/components/layout/page-hero";
import { RouteBridge } from "@/components/layout/route-bridge";

const rosterRoles = [
  {
    tag: "ROLE // ARCHITECTURE",
    title: "Builders",
    copy: "Technical range for making the first durable version.",
    icon: Cpu,
  },
  {
    tag: "ROLE // OPERATIONS",
    title: "Operators",
    copy: "Practical judgment when the product meets the world.",
    icon: Gauge,
  },
  {
    tag: "ROLE // NARRATIVE",
    title: "Storytellers",
    copy: "Language and narrative that make the idea legible.",
    icon: PenTool,
  },
  {
    tag: "ROLE // SPECIALISTS",
    title: "Specialists",
    copy: "Deep context for the exact edge that matters.",
    icon: Binary,
  },
];

export default function Nexus() {
  return (
    <Shell>
      <PageHero
        tag="Guild // Talent Orbit"
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
          {rosterRoles.map((role) => {
            const Icon = role.icon;
            return (
              <article className="roster-item reveal" key={role.title}>
                <div className="taxonomy-eyebrow mono">
                  <Icon size={15} strokeWidth={1.8} className="taxonomy-icon" aria-hidden="true" />
                  <span className="taxonomy-tag">{role.tag}</span>
                </div>
                <h3>{role.title}</h3>
                <p>{role.copy}</p>
              </article>
            );
          })}
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
