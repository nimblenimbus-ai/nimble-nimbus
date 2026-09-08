import { type ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useReveal } from "@/hooks/use-reveal";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";

export function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  useReveal();
  return (
    <main className="nimbus-page">
      <SiteNav />
      {children}
      <SiteFooter />
    </main>
  );
}
