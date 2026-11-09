"use client";

import { motion } from "motion/react";
import { thm } from "@/lib/site";
import ChapterHead from "./chapter-head";
import { Circle } from "./squiggle";

/**
 * The TryHackMe record, set as a dossier rather than a badge wall.
 * Every figure below was read off https://tryhackme.com/p/TanmayTiwari.
 */
const metrics = [
  { k: "League", v: thm.league, note: `peak ${thm.leaguePeak}` },
  { k: "Ranking", v: thm.ranking, note: "global" },
  { k: "Capability", v: String(thm.capability), note: "score" },
  { k: "Streak", v: `${thm.streak}d`, note: "longest run" },
];

export default function Security() {
  return (
    <section id="security" className="rule-t py-14 sm:py-20">
      <div className="shell">
        <ChapterHead
          no="04"
          title="The security record"
          accentWord="security"
          aside={`TryHackMe · captured ${thm.captured}`}
          lede="Five years of offensive practice behind the code I ship — rooms, CTFs and my own tooling. It is the reason the products above fail safely instead of loudly."
        />

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          {/* dossier */}
          <div className="lg:col-span-5">
            <div className="crop border border-[var(--rule-strong)] p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-[var(--rule)] pb-4">
                <div>
                  <p className="label text-[var(--accent)]">TryHackMe</p>
                  <p className="serif mt-1 text-[clamp(1.9rem,3.4vw,2.6rem)] leading-none">
                    {thm.handle}
                  </p>
                  <p className="meta mt-2 text-[var(--faint)]">
                    Joined {thm.joined} · {thm.followers} followers
                  </p>
                </div>
                <a
                  href={thm.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta shrink-0 border border-[var(--rule-strong)] px-2.5 py-1.5 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Profile ↗
                </a>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.k}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-6%" }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <dt className="label">{m.k}</dt>
                    <dd className="num mt-1 text-[clamp(1.5rem,3vw,2.1rem)] leading-none">
                      {m.v === "Top 1%" ? <Circle className="pr-1">{m.v}</Circle> : m.v}
                    </dd>
                    <dd className="label mt-1 text-[var(--faint)]">{m.note}</dd>
                  </motion.div>
                ))}
              </dl>

              <div className="mt-5 border-t border-[var(--rule)] pt-4">
                <p className="label mb-2.5">Badges earned</p>
                <ul className="flex flex-wrap items-center gap-2.5">
                  {thm.badges.map((b) => (
                    <li key={b.name} className="group relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.src}
                        alt={b.name}
                        width={44}
                        height={44}
                        loading="lazy"
                        className="h-11 w-11 object-contain opacity-90 transition-opacity group-hover:opacity-100"
                      />
                      <span className="pointer-events-none absolute -bottom-6 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-[var(--rule-strong)] bg-[var(--paper)] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[var(--ink)] opacity-0 transition-opacity group-hover:opacity-100">
                        {b.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[var(--rule)] pt-4 sm:grid-cols-2">
                <div>
                  <p className="label mb-2">Top tools</p>
                  <p className="text-[0.78rem] leading-[1.7] text-[var(--muted)]">
                    {thm.tools.join(" · ")}
                  </p>
                </div>
                <div>
                  <p className="label mb-2">Rooms completed</p>
                  <ul className="space-y-1">
                    {thm.rooms.map((r) => (
                      <li key={r.name} className="flex items-baseline justify-between gap-2">
                        <span className="text-[0.76rem] leading-tight text-[var(--muted)]">{r.name}</span>
                        <span className="label shrink-0 text-[var(--faint)]">{r.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p className="label mt-2.5 leading-relaxed">
              Figures transcribed from the public profile, {thm.captured}. Live badge is served
              directly by TryHackMe.
            </p>
          </div>

          {/* certificate + skill ladder */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border-t border-[var(--rule-strong)] pt-4">
              <p className="label mb-3">Competed · verified credential</p>
              <h3 className="display text-[clamp(1.7rem,3.4vw,2.6rem)]">
                {thm.ctf.name}{" "}
                <span className="serif-italic text-[var(--accent)]">{thm.ctf.edition}</span>
              </h3>
              <dl className="mt-4 max-w-sm">
                {[
                  ["Role", thm.ctf.role],
                  ["Competing as", thm.ctf.team],
                  ["Issued by", thm.ctf.issuer],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b border-[var(--rule)] py-1.5"
                  >
                    <dt className="label">{k}</dt>
                    <dd className="meta text-[var(--ink)]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                <a
                  href={thm.ctf.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta link-u text-[var(--accent)]"
                >
                  Verify credential ↗
                </a>
                <a
                  href={thm.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta link-u text-[var(--muted)] hover:text-[var(--ink)]"
                >
                  All activity ↗
                </a>
              </div>
            </div>

            {/* skill ladder */}
            <div className="mt-8 border-t border-[var(--rule-strong)] pt-4">
              <p className="label mb-3">Skill matrix</p>
              <ol className="grid grid-cols-1 gap-0 sm:grid-cols-4">
                {thm.skills.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-4%" }}
                    transition={{ duration: 0.55, delay: i * 0.08 }}
                    className="relative border-b border-[var(--rule)] pb-3 pr-4 sm:border-b-0 sm:border-r sm:pl-3 sm:first:pl-0 sm:last:border-r-0"
                  >
                    <span className="num block text-[0.58rem] text-[var(--faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="grotesk mt-1.5 block text-[0.88rem] leading-tight">{s}</span>
                    <span className="mt-2 block h-[3px] w-full bg-[var(--rule)]">
                      <motion.span
                        className="block h-full bg-[var(--accent)]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(i + 1) * 25}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>

            <blockquote className="mt-8 border-l-2 border-[var(--accent)] pl-4">
              <p className="serif-italic text-[clamp(1.1rem,2vw,1.45rem)] leading-[1.35]">
                “I learned to break things before I learned to ship them. That order is the
                advantage — you design for the failure you have already caused.”
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
