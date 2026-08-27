import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { NimbusCloud } from '@/components/nimbus-cloud';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Labs', href: '/labs' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Nexus', href: '/nexus' },
  { label: 'Insights', href: '/insights' },
] as const;

const pathSteps = [
  ['01', 'Discover', 'Name the real question before anyone starts decorating the answer.'],
  ['02', 'Prototype', 'Make the smallest convincing thing, then put it in the hands of people who matter.'],
  ['03', 'Accelerate', 'Turn the battle tested prototype into a working MVP, driving it forward until the idea proves it belongs.'],
  ['04', 'Connect', 'Bring in the exact talent, taste, and reach the next chapter needs.'],
] as const;

const principles = [
  ['Altitude', 'The useful distance between a bright idea and a better decision.'],
  ['Velocity', 'Forward motion without confusing speed for progress.'],
  ['Candor', 'A clear read on what is working, what is not, and what to try next.'],
  ['Care', 'Small details are not ceremony when they change how an idea lands.'],
] as const;

const articles = [
  {
    number: 'NN',
    category: 'Field note / 08 min',
    title: 'The altitude test: knowing when to zoom out',
    intro: 'A practical note on finding the useful distance from a problem before the solution starts making noise.',
    body: 'The first version of a product is rarely a product. It is a point of view with enough shape to be argued with. The altitude test is simple: can you describe the change you want to create without describing the interface? If not, go higher. The sharper question usually arrives just after the obvious answer.',
  },
  {
    number: '02',
    category: 'Deep dive / 12 min',
    title: 'A prototype is a conversation, not a miniature launch',
    intro: 'What to build when certainty is expensive and the useful signal is still hiding.',
    body: 'A prototype earns its keep by making a conversation more specific. It should expose the risk, not disguise it. We look for one behavior, one audience, and one honest moment of friction. Everything else can wait until the question has earned more detail.',
  },
  {
    number: '03',
    category: 'Dispatch / 06 min',
    title: 'The quiet power of the right collaborator',
    intro: 'A field guide to knowing which missing perspective can move an idea forward.',
    body: 'Partnership is not a roster exercise. The best collaborator changes the quality of the question in the room. We bring people in for a distinct point of view, a specific craft, or a lived relationship to the problem — never just to make the team look complete.',
  },
] as const;

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Brand() {
  return (
    <Link className="brand" href="/" data-testid="link-brand-home" aria-label="Nimble Nimbus home">
      <img className="brand-logo" src="/NN-logo-transparent.png" alt="Nimble Nimbus Logo" />
      <span>Nimble Nimbus</span>
    </Link>
  );
}

function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-nav" data-testid="navigation-main">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link className="nav-link mono" href={item.href} key={item.href} data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </Link>
          ))}
          <a className="nav-cta mono" href="https://www.linkedin.com/in/wheresjek/" target="_blank" rel="noopener noreferrer" data-testid="link-nav-contact">
            LinkedIn <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
          </a>
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
        <span className="mono">Nimble Nimbus / Independent Idea Accelerator Lab</span>
        {navItems.map((item) => (
          <Link className="mobile-link" href={item.href} key={item.href} onClick={closeMenu} data-testid={`link-mobile-${item.label.toLowerCase()}`}>
            {item.label} <ArrowRight size={30} strokeWidth={1.2} aria-hidden="true" />
          </Link>
        ))}
        <a className="mobile-link" href="https://www.linkedin.com/in/wheresjek/" target="_blank" rel="noopener noreferrer" onClick={closeMenu} data-testid="link-mobile-contact">
          LinkedIn <ArrowRight size={30} strokeWidth={1.2} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer" data-testid="footer-main">
      <Brand />
      <div className="footer-links mono">
        <a className="footer-link" href="mailto:idea@nimblenimbus.co.uk" data-testid="link-footer-email">Email</a>
        <a className="footer-link" href="https://www.linkedin.com/in/wheresjek/" target="_blank" rel="noopener noreferrer" data-testid="link-footer-linkedin">LinkedIn</a>
      </div>
      <span className="footer-note mono" data-testid="text-footer-note">Nimble Nimbus / 2026</span>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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

function ContactSection() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState('sending');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') as string) || '';
    const email = (formData.get('email') as string) || '';
    const message = (formData.get('message') as string) || '';

    try {
      const response = await fetch('https://formsubmit.co/ajax/idea@nimblenimbus.co.uk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New Brief from ${name} (${email})`
        })
      });

      if (response.ok) {
        setFormState('sent');
        form.reset();
      } else {
        window.location.href = `mailto:idea@nimblenimbus.co.uk?subject=${encodeURIComponent(`New Brief from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        setFormState('sent');
      }
    } catch {
      window.location.href = `mailto:idea@nimblenimbus.co.uk?subject=${encodeURIComponent(`New Brief from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      setFormState('sent');
    }
  };

  return (
    <section className="section home-contact" id="contact" data-testid="section-contact">
      <div className="section-inner">
        <div className="section-kicker reveal"><span className="line" aria-hidden="true" /><span className="mono">Next move / 05</span></div>
        <h2 className="contact-heading display reveal" data-testid="heading-contact">Have a sharp<br /><em>idea?</em></h2>
        <div className="contact-grid">
          <div>
            <a className="contact-email reveal" href="mailto:idea@nimblenimbus.co.uk" data-testid="link-contact-email">
              idea@nimblenimbus.co.uk <ArrowUpRight size={25} strokeWidth={1.4} aria-hidden="true" />
            </a>
            <form className="contact-form reveal delay-1" onSubmit={handleSubmit} data-testid="form-contact">
              <div className="contact-form-row">
                <label><span className="sr-only">Your name</span><input name="name" type="text" placeholder="Your name" required data-testid="input-contact-name" disabled={formState === 'sending'} /></label>
                <label><span className="sr-only">Email address</span><input name="email" type="email" placeholder="Email address" required data-testid="input-contact-email" disabled={formState === 'sending'} /></label>
              </div>
              <label><span className="sr-only">What are you making?</span><textarea name="message" placeholder="What are you making?" required data-testid="input-contact-message" disabled={formState === 'sending'} /></label>
              {formState === 'sent' ? (
                <p className="form-success" role="status" data-testid="status-contact-success">Received. We will make room for a useful next conversation.</p>
              ) : (
                <button className="form-submit mono" type="submit" disabled={formState === 'sending'} data-testid="button-contact-submit">
                  {formState === 'sending' ? 'Sending brief...' : 'Send the brief'} <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
                </button>
              )}
            </form>
          </div>
          <p className="contact-aside reveal delay-2">Tell us the honest version. What is the idea, and what would make it matter in the world?</p>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const videoDurationRef = useRef(0);

  useEffect(() => {
    const hero = heroRef.current;
    const video = heroVideoRef.current;
    if (!hero || !video) return undefined;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const scrub = () => {
      frame = 0;
      if (reduceMotion || !videoDurationRef.current) return;
      const range = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, (window.scrollY - hero.offsetTop) / range));
      const time = progress * Math.max(videoDurationRef.current - 0.08, 0);
      if (Math.abs(video.currentTime - time) > .016) video.currentTime = time;
    };
    const requestScrub = () => { if (!frame) frame = window.requestAnimationFrame(scrub); };
    const onMetadata = () => {
      videoDurationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      requestScrub();
    };
    video.pause();
    video.addEventListener('loadedmetadata', onMetadata);
    window.addEventListener('scroll', requestScrub, { passive: true });
    window.addEventListener('resize', requestScrub);
    if (video.readyState >= 1) onMetadata();
    return () => {
      window.cancelAnimationFrame(frame);
      video.removeEventListener('loadedmetadata', onMetadata);
      window.removeEventListener('scroll', requestScrub);
      window.removeEventListener('resize', requestScrub);
    };
  }, []);

  return (
    <Shell>
      <section className="hero" id="top" ref={heroRef} data-testid="section-hero">
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            ref={heroVideoRef}
            className="hero-video"
            src="/nimble-nimbus-sunset.mp4"
            muted
            playsInline
            preload="metadata"
            onLoadedMetadata={() => {
              if (heroVideoRef.current) videoDurationRef.current = Number.isFinite(heroVideoRef.current.duration) ? heroVideoRef.current.duration : 0;
            }}
          />
        </div>
        <div className="hero-video-shade" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <NimbusCloud />
        <div className="hero-inner">
          <div className="eyebrow mono reveal visible" data-testid="text-hero-eyebrow">Independent Idea Accelerator Lab</div>
          <div className="hero-copy">
            <h1 className="hero-title display reveal visible delay-1" data-testid="text-hero-title">
              <span>Make altitude</span>
              <span>for the <em>idea.</em></span>
            </h1>
            <p className="hero-note reveal visible delay-2" data-testid="text-hero-description">Nimble Nimbus moves sharp ideas from solo discovery to something real — with clarity, momentum, and no unnecessary ceremony.</p>
          </div>
        </div>
        <div className="hero-meta">
          <span className="scroll-cue mono" data-testid="text-scroll-cue"><span className="scroll-line" aria-hidden="true" />Scroll to explore</span>
          <span className="hero-meta-right mono">Turning complex problems into working solutions.<br />Enterprise experience. Startup speed.</span>
        </div>
      </section>

      <section className="section home-thesis" data-testid="section-thesis">
        <img className="field-logo" src="/NN-logo-transparent.png" alt="" aria-hidden="true" />
        <div className="section-inner">
          <div className="section-kicker reveal"><span className="line" aria-hidden="true" /><span className="mono">The idea lab / Point of view</span></div>
          <div className="thesis-layout">
            <div>
              <h2 className="section-heading display reveal">The nimble path<br />between <em>spark</em><br />and <em>signal.</em></h2>
              <div className="thesis-copy reveal delay-1"><p>Most good ideas do not need a committee. They need a clear read, a fast first move, and enough room to become themselves.</p><p>We work with people who can see the shape of what should exist — then help give it altitude.</p></div>
            </div>
            <p className="thesis-note reveal delay-2">Less ceremony.<br /><span>More lift.</span></p>
          </div>
          <div className="route-bridge reveal"><span className="mono">Next / Background & Mission</span><Link className="text-link mono" href="/about">What we do <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        </div>
      </section>

      <section className="section home-path" data-testid="section-path">
        <div className="section-inner path-layout">
          <div className="path-intro">
            <div className="section-kicker reveal"><span className="line" aria-hidden="true" /><span className="mono">The nimble path</span></div>
            <h2 className="display reveal"><span className="line-break">From <em>idea</em></span><br /><span className="line-break">to <em>reality.</em></span></h2>
            <p className="reveal delay-1">One spark, four ways to bring an idea to life. Start where the uncertainty is highest.</p>
          </div>
          <div className="path-list">
            {pathSteps.map(([number, title, description]) => (
              <div className="path-step reveal" key={number} data-testid={`item-path-${number}`}>
                <span className="path-step-index mono">{number}</span><h3>{title}</h3><p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactSection />
    </Shell>
  );
}

function PageHero({ number, title, emphasis, description }: { number: string; title: string; emphasis: string; description: string }) {
  return (
    <section className="page-hero" data-testid={`section-page-hero-${number}`}>
      <div className="page-hero-inner">
        <div className="page-kicker mono reveal visible">Nimble Nimbus / {number}</div>
        <h1 className="page-title display reveal visible delay-1">{title}<br /><em>{emphasis}</em></h1>
        <p className="page-dek reveal visible delay-2">{description}</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <Shell>
      <PageHero number="01" title="An idea accelerator for" emphasis="clear skies." description="Nimble Nimbus is an independent idea accelerator lab for people with a sharp idea and no appetite for unnecessary ceremony." />
      <section className="section editorial-body" data-testid="section-about-mission">
        <div className="section-inner editorial-split">
          <span className="editorial-label mono reveal">Background &amp; Mission</span>
          <div className="editorial-copy reveal delay-1">
            <p>We started Nimble Nimbus because the earliest stage of an idea deserves more than a pitch deck and less than a machine.</p>
            <p>Our job is to make the signal visible. We ask the unsparing question, build enough to learn, and stay close until the next move is obvious.</p>
            <p className="small-copy">That can mean a week of solo discovery, a prototype that makes the risk tangible, or a longer partnership that carries a product through its first real mile. The shape changes. The standard does not.</p>
          </div>
        </div>
      </section>
      <section className="section quote-band">
        <div className="section-inner">
          <p className="quote-mark reveal">The best work begins when an idea has room to become <em>specific.</em></p>
          <div className="principles">
            {principles.map(([title, copy], index) => <article className="principle reveal" key={title}><span className="mono">{`0${index + 1}`}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>
      <RouteBridge next="/labs" nextLabel="See the Labs" label="Next / Rapid discovery and prototypes" />
    </Shell>
  );
}

function RouteBridge({ next, nextLabel, label }: { next: string; nextLabel: string; label: string }) {
  const isExternal = next.startsWith('http://') || next.startsWith('https://');
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <section className="section page-end">
      <div className="section-inner route-bridge reveal">
        <span className="mono">{label}</span>
        {isExternal ? (
          <a className="text-link mono" href={next} target="_blank" rel="noopener noreferrer">{nextLabel} <ArrowRight size={16} aria-hidden="true" /></a>
        ) : (
          <Link className="text-link mono" href={next} onClick={handleClick}>{nextLabel} <ArrowRight size={16} aria-hidden="true" /></Link>
        )}
      </div>
    </section>
  );
}

function Labs() {
  return (
    <Shell>
      <PageHero number="02" title="Find the" emphasis="signal." description="Rapid solo discovery and prototyping sprints for the moment when the question is still more valuable than the answer." />
      <section className="section editorial-body" data-testid="section-labs-sprint">
        <div className="section-inner">
          <div className="section-kicker reveal"><span className="line" aria-hidden="true" /><span className="mono">Labs / Short runway, real signal</span></div>
          <div className="lab-sprint">
            <div className="sprint-figure reveal" aria-hidden="true"><div className="sprint-orbit" /><span className="sprint-word">make<br />clear.</span></div>
            <div className="sprint-copy reveal delay-1"><strong>One focused sprint.<br />A more useful unknown.</strong><p>We work beside you, not around you. A compact run of interviews, framing, experiments, and one convincing prototype turns the fog into a decision.</p><p>Labs is designed for solo founders, independent operators, and small teams before the overhead arrives.</p></div>
          </div>
          <div className="incubation-line">
            {[
              ['01', 'Frame', 'The sharpest version of the problem and the audience who feels it.'],
              ['02', 'Test', 'Fast artifacts that invite a real response instead of a polite opinion.'],
              ['03', 'Hand off', 'A clear next move: build, partner, pause, or let it go.'],
            ].map(([number, title, copy]) => <article className="incubation-item reveal" key={number}><span className="mono">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>
      <RouteBridge next="/ventures" nextLabel="Enter Ventures" label="Next / Solution acceleration until MVP" />
    </Shell>
  );
}

function Ventures() {
  return (
    <Shell>
      <PageHero number="03" title="Stay for the" emphasis="build." description="Solution acceleration until an MVP is built, tested, and ready for the kind of attention that makes it stronger." />
      <section className="section editorial-body">
        <div className="section-inner editorial-split">
          <span className="editorial-label mono reveal">Ventures / Solution acceleration</span>
          <div className="editorial-copy reveal delay-1">
            <p>Some ideas need a longer runway. Ventures is the close, practical partnership between a promising prototype and a first product people can use.</p>
            <p>We shape the product, the story, and the operating rhythm together — keeping the team small enough to hear what the work is saying.</p>
            <p className="small-copy">The milestone is not a launch-shaped date. It is a tested MVP with a reason to keep going.</p>
          </div>
        </div>
        <div className="incubation-line">
          {[
            ['01', 'Shape', 'Turn the prototype into a product point of view with edges.'],
            ['02', 'Make', 'Design, engineering, and the unglamorous decisions between them.'],
            ['03', 'Prove', 'Put the MVP in the world and learn what deserves another mile.'],
          ].map(([number, title, copy]) => <article className="incubation-item reveal" key={number}><span className="mono">{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <section className="section quote-band"><div className="section-inner"><p className="quote-mark reveal">Build the thing that lets the <em>next question</em> appear.</p></div></section>
      <RouteBridge next="/nexus" nextLabel="Meet Nexus" label="Next / Talent syndicate and partnerships" />
    </Shell>
  );
}

function Nexus() {
  return (
    <Shell>
      <PageHero number="04" title="Bring the right" emphasis="orbit." description="The Talent Syndicate & Partnership layer that brings an idea to life — with the exact people its next chapter needs." />
      <section className="section editorial-body">
        <div className="section-inner editorial-split">
          <span className="editorial-label mono reveal">Nexus / The partnership layer</span>
          <div className="editorial-copy reveal delay-1">
            <p>The right collaborator does more than add capacity. They change the quality of the room.</p>
            <p>Nexus is our trusted network of builders, operators, storytellers, and specialists. We bring people in around a real need, with a clear role and enough context to make a meaningful contribution.</p>
            <p className="small-copy">No endless bench. No warm-body staffing. A carefully composed orbit for the work in front of you.</p>
          </div>
        </div>
        <div className="nexus-roster">
          {[
            ['01', 'Builders', 'Technical range for making the first durable version.'],
            ['02', 'Operators', 'Practical judgment when the product meets the world.'],
            ['03', 'Storytellers', 'Language and narrative that make the idea legible.'],
            ['04', 'Specialists', 'Deep context for the exact edge that matters.'],
          ].map(([number, title, copy]) => <article className="roster-item reveal" key={number}><span className="mono">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        </div>
      </section>
      <RouteBridge next="/insights" nextLabel="Read Insights" label="Next / Knowledge base and deep dives" />
    </Shell>
  );
}

function Insights() {
  const [activeArticle, setActiveArticle] = useState<(typeof articles)[number] | null>(null);

  useEffect(() => {
    if (!activeArticle) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveArticle(null); };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.body.style.overflow = '';
    };
  }, [activeArticle]);

  return (
    <Shell>
      <PageHero number="05" title="Notes from" emphasis="above." description="A Knowledge Base & Deep Dives publication for the questions behind the work. Read slowly. Take what is useful." />
      <section className="section editorial-body" data-testid="section-insights-publication">
        <div className="section-inner">
          <div className="insights-lead">
            <article className="lead-story reveal"><span className="mono">Latest dispatch / 14.05.25</span><h2>Make the first version easy to argue with.</h2><p>A note on why useful prototypes should create productive disagreement before they create confidence.</p></article>
            <p className="publication-note reveal delay-1"><strong>Nimble Nimbus Notes</strong>A field publication about early-stage product thinking, creative partnership, and the useful distance between an idea and its next move.</p>
          </div>
          <div className="article-list" data-testid="list-insights">
            {articles.map((article) => (
              <button className="article-row reveal" type="button" key={article.number} onClick={() => setActiveArticle(article)} data-testid={`button-article-${article.number}`}>
                <span className="article-index mono">{article.number}</span><span className="article-title">{article.title}</span><span className="article-meta mono">{article.category}</span><ArrowUpRight className="article-arrow" size={19} strokeWidth={1.4} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>
      <RouteBridge next="https://www.linkedin.com/in/wheresjek/" nextLabel="Connect" label="Keep the altitude / Have an idea?" />
      {activeArticle && (
        <div className="insights-reader-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveArticle(null); }} data-testid="modal-insight-backdrop">
          <article className="insights-reader" role="dialog" aria-modal="true" aria-labelledby="insight-title" data-testid="modal-insight">
            <button className="reader-close" type="button" onClick={() => setActiveArticle(null)} aria-label="Close article" data-testid="button-close-article"><X size={18} strokeWidth={1.5} /></button>
            <span className="mono">{activeArticle.number} / {activeArticle.category}</span>
            <h2 id="insight-title">{activeArticle.title}</h2>
            <p>{activeArticle.intro}</p><p>{activeArticle.body}</p>
          </article>
        </div>
      )}
    </Shell>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/labs" component={Labs} />
        <Route path="/ventures" component={Ventures} />
        <Route path="/nexus" component={Nexus} />
        <Route path="/insights" component={Insights} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
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