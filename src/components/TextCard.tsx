'use client';

import { useRef, ReactNode, CSSProperties } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      data-textcard
      className={`relative overflow-hidden ${PADDING_MAP[padding]} ${className}`}
      style={{
        backgroundColor: '#000000',
        borderRadius: 0,
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        perspective: '800px',
        ...(!noTilt ? { rotateX, rotateY } : {}),
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glossy highlight overlay */}
      {!noTilt && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: useTransform(
              [glossX, glossY],
              ([x, y]) =>
                `radial-gradient(ellipse at ${x}% ${y}%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)`
            ),
          }}
        />
      )}
      {/* Subtle top edge shine */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </MotionTag>
  );
}
