import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface RouteBridgeProps {
  next: string;
  nextLabel: string;
  label: string;
}

export function RouteBridge({ next, nextLabel, label }: RouteBridgeProps) {
  const isExternal = next.startsWith("http://") || next.startsWith("https://");
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <section className="section page-end">
      <div className="section-inner route-bridge reveal">
        <span className="mono">{label}</span>
        {isExternal ? (
          <a
            className="text-link mono"
            href={next}
            target="_blank"
            rel="noopener noreferrer"
          >
            {nextLabel} <ArrowRight size={16} aria-hidden="true" />
          </a>
        ) : (
          <Link className="text-link mono" href={next} onClick={handleClick}>
            {nextLabel} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}
