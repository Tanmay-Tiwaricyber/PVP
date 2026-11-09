"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import LocalClock from "./local-clock";
import BadgeWall from "./badge-wall";
import ThmSeal from "./thm-seal";
import useIntro from "./use-intro";
import { profile } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Cover() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const t = useIntro(1.95);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const fade = useTransform(scrollYProgress, [0, 0.92], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-14 sm:pt-16">
      <motion.div
        style={reduce ? undefined : { y, opacity: fade }}
        className="shell relative flex min-h-[calc(100svh-4rem)] flex-col justify-between py-5"
      >
        {/* masthead */}
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[var(--rule)] pb-2.5">
          <p className="label">Portfolio · Vol. 01 · Kanpur, IN</p>
          <p className="label hidden sm:block">Est. Oct 2021</p>
          <p className="label hidden sm:block">
            <LocalClock />
          </p>
        </div>

        <div className="grid flex-1 grid-cols-1 items-center gap-y-8 py-6 lg:grid-cols-12 lg:gap-x-10">
          {/* ——— left: the title page ——— */}
          <div className="relative lg:col-span-7">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: t + 1.95, ease: EASE }}
                className="label text-[var(--ink)]"
              >
                {profile.name} <span className="mx-1.5 text-[var(--accent)]">·</span>{" "}
                {profile.role.split(" · ")[0]}
              </motion.p>
            </div>

            <div aria-hidden className="mt-1 overflow-hidden">
              <motion.h1
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, delay: t + 2.02, ease: EASE }}
                className="display text-[clamp(3.3rem,11.5vw,9.5rem)]"
              >
                Tanmay
              </motion.h1>
            </div>
            <div aria-hidden className="overflow-hidden">
              <motion.p
                initial={{ y: "104%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.4, delay: t + 2.1, ease: EASE }}
                className="display flex flex-wrap items-baseline gap-x-[0.16em] text-[clamp(3.3rem,11.5vw,9.5rem)]"
              >
                <span>Tiwari</span>
                <span className="serif-italic text-[0.2em] leading-none text-[var(--accent)]">
                  silent programmer
                </span>
              </motion.p>
            </div>
            <h1 className="sr-only">
              Tanmay Tiwari — Silent Programmer. Full-stack engineer and security builder, Kanpur,
              India.
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: t + 2.32, ease: EASE }}
              className="mt-4 h-px origin-left bg-[var(--rule-strong)]"
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: t + 2.44, ease: EASE }}
              className="mt-4 max-w-[46ch]"
            >
              <p className="dropcap text-[clamp(0.92rem,1.35vw,1.06rem)] leading-[1.6] text-[var(--ink)]/85">
                I build software that respects the person using it — fast, private by default, and
                finished enough to survive a real deadline. Six years of public repositories, a
                top-1% security record, and a habit of shipping the hard part first.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: t + 2.5, ease: EASE }}
              className="pointer-events-none absolute bottom-2 right-2 hidden -rotate-[9deg] xl:block"
            >
              <ThmSeal size={96} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: t + 2.56 }}
              className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <a
                href="#work"
                className="group inline-flex items-baseline gap-2 border border-[var(--ink)] px-3.5 py-2 transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                <span className="meta text-inherit">Read the work</span>
                <span className="num text-[9px] text-[var(--accent)] transition-transform duration-500 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
              <a
                href={`mailto:${profile.email}?subject=Project%20enquiry`}
                className="meta link-u text-[var(--ink)] hover:text-[var(--accent)]"
              >
                Start a project
              </a>
              <span className="meta flex items-center gap-1.5 text-[var(--faint)]">
                <span className="relative flex h-1.5 w-1.5 items-center justify-center">
                  <span className="absolute h-1.5 w-1.5 rounded-full bg-[var(--sage)]" />
                </span>
                Open to work
              </span>
            </motion.div>
          </div>

          {/* ——— right: the cabinet of pins ——— */}
          <div className="relative lg:col-span-5 lg:pl-2">
            <BadgeWall startDelay={t + 2.5} />
          </div>
        </div>

        {/* cover footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: t + 2.72 }}
          className="flex flex-wrap items-end justify-between gap-3 border-t border-[var(--rule)] pt-2.5"
        >
          <p className="label">
            Eleven pins · three issuers · every one checkable
          </p>
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
                className="label transition-colors hover:text-[var(--accent)]"
              >
                <span className="link-u">{label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
