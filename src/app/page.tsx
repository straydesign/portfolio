'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation, AnimatePresence, m, useReducedMotion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/components/Home';
import { type Page, getPageFromPath, getPathFromPage, getDocumentTitle } from '@/data/projects';
import { SmoothScroll, useLenis } from '@/components/SmoothScroll';
import { SectionRegistryProvider } from '@/context/SectionRegistryContext';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useSectionRegistry } from '@/context/SectionRegistryContext';

const BrickWallWrapper = dynamic(
  () => import('@/components/three/BrickWallWrapper').then(mod => ({ default: mod.BrickWallWrapper })),
  { ssr: false }
);

/** Activates scroll spy + keyboard nav + aria-live announcements */
function SectionNavigationOrchestrator() {
  useScrollSpy();
  useKeyboardNavigation();
  const { activeId, getSections } = useSectionRegistry();
  const announcementRef = useRef<HTMLDivElement>(null);
  const prevActiveRef = useRef<string | null>(null);

  useEffect(() => {
    if (activeId && activeId !== prevActiveRef.current && announcementRef.current) {
      const sections = getSections();
      const section = sections.find((s) => s.id === activeId);
      if (section) {
        announcementRef.current.textContent = `Navigated to ${section.label}`;
      }
    }
    prevActiveRef.current = activeId;
  }, [activeId, getSections]);

  return (
    <div
      ref={announcementRef}
      role="status"
      aria-live="polite"
      className="sr-only"
    />
  );
}

// Lazy-load pages that aren't the default view
const About = dynamic(() => import('@/components/About'));
const Resume = dynamic(() => import('@/components/Resume'));
const MiddlemanCaseStudy = dynamic(() => import('@/components/MiddlemanCaseStudy'));
const DayOneCaseStudy = dynamic(() => import('@/components/DayOneCaseStudy'));
const DoorDashCaseStudy = dynamic(() => import('@/components/DoorDashCaseStudy'));

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [hydrated, setHydrated] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();

  // Mount effect — read URL, then mark hydrated
  useEffect(() => {
    setCurrentPage(getPageFromPath(window.location.pathname));
    setHydrated(true);
  }, []);

  // Delay Three.js background until after initial paint to prioritize content
  useEffect(() => {
    const id = requestIdleCallback
      ? requestIdleCallback(() => setShowBackground(true), { timeout: 3000 })
      : window.setTimeout(() => setShowBackground(true), 1500);
    return () => {
      if (typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(id as number);
      } else {
        clearTimeout(id as number);
      }
    };
  }, []);

  // URL sync effect — guard with hydrated flag to prevent race condition
  useEffect(() => {
    if (!hydrated) return;
    const newPath = getPathFromPage(currentPage);
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
    document.title = getDocumentTitle(currentPage);
  }, [currentPage, lenis, hydrated]);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(getPageFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <SectionRegistryProvider currentPage={currentPage}>
      <div className="min-h-screen flex flex-col bg-black">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main id="main-content" className="flex-1 relative overflow-hidden">
          <div className="fixed inset-0 z-[2] pointer-events-none">
            {showBackground && <BrickWallWrapper theme="dark" accentColor="#ffffff" />}
          </div>
          {/* Scrim overlay on project/resume pages to reduce background distraction */}
          {(currentPage === 'resume' || currentPage === 'middleman-case-study' || currentPage === 'day-one-case-study' || currentPage === 'doordash-case-study') && (
            <div className="fixed inset-0 z-[3] pointer-events-none bg-black/90" />
          )}
          <div className="relative z-10">
            <SectionNavigationOrchestrator />
            <AnimatePresence mode="wait">
              <m.div
                key={currentPage}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 8, filter: reducedMotion ? 'none' : 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -8, filter: reducedMotion ? 'none' : 'blur(4px)' }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
                {currentPage === 'about' && <About setCurrentPage={setCurrentPage} />}
                {currentPage === 'resume' && <Resume />}
                {currentPage === 'middleman-case-study' && <MiddlemanCaseStudy onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />}
                {currentPage === 'day-one-case-study' && <DayOneCaseStudy onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />}
                {currentPage === 'doordash-case-study' && <DoorDashCaseStudy onBack={() => setCurrentPage('home')} onNavigate={setCurrentPage} />}
              </m.div>
            </AnimatePresence>
          </div>
        </main>
        <Footer setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </SectionRegistryProvider>
  );
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
    </LazyMotion>
  );
}
