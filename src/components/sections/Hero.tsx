'use client';

import { useState, useEffect, useCallback, type KeyboardEvent } from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import TextCard from '../TextCard';
import { NavigableSection } from '../NavigableSection';
import { useSectionRegistry } from '@/context/SectionRegistryContext';
import { useScrollToSection } from '@/hooks/useScrollToSection';

export const CONTACT_LINKS = [
  { icon: Phone, label: 'Phone', href: 'tel:+18149640081', external: false },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tom-sesler/', external: true },
  { icon: Mail, label: 'Email', href: 'mailto:tom@straydesign.co', external: false },
] as const;

export default function Hero({ onResume }: { onResume: () => void }) {
  const [heroSubNav, setHeroSubNav] = useState(false);
  const [heroSubNavIndex, setHeroSubNavIndex] = useState(0);
  const { activeId } = useSectionRegistry();
  const scrollTo = useScrollToSection();

  useEffect(() => {
    if (activeId !== 'home-hero') setHeroSubNav(false);
  }, [activeId]);

  const handleHeroKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    if (!heroSubNav) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setHeroSubNav(true);
        setHeroSubNavIndex(0);
      }
    } else {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setHeroSubNavIndex(prev => (prev > 0 ? prev - 1 : CONTACT_LINKS.length - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setHeroSubNavIndex(prev => (prev < CONTACT_LINKS.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const link = CONTACT_LINKS[heroSubNavIndex];
        if (link.external) {
          window.open(link.href, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = link.href;
        }
        setHeroSubNav(false);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setHeroSubNav(false);
      }
    }
  }, [heroSubNav, heroSubNavIndex]);

  return (
    <NavigableSection id="home-hero" label="Hero" onKeyDown={handleHeroKeyDown}>
      <div className="px-4 md:px-8 pt-10 md:pt-16 pb-6 md:pb-10">
        <div className="max-w-7xl mx-auto">
          <TextCard padding="lg" className="lg:max-w-3xl">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-4"
              style={{ color: 'var(--ink-2)' }}
            >
              {'// product designer'}
            </p>

            <h1
              className="leading-[1.05] tracking-wide font-black mb-4"
              style={{
                fontFamily: 'var(--font-family-bungee), sans-serif',
                color: 'var(--ink)',
                fontSize: 'clamp(2.1rem, 5vw, 3.4rem)',
              }}
            >
              HI, I&apos;M TOM.
            </h1>

            <p
              className="text-xl md:text-2xl font-semibold mb-5"
              style={{ color: 'var(--ink)' }}
            >
              I build what I wish existed, then ship it.
            </p>

            <p className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl" style={{ color: 'var(--ink-2)' }}>
              Every project below started as a problem from my own life. I hit them
              driving for DoorDash, stocking beer coolers as a merchandiser, and
              recording pitch videos. I designed and built each one from scratch.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollTo('work')}
                className="inline-flex items-center px-6 py-3 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-transform hover:scale-[1.03] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]"
                style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}
              >
                See the work
              </button>
              <button
                type="button"
                onClick={onResume}
                className="inline-flex items-center px-6 py-3 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-transform hover:scale-[1.03] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--ink)',
                  border: '1px solid rgba(var(--hairline),0.35)',
                  borderRadius: 0,
                }}
              >
                Resume
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {CONTACT_LINKS.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-2 px-4 py-2 transition-transform hover:scale-105"
                  style={{
                    backgroundColor: 'var(--chip)',
                    color: 'var(--ink)',
                    border: '1px solid rgba(var(--hairline),0.08)',
                    borderRadius: 0,
                    ...(heroSubNav && heroSubNavIndex === i
                      ? { outline: '2px solid var(--ink)', outlineOffset: '2px' }
                      : {}),
                  }}
                >
                  <link.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap">{link.label}</span>
                </a>
              ))}
            </div>
          </TextCard>
        </div>
      </div>
    </NavigableSection>
  );
}
