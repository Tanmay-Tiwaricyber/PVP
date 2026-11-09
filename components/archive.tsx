"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { repos } from "@/lib/repos";
import LayerHead from "./machine/layer-head";

const FILTERS = ["All", "TypeScript", "JavaScript", "Python", "HTML", "C++"] as const;

export default function Archive() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return repos
      .filter((r) => (filter === "All" ? true : r.lang === filter))
      .filter((r) => (query ? r.name.toLowerCase().includes(query) || r.desc.toLowerCase().includes(query) : true))
      .slice(0, 21);
  }, [filter, q]);

  return (
    <section
      id="archive"
      data-cam="1.8,-2.5,6.4|0.4,-2.7,-1.6"
      data-layer="SURFACE · INDEX"
      data-depth="0004 m"
      className="rule-t py-14 sm:py-20"
    >
      <div className="shell">
        <LayerHead
          layer="L1 · Browser"
          depth="006 m"
          name={`${repos.length} public repositories`}
          title="The archive"
          accentWord="archive"
          lede="Every portfolio has a second inventory: the experiments, the tools nobody asked for, the repositories that taught the lesson and then went quiet."
        />

        <div className="mb-5 flex flex-col gap-3 border-b border-[var(--rule)] pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`label transition-colors ${
                  filter === f ? "text-[var(--accent)]" : "text-[var(--faint)] hover:text-[var(--ink)]"
                }`}
              >
                <span className={filter === f ? "border-b border-[var(--accent)] pb-0.5" : ""}>{f}</span>
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 border-b border-[var(--rule-strong)] pb-1 sm:w-52">
            <span className="label">Find</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="repository name"
              aria-label="Search repositories"
              className="w-full bg-transparent font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--ink)] placeholder:text-[var(--faint)] focus:outline-none"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <motion.a
              key={r.name}
              href={`https://github.com/Tanmay-Tiwaricyber/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-4%" }}
              transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.025 }}
              className="group grid grid-cols-[1.8rem_1fr] items-baseline gap-2 border-b border-[var(--rule)] py-2.5"
            >
              <span className="num text-[0.56rem] text-[var(--faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="flex items-baseline gap-2">
                  <span className="truncate text-[0.86rem] text-[var(--ink)]/85 transition-colors group-hover:text-[var(--accent)]">
                    {r.name}
                  </span>
                  {r.stars > 0 && (
                    <span className="num shrink-0 text-[0.56rem] text-[var(--ochre)]">★{r.stars}</span>
                  )}
                </span>
                <span className="label mt-0.5 block text-[var(--faint)]">
                  {r.lang} · {r.year}
                  {r.home ? " · live" : ""}
                </span>
              </span>
            </motion.a>
          ))}
        </div>

        {list.length === 0 && (
          <p className="label py-8">Nothing under that name — try another.</p>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--rule)] pt-3">
          <p className="label">
            Showing {list.length} of {repos.length}
          </p>
          <a
            href="https://github.com/Tanmay-Tiwaricyber?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="label link-u text-[var(--ink)] hover:text-[var(--accent)]"
          >
            Every repository on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
