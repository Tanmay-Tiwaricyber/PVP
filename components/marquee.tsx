import { marqueeWords } from "@/lib/site";

export default function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];

  return (
    <section className="marquee-host relative overflow-hidden border-y border-bone/10 bg-ink-2/60 py-5">
      <div className="marquee-track" style={{ ["--dur" as string]: "52s" }}>
        {items.map((word, i) => (
          <span key={`${word}-${i}`} className="flex shrink-0 items-center">
            <span className="px-6 font-mono text-[clamp(0.7rem,1.1vw,0.92rem)] uppercase tracking-[0.28em] text-bone/55">
              {word}
            </span>
            <span className="text-signal/70">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </section>
  );
}
