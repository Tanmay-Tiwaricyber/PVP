"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { timeline, awards } from "@/lib/site";
import LayerHead from "./machine/layer-head";
import { RuledLine } from "./squiggle";

export default function Path() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 65%"] });
  const width = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 90,
    damping: 26,
  });

  return (
    <section
      id="path"
      data-cam="-0.6,-5.3,4.6|-0.1,-5.4,-1.8"
      data-layer="L2 · KERNEL"
      data-depth="0310 m"
      className="rule-t py-14 sm:py-20"
    >
      <div className="shell">
        <LayerHead
          layer="L2 · Kernel"
          depth="310 m"
          name="Systems & native"
          title="Six years, in public"
          accentWord="public"
          lede="No private achievements, no vague claims. The record is the commit history, the deploy logs and the rooms completed."
        />

        <div ref={ref} className="relative">
          {/* a rule that draws itself across the page */}
          <div className="absolute left-0 right-0 top-[2.1rem] hidden h-px bg-[var(--rule)] sm:block" />
          <motion.div
            className="absolute left-0 top-[2.1rem] hidden h-px origin-left bg-[var(--accent)] sm:block"
            style={{ width }}
          />

          <div className="grid grid-cols-1 gap-0 sm:grid-cols-4">
            {timeline.map((t, i) => (
              <motion.article
                key={t.year}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="relative border-b border-[var(--rule)] pb-6 pr-0 pt-4 sm:border-b-0 sm:pr-5 sm:pt-0"
              >
                <span className="relative flex h-[1.05rem] items-center">
                  <span className="num relative z-10 bg-[var(--paper)] pr-2 text-[0.68rem] text-[var(--accent)]">
                    {t.year}
                  </span>
                  <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--accent)]" />
                </span>
                <h3 className="grotesk mt-5 text-[clamp(1.05rem,1.8vw,1.35rem)]">{t.title}</h3>
                <p className="mt-2 text-[0.8rem] leading-[1.65] text-[var(--muted)]">{t.body}</p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* honours, as a ticker of record */}
        <RuledLine className="mt-10 opacity-70" />
        <div className="marquee-host overflow-hidden py-3">
          <div className="marquee-track" style={{ ["--dur" as string]: "52s" }}>
            {[...awards, ...awards].map((a, i) => (
              <span key={`${a}-${i}`} className="flex shrink-0 items-center">
                <span className="label px-5 text-[var(--muted)]">{a}</span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]/50" />
              </span>
            ))}
          </div>
        </div>
        <RuledLine className="opacity-70" />
      </div>
    </section>
  );
}
