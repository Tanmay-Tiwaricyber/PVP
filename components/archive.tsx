"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { repos } from "@/lib/repos";
import RevealText from "./reveal-text";
import FadeIn from "./fade-in";

const FILTERS = ["All", "TypeScript", "JavaScript", "Python", "HTML", "C++"] as const;

export default function Archive() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return repos
      .filter((r) => (filter === "All" ? true : r.lang === filter))
      .filter((r) => (q ? r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) : true))
      .slice(0, 18);
  }, [filter, query]);

  return (
    <section className="relative border-t border-bone/10 py-[clamp(4rem,9vw,8rem)]">
      <div className="shell">
        <div className="mb-9 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <FadeIn>
              <p className="label mb-4">/ The archive · 175 public repos</p>
            </FadeIn>
            <RevealText as="h2" className="display text-[clamp(2.1rem,5.6vw,4.6rem)]">
              The unfinished shelf.
            </RevealText>
          </div>
          <FadeIn delay={0.1} className="md:col-span-5">
            <p className="measure text-[0.9rem] leading-relaxed text-bone/45">
              Every real portfolio has a second inventory: the experiments, the tools nobody
              asked for, the repositories that taught the lesson and then went quiet. This is
              a live read of mine — {repos.length} of them.
            </p>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mb-6 flex flex-col gap-4 border-y border-bone/10 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] transition-colors ${
                    filter === f
                      ? "bg-bone text-ink"
                      : "border border-bone/15 text-bone/45 hover:border-bone/40 hover:text-bone/80"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <label className="relative flex items-center gap-2 border-b border-bone/15 pb-1 sm:w-56">
              <span className="font-mono text-[10px] text-bone/30">⌕</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search repositories"
                aria-label="Search repositories"
                className="w-full bg-transparent font-mono text-[10px] uppercase tracking-[0.14em] text-bone placeholder:text-bone/25 focus:outline-none"
              />
            </label>
          </div>
        </FadeIn>

        <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <motion.a
              key={r.name}
              href={`https://github.com/Tanmay-Tiwaricyber/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.5, delay: Math.min(i, 9) * 0.03, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-start gap-3 border-b border-bone/10 py-3.5"
            >
              <span className="mt-1 font-mono text-[9px] text-bone/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2">
                  <span className="truncate text-[0.92rem] text-bone/85 transition-colors group-hover:text-bone">
                    {r.name}
                  </span>
                  {r.stars > 0 && (
                    <span className="shrink-0 font-mono text-[9px] text-acid/80">★ {r.stars}</span>
                  )}
                </span>
                {r.desc ? (
                  <span className="mt-0.5 block truncate text-[0.72rem] leading-relaxed text-bone/32">
                    {r.desc}
                  </span>
                ) : null}
                <span className="mt-1 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-bone/25">
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{
                      background:
                        r.lang === "TypeScript"
                          ? "#6fe3ff"
                          : r.lang === "JavaScript"
                            ? "#d9f24b"
                            : r.lang === "Python"
                              ? "#ff7a4d"
                              : r.lang === "HTML"
                                ? "#ff4d1f"
                                : "rgba(242,239,230,0.3)",
                    }}
                  />
                  {r.lang} · {r.year}
                  {r.home ? <span className="text-acid/60">live ↗</span> : null}
                </span>
              </span>
            </motion.a>
          ))}
        </div>
        {list.length === 0 && (
          <p className="py-10 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/30">
            Nothing here under that name — try another.
          </p>
        )}
        <div className="mt-8 flex items-center justify-between border-t border-bone/10 pt-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone/25">
            Showing {list.length} of {repos.length}
          </p>
          <a
            href="https://github.com/Tanmay-Tiwaricyber?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="link-u font-mono text-[9px] uppercase tracking-[0.18em] text-bone/60 hover:text-acid"
          >
            All repositories on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
