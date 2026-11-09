"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const WORDS = ["hello", "namaste", "01101000 01101001"];

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }
    document.documentElement.style.overflow = "hidden";

    let value = 0;
    const tick = window.setInterval(() => {
      value = Math.min(100, value + Math.random() * 9 + 3);
      setCount(Math.floor(value));
      setWord((w) => (value > 66 ? 2 : value > 33 ? 1 : w > 1 ? 2 : w));
      if (value >= 100) {
        window.clearInterval(tick);
        window.setTimeout(() => {
          setDone(true);
          document.documentElement.style.overflow = "";
        }, 380);
      }
    }, 90);

    return () => {
      window.clearInterval(tick);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-[var(--gutter)] py-6"
          exit={{ y: "-101%" }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between">
            <span className="label">Tanmay Tiwari</span>
            <span className="label">Kanpur, IN</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="overflow-hidden">
              <motion.p
                key={word}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "-110%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="serif-accent text-[clamp(2.6rem,9vw,7rem)] leading-none text-bone"
              >
                {WORDS[word]}
              </motion.p>
            </div>
            <div className="text-right">
              <span className="font-mono text-[clamp(2rem,6vw,4.5rem)] leading-none tabular-nums text-bone">
                {String(count).padStart(3, "0")}
              </span>
              <span className="label ml-1">%</span>
            </div>
          </div>

          <div className="relative h-px w-full bg-bone/15">
            <motion.div
              className="absolute inset-y-0 left-0 bg-signal"
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
