'use client';

import { useState, useCallback, useRef, useEffect, type KeyboardEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { type Page } from '@/data/projects';
import CatLogo from './CatLogo';
import { NavigableSection } from './NavigableSection';
import { useSectionRegistry } from '@/context/SectionRegistryContext';
import { useLenis } from './SmoothScroll';
import { useScrollToSection } from '@/hooks/useScrollToSection';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly kind: 'anchor' | 'page';
};

const NAV_ITEMS: readonly NavItem[] = [
  { id: 'work', label: 'WORK', kind: 'anchor' },
  { id: 'sites', label: 'SITES', kind: 'anchor' },
  { id: 'about', label: 'ABOUT', kind: 'anchor' },
  { id: 'home-contact', label: 'CONTACT', kind: 'anchor' },
  { id: 'resume', label: 'RESUME', kind: 'page' },
];

// Sections that should light up the ABOUT link while scrolled through
const ABOUT_SECTIONS = new Set(['about', 'bookshelf', 'suggest-book']);

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuFocusIndex, setMobileMenuFocusIndex] = useState(0);
  const [menuSubNav, setMenuSubNav] = useState(false);
  const [menuSubNavIndex, setMenuSubNavIndex] = useState(0);
  const { activeId } = useSectionRegistry();
  const lenis = useLenis();
  const scrollTo = useScrollToSection();
  const pendingAnchorRef = useRef<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Lock scroll + signal global keyboard handler when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    document.body.dataset.menuOpen = '';
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      delete document.body.dataset.menuOpen;
    };
  }, [mobileMenuOpen, lenis]);

  useEffect(() => {
    if (activeId !== 'header-nav') setMenuSubNav(false);
  }, [activeId]);

  // After navigating back to home for an anchor link, scroll once the section exists
  useEffect(() => {
    if (currentPage !== 'home' || !pendingAnchorRef.current) return;
    const id = pendingAnchorRef.current;
    pendingAnchorRef.current = null;
    let attempts = 0;
    const tryScroll = () => {
      if (document.getElementById(id)) {
        scrollTo(id);
      } else if (attempts < 20) {
        attempts += 1;
        window.setTimeout(tryScroll, 100);
      }
    };
    // Give the page transition a beat before scrolling
    window.setTimeout(tryScroll, 350);
  }, [currentPage, scrollTo]);

  const handleNavClick = useCallback((item: NavItem) => {
    // Close the menu first — its body scroll-lock has to release before
    // any programmatic scrolling can move the page.
    setMobileMenuOpen(false);
    if (item.kind === 'page') {
      setCurrentPage(item.id as Page);
    } else if (currentPage === 'home') {
      window.setTimeout(() => scrollTo(item.id), 150);
    } else {
      pendingAnchorRef.current = item.id;
      setCurrentPage('home');
    }
  }, [currentPage, setCurrentPage, scrollTo]);

  const goHome = useCallback(() => {
    if (currentPage === 'home') {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setCurrentPage('home');
    }
    setMobileMenuOpen(false);
  }, [currentPage, lenis, setCurrentPage]);

  const handleHeaderKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    const isMobile = navRef.current && getComputedStyle(navRef.current).display === 'none';

    if (isMobile) {
      if (!mobileMenuOpen) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setMobileMenuOpen(true);
          setMobileMenuFocusIndex(0);
        }
      } else {
        // -1 = close button focused, 0+ = menu items
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setMobileMenuFocusIndex(prev => (prev < NAV_ITEMS.length - 1 ? prev + 1 : -1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setMobileMenuFocusIndex(prev => (prev === -1 ? NAV_ITEMS.length - 1 : prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (mobileMenuFocusIndex === -1) {
            setMobileMenuOpen(false);
          } else {
            handleNavClick(NAV_ITEMS[mobileMenuFocusIndex]);
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setMobileMenuOpen(false);
        }
      }
      return;
    }

    // Desktop sub-nav
    if (!menuSubNav) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setMenuSubNav(true);
        setMenuSubNavIndex(0);
      }
    } else {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setMenuSubNavIndex(prev => (prev > 0 ? prev - 1 : NAV_ITEMS.length - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setMenuSubNavIndex(prev => (prev < NAV_ITEMS.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNavClick(NAV_ITEMS[menuSubNavIndex]);
        setMenuSubNav(false);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setMenuSubNav(false);
      }
    }
  }, [menuSubNav, menuSubNavIndex, mobileMenuOpen, mobileMenuFocusIndex, handleNavClick]);

  const isActive = (item: NavItem): boolean => {
    if (item.kind === 'page') return currentPage === item.id;
    if (currentPage !== 'home' || !activeId) return false;
    if (item.id === 'about') return ABOUT_SECTIONS.has(activeId);
    return activeId === item.id;
  };

  return (
    <header
      className="sticky top-0 transition-all duration-300 z-[100]"
      style={{ backgroundColor: 'transparent' }}
    >
      <NavigableSection id="header-nav" label="Navigation" excludeFromScrollSpy onKeyDown={handleHeaderKeyDown} className="relative z-[101]">
        <nav className="px-5 md:px-12 pt-3 md:pt-4 pb-8 md:pb-10" style={{ background: 'linear-gradient(to bottom, var(--paper) 0%, var(--paper) 55%, transparent 100%)' }}>
          <div className="max-w-7xl mx-auto flex items-center gap-4 md:gap-8">
            {/* Cat mark + wordmark — 44px minimum tap target */}
            <button
              type="button"
              onClick={goHome}
              aria-label="straydesign — home"
              className="flex items-center gap-2.5 min-h-11 min-w-11 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]"
              style={{ color: 'var(--ink)' }}
            >
              <CatLogo className="h-6 md:h-7 w-auto flex-shrink-0" />
              <span
                className="text-[13px] md:text-sm tracking-wide leading-none translate-y-[1px]"
                style={{ fontFamily: 'var(--font-family-bungee), sans-serif' }}
              >
                STRAYDESIGN
              </span>
            </button>

            {/* Desktop Nav — stays left of the lamp chain */}
            <div ref={navRef} className={`hidden md:flex items-center gap-1 lg:gap-3 relative w-fit${!menuSubNav && activeId === 'header-nav' ? ' marching-ants' : ''}`}>
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`px-3 py-1 text-sm font-semibold border-2${menuSubNav && menuSubNavIndex === i ? ' marching-ants' : ''}`}
                    style={{
                      borderColor: 'transparent',
                      borderRadius: 0,
                      color: 'var(--ink)',
                      textDecoration: active ? 'underline' : 'none',
                      textUnderlineOffset: '6px',
                      textDecorationThickness: '2px',
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden px-3 min-h-11 border-2 flex items-center gap-2${(mobileMenuOpen && mobileMenuFocusIndex === -1) || (!mobileMenuOpen && activeId === 'header-nav') ? ' marching-ants' : ''}`}
              style={{ color: 'var(--ink)', borderColor: 'var(--ink)', borderRadius: 0 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 flex-shrink-0" aria-hidden="true" /> : <Menu className="w-4 h-4 flex-shrink-0" aria-hidden="true" />}
              <span className="text-sm font-semibold">{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
            </button>
          </div>
        </nav>
      </NavigableSection>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 z-[99] md:hidden"
              style={{ backgroundColor: 'rgba(var(--veil),0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Menu panel */}
            <m.div
              className="md:hidden mt-3 pb-3 px-6 relative z-[100]"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ y: -12 }}
              animate={{ y: 0 }}
              exit={{ y: -12 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="px-4 py-3" style={{ backgroundColor: 'var(--paper)', border: '1px solid rgba(var(--hairline),0.08)', boxShadow: '0 1px 2px rgba(var(--hairline),0.04), 0 10px 30px rgba(var(--hairline),0.06)' }}>
                <div className="flex flex-col gap-1.5">
                  {NAV_ITEMS.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`px-3 py-1.5 border-2 text-left text-sm font-semibold${mobileMenuFocusIndex === i ? ' marching-ants' : ''}`}
                      style={{
                        borderColor: isActive(item) ? 'var(--ink)' : 'transparent',
                        borderRadius: 0,
                        color: 'var(--ink)',
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
