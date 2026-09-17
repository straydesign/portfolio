'use client';

import { useState, useEffect, useRef } from 'react';
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
const Resume = dynamic(() => import('@/components/Resume'));
const CaseStudy = dynamic(() => import('@/components/CaseStudy'));

// Every study runs through one renderer. The page-to-slug map is the only
// thing that differs between a client site and a product.
const STUDY_SLUGS: Partial<Record<Page, string>> = {
  'seacave-case-study': 'seacave',
  'andys-case-study': 'andys',
  'bullfrog-case-study': 'bullfrog',
  'presqueisle-case-study': 'presqueisle',
  'middleman-case-study': 'middleman',
};

function AppContent({ initialPage }: { initialPage: Page }) {
  // Seeded by the server route, so the first HTML Next sends already carries
  // the study a visitor asked for. It used to start on 'home' and correct
  // itself in an effect, which meant /andys served the home page's markup,
  // title and canonical to anything that does not run JavaScript — a crawler,
  // a link preview, a reader with scripting off.
  const [currentPage, setCurrentPage] = useState<Page>(initialPage);
  const [hydrated, setHydrated] = useState(false);
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();

  // The route already resolved the page, so this only flips the flag that lets
  // the URL-sync effect below start running.
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Landing with a hash (e.g. /#about via the old /about redirect):
  // scroll to the section once it exists.
  useEffect(() => {
    if (!hydrated) return;
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView();
      } else if (attempts < 20) {
        attempts += 1;
        window.setTimeout(tryScroll, 100);
      }
    };
    // Wait out the URL-sync effect's initial scroll-to-top before jumping
    window.setTimeout(tryScroll, 250);
  }, [hydrated]);

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
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--paper)' }}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {/* overflow-x-clip, not overflow-hidden: `hidden` makes this element the
            sticky scroll container for everything inside it, which silently kills
            every position:sticky on the page. Clipping one axis does not. */}
        {/* tabIndex -1 so the skip link moves focus here rather than only
            scrolling — without it the next Tab went back to the header nav,
            which is the thing the link exists to skip. */}
        <main id="main-content" tabIndex={-1} className="flex-1 relative overflow-x-clip">
          <div className="relative z-10">
            <SectionNavigationOrchestrator />
            {/* initial={false}: the first-loaded page paints at its visible
                state immediately (keeps LCP ≈ FCP) — only page-to-page
                navigations animate. */}
            {/* No filter in this transition. `filter: blur(0px)` is not `none`, so
                it makes this element the containing block for every fixed-position
                descendant — the bookshelf dialog anchored to this box instead of the
                viewport and drifted with the page. It also forces a full-page raster
                on every navigation. Opacity and translate read the same and cost
                nothing. */}
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={currentPage}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
                {currentPage === 'resume' && <Resume />}
                {STUDY_SLUGS[currentPage] && (
                  <CaseStudy
                    slug={STUDY_SLUGS[currentPage]!}
                    projectId={currentPage}
                    onBack={() => setCurrentPage('home')}
                    onNavigate={setCurrentPage}
                  />
                )}
              </m.div>
            </AnimatePresence>
          </div>
        </main>
        <Footer setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </SectionRegistryProvider>
  );
}

export default function App({ initialPage = 'home' }: { initialPage?: Page }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <SmoothScroll>
        <AppContent initialPage={initialPage} />
      </SmoothScroll>
    </LazyMotion>
  );
}
