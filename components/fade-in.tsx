"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

type Props = {
  from?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
  once?: boolean;
  distance?: number;
};

const offsets = {
  up: { y: 26 },
  down: { y: -26 },
  left: { x: 30 },
  right: { x: -30 },
  none: {},
};

export default function FadeIn({
  from = "up",
  delay = 0,
  duration = 0.9,
  className,
  children,
  once = true,
  distance,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-8% 0px -8% 0px" });
  const offset = { ...offsets[from] } as Record<string, number>;
  if (distance && "y" in offset) offset.y = distance;
  if (distance && "x" in offset) offset.x = distance;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
