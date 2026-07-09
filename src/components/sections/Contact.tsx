'use client';

import { Mail, Phone } from 'lucide-react';
import TextCard from '../TextCard';
import AnimateIn from '../AnimateIn';
import { NavigableSection } from '../NavigableSection';

export default function Contact() {
  return (
    <NavigableSection id="home-contact" label="Get in Touch">
      <AnimateIn direction="up" className="px-4 md:px-8 py-14 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <TextCard padding="lg">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.18em] mb-4"
              style={{ color: 'var(--ink-2)' }}
            >
              {'// got something interesting?'}
            </p>
            <h2
              className="mb-4 leading-none tracking-wide font-black"
              style={{
                fontFamily: 'var(--font-family-bungee), sans-serif',
                color: 'var(--ink)',
                fontSize: 'clamp(1.6rem, 3.4vw, 2.5rem)',
              }}
            >
              GET IN TOUCH
            </h2>
            <p className="text-base md:text-lg mb-8 max-w-md mx-auto" style={{ color: 'var(--ink-2)' }}>
              I&apos;m always up for a good problem to solve. Send me what you&apos;re working on.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:tom@straydesign.co"
                className="inline-flex items-center gap-3 px-7 py-3.5 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-transform duration-200 hover:scale-[1.03]"
                style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                tom@straydesign.co
              </a>
              <a
                href="tel:+18149640081"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-transform duration-200 hover:scale-[1.03]"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--ink)',
                  border: '1px solid rgba(var(--hairline),0.35)',
                  borderRadius: 0,
                }}
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                (814) 964-0081
              </a>
            </div>
          </TextCard>
        </div>
      </AnimateIn>
    </NavigableSection>
  );
}
