"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { capabilities } from "@/lib/site";
import RevealText from "./reveal-text";
import FadeIn from "./fade-in";

export default function Craft() {
  const [open, setOpen] = useState(0);

  return (
    <section id="craft" className="relative border-t border-bone/10 py-[clamp(4rem,9vw,8rem)]">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <FadeIn>
                <p className="label mb-4">/ Craft</p>
              </FadeIn>
              <RevealText as="h2" className="display text-[clamp(2.2rem,5.4vw,4.6rem)]">
                Four layers, one instinct.
              </RevealText>
              <FadeIn delay={0.12}>
                <p className="measure mt-6 text-[0.98rem] leading-relaxed text-bone/50">
                  I move between the browser, the kernel boundary and the security model
                  without treating them as separate careers. The through-line is the same:
                  understand the machine, then remove everything the user does not need.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {["Systems thinking", "Accessible by default", "Privacy first", "Ship, then refine"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-bone/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/45"
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
              </FadeIn>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-bone/10">
              {capabilities.map((c, i) => {
                const isOpen = open === i;
                return (
                  <motion.div
                    key={c.no}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-bone/10"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      onMouseEnter={() => setOpen(i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-4 py-6 text-left"
                    >
                      <span
                        className={`font-mono text-[10px] tracking-widest transition-colors ${
                          isOpen ? "text-signal" : "text-bone/25"
                        }`}
                      >
                        {c.no}
                      </span>
                      <h3
                        className={`display flex-1 text-[clamp(1.5rem,3.2vw,2.6rem)] transition-colors duration-300 ${
                          isOpen ? "text-bone" : "text-bone/50"
                        }`}
                      >
                        {c.title}
                      </h3>
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                          isOpen
                            ? "rotate-45 border-signal text-signal"
                            : "border-bone/20 text-bone/40"
                        }`}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.1" />
                        </svg>
                      </span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-8">
                        <p className="measure text-[0.92rem] leading-relaxed text-bone/55">{c.body}</p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {c.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-bone/[0.06] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-bone/55"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
