"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { profile, socials } from "@/lib/site";
import RevealText from "./reveal-text";
import FadeIn from "./fade-in";
import LocalClock from "./local-clock";

export default function Contact() {
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
    <footer id="contact" className="relative overflow-hidden border-t border-bone/10 bg-void">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-[30%] left-1/2 h-[70%] w-[120%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,77,31,0.16),transparent)]" />
      </div>

      <div className="shell relative pt-[clamp(4rem,9vw,8rem)] pb-8">
        <FadeIn>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="label">/ Contact · 04</p>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/40">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
              Replying within 24h · IST <LocalClock className="hidden sm:inline" />
            </p>
          </div>
        </FadeIn>

        <h2 className="sr-only">Let&apos;s build the hard part first.</h2>
        <div aria-hidden>
          {["LET’S BUILD THE", "hard part first."].map((line, i) => (
            <div key={line} className="overflow-hidden pb-[0.06em]">
              <motion.p
                initial={{ y: "106%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="whitespace-nowrap text-[clamp(2.1rem,9vw,9.5rem)] leading-[0.9] tracking-[-0.04em]"
              >
                {i === 1 ? (
                  <>
                    <span className="serif-accent text-signal">hard</span>{" "}
                    <span className="font-semibold">part first.</span>
                  </>
                ) : (
                  <span className="display">{line}</span>
                )}
              </motion.p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 border-t border-bone/10 pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <FadeIn>
              <p className="label mb-3">Direct line</p>
              <button
                onClick={copy}
                className="group flex w-full items-center justify-between gap-4 border-b border-bone/20 pb-3 text-left transition-colors hover:border-signal"
                aria-label={`Copy email ${profile.email}`}
              >
                <span className="text-[clamp(1rem,1.9vw,1.55rem)] font-medium tracking-tight text-bone">
                  {profile.email}
                </span>
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40 transition-colors group-hover:text-acid">
                  {copied ? "Copied ✓" : "Copy"}
                </span>
              </button>
              <p className="mt-4 text-[0.86rem] leading-relaxed text-bone/45">
                Freelance builds, product engineering roles, or a hackathon that needs a
                finisher. Tell me the deadline and what is currently broken.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <a
                href={`mailto:${profile.email}?subject=Project%20enquiry&body=Hi%20Tanmay%2C%0A%0A`}
                className="group relative mt-7 inline-flex items-center gap-3 overflow-hidden rounded-full bg-bone px-6 py-3.5 text-ink"
              >
                <span className="relative z-10 font-mono text-[10px] uppercase tracking-[0.18em]">
                  Start a project
                </span>
                <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
                <span className="absolute inset-0 translate-y-full bg-acid transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              </a>
            </FadeIn>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <FadeIn>
              <p className="label mb-4">Elsewhere</p>
              <ul className="border-t border-bone/10">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 border-b border-bone/10 py-3.5"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/40">
                        {s.label}
                      </span>
                      <span className="flex items-center gap-2 text-[0.86rem] text-bone/80">
                        <span className="link-u truncate">{s.handle}</span>
                        <span className="text-bone/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid">
                          ↗
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-[9px] uppercase leading-[2] tracking-[0.16em] text-bone/25">
                {profile.location}
                <br />
                Open to remote · worldwide
              </p>
            </FadeIn>
          </div>
        </div>

        {/* footer bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-bone/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/30">
            © 2026 Tanmay Tiwari · Built with Next.js, Motion &amp; care
          </p>
          <div className="flex items-center gap-5 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/30">
            <a href="#top" className="link-u hover:text-bone">
              Back to top ↑
            </a>
            <span>{profile.alias}</span>
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="relative w-full overflow-hidden">
        <p
          aria-hidden
          className="display -mb-[1.2vw] w-full select-none whitespace-nowrap text-center text-[19.2vw] leading-[0.72] text-bone/[0.045]"
        >
          TANMAY TIWARI
        </p>
      </div>
    </footer>
  );
}
