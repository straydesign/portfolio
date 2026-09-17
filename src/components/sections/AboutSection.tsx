'use client';

import Image from 'next/image';
import SectionHeading from './SectionHeading';
import AnimateIn from '../AnimateIn';
import { NavigableSection } from '../NavigableSection';

/**
 * Portrait only, for now.
 *
 * The three-paragraph bio (DoorDash, the beer route, learning design in Figma)
 * came off 2026-09-17 — Tom: "take this description off I don't like it." The
 * words that replace it are his to write, so nothing is invented in the gap;
 * the section carries the portrait until he supplies them.
 *
 * The bookshelf came off in the same pass.
 */
export default function AboutSection() {
  return (
    <NavigableSection id="about" label="About">
      <div className="px-4 md:px-8 pt-12 md:pt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading kicker="Who's behind it" title="ABOUT" className="mb-10 md:mb-14" />

          <AnimateIn direction="up">
            <div
              className="relative w-full max-w-sm overflow-hidden"
              style={{
                backgroundColor: 'var(--chip)',
                border: '1px solid rgba(var(--hairline),0.08)',
                boxShadow: '0 1px 2px rgba(var(--hairline),0.04), 0 10px 30px rgba(var(--hairline),0.06)',
              }}
            >
              <Image
                src="/images/tom.png"
                alt="Tom Sesler"
                width={800}
                height={913}
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="w-full h-auto object-cover"
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </NavigableSection>
  );
}
