"use client";

import Image from "next/image";
import type { ManifestShot } from "@/data/caseStudies/shots";

/* A capture shown the way a customer actually meets it: in Safari, on a
   handset, wearing the phone's own furniture.

   The geometry is an iPhone 16 Pro's, in points: a 393x852 screen, a 55pt
   screen corner radius, an 8pt bezel and a 125x36pt Dynamic Island sitting
   11pt below the top of the screen. Device width is 393+16 = 409, and every
   number in the stylesheet is one of those point values expressed as `cqw` off
   the frame's own width — so one component serves a 350px column shot and a
   157px cover shot with no second set of numbers, and the silhouette stays
   right at both.

   Two things had to be true and were not. The frame drew a flat 4px border at
   roughly half the real corner radius, which is what made it read as "not an
   iPhone", and it had no island at all. Neither is a detail: the island is the
   single feature that dates a handset, and a wrong radius is the thing people
   see without being able to name.

   Percentages cannot express any of this. `border-radius: 15%` resolves
   against both axes and turns a 2.1:1 phone into an ellipse, and a percentage
   height on the island resolves against whatever box it sits in rather than
   the device. Everything here is cqw for that reason.

   The chrome is drawn, not photographed. A mockup PSD would bake the screen
   into a raster, and these screens have to stay live — the marker that points
   at the element under discussion is positioned from the capture manifest, so
   it has to sit in the DOM on top of a real <Image>.

   The address bar is at the bottom because that is where iOS Safari has put it
   since iOS 15, and because it keeps the top of every capture clear. Both bars
   overlay the screen the way iOS draws them over a page, rather than stacking
   above and below it — stacking is what made the old frame a head taller than
   a real phone.

   9:41 is the time on the wall in every Apple keynote screenshot. Using
   anything else is the tell that the frame was invented. */

const SCREEN_W = 900;
const SCREEN_H = 1948; // 390 × 844 at 3×, the capture viewport

function StatusIcons() {
  return (
    <span className="cs-safari__icons" aria-hidden="true">
      {/* cellular */}
      <svg viewBox="0 0 18 12" fill="currentColor">
        <rect x="0" y="8" width="3" height="4" rx="1" />
        <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
        <rect x="10" y="3" width="3" height="9" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
      </svg>
      {/* wifi */}
      <svg viewBox="0 0 16 12" fill="currentColor">
        <path d="M8 11.2 5.9 8.8a3.2 3.2 0 0 1 4.2 0L8 11.2Z" />
        <path d="M8 6.3c-1.5 0-2.9.55-4 1.5l-1.4-1.6A8.1 8.1 0 0 1 8 4.2c2.06 0 3.95.75 5.4 2l-1.4 1.6A6.06 6.06 0 0 0 8 6.3Z" />
        <path d="M8 2.1c-2.6 0-5 .95-6.85 2.55L-.25 3.05A12.3 12.3 0 0 1 8 0c3.2 0 6.12 1.16 8.25 3.05L14.85 4.65A10.25 10.25 0 0 0 8 2.1Z" />
      </svg>
      {/* battery — drawn full, because a phone on a shelf is on a charger */}
      <svg viewBox="0 0 27 12" fill="none">
        <rect
          x="0.5"
          y="0.5"
          width="22"
          height="11"
          rx="3.2"
          stroke="currentColor"
          opacity="0.38"
        />
        <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" />
        <path
          d="M24.5 4.2a2.6 2.6 0 0 1 0 3.6V4.2Z"
          fill="currentColor"
          opacity="0.45"
        />
      </svg>
    </span>
  );
}

/* The marker. The box comes from the manifest, measured on the live page, so
   the outline lands on the element the sentence names even after the client
   edits the copy above it.

   Nothing is drawn over the capture but the outline. The label used to float
   in the gap directly above the box, which on a phone layout is where the
   section and date headings live — it erased "DASHBOARD", "TODAY · THURSDAY"
   and a band's name on five different shots. It is a caption under the frame
   now; see `.cs-shot__note`. */
function Marker({ shot }: { shot: ManifestShot }) {
  const box = shot.box;
  if (!box) return null;
  return (
    <span
      className="cs-mark"
      style={{
        left: `${box.x}%`,
        top: `${box.y}%`,
        width: `${box.w}%`,
        height: `${box.h}%`,
      }}
      aria-hidden="true"
    />
  );
}

export default function SafariPhone({
  shot,
  sizes,
  priority = false,
  className = "",
  chrome = true,
}: {
  shot: ManifestShot;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** The cover wall used to drop the chrome. It no longer does — those phones
   *  measure 157-312px, not the 90px the old comment assumed, so they were the
   *  first handsets a reader saw and the only ones not in Safari. Kept as a
   *  prop because a frame with no chrome is still the right call under ~110px. */
  chrome?: boolean;
}) {
  return (
    <div className={`cs-safari ${className}`}>
      {/* Two elements, not one. `container-type` goes on the outer box and
          every cqw is spent on the inner one, because an element cannot query
          its own container — collapsed into a single div, all of this
          resolved against the viewport instead: a 28px bezel and a 59px
          clock in a 36px status bar. */}
      <div className="cs-safari__body">
        <div className="cs-safari__screen">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={SCREEN_W}
            height={SCREEN_H}
            sizes={sizes}
            priority={priority}
            className="cs-safari__img"
          />
          <Marker shot={shot} />

          {chrome && (
            <>
              <div
                className={`cs-safari__status${shot.tintTop === "dark" ? " is-dark" : ""}`}
                aria-hidden="true"
              >
                <span className="cs-safari__time">9:41</span>
                <StatusIcons />
              </div>

              {/* The Dynamic Island. A black pill with the camera set slightly
                right of its centre, which is where it actually sits. */}
              <div className="cs-safari__island" aria-hidden="true" />

              <div
                className={`cs-safari__bar${shot.tintBottom === "dark" ? " is-dark" : ""}`}
              >
                <span className="cs-safari__aa" aria-hidden="true">
                  <svg viewBox="0 0 20 12" fill="currentColor">
                    <path d="M4.4 2.6 1.4 10h1.5l.66-1.75h3l.66 1.75h1.5l-3-7.4H4.4Zm-.36 4.4.95-2.55.95 2.55h-1.9Z" />
                    <path d="M13.9 0 10 10h1.9l.9-2.4h4.2l.9 2.4H19.8L15.9 0h-2Zm-.55 6.2 1.55-4.2 1.55 4.2h-3.1Z" />
                  </svg>
                </span>
                <span className="cs-safari__url">
                  <svg
                    viewBox="0 0 10 13"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5 0a3 3 0 0 0-3 3v2h1.5V3a1.5 1.5 0 0 1 3 0v2H8V3a3 3 0 0 0-3-3Z" />
                    <rect x="0.6" y="5" width="8.8" height="8" rx="2.2" />
                  </svg>
                  <span className="cs-safari__urltext">{shot.url}</span>
                </span>
                <span className="cs-safari__reload" aria-hidden="true">
                  <svg
                    viewBox="0 0 13 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M11.4 6.5a4.9 4.9 0 1 1-1.5-3.5" />
                    <path d="M11.6 0.6v3h-3" />
                  </svg>
                </span>
              </div>

              <div
                className={`cs-safari__home${shot.tintBottom === "dark" ? " is-dark" : ""}`}
                aria-hidden="true"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
