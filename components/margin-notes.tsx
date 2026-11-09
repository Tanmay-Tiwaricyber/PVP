"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Asterisk } from "./squiggle";

/** A doodle that draws itself once, when it is looked at. */
function Draw({ d, viewBox, className, delay = 0, width = 2 }: { d: string; viewBox: string; className?: string; delay?: number; width?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduce = useReducedMotion();
  return (
    <svg ref={ref} viewBox={viewBox} aria-hidden className={className}>
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? undefined : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/** A coil in the left margin, like the doodle you make while thinking. */
export function Coil({ className = "" }: { className?: string }) {
  return (
    <Draw
      d="M6 4c14 2 20 10 12 15-7 5-18 1-16-7 2-7 13-9 22-4 9 6 11 19 4 28-8 10-24 11-33 3"
      viewBox="0 0 60 80"
      className={`pencil-only text-[var(--accent)] ${className}`}
      width={1.6}
    />
  );
}

/** A five-pointed star, sketched with one continuous line. */
export function SketchStar({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <Draw
      d="M22 4l5.4 13.2 14.2 1-10.9 9.2 3.4 13.9L22 33.6 10 41.3l3.4-13.9L2.4 18.2l14.2-1z"
      viewBox="0 0 44 44"
      className={`pencil-only text-[var(--ochre)] ${className}`}
      delay={delay}
      width={1.5}
    />
  );
}

/** A taped-corner strip. Two tones, semi-transparent, a degree off true. */
export function Tape({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-[2] h-[0.58rem] w-[1.9rem] opacity-80 ${
        flip ? "-rotate-[42deg]" : "rotate-[38deg]"
      } ${className}`}
      style={{
        background:
          "linear-gradient(105deg, color-mix(in srgb, var(--ochre) 22%, transparent), color-mix(in srgb, var(--ochre) 10%, transparent) 60%, color-mix(in srgb, var(--ochre) 20%, transparent))",
        clipPath: "polygon(3% 0, 100% 4%, 97% 100%, 0 95%)",
      }}
    />
  );
}

/** Sidereal drift: a margin drawing that slides as the page scrolls. */
export function Drifting({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [14, -14]), { stiffness: 70, damping: 24 });
  return (
    <motion.div ref={ref} style={{ y }} aria-hidden className={`pointer-events-none ${className}`}>
      {children}
    </motion.div>
  );
}

/**
 * The margin, dressed. Every mark is decorative, sits outside the measure and
 * is hidden from assistive tech and from the plain-paper mode.
 */
export default function MarginNotes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <Drifting className="absolute -left-9 top-[42%] opacity-70 xl:-left-12">
        <Coil className="h-20 w-14" />
      </Drifting>
      <Drifting className="absolute -right-8 top-[18%] opacity-60 xl:-right-11">
        <SketchStar className="h-8 w-8" delay={0.2} />
      </Drifting>
      <Asterisk className="absolute -left-7 top-[10%] h-3 w-3 opacity-60" />
    </div>
  );
}

