"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * A stat printed as a ledger line: label left, figure right, rule underneath.
 * The figure renders truthfully on the server and only animates when in view.
 */
export default function LedgerRow({
  value,
  label,
  note,
  index,
}: {
  value: number;
  label: string;
  note: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    setN(0);
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 border-b border-[var(--rule)] py-4 sm:grid-cols-[3rem_1fr_auto] sm:py-5"
    >
      <span className="num text-[0.6rem] text-[var(--faint)]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span>
        <span className="grotesk block text-[clamp(1rem,1.6vw,1.3rem)]">{label}</span>
        <span className="label mt-1 block">{note}</span>
      </span>
      <span className="num relative text-[clamp(2rem,5.5vw,4rem)] leading-none tabular-nums">
        {n}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-700 group-hover:w-full" />
      </span>
    </motion.div>
  );
}
