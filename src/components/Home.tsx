'use client';

import { Mail, Phone, Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import Carousel from './Carousel';
import CarouselPhoneCard from './CarouselPhoneCard';
import PhoneMockup from './PhoneMockup';
import ContactForm from './ContactForm';
import TextCard from './TextCard';
import { type Page, PROJECTS, getProjectTypeLabel } from '@/data/projects';
import { CAROUSEL_ITEMS } from '@/data/carousel';
import { useLightDirection } from '@/hooks/useLightDirection';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

const RECOMMENDATIONS = [
  {
    quote: 'I hired Tom as a marketing consultant to assist my technology company with revamping our website, implementing and understanding web analytics, and other marketing tasks. In short, Tom delivered everything he promised, and more. He\u2019s easy to work with, communicates quickly and does a great job explaining things. When he provides instructions, they\u2019re clear, concise and easy to follow. We all enjoy the fact that Tom under-promises and over-delivers. It\u2019s always nice to feel like you got a bit more than you paid for; Tom has mastered that delivery! I recommend Tom to any marketing team looking for a professional, intelligent team-member that\u2019s not afraid to get his hands dirty.',
    highlight: 'Tom under-promises and over-delivers.',
    name: 'Kurt Simione',
    role: 'TechxRev, Client',
    initials: 'KS',
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
        <motion.span
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
        </motion.span>
      ))}
    </h1>
  );
}

export default function Home({ setCurrentPage }: HomeProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroTextDuration = HERO_TEXT.length * 0.04 + 0.4;
  const lightRef = useLightDirection();

  return (
    <div className="min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">

      {/* 1. HERO */}
      <div className="px-6 md:px-16 pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto">
          <TextCard padding="lg">
            <motion.p
              className="text-[15px] md:text-[17px] font-medium mb-2"
              style={{ color: '#ffffff' }}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              Tom Sesler
            </motion.p>

            <HeroTextReveal text={HERO_TEXT} />

            <motion.p
              className="text-[20px] md:text-[24px] mb-6 md:mb-8"
              style={{ color: '#ffffff', fontWeight: 600 }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: heroTextDuration }}
            >
              Research-driven. Execution-obsessed.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: heroTextDuration + 0.15 }}
            >
              <p className="text-[15px] md:text-[17px] leading-snug max-w-3xl" style={{ color: '#ffffff' }}>
                Ethnographic fieldwork, real user observation, and actual data — not assumptions. Marketing background means I design for business outcomes, not just pixels.
              </p>
              <p className="text-[13px] md:text-[15px] mt-4 leading-relaxed" style={{ color: '#ffffff', opacity: 0.8 }}>
                New Hampshire / Massachusetts. Open to full-time or remote
              </p>
            </motion.div>

            {/* Contact pills */}
            <motion.div
              className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 md:gap-4"
              initial="hidden"
              animate="visible"
              variants={prefersReducedMotion ? {} : {
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: heroTextDuration + 0.35 } },
              }}
            >
              {CONTACT_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
                  style={{ backgroundColor: '#111111', color: '#ffffff', borderRadius: 0 }}
                  variants={prefersReducedMotion ? {} : {
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                  }}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </TextCard>
        </div>
      </div>

      {/* 2. AUTO-SCROLL SCREENSHOT CAROUSEL */}
      <div className="py-10 md:py-16">
        <Carousel
          speed={40}
          direction="left"
          pauseOnHover
          items={CAROUSEL_ITEMS.map((item) => (
            <CarouselPhoneCard
              key={item.src}
              videoSrc={item.src}
              alt={item.alt}
              lightRef={lightRef}
            />
          ))}
        />
      </div>

      {/* 3. WORK — featured project + supporting grid */}
      <AnimateIn direction="up" className="px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-[90rem] mx-auto">
          <TextCard padding="md" className="inline-block mb-10 md:mb-14">
            <div className="flex items-baseline gap-4">
              <h2
                className="text-[36px] md:text-[56px] leading-none tracking-wider font-black"
                style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
              >
                WORK
              </h2>
              <span className="text-sm font-medium" style={{ color: '#a1a1a6' }}>
                {PROJECTS.length} projects
              </span>
            </div>
          </TextCard>

          {/* All projects — unified split layout (phone left, text right) */}
          {PROJECTS.map((project, i) => (
            <AnimateIn key={project.id} direction="up" className="mb-16 md:mb-24">
              <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2">
                  <PhoneMockup
                    screenshot={project.screenshot}
                    gradientFrom="#888888"
                    gradientTo="#000000"
                    alt={project.alt}
                    onClick={() => setCurrentPage(project.id)}
                    introVideoSrc={project.introVideoSrc}
                    size="large"
                  />
                </div>
                <div className="w-full md:w-1/2 md:py-8">
                  <TextCard padding="lg">
                    <span
                      className="inline-block mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: project.type === 'case-study' ? '#ffffff' : '#111111',
                        color: project.type === 'case-study' ? '#000000' : '#ffffff',
                        borderRadius: 0,
                      }}
                    >
                      {getProjectTypeLabel(project.type)}
                    </span>
                    <h3
                      className="text-2xl md:text-4xl font-bold mb-3 tracking-tight"
                      style={{ color: '#ffffff' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: '#a1a1a6' }}>
                      {project.description}
                    </p>
                    <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#ffffff' }}>
                      {project.deliverable}
                    </p>
                    <button
                      className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all hover:scale-105"
                      style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
                      onClick={() => setCurrentPage(project.id)}
                    >
                      View {getProjectTypeLabel(project.type)}
                    </button>
                  </TextCard>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </AnimateIn>

      {/* 4. RECOMMENDATIONS */}
      <AnimateIn direction="up" className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-[90rem] mx-auto">
          <TextCard padding="md" className="inline-block mb-10 md:mb-14">
            <h2
              className="text-[28px] md:text-[56px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
            >
              KIND WORDS
            </h2>
          </TextCard>

          {/* Featured quote — first rec gets special treatment */}
          <AnimateIn direction="up" className="mb-12 md:mb-16">
            <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
              <p className="text-xl md:text-2xl font-bold leading-relaxed mb-6" style={{ color: '#ffffff' }}>
                &ldquo;{RECOMMENDATIONS[0].highlight}&rdquo;
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#a1a1a6' }}>
                {RECOMMENDATIONS[0].quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
                >
                  {RECOMMENDATIONS[0].initials}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#ffffff' }}>{RECOMMENDATIONS[0].name}</p>
                  <p className="text-xs" style={{ color: '#a1a1a6' }}>{RECOMMENDATIONS[0].role}</p>
                </div>
              </div>
            </TextCard>
          </AnimateIn>

          {/* Remaining recs — compact cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {RECOMMENDATIONS.slice(1).map((rec, i) => (
              <StaggerItem key={i}>
                <TextCard padding="md" className="h-full flex flex-col">
                  <p className="text-base font-semibold leading-snug mb-4 flex-1" style={{ color: '#ffffff' }}>
                    &ldquo;{rec.highlight}&rdquo;
                  </p>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: '#a1a1a6' }}>
                    {rec.quote}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div
                      className="w-8 h-8 flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: '#111111', color: '#ffffff', borderRadius: 0 }}
                    >
                      {rec.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: '#ffffff' }}>{rec.name}</p>
                      <p className="text-xs" style={{ color: '#a1a1a6' }}>{rec.role}</p>
                    </div>
                  </div>
                </TextCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimateIn>

      {/* 5. GET IN TOUCH — with visual flair */}
      <AnimateIn direction="up" className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <TextCard padding="lg">
            <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: '#ffffff' }}>
              Let&apos;s collaborate
            </p>
            <h2
              className="text-[32px] md:text-[48px] mb-4 leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
            >
              GET IN TOUCH
            </h2>
            <p className="text-base md:text-lg mb-10 max-w-md mx-auto" style={{ color: '#a1a1a6' }}>
              Have a project in mind? I&apos;d love to hear about it.
            </p>
            <div className="max-w-md mx-auto">
              <ContactForm />
            </div>
          </TextCard>
        </div>
      </AnimateIn>

      {/* 6. FOOTER SPACER */}
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
