import { ImageResponse } from "next/og";

// Obraz podglądu linku (LinkedIn / Twitter / Discord) generowany w buildzie
export const alt = "Mikołaj Sitek — Web & Mobile Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#030712",
          padding: 80,
          fontFamily: "sans-serif",
          color: "#f8fafc",
          border: "2px solid #1e293b",
        }}
      >
        {/* Górny pasek statusu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            letterSpacing: 4,
            color: "#94a3b8",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              background: "#10b981",
            }}
          />
          <div style={{ display: "flex" }}>MARKET STATUS:</div>
          <div style={{ display: "flex", color: "#10b981", fontWeight: 700 }}>
            OPEN
          </div>
        </div>

        {/* Środek — nazwa i rola */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800 }}>
            Mikołaj Sitek
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 50,
              fontWeight: 600,
              color: "#10b981",
            }}
          >
            Web &amp; Mobile Developer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#94a3b8",
              marginTop: 18,
              maxWidth: 900,
            }}
          >
            React Native · dane · integracje AI — od pomysłu po publikację.
          </div>
        </div>

        {/* Dolny pasek — ticker */}
        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 26,
            color: "#10b981",
            letterSpacing: 2,
          }}
        >
          <div style={{ display: "flex" }}>▲ $REACT_NATIVE</div>
          <div style={{ display: "flex" }}>▲ $TYPESCRIPT</div>
          <div style={{ display: "flex" }}>▲ $NEXTJS</div>
          <div style={{ display: "flex" }}>▲ $AI</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
