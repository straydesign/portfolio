'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { colorMap } from '@/utils/cardStyles';
import type { AccentColor, Theme } from '@/utils/cardStyles';
import { Menu, X } from 'lucide-react';

type Page = 'home' | 'about' | 'work' | 'resume' | 'middleman-case-study' | 'day-one-case-study' | 'doordash-case-study' | 'design-system' | 'services';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NAV_ITEMS = [
  { id: 'home' as const, label: 'HOME' },
  { id: 'resume' as const, label: 'RESUME' },
  { id: 'about' as const, label: 'BOOKS/INTERESTS' },
  { id: 'design-system' as const, label: 'DESIGN SYSTEM' },
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

  const handleNavClick = (page: 'home' | 'about' | 'resume' | 'design-system') => {
    if (page === 'home') {
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage(page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 transition-all duration-300 z-[100]"
      style={{
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        boxShadow: theme === 'dark' ? '0 2px 8px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      <nav className="px-6 md:px-12 py-4 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-1 border-2 rounded-full"
                style={{
                  borderColor: currentPage === item.id ? headerTextColor : 'transparent',
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
          <div className="rounded-3xl px-4 py-3" style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="px-3 py-1.5 border-2 text-left rounded-full"
                  style={{
                    borderColor: currentPage === item.id ? headerTextColor : 'transparent',
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
