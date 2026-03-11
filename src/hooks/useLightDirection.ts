'use client';

import { useRef, useEffect } from 'react';

export interface LightPosition {
  x: number;
  y: number;
}

/**
 * Replicates the MouseLight.tsx math in DOM space via requestAnimationFrame.
 * Returns a ref (no re-renders) so consumers can read position per-frame.
 *
 * Math mirrors src/components/three/MouseLight.tsx exactly:
 *   target = (mouseNorm - 0.5) * 6
 *   drift  = sin(t * 0.3) * 1.5 (x), cos(t * 0.2) * 1.0 (y)
 *   lerp   = current += (target + drift - current) * 0.012
 */
export function useLightDirection(): React.RefObject<LightPosition> {
  const lightRef = useRef<LightPosition>({ x: 0, y: 0 });
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0, y: 0 });
  const startTime = useRef(0);
  const rafId = useRef(0);
  const hasPointer = useRef(false);

  useEffect(() => {
    startTime.current = performance.now() / 1000;

    // Detect fine pointer (mouse) vs touch
    const mql = window.matchMedia('(pointer: fine)');
    hasPointer.current = mql.matches;

    function handleChange(e: MediaQueryListEvent) {
      hasPointer.current = e.matches;
    }
    mql.addEventListener('change', handleChange);

    function handleMove(e: PointerEvent) {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    }
    window.addEventListener('pointermove', handleMove);

    function tick() {
      const t = performance.now() / 1000 - startTime.current;

      // Same target calc as MouseLight — on touch, mouse stays at center (0.5)
      const mx = hasPointer.current ? mouse.current.x : 0.5;
      const my = hasPointer.current ? mouse.current.y : 0.5;

      const targetX = (mx - 0.5) * 6;
      const targetY = -(my - 0.5) * 6;

      // Same organic drift
      const driftX = Math.sin(t * 0.3) * 1.5;
      const driftY = Math.cos(t * 0.2) * 1.0;

      // Same lazy lerp factor
      current.current.x += (targetX + driftX - current.current.x) * 0.012;
      current.current.y += (targetY + driftY - current.current.y) * 0.012;

      lightRef.current.x = current.current.x;
      lightRef.current.y = current.current.y;

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('pointermove', handleMove);
      mql.removeEventListener('change', handleChange);
    };
  }, []);

  return lightRef as React.RefObject<LightPosition>;
}

/**
 * Maps raw light coordinates [-4.5, 4.5] to CSS percentage [0, 100].
 * Range comes from: (0.5) * 6 = 3, plus drift 1.5 = 4.5 max.
 */
export function lightToPercent(value: number): number {
  return ((value + 4.5) / 9) * 100;
}
