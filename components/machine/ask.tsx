"use client";

import { useRef, useState } from "react";

/**
 * Ask Silent. No model is called from the browser: the answers here are a
 * small, honest index of the things this portfolio can actually prove, matched
 * on keywords. It says so, in the panel, rather than pretending otherwise.
 */
type Entry = { keys: string[]; q: string; a: string; href?: string; hrefLabel?: string };

const INDEX: Entry[] = [
  {
    keys: ["hyper", "island", "dynamic", "windows", "cpp", "c++", "windhawk"],
    q: "What is Hyper Island?",
    a: "A liquid-glass overlay for Windows, written in C++ and loaded through Windhawk. Media, volume, brightness, notifications, focus and clipboard in one surface. It runs in its own process and never injects into Explorer.",
    href: "https://github.com/Tanmay-Tiwaricyber/HyperLand",
    hrefLabel: "HyperLand",
  },
  {
    keys: ["gdb", "c visual", "visualize", "debug", "compiler", "trace"],
    q: "How does C Visualize work?",
    a: "Code travels from the browser to a real compiler and debugger; the recorded GDB trace comes back as a synchronised timeline of lines, variables, stack frames and memory addresses. Nothing is simulated by pattern-matching the source.",
    href: "https://github.com/Tanmay-Tiwaricyber/C-visualize",
    hrefLabel: "C-visualize",
  },
  {
    keys: ["contrib", "match", "issue", "open source", "beginner", "gemma"],
    q: "What does ContribMatch do?",
    a: "A browser-only matcher that reads public GitHub data and scores beginner-friendly issues with explainable rules, then lets an open-weight model refine the shortlist. No backend, no account, no tracking.",
    href: "https://Tanmay-Tiwaricyber.github.io/contribmatch/",
    hrefLabel: "Live demo",
  },
  {
    keys: ["sync", "play", "websocket", "drift", "music", "party"],
    q: "How does SyncPlay keep devices in sync?",
    a: "Client clock estimation with three levels of drift correction over WebSockets, so permitted previews stay aligned across phones. Rooms expire on their own; everyone keeps their own volume.",
    href: "https://github.com/Tanmay-Tiwaricyber/SyncPlay",
    hrefLabel: "SyncPlay",
  },
  {
    keys: ["judge", "ready", "audit", "score", "rubric", "skill"],
    q: "What is Judge-Ready?",
    a: "A skill that audits a repository the way a real panel would: a score out of 100, a seven-category scorecard tied to evidence, and fixes ranked by points gained against effort spent. Secrets are scanned first.",
    href: "https://github.com/Tanmay-Tiwaricyber/Judge-Ready",
    hrefLabel: "Judge-Ready",
  },
  {
    keys: ["tryhackme", "thm", "security", "ctf", "hack", "pentest", "legend", "rank"],
    q: "What is the security record?",
    a: "Legend league on TryHackMe, top one per cent of the platform, capability score 70, a 40-day streak, five earned badges, and a verified DEADFACE CTF 2024 credential under the alias Cyb3r.t1nm1y.",
    href: "https://tryhackme.com/p/TanmayTiwari",
    hrefLabel: "TryHackMe profile",
  },
  {
    keys: ["stack", "tech", "tool", "framework", "language", "typescript", "next"],
    q: "What is the stack?",
    a: "TypeScript and Next.js on the surface, Node services underneath, C++ and Win32 where timing and memory matter, and Python for tooling. This page is Next 16 and React 19 with a hand-written GLSL-free three.js scene.",
  },
  {
    keys: ["hire", "work", "available", "job", "freelance", "contact", "email", "reach"],
    q: "How do I get in touch?",
    a: "tanmaytiwaricyber@gmail.com. Freelance builds, product engineering roles, or a hackathon that needs a finisher — tell me the deadline and what is currently broken.",
    href: "mailto:tanmaytiwaricyber@gmail.com?subject=Project%20enquiry",
    hrefLabel: "Start a project",
  },
  {
    keys: ["repo", "how many", "count", "archive", "project"],
    q: "How much is there to look at?",
    a: "175 public repositories, 435 stars between them, 101 followers, and six of them written up properly in the work chapter. The archive below carries the rest.",
    href: "https://github.com/Tanmay-Tiwaricyber?tab=repositories",
    hrefLabel: "All repositories",
  },
];

function answer(input: string): Entry {
  const q = input.toLowerCase();
  let best: Entry | null = null;
  let score = 0;
  for (const e of INDEX) {
    const hits = e.keys.filter((k) => q.includes(k)).length;
    if (hits > score) {
      score = hits;
      best = e;
    }
  }
  return (
    best ?? {
      keys: [],
      q: "I do not know that one",
      a: "That question is not in the index yet. The honest answer is that this panel matches keywords against a fixed list — ask about Hyper Island, C Visualize, ContribMatch, SyncPlay, Judge-Ready, the TryHackMe record, the stack, or how to get in touch.",
    }
  );
}

const SUGGESTIONS = ["Hyper Island", "security record", "the stack", "hire me"];

export default function Ask({ asSection = false }: { asSection?: boolean }) {
  const [value, setValue] = useState("");
  const [current, setCurrent] = useState<Entry | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setValue("");
    setCurrent(answer(t));
  };

  return (
    <div
      className={
        asSection
          ? "mt-8 border border-[var(--rule-strong)] bg-[color-mix(in_srgb,#05070a_55%,transparent)] p-4 sm:p-6"
          : "mt-8 border border-[var(--rule-strong)] bg-[color-mix(in_srgb,#05070a_55%,transparent)] p-4 sm:p-5"
      }
    >
      <div className="flex items-baseline justify-between border-b border-[var(--rule)] pb-2">
        <span className="label text-[var(--accent)]">Ask Silent</span>
        <span className="label">keyword index · no model called</span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className="mt-3 flex items-center gap-2"
      >
        <span className="font-mono text-[0.7rem] text-[var(--accent)]">›</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="ask about the work…"
          aria-label="Ask a question about the work"
          className="w-full bg-transparent font-mono text-[0.72rem] tracking-wide text-[var(--ink)] placeholder:text-[var(--faint)] focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 border border-[var(--rule-strong)] px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.22em] text-[var(--ink)]/70 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Ask
        </button>
      </form>

      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => submit(s)}
            className="font-mono text-[0.52rem] uppercase tracking-[0.18em] text-[var(--faint)] transition-colors hover:text-[var(--accent)]"
          >
            {s}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-4 min-h-[5.5rem] border-t border-[var(--rule)] pt-3">
        {current ? (
          <>
            <p className="label text-[var(--ink)]/80">{current.q}</p>
            <p className="mt-1.5 max-w-[54ch] text-[0.82rem] leading-[1.6] text-[var(--ink)]/65">
              {current.a}
            </p>
            {current.href && (
              <a
                href={current.href}
                target={current.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="meta link-u mt-2 inline-block text-[var(--accent)]"
              >
                {current.hrefLabel} ↗
              </a>
            )}
          </>
        ) : (
          <p className="text-[0.8rem] leading-[1.6] text-[var(--ink)]/45">
            Nine answers, all of them checkable. Try <em>the stack</em>, or <em>Hyper Island</em>.
          </p>
        )}
      </div>
    </div>
  );
}
