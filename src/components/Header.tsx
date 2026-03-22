'use client';

import { useState, useCallback, useRef, useEffect, type KeyboardEvent } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { type Page } from '@/data/projects';
import { NavigableSection } from './NavigableSection';
import { useSectionRegistry } from '@/context/SectionRegistryContext';
import { useLenis } from './SmoothScroll';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

type NavItem = {
  readonly id: string;
  readonly label: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'WORK' },
  { id: 'resume', label: 'RESUME' },
  { id: 'about', label: 'ABOUT' },
];

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuFocusIndex, setMobileMenuFocusIndex] = useState(0);
  const [menuSubNav, setMenuSubNav] = useState(false);
  const [menuSubNavIndex, setMenuSubNavIndex] = useState(0);
  const { activeId } = useSectionRegistry();
  const lenis = useLenis();

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

  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [pillReady, setPillReady] = useState(false);

  const updatePill = useCallback(() => {
    const activeButton = buttonRefs.current.get(currentPage);
    const container = navRef.current;
    if (!activeButton || !container) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    setPillStyle({
      left: buttonRect.left - containerRect.left,
      width: buttonRect.width,
    });
    setPillReady(true);
  }, [currentPage]);

  useEffect(() => {
    updatePill();
  }, [updatePill]);

  useEffect(() => {
    window.addEventListener('resize', updatePill);
    return () => window.removeEventListener('resize', updatePill);
  }, [updatePill]);

  const handleNavClick = useCallback((itemId: string) => {
    if (itemId === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage(itemId as Page);
    }
    setMobileMenuOpen(false);
  }, [setCurrentPage]);

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
          setMobileMenuFocusIndex(prev => prev < NAV_ITEMS.length - 1 ? prev + 1 : -1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setMobileMenuFocusIndex(prev => prev === -1 ? NAV_ITEMS.length - 1 : prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (mobileMenuFocusIndex === -1) {
            setMobileMenuOpen(false);
          } else {
            handleNavClick(NAV_ITEMS[mobileMenuFocusIndex].id);
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
        setMenuSubNavIndex(prev => prev > 0 ? prev - 1 : NAV_ITEMS.length - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setMenuSubNavIndex(prev => prev < NAV_ITEMS.length - 1 ? prev + 1 : 0);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleNavClick(NAV_ITEMS[menuSubNavIndex].id);
        setMenuSubNav(false);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setMenuSubNav(false);
      }
    }
  }, [menuSubNav, menuSubNavIndex, mobileMenuOpen, mobileMenuFocusIndex, handleNavClick]);

  const isActive = (itemId: string): boolean => currentPage === itemId;

  return (
    <header
      className="sticky top-0 transition-all duration-300 z-[100]"
      style={{ backgroundColor: 'transparent' }}
    >
      <NavigableSection id="header-nav" label="Navigation" excludeFromScrollSpy onKeyDown={handleHeaderKeyDown} className="relative z-[101]">
        <nav className="px-6 md:px-12 pt-4 md:pt-6 pb-8 md:pb-10" style={{ background: 'linear-gradient(to bottom, #000000 0%, #000000 50%, transparent 100%)' }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Desktop Nav */}
            <div ref={navRef} className="hidden md:flex items-center gap-3 lg:gap-6 relative">
              {/* Sliding pill indicator */}
              {pillReady && (
                <div
                  className="absolute top-0 border-2 pointer-events-none"
                  style={{
                    borderColor: '#ffffff',
                    borderRadius: 0,
                    left: pillStyle.left,
                    width: pillStyle.width,
                    height: '100%',
                    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              )}
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  ref={(el) => {
                    if (el) buttonRefs.current.set(item.id, el);
                  }}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1 border-2${menuSubNav && menuSubNavIndex === i ? ' marching-ants' : ''}`}
                  style={{
                    borderColor: 'transparent',
                    borderRadius: 0,
                    color: '#ffffff',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden px-3 py-1 border-2 flex items-center gap-2${mobileMenuOpen && mobileMenuFocusIndex === -1 ? ' marching-ants' : ''}`}
              style={{ color: '#ffffff', borderColor: '#ffffff', borderRadius: 0 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
              {mobileMenuOpen ? 'CLOSE' : 'MENU'}
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
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
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
              <div className="px-4 py-3" style={{ backgroundColor: '#000000', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div className="flex flex-col gap-1.5">
                  {NAV_ITEMS.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`px-3 py-1.5 border-2 text-left${mobileMenuFocusIndex === i ? ' marching-ants' : ''}`}
                      style={{
                        borderColor: isActive(item.id) ? '#ffffff' : 'transparent',
                        borderRadius: 0,
                        color: '#ffffff',
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
