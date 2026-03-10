'use client';

import { useState, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { colorMap } from '@/utils/cardStyles';
import type { AccentColor, Theme } from '@/utils/cardStyles';
import { Menu, X } from 'lucide-react';
import { type Page } from '@/data/projects';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

type NavItem = {
  readonly id: string;
  readonly label: string;
};

const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'HOME' },
  { id: 'resume', label: 'RESUME' },
  { id: 'about', label: 'ABOUT' },
];

function getHeaderTextColor(accentColor: AccentColor, theme: Theme): string {
  const basePrimaryColor = colorMap[accentColor];
  if (accentColor === 'bw' && theme === 'dark') return '#ffffff';
  return basePrimaryColor;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, accentColor } = useTheme();
  const headerTextColor = getHeaderTextColor(accentColor, theme);

  const handleNavClick = useCallback((itemId: string) => {
    if (itemId === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage(itemId as Page);
    }
    setMobileMenuOpen(false);
  }, [setCurrentPage]);

  const isActive = (itemId: string): boolean => currentPage === itemId;

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
            {NAV_ITEMS.map((item) => (
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
              {NAV_ITEMS.map((item) => (
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
