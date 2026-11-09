import type { Project } from "@/lib/site";

/**
 * Plates, not screenshots. Each project gets a drawn "plate" — a printed
 * diagram of what the thing actually does — so the page ships no imagery and
 * nothing ever goes stale. Marks are inline SVG so they inherit the theme.
 */
export default function Plate({ figure, className }: { figure: Project["figure"]; className?: string }) {
  const stroke = "var(--ink)";
  const accent = "var(--accent)";
  const soft = "var(--rule-strong)";

  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden border border-[var(--rule)] bg-[var(--paper-2)] ${className ?? ""}`}
    >
      <div className="halftone absolute inset-0 opacity-30" aria-hidden />
      <svg
        viewBox="0 0 400 300"
        className="relative h-full w-full"
        role="img"
        aria-label={`Diagram for the ${figure} project`}
      >
        {figure === "island" && (
          <g>
            <rect x="70" y="118" width="260" height="52" rx="26" fill="none" stroke={stroke} strokeWidth="1.2" />
            <rect x="70" y="118" width="260" height="52" rx="26" fill={accent} opacity="0.08" />
            <circle cx="98" cy="144" r="4" fill={accent} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x={252 + i * 8}
                y={144 - (6 + Math.abs(Math.sin(i * 1.4)) * 12)}
                width="2"
                height={12 + Math.abs(Math.sin(i * 1.4)) * 24}
                fill={stroke}
                opacity="0.55"
              />
            ))}
            <text x="120" y="148" fill={stroke} fontSize="9" fontFamily="monospace" letterSpacing="1.4">
              HYPER ISLAND
            </text>
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={186 + i * 10} cy={204} r="1.6" fill={i === 0 ? accent : soft} />
            ))}
          </g>
        )}

        {figure === "gdb" && (
          <g fontFamily="monospace" fontSize="8">
            {[
              ["1", "int main(void) {", 0.4],
              ["2", "  int *p = malloc(8);", 0.62],
              ["3", "  *p = 42;", 1],
              ["4", "  return *p;", 0.5],
              ["5", "}", 0.34],
            ].map(([n, code, op], i) => (
              <g key={i}>
                <text x="54" y={82 + i * 22} fill={soft} fontSize="7">
                  {n}
                </text>
                <text x="72" y={82 + i * 22} fill={stroke} opacity={Number(op)}>
                  {code}
                </text>
                {Number(op) === 1 && (
                  <rect x="46" y={82 + i * 22 - 11} width="310" height="16" fill={accent} opacity="0.1" />
                )}
              </g>
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <rect
                key={i}
                x={54 + i * 21}
                y="228"
                width="14"
                height="4"
                fill={i > 8 && i < 12 ? accent : soft}
              />
            ))}
            <path d="M40 200h14M40 214h8" stroke={soft} strokeWidth="1" />
          </g>
        )}

        {figure === "match" && (
          <g>
            {[
              [110, 90],
              [200, 70],
              [290, 100],
              [150, 200],
              [250, 220],
              [330, 190],
            ].map(([x, y], i) => (
              <g key={i}>
                {i > 0 && <line x1="110" y1="90" x2={x} y2={y} stroke={accent} strokeWidth="0.8" opacity="0.4" />}
                {i > 0 && <circle cx={x} cy={y} r="4" fill={stroke} opacity="0.5" />}
              </g>
            ))}
            <circle cx="110" cy="90" r="9" fill={accent} />
            <circle cx="110" cy="90" r="18" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.6" />
            <circle cx="110" cy="90" r="27" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.25" />
            <text x="60" y="270" fill={stroke} fontSize="7.5" fontFamily="monospace" letterSpacing="1.2" opacity="0.6">
              RULE-BASED SCORE · GEMMA REFINEMENT
            </text>
          </g>
        )}

        {figure === "synth" && (
          <g>
            <line x1="50" y1="150" x2="350" y2="150" stroke={soft} strokeWidth="1" />
            {Array.from({ length: 34 }).map((_, i) => {
              const h = 8 + Math.abs(Math.sin(i * 0.9)) * 62;
              return (
                <rect
                  key={i}
                  x={52 + i * 8.8}
                  y={150 - h / 2}
                  width="3"
                  height={h}
                  fill={i % 4 === 0 ? accent : stroke}
                  opacity={i % 4 === 0 ? 0.9 : 0.35}
                />
              );
            })}
            <text x="50" y="240" fill={stroke} fontSize="7.5" fontFamily="monospace" letterSpacing="1.2" opacity="0.6">
              ONE TIMELINE · N DEVICES · DRIFT CORRECTED
            </text>
          </g>
        )}

        {figure === "judge" && (
          <g fontFamily="monospace" fontSize="7">
            {[
              ["Documentation", 0.9],
              ["Demo", 0.75],
              ["Code quality", 0.62],
              ["Innovation", 0.84],
              ["Presentation", 0.7],
            ].map(([label, v], i) => (
              <g key={i}>
                <text x="50" y={92 + i * 30} fill={stroke} opacity="0.75">
                  {label}
                </text>
                <text x="350" y={92 + i * 30} fill={stroke} opacity="0.5" textAnchor="end">
                  {Math.round(Number(v) * 100)}
                </text>
                <rect x="50" y={98 + i * 30} width="300" height="2" fill={soft} />
                <rect x="50" y={98 + i * 30} width={300 * Number(v)} height="2" fill={accent} />
              </g>
            ))}
          </g>
        )}

        {figure === "garuda" && (
          <g>
            <circle cx="200" cy="150" r="72" fill="none" stroke={soft} strokeWidth="1" />
            <circle cx="200" cy="150" r="48" fill="none" stroke={accent} strokeWidth="1" opacity="0.7" />
            <path d="M200 78 L232 168 L200 148 L168 168 Z" fill={accent} opacity="0.9" />
            <path d="M200 222 L188 186 L200 192 L212 186 Z" fill={stroke} opacity="0.4" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line
                key={i}
                x1={200 + Math.cos((i * Math.PI) / 4) * 72}
                y1={150 + Math.sin((i * Math.PI) / 4) * 72}
                x2={200 + Math.cos((i * Math.PI) / 4) * 84}
                y2={150 + Math.sin((i * Math.PI) / 4) * 84}
                stroke={soft}
                strokeWidth="1"
              />
            ))}
          </g>
        )}

        {/* plate marks */}
        <text x="16" y="24" fill={soft} fontSize="6.5" fontFamily="monospace" letterSpacing="1.6">
          PLATE
        </text>
        <line x1="16" y1="282" x2="44" y2="282" stroke={soft} strokeWidth="1" />
        <line x1="16" y1="278" x2="16" y2="286" stroke={soft} strokeWidth="1" />
      </svg>
    </div>
  );
}
