import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const projects = [
  {
    id: '01',
    name: 'Morrow',
    type: 'Brand world / Digital',
    className: 'project-a',
    artClass: 'art-orbit',
    word: 'morrow',
    description:
      'A new identity for the people building a better next. We gave Morrow a visual system with enough optimism to move at their speed.',
    tags: ['Positioning', 'Identity', 'Web design'],
  },
  {
    id: '02',
    name: 'Northstar',
    type: 'Campaign / Experience',
    className: 'project-b',
    artClass: 'art-grid',
    word: 'north',
    description:
      'Northstar makes the invisible infrastructure of a city feel human. A launch campaign built from signal, rhythm, and a little healthy friction.',
    tags: ['Creative direction', 'Campaign', 'Motion'],
  },
  {
    id: '03',
    name: 'Onda',
    type: 'Packaging / E-commerce',
    className: 'project-c',
    artClass: 'art-fold',
    word: 'onda',
    description:
      'Onda needed a shelf presence as clear as its ingredients. We turned a quiet point of view into a tactile system that travels from bottle to browser.',
    tags: ['Strategy', 'Packaging', 'E-commerce'],
  },
] as const;

const clients = [
  ['Ritual', 'Better everyday objects'],
  ['Arc’teryx', 'Outdoor / Performance'],
  ['Notion', 'Tools for thought'],
  ['Pact', 'Climate / Finance'],
  ['Aesop', 'Care / Culture'],
  ['Vitra', 'Design / Living'],
];

const approachSteps = [
  ['01', 'Find the signal', 'We get close to the real problem, then make the sharpest version of it impossible to ignore.'],
  ['02', 'Build the world', 'A flexible identity, a clear voice, and the digital details that make a brand feel inevitable.'],
  ['03', 'Make it move', 'Launch is a beginning. We design systems that hold their shape as the ambition gets bigger.'],
];

function scrollToSection(id: string, closeMenu?: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  closeMenu?.();
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className="brand"
      type="button"
      onClick={onClick}
      data-testid="button-brand-home"
      aria-label="Return to the top of Cloudline Studio"
    >
      <span className="brand-mark" aria-hidden="true">+</span>
      <span>cloudline</span>
    </button>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: (typeof projects)[number];
  onOpen: (project: (typeof projects)[number]) => void;
}) {
  return (
    <button
      type="button"
      className={`project-card ${project.className} reveal`}
      onClick={() => onOpen(project)}
      data-testid={`card-project-${project.id}`}
      aria-label={`Open ${project.name} case study`}
    >
      <div className={`project-art ${project.artClass}`} data-testid={`art-project-${project.id}`}>
        <span className="art-word">{project.word}</span>
      </div>
      <div className="project-info">
        <span>
          <span className="project-name" data-testid={`text-project-name-${project.id}`}>{project.name}</span>
          <span className="project-type mono" data-testid={`text-project-type-${project.id}`}>{project.type}</span>
        </span>
        <ArrowUpRight className="project-arrow" size={22} strokeWidth={1.5} aria-hidden="true" />
      </div>
    </button>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [formSent, setFormSent] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const videoDurationRef = useRef(0);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeProject) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProject(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  useEffect(() => {
    const hero = heroRef.current;
    const video = heroVideoRef.current;
    if (!hero || !video) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const scrubVideo = () => {
      frame = 0;
      if (reducedMotion.matches || !videoDurationRef.current) return;

      const scrollRange = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - hero.offsetTop) / scrollRange),
      );
      const nextTime = progress * Math.max(videoDurationRef.current - 0.08, 0);

      if (Math.abs(video.currentTime - nextTime) > 0.015) {
        video.currentTime = nextTime;
      }
    };

    const requestScrub = () => {
      if (!frame) frame = window.requestAnimationFrame(scrubVideo);
    };
    const handleMetadata = () => {
      videoDurationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      requestScrub();
    };

    video.pause();
    video.addEventListener('loadedmetadata', handleMetadata);
    window.addEventListener('scroll', requestScrub, { passive: true });
    window.addEventListener('resize', requestScrub);
    if (video.readyState >= 1) handleMetadata();

    return () => {
      window.cancelAnimationFrame(frame);
      video.removeEventListener('loadedmetadata', handleMetadata);
      window.removeEventListener('scroll', requestScrub);
      window.removeEventListener('resize', requestScrub);
    };
  }, []);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(true);
    event.currentTarget.reset();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="cloudline-page" data-testid="page-cloudline-home">
      <header className="site-nav" data-testid="navigation-main">
        <Brand onClick={() => scrollToSection('top', closeMenu)} />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <button className="nav-link mono" type="button" onClick={() => scrollToSection('work')} data-testid="link-nav-work">Work</button>
          <button className="nav-link mono" type="button" onClick={() => scrollToSection('studio')} data-testid="link-nav-studio">Studio</button>
          <button className="nav-link mono" type="button" onClick={() => scrollToSection('approach')} data-testid="link-nav-approach">Approach</button>
          <button className="nav-cta mono" type="button" onClick={() => scrollToSection('contact')} data-testid="button-nav-contact">
            Start a conversation <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
          </button>
        </nav>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          data-testid="button-mobile-menu"
        >
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen} data-testid="menu-mobile">
        <span className="mono">Cloudline studio / 2024—25</span>
        <button className="mobile-link" type="button" onClick={() => scrollToSection('work', closeMenu)} data-testid="link-mobile-work">
          Work <ArrowRight size={30} strokeWidth={1.2} aria-hidden="true" />
        </button>
        <button className="mobile-link" type="button" onClick={() => scrollToSection('studio', closeMenu)} data-testid="link-mobile-studio">
          Studio <ArrowRight size={30} strokeWidth={1.2} aria-hidden="true" />
        </button>
        <button className="mobile-link" type="button" onClick={() => scrollToSection('approach', closeMenu)} data-testid="link-mobile-approach">
          Approach <ArrowRight size={30} strokeWidth={1.2} aria-hidden="true" />
        </button>
        <button className="mobile-link" type="button" onClick={() => scrollToSection('contact', closeMenu)} data-testid="link-mobile-contact">
          Contact <ArrowRight size={30} strokeWidth={1.2} aria-hidden="true" />
        </button>
      </div>

      <section className="hero" id="top" ref={heroRef} data-testid="section-hero">
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            ref={heroVideoRef}
            className="hero-video"
            src="/cloudline-sunset.mp4"
            muted
            playsInline
            preload="auto"
            onLoadedMetadata={() => {
              if (heroVideoRef.current) {
                videoDurationRef.current = Number.isFinite(heroVideoRef.current.duration)
                  ? heroVideoRef.current.duration
                  : 0;
              }
            }}
          />
        </div>
        <div className="hero-video-shade" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="sun" aria-hidden="true" />
        <div className="cloud cloud-one" aria-hidden="true" />
        <div className="cloud cloud-two" aria-hidden="true" />
        <div className="cloud cloud-three" aria-hidden="true" />
        <div className="skyline" aria-hidden="true">
          <div className="skyline-back">
            {Array.from({ length: 14 }, (_, index) => <span className="building" key={`back-${index}`} />)}
          </div>
          <div className="skyline-front">
            {Array.from({ length: 14 }, (_, index) => <span className="building" key={`front-${index}`} />)}
          </div>
        </div>
        <div className="hero-inner">
          <div className="eyebrow mono reveal visible" data-testid="text-hero-eyebrow">Independent creative studio</div>
          <h1 className="hero-title display reveal visible delay-1" data-testid="text-hero-title">
            <span>Make room</span>
            <span>for the <em className="accent">remarkable.</em></span>
          </h1>
          <p className="hero-note reveal visible delay-2" data-testid="text-hero-description">
            Cloudline gives ambitious brands the clarity, character, and momentum to move up and out.
          </p>
        </div>
        <div className="hero-meta">
          <span className="scroll-cue mono" data-testid="text-scroll-cue">
            <span className="scroll-line" aria-hidden="true" />
            Scroll to explore
          </span>
          <span className="hero-meta-right mono" data-testid="text-hero-location">San Francisco / Everywhere<br />Strategy · Design · Digital</span>
        </div>
      </section>

      <section className="section work-section" id="work" data-testid="section-work">
        <div className="section-inner">
          <div className="section-kicker reveal">
            <span className="line" aria-hidden="true" />
            <span className="mono">Selected work / 01—03</span>
          </div>
          <div className="work-intro">
            <h2 className="section-heading display reveal" data-testid="heading-work">A few things we made <em>louder.</em></h2>
            <p className="work-aside reveal delay-1" data-testid="text-work-intro">
              <strong>Small team. High conviction.</strong>
              We find the essential idea, then build the world around it. No filler, no safe middle.
            </p>
          </div>
          <div className="projects" data-testid="list-projects">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setActiveProject} />
            ))}
          </div>
          <button className="view-all mono reveal" type="button" onClick={() => setActiveProject(projects[0])} data-testid="button-view-case-study">
            Open a case study <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className="section point-section" id="studio" data-testid="section-studio">
        <div className="section-inner">
          <div className="section-kicker reveal">
            <span className="line" aria-hidden="true" />
            <span className="mono">The studio / Point of view</span>
          </div>
          <h2 className="section-heading display reveal" data-testid="heading-studio">
            Good work starts <em>higher</em> than the work.
          </h2>
          <div className="point-body">
            <div className="point-copy reveal delay-1" data-testid="text-studio-copy">
              <p>We are a compact team of strategists, designers, and makers who like the hard part: deciding what matters.</p>
              <p>From first question to final pixel, we stay close. That is how the work gets sharper, warmer, and more useful.</p>
            </div>
            <p className="point-manifesto reveal delay-2" data-testid="text-studio-manifesto">
              The view from the ground is useful.<br /><span>We prefer the view from the cloudline.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="section approach-section" id="approach" data-testid="section-approach">
        <div className="section-inner approach-grid">
          <div className="approach-intro">
            <div className="section-kicker reveal">
              <span className="line" aria-hidden="true" />
              <span className="mono">How we work</span>
            </div>
            <h2 className="display reveal" data-testid="heading-approach">Upward,<br />always.</h2>
            <p className="reveal delay-1" data-testid="text-approach-intro">A clear path from first spark to a brand people can feel.</p>
          </div>
          <div className="steps" data-testid="list-approach-steps">
            {approachSteps.map(([index, title, description]) => (
              <article className="step reveal" key={index} data-testid={`item-approach-${index}`}>
                <span className="step-index mono">{index}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section clients-section" data-testid="section-clients">
        <div className="section-inner">
          <div className="section-kicker reveal">
            <span className="line" aria-hidden="true" />
            <span className="mono">In good company</span>
          </div>
          <div className="clients-top">
            <h2 className="display reveal" data-testid="heading-clients">People<br />we like.</h2>
            <p className="reveal delay-1" data-testid="text-clients-intro">We work best with teams who bring a real point of view and want to push it further.</p>
          </div>
          <div className="client-list" data-testid="list-clients">
            {clients.map(([name, sector], index) => (
              <div className="client-row reveal" key={name} data-testid={`item-client-${index}`}>
                <span className="client-name" data-testid={`text-client-name-${index}`}>{name}</span>
                <span className="client-sector mono">{sector}</span>
                <ArrowUpRight className="client-arrow" size={21} strokeWidth={1.4} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact" data-testid="section-contact">
        <div className="section-inner">
          <div className="section-kicker reveal">
            <span className="line" aria-hidden="true" />
            <span className="mono">Next elevation / 06</span>
          </div>
          <h2 className="contact-heading display reveal" data-testid="heading-contact">Have something<br /><em>in mind?</em></h2>
          <div className="contact-bottom">
            <div>
              <a className="contact-email reveal" href="mailto:hello@cloudline.studio" data-testid="link-contact-email">
                hello@cloudline.studio <ArrowUpRight size={25} strokeWidth={1.4} aria-hidden="true" />
              </a>
              <form className="contact-form reveal delay-1" onSubmit={handleFormSubmit} data-testid="form-contact">
                <div className="contact-form-row">
                  <label>
                    <span className="sr-only">Your name</span>
                    <input name="name" type="text" placeholder="Your name" required data-testid="input-contact-name" />
                  </label>
                  <label>
                    <span className="sr-only">Email address</span>
                    <input name="email" type="email" placeholder="Email address" required data-testid="input-contact-email" />
                  </label>
                </div>
                <label>
                  <span className="sr-only">Tell us about the project</span>
                  <textarea name="message" placeholder="Tell us about the project" required data-testid="input-contact-message" />
                </label>
                {formSent ? (
                  <p className="form-success" role="status" data-testid="status-contact-success">Thanks — we&apos;ll be in touch shortly.</p>
                ) : (
                  <button className="form-submit mono" type="submit" data-testid="button-contact-submit">Send the brief <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" /></button>
                )}
              </form>
            </div>
            <p className="contact-aside reveal delay-2" data-testid="text-contact-aside">Tell us the honest version. What are you building, and what would make it matter?</p>
          </div>
        </div>
      </section>

      <footer className="site-footer" data-testid="footer-main">
        <Brand onClick={() => scrollToSection('top')} />
        <div className="footer-links mono">
          <a className="footer-link" href="https://www.instagram.com" target="_blank" rel="noreferrer" data-testid="link-footer-instagram">Instagram</a>
          <a className="footer-link" href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-testid="link-footer-linkedin">LinkedIn</a>
        </div>
        <span className="footer-note mono" data-testid="text-footer-note">© Cloudline studio / 2025</span>
      </footer>

      {activeProject && (
        <div className="project-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActiveProject(null);
        }} data-testid="modal-project-backdrop">
          <article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" data-testid="modal-project">
            <button className="modal-close" type="button" onClick={() => setActiveProject(null)} aria-label="Close case study" data-testid="button-close-case-study">
              <X size={18} strokeWidth={1.5} />
            </button>
            <div className={`modal-art project-art ${activeProject.artClass}`} aria-hidden="true">
              <span className="art-word">{activeProject.word}</span>
            </div>
            <span className="mono">{activeProject.id} / Selected work</span>
            <h2 id="project-modal-title">{activeProject.name}</h2>
            <p>{activeProject.description}</p>
            <div className="modal-tags">
              {activeProject.tags.map((tag) => <span className="modal-tag mono" key={tag}>{tag}</span>)}
            </div>
          </article>
        </div>
      )}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;