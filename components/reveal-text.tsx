"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  delay?: number;
  stagger?: number;
  once?: boolean;
};

/**
 * Word-by-word mask reveal. Words are inline-block inside an overflow-hidden
 * parent per word so descenders never clip.
 */
export default function RevealText({
  children,
  className,
  as = "h2",
  delay = 0,
  stagger = 0.035,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.h2;
  const words = children.split(" ");

  return (
    <Tag ref={ref as never} className={cn(className)} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.2em", marginBottom: "-0.2em" }}
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: "110%", rotate: 2 }}
            animate={inView ? { y: "0%", rotate: 0 } : undefined}
            transition={{
              duration: 0.95,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
