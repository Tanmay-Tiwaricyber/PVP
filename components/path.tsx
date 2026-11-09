"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { timeline, awards } from "@/lib/site";
import RevealText from "./reveal-text";
import FadeIn from "./fade-in";

export default function Path() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 62%"] });
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 90,
    damping: 26,
  });

  return (
    <section id="path" className="relative border-t border-bone/10 py-[clamp(4rem,9vw,8rem)]">
      <div className="shell">
        <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <FadeIn>
              <p className="label mb-4">/ Path</p>
            </FadeIn>
            <RevealText as="h2" className="display text-[clamp(2.2rem,6vw,5rem)]">
              Six years, in public.
            </RevealText>
          </div>
          <FadeIn delay={0.12} className="md:col-span-5">
            <p className="font-mono text-[10px] uppercase leading-[2] tracking-[0.16em] text-bone/40 md:text-right">
              Oct 2021 → today · 175 repositories
              <br />
              Kanpur · Remote-friendly
            </p>
          </FadeIn>
        </div>

        {/* Deterministic rail: no grid gaps, so the animated line lands exactly on the border. */}
        <div ref={ref} className="relative">
          <div className="absolute top-0 bottom-0 left-0 w-px bg-bone/10 md:left-36" />
          <motion.div
            className="absolute top-0 left-0 w-px origin-top bg-gradient-to-b from-signal via-signal/70 to-acid md:left-36"
            style={{ height }}
          />

          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.75, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-[0px_1fr] md:grid-cols-[9rem_1fr]"
            >
              <div className="relative hidden pr-6 text-right md:block">
                <span className="absolute top-[2.05rem] -right-[3px] h-1.5 w-1.5 rounded-full bg-signal" />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/70 md:pt-7 md:block">
                  {t.year}
                </span>
              </div>
              <div className="border-l border-bone/10 py-7 pl-5 md:border-l-0 md:pl-10">
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-signal md:hidden">
                  {t.year}
                </span>
                <h3 className="display text-[clamp(1.3rem,2.4vw,2.05rem)]">{t.title}</h3>
                <p className="measure mt-2 text-[0.88rem] leading-relaxed text-bone/50">{t.body}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] uppercase tracking-[0.16em] text-bone/45"
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Awards strip */}
        <div className="marquee-host mt-6 overflow-hidden border-y border-bone/10 py-4">
          <div className="marquee-track rev" style={{ ["--dur" as string]: "46s" }}>
            {[...awards, ...awards].map((a, i) => (
              <span key={`${a}-${i}`} className="flex shrink-0 items-center">
                <span className="px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">
                  {a}
                </span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-acid/60" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
