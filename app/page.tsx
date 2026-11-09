import SiteHeader from "@/components/site-header";
import Machine from "@/components/machine/machine";
import MachineHero from "@/components/machine/hero";
import StaticMonolith from "@/components/machine/static-monolith";
import Work from "@/components/work";
import Craft from "@/components/craft";
import Security from "@/components/security";
import Path from "@/components/path";
import SiliconChapter from "@/components/machine/silicon-chapter";
import Archive from "@/components/archive";
import Colophon from "@/components/colophon";
import Ledger from "@/components/ledger";
import ReturnButton from "@/components/machine/return";
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:border focus:border-[var(--accent)] focus:bg-[#05070a] focus:px-3 focus:py-2 focus:text-[var(--accent)]"
      >
        Skip to content
      </a>

      <SiteHeader />

      <Machine idle={<StaticMonolith />}>
        <main id="main" className="relative z-10">
          <MachineHero />
          <Work />
          <Craft />
          <Security />
          <Path />
          <SiliconChapter />
          <Archive />
          <Ledger stats={stats} />
          <ReturnButton />
          <Colophon />
        </main>
      </Machine>
    </>
  );
}
