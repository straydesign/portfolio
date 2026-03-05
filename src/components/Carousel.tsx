'use client';

import { ReactNode } from 'react';

interface CarouselProps {
  items: ReactNode[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

export default function Carousel({
  items,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: CarouselProps) {
  const animationName = direction === 'left' ? 'scroll-left' : 'scroll-right';

  return (
    <div
      className={`overflow-hidden w-full ${className}`}
      aria-roledescription="carousel"
      aria-label="Auto-scrolling content"
    >
      <div
        className={`flex gap-4 w-max ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
        }}
      >
        {/* Original items */}
        {items.map((item, i) => (
          <div key={`a-${i}`} className="shrink-0" aria-hidden={i >= items.length}>
            {item}
          </div>
        ))}
        {/* Duplicated items for seamless loop */}
        {items.map((item, i) => (
          <div key={`b-${i}`} className="shrink-0" aria-hidden>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
