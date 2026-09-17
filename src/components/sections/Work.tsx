'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import TextCard from '../TextCard';
import PhoneMockup from '../PhoneMockup';
import PhoneFrame from '../PhoneFrame';
import MacBookFrame from '../MacBookFrame';
import DeviceDuo from '../DeviceDuo';
import SectionHeading from './SectionHeading';
import AnimateIn from '../AnimateIn';
import { NavigableSection } from '../NavigableSection';
import { type Page, PROJECTS, getProjectTypeLabel } from '@/data/projects';

// Presentation-only config per project: which device shows it, chips
// summarizing the deliverable, and the label for the live link.
//
// `shot` is a device RENDER, not a bare capture — a MacBook window wearing a
// macOS Safari toolbar, built by `scripts/compose-device-screens.mjs`. The
// handset beside it comes from `project.deviceShot`, which additionally goes
// through the Envato kit's smart object via `scripts/ps/run-screen-jobs.sh`.
// A bare screenshot in a drawn bezel is a picture of a web page, not of
// somebody using the site.
const ROW_CONFIG: Record<string, { device: 'phone' | 'macbook' | 'duo'; shot?: string; chips: readonly string[]; liveLabel?: string }> = {
  'middleman-case-study': {
    device: 'phone',
    chips: ['Live prototype', 'Design system'],
    liveLabel: 'Try the prototype',
  },
  'seacave-case-study': {
    device: 'duo',
    shot: '/images/devices/laptop-seacave.webp',
    chips: ['Live client site', 'Design system'],
    liveLabel: 'Visit the site',
  },
  'presqueisle-case-study': {
    device: 'duo',
    shot: '/images/devices/laptop-presqueisle.webp',
    chips: ['Live client site', 'CMS'],
    liveLabel: 'Visit the site',
  },
  'andys-case-study': {
    device: 'duo',
    shot: '/images/devices/laptop-andys.webp',
    chips: ['Live client site', 'CMS'],
    liveLabel: 'Visit the site',
  },
  'bullfrog-case-study': {
    device: 'duo',
    shot: '/images/devices/laptop-bullfrog.webp',
    chips: ['Live client site', 'Reskin'],
    liveLabel: 'Visit the site',
  },
};

export default function Work({ onOpen }: { onOpen: (id: Page) => void }) {
  return (
    <NavigableSection id="work" label="Work">
      <div className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading kicker="Case studies & shipped work" title="WORK" className="mb-10 md:mb-14" />

          <div className="flex flex-col gap-16 md:gap-24">
            {PROJECTS.map((project, i) => {
              const config = ROW_CONFIG[project.id];
              const flipped = i % 2 === 1;
              const isGithub = !!project.githubUrl && project.liveUrl === project.githubUrl;

              return (
                <AnimateIn key={project.id} direction="up">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    {/* Device */}
                    <div className={`flex justify-center ${flipped ? 'lg:order-2' : ''}`}>
                      {config?.device === 'duo' && project.deviceShot ? (
                        <div className="w-full max-w-xl">
                          <DeviceDuo
                            shot={config.shot ?? project.screenshot}
                            phoneShot={project.deviceShot}
                            alt={project.alt}
                            phoneAlt={`${project.title} on a phone`}
                          />
                        </div>
                      ) : config?.device === 'macbook' ? (
                        <div className="w-full max-w-xl">
                          <MacBookFrame
                            src={config.shot ?? project.screenshot}
                            alt={project.alt}
                          />
                        </div>
                      ) : project.deviceShot ? (
                        /* The handset alone. Same photoreal render as the duo,
                           just without a laptop beside it — this project only
                           ever ran on a phone. */
                        <PhoneFrame
                          src={project.deviceShot}
                          alt={`${project.title} on a phone`}
                          className="w-full max-w-[16rem]"
                          sizes="(min-width: 1024px) 16rem, 55vw"
                        />
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
                          className="text-[15px] md:text-base italic mb-3"
                          style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-display)' }}
                        >
                          {getProjectTypeLabel(project.type)}
                        </p>
                        <h3
                          className="leading-[1.1] tracking-wide font-black mb-3"
                          style={{
                            fontFamily: 'var(--font-display)',
                            color: 'var(--ink)',
                            fontSize: 'clamp(1.25rem, 2.4vw, 1.8rem)',
                          }}
                        >
                          {project.title}
                        </h3>
                        <p className="text-[15px] md:text-base leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                          {project.description}
                        </p>

                        {/* Metadata, not controls. These were outlined pills
                            sitting directly above the two real buttons, in
                            matching geometry — they read as buttons that did
                            nothing when clicked. Same words, no border, no
                            box: now they read as what they are. */}
                        <p
                          className="mt-4 text-[11px] font-semibold uppercase tracking-wider"
                          style={{ color: 'var(--ink-2)' }}
                        >
                          {config?.chips.join(' · ')}
                        </p>

                        {/* The case study is the primary action and the live
                            site is the secondary one. It was the other way
                            round until 2026-09-17, and since the card carried
                            no link to the study at all, every visitor who
                            wanted to see the work left for a client's site
                            and never came back. */}
                        <div className="mt-6 flex flex-wrap gap-3">
                          {project.caseStudy && (
                            <Link
                              href={`/${project.slug}`}
                              onClick={(e) => {
                                // A real href so the row can be opened in a new
                                // tab, copied, and crawled. The click itself
                                // stays on the client router.
                                e.preventDefault();
                                onOpen(project.id);
                              }}
                              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-transform hover:scale-[1.03] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[color:var(--ink)]"
                              style={{
                                backgroundColor: 'var(--ink)',
                                color: 'var(--paper)',
                                border: '1px solid var(--ink)',
                                borderRadius: 0,
                              }}
                            >
                              Read the case study
                              <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                            </Link>
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
