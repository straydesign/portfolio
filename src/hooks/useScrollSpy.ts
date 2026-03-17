'use client';

import { useEffect, useRef } from 'react';
import { useSectionRegistry } from '@/context/SectionRegistryContext';

export function useScrollSpy() {
  const { getScrollSpySections, setActiveId, suppressScrollSpyUntilRef } = useSectionRegistry();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const ratiosRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Skip updates while keyboard navigation is in progress
        if (suppressScrollSpyUntilRef.current > Date.now()) return;

        for (const entry of entries) {
          ratiosRef.current.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratiosRef.current) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId && bestRatio > 0) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin: '-80px 0px 0px 0px',
        threshold: thresholds,
      }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [setActiveId, suppressScrollSpyUntilRef]);

  // Re-observe when sections change — only scroll-spy-eligible sections
  useEffect(() => {
    const observer = observerRef.current;
    if (!observer) return;

    const checkAndObserve = () => {
      const sections = getScrollSpySections();
      observer.disconnect();
      ratiosRef.current.clear();
      for (const section of sections) {
        observer.observe(section.element);
      }
    };

    const timer = setInterval(checkAndObserve, 200);
    checkAndObserve();

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [getScrollSpySections]);
}
