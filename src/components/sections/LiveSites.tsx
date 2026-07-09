'use client';

import { ExternalLink } from 'lucide-react';
import TextCard from '../TextCard';
import MacBookFrame from '../MacBookFrame';
import SectionHeading from './SectionHeading';
import AnimateIn from '../AnimateIn';
import { NavigableSection } from '../NavigableSection';
import { SHOWCASE_DEMOS } from '@/data/projects';

export default function LiveSites() {
  return (
    <NavigableSection id="sites" label="Live Sites">
      <div className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading kicker="// real businesses, in production" title="LIVE SITES" className="mb-10 md:mb-14" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {SHOWCASE_DEMOS.map((site, i) => (
              <AnimateIn key={site.href} direction="up" delay={i * 0.08}>
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--paper)]"
                  aria-label={`Visit ${site.title} — opens in a new tab`}
                >
                  <div className="transition-transform duration-300 group-hover:-translate-y-1.5">
                    <MacBookFrame src={site.screenshot} alt={site.alt} />
                  </div>
                  <TextCard padding="md" className="mt-6">
                    <p
                      className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2"
                      style={{ color: 'var(--ink-2)' }}
                    >
                      {`// ${site.badge.toLowerCase()}`}
                    </p>
                    <h3
                      className="leading-tight tracking-wide font-black mb-1.5"
                      style={{
                        fontFamily: 'var(--font-family-bungee), sans-serif',
                        color: 'var(--ink)',
                        fontSize: '1.05rem',
                      }}
                    >
                      {site.title}
                    </h3>
                    <p className="text-[13px] mb-3" style={{ color: 'var(--ink-2)' }}>
                      {site.category}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap group-hover:underline"
                      style={{ color: 'var(--ink)' }}
                    >
                      Visit live <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </span>
                  </TextCard>
                </a>
              </AnimateIn>
            ))}
          </div>

          <div className="mt-10">
            <TextCard padding="md" className="inline-block">
              <p className="text-sm" style={{ color: 'var(--ink-2)' }}>
                The web side of my work lives at{' '}
                <a
                  href="https://straywebdesign.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2"
                  style={{ color: 'var(--ink)' }}
                >
                  straywebdesign.co
                </a>
                .
              </p>
            </TextCard>
          </div>
        </div>
      </div>
    </NavigableSection>
  );
}
