'use client';

import { ArrowLeft, ExternalLink, Brain, Calendar, Target } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';
import PhoneMockup from './PhoneMockup';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';

interface DayOneCaseStudyProps {
  onBack: () => void;
}

export default function DayOneCaseStudy({ onBack }: DayOneCaseStudyProps) {
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';
  const primaryColor = '#ffffff';

  const divider = '1px solid rgba(255,255,255,0.06)';
  const imgBorder = '2px solid rgba(255, 255, 255, 0.1)';
  const videoBorder = '1px solid rgba(255,255,255,0.08)';

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* Back + Live site links */}
        <div className="pt-6 mb-8 flex items-center gap-4">
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: primaryColor, borderRadius: 0 }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <a href="https://firstday.life" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}>
            <ExternalLink className="w-4 h-4" /> Visit Live Site
          </a>
        </div>

        {/* HERO */}
        <div className="min-h-[80vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-16" style={{ borderBottom: divider }}>
          <AnimateIn direction="left" className="w-full md:w-1/2">
            <TextCard padding="lg">
              <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: primaryColor }}>Live Product</p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>FIRSTDAY.LIFE</h1>
              <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>
                You want to learn guitar. But where do you even start?
              </p>
              <p className="text-base mb-8 leading-relaxed" style={{ color: textColor }}>
                Type your goal. Wake up tomorrow with a plan. Designed, built, and shipped as a live product.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'CONCEPT', value: 'AI turns goals into 30-day daily plans' },
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
            </TextCard>
          </AnimateIn>

          <AnimateIn direction="right" className="w-full md:w-1/2">
            <PhoneMockup
              screenshot="/images/firstday/hero.png"
              gradientFrom={primaryColor}
              gradientTo="#000000"
              alt="FirstDay.Life hero — achieve any goal in 30 days"
              size="large"
            />
          </AnimateIn>
        </div>

        {/* THE FEELING */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg">
            <p className="text-xl md:text-3xl leading-relaxed font-bold" style={{ color: textColor }}>
              Learning guitar. Spending time with your kids. Saving for a house. Whatever the goal &mdash; you get <span style={{ color: primaryColor }}>three simple things to do today.</span>
            </p>
          </TextCard>
        </AnimateIn>

        {/* THE JOURNEY — main flow videos */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Journey</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
              From &quot;I want to learn guitar&quot; to your third practice session &mdash; in 72 hours.
            </p>
          </TextCard>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" staggerDelay={0.12}>
            {[
              { src: '/images/firstday/goal-creation.png', label: 'Type your dream', desc: 'Say what matters in your own words.' },
              { src: '/images/firstday/calendar-view.png', label: 'Get your plan', desc: 'AI turns it into 30 days of action.' },
              { src: '/images/firstday/day-view.png', label: 'Do the work', desc: 'Check off tasks. Watch momentum build.' },
            ].map(({ src, label, desc }) => (
              <StaggerItem key={label}>
                <div className="text-center">
                  <div className="mb-4">
                    <ImageWithSkeleton
                      src={src}
                      alt={label}
                      className="w-full"
                      style={{ aspectRatio: '9/19', objectFit: 'cover', border: videoBorder }}
                    />
                  </div>
                  <TextCard padding="sm" noTilt>
                    <p className="text-base font-bold" style={{ color: primaryColor }}>{label}</p>
                    <p className="text-sm mt-1" style={{ color: secondaryTextColor }}>{desc}</p>
                  </TextCard>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* More of the app */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.08}>
            {[
              { src: '/images/firstday/congrats-view.png', label: 'Celebrate wins' },
              { src: '/images/firstday/hero.png', label: 'The pitch' },
              { src: '/images/firstday/loading-screen.png', label: 'Get started' },
            ].map(({ src, label }) => (
              <StaggerItem key={label}>
                <div className="text-center">
                  <ImageWithSkeleton
                    src={src}
                    alt={label}
                    className="w-full"
                    style={{ aspectRatio: '9/19', objectFit: 'cover', border: videoBorder }}
                  />
                  <TextCard padding="sm" noTilt className="mt-2">
                    <p className="text-xs font-bold tracking-wider uppercase" style={{ color: secondaryTextColor }}>{label}</p>
                  </TextCard>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* THE CORE LOOP */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Core Loop</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: primaryColor }}>
              Dream &rarr; Plan &rarr; Do &rarr; Repeat
            </p>
          </TextCard>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.1}>
            {[
              { icon: Brain, label: 'Set Your Goal', desc: 'No categories. No setup. Just say what matters.' },
              { icon: Calendar, label: 'Get Your Plan', desc: 'Wake up knowing exactly what to do today.' },
              { icon: Target, label: 'Track Progress', desc: 'Three tasks a day. Small wins compound.' },
            ].map(({ icon: Icon, label, desc }) => (
              <StaggerItem key={label}>
                <TextCard padding="md">
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#000000', borderRadius: 0, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <Icon className="w-7 h-7" style={{ color: primaryColor }} />
                    </div>
                    <p className="text-lg font-bold mb-2" style={{ color: textColor }}>{label}</p>
                    <p className="text-sm" style={{ color: secondaryTextColor }}>{desc}</p>
                  </div>
                </TextCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* THE LIVE PRODUCT */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Live Product</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
              Every screen polished, every interaction considered.
            </p>
          </TextCard>

          {/* App Screens Showcase */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12" staggerDelay={0.08}>
            {[
              { src: '/images/firstday/goal-creation.png', label: 'Set your goal' },
              { src: '/images/firstday/loading-screen.png', label: 'AI builds your plan' },
              { src: '/images/firstday/calendar-view.png', label: 'Your 30-day calendar' },
              { src: '/images/firstday/day-view.png', label: 'Daily activities' },
              { src: '/images/firstday/congrats-view.png', label: 'Celebrate wins' },
            ].map(({ src, label }) => (
              <StaggerItem key={label}>
                <div className="text-center">
                  <ImageWithSkeleton
                    src={src}
                    alt={label}
                    className="w-full"
                    style={{ border: imgBorder }}
                  />
                  <TextCard padding="sm" noTilt className="mt-2">
                    <p className="text-xs font-bold tracking-wider uppercase" style={{ color: secondaryTextColor }}>{label}</p>
                  </TextCard>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Website screenshots */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { src: '/images/firstday/hero.png', label: 'Hero' },
              { src: '/images/firstday/features.png', label: 'How It Works' },
              { src: '/images/firstday/mosaic.png', label: 'Steps' },
              { src: '/images/firstday/section-3.png', label: 'Social Proof' },
            ].map(({ src, label }) => (
              <div key={label}>
                <ImageWithSkeleton src={src} alt={`FirstDay.Life ${label}`} className="w-full" style={{ border: imgBorder }} />
                <TextCard padding="sm" noTilt className="mt-2 text-center">
                  <p className="text-xs font-bold" style={{ color: secondaryTextColor }}>{label}</p>
                </TextCard>
              </div>
            ))}
          </div>
          <TextCard padding="sm" noTilt className="text-center">
            <p className="text-sm" style={{ color: secondaryTextColor }}>
              Live at <a href="https://firstday.life" target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, fontWeight: 600 }}>firstday.life</a>
            </p>
          </TextCard>
        </AnimateIn>

        {/* THE VISUAL WORLD */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Visual World</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
              The back end is smart. But smart doesn&apos;t captivate.
            </p>
          </TextCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <TextCard padding="lg">
              <p className="text-base font-bold mb-3" style={{ color: textColor }}>Mosaic tiles and fractured light</p>
              <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>
                The landing page leans into mosaic tiles, stained-glass geometry, and dark atmospheric gradients. This wasn&apos;t decoration — it was a deliberate signal. Goal-setting apps tend to feel clinical or aggressively optimistic. FirstDay needed to feel like something deeper. The mosaics suggest complexity being organized into something beautiful, which is exactly what the AI does with your goal. Fractured pieces becoming a coherent picture.
              </p>
            </TextCard>
            <TextCard padding="lg">
              <p className="text-base font-bold mb-3" style={{ color: textColor }}>Dark, mysterious, almost sacred</p>
              <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>
                The dark palette and ambient glow create a sense of quiet power — like walking into a cathedral or a planetarium. That ambience is intentional. When someone types &ldquo;I want to learn guitar&rdquo; and the AI generates a personalized 30-day plan in seconds, that moment should feel magical, not transactional. The visual design borrows from the language of mystery and discovery because that&apos;s what the product delivers.
              </p>
            </TextCard>
          </div>

          <TextCard padding="lg">
            <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
              The back end — the AI planning engine, the sprint structure, the daily task system — is a strong idea. But a strong idea trapped in a forgettable interface dies quietly. The mosaic aesthetic, the cinematic dark tones, the sense of entering a world that knows something you don&apos;t yet — that&apos;s what makes someone stop scrolling and actually type their goal. The visual design isn&apos;t wrapping paper. It&apos;s the reason people trust the product enough to be vulnerable about what they want.
            </p>
          </TextCard>
        </AnimateIn>

        {/* KEY DECISIONS */}
        <AnimateIn direction="up" className="py-16 md:py-24">
          <TextCard padding="sm" noTilt className="mb-8">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Key Decisions</p>
          </TextCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextCard padding="md">
              <p className="text-base md:text-lg font-bold mb-2" style={{ color: textColor }}>3 activities per day, not more</p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                The line between &quot;I can do this&quot; and &quot;this is too much.&quot; Each takes 15&ndash;30 minutes.
              </p>
            </TextCard>
            <TextCard padding="md">
              <p className="text-base md:text-lg font-bold mb-2" style={{ color: textColor }}>Natural language, not categories</p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                Describe your goal in your own words. The AI builds a plan around it.
              </p>
            </TextCard>
          </div>
        </AnimateIn>
      </div>
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
