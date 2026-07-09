'use client';

import { ExternalLink, Github } from 'lucide-react';
import TextCard from '../TextCard';
import PhoneMockup from '../PhoneMockup';
import MacBookFrame from '../MacBookFrame';
import SectionHeading from './SectionHeading';
import AnimateIn from '../AnimateIn';
import { NavigableSection } from '../NavigableSection';
import { type Page, PROJECTS, getProjectTypeLabel } from '@/data/projects';

// Presentation-only config per project: which device shows it, chips
// summarizing the deliverable, and the label for the live link.
const ROW_CONFIG: Record<string, { device: 'phone' | 'macbook'; shot?: string; chips: readonly string[]; liveLabel?: string }> = {
  'middleman-case-study': {
    device: 'phone',
    chips: ['Live prototype', 'Design system'],
  },
  'day-one-case-study': {
    device: 'phone',
    chips: ['Shipped product', 'AI planning'],
    liveLabel: 'Try it live',
  },
  'doordash-case-study': {
    device: 'phone',
    chips: ['Heuristic evaluation', '5 redesign concepts'],
  },
  'auto-presenter-tool': {
    device: 'macbook',
    shot: '/images/auto-presenter/presenter-active.png',
    chips: ['Electron + Claude', 'Open source'],
    liveLabel: 'View on GitHub',
  },
};

export default function Work({ onOpen }: { onOpen: (id: Page) => void }) {
  return (
    <NavigableSection id="work" label="Work">
      <div className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading kicker="// case studies & shipped work" title="WORK" className="mb-10 md:mb-14" />

          <div className="flex flex-col gap-16 md:gap-24">
            {PROJECTS.map((project, i) => {
              const config = ROW_CONFIG[project.id];
              const flipped = i % 2 === 1;
              const isGithub = !!project.githubUrl && project.liveUrl === project.githubUrl;

              return (
                <AnimateIn key={project.id} direction="up">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    {/* Device — sits straight on the brick wall */}
                    <div className={`flex justify-center ${flipped ? 'lg:order-2' : ''}`}>
                      {config?.device === 'macbook' ? (
                        <div className="w-full max-w-xl">
                          <MacBookFrame
                            src={config.shot ?? project.screenshot}
                            alt={project.alt}
                          />
                        </div>
                      ) : (
                        <PhoneMockup
                          screenshot={config?.shot ?? project.screenshot}
                          alt={project.alt}
                          onClick={() => onOpen(project.id)}
                        />
                      )}
                    </div>

                    {/* Story */}
                    <div className={flipped ? 'lg:order-1' : ''}>
                      <TextCard padding="lg">
                        <p
                          className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3"
                          style={{ color: 'var(--ink-2)' }}
                        >
                          {`// ${getProjectTypeLabel(project.type).toLowerCase()}`}
                        </p>
                        <h3
                          className="leading-[1.1] tracking-wide font-black mb-3"
                          style={{
                            fontFamily: 'var(--font-family-bungee), sans-serif',
                            color: 'var(--ink)',
                            fontSize: 'clamp(1.25rem, 2.4vw, 1.8rem)',
                          }}
                        >
                          {project.title}
                        </h3>
                        <p className="text-[15px] md:text-base leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                          {project.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {config?.chips.map((chip) => (
                            <span
                              key={chip}
                              className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                              style={{
                                color: 'var(--ink-2)',
                                border: '1px solid rgba(var(--hairline),0.2)',
                                borderRadius: 0,
                              }}
                            >
                              {chip}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          {project.caseStudy && (
                            <button
                              type="button"
                              onClick={() => onOpen(project.id)}
                              className="inline-flex items-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-transform hover:scale-[1.03] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]"
                              style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}
                            >
                              Read the case study
                            </button>
                          )}
                          {!project.caseStudy && project.id === 'auto-presenter-tool' && (
                            <button
                              type="button"
                              onClick={() => onOpen(project.id)}
                              className="inline-flex items-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-transform hover:scale-[1.03] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]"
                              style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}
                            >
                              See the breakdown
                            </button>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-transform hover:scale-[1.03] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]"
                              style={{
                                backgroundColor: 'transparent',
                                color: 'var(--ink)',
                                border: '1px solid rgba(var(--hairline),0.35)',
                                borderRadius: 0,
                              }}
                            >
                              {config?.liveLabel ?? 'Try it live'}
                              {isGithub ? (
                                <Github className="w-3.5 h-3.5 flex-shrink-0" />
                              ) : (
                                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                              )}
                            </a>
                          )}
                        </div>
                      </TextCard>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </div>
    </NavigableSection>
  );
}
