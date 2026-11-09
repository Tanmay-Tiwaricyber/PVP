"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { projects } from "@/lib/site";
import ChapterHead from "./chapter-head";
import Plate from "./plate";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Work() {
  const [active, setActive] = useState(0);
  const p = projects[active];

  return (
    <section id="work" className="rule-t py-14 sm:py-20">
      <div className="shell">
        <ChapterHead
          no="02"
          title="Selected work"
          accentWord="work"
          aside="Six of one hundred and seventy-five"
          lede="Everything here is public and either deployed or runnable. Hover an entry to pull its plate."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* the index */}
          <div className="lg:col-span-7">
            {projects.map((proj, i) => {
              const on = i === active;
              return (
                <a
                  key={proj.title}
                  href={proj.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative grid grid-cols-[2.2rem_1fr_auto] items-baseline gap-3 border-b border-[var(--rule)] py-4 sm:grid-cols-[3rem_1fr_auto] sm:py-5"
                  aria-label={`${proj.title} — ${proj.kicker}`}
                >
                  <span
                    className={`num text-[0.6rem] transition-colors ${
                      on ? "text-[var(--accent)]" : "text-[var(--faint)]"
                    }`}
                  >
                    {proj.index}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span
                        className={`display text-[clamp(1.6rem,3.6vw,2.9rem)] transition-colors duration-300 ${
                          on ? "text-[var(--ink)]" : "text-[var(--ink)]/55"
                        }`}
                      >
                        {proj.title}
                      </span>
                      <span className="serif-italic text-[0.95rem] text-[var(--muted)]">
                        {proj.kicker}
                      </span>
                    </span>
                    <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      {proj.stack.map((s) => (
                        <span key={s} className="label">
                          {s}
                        </span>
                      ))}
                      <span className="label text-[var(--faint)]">· {proj.metric}</span>
                    </span>
                  </span>
                  <span
                    className={`num self-center text-[10px] transition-all duration-500 ${
                      on ? "translate-x-0 text-[var(--accent)] opacity-100" : "-translate-x-1 opacity-0"
                    }`}
                  >
                    ↗
                  </span>
                  <span
                    className="absolute bottom-0 left-0 h-px bg-[var(--accent)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: on ? "100%" : "0%" }}
                  />
                </a>
              );
            })}
          </div>

          {/* the plate */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <Plate figure={p.figure} />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mt-4"
                >
                  <div className="flex items-baseline justify-between gap-4 border-b border-[var(--rule)] pb-2">
                    <p className="label text-[var(--ink)]">
                      Fig. {p.index} — {p.title}
                    </p>
                    <p className="label">{p.year}</p>
                  </div>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-[var(--muted)]">
                    {p.summary}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-[0.78rem] leading-snug text-[var(--muted)]">
                        <span className="text-[var(--accent)]">·</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-5">
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="meta link-u text-[var(--ink)] hover:text-[var(--accent)]"
                    >
                      Source ↗
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="meta link-u text-[var(--accent)]"
                      >
                        Live ↗
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
