'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
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
  { id: 'work', label: 'WORK' },
  { id: 'resume', label: 'RESUME' },
  { id: 'about', label: 'ABOUT' },
];

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const isActive = (itemId: string): boolean => currentPage === itemId;

  return (
    <header
      className="sticky top-0 transition-all duration-300 z-[100]"
      style={{ backgroundColor: 'transparent' }}
    >
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
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el);
                }}
                onClick={() => handleNavClick(item.id)}
                className="px-3 py-1 border-2"
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
            className="md:hidden px-3 py-1 border-2 flex items-center gap-2"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pb-3 px-6" role="navigation" aria-label="Mobile navigation">
          <div className="px-4 py-3" style={{ backgroundColor: '#000000', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="px-3 py-1.5 border-2 text-left"
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
        </div>
      )}
    </header>
  );
}
