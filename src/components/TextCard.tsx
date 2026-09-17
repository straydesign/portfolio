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

// Text block. The page ground is plain white, so there is no panel here —
// only the padding that sets the rhythm. Pass a background via `style` for
// the rare block that needs one.
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
      className: `relative ${PADDING_MAP[padding]} ${className}`,
      style: {
        color: 'var(--ink)',
        ...style,
      },
    },
    children
  );
}
