import LedgerRow from "./ledger-row";

type Stat = { value: number; label: string; note: string };

/**
 * The ledger. A short, quiet chapter between the cover and the work —
 * four numbers set as ruled lines rather than four cards in a row.
 */
export default function Ledger({ stats }: { stats: Stat[] }) {
  return (
    <section
      id="record"
      data-cam="0.8,-0.9,7.0|0.2,-1.1,-0.4"
      data-layer="THE RECORD"
      data-depth="0002 m"
      className="rule-t py-10 sm:py-14"
    >
      <div className="shell">
        <div className="grid gap-6 sm:grid-cols-12 sm:gap-8">
          <div className="sm:col-span-3">
            <p className="label">
              <span className="text-[var(--accent)]">01</span>
              <span className="mx-2 text-[var(--faint)]">/</span>
              The record
            </p>
            <p className="serif-italic mt-3 text-[1.15rem] leading-tight">
              Public, permanent,
              <br />
              checkable.
            </p>
          </div>
          <div className="sm:col-span-9">
            {stats.map((s, i) => (
              <LedgerRow key={s.label} value={s.value} label={s.label} note={s.note} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
