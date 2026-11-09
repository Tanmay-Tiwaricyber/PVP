"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A cover being pulled back. Prints the folio number, then lifts.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    let v = 0;
    const id = window.setInterval(() => {
      v = Math.min(100, v + Math.random() * 11 + 4);
      setN(Math.floor(v));
      if (v >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = "";
        }, 320);
      }
    }, 85);
    return () => {
      window.clearInterval(id);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[var(--paper)] px-[var(--gutter)] py-5"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between border-b border-[var(--rule)] pb-2">
            <span className="label text-[var(--ink)]">Tanmay Tiwari</span>
            <span className="label">Volume 01</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <p className="serif text-[clamp(2.4rem,8vw,6rem)] leading-none">
              Silent
              <span className="serif-italic text-[var(--accent)]"> Programmer</span>
            </p>
            <span className="num text-[clamp(1.6rem,5vw,3.4rem)] leading-none text-[var(--muted)]">
              {String(n).padStart(3, "0")}
            </span>
          </div>

          <div className="relative h-px w-full bg-[var(--rule)]">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[var(--accent)]"
              animate={{ width: `${n}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
