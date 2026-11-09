"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import LocalClock from "./local-clock";
import { profile } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A title page, set like a printed specimen sheet: an oversized serif name,
 * a rule that behaves like a masthead, and marginal notes instead of padding.
 */
export default function Cover() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-16 sm:pt-20">
      <motion.div
        style={reduce ? undefined : { y, opacity: fade }}
        className="shell relative flex min-h-[calc(100svh-4rem)] flex-col justify-between py-6"
      >
        {/* masthead strip */}
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[var(--rule)] pb-3">
          <p className="label">Portfolio · Vol. 01 · Kanpur, IN</p>
          <p className="label">Est. Oct 2021</p>
          <p className="label hidden sm:block">
            <LocalClock />
          </p>
        </div>

        {/* vertical folio, set along the right margin the way a spine would be */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
        >
          <div className="flex items-center gap-3 [writing-mode:vertical-rl]">
            <span className="h-16 w-px bg-[var(--rule)]" />
            <span className="label text-[var(--faint)]">
              Silent Programmer — Portfolio, Volume One
            </span>
            <span className="h-16 w-px bg-[var(--rule)]" />
          </div>
        </div>
        <span aria-hidden className="crop absolute inset-x-0 top-24 hidden h-6 lg:block" />

        {/* the name */}
        <div className="py-6 sm:py-10">
          <div aria-hidden className="overflow-hidden">
            <motion.h1
              initial={{ y: "104%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.5, delay: 1.95, ease: EASE }}
              className="display text-[clamp(3.6rem,15.5vw,15rem)]"
            >
              Tanmay
            </motion.h1>
          </div>
          <div aria-hidden className="overflow-hidden">
            <motion.p
              initial={{ y: "104%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.5, delay: 2.06, ease: EASE }}
              className="display flex flex-wrap items-baseline gap-x-[0.16em] text-[clamp(3.6rem,15.5vw,15rem)]"
            >
              <span>Tiwari</span>
              <span className="serif-italic text-[0.19em] leading-none text-[var(--accent)]">
                silent programmer
              </span>
            </motion.p>
          </div>
          <h1 className="sr-only">
            Tanmay Tiwari — Silent Programmer. Full-stack engineer and security builder, Kanpur, India.
          </h1>

          {/* rule with marginalia */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, delay: 2.3, ease: EASE }}
            className="mt-5 h-px origin-left bg-[var(--rule-strong)]"
          />

          <div className="mt-4 grid gap-5 sm:grid-cols-12 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.42, ease: EASE }}
              className="sm:col-span-7"
            >
              <p className="dropcap text-[clamp(0.95rem,1.5vw,1.15rem)] leading-[1.55] text-[var(--ink)]/85">
                I build software that respects the person using it — fast, private by default, and
                finished enough to survive a real deadline. Six years of public repositories, a
                top-1% security record, and a habit of shipping the hard part first.
              </p>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.55 }}
              className="sm:col-span-5 sm:pl-6 sm:border-l sm:border-[var(--rule)]"
            >
              {[
                ["Discipline", "Product · Systems · Security"],
                ["Primary", "TypeScript · C++ · Python"],
                ["Record", "175 repos · 435 ★ · Top 1% THM"],
                ["Status", "Open to work"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-4 border-b border-[var(--rule)] py-1.5 last:border-0"
                >
                  <dt className="label">{k}</dt>
                  <dd className="meta text-right text-[var(--ink)]">{v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>

        {/* footer of the cover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.7 }}
          className="flex flex-wrap items-end justify-between gap-3 border-t border-[var(--rule)] pt-3"
        >
          <a
            href="#work"
            className="group flex items-baseline gap-2"
            aria-label="Jump to the work chapter"
          >
            <span className="meta text-[var(--ink)] group-hover:text-[var(--accent)]">Read the work</span>
            <span className="num text-[10px] text-[var(--accent)] transition-transform duration-500 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
          <div className="flex flex-wrap items-center gap-4">
            {[
              ["GitHub", profile.links.github],
              ["LinkedIn", profile.links.linkedin],
              ["TryHackMe", profile.links.tryhackme],
              ["Email", `mailto:${profile.email}`],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="label transition-colors hover:text-[var(--accent)]"
              >
                <span className="link-u">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
