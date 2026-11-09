"use client";

import { motion } from "motion/react";
import LayerHead from "./layer-head";
import Ask from "./ask";
import { capabilities } from "@/lib/site";

const discipline = capabilities[3];

/**
 * L4. The particle cloud in the canvas resolves into a lattice while this
 * chapter is on screen; here the lattice is described, and Ask Silent answers
 * questions against a fixed index rather than pretending to be a model.
 */
export default function SiliconChapter() {
  return (
    <section
      id="silicon"
      data-cam="0,-12.9,5.4|0,-13.2,-1.6"
      data-layer="L4 · SILICON"
      data-depth="1180 m"
      className="rule-t py-14 sm:py-20"
    >
      <div className="shell">
        <LayerHead
          layer="L4 · Silicon"
          depth="1180 m"
          name="Applied AI"
          title="Applied models, no theatre"
          accentWord="models"
          lede="Open-weight models where they earn their place: explainable scoring, structured intent, coaching copy. Rules first, model second."
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.02]">
              {discipline.title}
              <span className="serif-italic text-[var(--accent)]"> — rules first.</span>
            </p>
            <p className="mt-4 max-w-[52ch] text-[0.9rem] leading-[1.65] text-[var(--ink)]/65">
              {discipline.body}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
              {discipline.tags.map((t) => (
                <span key={t} className="label text-[var(--ink)]/45">
                  {t}
                </span>
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-1 gap-0 border-t border-[var(--rule)] sm:grid-cols-3">
              {[
                ["Deterministic", "Every score is a rule you can read"],
                ["Open weight", "Gemma, locally, where it is allowed"],
                ["Auditable", "A model never outranks a secret scanner"],
              ].map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-4%" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="border-b border-[var(--rule)] py-3 sm:border-b-0 sm:border-r sm:pr-4 sm:last:border-r-0 sm:pl-4 sm:first:pl-0"
                >
                  <dt className="label text-[var(--accent)]">{k}</dt>
                  <dd className="mt-1 text-[0.8rem] leading-snug text-[var(--ink)]/60">{v}</dd>
                </motion.div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6">
            <Ask asSection />
          </div>
        </div>
      </div>
    </section>
  );
}
