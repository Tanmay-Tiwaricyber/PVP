import type { Project } from "@/lib/site";

/**
 * Every project preview is drawn, not photographed: pure CSS/SVG "instrument
 * panels" keyed to each project's accent. Keeps the site image-free, instant,
 * and impossible to confuse with a template screenshot.
 */
export default function ProjectVisual({ project }: { project: Project }) {
  const a = project.accent;

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[3px] bg-void"
      style={{ ["--a" as string]: a }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(242,239,230,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,239,230,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        className="absolute -top-1/3 left-1/2 h-[130%] w-[80%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${a}44, transparent 65%)` }}
      />

      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-bone/45">
          <span>{project.kind.split(" · ")[0]}</span>
          <span>{project.metric ?? project.year}</span>
        </div>

        <div className="relative flex flex-1 items-center justify-center py-3">
          {project.glyph === "island" && (
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-9 w-32 rounded-full border border-white/25 backdrop-blur-sm"
                style={{ background: `linear-gradient(180deg, rgba(255,255,255,0.16), ${a}22)` }}
              >
                <div className="flex h-full items-center justify-between px-3">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: a }} />
                  <div className="flex items-end gap-[2px]">
                    {[6, 11, 8, 14, 5].map((h, i) => (
                      <span key={i} className="w-[2px] rounded-full bg-white/70" style={{ height: h }} />
                    ))}
                  </div>
                  <span className="font-mono text-[7px] text-white/70">78</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-[3px] w-[3px] rounded-full"
                    style={{ background: i === 0 ? a : "rgba(255,255,255,0.25)" }}
                  />
                ))}
              </div>
            </div>
          )}

          {project.glyph === "match" && (
            <svg viewBox="0 0 160 90" className="w-full max-w-[190px]">
              {[
                [30, 22],
                [78, 14],
                [128, 30],
                [48, 62],
                [104, 70],
                [140, 62],
              ].map(([x, y], i) => (
                <g key={i}>
                  {i > 0 && (
                    <line
                      x1={30}
                      y1={22}
                      x2={x}
                      y2={y}
                      stroke={a}
                      strokeOpacity={0.32}
                      strokeWidth="0.7"
                    />
                  )}
                  {i > 0 && (
                    <circle cx={x} cy={y} r="2.6" fill={a} fillOpacity={0.9} />
                  )}
                </g>
              ))}
              <circle cx="30" cy="22" r="5" fill={a} />
              <circle cx="30" cy="22" r="10" fill="none" stroke={a} strokeOpacity="0.35" />
            </svg>
          )}

          {project.glyph === "gdb" && (
            <div className="w-full max-w-[190px] space-y-[5px]">
              {[
                ["1", "int main(void) {", 0.35],
                ["2", "  int *p = malloc(8);", 0.55],
                ["3", "  *p = 42;", 0.9],
                ["4", "  return *p;", 0.45],
                ["5", "}", 0.3],
              ].map(([n, code, op], i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-mono text-[6px] text-bone/40">{n}</span>
                  <span
                    className="font-mono text-[7px]"
                    style={{
                      color: `rgba(242,239,230,${Number(op)})`,
                      textShadow: Number(op) > 0.8 ? `0 0 8px ${a}` : undefined,
                    }}
                  >
                    {code}
                  </span>
                </div>
              ))}
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1 flex-1 rounded-sm"
                    style={{
                      background: i > 9 && i < 13 ? a : "rgba(242,239,230,0.14)",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {project.glyph === "synth" && (
            <div className="flex h-14 items-end gap-[3px]">
              {Array.from({ length: 26 }).map((_, i) => {
                const h = 8 + Math.abs(Math.sin(i * 1.1)) * 40;
                return (
                  <span
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{
                      height: h,
                      background: i % 3 === 0 ? a : `rgba(242,239,230,${0.18 + (h / 60) * 0.5})`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {project.glyph === "thread" && (
            <div className="w-full max-w-[180px] space-y-2">
              {[
                ["Documentation", 0.9],
                ["Demo", 0.75],
                ["Code quality", 0.62],
                ["Innovation", 0.84],
              ].map(([label, v], i) => (
                <div key={i}>
                  <div className="mb-1 flex justify-between font-mono text-[6px] uppercase tracking-widest text-bone/40">
                    <span>{label}</span>
                    <span>{Math.round(Number(v) * 100)}</span>
                  </div>
                  <div className="h-[2px] w-full bg-bone/10">
                    <div
                      className="h-full"
                      style={{ width: `${Number(v) * 100}%`, background: a, opacity: 0.9 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {project.glyph === "rocket" && (
            <div className="relative grid place-items-center">
              <div
                className="absolute h-16 w-16 rounded-full blur-xl"
                style={{ background: `${a}55` }}
              />
              <svg width="70" height="70" viewBox="0 0 70 70" className="relative">
                <circle cx="35" cy="35" r="26" fill="none" stroke={a} strokeOpacity="0.3" />
                <circle cx="35" cy="35" r="17" fill="none" stroke={a} strokeOpacity="0.55" />
                <path d="M35 12 L43 38 L35 32 L27 38 Z" fill={a} />
                <path d="M35 58 L31 46 L35 48 L39 46 Z" fill={a} fillOpacity="0.5" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-wrap gap-1">
            {project.stack.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-bone/15 px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-wider text-bone/50"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="font-mono text-[8px] tracking-widest" style={{ color: a }}>
            ↗
          </span>
        </div>
      </div>
    </div>
  );
}
