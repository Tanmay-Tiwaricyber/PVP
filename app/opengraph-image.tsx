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
          background: "linear-gradient(125deg, #08080c 0%, #0a0910 48%, #1d0d07 100%)",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: "linear-gradient(160deg, rgba(255,77,31,0.55), rgba(255,77,31,0))",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "1px solid rgba(242,239,230,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#f2efe6",
                fontSize: 18,
                letterSpacing: -1,
              }}
            >
              TT
            </div>
            <div
              style={{
                color: "rgba(242,239,230,0.6)",
                fontSize: 18,
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              Silent Programmer
            </div>
          </div>
          <div style={{ color: "rgba(242,239,230,0.4)", fontSize: 16, letterSpacing: 4 }}>
            KANPUR · IN · 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              color: "#f2efe6",
              fontSize: 158,
              lineHeight: 0.86,
              letterSpacing: -8,
              fontWeight: 700,
              display: "flex",
            }}
          >
            TANMAY
          </div>
          <div
            style={{
              color: "#f2efe6",
              fontSize: 158,
              lineHeight: 0.86,
              letterSpacing: -8,
              fontWeight: 700,
              display: "flex",
            }}
          >
            TIWARI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(242,239,230,0.16)",
            paddingTop: 24,
          }}
        >
          <div style={{ color: "rgba(242,239,230,0.55)", fontSize: 25, display: "flex" }}>
            Full-stack engineer · Cybersecurity builder
          </div>
          <div style={{ display: "flex", gap: 28, fontSize: 20, color: "#d9f24b" }}>
            <span>175 repos</span>
            <span>435 stars</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
