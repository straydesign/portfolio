'use client';

import { useRef, ReactNode, CSSProperties } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Padding = 'sm' | 'md' | 'lg';

interface TextCardProps {
  children: ReactNode;
  padding?: Padding;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'article';
  noTilt?: boolean;
}

const PADDING_MAP: Record<Padding, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-5 py-4 md:px-6 md:py-5',
  lg: 'px-6 py-6 md:px-10 md:py-8',
};

export default function TextCard({
  children,
  padding = 'md',
  className = '',
  style,
  as = 'div',
  noTilt = false,
}: TextCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), {
    stiffness: 300,
    damping: 30,
  });

  // Gloss highlight follows cursor
  const glossX = useTransform(mouseX, [0, 1], [0, 100]);
  const glossY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (noTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const MotionTag = m[as] as typeof m.div;

  return (
    <MotionTag
      ref={ref}
      data-textcard
      className={`relative overflow-hidden ${PADDING_MAP[padding]} ${className}`}
      style={{
        backgroundColor: 'var(--paper)',
        borderRadius: 0,
        color: 'var(--ink)',
        border: '1px solid rgba(var(--hairline),0.08)',
        boxShadow: '0 1px 2px rgba(var(--hairline),0.04), 0 10px 30px rgba(var(--hairline),0.06)',
        perspective: '800px',
        ...(!noTilt ? { rotateX, rotateY } : {}),
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glossy highlight overlay */}
      {!noTilt && (
        <m.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: useTransform(
              [glossX, glossY],
              ([x, y]) =>
                `radial-gradient(ellipse at ${x}% ${y}%, rgba(var(--hairline),0.04) 0%, rgba(var(--hairline),0.01) 40%, transparent 70%)`
            ),
          }}
        />
      )}
      {/* Subtle top edge shine */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(var(--hairline),0.06), transparent)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </MotionTag>
  );
}
