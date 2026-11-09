"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/site";
import { machine } from "./scroll";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The surface. Type that floats in front of the monolith, and a scroll cue.
 * The monolith itself is drawn by the canvas behind this — the column on the
 * right is left empty on purpose, so the object is never covered.
 */
export default function MachineHero() {
  const reduce = useReducedMotion();
  const [intro, setIntro] = useState(1.9);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "pending") {
      setIntro(0);
      return;
    }
    const release = () => setIntro(0);
    window.addEventListener("tt:intro", release);
    const guard = window.setTimeout(release, 4200);
    return () => {
      window.removeEventListener("tt:intro", release);
      window.clearTimeout(guard);
    };
  }, []);

  return (
    <section
      id="top"
      data-cam="0.85,0.55,7.6|1.7,0.0,0"
      data-layer="SURFACE"
      data-depth="0000 m"
      className="relative min-h-[100svh]"
    >
      <div className="shell relative flex min-h-[100svh] flex-col justify-between py-20 sm:py-24">
        {/* masthead */}
        {/* (the contents rail is a separate chapter on the surface) */}
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[var(--rule)] pb-2.5">
          <p className="label text-[var(--ink)]/70">Inside the machine · Vol. 01</p>
          <p className="label hidden text-[var(--ink)]/45 sm:block">Kanpur, IN · {new Date().getFullYear()}</p>
          <p className="label hidden text-[var(--ink)]/45 md:block">Silent Programmer</p>
        </div>

        <div className="grid flex-1 grid-cols-1 items-center gap-10 py-8 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-6">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: intro + 0.15, ease: EASE }}
                className="label text-[var(--accent)]"
              >
                Full-stack engineer · Security builder
              </motion.p>
            </div>

            <div aria-hidden className="mt-2 overflow-hidden">
              <motion.h1
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, delay: intro + 0.24, ease: EASE }}
                className="display text-[clamp(3.2rem,9.5vw,8.2rem)] text-[var(--ink)]"
              >
                Tanmay
              </motion.h1>
            </div>
            <div aria-hidden className="overflow-hidden">
              <motion.p
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, delay: intro + 0.32, ease: EASE }}
                className="display flex flex-wrap items-baseline gap-x-[0.18em] text-[clamp(3.2rem,9.5vw,8.2rem)] text-[var(--ink)]"
              >
                <span>Tiwari</span>
                <span className="serif-italic text-[0.21em] leading-none text-[var(--accent)]">
                  silent programmer
                </span>
              </motion.p>
            </div>
            <h1 className="sr-only">
              Tanmay Tiwari — Silent Programmer. Full-stack engineer and security builder, Kanpur,
              India.
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: intro + 0.5, ease: EASE }}
              className="measure mt-5 max-w-[42ch] text-[clamp(0.9rem,1.2vw,1rem)] leading-[1.65] text-[var(--ink)]/70"
            >
              Four layers of a machine, one descent. Product surfaces, the kernel underneath,
              the network outside it, and the silicon where models run. Scroll to go down.
            </motion.p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#work"
                data-magnetic
                className="group inline-flex items-center gap-2 border border-[var(--accent)] bg-[var(--accent)] px-4 py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.24em] text-[#05070a] transition-colors hover:bg-transparent hover:text-[var(--accent)]"
              >
                Begin the descent
                <span className="transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href={`mailto:${profile.email}?subject=Project%20enquiry`}
                data-magnetic
                className="meta text-[var(--ink)]/70 transition-colors hover:text-[var(--accent)]"
              >
                <span className="link-u">Start a project</span>
              </a>
            </div>
          </div>

          {/* the monolith occupies this column in the canvas */}
          <div className="hidden lg:col-span-5 xl:col-span-6 lg:block" aria-hidden />
        </div>

        {/* the descent rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: intro + 0.9 }}
          className="flex items-end justify-between gap-4 border-t border-[var(--rule)] pt-2.5"
        >
          <div className="flex items-center gap-3">
            <span className="hud">scroll</span>
            <span className="relative block h-8 w-px overflow-hidden bg-[var(--rule-strong)]">
              <motion.span
                className="absolute left-0 top-0 block h-3 w-px bg-[var(--accent)]"
                animate={reduce ? undefined : { y: [-12, 32] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span className="hud">to descend</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {[
              ["GitHub", profile.links.github],
              ["LinkedIn", profile.links.linkedin],
              ["TryHackMe", profile.links.tryhackme],
              ["Email", `mailto:${profile.email}`],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="font-mono text-[0.52rem] uppercase tracking-[0.26em] text-[var(--ink)]/45 transition-colors hover:text-[var(--accent)]"
              >
                <span className="link-u">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
