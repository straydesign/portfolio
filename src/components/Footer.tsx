'use client';

import { Linkedin, Mail, Phone } from 'lucide-react';
import { type Page } from '@/data/projects';
import { NavigableSection } from './NavigableSection';

interface FooterProps {
  setCurrentPage?: (page: Page) => void;
  currentPage?: Page;
}

export default function Footer({ setCurrentPage, currentPage }: FooterProps) {
  const socialLinks = [
    { icon: Phone, label: 'Phone', href: 'tel:+18149640081', external: false },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tom-sesler/', external: true },
    { icon: Mail, label: 'Email', href: 'mailto:tom@straydesign.co', external: false },
  ];

  return (
    <footer
      className="mt-auto relative"
      style={{ backgroundColor: 'transparent', zIndex: 50 }}
    >
      <div className="px-6 md:px-8 pt-8 md:pt-10 pb-3 md:pb-4" style={{ position: 'relative', zIndex: 51, background: 'linear-gradient(to top, #000000 0%, #000000 50%, transparent 100%)' }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            <h2
              className="text-[18px] md:text-[24px]"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", fontWeight: 900, color: '#ffffff' }}
            >
              LET&apos;S WORK TOGETHER
            </h2>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            {socialLinks.map((link) => (
              <NavigableSection key={link.label} id={`footer-${link.label.toLowerCase()}`} label={link.label} excludeFromScrollSpy>
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={link.label}
                  className="transition-all hover:scale-110 inline-block"
                  style={{ color: '#ffffff' }}
                >
                  <link.icon className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                </a>
              </NavigableSection>
            ))}
          </div>
        </div>
      </div>
      <div className="px-6 md:px-8 pb-4 text-center" style={{ position: 'relative', zIndex: 51 }}>
        <NavigableSection id="footer-attribution" label="Built by Stray Web Design" excludeFromScrollSpy>
          <a href="https://straywebdesign.co" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-white/60 transition-colors">
            Built by Stray Web Design
          </a>
        </NavigableSection>
      </div>
    </footer>
  );
}
