/**
 * The monolith as CSS. Shown for the first frames — and permanently, for anyone
 * whose machine opts out. It is the same object, minus the refraction.
 */
export default function StaticMonolith() {
  return (
    <div className="relative flex h-[100svh] items-center justify-end px-[var(--gutter)]">
      <div className="static-monolith flex flex-col items-center justify-between py-10">
        <span className="hud text-[0.5rem]">Vol. 01</span>
        <div className="text-center">
          <p className="serif text-[clamp(2rem,4.4vw,3.2rem)] leading-[0.95] text-[var(--ink)]">
            Tanmay
            <br />
            Tiwari
          </p>
          <p className="serif-italic mt-2 text-[clamp(0.8rem,1.5vw,1.05rem)] text-[var(--accent)]">
            silent programmer
          </p>
        </div>
        <span className="hud text-[0.5rem]">Silent Programmer</span>
      </div>
    </div>
  );
}
