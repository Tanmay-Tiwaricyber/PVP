"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { profile } from "@/lib/site";

/**
 * The closing chapter of a printed book: the colophon. It states the contact
 * details, what the thing is set in, and how it was made — then signs off.
 */
export default function Colophon() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" className="rule-t">
      <div className="shell py-14 sm:py-20">
        <div className="flex items-baseline justify-between border-b border-[var(--rule-strong)] pb-2.5">
          <span className="label text-[var(--ink)]">
            <span className="text-[var(--accent)]">07</span>
            <span className="mx-2 text-[var(--faint)]">/</span>
            Colophon
          </span>
          <span className="label hidden sm:block">End of volume one</span>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "106%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
                className="display text-[clamp(2.4rem,7.5vw,6rem)]"
              >
                Let&apos;s build the
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "106%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{ duration: 1.15, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="display text-[clamp(2.4rem,7.5vw,6rem)]"
              >
                <span className="serif-italic text-[var(--accent)]">hard</span> part first.
              </motion.p>
            </div>

            <p className="measure mt-6 text-[0.92rem] leading-relaxed text-[var(--muted)]">
              Freelance builds, product engineering roles, or a hackathon that needs a finisher.
              Tell me the deadline and what is currently broken.
            </p>

            <button
              onClick={copy}
              className="group mt-6 flex w-full max-w-md items-baseline justify-between gap-4 border-b border-[var(--rule-strong)] pb-2 text-left transition-colors hover:border-[var(--accent)]"
              aria-label={`Copy email address ${profile.email}`}
            >
              <span className="grotesk text-[clamp(0.95rem,1.9vw,1.35rem)]">{profile.email}</span>
              <span className="label shrink-0 group-hover:text-[var(--accent)]">
                {copied ? "Copied ✓" : "Copy"}
              </span>
            </button>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}?subject=Project%20enquiry`}
                className="serif group relative overflow-hidden border border-[var(--ink)] px-5 py-2.5 text-[1.02rem] text-[var(--invert-ink)]"
                style={{ backgroundColor: "var(--invert)" }}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--ink)]">
                  Start a project →
                </span>
                <span className="absolute inset-0 translate-y-full bg-[var(--paper)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </a>
              <a
                href={`mailto:${profile.email}?subject=CV%20request`}
                className="meta border border-[var(--rule-strong)] px-4 py-3 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Request CV
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="label mb-3">Elsewhere</p>
            <ul className="border-t border-[var(--rule)]">
              {[
                ["GitHub", "@Tanmay-Tiwaricyber", profile.links.github],
                ["LinkedIn", "in/tanmay-tiwari", profile.links.linkedin],
                ["TryHackMe", "p/TanmayTiwari", profile.links.tryhackme],
                ["ORCID", "0009-0004-8455-0989", profile.links.orcid],
              ].map(([label, handle, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-3 border-b border-[var(--rule)] py-2.5"
                  >
                    <span className="label text-[var(--ink)]">{label}</span>
                    <span className="meta flex items-center gap-1.5 text-[var(--muted)]">
                      <span className="link-u">{handle}</span>
                      <span className="text-[var(--faint)] transition-transform duration-300 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-[var(--rule)] pt-4">
              <p className="label mb-2">Set in</p>
              <p className="text-[0.78rem] leading-[1.7] text-[var(--muted)]">
                Instrument Serif &amp; Bricolage Grotesque, with JetBrains Mono for the margins.
                Drawn in Next.js and set with care in Kanpur, India.
              </p>
            </div>
            <div className="mt-4 border-t border-[var(--rule)] pt-4">
              <p className="label mb-2">Colour</p>
              <div className="flex items-center gap-2">
                {[
                  ["Paper", "var(--paper)", "var(--rule-strong)"],
                  ["Ink", "var(--ink)", "var(--rule-strong)"],
                  ["Vermilion", "var(--accent)", "var(--accent)"],
                  ["Ochre", "var(--ochre)", "var(--ochre)"],
                  ["Sage", "var(--sage)", "var(--sage)"],
                ].map(([name, bg, border]) => (
                  <span
                    key={name}
                    title={name}
                    className="h-6 w-6 border"
                    style={{ background: bg, borderColor: border }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--rule)] pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <div className="flex items-center gap-5">
            <p className="label">Volume 01 · No. 01</p>
            <a href="#top" className="label link-u text-[var(--ink)] hover:text-[var(--accent)]">
              Back to the cover ↑
            </a>
          </div>
        </div>
      </div>

      {/* the signature mark at the very bottom */}
      <div className="relative overflow-hidden border-t border-[var(--rule)]">
        <p
          aria-hidden
          className="display -mb-[1.5vw] select-none whitespace-nowrap text-center text-[13.4vw] leading-[0.78] text-[var(--ink)]/[0.06]"
        >
          Tanmay Tiwari
        </p>
      </div>
    </footer>
  );
}
