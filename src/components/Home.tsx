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
import { type Page, type Project, PROJECTS, SHOWCASE_DEMOS, getProjectTypeLabel } from '@/data/projects';

/**
 * Pick legible "on-color" text (near-black or white) for a solid background,
 * choosing whichever yields the higher WCAG contrast. Keeps near-black on
 * light brand accents and flips to white on dark ones so accent chips/badges
 * stay readable instead of vanishing (e.g. #0b0b0b on a deep teal).
 */
function onAccentInk(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length < 6) return '#0b0b0b';
  const toLin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const r = toLin(parseInt(h.slice(0, 2), 16) / 255);
  const g = toLin(parseInt(h.slice(2, 4), 16) / 255);
  const b = toLin(parseInt(h.slice(4, 6), 16) / 255);
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // Crossover (vs #0b0b0b / #fff) sits at L ≈ 0.186 — above it dark text wins.
  return L > 0.186 ? '#0b0b0b' : '#ffffff';
}

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

  const hasCase = !!project.caseStudy;
  const live = project.liveUrl;
  return (
    <div
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      className="group p-5 md:p-7 flex flex-col h-full transition-colors hover:bg-black/[0.02]"
    >
      <button
        type="button"
        onClick={hasCase ? onOpen : undefined}
        aria-label={hasCase ? `View ${project.title} case study` : project.title}
        className={`relative w-full overflow-hidden mb-5 block ${hasCase ? 'cursor-pointer' : 'cursor-default'} outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]`}
        style={{ aspectRatio: '4 / 5', backgroundColor: 'var(--paper)' }}
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
                style={{ backgroundColor: '#fff', opacity: i === index ? 0.9 : 0.25 }}
              />
            ))}
          </div>
        )}
      </button>
      <span
        className="inline-block self-start mb-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
        style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}
      >
        {getProjectTypeLabel(project.type)}
      </span>
      <h3 className="text-base md:text-lg font-bold mb-2 tracking-tight leading-snug" style={{ color: 'var(--ink)' }}>
        {project.title}
      </h3>
      <p className="text-[13px] leading-snug flex-1" style={{ color: 'var(--ink-2)' }}>
        {project.description}
      </p>
      {(hasCase || live) && (
        <div className="flex flex-wrap gap-2 mt-4">
          {hasCase && (
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]"
              style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}
            >
              View case study
            </button>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)]"
              style={{
                backgroundColor: hasCase ? 'transparent' : 'var(--ink)',
                color: hasCase ? 'var(--ink)' : 'var(--paper)',
                border: hasCase ? '1px solid rgba(var(--hairline),0.4)' : 'none',
                borderRadius: 0,
              }}
            >
              Try site <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
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
          WebkitTextStroke: '3px var(--ink)',
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
        WebkitTextStroke: '3px var(--ink)',
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
                style={{ color: 'var(--ink)' }}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                Tom Sesler
              </m.p>

              <HeroTextReveal text={HERO_TEXT} />

              <m.p
                className="text-[20px] md:text-[24px] mb-6 md:mb-8"
                style={{ color: 'var(--ink)', fontWeight: 600 }}
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
                <p className="text-[15px] md:text-[17px] leading-snug max-w-3xl" style={{ color: 'var(--ink)' }}>
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
                      backgroundColor: 'var(--chip)',
                      color: 'var(--ink)',
                      border: '1px solid rgba(var(--hairline),0.08)',
                      borderRadius: 0,
                      ...(heroSubNav && heroSubNavIndex === i ? { outline: '2px solid var(--ink)', outlineOffset: '2px' } : {}),
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
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: 'var(--ink)' }}
            >
              WORK
            </h2>
          </TextCard>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{
              border: '1px solid rgba(var(--hairline),0.14)',
              backgroundColor: 'rgba(var(--hairline),0.14)',
            }}
          >
            {PROJECTS.map((project, i) => (
              <NavigableSection
                key={project.id}
                id={`work-${project.slug}`}
                label={project.title}
                style={{ backgroundColor: 'var(--paper)' }}
              >
                <RotatingProjectCell
                  project={project}
                  onOpen={() => setCurrentPage(project.id)}
                  staggerOffsetMs={i * 600}
                />
              </NavigableSection>
            ))}
            {/* Filler CTA cell — completes the 3×2 grid (keyboard-navigable) */}
            <NavigableSection
              id="work-cta"
              label="Let's talk"
              style={{ backgroundColor: 'var(--paper)' }}
            >
              <a
                href="#home-contact"
                className="group h-full p-5 md:p-7 flex flex-col items-center justify-center text-center transition-colors hover:bg-black/[0.03] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)] focus-visible:ring-inset"
              >
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--ink-2)' }}>
                  Up next
                </p>
                <p
                  className="text-2xl md:text-3xl leading-tight tracking-tight mb-4"
                  style={{ color: 'var(--ink)', fontFamily: "var(--font-family-bungee), sans-serif" }}
                >
                  YOUR
                  <br />
                  PROBLEM.
                </p>
                <span
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all group-hover:scale-105"
                  style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}
                >
                  Let&apos;s talk
                </span>
              </a>
            </NavigableSection>
          </div>
        </div>
      </div>

      {/* 3a. LIVE SITES — real businesses, live and clickable */}
      <div className="px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-[90rem] mx-auto">
          <TextCard padding="md" className="inline-block mb-4">
            <h2
              className="text-[36px] md:text-[56px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: 'var(--ink)' }}
            >
              LIVE SITES
            </h2>
          </TextCard>
          <TextCard padding="sm" className="inline-block mb-10 md:mb-14 max-w-2xl">
            <p className="text-sm md:text-base" style={{ color: 'var(--ink-2)' }}>
              Real businesses I designed and built — open and click through any of them.
            </p>
          </TextCard>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ border: '1px solid rgba(var(--hairline),0.14)', backgroundColor: 'rgba(var(--hairline),0.14)' }}
          >
            {SHOWCASE_DEMOS.map((d) => (
              <NavigableSection
                key={d.href}
                id={`demo-${d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}
                label={d.title}
                style={{ backgroundColor: 'var(--paper)' }}
              >
                <a
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-full flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)] focus-visible:ring-inset"
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 5', backgroundColor: 'var(--paper)' }}>
                    <m.img
                      src={d.screenshot}
                      alt={d.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 pointer-events-none"
                      style={{ height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))' }}
                    />
                    <span
                      className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{ backgroundColor: d.accent, color: onAccentInk(d.accent), borderRadius: 0 }}
                    >
                      {d.badge}
                    </span>
                    <h3 className="absolute bottom-3 left-4 right-4 text-white font-black leading-tight tracking-tight" style={{ fontSize: '18px' }}>
                      {d.title}
                    </h3>
                    <div className="absolute bottom-0 left-0 w-full" style={{ height: '4px', backgroundColor: d.accent }} />
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col" style={{ backgroundColor: 'var(--paper)' }}>
                    <p className="text-xs mb-2" style={{ color: 'var(--ink-2)' }}>{d.category}</p>
                    <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--ink-2)' }}>{d.blurb}</p>
                    <span
                      className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all group-hover:scale-105"
                      style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}
                    >
                      Visit live <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              </NavigableSection>
            ))}
          </div>
        </div>
      </div>

      {/* 4. RECOMMENDATIONS — one card per person */}
      <div className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-[90rem] mx-auto">
          <TextCard padding="md" className="inline-block mb-10 md:mb-14">
            <h2
              className="text-[28px] md:text-[56px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: 'var(--ink)' }}
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
                    <p className="text-lg md:text-xl font-bold leading-relaxed mb-4" style={{ color: 'var(--ink)' }}>
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
                          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-2)' }}>
                            {rec.quote}
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>
                    <button
                      onClick={() => toggleRec(i)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium mb-6 transition-colors"
                      style={{ color: 'var(--ink-2)' }}
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
                          <div className="w-10 h-10 flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}>
                            {rec.initials}
                          </div>
                          <div>
                            <p className="text-sm font-bold group-hover:underline" style={{ color: 'var(--ink)' }}>{rec.name}</p>
                            <p className="text-xs" style={{ color: 'var(--ink-2)' }}>{rec.role}</p>
                          </div>
                        </a>
                      ) : (
                        <>
                          <div className="w-10 h-10 flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'var(--chip)', color: 'var(--ink)', borderRadius: 0 }}>
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
            <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: 'var(--ink)' }}>
              Got something interesting?
            </p>
            <h2
              className="text-[32px] md:text-[48px] mb-4 leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: 'var(--ink)' }}
            >
              GET IN TOUCH
            </h2>
            <p className="text-base md:text-lg mb-10 max-w-md mx-auto" style={{ color: 'var(--ink-2)' }}>
              I&apos;m always up for a good problem to solve. Send me what you&apos;re working on.
            </p>
            <a
              href="mailto:tom@straydesign.co"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03]"
              style={{
                backgroundColor: 'var(--ink)',
                color: 'var(--paper)',
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
