'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { colorMap } from '@/utils/cardStyles';
import { Linkedin, Mail, Phone, X } from 'lucide-react';
import ContactForm from './ContactForm';

type Page = 'home' | 'about' | 'work' | 'resume' | 'middleman-case-study' | 'day-one-case-study' | 'doordash-case-study' | 'services';

interface FooterProps {
  setCurrentPage?: (page: Page) => void;
  currentPage?: Page;
}

export default function Footer({ setCurrentPage, currentPage }: FooterProps) {
  const { theme, accentColor } = useTheme();
  const basePrimaryColor = colorMap[accentColor];
  const primaryColor = accentColor === 'bw' && theme === 'dark' ? '#ffffff' : basePrimaryColor;
  const textColor = primaryColor;
  const [contactOpen, setContactOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setContactOpen(false);
      return;
    }
    if (e.key !== 'Tab') return;

    const modal = modalRef.current;
    if (!modal) return;
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    modalRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [contactOpen, handleKeyDown]);

  const socialLinks = [
    { icon: Phone, label: 'Phone', href: 'tel:+18149640081', external: false },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tom-sesler/', external: true },
    { icon: Mail, label: 'Email', href: 'mailto:tlsesler44@gmail.com', external: false },
  ];

  return (
    <>
      <footer
        className="mt-auto relative"
        style={{
          backgroundColor: 'transparent',
          zIndex: 50,
        }}
      >
        <div className="px-6 md:px-8 pt-8 md:pt-10 pb-3 md:pb-4" style={{ position: 'relative', zIndex: 51, background: `linear-gradient(to top, ${theme === 'dark' ? '#000000' : '#ffffff'} 0%, ${theme === 'dark' ? '#000000' : '#ffffff'} 50%, transparent 100%)` }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
            <div className="flex items-center gap-4 md:gap-6">
              <h2
                className="text-[18px] md:text-[24px]"
                style={{ fontFamily: "var(--font-family-bungee), sans-serif", fontWeight: 900, color: textColor }}
              >
                LET&apos;S WORK TOGETHER
              </h2>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={link.label}
                  className="transition-all hover:scale-110"
                  style={{ color: textColor }}
                >
                  <link.icon className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={() => setContactOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Contact form"
            className="relative w-full max-w-md rounded-[32px] p-6 md:p-8 outline-none"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`,
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ color: primaryColor }}>Get in Touch</h3>
              <button
                onClick={() => setContactOpen(false)}
                className="p-1 rounded-full transition-all hover:scale-110"
                style={{ color: theme === 'dark' ? '#ffffff' : '#1d1d1f' }}
                aria-label="Close contact form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ContactForm compact />
          </div>
        </div>
      )}
    </>
  );
}
