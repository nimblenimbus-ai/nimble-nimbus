export interface Article {
  number: string;
  category: string;
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

export const pathSteps = [
  [
    "01",
    "Discover",
    "Name the real question before anyone starts decorating the answer.",
  ],
  [
    "02",
    "Prototype",
    "Make the smallest convincing thing, then put it in the hands of people who matter.",
  ],
  [
    "03",
    "Accelerate",
    "Turn battle-tested prototypes into a working MVP and validate with real users.",
  ],
  [
    "04",
    "Connect",
    "Bring in the right talent and skills to gain the momentum it deserves.",
  ],
] as const;

export type PathStep = (typeof pathSteps)[number];

export const principles = [
  [
    "Altitude",
    "The useful distance between a bright idea and a better decision.",
  ],
  ["Velocity", "Forward motion without confusing speed for progress."],
  [
    "Candor",
    "A clear read on what is working, what is not, and what to try next.",
  ],
  [
    "Care",
    "Small details are not ceremony when they change how an idea lands.",
  ],
] as const;

export type Principle = (typeof principles)[number];

export const articles: readonly Article[] = [
  {
    number: "01",
    category: "Field note / 02 min",
    title: "The altitude test: knowing when to zoom out",
    intro:
      "A practical note on finding the useful distance from a problem before the solution starts making noise.",
    body: "The first version of a product is rarely a product. It is a point of view with enough shape to be argued with. The altitude test is simple: can you describe the change you want to create without describing the interface? If not, go higher. The sharper question usually arrives just after the obvious answer.",
  },
  {
    number: "02",
    category: "Deep dive / 02 min",
    title: "A prototype is a conversation, not a miniature launch",
    intro:
      "What to build when certainty is expensive and the useful signal is still hiding.",
    body: "A prototype earns its keep by making a conversation more specific. It should expose the risk, not disguise it. We look for one behavior, one audience, and one honest moment of friction. Everything else can wait until the question has earned more detail.",
  },
  {
    number: "03",
    category: "Dispatch / 02 min",
    title: "The quiet power of the right collaborator",
    intro:
      "A field guide to knowing which missing perspective can move an idea forward.",
    body: "Partnership is not a roster exercise. The best collaborator changes the quality of the question in the room. We bring people in for a distinct point of view, a specific craft, or a lived relationship to the problem — never just to make the team look complete.",
  },
  {
    number: "04",
    category: "Nibble / 03 min",
    title: "Nibble #01: Escaping the Feature Factory",
    intro:
      "How to move software organisations from shipping endless outputs to managing by real outcomes.",
    body: 'Shipping software is an activity, not an achievement. Success only starts when customer behaviour changes. To escape the feature factory, teams must separate outputs (what you build) from outcomes (measurable behavioural change). Frame goals as a two-way negotiation, single-task squads on one primary outcome for 2–3 quarters, distinguish discovery learning from performance targets, and redefine "Done" to evaluate real-world impact.',
    link: "https://nimblenimbus.substack.com/p/nibble-01-escaping-the-feature-factory",
    linkText: "Read full post on Substack",
  },
] as const;
