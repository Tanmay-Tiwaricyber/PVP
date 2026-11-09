import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Tanmay Tiwari — Silent Programmer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          padding: "56px 64px",
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

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontSize: 178, lineHeight: 0.82, letterSpacing: -7, display: "flex" }}>
            Tanmay
          </div>
          <div
            style={{
              fontSize: 178,
              lineHeight: 0.82,
              letterSpacing: -7,
              display: "flex",
              alignItems: "baseline",
              gap: 18,
            }}
          >
            <span>Tiwari</span>
            <span style={{
                fontSize: 32,
                letterSpacing: 0,
                color: "#c53c26",
                fontStyle: "italic",
                fontFamily: "Georgia, serif",
              }}>
              silent programmer
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(20,19,15,0.28)",
            paddingTop: 16,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 19, opacity: 0.75 }}>Full-stack engineer · Security builder</div>
            <div style={{ fontSize: 13, letterSpacing: 3, textTransform: "uppercase", opacity: 0.5 }}>
              175 repositories · TryHackMe Legend · Top 1%
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
    size,
  );
}
