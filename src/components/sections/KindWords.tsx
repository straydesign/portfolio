'use client';

import { useState, useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import TextCard from '../TextCard';
import SectionHeading from './SectionHeading';
import AnimateIn from '../AnimateIn';
import { NavigableSection } from '../NavigableSection';

const RECOMMENDATIONS = [
  {
    quote: 'I hired Tom as a marketing consultant to assist my technology company with revamping our website, implementing and understanding web analytics, and other marketing tasks. In short, Tom delivered everything he promised, and more. He’s easy to work with, communicates quickly and does a great job explaining things. When he provides instructions, they’re clear, concise and easy to follow. We all enjoy the fact that Tom under-promises and over-delivers. It’s always nice to feel like you got a bit more than you paid for; Tom has mastered that delivery! I recommend Tom to any marketing team looking for a professional, intelligent team-member that’s not afraid to get his hands dirty.',
    highlight: 'Tom under-promises and over-delivers.',
    name: 'Kurt Simione',
    role: 'TechxRev, Client',
    initials: 'KS',
    href: 'https://techxrev-rebuild.vercel.app',
  },
  {
    quote: 'Been working with Tom from Stray Web Design now for a month. The communication and timeliness of his work is outstanding. I could not be happier with the product also. His web design was awesome. Like with any ongoing project, there are always changes that you want made — never any kickback on this. He listens, then executes. Great new company to deal with. Pricing is also great.',
    highlight: 'He listens, then executes.',
    name: 'Gary P.',
    role: 'Restaurant Owner, Stray Web Design Client',
    initials: 'GP',
    href: 'https://straywebdesign.co',
  },
  {
    quote: 'I had the pleasure of teaching Tom Sesler in both Financial and Managerial Accounting, where he consistently stood out as a top student—earning close to a perfect in each course. What impressed me most was not just Tom’s mastery of the material, but his ability to connect concepts and apply them thoughtfully to real business situations. He was an active participant in class discussions, often raising insightful questions and offering perspectives that pushed conversations deeper. Tom was always prepared, met every deadline, and demonstrated a professional and focused mindset from day one. He’s exactly the kind of driven, analytical thinker that any team would be lucky to have.',
    highlight: 'Exactly the kind of driven, analytical thinker any team would be lucky to have.',
    name: 'Scott Berube',
    role: 'Principal Lecturer of Accounting, UNH',
    initials: 'SB',
  },
  {
    quote: 'Thomas stood out immediately in my Organizational Behavior class—not just because of how well he performed, but because of how he showed up. He was consistently engaged in discussions, brought thoughtful ideas into the room, and had a knack for raising the level of conversation without ever needing to dominate it. What impressed me most was his ability to balance strategic thinking with collaboration. He worked seamlessly with his team, contributing in a way that moved the group forward and made others better. If you’re looking for someone in marketing who brings emotional intelligence, strong execution, and a team-first mindset, Thomas is someone I’d recommend without hesitation!',
    highlight: 'Strategic thinking with collaboration — he made others better.',
    name: 'Nikhil Awasty',
    role: 'Assistant Professor, UNH',
    initials: 'NA',
  },
  {
    quote: 'I had the pleasure of teaching Tom in my Quantitative Decision Making course at UNH Paul College of Business in Fall 2024. Known for its rigorous blend of operations theory and quantitative analysis, this course is one of the more challenging in the curriculum. Tom stood out as an engaged and dedicated student. Tom excelled academically and brought a positive, proactive attitude to class and office hours. His thoughtful contributions and strong work ethic were greatly appreciated. I am confident in Tom’s bright future and highly recommend him for any graduate program or professional opportunity.',
    highlight: 'Confident in Tom’s bright future — highly recommend.',
    name: 'Russell Miles',
    role: 'Operations / Supply Chain, UNH',
    initials: 'RM',
  },
];

export default function KindWords() {
  const [expandedRecs, setExpandedRecs] = useState<Set<number>>(new Set());

  const toggleRec = useCallback((index: number) => {
    setExpandedRecs(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  return (
    <NavigableSection id="kind-words" label="Kind Words">
      <div className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeading kicker="// clients & professors, verbatim" title="KIND WORDS" className="mb-10 md:mb-14" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RECOMMENDATIONS.map((rec, i) => {
              const isExpanded = expandedRecs.has(i);
              return (
                <AnimateIn key={rec.initials} direction="up" delay={(i % 2) * 0.08}>
                  <TextCard padding="lg" className="h-full">
                    <p className="text-base md:text-lg font-bold leading-relaxed mb-3" style={{ color: 'var(--ink)' }}>
                      &ldquo;{rec.highlight}&rdquo;
                    </p>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--ink-2)' }}>
                            {rec.quote}
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>
                    <button
                      onClick={() => toggleRec(i)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium mb-5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]"
                      style={{ color: 'var(--ink-2)' }}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? (
                        <>Read less <ChevronUp className="w-3 h-3 flex-shrink-0" /></>
                      ) : (
                        <>Read the whole thing <ChevronDown className="w-3 h-3 flex-shrink-0" /></>
                      )}
                    </button>
                    <div className="flex items-center gap-3">
                      {rec.href ? (
                        <a href={rec.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                          <div className="w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}>
                            {rec.initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold group-hover:underline" style={{ color: 'var(--ink)' }}>{rec.name}</p>
                            <p className="text-xs" style={{ color: 'var(--ink-2)' }}>{rec.role}</p>
                          </div>
                        </a>
                      ) : (
                        <>
                          <div className="w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: 'var(--chip)', color: 'var(--ink)', borderRadius: 0 }}>
                            {rec.initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold" style={{ color: 'var(--ink)' }}>{rec.name}</p>
                            <p className="text-xs" style={{ color: 'var(--ink-2)' }}>{rec.role}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </TextCard>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </div>
    </NavigableSection>
  );
}
