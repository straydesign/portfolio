'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { m, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

/**
 * A physical metal bead-chain pull, anchored top-right — like the cord you
 * yank on a ceiling-fan light. Drag the triangle end-piece down (or click /
 * press Enter) to toggle between the light and dark theme. It dangles, sways,
 * and snaps back with a spring when released.
 */

const BEAD_COUNT = 9;
const MAX_PULL = 70;      // px the cord can extend
const THRESHOLD = 36;     // px past which the "click" fires the toggle

export function BeadChainPull() {
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();

  // The persisted theme is only known on the client (read from localStorage
  // before paint), so the directional label would mismatch the SSR markup.
  // Render a neutral label until mounted, then swap to the directional one.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const label = !mounted
    ? 'Toggle light and dark theme'
    : theme === 'dark'
      ? 'Switch to light theme'
      : 'Switch to dark theme';

  const pull = useMotionValue(0);
  // Extending cord segment that pays out from the ceiling housing as you pull.
  const cordHeight = useTransform(pull, (p) => 12 + p);

  const dragging = useRef(false);
  const startY = useRef(0);
  const fired = useRef(false);

  const endDrag = useCallback(() => {
    dragging.current = false;
    // Snappy spring retract — reads as a real chain yanking back up.
    animate(pull, 0, { type: 'spring', stiffness: 680, damping: 16, mass: 0.7 });
  }, [pull]);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      dragging.current = true;
      fired.current = false;
      startY.current = e.clientY - pull.get();
      e.currentTarget.setPointerCapture?.(e.pointerId);
    },
    [pull]
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>) => {
      if (!dragging.current) return;
      const next = Math.max(0, Math.min(MAX_PULL, e.clientY - startY.current));
      pull.set(next);
      // Fire on the way down the moment it crosses the click point — the
      // light flips while the chain is still taut, like the real thing.
      if (next >= THRESHOLD && !fired.current) {
        fired.current = true;
        toggleTheme();
      }
    },
    [pull, toggleTheme]
  );

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>) => {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
      // A tap (released without a real pull) counts as a click — toggle it.
      // A deliberate partial-pull that fell short of the click point does not,
      // which gives the satisfying "didn't quite catch" feel of a real cord.
      if (!fired.current && pull.get() < 6) {
        fired.current = true;
        toggleTheme();
      }
      endDrag();
    },
    [endDrag, pull, toggleTheme]
  );

  // Keyboard / plain-click: animate a quick yank, then toggle.
  const yank = useCallback(() => {
    toggleTheme();
    if (reduced) return;
    animate(pull, [0, MAX_PULL * 0.85, 0], { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] });
  }, [pull, toggleTheme, reduced]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        yank();
      }
    },
    [yank]
  );

  // Metallic surfaces — deep shadow tones so the steel reads on a white wall,
  // bright highlights so it still reads on a black one. A theme-aware
  // drop-shadow on the pivot (below) does the rest.
  const beadBg =
    'radial-gradient(circle at 34% 28%, #ffffff 0%, #c4c5c9 20%, #6a6c70 50%, #28292d 100%)';
  const cordBg = 'linear-gradient(90deg, #34363a 0%, #cfd0d3 42%, #ffffff 50%, #a7a9ad 60%, #34363a 100%)';

  return (
    <div
      className="fixed top-0 z-[60] pointer-events-none select-none"
      style={{ right: 'clamp(20px, 6vw, 96px)' }}
      aria-hidden={false}
    >
      {/* Pivot — gentle pendulum sway about the ceiling anchor. The
          theme-aware drop-shadow casts dark on the white wall / a soft halo
          on the black wall, so the fixed steel reads in either theme. */}
      <div
        className={reduced ? '' : 'bead-chain-sway'}
        style={{
          transformOrigin: 'top center',
          filter: 'drop-shadow(0 1px 1.5px rgba(var(--hairline),0.55)) drop-shadow(0 0 4px rgba(var(--hairline),0.42))',
        }}
      >
        <div className="flex flex-col items-center">
          {/* Ceiling housing nub */}
          <div
            style={{
              width: 22,
              height: 7,
              borderRadius: '0 0 4px 4px',
              background: 'linear-gradient(180deg, #b9bbbe, #7d7f82)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.35)',
            }}
          />

          {/* Extending cord (pays out as you pull) */}
          <m.div style={{ width: 3, height: cordHeight, background: cordBg }} />

          {/* The bead run */}
          <m.div className="flex flex-col items-center" style={{ marginTop: -1 }}>
            {Array.from({ length: BEAD_COUNT }).map((_, i) => (
              <span
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  marginTop: i === 0 ? 0 : -1.5,
                  borderRadius: '50%',
                  background: beadBg,
                  boxShadow: '0 0.5px 1px rgba(0,0,0,0.4), inset 0 -1px 1px rgba(0,0,0,0.25)',
                }}
              />
            ))}

            {/* Triangle end-piece — the grab handle */}
            <button
              type="button"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onKeyDown={onKeyDown}
              aria-label={label}
              title={label}
              className="pointer-events-auto cursor-grab active:cursor-grabbing touch-none mt-[1px] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-[2px]"
              style={{ background: 'transparent', border: 'none', padding: 6, lineHeight: 0 }}
            >
              {/* connector bead */}
              <span
                style={{
                  display: 'block',
                  width: 8,
                  height: 8,
                  margin: '0 auto -2px',
                  borderRadius: '50%',
                  background: beadBg,
                  boxShadow: '0 0.5px 1px rgba(0,0,0,0.4)',
                }}
              />
              {/* metal triangle */}
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 26,
                  clipPath: 'polygon(50% 0, 0 100%, 100% 100%)',
                  background:
                    'linear-gradient(135deg, #fbfbfc 0%, #cfd0d2 30%, #9a9c9f 60%, #6b6d70 100%)',
                  filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.35))',
                }}
              />
            </button>
          </m.div>
        </div>
      </div>
    </div>
  );
}
