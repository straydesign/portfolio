'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { colorMap } from '@/utils/cardStyles';
import { getLane } from '@/utils/lanes';
import type { AccentColor, Theme } from '@/utils/cardStyles';
import { Menu, X, ArrowRight } from 'lucide-react';

type Page = 'home' | 'about' | 'work' | 'resume' | 'middleman-case-study' | 'day-one-case-study' | 'doordash-case-study' | 'services';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

type NavItem = {
  readonly id: string;
  readonly label: string;
};

const PORTFOLIO_NAV: readonly NavItem[] = [
  { id: 'home', label: 'HOME' },
  { id: 'resume', label: 'RESUME' },
  { id: 'about', label: 'ABOUT' },
];

const SERVICES_NAV: readonly NavItem[] = [
  { id: 'services', label: 'SERVICES' },
  { id: 'services-work', label: 'WORK' },
  { id: 'services-contact', label: 'CONTACT' },
];

function getHeaderTextColor(accentColor: AccentColor, theme: Theme): string {
  const basePrimaryColor = colorMap[accentColor];
  if (accentColor === 'bw' && theme === 'dark') return '#ffffff';
  return basePrimaryColor;
}

function scrollToAnchor(anchorId: string) {
  const el = document.getElementById(anchorId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);
  const { theme, accentColor } = useTheme();
  const headerTextColor = getHeaderTextColor(accentColor, theme);
  const lane = getLane(currentPage);
  const navItems = lane === 'services' ? SERVICES_NAV : PORTFOLIO_NAV;

  // Handle deferred scroll after page transition
  useEffect(() => {
    if (pendingScroll && currentPage === 'services') {
      // Wait for the page to render before scrolling
      const timer = setTimeout(() => {
        scrollToAnchor(pendingScroll);
        setPendingScroll(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pendingScroll, currentPage]);

  const handleNavClick = useCallback((itemId: string) => {
    if (itemId === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (itemId === 'services-work') {
      if (currentPage === 'services') {
        scrollToAnchor('featured-work');
      } else {
        setPendingScroll('featured-work');
        setCurrentPage('services');
      }
    } else if (itemId === 'services-contact') {
      if (currentPage === 'services') {
        scrollToAnchor('contact-form');
      } else {
        setPendingScroll('contact-form');
        setCurrentPage('services');
      }
    } else if (itemId === 'services') {
      setCurrentPage('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage(itemId as Page);
    }
    setMobileMenuOpen(false);
  }, [currentPage, setCurrentPage]);

  const handleCrosslinkClick = useCallback(() => {
    if (lane === 'portfolio') {
      setCurrentPage('services');
    } else {
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lane, setCurrentPage]);

  const isActive = (itemId: string): boolean => {
    if (itemId === 'services-work' || itemId === 'services-contact') return false;
    return currentPage === itemId;
  };

  const fadeBg = theme === 'dark' ? '#000000' : '#ffffff';

  return (
    <header
      className="sticky top-0 transition-all duration-300 z-[100]"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <nav className="px-6 md:px-12 pt-4 md:pt-6 pb-8 md:pb-10" style={{ background: `linear-gradient(to bottom, ${fadeBg} 0%, ${fadeBg} 50%, transparent 100%)` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-1 border-2 rounded-full"
                style={{
                  borderColor: isActive(item.id) ? headerTextColor : 'transparent',
                  color: headerTextColor,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Crosslink Pill */}
          <button
            onClick={handleCrosslinkClick}
            className="hidden md:flex items-center gap-1.5 px-4 py-1 rounded-full text-xs tracking-wide transition-opacity hover:opacity-70"
            style={{
              color: headerTextColor,
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
            }}
          >
            {lane === 'portfolio' ? 'HIRE ME FOR YOUR WEBSITE' : 'VIEW PORTFOLIO'}
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden px-3 py-1 border-2 flex items-center gap-2 rounded-full"
            style={{ color: headerTextColor, borderColor: headerTextColor }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pb-3 px-6" role="navigation" aria-label="Mobile navigation">
          <div className="rounded-3xl px-4 py-3" style={{ backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="px-3 py-1.5 border-2 text-left rounded-full"
                  style={{
                    borderColor: isActive(item.id) ? headerTextColor : 'transparent',
                    color: headerTextColor,
                  }}
                >
                  {item.label}
                </button>
              ))}
              {/* Mobile Crosslink */}
              <button
                onClick={handleCrosslinkClick}
                className="px-3 py-1.5 text-left rounded-full flex items-center gap-1.5 mt-1 text-xs tracking-wide"
                style={{
                  color: headerTextColor,
                  opacity: 0.6,
                }}
              >
                {lane === 'portfolio' ? 'HIRE ME FOR YOUR WEBSITE' : 'VIEW PORTFOLIO'}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
