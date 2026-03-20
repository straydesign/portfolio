'use client';

import {
  createContext,
  useContext,
  useCallback,
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type MutableRefObject,
} from 'react';

interface SectionEntry {
  id: string;
  label: string;
  element: HTMLElement;
  excludeFromScrollSpy?: boolean;
}

interface RegisterOptions {
  excludeFromScrollSpy?: boolean;
}

interface SectionRegistryContextValue {
  register: (id: string, label: string, element: HTMLElement, options?: RegisterOptions) => void;
  unregister: (id: string) => void;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  goNext: () => void;
  goPrev: () => void;
  getSections: () => SectionEntry[];
  getScrollSpySections: () => SectionEntry[];
  suppressScrollSpyUntilRef: MutableRefObject<number>;
}

const defaultSuppressRef = { current: 0 };

const SectionRegistryContext = createContext<SectionRegistryContextValue>({
  register: () => {},
  unregister: () => {},
  activeId: null,
  setActiveId: () => {},
  goNext: () => {},
  goPrev: () => {},
  getSections: () => [],
  getScrollSpySections: () => [],
  suppressScrollSpyUntilRef: defaultSuppressRef,
});

export function useSectionRegistry() {
  return useContext(SectionRegistryContext);
}

const HEADER_OFFSET = 80;

function sortByDomOrder(entries: SectionEntry[]): SectionEntry[] {
  return [...entries].sort((a, b) => {
    const pos = a.element.compareDocumentPosition(b.element);
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });
}

interface SectionRegistryProviderProps {
  currentPage: string;
  children: ReactNode;
}

export function SectionRegistryProvider({ currentPage, children }: SectionRegistryProviderProps) {
  const sectionsRef = useRef<Map<string, SectionEntry>>(new Map());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);
  const suppressScrollSpyUntilRef = useRef<number>(0);

  // Clear keyboard nav suppression on manual scroll/touch
  useEffect(() => {
    const clearSuppress = () => { suppressScrollSpyUntilRef.current = 0; setIsKeyboardNav(false); };
    window.addEventListener('wheel', clearSuppress, { passive: true });
    window.addEventListener('touchstart', clearSuppress, { passive: true });
    return () => {
      window.removeEventListener('wheel', clearSuppress);
      window.removeEventListener('touchstart', clearSuppress);
    };
  }, []);

  // Sync body attribute for keyboard-nav-only CSS (marching ants)
  useEffect(() => {
    if (isKeyboardNav) {
      document.body.dataset.keyboardNav = '';
    } else {
      delete document.body.dataset.keyboardNav;
    }
  }, [isKeyboardNav]);

  // Reset when page changes (don't clear sections map — header stays registered)
  useEffect(() => {
    setActiveId(null);
    setIsKeyboardNav(false);
  }, [currentPage]);

  const register = useCallback((id: string, label: string, element: HTMLElement, options?: RegisterOptions) => {
    sectionsRef.current.set(id, { id, label, element, excludeFromScrollSpy: options?.excludeFromScrollSpy });
  }, []);

  const unregister = useCallback((id: string) => {
    sectionsRef.current.delete(id);
  }, []);

  const getSections = useCallback(() => {
    return sortByDomOrder(Array.from(sectionsRef.current.values()));
  }, []);

  const getScrollSpySections = useCallback(() => {
    return getSections().filter((s) => !s.excludeFromScrollSpy);
  }, [getSections]);

  const goNext = useCallback(() => {
    const sections = getSections();
    if (sections.length === 0) return;
    const currentIndex = sections.findIndex((s) => s.id === activeId);
    const nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : currentIndex;
    const target = sections[nextIndex];
    if (!target) return;
    suppressScrollSpyUntilRef.current = Date.now() + 60000;
    setIsKeyboardNav(true);
    setActiveId(target.id);
    const top = target.element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
    target.element.focus({ preventScroll: true });
  }, [activeId, getSections]);

  const goPrev = useCallback(() => {
    const sections = getSections();
    if (sections.length === 0) return;
    const currentIndex = sections.findIndex((s) => s.id === activeId);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    const target = sections[prevIndex];
    if (!target) return;
    suppressScrollSpyUntilRef.current = Date.now() + 60000;
    setIsKeyboardNav(true);
    setActiveId(target.id);
    const top = target.element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
    target.element.focus({ preventScroll: true });
  }, [activeId, getSections]);

  return (
    <SectionRegistryContext.Provider
      value={{ register, unregister, activeId, setActiveId, goNext, goPrev, getSections, getScrollSpySections, suppressScrollSpyUntilRef }}
    >
      {children}
    </SectionRegistryContext.Provider>
  );
}
