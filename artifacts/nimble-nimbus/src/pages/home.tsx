import { useEffect, useRef } from "react";
import { ArrowUpRight, Compass, Layers, Flame, Network } from "lucide-react";
import { Link } from "wouter";
import { NimbusCloud } from "@/components/nimbus-cloud";
import { HeroRainNav } from "@/components/layout/hero-rain-nav";
import { Shell } from "@/components/layout/shell";
import { ContactSection } from "@/components/contact-section";
import { pathSteps } from "@/data/content";

const pathIcons = {
  Discover: Compass,
  Prototype: Layers,
  Accelerate: Flame,
  Connect: Network,
};

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const videoDurationRef = useRef(0);

  useEffect(() => {
    const hero = heroRef.current;
    const video = heroVideoRef.current;
    if (!hero || !video) return undefined;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame = 0;
    const scrub = () => {
      frame = 0;
      if (reduceMotion || !videoDurationRef.current) return;
      const range = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - hero.offsetTop) / range),
      );
      const time = progress * Math.max(videoDurationRef.current - 0.08, 0);
      if (Math.abs(video.currentTime - time) > 0.016) video.currentTime = time;
    };
    const requestScrub = () => {
      if (!frame) frame = window.requestAnimationFrame(scrub);
    };
    const onMetadata = () => {
      videoDurationRef.current = Number.isFinite(video.duration)
        ? video.duration
        : 0;
      requestScrub();
    };
    video.pause();
    video.addEventListener("loadedmetadata", onMetadata);
    window.addEventListener("scroll", requestScrub, { passive: true });
    window.addEventListener("resize", requestScrub);
    if (video.readyState >= 1) onMetadata();
    return () => {
      window.cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", onMetadata);
      window.removeEventListener("scroll", requestScrub);
      window.removeEventListener("resize", requestScrub);
    };
  }, []);

  return (
    <Shell>
      <section
        className="hero"
        id="top"
        ref={heroRef}
        data-testid="section-hero"
      >
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            ref={heroVideoRef}
            className="hero-video"
            src="/nimble-nimbus-sunset.mp4"
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={() => {
              if (heroVideoRef.current) {
                videoDurationRef.current = Number.isFinite(
                  heroVideoRef.current.duration,
                )
                  ? heroVideoRef.current.duration
                  : 0;
              }
            }}
          />
        </div>
        <div className="hero-video-shade" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <NimbusCloud />
        <HeroRainNav />
        <div className="hero-inner">
          <div
            className="eyebrow mono reveal visible"
            data-testid="text-hero-eyebrow"
          >
            Independent Idea Accelerator Lab
          </div>
          <div className="hero-copy">
            <h1
              className="hero-title display reveal visible delay-1"
              data-testid="text-hero-title"
            >
              <span>Make altitude</span>
              <span>
                for the <em>idea.</em>
              </span>
            </h1>
            <p
              className="hero-note reveal visible delay-2"
              data-testid="text-hero-description"
            >
              Nimble Nimbus moves sharp ideas from solo discovery to something
              real — with clarity, momentum, and no unnecessary ceremony.
            </p>
          </div>
        </div>
        <div className="hero-meta">
          <span className="scroll-cue mono" data-testid="text-scroll-cue">
            <span className="scroll-line" aria-hidden="true" />
            Scroll to explore
          </span>
          <span className="hero-meta-right mono">
            Turning complex problems into working solutions.
            <br />
            Enterprise experience. Startup speed.
          </span>
        </div>
      </section>

      <section className="section home-thesis" data-testid="section-thesis">
        <img
          className="field-logo"
          src="/NN-logo-transparent.png"
          alt=""
          aria-hidden="true"
        />
        <div className="section-inner">
          <div className="section-kicker reveal">
            <span className="line" aria-hidden="true" />
            <span className="mono">The idea lab / Point of view</span>
          </div>
          <div className="thesis-layout">
            <div>
              <h2 className="section-heading display reveal">
                The nimble path
                <br />
                between <em>spark</em>
                <br />
                and <em>signal.</em>
              </h2>
              <div className="thesis-copy reveal delay-1">
                <p>
                  Most good ideas do not need a committee. They need a clear
                  read, a fast first move, and enough room to become themselves.
                </p>
                <p>
                  We work with people who can see the shape of what should exist
                  — then help give it altitude.
                </p>
              </div>
            </div>
            <p className="thesis-note reveal delay-2">
              Less ceremony.
              <br />
              <span>More lift.</span>
            </p>
          </div>
          <div className="route-bridge reveal">
            <span className="mono">Next / Background & Mission</span>
            <Link className="text-link mono" href="/about">
              What we do <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-path" data-testid="section-path">
        <div className="section-inner">
          <div className="path-layout">
            <div className="path-intro">
              <div className="section-kicker reveal">
                <span className="line" aria-hidden="true" />
                <span className="mono">The nimble path</span>
              </div>
              <h2 className="display reveal">
                <span className="line-break">
                  From <em>idea</em>
                </span>
                <br />
                <span className="line-break">
                  to <em>reality.</em>
                </span>
              </h2>
              <p className="reveal delay-1">
                One spark, four ways to bring an idea to life. Start where the
                uncertainty is highest.
              </p>
            </div>
            <div className="path-list">
              {pathSteps.map(({ title, description }) => {
                const Icon = pathIcons[title as keyof typeof pathIcons] ?? Compass;
                return (
                  <div
                    className="path-step reveal"
                    key={title}
                    data-testid={`item-path-${title.toLowerCase()}`}
                  >
                    <span className="path-step-icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="route-bridge reveal">
            <span className="mono">Next / Background & Mission</span>
            <Link className="text-link mono" href="/about">
              What we do <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <ContactSection />
    </Shell>
  );
}
