'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import { ArrowLeft, ExternalLink, Brain, Calendar, Target } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';
import PhoneMockup from './PhoneMockup';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';

interface DayOneCaseStudyProps {
  onBack: () => void;
}

export default function DayOneCaseStudy({ onBack }: DayOneCaseStudyProps) {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);

  const statBg = theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0, 0, 0, 0.03)';
  const divider = `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`;
  const imgBorder = `2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`;
  const videoBorder = `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`;

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* Back + Live site links */}
        <div className="pt-6 mb-8 flex items-center gap-4">
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: primaryColor }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <a href="https://firstday.life" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-80"
            style={{ backgroundColor: primaryColor, color: accentColor === 'bw' ? (theme === 'dark' ? '#000000' : '#ffffff') : '#ffffff' }}>
            <ExternalLink className="w-4 h-4" /> Visit Live Site
          </a>
        </div>

        {/* HERO */}
        <div className="min-h-[80vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-16" style={{ borderBottom: divider }}>
          <AnimateIn direction="left" className="w-full md:w-1/2">
            <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: primaryColor }}>Project &mdash; Live Product</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>FIRSTDAY.LIFE</h1>
            <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>
              You want to learn guitar. But where do you even start?
            </p>
            <p className="text-base mb-8 leading-relaxed" style={{ color: textColor }}>
              Type your goal. Wake up tomorrow with a plan. Designed, built, and shipped as a live product.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'CONCEPT', value: 'AI turns your goals into daily plans' },
                { label: 'THE GAP', value: 'No tool turns "I want to" into "here\'s what to do today"' },
                { label: 'MY ROLE', value: 'UX Designer & Developer' },
                { label: 'STATUS', value: 'Live at firstday.life' },
              ].map(({ label, value }) => (
                <StaggerItem key={label}>
                  <div>
                    <p className="text-xs font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                    <p className="text-sm" style={{ color: textColor }}>{value}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn direction="right" className="w-full md:w-1/2">
            <PhoneMockup
              screenshot="/images/firstday/mobile-landing.png"
              gradientFrom={primaryColor}
              gradientTo={theme === 'dark' ? '#000000' : '#1a1a1a'}
              alt="FirstDay.Life mobile app"
              introVideoSrc="/videos/firstday-intro.mp4"
              size="large"
            />
          </AnimateIn>
        </div>

        {/* THE FEELING */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <div className="p-6 md:p-10 rounded-2xl" style={{ backgroundColor: statBg, borderLeft: `4px solid ${primaryColor}` }}>
            <p className="text-xl md:text-3xl leading-relaxed font-bold" style={{ color: textColor }}>
              Learning guitar. Spending time with your kids. Saving for a house. Whatever the goal &mdash; you get <span style={{ color: primaryColor }}>three simple things to do today.</span>
            </p>
          </div>
        </AnimateIn>

        {/* THE JOURNEY — main flow videos */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Journey</p>
          <p className="text-xl md:text-2xl font-bold mb-10" style={{ color: textColor }}>
            From &quot;I want to learn guitar&quot; to your third practice session &mdash; in 72 hours.
          </p>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" staggerDelay={0.12}>
            {[
              { src: '/images/carousel/fd-goal-create.mp4', label: 'Type your dream', desc: 'Say what matters in your own words.' },
              { src: '/images/carousel/fd-calendar.mp4', label: 'Get your plan', desc: 'AI turns it into 7 days of action.' },
              { src: '/images/carousel/fd-complete-day.mp4', label: 'Do the work', desc: 'Check off tasks. Watch momentum build.' },
            ].map(({ src, label, desc }, i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <div className="mb-4">
                    <video
                      src={src}
                      className="w-full rounded-2xl"
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-label={label}
                      style={{ aspectRatio: '9/19', objectFit: 'cover', border: videoBorder }}
                    />
                  </div>
                  <p className="text-base font-bold" style={{ color: primaryColor }}>{label}</p>
                  <p className="text-sm mt-1" style={{ color: secondaryTextColor }}>{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* More of the app */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.08}>
            {[
              { src: '/images/carousel/fd-achievements.mp4', label: 'Celebrate wins' },
              { src: '/images/carousel/fd-landing.mp4', label: 'The pitch' },
              { src: '/images/carousel/fd-login.mp4', label: 'Get started' },
            ].map(({ src, label }, i) => (
              <StaggerItem key={i}>
                <div className="text-center">
                  <video
                    src={src}
                    className="w-full rounded-xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={label}
                    style={{ aspectRatio: '9/19', objectFit: 'cover', border: videoBorder }}
                  />
                  <p className="text-xs font-bold mt-2 tracking-wider uppercase" style={{ color: secondaryTextColor }}>{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* THE CORE LOOP */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Core Loop</p>
          <p className="text-xl md:text-2xl font-bold mb-10" style={{ color: primaryColor }}>
            Dream &rarr; Plan &rarr; Do &rarr; Repeat
          </p>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.1}>
            {[
              { icon: Brain, label: 'Set Your Goal', desc: 'No categories. No setup. Just say what matters.' },
              { icon: Calendar, label: 'Get Your Plan', desc: 'Wake up knowing exactly what to do today.' },
              { icon: Target, label: 'Track Progress', desc: 'Three tasks a day. Small wins compound.' },
            ].map(({ icon: Icon, label, desc }) => (
              <StaggerItem key={label}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: statBg }}>
                    <Icon className="w-7 h-7" style={{ color: primaryColor }} />
                  </div>
                  <p className="text-lg font-bold mb-2" style={{ color: textColor }}>{label}</p>
                  <p className="text-sm" style={{ color: secondaryTextColor }}>{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* THE LIVE PRODUCT */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <p className="text-xs font-bold tracking-widest mb-8 uppercase" style={{ color: primaryColor }}>The Live Product</p>
          <div className="flex justify-center mb-10">
            <div>
              <p className="text-xs font-bold mb-3 text-center" style={{ color: secondaryTextColor }}>MOBILE</p>
              <PhoneMockup
                screenshot="/images/firstday/firstday-screen.png"
                gradientFrom={primaryColor}
                gradientTo={theme === 'dark' ? '#000000' : '#1a1a1a'}
                alt="FirstDay.Life mobile app"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-xs font-bold mb-3 text-center" style={{ color: secondaryTextColor }}>DESKTOP</p>
              <ImageWithSkeleton src="/images/firstday/desktop-landing.png" alt="FirstDay.Life desktop landing page" className="rounded-2xl w-full" style={{ border: imgBorder }} />
            </div>
            <div>
              <p className="text-xs font-bold mb-3 text-center" style={{ color: secondaryTextColor }}>FEATURES</p>
              <ImageWithSkeleton src="/images/firstday/desktop-features.png" alt="FirstDay.Life features" className="rounded-2xl w-full" style={{ border: imgBorder }} />
            </div>
          </div>
          <p className="text-sm text-center" style={{ color: secondaryTextColor }}>
            Live at <a href="https://firstday.life" target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, fontWeight: 600 }}>firstday.life</a>
          </p>
        </AnimateIn>

        {/* KEY DECISIONS */}
        <AnimateIn direction="up" className="py-16 md:py-24">
          <p className="text-xs font-bold tracking-widest mb-8 uppercase" style={{ color: primaryColor }}>Key Decisions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl" style={{ backgroundColor: statBg, borderLeft: `3px solid ${primaryColor}` }}>
              <p className="text-base md:text-lg font-bold mb-2" style={{ color: textColor }}>3 activities per day, not more</p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                The line between &quot;I can do this&quot; and &quot;this is too much.&quot; Each takes 15&ndash;30 minutes.
              </p>
            </div>
            <div className="p-5 rounded-xl" style={{ backgroundColor: statBg, borderLeft: `3px solid ${primaryColor}` }}>
              <p className="text-base md:text-lg font-bold mb-2" style={{ color: textColor }}>Natural language, not categories</p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                Describe your goal in your own words. The AI builds a plan around it.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
