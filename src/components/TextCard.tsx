'use client';

import { ReactNode, CSSProperties, createElement } from 'react';

type Padding = 'sm' | 'md' | 'lg';

interface TextCardProps {
  children: ReactNode;
  padding?: Padding;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'article';
  /** Kept for API compatibility — cards are static now. */
  noTilt?: boolean;
}

const PADDING_MAP: Record<Padding, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-5 py-4 md:px-6 md:py-5',
  lg: 'px-6 py-6 md:px-10 md:py-8',
};

// Static paper panel — keeps text legible over the brick wall.
export default function TextCard({
  children,
  padding = 'md',
  className = '',
  style,
  as = 'div',
}: TextCardProps) {
  return createElement(
    as,
    {
      'data-textcard': true,
      className: `relative overflow-hidden ${PADDING_MAP[padding]} ${className}`,
      style: {
        backgroundColor: 'var(--paper)',
        borderRadius: 0,
        color: 'var(--ink)',
        border: '1px solid rgba(var(--hairline),0.08)',
        boxShadow: '0 1px 2px rgba(var(--hairline),0.04), 0 10px 30px rgba(var(--hairline),0.06)',
        ...style,
      },
    },
    <>
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(var(--hairline),0.06), transparent)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </>
  );
}
