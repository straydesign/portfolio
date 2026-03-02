'use client';

import { useTheme } from '@/context/ThemeContext';
import { colorMap, getPrimaryColor } from '@/utils/cardStyles';
import { Linkedin, Mail, Phone } from 'lucide-react';

type Page = 'home' | 'about' | 'work' | 'resume' | 'middleman-case-study' | 'day-one-case-study' | 'doordash-case-study' | 'design-system' | 'services';

interface FooterProps {
  setCurrentPage?: (page: Page) => void;
  currentPage?: Page;
}

export default function Footer({ setCurrentPage, currentPage }: FooterProps) {
  const { theme, accentColor } = useTheme();
  const basePrimaryColor = colorMap[accentColor];
  const primaryColor = accentColor === 'bw' && theme === 'dark' ? '#ffffff' : basePrimaryColor;
  const textColor = primaryColor;

  const socialLinks = [
    { icon: Phone, label: 'Phone', href: 'tel:+18149640081' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tom-sesler/' },
    { icon: Mail, label: 'Email', href: 'mailto:Tlsesler44@gmail.com' },
  ];

  return (
    <footer
      className="mt-auto relative"
      style={{
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        zIndex: 50,
        boxShadow: theme === 'dark' ? '0 -2px 8px rgba(0, 0, 0, 0.5)' : '0 -2px 8px rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="px-6 md:px-8 py-3 md:py-4" style={{ position: 'relative', zIndex: 51 }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            <h2
              className="text-[18px] md:text-[24px]"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", fontWeight: 900, color: textColor }}
            >
              LET&apos;S WORK TOGETHER
            </h2>
            <a
              href="mailto:Tlsesler44@gmail.com"
              className="px-6 py-2 border-2 rounded-full transition-all text-sm md:text-base whitespace-nowrap hover:scale-105"
              style={{ borderColor: textColor, color: textColor, backgroundColor: 'transparent' }}
            >
              CONTACT
            </a>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            {setCurrentPage && (
              <button
                onClick={() => setCurrentPage('services')}
                className="px-4 py-1.5 border-2 rounded-full transition-all text-sm whitespace-nowrap hover:scale-105"
                style={{ borderColor: textColor, color: textColor, backgroundColor: 'transparent' }}
              >
                WEB DESIGN SERVICES
              </button>
            )}
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
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
  );
}
