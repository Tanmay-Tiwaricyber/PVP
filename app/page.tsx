import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Stats from "@/components/stats";
import Work from "@/components/work";
import CaseStudy from "@/components/case-study";
import Craft from "@/components/craft";
import Archive from "@/components/archive";
import Path from "@/components/path";
import Contact from "@/components/contact";
import { profile } from "@/lib/site";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.alias,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    description: profile.statement,
    url: "/",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kanpur",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    sameAs: [profile.links.github, profile.links.linkedin, profile.links.orcid],
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "C++",
      "Cybersecurity",
      "Developer tooling",
      "Applied AI",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Work />
        <CaseStudy />
        <Craft />
        <Archive />
        <Path />
        <Contact />
      </main>
    </>
  );
}
