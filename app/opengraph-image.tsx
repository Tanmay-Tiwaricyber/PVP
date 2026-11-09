import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The share card is set in the volume's own type, so it loads the same files the
 * page does instead of falling back to the renderer's default sans.
 */
async function loadFont(file: string) {
  return readFile(join(process.cwd(), "node_modules", "@fontsource", file));
}

export const dynamic = "force-static";

export const alt = "Tanmay Tiwari — Silent Programmer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [serif, serifItalic] = await Promise.all([
    loadFont("instrument-serif/files/instrument-serif-latin-400-normal.woff"),
    loadFont("instrument-serif/files/instrument-serif-latin-400-italic.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2efe7",
          padding: "46px 64px",
          color: "#14130f",
        }}
      >
        {/* masthead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            borderBottom: "1px solid rgba(20,19,15,0.28)",
            paddingBottom: 14,
          }}
        >
          <div style={{ fontSize: 15, letterSpacing: 4, textTransform: "uppercase", opacity: 0.7 }}>
            Portfolio · Vol. 01
          </div>
          <div style={{ fontSize: 15, letterSpacing: 4, textTransform: "uppercase", opacity: 0.7 }}>
            Kanpur, IN · 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 12 }}>
          <div
            style={{
              fontSize: 168,
              lineHeight: 0.82,
              letterSpacing: -1,
              display: "flex",
              fontFamily: "Instrument Serif",
            }}
          >
            Tanmay
          </div>
          <div
            style={{
              fontSize: 168,
              lineHeight: 0.82,
              letterSpacing: -1,
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              fontFamily: "Instrument Serif",
            }}
          >
            <span>Tiwari</span>
            <span style={{
                fontSize: 32,
                letterSpacing: 0,
                color: "#c53c26",
                fontStyle: "italic",
                fontFamily: "Instrument Serif",
              }}>
              silent programmer
            </span>
          </div>
        </div>

        {/* the pins, at share-card scale: the same eleven, abbreviated to five */}
        <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
          {[
            ["Top 1%", "TryHackMe"],
            ["Legend", "league"],
            ["Pull Shark", "GitHub ×2"],
            ["Starstruck", "GitHub ×2"],
            ["DEADFACE", "CTF 2024"],
          ].map(([v, k], i) => (
            <div
              key={v}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                width: 128,
                height: 96,
                border: "1px solid rgba(20,19,15,0.3)",
                background: "#f7f4ee",
                transform: `rotate(${[-3.4, 1.8, -1.2, 2.6, -2.1][i]}deg)`,
              }}
            >
              <div style={{ fontSize: 22, letterSpacing: -0.4 }}>{v}</div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  opacity: 0.55,
                }}
              >
                {k}
              </div>
            </div>
          ))}
        </div>

        {/* ruled by hand, drawn rather than bordered */}
        <svg width="1072" height="14" viewBox="0 0 1072 14" style={{ display: "flex" }}>
          <path
            d="M-6 7c96-2 200-3 316-2 126 1 220 2.4 336 1.4 116-1 230-2.4 432-1.4"
            fill="none"
            stroke="rgba(20,19,15,0.34)"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M14 10.5c160 1.2 300 1.6 470 .6 130-.7 250-1.6 380-1"
            fill="none"
            stroke="rgba(20,19,15,0.16)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 16,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 19, opacity: 0.75 }}>Full-stack engineer · Security builder</div>
            <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", opacity: 0.5 }}>
              175 repositories · 11 pins earned · Top 1% on TryHackMe
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["#14130f", "#c53c26", "#a8821c", "#4f6350"].map((c) => (
              <div key={c} style={{ width: 26, height: 26, background: c, display: "flex" }} />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
        { name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" },
      ],
    },
  );
}
