"use client";

import { motion } from "motion/react";
import { capabilities } from "@/lib/site";
import LayerHead from "./machine/layer-head";

export default function Craft() {
  return (
    <section
      id="craft"
      data-cam="-0.7,-3.6,4.4|-0.2,-3.9,-2.2"
      data-layer="L1 · BROWSER"
      data-depth="0070 m"
      className="rule-t py-14 sm:py-20"
    >
      <div className="shell">
        <LayerHead
          layer="L1 — L4"
          depth="the whole stack"
          name="One machine, four layers"
          title="How I work"
          accentWord="work"
          lede="I move between the browser, the kernel boundary and the security model without treating them as separate careers. The through-line: understand the machine, then remove what the user does not need."
        />

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <motion.article
              key={c.no}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between border-b border-[var(--rule)] px-0 py-6 sm:border-r sm:px-5 sm:last:border-r-0 sm:first:pl-0 lg:border-b-0"
            >
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="num text-[0.62rem] text-[var(--accent)]">{c.no}</span>
                  <span className="label">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="grotesk mt-5 text-[clamp(1.15rem,1.9vw,1.5rem)]">{c.title}</h3>
                <p className="mt-2.5 text-[0.82rem] leading-[1.6] text-[var(--muted)]">{c.body}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                {c.tags.map((t) => (
                  <span key={t} className="handtag">
                    {t}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-700 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
