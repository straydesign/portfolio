'use client';

import { useState } from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import Carousel from './Carousel';
import PhoneMockup from './PhoneMockup';
import ContactForm from './ContactForm';

type Page = 'home' | 'about' | 'work' | 'resume' | 'middleman-case-study' | 'day-one-case-study' | 'doordash-case-study' | 'services';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

const CAROUSEL_ITEMS = [
  { src: '/images/carousel/mm-login.mp4', alt: 'Middleman login flow' },
  { src: '/images/carousel/fd-landing.mp4', alt: 'FirstDay landing page' },
  { src: '/images/carousel/mm-dashboard.mp4', alt: 'Middleman dashboard overview' },
  { src: '/images/carousel/fd-login.mp4', alt: 'FirstDay login flow' },
  { src: '/images/carousel/mm-orders.mp4', alt: 'Middleman orders tab' },
  { src: '/images/carousel/fd-goal-create.mp4', alt: 'FirstDay goal creation + plan generation' },
  { src: '/images/carousel/mm-stock.mp4', alt: 'Middleman stock management' },
  { src: '/images/carousel/fd-calendar.mp4', alt: 'FirstDay calendar + day view' },
  { src: '/images/carousel/mm-store-switch.mp4', alt: 'Middleman store switcher' },
  { src: '/images/carousel/fd-complete-day.mp4', alt: 'FirstDay completing activities' },
  { src: '/images/carousel/mm-route.mp4', alt: 'Middleman route map' },
  { src: '/images/carousel/fd-achievements.mp4', alt: 'FirstDay achievements + stats' },
  { src: '/images/carousel/mm-nav-flow.mp4', alt: 'Middleman tab navigation' },
  { src: '/images/carousel/mm-settings.mp4', alt: 'Middleman settings' },
];

const CASE_STUDY = {
  id: 'doordash-case-study' as const,
  title: 'DOORDASH DASHER APP',
  description: 'Ethnographic UX research across 1,000+ deliveries with five redesign proposals.',
  deliverable: 'Heuristic evaluation + 5 redesign concepts',
};

const PROJECTS = [
  {
    id: 'middleman-case-study' as const,
    title: 'MERCHANDISING SYSTEM',
    description: 'Mobile app design to reduce retail stock-outs using real-time POS data.',
    deliverable: 'Full design system + interactive Figma prototype',
  },
  {
    id: 'day-one-case-study' as const,
    title: 'FIRSTDAY.LIFE',
    description: 'AI-powered goal tracker. Designed, built, and shipped as a live product.',
    deliverable: 'Live shipped product + Apple-native design',
  },
];

const RECOMMENDATIONS = [
  {
    quote: 'I hired Tom as a marketing consultant to assist my technology company with revamping our website, implementing and understanding web analytics, and other marketing tasks. In short, Tom delivered everything he promised, and more. He\u2019s easy to work with, communicates quickly and does a great job explaining things. When he provides instructions, they\u2019re clear, concise and easy to follow. We all enjoy the fact that Tom under-promises and over-delivers. It\u2019s always nice to feel like you got a bit more than you paid for; Tom has mastered that delivery! I recommend Tom to any marketing team looking for a professional, intelligent team-member that\u2019s not afraid to get his hands dirty.',
    name: 'Kurt Simione',
    role: 'TechxRev, Client',
  },
  {
    quote: 'I had the pleasure of teaching Tom Sesler in both Financial and Managerial Accounting, where he consistently stood out as a top student\u2014earning close to a perfect in each course. What impressed me most was not just Tom\u2019s mastery of the material, but his ability to connect concepts and apply them thoughtfully to real business situations. He was an active participant in class discussions, often raising insightful questions and offering perspectives that pushed conversations deeper. Tom was always prepared, met every deadline, and demonstrated a professional and focused mindset from day one. He\u2019s exactly the kind of driven, analytical thinker that any team would be lucky to have.',
    name: 'Scott Berube',
    role: 'MSA, CPA, CFE. Principal Lecturer of Accounting, UNH',
  },
  {
    quote: 'Thomas stood out immediately in my Organizational Behavior class\u2014not just because of how well he performed, but because of how he showed up. He was consistently engaged in discussions, brought thoughtful ideas into the room, and had a knack for raising the level of conversation without ever needing to dominate it. What impressed me most was his ability to balance strategic thinking with collaboration. He worked seamlessly with his team, contributing in a way that moved the group forward and made others better. If you\u2019re looking for someone in marketing who brings emotional intelligence, strong execution, and a team-first mindset, Thomas is someone I\u2019d recommend without hesitation!',
    name: 'Nikhil Awasty',
    role: 'Assistant Professor of Organizational Behavior, UNH',
  },
  {
    quote: 'I had the pleasure of teaching Tom in my Quantitative Decision Making course at UNH Paul College of Business in Fall 2024. Known for its rigorous blend of operations theory and quantitative analysis, this course is one of the more challenging in the curriculum. Tom stood out as an engaged and dedicated student. Tom excelled academically and brought a positive, proactive attitude to class and office hours. His thoughtful contributions and strong work ethic were greatly appreciated. I am confident in Tom\u2019s bright future and highly recommend him for any graduate program or professional opportunity.',
    name: 'Russell Miles',
    role: 'Operations / Supply Chain / Business Development',
  },
];

const HERO_TEXT = 'PRODUCT DESIGNER';
const CONTACT_LINKS = [
  { icon: Phone, label: 'Phone', href: 'tel:+18149640081', external: false },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tom-sesler/', external: true },
  { icon: Mail, label: 'Email', href: 'mailto:tlsesler44@gmail.com', external: false },
];

function HeroTextReveal({ text, primaryColor }: { text: string; primaryColor: string }) {
  const prefersReducedMotion = useReducedMotion();
  const chars = text.split('');

  if (prefersReducedMotion) {
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
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  );
}

function InteractiveCard({
  children,
  primaryColor,
  theme,
  onClick,
  ariaLabel,
  className = '',
}: {
  children: React.ReactNode;
  primaryColor: string;
  theme: 'light' | 'dark';
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const defaultBorder = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={ariaLabel}
      className={`cursor-pointer py-4 md:py-6 px-6 rounded-2xl transition-all duration-200 ${className}`}
      style={{
        backgroundColor: theme === 'dark' ? '#000000' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${isHovered ? primaryColor : defaultBorder}`,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}


export default function Home({ setCurrentPage }: HomeProps) {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);
  const badgeBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const badgeText = theme === 'dark' ? '#ffffff' : '#1d1d1f';
  const prefersReducedMotion = useReducedMotion();

  // Total duration of hero text reveal for sequencing subsequent elements
  const heroTextDuration = HERO_TEXT.length * 0.04 + 0.4;

  return (
    <div className="min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">

      {/* ─── 1. HERO (card-less) ─── */}
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
            I live the problem before I solve it.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: heroTextDuration + 0.15 }}
          >
            <p className="text-[15px] md:text-[17px] leading-snug max-w-3xl" style={{ color: textColor }}>
              From ethnographic field research to interactive Figma prototypes to live products.
              Marketing background means I design for users and business outcomes. Closing the gap between design intent and what actually ships.
            </p>
            <p className="text-[13px] md:text-[15px] mt-4 leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
              New Hampshire / Massachusetts. Open to full-time, contract, or remote
            </p>
          </motion.div>

          {/* Contact pills — stagger in */}
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

      {/* ─── 2. AUTO-SCROLL SCREENSHOT CAROUSEL ─── */}
      <div className="py-8 md:py-12">
        <Carousel
          speed={40}
          direction="left"
          pauseOnHover
          items={CAROUSEL_ITEMS.map((item) => (
            <video
              key={item.src}
              src={item.src}
              className="h-48 md:h-64 w-48 md:w-64 rounded-lg object-cover aspect-square"
              autoPlay
              loop
              muted
              playsInline
              aria-label={item.alt}
            />
          ))}
        />
      </div>

      {/* ─── 3. CASE STUDY ─── */}
      <AnimateIn direction="up" className="px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-[90rem] mx-auto">
          <h2
            className="text-[36px] md:text-[56px] mb-8 md:mb-12 leading-none tracking-wider font-black"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}
          >
            CASE STUDY
          </h2>
          <InteractiveCard
            primaryColor={primaryColor}
            theme={theme}
            onClick={() => setCurrentPage(CASE_STUDY.id)}
            ariaLabel={`View ${CASE_STUDY.title} case study`}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: textColor }}>
              {CASE_STUDY.title}
            </h3>
            <p className="text-base mb-3" style={{ color: secondaryTextColor }}>
              {CASE_STUDY.description}
            </p>
            <p className="text-sm font-semibold" style={{ color: primaryColor }}>
              {CASE_STUDY.deliverable}
            </p>
          </InteractiveCard>
          <AnimateIn direction="up" delay={0.15} className="mt-8 md:mt-12 max-w-sm">
            <PhoneMockup
              screenshot="/images/mockups/doordash-screen.png"
              gradientFrom={primaryColor}
              gradientTo={theme === 'dark' ? '#000000' : '#1a1a1a'}
              title="DoorDash Dasher App"
              description="Ethnographic UX research + redesign proposals"
              alt="DoorDash Dasher app screenshot"
              textColor={textColor}
              onClick={() => setCurrentPage('doordash-case-study')}
            />
          </AnimateIn>
        </div>
      </AnimateIn>

      {/* ─── 3b. PROJECTS ─── */}
      <AnimateIn direction="up" className="px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-[90rem] mx-auto">
          <h2
            className="text-[36px] md:text-[56px] mb-8 md:mb-12 leading-none tracking-wider font-black"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}
          >
            PROJECTS
          </h2>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-12" staggerDelay={0.12}>
            {PROJECTS.map((project) => (
              <StaggerItem key={project.id}>
                <InteractiveCard
                  primaryColor={primaryColor}
                  theme={theme}
                  onClick={() => setCurrentPage(project.id)}
                  ariaLabel={`View ${project.title} project`}
                >
                  <h3 className="text-xl font-bold mb-2" style={{ color: textColor }}>
                    {project.title}
                  </h3>
                  <p className="text-base mb-3" style={{ color: secondaryTextColor }}>
                    {project.description}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: primaryColor }}>
                    {project.deliverable}
                  </p>
                </InteractiveCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
          {/* Project Demos */}
          <StaggerContainer className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.15}>
            <StaggerItem>
              <PhoneMockup
                screenshot="/images/mockups/middleman-screen.png"
                gradientFrom={primaryColor}
                gradientTo={theme === 'dark' ? '#000000' : '#1a1a1a'}
                title="Merchandising System"
                description="Mobile app to reduce retail stock-outs"
                alt="Middleman app screenshot"
                textColor={textColor}
                onClick={() => setCurrentPage('middleman-case-study')}
              />
            </StaggerItem>
            <StaggerItem>
              <PhoneMockup
                screenshot="/images/mockups/firstday-screen.png"
                gradientFrom={primaryColor}
                gradientTo={theme === 'dark' ? '#000000' : '#1a1a1a'}
                title="FirstDay.Life"
                description="AI-powered goal tracker. Shipped product"
                alt="FirstDay.Life app screenshot"
                textColor={textColor}
                onClick={() => setCurrentPage('day-one-case-study')}
              />
            </StaggerItem>
          </StaggerContainer>
        </div>
      </AnimateIn>

      {/* ─── 5. RECOMMENDATIONS ─── */}
      <AnimateIn direction="up" className="px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-[90rem] mx-auto">
          <h2
            className="text-[28px] md:text-[56px] mb-8 md:mb-12 leading-none tracking-wider font-black"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}
          >
            RECOMMENDATIONS
          </h2>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 md:gap-y-12" staggerDelay={0.1}>
            {RECOMMENDATIONS.map((rec, i) => (
              <StaggerItem key={i}>
                <div
                  className="py-4 md:py-6"
                  style={{ borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` }}
                >
                  <p className="text-base leading-relaxed mb-4" style={{ color: textColor }}>
                    &ldquo;{rec.quote}&rdquo;
                  </p>
                  <p className="text-sm font-bold" style={{ color: textColor }}>
                    {rec.name}
                  </p>
                  <p className="text-sm" style={{ color: secondaryTextColor }}>
                    {rec.role}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </AnimateIn>

      {/* ─── 6. GET IN TOUCH ─── */}
      <AnimateIn direction="up" className="px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-md mx-auto">
          <h2
            className="text-[36px] md:text-[56px] mb-4 leading-none tracking-wider font-black text-center"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}
          >
            GET IN TOUCH
          </h2>
          <p className="text-base mb-8 text-center" style={{ color: secondaryTextColor }}>
            Have a project in mind? Let&apos;s talk.
          </p>
          <ContactForm />
        </div>
      </AnimateIn>

      {/* ─── 7. FOOTER SPACER ─── */}
      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
