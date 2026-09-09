import { useEffect, useState } from "react";
import { Link } from "wouter";

const SPACINGS = [0, 2, 3, 4, 5];

function getRandomRainItems() {
  const baseItems = [
    { label: "Labs", href: "/labs", x: 8, dur: "22s", wobble: 0 },
    { label: "Ventures", href: "/ventures", x: 42, dur: "25s", wobble: 1 },
    { label: "Nexus", href: "/nexus", x: 20, dur: "23s", wobble: 2 },
    { label: "Insights", href: "/insights", x: 58, dur: "24s", wobble: 3 },
  ];

  let currentDelay = 0;
  return baseItems.map((item, idx) => {
    if (idx === 0) {
      currentDelay = SPACINGS[Math.floor(Math.random() * SPACINGS.length)];
    } else {
      currentDelay += SPACINGS[Math.floor(Math.random() * SPACINGS.length)];
    }
    return {
      ...item,
      delay: `${currentDelay}s`,
    };
  });
}

export function HeroRainNav() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [rainItems] = useState(() => getRandomRainItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`hero-rain-nav ${!isAtTop ? "stopped" : ""}`}
      aria-hidden="true"
    >
      {isAtTop &&
        rainItems.map((item, idx) => (
          <Link
            key={`${item.label}-${idx}`}
            href={item.href}
            className="hero-rain-item mono"
            tabIndex={-1}
            aria-hidden="true"
            style={{
              left: `${item.x}%`,
              ["--rain-dur" as any]: item.dur,
              ["--rain-delay" as any]: item.delay,
              ["--rain-wobble" as any]: `rain-wobble-${item.wobble}`,
            }}
          >
            {item.label}
          </Link>
        ))}
    </div>
  );
}
