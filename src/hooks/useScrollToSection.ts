'use client';

import { useCallback } from 'react';
import { useLenis } from '@/components/SmoothScroll';

/** Smooth-scroll to a section id, through Lenis when it's running. */
export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, { offset: -24 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [lenis]
  );
}
