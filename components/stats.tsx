"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site";
import RevealText from "./reveal-text";
import FadeIn from "./fade-in";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-[clamp(4.5rem,10vw,9rem)]">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <FadeIn>
              <p className="label mb-5">/ The record</p>
            </FadeIn>
            <RevealText
              as="h2"
              className="display text-[clamp(1.9rem,3.4vw,3.1rem)]"
              stagger={0.03}
            >
              Public, permanent and checkable.
            </RevealText>
          </div>

          <div className="md:col-span-8">
            <FadeIn delay={0.1}>
              <p className="measure mb-10 text-[clamp(0.95rem,1.15vw,1.1rem)] leading-relaxed text-bone/55">
                None of what follows is a slide. It lives in public repositories, deployed
                URLs and commit history — the only portfolio that can be audited. Here is
                the shape of six years of that.
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 border-t border-bone/10 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative border-b border-bone/10 py-7 pr-4 sm:border-r sm:pr-6 sm:last:border-r-0"
                >
                  <p className="display flex items-baseline text-[clamp(2.4rem,5.2vw,4.4rem)] leading-none">
                    <Counter to={s.value} />
                    <span className="text-signal">{s.suffix}</span>
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-bone/50">
                    {s.label}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/40">
                    {s.note}
                  </p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-signal transition-all duration-700 group-hover:w-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
