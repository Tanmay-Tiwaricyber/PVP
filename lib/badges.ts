/**
 * The pins. Every badge here was actually earned, and every caption states what
 * it was earned for — a badge wall is only worth building if the wall is true.
 *
 * GitHub achievements have no public artwork, so they are drawn inline as marks
 * (see components/badge-art.tsx). TryHackMe serves its own badge files, which
 * are used as-is so the pins match the profile a visitor can open in a tab.
 */

export type BadgeArt =
  | { kind: "image"; src: string }
  | { kind: "mark"; figure: "shark" | "star" | "dev" | "seal" };

export type Badge = {
  id: string;
  name: string;
  /** shown as the big figure on rank cards */
  figure?: string;
  issuer: "GitHub" | "TryHackMe" | "Cyber Hacktics";
  /** small right-aligned tag: a count, a league, a level */
  tag?: string;
  note: string;
  when?: string;
  kind: "achievement" | "credential" | "rank";
  art: BadgeArt;
  href: string;
};

export const badges: Badge[] = [
  {
    id: "thm-legend",
    name: "Legend",
    figure: "Top 1%",
    issuer: "TryHackMe",
    tag: "league",
    note: "Placed in the top one per cent of all players on the platform. Highest league reached: Silver.",
    when: "2022 — 26",
    kind: "rank",
    art: { kind: "mark", figure: "seal" },
    href: "https://tryhackme.com/p/TanmayTiwari",
  },
  {
    id: "thm-pentest",
    name: "Pentesting Principles",
    issuer: "TryHackMe",
    note: "Earned for the offensive security intro — recon, exploitation and the frame of mind that comes with it.",
    kind: "achievement",
    art: { kind: "image", src: "https://assets.tryhackme.com/img/badges/introtooffensivesecurity.png" },
    href: "https://tryhackme.com/p/TanmayTiwari",
  },
  {
    id: "thm-linux",
    name: "cat linux.txt",
    issuer: "TryHackMe",
    note: "Earned for the Linux fundamentals path — the shell as a working tool, not a thing to fear.",
    kind: "achievement",
    art: { kind: "image", src: "https://assets.tryhackme.com/img/badges/linux.png" },
    href: "https://tryhackme.com/p/TanmayTiwari",
  },
  {
    id: "thm-metasploit",
    name: "Metasploitable",
    issuer: "TryHackMe",
    note: "Earned by taking a deliberately vulnerable machine apart end to end.",
    kind: "achievement",
    art: { kind: "image", src: "https://assets.tryhackme.com/img/badges/metasploit.png" },
    href: "https://tryhackme.com/p/TanmayTiwari",
  },
  {
    id: "thm-webbed",
    name: "Webbed",
    issuer: "TryHackMe",
    note: "Earned on web exploitation — injection, broken auth, and the server-side mistakes that cause them.",
    kind: "achievement",
    art: { kind: "image", src: "https://assets.tryhackme.com/img/badges/webbed.png" },
    href: "https://tryhackme.com/p/TanmayTiwari",
  },
  {
    id: "thm-mrrobot",
    name: "Mr. Robot",
    issuer: "TryHackMe",
    note: "Earned on the Mr. Robot CTF — enumeration, a foothold, then privilege escalation.",
    kind: "achievement",
    art: { kind: "image", src: "https://assets.tryhackme.com/img/badges/mrrobot.png" },
    href: "https://tryhackme.com/p/TanmayTiwari",
  },
  {
    id: "gh-pullshark",
    name: "Pull Shark",
    issuer: "GitHub",
    tag: "×2",
    note: "Awarded for merging pull requests — 16 of them on this account, across other people's repositories too.",
    when: "since 2021",
    kind: "achievement",
    art: { kind: "mark", figure: "shark" },
    href: "https://github.com/Tanmay-Tiwaricyber?tab=achievements",
  },
  {
    id: "gh-starstruck",
    name: "Starstruck",
    issuer: "GitHub",
    tag: "×2",
    note: "Awarded when a repository of mine passed sixteen stars without being asked.",
    when: "since 2021",
    kind: "achievement",
    art: { kind: "mark", figure: "star" },
    href: "https://github.com/Tanmay-Tiwaricyber?tab=achievements",
  },
  {
    id: "gh-devprogram",
    name: "Developer Program",
    issuer: "GitHub",
    note: "Member of the GitHub Developer Program — API access, early surfaces, an account that is not a hobby.",
    when: "since 2021",
    kind: "credential",
    art: { kind: "mark", figure: "dev" },
    href: "https://github.com/Tanmay-Tiwaricyber",
  },
  {
    id: "deadface",
    name: "DEADFACE CTF",
    issuer: "Cyber Hacktics",
    tag: "2024",
    note: "Competed as Cyb3r.t1nm1y. Verified credential issued by Cyber Hacktics.",
    when: "2024",
    kind: "credential",
    art: { kind: "mark", figure: "seal" },
    href: "https://api.badgr.io/public/assertions/dl6ok0qiTRuMH-vLdOXKog?identity__email=tanmaytiwaricyber@gmail.com",
  },
  {
    id: "gh-repos",
    name: "Public record",
    figure: "175",
    issuer: "GitHub",
    tag: "repos",
    note: "Public repositories, 435 stars between them, since October 2021. The whole apprenticeship, in the open.",
    when: "since 2021",
    kind: "rank",
    art: { kind: "mark", figure: "star" },
    href: "https://github.com/Tanmay-Tiwaricyber?tab=repositories",
  },
];

export const issuerCount = {
  github: badges.filter((b) => b.issuer === "GitHub").length,
  tryhackme: badges.filter((b) => b.issuer === "TryHackMe").length,
  other: badges.filter((b) => b.issuer === "Cyber Hacktics").length,
};
