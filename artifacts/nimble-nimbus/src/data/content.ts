export type PublicationType = "Nibble" | "Field Note" | "Deep Dive";

export interface Article {
  id: string;
  type: PublicationType;
  readTime: string;
  title: string;
  intro: string;
  body: string;
  link?: string;
  linkText?: string;
}

export const navItems = [
  { label: "About", href: "/about" },
  { label: "Labs", href: "/labs" },
  { label: "Ventures", href: "/ventures" },
  { label: "Nexus", href: "/nexus" },
  { label: "Insights", href: "/insights" },
] as const;

export type NavItem = (typeof navItems)[number];

export interface PathStep {
  tag: string;
  title: string;
  description: string;
}

export const pathSteps: readonly PathStep[] = [
  {
    tag: "FOCUS // DISCOVERY",
    title: "Discover",
    description: "Name the real question before anyone starts decorating the answer.",
  },
  {
    tag: "FOCUS // PROTOTYPING",
    title: "Prototype",
    description: "Make the smallest convincing thing, then put it in the hands of people who matter.",
  },
  {
    tag: "FOCUS // ACCELERATION",
    title: "Accelerate",
    description: "Turn battle-tested prototypes into a working MVP and validate with real users.",
  },
  {
    tag: "FOCUS // NETWORK",
    title: "Connect",
    description: "Bring in the right talent and skills to gain the momentum it deserves.",
  },
] as const;

export interface Principle {
  tag: string;
  title: string;
  copy: string;
}

export const principles: readonly Principle[] = [
  {
    tag: "AXIS // PERSPECTIVE",
    title: "Altitude",
    copy: "The useful distance between a bright idea and a better decision.",
  },
  {
    tag: "AXIS // MOMENTUM",
    title: "Velocity",
    copy: "Forward motion without confusing speed for progress.",
  },
  {
    tag: "AXIS // TRUTH",
    title: "Candor",
    copy: "A clear read on what is working, what is not, and what to try next.",
  },
  {
    tag: "AXIS // CRAFT",
    title: "Care",
    copy: "Small details are not ceremony when they change how an idea lands.",
  },
] as const;

export const articles: readonly Article[] = [
  {
    id: "field-note-altitude",
    type: "Field Note",
    readTime: "02 min",
    title: "The altitude test: knowing when to zoom out",
    intro:
      "A practical note on finding the useful distance from a problem before the solution starts making noise.",
    body: "The first version of a product is rarely a product. It is a point of view with enough shape to be argued with. The altitude test is simple: can you describe the change you want to create without describing the interface? If not, go higher. The sharper question usually arrives just after the obvious answer.",
  },
  {
    id: "deep-dive-prototype",
    type: "Deep Dive",
    readTime: "04 min",
    title: "A prototype is a conversation, not a miniature launch",
    intro:
      "What to build when certainty is expensive and the useful signal is still hiding.",
    body: "A prototype earns its keep by making a conversation more specific. It should expose the risk, not disguise it. We look for one behavior, one audience, and one honest moment of friction. Everything else can wait until the question has earned more detail.",
    link: "https://nimblenimbus.substack.com/",
    linkText: "Read deep dive on Substack",
  },
  {
    id: "field-note-collaborator",
    type: "Field Note",
    readTime: "02 min",
    title: "The quiet power of the right collaborator",
    intro:
      "A field guide to knowing which missing perspective can move an idea forward.",
    body: "Partnership is not a roster exercise. The best collaborator changes the quality of the question in the room. We bring people in for a distinct point of view, a specific craft, or a lived relationship to the problem — never just to make the team look complete.",
  },
  {
    id: "nibble-01-feature-factory",
    type: "Nibble",
    readTime: "03 min",
    title: "Nibble #01: Escaping the Feature Factory",
    intro:
      "How to move software organisations from shipping endless outputs to managing by real outcomes.",
    body: 'Shipping software is an activity, not an achievement. Success only starts when customer behaviour changes. To escape the feature factory, teams must separate outputs (what you build) from outcomes (measurable behavioural change). Frame goals as a two-way negotiation, single-task squads on one primary outcome for 2–3 quarters, distinguish discovery learning from performance targets, and redefine "Done" to evaluate real-world impact.',
    link: "https://nimblenimbus.substack.com/p/nibble-01-escaping-the-feature-factory",
    linkText: "Read full post on Substack",
  },
  {
    id: "nibble-02-code-bottleneck",
    type: "Nibble",
    readTime: "03 min",
    title: "Nibble #02: Writing code is no longer the bottleneck",
    intro:
      "Why the next tech wave belongs to seasoned builders with deep domain expertise and operational discernment.",
    body: "For decades, tech romanticised the twenty-something founder hacking in a hoodie. But with the mechanical production layer commoditised by modern agentic workflows, writing code is no longer the bottleneck. When execution labour drops to near zero, the scarce assets commanding maximum leverage are taste, domain knowledge, and operational discernment. Seasoned operators who know where legacy systems fail can now deploy autonomous agent fleets to build, test, and ship working solutions in days rather than months.",
    link: "https://nimblenimbus.substack.com/p/nibbles-02-writing-code-is-no-longer",
    linkText: "Read full post on Substack",
  },
] as const;
