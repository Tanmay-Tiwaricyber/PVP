"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import IslandDemo from "./island-demo";
import RevealText from "./reveal-text";
import FadeIn from "./fade-in";

const facts = [
  ["Surface", "Windhawk tool mod"],
  ["Runtime", "Own windhawk.exe process"],
  ["Render", "Layered click-through overlay"],
  ["Material", "6 backdrop styles · liquid glass"],
  ["Motion", "iOS spring, overshoot on expand"],
  ["Reach", "Windows 10 · 11"],
];

const notes = [
  "It never injects into Explorer — the overlay lives in its own process, so a crash cannot take the shell with it.",
  "Vector icons in the SF Symbols spirit: crisp at every DPI without shipping an icon font.",
  "Every material is configurable inline with Key=Value overrides, so a theme is a line, not a rebuild.",
];

export default function CaseStudy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section className="relative overflow-hidden border-t border-bone/10 bg-ink-2/40 py-[clamp(4rem,9vw,8rem)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,77,31,0.1),transparent)]" />
      </div>

      <div className="shell relative">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-bone/10 pb-6">
          <div>
            <FadeIn>
              <p className="label mb-4">/ Case study · 01</p>
            </FadeIn>
            <RevealText as="h2" className="display text-[clamp(2.1rem,5.4vw,4.4rem)]">
              Hyper Island, working.
            </RevealText>
          </div>
          <FadeIn delay={0.1}>
            <a
              href="https://github.com/Tanmay-Tiwaricyber/HyperLand"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/70 transition-colors hover:text-acid"
            >
              Read the source
              <span className="transition-transform duration-500 group-hover:translate-x-1">↗</span>
            </a>
          </FadeIn>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <motion.div style={{ y }} className="lg:col-span-7">
            <div className="aspect-[16/11] w-full overflow-hidden rounded-[5px] border border-bone/10">
              <IslandDemo />
            </div>
            <p className="mt-3 font-mono text-[9px] uppercase leading-[1.9] tracking-[0.16em] text-bone/40">
              Interactive reproduction — the real mod runs natively on Windows via Windhawk.
            </p>
          </motion.div>

          <div className="lg:col-span-5">
            <FadeIn>
              <p className="text-[clamp(0.95rem,1.2vw,1.1rem)] leading-relaxed text-bone/70">
                A liquid-glass Dynamic Island for Windows that turns the top of the desktop
                into one surface: media, volume, brightness, notifications, calendar, focus,
                tasks and clipboard. Built in C++ as a Windhawk tool mod.
              </p>
            </FadeIn>

            <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-bone/10 pt-6">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <p className="label mb-1">{k}</p>
                  <p className="font-mono text-[10px] leading-snug text-bone/75">{v}</p>
                </div>
              ))}
            </div>

            <ul className="mt-7 space-y-3 border-t border-bone/10 pt-6">
              {notes.map((n) => (
                <li key={n} className="flex gap-3 text-[0.84rem] leading-relaxed text-bone/55">
                  <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-signal" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {["C++", "Windhawk", "Win32", "Direct2D", "Liquid Glass"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-bone/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-bone/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
