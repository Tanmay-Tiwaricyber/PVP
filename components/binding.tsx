/**
 * The volume is bound. Punched holes down the left gutter with a coil between
 * them, drawn rather than imaged, and fixed so the page reads as a document
 * you could turn.
 */
export default function Binding() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-[2.9rem] overflow-hidden border-r border-[var(--rule)] xl:block"
    >
      {/* the punch strip */}
      <div className="absolute inset-y-0 left-0 w-full bg-[var(--paper-2)]/40" />

      {/* holes + coil, repeated down the page */}
      <div className="absolute inset-0 flex flex-col justify-between py-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 50 46"
            className="h-[46px] w-full text-[var(--rule-strong)]"
            style={i % 2 ? { transform: "rotate(180deg)" } : undefined}
          >
            {/* punched hole */}
            <ellipse
              cx="9"
              cy="23"
              rx="4.4"
              ry="5.2"
              fill="var(--paper)"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            {/* the coil, two passes so it reads as wire */}
            <path
              d="M9 18.4c9-2.4 21-3.6 32-2.2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M9 27.6c10 2.6 22 3.8 32 2.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>
        ))}
      </div>
    </div>
  );
}
