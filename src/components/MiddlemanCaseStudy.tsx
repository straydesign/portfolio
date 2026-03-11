'use client';

import MiddlemanLogo from './MiddlemanLogo';
import { ArrowLeft, ExternalLink, Clock, TrendingUp, Target } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';

interface MiddlemanCaseStudyProps {
  onBack: () => void;
}

export default function MiddlemanCaseStudy({ onBack }: MiddlemanCaseStudyProps) {
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';
  const primaryColor = '#ffffff';

  const divider = '1px solid rgba(255,255,255,0.06)';
  const videoBorder = '1px solid rgba(255,255,255,0.08)';

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* Back + Prototype links */}
        <div className="pt-6 mb-8 flex items-center gap-4">
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: primaryColor, borderRadius: 0 }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <a href="https://middleman.quest" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}>
            <ExternalLink className="w-4 h-4" /> Try Live Prototype
          </a>
        </div>

        {/* HERO */}
        <div className="min-h-[80vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-16" style={{ borderBottom: divider }}>
          <AnimateIn direction="left" className="w-full md:w-1/2">
            <TextCard padding="lg">
              <div className="flex items-center gap-4 mb-3">
                <MiddlemanLogo color={primaryColor} className="w-12 md:w-16 h-auto" />
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Project</p>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>MERCHANDISING SYSTEM</h1>
              <p className="text-lg md:text-xl mb-10 max-w-2xl leading-relaxed" style={{ color: secondaryTextColor }}>
                You walk into a store cold. No list. No plan. Just your memory and a cardboard tally sheet.
              </p>
              <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.06}>
                {[
                  { label: 'CUSTOMER', value: 'Beer merchandisers (6-12 stores/day)' },
                  { label: 'THE PAIN', value: '45+ min per store guessing what to restock' },
                  { label: 'MY ROLE', value: 'Solo designer \u2014 also worked as a merchandiser' },
                  { label: 'TIMEFRAME', value: '3 months to hi-fi prototype' },
                ].map(({ label, value }) => (
                  <StaggerItem key={label}>
                    <div>
                      <p className="text-xs font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                      <p className="text-sm" style={{ color: textColor }}>{value}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </AnimateIn>

          <AnimateIn direction="right" className="w-full md:w-1/2">
            <PhoneMockup
              screenshot="/images/mockups/middleman-screen.png"
              gradientFrom={primaryColor}
              gradientTo="#000000"
              alt="Middleman app home screen"
              introVideoSrc="/videos/middleman-intro.mp4"
              size="large"
            />
          </AnimateIn>
        </div>

        {/* THE DAILY PAIN */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }} className="mb-8">
            <p className="text-xl md:text-3xl leading-relaxed font-bold" style={{ color: textColor }}>
              Sales reps have ordering software. The person restocking shelves has <span style={{ color: primaryColor }}>pen, cardboard, and guesswork.</span>
            </p>
          </TextCard>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "You can\u2019t see what\u2019s in backstock without walking to the cooler",
              "You can\u2019t see what\u2019s about to run out until it already has",
              "You spend 45 minutes per store on work the app should do for you",
            ].map((pain, i) => (
              <TextCard key={i} padding="md">
                <p className="text-base" style={{ color: textColor }}>{pain}</p>
              </TextCard>
            ))}
          </div>
        </AnimateIn>

        {/* THE APP — core flow */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="md" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The App</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>Three screens. One workflow. Zero guesswork.</p>
          </TextCard>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" staggerDelay={0.12}>
            {[
              { src: '/images/carousel/mm-dashboard.mp4', label: 'Pick your store', desc: 'Walk in knowing exactly what to do.' },
              { src: '/images/carousel/mm-stock.mp4', label: 'See the pull list', desc: 'The backroom list is ready before you open the door.' },
              { src: '/images/carousel/mm-orders.mp4', label: 'Confirm & move on', desc: 'Mark it done. Next store. What was 45 minutes is now 15.' },
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
                  <TextCard padding="sm">
                    <p className="text-base font-bold" style={{ color: primaryColor }}>{label}</p>
                    <p className="text-sm mt-1" style={{ color: secondaryTextColor }}>{desc}</p>
                  </TextCard>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Supporting features */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.08}>
            {[
              { src: '/images/carousel/mm-route.mp4', label: 'Your day, mapped out' },
              { src: '/images/carousel/mm-store-switch.mp4', label: 'Always know where you are' },
              { src: '/images/carousel/mm-nav-flow.mp4', label: 'Every screen, connected' },
              { src: '/images/carousel/mm-login.mp4', label: 'Secure sign-in' },
              { src: '/images/carousel/mm-settings.mp4', label: 'Your preferences' },
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

        {/* THE IDEA */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" className="text-center max-w-3xl mx-auto mb-8">
            <p className="text-xs font-bold tracking-widest mb-8 uppercase" style={{ color: primaryColor }}>The Idea</p>
            <p className="text-2xl md:text-4xl font-bold mb-10 leading-tight" style={{ color: primaryColor }}>
              Tell me what to pull first. Everything else is secondary.
            </p>
          </TextCard>
          <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            {['1. Pick store', '2. Pull list', '3. Confirm & go'].map((step) => (
              <TextCard key={step} padding="md" className="text-center">
                <p className="text-sm font-bold" style={{ color: primaryColor }}>{step}</p>
              </TextCard>
            ))}
          </div>
          <TextCard padding="md" className="text-center max-w-xl mx-auto">
            <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
              Open the app. See what to pull. Do the work.
            </p>
          </TextCard>
        </AnimateIn>

        {/* BY THE NUMBERS */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="sm" className="mb-8 inline-block">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>The Hypothesis</p>
          </TextCard>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {[
              { icon: Clock, label: 'TIME PER STORE', value: '45 min \u2192 15 min' },
              { icon: TrendingUp, label: 'STOCKOUTS', value: 'Down 60%' },
              { icon: Target, label: 'PULL ACCURACY', value: '85%+' },
            ].map(({ icon: Icon, label, value }) => (
              <StaggerItem key={label}>
                <TextCard padding="lg" className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: primaryColor }} />
                  <p className="text-xs font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                  <p className="text-xl md:text-2xl font-bold" style={{ color: primaryColor }}>{value}</p>
                </TextCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* TWO KEY DECISIONS */}
        <AnimateIn direction="up" className="py-16 md:py-24">
          <TextCard padding="sm" className="mb-8 inline-block">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Two Key Decisions</p>
          </TextCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
              <p className="text-lg md:text-xl font-bold mb-3" style={{ color: textColor }}>Never lose your place</p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                The current store stays pinned on every screen &mdash; so you never pull product for the wrong account.
              </p>
            </TextCard>
            <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
              <p className="text-lg md:text-xl font-bold mb-3" style={{ color: textColor }}>Actions before analytics</p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                The job is movement, not analysis. Pull lists come first. Reports come after the shift.
              </p>
            </TextCard>
          </div>
        </AnimateIn>
      </div>
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
