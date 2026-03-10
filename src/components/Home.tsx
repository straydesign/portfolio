'use client';

import { Mail, Phone, Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import Carousel from './Carousel';
import PhoneMockup from './PhoneMockup';
import ContactForm from './ContactForm';
import { type Page, PROJECTS, getProjectTypeLabel } from '@/data/projects';
import { CAROUSEL_ITEMS } from '@/data/carousel';

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
    highlight: 'Strategic thinking with collaboration — he made others better.',
    name: 'Nikhil Awasty',
    role: 'Assistant Professor, UNH',
    initials: 'NA',
  },
  {
    quote: 'I had the pleasure of teaching Tom in my Quantitative Decision Making course at UNH Paul College of Business in Fall 2024. Known for its rigorous blend of operations theory and quantitative analysis, this course is one of the more challenging in the curriculum. Tom stood out as an engaged and dedicated student. Tom excelled academically and brought a positive, proactive attitude to class and office hours. His thoughtful contributions and strong work ethic were greatly appreciated. I am confident in Tom\u2019s bright future and highly recommend him for any graduate program or professional opportunity.',
    highlight: 'Confident in Tom\u2019s bright future — highly recommend.',
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

function HeroTextReveal({ text, primaryColor }: { text: string; primaryColor: string }) {
  const prefersReducedMotion = useReducedMotion();
  const chars = text.split('');

  if (prefersReducedMotion) {
    return (
      <h1
        className="text-[36px] sm:text-[48px] md:text-[72px] leading-none tracking-wide sm:tracking-wider font-black mb-4 md:mb-6 max-w-full break-words"
        style={{
          fontFamily: "var(--font-family-bungee), sans-serif",
          WebkitTextStroke: `3px ${primaryColor}`,
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
        WebkitTextStroke: `3px ${primaryColor}`,
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
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const onPrimary = cardStyles.getOnPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);
  const badgeBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const badgeText = theme === 'dark' ? '#ffffff' : '#1d1d1f';
  const prefersReducedMotion = useReducedMotion();

  const heroTextDuration = HERO_TEXT.length * 0.04 + 0.4;

  return (
    <div className="min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">

      {/* 1. HERO */}
      <div className="px-6 md:px-16 pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-[15px] md:text-[17px] font-medium mb-2"
            style={{ color: textColor }}
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            Tom Sesler
          </motion.p>

          <HeroTextReveal text={HERO_TEXT} primaryColor={primaryColor} />

          <motion.p
            className="text-[20px] md:text-[24px] mb-6 md:mb-8"
            style={{ color: primaryColor, fontWeight: 600 }}
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
            <p className="text-[15px] md:text-[17px] leading-snug max-w-3xl" style={{ color: textColor }}>
              Ethnographic fieldwork, real user observation, and actual data — not assumptions. Marketing background means I design for business outcomes, not just pixels.
            </p>
            <p className="text-[13px] md:text-[15px] mt-4 leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
                style={{ backgroundColor: badgeBg, color: badgeText }}
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
        </div>
      </div>

      {/* 2. AUTO-SCROLL SCREENSHOT CAROUSEL */}
      <div className="py-10 md:py-16">
        <Carousel
          speed={40}
          direction="left"
          pauseOnHover
          items={CAROUSEL_ITEMS.map((item) => (
            <video
              key={item.src}
              src={item.src}
              className="h-44 md:h-56 w-44 md:w-56 rounded-xl object-cover aspect-square shadow-lg transition-transform duration-300 hover:scale-[1.03]"
              autoPlay
              loop
              muted
              playsInline
              aria-label={item.alt}
            />
          ))}
        />
      </div>

      {/* 3. WORK — featured project + supporting grid */}
      <AnimateIn direction="up" className="px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-baseline gap-4 mb-10 md:mb-14">
            <h2
              className="text-[36px] md:text-[56px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}
            >
              WORK
            </h2>
            <span className="text-sm font-medium" style={{ color: secondaryTextColor }}>
              {PROJECTS.length} projects
            </span>
          </div>

          {/* Featured project (first) — larger, offset layout */}
          {PROJECTS.length > 0 && (
            <AnimateIn direction="up" className="mb-16 md:mb-24">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="w-full md:w-1/2">
                  <PhoneMockup
                    screenshot={PROJECTS[0].screenshot}
                    gradientFrom={primaryColor}
                    gradientTo={theme === 'dark' ? '#000000' : '#1a1a1a'}
                    alt={PROJECTS[0].alt}
                    onClick={() => setCurrentPage(PROJECTS[0].id)}
                    introVideoSrc={PROJECTS[0].introVideoSrc}
                    size="large"
                  />
                </div>
                <div className="w-full md:w-1/2 md:py-8">
                  <span
                    className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: PROJECTS[0].type === 'case-study' ? primaryColor : badgeBg,
                      color: PROJECTS[0].type === 'case-study' ? onPrimary : badgeText,
                    }}
                  >
                    {getProjectTypeLabel(PROJECTS[0].type)}
                  </span>
                  <h3
                    className="text-2xl md:text-4xl font-bold mb-3 tracking-tight"
                    style={{ color: textColor }}
                  >
                    {PROJECTS[0].title}
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: secondaryTextColor }}>
                    {PROJECTS[0].description}
                  </p>
                  <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: primaryColor }}>
                    {PROJECTS[0].deliverable}
                  </p>
                  <button
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105"
                    style={{ backgroundColor: primaryColor, color: onPrimary }}
                    onClick={() => setCurrentPage(PROJECTS[0].id)}
                  >
                    View {getProjectTypeLabel(PROJECTS[0].type)}
                  </button>
                </div>
              </div>
            </AnimateIn>
          )}

          {/* Remaining projects — 2-column grid */}
          {PROJECTS.length > 1 && (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12" staggerDelay={0.15}>
              {PROJECTS.slice(1).map((project) => (
                <StaggerItem key={project.id}>
                  <div className="relative">
                    <span
                      className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: project.type === 'case-study' ? primaryColor : badgeBg,
                        color: project.type === 'case-study' ? onPrimary : badgeText,
                      }}
                    >
                      {getProjectTypeLabel(project.type)}
                    </span>
                    <PhoneMockup
                      screenshot={project.screenshot}
                      gradientFrom={primaryColor}
                      gradientTo={theme === 'dark' ? '#000000' : '#1a1a1a'}
                      title={project.title}
                      description={project.description}
                      deliverable={project.deliverable}
                      alt={project.alt}
                      textColor={textColor}
                      secondaryTextColor={secondaryTextColor}
                      onClick={() => setCurrentPage(project.id)}
                      introVideoSrc={project.introVideoSrc}
                    />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </AnimateIn>

      {/* 4. RECOMMENDATIONS */}
      <AnimateIn direction="up" className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-[90rem] mx-auto">
          <div className="flex items-baseline gap-4 mb-10 md:mb-14">
            <h2
              className="text-[28px] md:text-[56px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}
            >
              KIND WORDS
            </h2>
          </div>

          {/* Featured quote — first rec gets special treatment */}
          <AnimateIn direction="up" className="mb-12 md:mb-16">
            <div
              className="p-6 md:p-10 rounded-2xl relative"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
                borderLeft: `4px solid ${primaryColor}`,
              }}
            >
              <p className="text-xl md:text-2xl font-bold leading-relaxed mb-6" style={{ color: textColor }}>
                &ldquo;{RECOMMENDATIONS[0].highlight}&rdquo;
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: secondaryTextColor }}>
                {RECOMMENDATIONS[0].quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: primaryColor, color: onPrimary }}
                >
                  {RECOMMENDATIONS[0].initials}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: textColor }}>{RECOMMENDATIONS[0].name}</p>
                  <p className="text-xs" style={{ color: secondaryTextColor }}>{RECOMMENDATIONS[0].role}</p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Remaining recs — compact cards */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {RECOMMENDATIONS.slice(1).map((rec, i) => (
              <StaggerItem key={i}>
                <div
                  className="p-5 rounded-xl h-full flex flex-col"
                  style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' }}
                >
                  <p className="text-base font-semibold leading-snug mb-4 flex-1" style={{ color: textColor }}>
                    &ldquo;{rec.highlight}&rdquo;
                  </p>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: secondaryTextColor }}>
                    {rec.quote}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                    >
                      {rec.initials}
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: textColor }}>{rec.name}</p>
                      <p className="text-xs" style={{ color: secondaryTextColor }}>{rec.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimateIn>

      {/* 5. GET IN TOUCH — with visual flair */}
      <AnimateIn direction="up" className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: primaryColor }}>
            Let&apos;s collaborate
          </p>
          <h2
            className="text-[32px] md:text-[48px] mb-4 leading-none tracking-wider font-black"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}
          >
            GET IN TOUCH
          </h2>
          <p className="text-base md:text-lg mb-10 max-w-md mx-auto" style={{ color: secondaryTextColor }}>
            Have a project in mind? I&apos;d love to hear about it.
          </p>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </AnimateIn>

      {/* 6. FOOTER SPACER */}
      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
