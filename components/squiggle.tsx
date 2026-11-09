"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Rules that were ruled by hand. A double pass, slightly unequal, overshooting
 * its container on both sides, drawn once when it comes into view.
 */
export function RuledLine({
  className = "",
  weight = 1,
  delay = 0,
}: {
  className?: string;
  weight?: number;
  delay?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-2% 0px" });
  const reduce = useReducedMotion();

  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 12"
      preserveAspectRatio="none"
      aria-hidden
      className={`h-[9px] w-full overflow-visible text-[var(--rule-strong)] ${className}`}
    >
      <motion.path
        d="M-4 6.4c90-1.6 190-2.2 300-1.4 120 .9 210 2 320 1.2 110-.8 220-2 390-1.1"
        fill="none"
        stroke="currentColor"
        strokeWidth={weight * 1.3}
        strokeLinecap="round"
        initial={reduce ? undefined : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d="M2 9.2c120 1.4 250 1.8 380 1 140-.9 300-2.2 610-1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth={weight * 0.85}
        strokeLinecap="round"
        opacity="0.45"
        initial={reduce ? undefined : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.15, delay: delay + 0.08, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/** A hand-drawn circle around something, drawn on view. */
export function Circle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      {children}
      <svg
        viewBox="0 0 220 120"
        preserveAspectRatio="none"
        aria-hidden
        className="pointer-events-none absolute -inset-x-[0.35em] -inset-y-[0.18em] h-[calc(100%+0.36em)] w-[calc(100%+0.7em)] text-[var(--accent)]"
      >
        <motion.path
          d="M186 26c-18-16-64-20-104-14C44 18 12 40 16 62c3 20 34 34 82 36 54 2 96-10 106-28 9-16-10-33-44-40"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={reduce ? undefined : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.85, ease: [0.33, 1, 0.68, 1] }}
        />
      </svg>
    </span>
  );
}

/** The scribble that marks a note written later, in the margin. */
export function Annotation({
  children,
  className = "",
  rotate = -2,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <p
      className={`serif-italic text-[0.82rem] leading-snug text-[var(--muted)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </p>
  );
}

/** An arrow, sketched. Points whatever way you rotate it. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 40" aria-hidden className={`text-[var(--accent)] ${className}`}>
      <path
        d="M4 30c12-9 27-14 44-13 12 .7 24 4 36 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M76 15c3 5 6 9 8 12-4 1-8 2-13 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A tiny asterisk, the printer's own margin mark. */
export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`text-[var(--accent)] ${className}`}>
      <path
        d="M12 3v18M4 7.5l16 9M20 7.5l-16 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A coffee ring. Because the paper is real. */
export function CoffeeRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={`text-[var(--ochre)] ${className}`}>
      <ellipse
        cx="60"
        cy="60"
        rx="46"
        ry="44"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        opacity="0.5"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="41"
        ry="39"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.28"
      />
      <path
        d="M28 40c8-9 20-15 32-16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}
