import { ImageResponse } from "next/og";

export const alt = "Tom Sesler — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const bungeeFont = await fetch(
    "https://fonts.gstatic.com/s/bungee/v17/N0bU2SZBIuF2PU_0DXR1C9zfmQ.woff2"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0A0A",
          position: "relative",
          fontFamily: "Bungee, sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#6366f1",
            display: "flex",
          }}
        />
        {/* SD monogram */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "72px",
            height: "72px",
            borderRadius: "12px",
            border: "3px solid #6366f1",
            background: "#0A0A0A",
            fontSize: "28px",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-1px",
            marginBottom: "40px",
          }}
        >
          SD
        </div>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 400,
            color: "#FFFFFF",
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          TOM SESLER
        </div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.4)",
            marginTop: "16px",
            display: "flex",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Product Designer
        </div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: 400,
            color: "#6366f1",
            marginTop: "12px",
            display: "flex",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          straydesign.co
        </div>
        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#6366f1",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Bungee",
          data: bungeeFont,
          weight: 400,
        },
      ],
    }
  );
}
