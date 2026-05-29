'use client';

import { useState, useCallback, useEffect, useRef, type KeyboardEvent } from 'react';
import { Mail, Phone, Linkedin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import AnimateIn from './AnimateIn';
import PhoneMockup from './PhoneMockup';
import TextCard from './TextCard';
import YesterdayStrip from './YesterdayStrip';
import { NavigableSection } from './NavigableSection';
import { useSectionRegistry } from '@/context/SectionRegistryContext';
import { type Page, type Project, PROJECTS, DEMOS_IN_PROGRESS, CLIENT_SITES, getProjectTypeLabel } from '@/data/projects';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

function RotatingProjectCell({
  project,
  onOpen,
  intervalMs = 3500,
  staggerOffsetMs = 0,
}: {
  project: Project;
  onOpen: () => void;
  intervalMs?: number;
  staggerOffsetMs?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const images = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.screenshot];
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || images.length < 2) return;
    let intervalId: number | undefined;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        if (!pausedRef.current) {
          setIndex((i) => (i + 1) % images.length);
        }
      }, intervalMs);
    }, staggerOffsetMs);
    return () => {
      window.clearTimeout(startId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [images.length, intervalMs, staggerOffsetMs, prefersReducedMotion]);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      className="group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black p-5 md:p-7 flex flex-col h-full transition-colors hover:bg-white/[0.02]"
    >
      <div
        className="relative w-full overflow-hidden mb-5"
        style={{ aspectRatio: '4 / 5', backgroundColor: '#000000' }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.img
            key={images[index]}
            src={images[index]}
            alt={project.alt}
            className="absolute inset-0 w-full h-full object-contain"
            loading="lazy"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </AnimatePresence>
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className="block h-[3px] w-5 transition-opacity"
                style={{ backgroundColor: '#ffffff', opacity: i === index ? 0.9 : 0.25 }}
              />
            ))}
          </div>
        )}
      </div>
      <span
        className="inline-block self-start mb-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
        style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
      >
        {getProjectTypeLabel(project.type)}
      </span>
      <h3 className="text-base md:text-lg font-bold mb-2 tracking-tight leading-snug" style={{ color: '#ffffff' }}>
        {project.title}
      </h3>
      <p className="text-[13px] leading-snug" style={{ color: '#a1a1a6' }}>
        {project.description}
      </p>
    </div>
  );
}

const RECOMMENDATIONS = [
  {
    quote: 'I hired Tom as a marketing consultant to assist my technology company with revamping our website, implementing and understanding web analytics, and other marketing tasks. In short, Tom delivered everything he promised, and more. He\u2019s easy to work with, communicates quickly and does a great job explaining things. When he provides instructions, they\u2019re clear, concise and easy to follow. We all enjoy the fact that Tom under-promises and over-delivers. It\u2019s always nice to feel like you got a bit more than you paid for; Tom has mastered that delivery! I recommend Tom to any marketing team looking for a professional, intelligent team-member that\u2019s not afraid to get his hands dirty.',
    highlight: 'Tom under-promises and over-delivers.',
    name: 'Kurt Simione',
    role: 'TechxRev, Client',
    initials: 'KS',
    href: 'https://techxrev-rebuild.vercel.app',
  },
  {
    quote: 'Been working with Tom from Stray Web Design now for a month. The communication and timeliness of his work is outstanding. I could not be happier with the product also. His web design was awesome. Like with any ongoing project, there are always changes that you want made \u2014 never any kickback on this. He listens, then executes. Great new company to deal with. Pricing is also great.',
    highlight: 'He listens, then executes.',
    name: 'Gary P.',
    role: 'Restaurant Owner, Stray Web Design Client',
    initials: 'GP',
    href: 'https://straywebdesign.co',
  },
  {
    quote: 'I had the pleasure of teaching Tom Sesler in both Financial and Managerial Accounting, where he consistently stood out as a top student\u2014earning close to a perfect in each course. What impressed me most was not just Tom\u2019s mastery of the material, but his ability to connect concepts and apply them thoughtfully to real business situations. He was an active participant in class discussions, often raising insightful questions and offering perspectives that pushed conversations deeper. Tom was always prepared, met every deadline, and demonstrated a professional and focused mindset from day one. He\u2019s exactly the kind of driven, analytical thinker that any team would be lucky to have.',
    highlight: 'Exactly the kind of driven, analytical thinker any team would be lucky to have.',
    name: 'Scott Berube',
    role: 'Principal Lecturer of Accounting, UNH',
    initials: 'SB',
  },
  {
    quote: 'Thomas stood out immediately in my Organizational Behavior class\u2014not just because of how well he performed, but because of how he showed up. He was consistently engaged in discussions, brought thoughtful ideas into the room, and had a knack for raising the level of conversation without ever needing to dominate it. What impressed me most was his ability to balance strategic thinking with collaboration. He worked seamlessly with his team, contributing in a way that moved the group forward and made others better. If you\u2019re looking for someone in marketing who brings emotional intelligence, strong execution, and a team-first mindset, Thomas is someone I\u2019d recommend without hesitation!',
    highlight: 'Strategic thinking with collaboration \u2014 he made others better.',
    name: 'Nikhil Awasty',
    role: 'Assistant Professor, UNH',
    initials: 'NA',
  },
  {
    quote: 'I had the pleasure of teaching Tom in my Quantitative Decision Making course at UNH Paul College of Business in Fall 2024. Known for its rigorous blend of operations theory and quantitative analysis, this course is one of the more challenging in the curriculum. Tom stood out as an engaged and dedicated student. Tom excelled academically and brought a positive, proactive attitude to class and office hours. His thoughtful contributions and strong work ethic were greatly appreciated. I am confident in Tom\u2019s bright future and highly recommend him for any graduate program or professional opportunity.',
    highlight: 'Confident in Tom\u2019s bright future \u2014 highly recommend.',
    name: 'Russell Miles',
    role: 'Operations / Supply Chain, UNH',
    initials: 'RM',
  },
];

const HERO_TEXT = 'PRODUCT DESIGNER';
const CONTACT_LINKS = [
  { icon: Phone, label: 'Phone', href: 'tel:+18149640081', external: false },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tom-sesler/', external: true },
  { icon: Mail, label: 'Email', href: 'mailto:tom@straydesign.co', external: false },
];

function HeroTextReveal({ text }: { text: string }) {
  const prefersReducedMotion = useReducedMotion();
  const chars = text.split('');

  if (prefersReducedMotion) {
    return (
      <h1
        className="text-[36px] sm:text-[48px] md:text-[72px] leading-none tracking-wide sm:tracking-wider font-black mb-4 md:mb-6 max-w-full break-words"
        style={{
          fontFamily: "var(--font-family-bungee), sans-serif",
          WebkitTextStroke: '3px #ffffff',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          paintOrder: 'stroke fill',
        }}
      >
        {text}
      </h1>
    );
  }

  return (
    <h1
      className="text-[36px] sm:text-[48px] md:text-[72px] leading-none tracking-wide sm:tracking-wider font-black mb-4 md:mb-6 max-w-full"
      style={{
        fontFamily: "var(--font-family-bungee), sans-serif",
        WebkitTextStroke: '3px #ffffff',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        paintOrder: 'stroke fill',
      }}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <m.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(12px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.4,
            delay: i * 0.04,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          aria-hidden="true"
        >
          {char === ' ' ? ' ' : char}
        </m.span>
      ))}
    </h1>
  );
}

export default function Home({ setCurrentPage }: HomeProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroTextDuration = HERO_TEXT.length * 0.04 + 0.4;
  const [heroSubNav, setHeroSubNav] = useState(false);
  const [heroSubNavIndex, setHeroSubNavIndex] = useState(0);
  const [expandedRecs, setExpandedRecs] = useState<Set<number>>(new Set());
  const { activeId } = useSectionRegistry();

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
        setHeroSubNavIndex(prev => prev > 0 ? prev - 1 : CONTACT_LINKS.length - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setHeroSubNavIndex(prev => prev < CONTACT_LINKS.length - 1 ? prev + 1 : 0);
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
    <div className="min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">

      {/* 1. HERO */}
      <NavigableSection id="home-hero" label="Hero" onKeyDown={handleHeroKeyDown}>
        <div className="px-6 md:px-16 pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="max-w-7xl mx-auto">
            <TextCard padding="lg">
              <m.p
                className="text-[15px] md:text-[17px] font-medium mb-2"
                style={{ color: '#ffffff' }}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                Tom Sesler
              </m.p>

              <HeroTextReveal text={HERO_TEXT} />

              <m.p
                className="text-[20px] md:text-[24px] mb-6 md:mb-8"
                style={{ color: '#ffffff', fontWeight: 600 }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: heroTextDuration }}
              >
                I build what I wish existed, then ship it.
              </m.p>

              <m.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: heroTextDuration + 0.15 }}
              >
                <p className="text-[15px] md:text-[17px] leading-snug max-w-3xl" style={{ color: '#ffffff' }}>
                  Every project here started with a real problem I experienced firsthand — as a DoorDash driver, a beer merchandiser, or someone who couldn&apos;t find the right tool. I designed and built each one from scratch.
                </p>
              </m.div>

              {/* Contact pills */}
              <m.div
                className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 md:gap-4"
                initial="hidden"
                animate="visible"
                variants={prefersReducedMotion ? {} : {
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1, delayChildren: heroTextDuration + 0.35 } },
                }}
              >
                {CONTACT_LINKS.map((link, i) => (
                  <m.a
                    key={link.label}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="inline-flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
                    style={{
                      backgroundColor: '#111111',
                      color: '#ffffff',
                      borderRadius: 0,
                      ...(heroSubNav && heroSubNavIndex === i ? { outline: '2px solid #ffffff', outlineOffset: '2px' } : {}),
                    }}
                    variants={prefersReducedMotion ? {} : {
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                    }}
                  >
                    <link.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </m.a>
                ))}
              </m.div>

              <YesterdayStrip delay={heroTextDuration + 0.55} />
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* 2. WORK — featured project + supporting grid */}
      {/* 2. WORK — one card per project, phone + info together */}
      <div className="px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-[90rem] mx-auto">
          <TextCard padding="md" className="inline-block mb-10 md:mb-14">
            <h2
              className="text-[36px] md:text-[56px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
            >
              WORK
            </h2>
          </TextCard>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{
              border: '1px solid rgba(255,255,255,0.14)',
              backgroundColor: 'rgba(255,255,255,0.14)',
            }}
          >
            {PROJECTS.map((project, i) => (
              <NavigableSection
                key={project.id}
                id={`work-${project.slug}`}
                label={project.title}
                style={{ backgroundColor: '#000000' }}
              >
                <RotatingProjectCell
                  project={project}
                  onOpen={() => setCurrentPage(project.id)}
                  staggerOffsetMs={i * 600}
                />
              </NavigableSection>
            ))}
            {/* Filler CTA cell — completes the 3×2 grid */}
            <a
              href="#home-contact"
              style={{ backgroundColor: '#000000' }}
              className="group p-5 md:p-7 flex flex-col items-center justify-center text-center transition-colors hover:bg-white/[0.03] outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-3" style={{ color: '#a1a1a6' }}>
                Up next
              </p>
              <p
                className="text-2xl md:text-3xl leading-tight tracking-tight mb-4"
                style={{ color: '#ffffff', fontFamily: "var(--font-family-bungee), sans-serif" }}
              >
                YOUR
                <br />
                PROBLEM.
              </p>
              <span
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all group-hover:scale-105"
                style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
              >
                Let&apos;s talk
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* 3a. CLIENT SITES — live sites shipped for paying clients */}
      <div className="px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-[90rem] mx-auto">
          <TextCard padding="md" className="inline-block mb-4">
            <h2
              className="text-[36px] md:text-[56px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
            >
              CLIENT SITES
            </h2>
          </TextCard>
          <TextCard padding="sm" className="inline-block mb-10 md:mb-14 max-w-2xl">
            <p className="text-sm md:text-base" style={{ color: '#a1a1a6' }}>
              Sites I designed, built, and host for working businesses.
            </p>
          </TextCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CLIENT_SITES.map((site) => (
              <NavigableSection key={site.href} id={`client-${site.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`} label={site.title}>
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-sm h-full"
                >
                  <TextCard padding="md" className="h-full">
                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 h-full">
                      <div
                        className="relative w-full sm:w-[42%] flex-shrink-0 overflow-hidden mx-auto"
                        style={{ aspectRatio: '9 / 19.5', maxWidth: '14rem', backgroundColor: '#000000', borderRadius: '14px' }}
                      >
                        <m.img
                          src={site.screenshot}
                          alt={site.alt}
                          className="absolute inset-0 w-full h-full object-cover object-top"
                          loading="lazy"
                          whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <span
                          className="inline-block self-start mb-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                          style={{ backgroundColor: '#22c55e', color: '#000000', borderRadius: 0 }}
                        >
                          Live client site
                        </span>
                        <h3 className="text-lg md:text-xl font-bold mb-1 tracking-tight" style={{ color: '#ffffff' }}>
                          {site.title}
                        </h3>
                        <p className="text-xs mb-3" style={{ color: '#a1a1a6', opacity: 0.7 }}>
                          {site.category}
                        </p>
                        <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: '#a1a1a6' }}>
                          {site.blurb}
                        </p>
                        <span
                          className="inline-flex items-center gap-1.5 self-start px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all group-hover:scale-105"
                          style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
                        >
                          Visit site <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </TextCard>
                </a>
              </NavigableSection>
            ))}
          </div>
        </div>
      </div>

      {/* 3b. IN PROGRESS — live demo links for active client builds */}
      <div className="px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-[90rem] mx-auto">
          <TextCard padding="md" className="inline-block mb-4">
            <h2
              className="text-[36px] md:text-[56px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
            >
              IN PROGRESS
            </h2>
          </TextCard>
          <TextCard padding="sm" className="inline-block mb-10 md:mb-14 max-w-2xl">
            <p className="text-sm md:text-base" style={{ color: '#a1a1a6' }}>
              Live demos I&apos;m actively building for prospective clients. Open to feedback.
            </p>
          </TextCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMOS_IN_PROGRESS.map((demo) => {
              const isPaused = demo.paused || !demo.href;
              const cardBody = (
                <TextCard padding="md" className="h-full flex flex-col">
                  <span
                    className="inline-block self-start mb-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: isPaused ? 'transparent' : '#111111',
                      color: isPaused ? '#a1a1a6' : '#ffffff',
                      border: isPaused ? '1px solid #3a3a3a' : 'none',
                      borderRadius: 0,
                    }}
                  >
                    {isPaused ? 'On the backburner' : 'Live demo'}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold mb-1 tracking-tight" style={{ color: '#ffffff' }}>
                    {demo.title}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: '#a1a1a6', opacity: 0.7 }}>
                    {demo.category}
                  </p>
                  <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: '#a1a1a6' }}>
                    {demo.blurb}
                  </p>
                  {isPaused ? (
                    <span
                      className="inline-flex items-center gap-1.5 self-start px-4 py-2 text-xs font-bold uppercase tracking-wider"
                      style={{ border: '1px solid #3a3a3a', color: '#a1a1a6', borderRadius: 0 }}
                    >
                      Paused
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1.5 self-start px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all group-hover:scale-105"
                      style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
                    >
                      View live <ExternalLink className="w-3 h-3" />
                    </span>
                  )}
                </TextCard>
              );
              return (
                <NavigableSection key={demo.title} id={`demo-${demo.title.toLowerCase().replace(/\s+/g, '-')}`} label={demo.title}>
                  {isPaused ? (
                    <div className="block h-full">{cardBody}</div>
                  ) : (
                    <a
                      href={demo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-sm h-full"
                    >
                      {cardBody}
                    </a>
                  )}
                </NavigableSection>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. RECOMMENDATIONS — one card per person */}
      <div className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-[90rem] mx-auto">
          <TextCard padding="md" className="inline-block mb-10 md:mb-14">
            <h2
              className="text-[28px] md:text-[56px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
            >
              KIND WORDS
            </h2>
          </TextCard>

          <div className="flex flex-col gap-8">
            {RECOMMENDATIONS.map((rec, i) => {
              const isExpanded = expandedRecs.has(i);
              return (
                <NavigableSection key={i} id={`rec-${rec.initials.toLowerCase()}`} label={rec.name}>
                  <TextCard padding="lg">
                    <p className="text-lg md:text-xl font-bold leading-relaxed mb-4" style={{ color: '#ffffff' }}>
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
                          <p className="text-sm leading-relaxed mb-4" style={{ color: '#a1a1a6' }}>
                            {rec.quote}
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>
                    <button
                      onClick={() => toggleRec(i)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium mb-6 transition-colors"
                      style={{ color: '#a1a1a6' }}
                    >
                      {isExpanded ? (
                        <>Read less <ChevronUp className="w-3 h-3" /></>
                      ) : (
                        <>Read more <ChevronDown className="w-3 h-3" /></>
                      )}
                    </button>
                    <div className="flex items-center gap-3">
                      {rec.href ? (
                        <a href={rec.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                          <div className="w-10 h-10 flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}>
                            {rec.initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold group-hover:underline" style={{ color: '#ffffff' }}>{rec.name}</p>
                            <p className="text-xs" style={{ color: '#a1a1a6' }}>{rec.role}</p>
                          </div>
                        </a>
                      ) : (
                        <>
                          <div className="w-10 h-10 flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#111111', color: '#ffffff', borderRadius: 0 }}>
                            {rec.initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold" style={{ color: '#ffffff' }}>{rec.name}</p>
                            <p className="text-xs" style={{ color: '#a1a1a6' }}>{rec.role}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </TextCard>
                </NavigableSection>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. GET IN TOUCH — with visual flair */}
      <NavigableSection id="home-contact" label="Get in Touch">
      <AnimateIn direction="up" className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <TextCard padding="lg">
            <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: '#ffffff' }}>
              Got something interesting?
            </p>
            <h2
              className="text-[32px] md:text-[48px] mb-4 leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
            >
              GET IN TOUCH
            </h2>
            <p className="text-base md:text-lg mb-10 max-w-md mx-auto" style={{ color: '#a1a1a6' }}>
              I&apos;m always up for a good problem to solve. Send me what you&apos;re working on.
            </p>
            <a
              href="mailto:tom@straydesign.co"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03]"
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                borderRadius: 0,
              }}
            >
              <Mail className="w-5 h-5" />
              tom@straydesign.co
            </a>
          </TextCard>
        </div>
      </AnimateIn>
      </NavigableSection>

      {/* 6. FOOTER SPACER */}
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
