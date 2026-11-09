"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { RuledLine } from "./squiggle";
import MarginNotes from "./margin-notes";

/**
 * Every chapter opens the same way: a numeral in the margin, a title set in
 * the display face, and an optional note held to the right column. The shared
 * rhythm is what makes it read as one publication rather than a stack of sections.
 */
export default function ChapterHead({
  no,
  title,
  lede,
  aside,
  accentWord,
}: {
  no: string;
  title: string;
  lede?: string;
  aside?: string;
  accentWord?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });

  const parts = accentWord ? title.split(accentWord) : [title];

  return (
    <div ref={ref} className="relative mb-8 sm:mb-12">
      <MarginNotes />
      <div className="flex items-baseline justify-between border-b border-[var(--rule-strong)] pb-2.5">
        <span className="label text-[var(--ink)]">
          <span className="text-[var(--accent)]">{no}</span>
          <span className="mx-2 text-[var(--faint)]">/</span>
          Chapter
        </span>
        {aside && <span className="label hidden text-right sm:block">{aside}</span>}
      </div>
      <RuledLine className="-mt-[3px] opacity-70" />

      <div className="mt-5 grid gap-4 sm:grid-cols-12 sm:gap-6">
        <div className="sm:col-span-8">
          <h2 className="display text-[clamp(2.3rem,7vw,5.6rem)]">
            {parts.map((part, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "108%" }}
                    animate={inView ? { y: 0 } : undefined}
                    transition={{ duration: 1.1, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {part}
                  </motion.span>
                </span>
                {accentWord && i === 0 && (
                  <span className="inline-block overflow-hidden align-bottom pb-[0.1em]">
                    <motion.span
                      className="serif-italic inline-block text-[var(--accent)]"
                      initial={{ y: "108%" }}
                      animate={inView ? { y: 0 } : undefined}
                      transition={{ duration: 1.1, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="measure self-end text-[0.88rem] leading-relaxed text-[var(--muted)] sm:col-span-4"
          >
            {lede}
          </motion.p>
        )}
      </div>
    </div>
  );
}
