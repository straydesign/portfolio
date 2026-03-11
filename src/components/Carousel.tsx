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
      className={`overflow-hidden w-full relative ${className}`}
      aria-roledescription="carousel"
      aria-label="Auto-scrolling content"
    >
      {/* Left edge fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #000000, transparent)' }}
      />
      {/* Right edge fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #000000, transparent)' }}
      />

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
