import type { BadgeArt } from "@/lib/badges";

/**
 * GitHub achievements ship no artwork, so they are drawn here as single-weight
 * marks. Everything is currentColor so the pins work on paper and on ink.
 */
export default function BadgeArtMark({
  figure,
  className,
}: {
  figure: Extract<BadgeArt, { kind: "mark" }>["figure"];
  className?: string;
}) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <svg viewBox="0 0 100 100" className={className} role="presentation" aria-hidden>
      {figure === "shark" && (
        <g {...stroke}>
          {/* a fin, a body line and a wake — a pull request swimming through */}
          <path d="M18 62c14-2 26-9 34-24 3 9 6 17 12 22" />
          <path d="M64 60c8 0 14-2 18-6-2 8-8 13-17 14" />
          <path d="M14 74c12 4 24 5 36 3" />
          <path d="M52 38v18" strokeDasharray="3 4" />
        </g>
      )}
      {figure === "star" && (
        <g {...stroke}>
          <path d="M50 16l8.5 24.5L83 49l-24.5 8.5L50 82l-8.5-24.5L17 49l24.5-8.5z" />
          <path d="M76 24l2.5 6.5L85 33l-6.5 2.5L76 42l-2.5-6.5L67 33l6.5-2.5z" strokeWidth={1.6} />
        </g>
      )}
      {figure === "dev" && (
        <g {...stroke}>
          <circle cx="50" cy="50" r="32" />
          <path d="M42 39l-9 11 9 11" />
          <path d="M58 39l9 11-9 11" />
        </g>
      )}
      {figure === "seal" && (
        <g {...stroke}>
          {/* a scalloped medal, drawn as one path so it reads at 40px */}
          <path d="M50 14l8.8 6.4 10.9-1.2 4.9 9.8 9.8 4.9-1.2 10.9L90 53.6l-6.4 8.8 1.2 10.9-9.8 4.9-4.9 9.8-10.9-1.2L50 94l-8.8-6.4-10.9 1.2-4.9-9.8-9.8-4.9 1.2-10.9L10 53.6l6.4-8.8-1.2-10.9 9.8-4.9 4.9-9.8 10.9 1.2z" />
          <path d="M36 54l9 9 19-20" strokeWidth={3} />
        </g>
      )}
    </svg>
  );
}
