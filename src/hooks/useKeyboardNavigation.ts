'use client';

import { useEffect } from 'react';
import { useSectionRegistry } from '@/context/SectionRegistryContext';

const INTERACTIVE_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

export function useKeyboardNavigation() {
  const { goNext, goPrev } = useSectionRegistry();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.defaultPrevented) return;
      if ('menuOpen' in document.body.dataset) return;

      const target = e.target as HTMLElement;
      if (
        INTERACTIVE_TAGS.has(target.tagName) ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);
}
