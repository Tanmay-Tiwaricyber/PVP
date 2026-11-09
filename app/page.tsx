import SiteHeader from "@/components/site-header";
import Cover from "@/components/cover";
import Work from "@/components/work";
import Craft from "@/components/craft";
import Security from "@/components/security";
import Path from "@/components/path";
import Archive from "@/components/archive";
import Colophon from "@/components/colophon";
import Ledger from "@/components/ledger";
import { profile, stats, thm } from "@/lib/site";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.alias,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    url: "/",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kanpur",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    sameAs: [
      profile.links.github,
      profile.links.linkedin,
      profile.links.tryhackme,
      profile.links.orcid,
    ],
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "C++",
      "Cybersecurity",
      "Penetration testing",
      "Developer tooling",
    ],
    subjectOf: {
      "@type": "ProfilePage",
      name: `TryHackMe — ${thm.handle}`,
      url: thm.href,
      description: `${thm.league} league, ${thm.ranking} global ranking, capability score ${thm.capability}.`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:border focus:border-[var(--ink)] focus:bg-[var(--paper)] focus:px-3 focus:py-2 focus:text-[var(--ink)]"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Cover />
        <Ledger stats={stats} />
        <Work />
        <Craft />
        <Security />
        <Path />
        <Archive />
        <Colophon />
      </main>
    </>
  );
}
