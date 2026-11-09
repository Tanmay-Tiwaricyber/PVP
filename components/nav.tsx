"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/site";

const links = [
  { href: "#work", label: "Work", n: "01" },
  { href: "#craft", label: "Craft", n: "02" },
  { href: "#path", label: "Path", n: "03" },
  { href: "#contact", label: "Contact", n: "04" },
];

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 90));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 z-50 w-full"
      >
        <div
          className={`shell flex items-center justify-between transition-all duration-500 ${
            compact ? "py-3" : "py-5 sm:py-7"
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="Tanmay Tiwari — back to top"
          >
            <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full border border-bone/20">
              <span className="font-mono text-[11px] tracking-tight">TT</span>
              <span className="absolute inset-0 -translate-y-full bg-signal transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <span className="absolute font-mono text-[11px] tracking-tight text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                TT
              </span>
            </span>
            <span
              className={`hidden font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 sm:block ${
                compact ? "opacity-0" : "opacity-100"
              }`}
            >
              Silent Programmer
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/70 transition-colors hover:text-bone"
              >
                <span className="text-[9px] text-signal/80">{l.n}</span>
                <span className="link-u">{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="group relative hidden overflow-hidden rounded-full border border-bone/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] sm:block"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
                Available for work
              </span>
              <span className="absolute inset-0 translate-y-full bg-acid transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-full border border-bone/20 md:hidden"
            >
              <span className="relative block h-2.5 w-4">
                <span
                  className={`absolute left-0 h-px w-full bg-bone transition-all duration-300 ${
                    open ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-bone transition-all duration-300 ${
                    open ? "top-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
        <motion.div
          className="h-px origin-left bg-signal"
          style={{ scaleX: progress, opacity: compact ? 1 : 0 }}
        />
      </motion.header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 bg-void/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="shell flex h-full flex-col justify-center gap-2 pt-16">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-bone/10 py-4"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="font-mono text-[10px] text-signal">{l.n}</span>
              <span className="display text-[13vw] leading-none">{l.label}</span>
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-bone/60"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </>
  );
}
