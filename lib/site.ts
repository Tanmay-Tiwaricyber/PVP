/**
 * Content, all of it checkable.
 * GitHub figures pulled from the public API; TryHackMe figures read directly off
 * https://tryhackme.com/p/TanmayTiwari (captured Nov 2026).
 */

export const profile = {
  name: "Tanmay Tiwari",
  alias: "Silent Programmer",
  role: "Full-stack engineer · Security builder",
  location: "Kanpur, Uttar Pradesh, India",
  timezone: "Asia/Kolkata",
  email: "tanmaytiwaricyber@gmail.com",
  org: { name: "Remote Coders 2022", url: "https://github.com/Remotecoders2022" },
  links: {
    github: "https://github.com/Tanmay-Tiwaricyber",
    linkedin: "https://www.linkedin.com/in/tanmay-tiwari-a4a551235",
    tryhackme: "https://tryhackme.com/p/TanmayTiwari",
    orcid: "https://orcid.org/0009-0004-8455-0989",
  },
} as const;

export const stats = [
  { value: 175, label: "Public repositories", note: "140 original" },
  { value: 435, label: "Stars earned", note: "account total" },
  { value: 101, label: "Followers", note: "organic" },
  { value: 5, label: "Years shipping", note: "since Oct 2021" },
];

/* ---------- Selected work ---------- */

export type Project = {
  index: string;
  title: string;
  kicker: string;
  year: string;
  stack: string[];
  metric: string;
  repo: string;
  live?: string;
  summary: string;
  points: string[];
  figure: "island" | "match" | "gdb" | "synth" | "judge" | "garuda";
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Hyper Island",
    kicker: "A Dynamic Island for Windows",
    year: "2026",
    stack: ["C++", "Windhawk", "Win32", "Direct2D"],
    metric: "3 ★",
    repo: "https://github.com/Tanmay-Tiwaricyber/HyperLand",
    summary:
      "A liquid-glass overlay that turns the top of the desktop into one surface — media, volume, brightness, notifications, focus and clipboard. It runs in its own process and never injects into Explorer.",
    points: [
      "Real blur-behind with caustic highlights and a cursor-following light",
      "Spring-driven expand with content scaling during the morph",
      "Six backdrop styles, inline Key=Value overrides",
    ],
    figure: "island",
  },
  {
    index: "02",
    title: "C Visualize",
    kicker: "Write C, replay it under GDB",
    year: "2026",
    stack: ["Node.js", "GCC", "GDB", "ES modules"],
    metric: "Real debugger",
    repo: "https://github.com/Tanmay-Tiwaricyber/C-visualize",
    summary:
      "An interactive C laboratory. Code travels through a sandbox to a real compiler and debugger, and the recorded trace returns as a synchronised timeline of lines, variables, stack frames and memory addresses.",
    points: [
      "Nothing is simulated by pattern-matching the source",
      "/api/health reports a degraded toolchain honestly",
      "Flowchart, memory, call stack and console attributed per step",
    ],
    figure: "gdb",
  },
  {
    index: "03",
    title: "ContribMatch",
    kicker: "An issue you can actually finish",
    year: "2026",
    stack: ["JavaScript", "Gemma", "GitHub API"],
    metric: "Open weight",
    repo: "https://github.com/Tanmay-Tiwaricyber/contribmatch",
    live: "https://Tanmay-Tiwaricyber.github.io/contribmatch/",
    summary:
      "A browser-only matcher that reads public GitHub data and scores beginner-friendly issues with explainable rules, then lets an open-weight model refine the shortlist. No backend, no account, no tracking.",
    points: [
      "Every number on screen is rule-based and auditable",
      "Answers the four questions a newcomer actually has",
      "Runs entirely client-side",
    ],
    figure: "match",
  },
  {
    index: "04",
    title: "SyncPlay",
    kicker: "Same beat, every device",
    year: "2026",
    stack: ["Node.js", "WebSockets", "Express"],
    metric: "Drift-corrected",
    repo: "https://github.com/Tanmay-Tiwaricyber/SyncPlay",
    summary:
      "A listening room that keeps permitted previews aligned across many phones. Short-code and QR invites, a shared queue, one host timeline, personal volume for everyone.",
    points: [
      "Client clock estimation with three levels of drift correction",
      "Outdoor DJ: six activity modes turning intent into a playlist",
      "In-memory rooms that expire on their own",
    ],
    figure: "synth",
  },
  {
    index: "05",
    title: "Judge-Ready",
    kicker: "A judging panel for your repo",
    year: "2026",
    stack: ["Rubrics", "Secret scanning", "SKILL.md"],
    metric: "Score /100",
    repo: "https://github.com/Tanmay-Tiwaricyber/Judge-Ready",
    summary:
      "A skill that audits a repository the way a real panel would: a score out of 100, a seven-category scorecard tied to evidence, and fixes ranked by points gained against effort spent.",
    points: [
      "Six modes including roast and Hinglish, five personas",
      "Secrets scanned first — a committed key outranks everything",
      "Every fix carries a points gain and effort estimate",
    ],
    figure: "judge",
  },
  {
    index: "06",
    title: "GARUDA Club",
    kicker: "Identity for an open-source club",
    year: "2026",
    stack: ["HTML", "CSS", "Art direction"],
    metric: "Three iterations",
    repo: "https://github.com/Tanmay-Tiwaricyber/GARUDA-OSC",
    summary:
      "Three self-contained takes on one identity — hero artwork, ember storms, circuit-wing decals — built so a club with no build pipeline can still ship a site that looks engineered.",
    points: [
      "Base64 inlining so version one runs from a single file",
      "V3 separates graphics for real deployment",
      "Zero dependencies, still animated",
    ],
    figure: "garuda",
  },
];

/* ---------- TryHackMe dossier ---------- */

export const thm = {
  handle: "TanmayTiwari",
  href: profile.links.tryhackme,
  joined: "March 2022",
  captured: "November 2026",
  league: "Legend",
  leaguePeak: "Silver",
  ranking: "Top 1%",
  capability: 70,
  streak: 40,
  followers: 5,
  following: 3,
  badges: [
    { name: "Pentesting Principles", src: "https://assets.tryhackme.com/img/badges/introtooffensivesecurity.png" },
    { name: "cat linux.txt", src: "https://assets.tryhackme.com/img/badges/linux.png" },
    { name: "Metasploitable", src: "https://assets.tryhackme.com/img/badges/metasploit.png" },
    { name: "Webbed", src: "https://assets.tryhackme.com/img/badges/webbed.png" },
    { name: "Mr. Robot", src: "https://assets.tryhackme.com/img/badges/mrrobot.png" },
  ],
  tools: ["Nmap", "Burp Suite", "Wireshark", "Hydra", "Hashcat", "Linux", "Windows", "Web"],
  rooms: [
    { name: "What is Networking?", level: "Info", time: "30 min" },
    { name: "Learning Cyber Security", level: "Easy", time: "45 min" },
    { name: "Offensive Security Intro", level: "Easy", time: "15 min" },
  ],
  skills: ["Foundational", "Security Analyst", "Penetration Tester", "Security Engineer"],
  ctf: {
    name: "DEADFACE CTF",
    edition: "2024",
    role: "Competitor",
    team: "Cyb3r.t1nm1y",
    issuer: "Cyber Hacktics",
    credential:
      "https://api.badgr.io/public/assertions/dl6ok0qiTRuMH-vLdOXKog?identity__email=tanmaytiwaricyber@gmail.com",
  },
};

/* ---------- Capabilities ---------- */

export const capabilities = [
  {
    no: "I",
    title: "Product engineering",
    body: "Next.js, React and TypeScript fronts wired to Node services — shipped, not prototyped. Interfaces that hold up for a real user on a bad connection.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Node.js"],
  },
  {
    no: "II",
    title: "Systems & native",
    body: "C++ on Win32 through Windhawk, GDB-driven tooling, Linux internals. The layer where timing and memory stop being abstractions.",
    tags: ["C++", "Win32", "GDB", "Linux"],
  },
  {
    no: "III",
    title: "Security engineering",
    body: "Five years of rooms, CTFs and offensive tooling — which mostly taught me to build things that fail safely instead of loudly.",
    tags: ["Recon", "CTF", "Threat modelling", "Hardening"],
  },
  {
    no: "IV",
    title: "Applied AI",
    body: "Open-weight models where they earn their place: explainable scoring, structured intent, coaching copy. Rules first, model second.",
    tags: ["Gemma", "Gemini", "OpenAI-compatible", "RAG"],
  },
];

/* ---------- Timeline ---------- */

export const timeline = [
  {
    year: "2026",
    title: "Systems, not demos",
    body: "Hyper Island, C Visualize, SyncPlay, ContribMatch and Judge-Ready in one season — each finished to the point of a real deployment story.",
  },
  {
    year: "2025",
    title: "Interface work and product bets",
    body: "Bazaar Buddy, NEXTStep, redesigned Steam and Telegram surfaces, and a streak of Next.js products. The year the design sense caught the engineering up.",
  },
  {
    year: "2024",
    title: "Open source and the CTF circuit",
    body: "Hacktoberfest contributions, DEADFACE CTF 2024 as Cyb3r.t1nm1y, the TryHackMe climb into Legend league, and tooling that reached other people's machines.",
  },
  {
    year: "2021 — 23",
    title: "The first hundred repositories",
    body: "The account opened in October 2021 and stayed public: security utilities, bots, web experiments, school projects. The whole apprenticeship, in the open.",
  },
];

export const awards = [
  "DEADFACE CTF 2024 · Competitor",
  "TryHackMe · Legend league",
  "TryHackMe · Top 1%",
  "TryHackMe · 40-day streak",
  "ORCID · 0009-0004-8455-0989",
  "GitHub · Pull Shark ×2",
  "GitHub · Starstruck ×2",
  "GitHub Developer Program",
];

export const chapters = [
  { id: "work", label: "Work", no: "02" },
  { id: "craft", label: "Craft", no: "03" },
  { id: "security", label: "Security", no: "04" },
  { id: "path", label: "Path", no: "05" },
  { id: "archive", label: "Archive", no: "06" },
  { id: "contact", label: "Contact", no: "07" },
];
