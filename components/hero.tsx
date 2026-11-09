"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import SignalField from "./signal-field";
import LocalClock from "./local-clock";

const EASE = [0.16, 1, 0.3, 1] as const;

const meta: [string, string][] = [
  ["Focus", "Product · Systems · AI"],
  ["Stack", "TypeScript · C++ · Python"],
  ["Since", "Oct 2021"],
  ["Status", "Open to work"],
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section id="top" ref={ref} className="relative isolate overflow-hidden">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_-5%,rgba(255,77,31,0.16),transparent_58%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,7,10,0)_55%,rgba(7,7,10,1)_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "clamp(60px, 7vw, 104px) clamp(60px, 7vw, 104px)",
            maskImage: "radial-gradient(circle at 50% 38%, black, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 opacity-60">
          <SignalField />
        </div>
      </div>

      <motion.div
        style={reduce ? undefined : { y, opacity, scale }}
        className="shell relative flex min-h-[100svh] flex-col justify-between pt-24 pb-7 sm:pt-28"
      >
        {/* top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.3 }}
          className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
            </span>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/55 sm:text-[10px]">
              Available for freelance &amp; full-time · 2026
            </p>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/45 sm:text-[10px]">
            Kanpur, IN · <LocalClock />
          </p>
        </motion.div>

        {/* wordmark */}
        <div className="py-6 sm:py-8">
          <h1 className="sr-only">
            Tanmay Tiwari — Silent Programmer, full-stack engineer and cybersecurity builder
          </h1>
          <div aria-hidden className="overflow-hidden">
            <motion.p
              initial={{ y: "104%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.5, delay: 2.15, ease: EASE }}
              className="display text-[clamp(3.2rem,21vw,18.5rem)] font-semibold text-bone"
            >
              TANMAY
              <br />
              <span className="relative inline-block">
                TIWARI
                <span className="serif-accent absolute -top-[0.5em] -right-[1.1em] hidden text-[0.26em] text-signal md:inline">
                  est. 2021
                </span>
              </span>
            </motion.p>
          </div>

          <div className="mt-4 grid gap-6 border-t border-bone/10 pt-5 sm:mt-5 lg:grid-cols-12 lg:items-start lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.6, ease: EASE }}
              className="lg:col-span-7"
            >
              <p className="serif-accent text-[clamp(1.45rem,3vw,2.6rem)] leading-[1.1] text-bone/90">
                “I am Silent Programmer.”
              </p>
              <p className="measure mt-3 text-[clamp(0.82rem,1vw,0.95rem)] leading-relaxed text-bone/45">
                <span className="text-bone/75">Tanmay Tiwari</span> — full-stack engineer
                &amp; cybersecurity builder in Kanpur. 175 public repositories, 435 stars,
                and a habit of shipping the hard part first.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.72, ease: EASE }}
              className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:col-span-5 lg:grid-cols-2"
            >
              {meta.map(([k, v]) => (
                <div key={k}>
                  <p className="label mb-1">{k}</p>
                  <p className="font-mono text-[10px] leading-snug text-bone/80">{v}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.9 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <a
            href="#work"
            className="group flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-bone/55 transition-colors hover:text-bone sm:text-[10px]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-bone/20">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="transition-transform duration-500 group-hover:translate-y-0.5"
                aria-hidden
              >
                <path d="M6 1v9M2.5 6.5 6 10l3.5-3.5" stroke="currentColor" strokeWidth="1.1" />
              </svg>
            </span>
            Scroll to explore
          </a>
          <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/45 sm:gap-5 sm:text-[10px]">
            <a className="link-u transition-colors hover:text-bone" href="https://github.com/Tanmay-Tiwaricyber">
              GitHub
            </a>
            <a
              className="link-u transition-colors hover:text-bone"
              href="https://www.linkedin.com/in/tanmay-tiwari-a4a551235"
            >
              LinkedIn
            </a>
            <a
              className="link-u transition-colors hover:text-bone"
              href="https://tryhackme.com/p/TanmayTiwari"
              target="_blank"
              rel="noopener noreferrer"
            >
              TryHackMe
            </a>
            <a className="link-u transition-colors hover:text-bone" href="mailto:tanmaytiwaricyber@gmail.com">
              Email
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
