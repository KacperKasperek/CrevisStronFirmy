import { ImageResponse } from "next/og";

export const alt = "Crevis — strony internetowe dla firm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#171713",
          color: "#f5f0e8",
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          padding: "76px 82px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-90px",
            top: "-130px",
            width: "520px",
            height: "520px",
            border: "110px solid #bd4a2b",
            transform: "rotate(18deg)",
            opacity: 0.95,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ width: "52px", height: "12px", background: "#bd4a2b" }} />
          <div style={{ fontSize: 28, letterSpacing: "8px", fontWeight: 700 }}>CREVIS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "880px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              lineHeight: 1.04,
              fontWeight: 900,
              letterSpacing: "-3px",
            }}
          >
            <span>Strony internetowe,</span>
            <span>które pracują na Twój biznes.</span>
          </div>
          <div style={{ marginTop: "30px", fontSize: 28, color: "#c9c3b9" }}>
            Projekt • wdrożenie • rozwój
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#bd4a2b", fontWeight: 700 }}>
          crevis.pl
        </div>
      </div>
    ),
    size,
  );
}
