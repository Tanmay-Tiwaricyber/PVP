/**
 * Single source of truth for portfolio content.
 * Every number here was pulled from Tanmay's public GitHub (Nov 2026).
 */

export const profile = {
  name: "Tanmay Tiwari",
  alias: "Silent Programmer",
  role: "Full-stack engineer · Cybersecurity builder",
  location: "Kanpur, Uttar Pradesh, India",
  timezone: "Asia/Kolkata",
  email: "tanmaytiwaricyber@gmail.com",
  bio: "I am Silent Programmer.",
  statement:
    "I build software that respects the person using it — fast, private by default, and finished enough to survive a real deadline.",
  links: {
    github: "https://github.com/Tanmay-Tiwaricyber",
    linkedin: "https://www.linkedin.com/in/tanmay-tiwari-a4a551235",
    orcid: "https://orcid.org/0009-0004-8455-0989",
    tryhackme: "https://tryhackme.com/p/TanmayTiwari",
    site: "https://tanmay-tiwaricyber.github.io/",
    remoteCoders: "https://r3mote-cod3rs.netlify.app/",
    oldPortfolio: "https://txt4nm4y.vercel.app/",
  },
  org: { name: "Remote Coders 2022", url: "https://github.com/Remotecoders2022" },
} as const;

export const stats = [
  { value: 175, suffix: "", label: "public repositories", note: "140 original" },
  { value: 435, suffix: "", label: "stars earned", note: "across the account" },
  { value: 101, suffix: "", label: "GitHub followers", note: "organic" },
  { value: 6, suffix: "", label: "years shipping", note: "since Oct 2021" },
];

export const marqueeWords = [
  "TypeScript",
  "Next.js",
  "React",
  "Python",
  "C++",
  "GDB",
  "WebSockets",
  "Node.js",
  "Tailwind",
  "Security research",
  "Systems",
  "Interface design",
];

export type Project = {
  index: string;
  title: string;
  tagline: string;
  year: string;
  kind: string;
  stack: string[];
  metric?: string;
  repo: string;
  live?: string;
  accent: string;
  summary: string;
  points: string[];
  glyph: "island" | "thread" | "gdb" | "synth" | "match" | "rocket";
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Hyper Island",
    tagline: "An iOS-style Dynamic Island for Windows, as a Windhawk mod.",
    year: "2026",
    kind: "Systems · C++ · Windhawk",
    stack: ["C++", "Windhawk", "Win32", "Direct2D"],
    metric: "3 ★",
    repo: "https://github.com/Tanmay-Tiwaricyber/HyperLand",
    accent: "#ff4d1f",
    summary:
      "A liquid-glass overlay that turns the top of the desktop into one surface: media, volume, brightness, notifications, focus and clipboard. Runs in its own process — it never injects into Explorer.",
    points: [
      "Real blur-behind with boosted saturation, caustic highlights and a cursor-following light",
      "Spring-driven expand/collapse with content scaling during the morph",
      "Six backdrop styles, theme auto-detection, inline Key=Value config overrides",
    ],
    glyph: "island",
  },
  {
    index: "02",
    title: "ContribMatch",
    tagline: "Find an issue you can actually finish — then get coached through it.",
    year: "2026",
    kind: "AI tooling · Hacktoberfest",
    stack: ["JavaScript", "Gemma", "GitHub API", "Zero backend"],
    metric: "Open weight",
    repo: "https://github.com/Tanmay-Tiwaricyber/contribmatch",
    live: "https://Tanmay-Tiwaricyber.github.io/contribmatch/",
    accent: "#6fe3ff",
    summary:
      "A browser-only matcher that reads public GitHub data, scores beginner-friendly issues with explainable rules, and lets an open-weight Gemma model refine the shortlist and write the coaching notes.",
    points: [
      "Every number on screen is rule-based and auditable — no black boxes",
      "Answers four questions a newcomer actually has, in one screen",
      "No account, no backend, no data collection",
    ],
    glyph: "match",
  },
  {
    index: "03",
    title: "C Visualize",
    tagline: "Write C in the browser. Compile it for real. Replay it under GDB.",
    year: "2026",
    kind: "Developer tool · Sandboxed execution",
    stack: ["Node.js", "Express", "GCC", "GDB", "ES modules"],
    metric: "Real debugger",
    repo: "https://github.com/Tanmay-Tiwaricyber/C-visualize",
    accent: "#d9f24b",
    summary:
      "An interactive C laboratory. Code travels through a job sandbox to a real compiler and debugger, and the recorded trace comes back as a synchronised timeline of lines, variables, stack and memory addresses.",
    points: [
      "Nothing is simulated by pattern-matching — every frame comes from a stopped process",
      "Timeline, flowchart, memory, call stack and console attributed per step",
      "/api/health honestly reports a degraded toolchain instead of failing silently",
    ],
    glyph: "gdb",
  },
  {
    index: "04",
    title: "SyncPlay",
    tagline: "Same beat. Every device. One outdoor experience.",
    year: "2026",
    kind: "Realtime · WebSockets",
    stack: ["Node.js", "WebSockets", "Express", "Gemma"],
    metric: "Drift-corrected",
    repo: "https://github.com/Tanmay-Tiwaricyber/SyncPlay",
    accent: "#ff7a4d",
    summary:
      "A listening room that keeps permitted music previews aligned across many phones. Short-code and QR invites, a shared queue, one host timeline, and personal volume for everyone.",
    points: [
      "Client clock estimation plus three levels of drift correction",
      "Outdoor DJ: six activity modes turning intent into a playlist",
      "Privacy-first in-memory rooms that expire on their own",
    ],
    glyph: "synth",
  },
  {
    index: "05",
    title: "Judge-Ready",
    tagline: "A judging panel for your hackathon repo — before the judges see it.",
    year: "2026",
    kind: "AI workflow · Claude skill",
    stack: ["SKILL.md", "Rubrics", "Secret scanning"],
    metric: "Score /100",
    repo: "https://github.com/Tanmay-Tiwaricyber/Judge-Ready",
    accent: "#f2efe6",
    summary:
      "A skill that audits a repository the way a real panel would: a score out of 100, a seven-category scorecard tied to evidence, and fixes ranked by points gained against effort spent.",
    points: [
      "Six modes including roast and Hinglish, five judge personas",
      "Secrets are scanned first — a committed key outranks every other finding",
      "Every fix carries a points gain, an effort estimate and a quick-win flag",
    ],
    glyph: "thread",
  },
  {
    index: "06",
    title: "GARUDA Club",
    tagline: "A dark, high-impact home for the open-source club of MIPS Kanpur.",
    year: "2026",
    kind: "Brand · Single-page experience",
    stack: ["HTML", "CSS", "Art direction"],
    metric: "3 iterations",
    repo: "https://github.com/Tanmay-Tiwaricyber/GARUDA-OSC",
    accent: "#ff4d1f",
    summary:
      "Three fully self-contained takes on one identity — hero artwork, ember storms, circuit-wing decals — built so a club with no build pipeline can ship a site that looks engineered.",
    points: [
      "Hard-coded assets and base64 inlining, so version one runs from a single file",
      "V3 separates graphics into a normal asset folder for real deployment",
      "Zero dependencies, still animated",
    ],
    glyph: "rocket",
  },
];

export const capabilities = [
  {
    no: "01",
    title: "Product engineering",
    body: "Next.js, React and TypeScript front ends wired to Node services — shipped, not prototyped. Interfaces that survive a real user on a bad connection.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind", "Node.js"],
  },
  {
    no: "02",
    title: "Systems & native",
    body: "C++ on Win32 through Windhawk, GDB-driven tooling, Linux internals. I like the layer where timing and memory are not abstractions.",
    tags: ["C++", "Win32", "GDB", "Linux", "Process tracing"],
  },
  {
    no: "03",
    title: "Security engineering",
    body: "Six years of CTFs, TryHackMe and offensive tooling on the record — which mostly taught me to build things that fail safely.",
    tags: ["Recon", "CTF", "Threat modelling", "Hardening"],
  },
  {
    no: "04",
    title: "Applied AI",
    body: "Open-weight models where they earn their place: explainable scoring, structured playlist intent, coaching copy. Rules first, model second.",
    tags: ["Gemma", "Gemini", "OpenAI-compatible APIs", "RAG"],
  },
];

export const timeline = [
  {
    year: "2026",
    title: "Shipping systems, not demos",
    body: "Hyper Island, C Visualize, SyncPlay, ContribMatch and Judge-Ready — five releases in the same season, each one finished to the point of a real deployment story.",
    tags: ["C++", "Realtime", "AI tooling"],
  },
  {
    year: "2025",
    title: "Interface work and product bets",
    body: "Bazaar Buddy, NEXTStep, redesigned Steam and Telegram surfaces, and a streak of Next.js products — the year the design sense caught up with the engineering.",
    tags: ["Next.js", "Design systems"],
  },
  {
    year: "2024",
    title: "Open source and the CTF circuit",
    body: "Hacktoberfest contributions, DEADFACE CTF 2024 as Cyb3r.t1nm1y, Badgr-issued credentials, and tools that reached other people's machines.",
    tags: ["Open source", "CTF"],
  },
  {
    year: "2021 — 2023",
    title: "The first 100 repositories",
    body: "Started the account in October 2021 and kept it public. Security utilities, bots, web experiments, school projects — the whole apprenticeship in the open.",
    tags: ["Python", "Web", "Tooling"],
  },
];

export const awards = [
  "DEADFACE CTF 2024 · Competitor",
  "TryHackMe · p/TanmayTiwari",
  "Holopin · verified badge profile",
  "ORCID · 0009-0004-8455-0989",
  "GitHub · Pull Shark ×2",
  "GitHub · Starstruck ×2",
  "GitHub · Galaxy Brain",
  "GitHub Developer Program",
];

/* ---------- TryHackMe ---------- */

export const tryhackme = {
  handle: "TanmayTiwari",
  href: profile.links.tryhackme,
  badge: "https://tryhackme-badges.s3.amazonaws.com/TanmayTiwari.png",
  /** Verified on the profile README: DEADFACE CTF 2024, competitor badge. */
  ctfs: [
    {
      name: "DEADFACE CTF",
      edition: "2024",
      role: "Competitor",
      team: "Cyb3r.t1nm1y",
      issuer: "Cyber Hacktics",
      credential:
        "https://api.badgr.io/public/assertions/dl6ok0qiTRuMH-vLdOXKog?identity__email=tanmaytiwaricyber@gmail.com",
    },
  ],
  domains: [
    { name: "Web exploitation", note: "the layer I build in every day" },
    { name: "OSINT & recon", note: "where most engagements actually start" },
    { name: "Linux privilege escalation", note: "rooms, then my own boxes" },
    { name: "Forensics & stego", note: "CTF discipline under a clock" },
  ],
  /** Deliberately unpopulated until the live rank is confirmed. */
  score: null as number | null,
  rank: null as string | null,
};

export const socials = [
  { label: "GitHub", handle: "@Tanmay-Tiwaricyber", href: profile.links.github },
  { label: "LinkedIn", handle: "in/tanmay-tiwari", href: profile.links.linkedin },
  { label: "TryHackMe", handle: "p/TanmayTiwari", href: profile.links.tryhackme },
  { label: "ORCID", handle: "0009-0004-8455-0989", href: profile.links.orcid },
  { label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
];
