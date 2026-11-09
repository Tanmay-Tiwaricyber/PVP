"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

/**
 * The HUD for a layer: which layer, how deep, what it is. Sits above the
 * heading the way a debug overlay sits above a render.
 */
export default function LayerHead({
  layer,
  depth,
  name,
  title,
  accentWord,
  lede,
}: {
  layer: string;
  depth: string;
  name: string;
  title: string;
  accentWord?: string;
  lede?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4% 0px" });
  const parts = accentWord ? title.split(accentWord) : [title];

  return (
    <div ref={ref} className="mb-8 sm:mb-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[var(--rule-strong)] pb-2.5">
        <span className="flex items-baseline gap-2.5 font-mono text-[0.54rem] uppercase tracking-[0.3em]">
          <span className="text-[var(--accent)]">{layer}</span>
          <span className="text-[var(--ink)]/30">/</span>
          <span className="text-[var(--ink)]/70">{name}</span>
        </span>
        <span className="flex items-center gap-3 font-mono text-[0.5rem] uppercase tracking-[0.26em] text-[var(--ink)]/35">
          <span className="hidden sm:inline">depth</span>
          <span className="text-[var(--accent)]/80">{depth}</span>
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-12 sm:gap-6">
        <div className="sm:col-span-8">
          <h2 className="display text-[clamp(2.2rem,6.4vw,5rem)] text-[var(--ink)]">
            {parts.map((part, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "108%" }}
                    animate={inView ? { y: 0 } : undefined}
                    transition={{ duration: 1.05, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {part}
                  </motion.span>
                </span>
                {accentWord && i === 0 && (
                  <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
                    <motion.span
                      className="serif-italic inline-block text-[var(--accent)]"
                      initial={{ y: "108%" }}
                      animate={inView ? { y: 0 } : undefined}
                      transition={{ duration: 1.05, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {accentWord}
                    </motion.span>
                  </span>
                )}
              </span>
            ))}
          </h2>
        </div>
        {lede && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="measure self-end text-[0.86rem] leading-relaxed text-[var(--ink)]/60 sm:col-span-4"
          >
            {lede}
          </motion.p>
        )}
      </div>
    </div>
  );
}
