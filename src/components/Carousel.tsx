'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';

interface CarouselProps {
  items: ReactNode[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  focusedIndex?: number | null;
}

export default function Carousel({
  items,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  className = '',
  focusedIndex = null,
}: CarouselProps) {
  const animationName = direction === 'left' ? 'scroll-left' : 'scroll-right';
  const isKeyboardMode = focusedIndex != null;
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    if (!isKeyboardMode || !trackRef.current) return;
    const track = trackRef.current;
    const children = Array.from(track.children) as HTMLElement[];
    if (focusedIndex == null || focusedIndex >= items.length) return;
    // Center on the second copy (b- set, offset by items.length) so there's always content on both sides
    const targetChild = children[focusedIndex + items.length];
    if (!targetChild) return;
    const containerWidth = track.parentElement?.clientWidth ?? 0;
    const itemCenter = targetChild.offsetLeft + targetChild.clientWidth / 2;
    setTranslateX(-(itemCenter - containerWidth / 2));
  }, [focusedIndex, isKeyboardMode, items.length]);

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
        ref={trackRef}
        className={`flex gap-4 w-max ${!isKeyboardMode && pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={isKeyboardMode
          ? { transform: `translateX(${translateX}px)`, transition: 'transform 0.3s ease' }
          : { animation: `${animationName} ${speed}s linear infinite` }
        }
      >
        {items.map((item, i) => (
          <div key={`a-${i}`} className="shrink-0 inline-flex w-fit h-fit" aria-hidden={isKeyboardMode}>
            {item}
          </div>
        ))}
        {items.map((item, i) => (
          <div
            key={`b-${i}`}
            className="shrink-0 inline-flex w-fit h-fit"
            style={isKeyboardMode && i === focusedIndex ? { outline: '2px solid #ffffff', outlineOffset: '4px' } : {}}
            aria-hidden={!isKeyboardMode || i !== focusedIndex}
          >
            {item}
          </div>
        ))}
        {items.map((item, i) => (
          <div key={`c-${i}`} className="shrink-0 inline-flex w-fit h-fit" aria-hidden>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
