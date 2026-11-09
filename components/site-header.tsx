"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";
import LocalClock from "./local-clock";
import { chapters, profile } from "@/lib/site";
import useIntro from "./use-intro";

export default function SiteHeader() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [dense, setDense] = useState(false);
  const [open, setOpen] = useState(false);
  const intro = useIntro(1.6);

  useMotionValueEvent(scrollY, "change", (v) => setDense(v > 64));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: intro + 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 backdrop-blur-[2px]"
        style={{ backgroundColor: "color-mix(in srgb, var(--paper) 82%, transparent)" }}
      >
        <div className="shell">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              dense ? "py-2.5" : "py-4"
            }`}
          >
            <a href="#top" className="group flex items-baseline gap-2.5" aria-label="Tanmay Tiwari, back to top">
              <span className="serif text-[1.35rem] leading-none tracking-tight">Tanmay Tiwari</span>
              <span className="label hidden pt-[2px] sm:inline">Silent Programmer</span>
            </a>

            <nav className="hidden items-center gap-6 lg:flex" aria-label="Chapters">
              {chapters.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className="group flex items-baseline gap-1.5"
                  aria-label={`${c.no} ${c.label}`}
                >
                  <span className="num text-[9px] text-[var(--faint)]">{c.no}</span>
                  <span className="meta text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">
                    <span className="link-u">{c.label}</span>
                  </span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <span className="hidden xl:flex items-center gap-2">
                <LocalClock className="meta text-[var(--faint)]" />
              </span>
              <ThemeToggle />
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 border border-[var(--rule-strong)] px-2.5 py-1.5 lg:hidden"
                aria-label={open ? "Close index" : "Open index"}
                aria-expanded={open}
              >
                <span className="meta text-[var(--ink)]">{open ? "Close" : "Index"}</span>
                <span className="relative block h-2.5 w-3.5">
                  <span
                    className={`absolute left-0 h-px w-full bg-[var(--ink)] transition-all duration-300 ${
                      open ? "top-1/2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-px w-full bg-[var(--ink)] transition-all duration-300 ${
                      open ? "top-1/2 -rotate-45" : "bottom-0"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="rule" />
        <motion.div
          className="h-px origin-left bg-[var(--accent)]"
          style={{ scaleX: progress, opacity: dense ? 1 : 0 }}
        />
      </motion.header>

      {/* Mobile index sheet — a table of contents, not a fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "color-mix(in srgb, var(--paper) 97%, transparent)" }}
          onClick={() => setOpen(false)}
        />
        <div className="shell relative flex h-full flex-col justify-center pt-20">
          <p className="label mb-6">Contents</p>
          {chapters.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-[var(--rule)] py-3.5"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(10px)",
                transition: `opacity .45s var(--ease-out-expo) ${i * 40}ms, transform .45s var(--ease-out-expo) ${i * 40}ms`,
              }}
            >
              <span className="display text-[clamp(2rem,9vw,3rem)]">{c.label}</span>
              <span className="num text-[10px] text-[var(--faint)]">{c.no}</span>
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="meta mt-8 text-[var(--muted)]"
            onClick={() => setOpen(false)}
          >
            {profile.email}
          </a>
        </div>
      </div>
    </>
  );
}
