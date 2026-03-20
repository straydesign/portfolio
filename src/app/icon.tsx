import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          borderRadius: "6px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "2px",
            borderRadius: "4px",
            border: "2px solid #6366f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.5px",
          }}
        >
          SD
        </div>
      </div>
    ),
    { ...size }
  );
}
