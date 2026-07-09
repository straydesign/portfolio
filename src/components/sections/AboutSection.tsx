'use client';

import Image from 'next/image';
import TextCard from '../TextCard';
import SectionHeading from './SectionHeading';
import AnimateIn from '../AnimateIn';
import Bookshelf from './Bookshelf';
import { NavigableSection } from '../NavigableSection';

export default function AboutSection() {
  return (
    <>
      <NavigableSection id="about" label="About">
        <div className="px-4 md:px-8 pt-12 md:pt-16">
          <div className="max-w-7xl mx-auto">
            <SectionHeading kicker="// the person behind it" title="ABOUT" className="mb-10 md:mb-14" />

            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12 items-start">
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

              <AnimateIn direction="up" delay={0.08}>
                <TextCard padding="lg">
                  <p className="text-[15px] md:text-[17px] leading-relaxed mb-5" style={{ color: 'var(--ink)' }}>
                    I found design the way most people find their best ideas: frustrated enough
                    to build something better. I drove for DoorDash, stocked shelves as a beer
                    merchandiser, and kept hitting problems nobody was solving. So I started
                    solving them myself.
                  </p>
                  <p className="text-[15px] md:text-[17px] leading-relaxed mb-5" style={{ color: 'var(--ink)' }}>
                    That turned into a freelance studio. Three local businesses now run on
                    sites I designed and built, including an aquarium shop that&apos;s been
                    open fifty years.
                  </p>
                  <p className="text-[15px] md:text-[17px] leading-relaxed" style={{ color: 'var(--ink)' }}>
                    I learned design in Figma before any of the AI tools existed, so I still
                    believe in the early wireframing that only happens when you don&apos;t
                    have the answers yet. But it&apos;s cheaper than ever to feel a finished
                    design before committing to a direction. I use both.
                  </p>
                </TextCard>
              </AnimateIn>
            </div>
          </div>
        </div>
      </NavigableSection>

      <Bookshelf />
    </>
  );
}
