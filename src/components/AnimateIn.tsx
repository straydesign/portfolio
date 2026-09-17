'use client';

import { useRef, type ReactNode } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';

/* Reveals are driven by useInView, not the whileInView prop.
   Lenis moves the page with a transform rather than native scroll, and the
   prop form reads that as "never entered" on some blocks — the element sits
   at its initial transform forever. The hook watches the intersection
   directly, so it fires the same on a Lenis page as on a plain one.

   Reduced motion is handled by starting at the visible state, NOT by
   returning a different element. Swapping <m.div> for <div> when the
   preference hook resolves unmounts the node the observer is watching, and
   the replacement never gets observed — which shipped a Work grid that
   painted at opacity 0 for anyone with reduce turned on. One element, always. */

type Direction = 'up' | 'down' | 'left' | 'right';

interface AnimateInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Distance in pixels to offset from */
  distance?: number;
  /** Play animation only once (default true) */
  once?: boolean;
  id?: string;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

const SHOWN = { opacity: 1, x: 0, y: 0 };

// Trigger a little before the block lands, so the move reads as arrival
// rather than as a correction to something already on screen.
const MARGIN = '0px 0px -50px 0px';

export default function AnimateIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className,
  style,
  distance = 24,
  once = true,
  id,
}: AnimateInProps) {
  const still = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: MARGIN });

  const offset = offsets[direction];
  const hidden = still
    ? SHOWN
    : { opacity: 0, x: offset.x * distance, y: offset.y * distance };

  return (
    <m.div
      ref={ref}
      className={className}
      style={style}
      id={id}
      data-reveal=""
      initial={hidden}
      animate={inView || still ? SHOWN : hidden}
      transition={still ? { duration: 0 } : { duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </m.div>
  );
}

/** Stagger container + item for lists/grids */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}) {
  const still = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: MARGIN });

  return (
    <m.div
      ref={ref}
      className={className}
      initial={still ? 'visible' : 'hidden'}
      animate={inView || still ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: still ? 0 : staggerDelay } },
      }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
  distance = 24,
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
}) {
  const still = useReducedMotion();
  const offset = offsets[direction];

  return (
    <m.div
      className={className}
      data-reveal=""
      variants={{
        hidden: still ? SHOWN : { opacity: 0, x: offset.x * distance, y: offset.y * distance },
        visible: { ...SHOWN, transition: { duration: still ? 0 : duration, ease: [0.25, 0.1, 0.25, 1] } },
      }}
    >
      {children}
    </m.div>
  );
}
