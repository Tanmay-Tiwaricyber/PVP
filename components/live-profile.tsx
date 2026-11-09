"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { profile, tryhackme, socials } from "@/lib/site";
import RevealText from "./reveal-text";
import FadeIn from "./fade-in";

type State =
  | { status: "idle" | "loading" }
  | { status: "ok"; score: number; rank: string; rooms: number }
  | { status: "error" };

const LABELS: Record<string, string> = {
  "0-0": "Script Kiddie",
  "1-0": "Script Kiddie",
  "2-0": "Hacker Initiate",
  "3-0": "Hacker",
  "4-0": "Pro Hacker",
  "5-0": "Elite Hacker",
  "6-0": "Guru",
  "7-0": "Omniscient",
};

export default function LiveProfile() {
  const [thm, setThm] = useState<State>({ status: "idle" });
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (tried) return;
    setTried(true);
    setThm({ status: "loading" });
    fetch(`/api/tryhackme?u=${encodeURIComponent(tryhackme.handle)}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (typeof data?.score !== "number") throw new Error("bad payload");
        setThm({
          status: "ok",
          score: data.score,
          rank: data.rank ?? LABELS[data.topPercentage] ?? "Hacker",
          rooms: data.rooms ?? 0,
        });
      })
      .catch(() => setThm({ status: "error" }));
  }, [tried]);

  return (
    <section className="relative border-t border-bone/10 py-[clamp(4rem,9vw,8rem)]">
      <div className="shell">
        <div className="mb-9 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <FadeIn>
              <p className="label mb-4">/ Security &amp; CTF</p>
            </FadeIn>
            <RevealText as="h2" className="display text-[clamp(2.1rem,5.6vw,4.6rem)]">
              Breaking things on the record.
            </RevealText>
          </div>
          <FadeIn delay={0.1} className="md:col-span-5">
            <p className="measure text-[0.92rem] leading-relaxed text-bone/50">
              Six years of offensive practice behind the code I ship — rooms, CTFs and my own
              tooling. It is the reason the products above fail safely instead of loudly.
            </p>
          </FadeIn>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* TryHackMe card */}
          <FadeIn className="lg:col-span-7">
            <div className="group relative h-full overflow-hidden rounded-[5px] border border-bone/12 bg-ink-2/50 p-6 sm:p-8">
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgba(255,77,31,0.28),transparent)] blur-2xl transition-opacity duration-700 group-hover:opacity-80" />

              <div className="relative flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-signal">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                    TryHackMe
                  </p>
                  <h3 className="mt-3 flex items-baseline gap-2 text-[clamp(1.7rem,3.4vw,2.7rem)] font-semibold tracking-[-0.03em]">
                    TanmayTiwari
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/45">
                    tryhackme.com/p/{tryhackme.handle}
                  </p>
                </div>
                <a
                  href={tryhackme.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative rounded-full border border-bone/20 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-bone/80 transition-colors hover:border-signal hover:text-acid"
                >
                  View profile ↗
                </a>
              </div>

              {/* Public badge (S3, fetched by the browser): shows the real rank
                  even when the profile API blocks datacenter traffic. */}
              <div className="relative mt-6 w-full max-w-[268px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tryhackme.badge}
                  alt="TanmayTiwari's live TryHackMe badge — score and rank"
                  width={268}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  className="h-auto w-full opacity-90"
                />
              </div>

              <div className="relative mt-7 grid grid-cols-2 gap-5 border-t border-bone/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="label mb-1.5">Rank</p>
                  {thm.status === "ok" ? (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[1.15rem] font-medium text-acid"
                    >
                      {thm.rank}
                    </motion.p>
                  ) : (
                    <p className="text-[1.15rem] font-medium text-bone/85">
                      {thm.status === "loading" ? "…" : "Member"}
                    </p>
                  )}
                </div>
                <div>
                  <p className="label mb-1.5">Score</p>
                  <p className="font-mono text-[1.15rem] tabular-nums text-bone/85">
                    {thm.status === "ok"
                      ? thm.score.toLocaleString()
                      : thm.status === "loading"
                        ? "—"
                        : "Live ↗"}
                  </p>
                </div>
                <div>
                  <p className="label mb-1.5">Live feed</p>
                  <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-bone/50">
                    {thm.status === "ok"
                      ? "synced from THM API"
                      : thm.status === "loading"
                        ? "requesting…"
                        : "open profile"}
                  </p>
                </div>
              </div>

              <div className="relative mt-6 flex flex-wrap items-center gap-2 border-t border-bone/10 pt-5">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40">
                  Focus
                </span>
                {tryhackme.domains.map((d) => (
                  <span
                    key={d.name}
                    className="rounded-full border border-bone/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-bone/60"
                    title={d.note}
                  >
                    {d.name}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* CTF card */}
          <FadeIn delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-[5px] border border-bone/12 bg-ink-2/40 p-6 sm:p-8">
              <div>
                <p className="label mb-4">Competed · verified badge</p>
                {tryhackme.ctfs.map((c) => (
                  <div key={c.name}>
                    <h3 className="display text-[clamp(1.5rem,2.6vw,2.1rem)]">
                      {c.name} <span className="serif-accent text-signal">{c.edition}</span>
                    </h3>
                    <dl className="mt-5 space-y-2.5 border-t border-bone/10 pt-4">
                      {[
                        ["Role", c.role],
                        ["Competing as", c.team],
                        ["Issued by", c.issuer],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-baseline justify-between gap-4">
                          <dt className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/40">
                            {k}
                          </dt>
                          <dd className="text-right font-mono text-[10px] uppercase tracking-[0.12em] text-bone/80">
                            {v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={tryhackme.ctfs[0].credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u font-mono text-[9px] uppercase tracking-[0.16em] text-acid"
                >
                  Credential ↗
                </a>
                <a
                  href={tryhackme.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u font-mono text-[9px] uppercase tracking-[0.16em] text-bone/50 hover:text-bone"
                >
                  All THM activity ↗
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* identity strip */}
        <FadeIn delay={0.05}>
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-[5px] border border-bone/12 px-6 py-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone/40">
              Find me
            </span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bone/75 transition-colors hover:text-acid"
              >
                <span>{s.label}</span>
                <span className="text-[9px] text-bone/35 transition-colors group-hover:text-bone/60">
                  {s.handle}
                </span>
              </a>
            ))}
            <span className="ml-auto hidden font-mono text-[9px] uppercase tracking-[0.16em] text-bone/35 sm:block">
              {profile.location}
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
