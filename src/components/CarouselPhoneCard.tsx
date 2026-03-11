'use client';

import { useRef, useEffect } from 'react';
import { type LightPosition, lightToPercent } from '@/hooks/useLightDirection';

interface CarouselPhoneCardProps {
  videoSrc: string;
  alt: string;
  lightRef: React.RefObject<LightPosition>;
}

const PHONE_W = 120;
const PHONE_H = 240;
const CARD_W = PHONE_W + 40;
const CARD_H = PHONE_H + 48;
const BEZEL_RADIUS = 22;
const SCREEN_INSET = 3;
const SCREEN_RADIUS = BEZEL_RADIUS - SCREEN_INSET;

export default function CarouselPhoneCard({
  videoSrc,
  alt,
  lightRef,
}: CarouselPhoneCardProps) {
  const glossRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  useEffect(() => {
    function tick() {
      if (lightRef.current) {
        const x = lightToPercent(lightRef.current.x);
        const y = lightToPercent(-lightRef.current.y);

        // Card-level gloss — bright chrome hotspot
        if (glossRef.current) {
          glossRef.current.style.background = [
            `radial-gradient(ellipse at ${x}% ${y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 30%, transparent 60%)`,
            `radial-gradient(ellipse at ${100 - x}% ${100 - y}%, rgba(255,255,255,0.04) 0%, transparent 50%)`,
          ].join(', ');
        }

        // Bezel chrome band — shifts with light
        if (chromeRef.current) {
          chromeRef.current.style.background =
            `linear-gradient(${135 + (x - 50) * 0.4}deg, #4a4a4a, #2a2a2a ${30 + (y - 50) * 0.2}%, #0a0a0a 50%, #1a1a1a ${70 + (x - 50) * 0.15}%, #3a3a3a)`;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    }
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [lightRef]);

  return (
    <div
      className="relative shrink-0 flex items-center justify-center"
      style={{
        width: CARD_W,
        height: CARD_H,
        backgroundColor: '#050505',
        borderRadius: 0,
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Light-tracked chrome gloss — dual hotspot */}
      <div
        ref={glossRef}
        className="pointer-events-none absolute inset-0 z-20"
      />

      {/* Top edge chrome shine */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px z-20"
        style={{
          background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.25) 50%, transparent 90%)',
        }}
      />

      {/* Bottom edge subtle reflection */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px z-20"
        style={{
          background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.06) 50%, transparent 80%)',
        }}
      />

      {/* Phone device */}
      <div
        className="relative"
        style={{ width: PHONE_W, height: PHONE_H }}
      >
        {/* Phone bezel — chrome gradient animated by light */}
        <div
          ref={chromeRef}
          className="absolute inset-0"
          style={{
            borderRadius: BEZEL_RADIUS,
            background: 'linear-gradient(145deg, #4a4a4a, #2a2a2a, #0a0a0a, #1a1a1a, #3a3a3a)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.30),
              inset 0 -1px 0 rgba(255,255,255,0.05),
              0 0 0 0.5px rgba(255,255,255,0.10),
              0 1px 2px rgba(255,255,255,0.06),
              0 12px 30px rgba(0,0,0,0.5)
            `,
          }}
        />

        {/* Chrome edge highlights — left and right rails */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: 20,
            bottom: 20,
            left: -0.5,
            width: 1,
            background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 70%, transparent)',
            borderRadius: 1,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            top: 20,
            bottom: 20,
            right: -0.5,
            width: 1,
            background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.12) 70%, transparent)',
            borderRadius: 1,
          }}
        />

        {/* Side buttons — chrome */}
        <div
          className="absolute rounded-sm"
          style={{
            right: -1.5, top: '25%', width: 1.5, height: 20,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.10))',
          }}
        />
        <div
          className="absolute rounded-sm"
          style={{
            left: -1.5, top: '20%', width: 1.5, height: 14,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0.06))',
          }}
        />
        <div
          className="absolute rounded-sm"
          style={{
            left: -1.5, top: '32%', width: 1.5, height: 24,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,255,255,0.06))',
          }}
        />

        {/* Screen area */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: SCREEN_INSET,
            left: SCREEN_INSET,
            right: SCREEN_INSET,
            bottom: SCREEN_INSET,
            borderRadius: SCREEN_RADIUS,
            background: '#000',
          }}
        >
          {/* Screen content — video or image */}
          {videoSrc.endsWith('.mp4') ? (
            <video
              src={videoSrc}
              className="w-full h-full object-cover object-top"
              autoPlay
              loop
              muted
              playsInline
              aria-label={alt}
            />
          ) : (
            <img
              src={videoSrc}
              alt={alt}
              className="w-full h-full object-cover object-top"
            />
          )}

          {/* Dynamic Island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              top: 6,
              width: 48,
              height: 14,
              borderRadius: 7,
              background: '#000',
              boxShadow: '0 1px 3px rgba(0,0,0,0.6)',
              zIndex: 10,
            }}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2"
              style={{
                right: 10,
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #2a2a4e, #0a0a15)',
                boxShadow: 'inset 0 0.5px 1px rgba(255,255,255,0.15)',
              }}
            />
          </div>

          {/* Top glass sheen — stronger for chrome look */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: '30%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
              zIndex: 11,
            }}
          />

          {/* Home indicator bar */}
          <div
            className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: PHONE_W * 0.35,
              height: 3,
              borderRadius: 1.5,
              background: 'rgba(255,255,255,0.25)',
              zIndex: 11,
            }}
          />

          {/* Inner screen edge glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: SCREEN_RADIUS,
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
              zIndex: 12,
            }}
          />
        </div>

        {/* Top bezel highlight — brighter chrome */}
        <div
          className="absolute top-0 left-[15%] right-[15%] h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.40), transparent)' }}
        />

        {/* Bottom bezel subtle reflection */}
        <div
          className="absolute bottom-0 left-[20%] right-[20%] h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)' }}
        />
      </div>
    </div>
  );
}
