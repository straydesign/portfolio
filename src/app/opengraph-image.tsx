import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Tom Sesler — Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CAT_PATH =
  "M44.55,16.01c11.2.06,14.63-.06,14.71.56.09.69-4.07,1.92-5.77,2.35-3.2.82-10.52,3.59-10.36,4.71.32,2.22,13.02,2.15,16.25,2.12,31.67-.29,68.53-4.11,68.63-3.46.04.26-8.81,2.67-21.54,4.4-11.67,1.58-21.2,1.86-22.25,5.84-.34,1.28.04,3.04,1.02,6.63.58,2.15,1.68,5.29,2.97,9.62.08.28.38,1.31.46,2.69.08,1.55-.09,3.93-.76,4.06-.65.13-1.56-1.94-2.28-3.55-3.46-7.73-5.24-11.55-6.48-12.82-2.66-2.72-6.51-2.83-14.2-3.06-.52-.02-4.87-.08-10.26,1.34-4.4,1.16-5.32,2.21-5.72,3.04-.83,1.74-.22,4.09.44,6.61.4,1.52.86,3.03,1.12,4.58.06.37.32,1.05.28,1.95,0,.1-.12,2.25-.83,2.41-.91.22-2.89-3.89-6.78-12.12-.14-.29-1.63-3.45-4.06-7.18-1.1-1.69-2.7-3.94-5.32-4.72-2.14-.64-2.95.06-6.81.44-2.2.21-7.06.69-9.54-2.12-1.84-2.09-1.49-5-1.41-5.53.47-3.35,3.14-5.3,4.16-6.05,1.35-.99,3.93-2.47,15.61-2.78,2.17-.06,2.25-.01,8.71.03h0Z";

export default async function OgImage() {
  // Bundled locally — never fetch fonts from gstatic at request time.
  const bungeeFont = await readFile(
    join(process.cwd(), "src/app/fonts/Bungee-Regular.ttf")
  );

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
        {/* The stray cat mark */}
        <svg
          width="152"
          height="67"
          viewBox="24 12 114 50"
          fill="none"
          style={{ marginBottom: "40px" }}
        >
          <path d={CAT_PATH} stroke="#FFFFFF" strokeWidth="3.4" />
        </svg>
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
            fontSize: "26px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.55)",
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
            color: "rgba(255,255,255,0.85)",
            marginTop: "12px",
            display: "flex",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          straydesign.co
        </div>
        {/* Bottom hairline */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "#FFFFFF",
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
