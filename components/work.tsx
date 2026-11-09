"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { projects } from "@/lib/site";
import ProjectVisual from "./project-visual";
import RevealText from "./reveal-text";
import FadeIn from "./fade-in";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Work() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <section id="work" className="relative py-[clamp(4rem,9vw,8rem)]">
      <div className="shell">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-bone/10 pb-7">
          <div>
            <FadeIn>
              <p className="label mb-4">/ Selected work · 06</p>
            </FadeIn>
            <RevealText as="h2" className="display text-[clamp(2.4rem,7vw,6rem)]">
              Things that ship.
            </RevealText>
          </div>
          <FadeIn delay={0.15} className="max-w-xs">
            <p className="font-mono text-[10px] uppercase leading-[1.9] tracking-[0.15em] text-bone/40">
              Hover to preview · click to open the repository. Every entry is public
              and deployed or runnable.
            </p>
          </FadeIn>
        </div>

        {/* Desktop editorial index */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10">
          <div className="col-span-7">
            {projects.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.title}
                  onMouseEnter={() => {
                    setActive(i);
                  }}
                  onFocus={() => setActive(i)}
                  onClick={() => window.open(p.repo, "_blank", "noopener")}
                  className="group relative block w-full border-b border-bone/10 py-5 text-left first:border-t"
                  aria-label={`${p.title} — ${p.tagline}`}
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      className="font-mono text-[10px] tracking-widest transition-colors"
                      style={{ color: isActive ? p.accent : "rgba(242,239,230,0.28)" }}
                    >
                      {p.index}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h3
                          className={`display text-[clamp(1.5rem,2.6vw,2.5rem)] transition-all duration-500 ${
                            isActive ? "text-bone" : "text-bone/45 group-hover:text-bone/80"
                          }`}
                          style={{
                            transform: isActive ? "translateX(10px)" : "translateX(0)",
                          }}
                        >
                          {p.title}
                        </h3>
                        <span
                          className="transition-all duration-500"
                          style={{
                            color: p.accent,
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? "translateX(0)" : "translateX(-8px)",
                          }}
                        >
                          ↗
                        </span>
                      </div>
                      <p
                        className={`mt-1.5 pl-1 text-[0.82rem] leading-relaxed transition-colors duration-300 ${
                          isActive ? "text-bone/60" : "text-bone/45"
                        }`}
                      >
                        {p.tagline}
                      </p>
                    </div>
                    <div className="hidden shrink-0 text-right xl:block">
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/45">
                        {p.year}
                      </p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40">
                        {p.metric}
                      </p>
                    </div>
                  </div>
                  <span
                    className="absolute bottom-0 left-0 h-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: isActive ? "100%" : "0%", background: p.accent }}
                  />
                </button>
              );
            })}
          </div>

          {/* Sticky preview card */}
          <div className="col-span-5">
            <div className="sticky top-24">
              <div className="relative aspect-[5/4] max-h-[54vh] w-full overflow-hidden rounded-[4px] border border-bone/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <ProjectVisual project={project} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="mt-5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/40">
                      {project.kind}
                    </p>
                    <a
                      href={project.live ?? project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-u font-mono text-[9px] uppercase tracking-[0.2em] text-acid"
                    >
                      {project.live ? "Live site" : "Repository"}
                    </a>
                  </div>
                  <p className="measure mt-3 text-[0.88rem] leading-relaxed text-bone/60">
                    {project.summary}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {project.points.map((pt) => (
                      <li key={pt} className="flex gap-2 text-[0.78rem] leading-snug text-bone/40">
                        <span style={{ color: project.accent }}>—</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile / tablet cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: EASE }}
              className="group flex flex-col overflow-hidden rounded-[3px] border border-bone/10"
            >
              <div className="aspect-[4/3] w-full">
                <ProjectVisual project={p} />
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px]" style={{ color: p.accent }}>
                      {p.index}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/45">
                      {p.year}
                    </span>
                  </div>
                  <h3 className="display mt-2 text-[1.35rem]">{p.title}</h3>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-bone/45">{p.tagline}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-bone/15 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-bone/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
