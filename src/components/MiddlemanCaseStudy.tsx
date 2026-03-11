'use client';

import MiddlemanLogo from './MiddlemanLogo';
import { ArrowLeft, ExternalLink, Clock, TrendingUp, Target, ShieldCheck, Zap } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import ImageWithSkeleton from './ImageWithSkeleton';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';

interface MiddlemanCaseStudyProps {
  onBack: () => void;
}

export default function MiddlemanCaseStudy({ onBack }: MiddlemanCaseStudyProps) {
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';
  const primaryColor = '#22c55e';

  const divider = '1px solid rgba(255,255,255,0.06)';
  const imgBorder = '2px solid rgba(255,255,255,0.1)';

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* Back + Prototype links */}
        <div className="pt-6 mb-8 flex items-center gap-4">
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: '#ffffff', borderRadius: 0 }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <a href="https://middleman.quest" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-80"
            style={{ backgroundColor: primaryColor, color: '#000000', borderRadius: 0 }}>
            <ExternalLink className="w-4 h-4" /> Try Live Prototype
          </a>
        </div>

        {/* HERO */}
        <div className="min-h-[80vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-16" style={{ borderBottom: divider }}>
          <AnimateIn direction="left" className="w-full md:w-1/2">
            <TextCard padding="lg">
              <div className="flex items-center gap-4 mb-3">
                <MiddlemanLogo color={primaryColor} className="w-12 md:w-16 h-auto" />
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Live Prototype</p>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>MIDDLEMAN</h1>
              <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>
                You walk into a store cold. No list. No plan. Just your memory and a cardboard tally sheet.
              </p>
              <p className="text-base mb-10 leading-relaxed" style={{ color: textColor }}>
                Beer merchandisers visit 6&ndash;12 stores a day. MIDDLEMAN replaces guesswork with real-time POS data, auto-generated orders, and rolling shrinkage detection.
              </p>
              <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.06}>
                {[
                  { label: 'CUSTOMER', value: 'Beer merchandisers (6-12 stores/day)' },
                  { label: 'THE PAIN', value: '45+ min per store guessing what to restock' },
                  { label: 'MY ROLE', value: 'Solo designer — also worked as a merchandiser' },
                  { label: 'DESIGN SYSTEM', value: 'Bloomberg Terminal / Warehouse Grid' },
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
              screenshot="/images/middleman/dashboard.png"
              gradientFrom={primaryColor}
              gradientTo="#000000"
              alt="Middleman app dashboard with risk overview and quick actions"
              introVideoSrc="/videos/middleman-intro.mp4"
              size="large"
            />
          </AnimateIn>
        </div>

        {/* THE DAILY PAIN */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" style={{ borderLeft: `4px solid ${primaryColor}` }} className="mb-8">
            <p className="text-xl md:text-3xl leading-relaxed font-bold" style={{ color: textColor }}>
              Sales reps have ordering software. The person restocking shelves has <span style={{ color: primaryColor }}>pen, cardboard, and guesswork.</span>
            </p>
          </TextCard>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Orders come from POS data — the merchandiser shouldn't have to guess quantities",
              "Shrinkage hides in daily noise until it's too late — you need rolling variance, not hunches",
              "You spend 45 minutes per store on work the system should handle automatically",
            ].map((pain, i) => (
              <TextCard key={i} padding="md">
                <p className="text-base" style={{ color: textColor }}>{pain}</p>
              </TextCard>
            ))}
          </div>
        </AnimateIn>

        {/* THE APP — core screens */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="md" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The App</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>Walk in. See what to pull. Do the work. Move on.</p>
          </TextCard>

          {/* Primary screen showcase */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" staggerDelay={0.08}>
            {[
              { src: '/images/middleman/dashboard.png', label: 'Dashboard', desc: 'Risk overview, quick actions, activity feed' },
              { src: '/images/middleman/stock.png', label: 'Pull List', desc: 'What to pull, how many, mark it done' },
              { src: '/images/middleman/orders.png', label: 'The Schedule', desc: 'Today\'s truck, upcoming, past deliveries' },
              { src: '/images/middleman/order-edit.png', label: 'Order Edit', desc: 'Adjust quantities before warehouse cutoff' },
            ].map(({ src, label, desc }) => (
              <StaggerItem key={label}>
                <div className="text-center">
                  <ImageWithSkeleton
                    src={src}
                    alt={label}
                    className="w-full"
                    style={{ border: imgBorder }}
                  />
                  <TextCard padding="sm" noTilt className="mt-2">
                    <p className="text-sm font-bold" style={{ color: primaryColor }}>{label}</p>
                    <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{desc}</p>
                  </TextCard>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Secondary screens */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4" staggerDelay={0.08}>
            {[
              { src: '/images/middleman/order-detail.png', label: 'Order Detail' },
              { src: '/images/middleman/product-detail.png', label: 'Product Detail' },
              { src: '/images/middleman/statistics.png', label: 'Statistics' },
              { src: '/images/middleman/settings.png', label: 'Settings' },
              { src: '/images/middleman/login.png', label: 'Login' },
            ].map(({ src, label }) => (
              <StaggerItem key={label}>
                <div className="text-center">
                  <ImageWithSkeleton
                    src={src}
                    alt={label}
                    className="w-full"
                    style={{ border: imgBorder }}
                  />
                  <p className="text-xs font-bold mt-2 tracking-wider uppercase" style={{ color: secondaryTextColor }}>{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* DESIGN SYSTEM */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Design System</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
              Bloomberg Terminal meets warehouse floor
            </p>
            <p className="text-base mt-3 leading-relaxed" style={{ color: secondaryTextColor }}>
              Merchandisers work in dimly-lit coolers and bright fluorescent aisles. The design system prioritizes scanability over aesthetics: monospace type, traffic-light colors, zero border radius, data-dense layouts.
            </p>
          </TextCard>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.08}>
            {[
              { label: 'Typography', value: 'JetBrains Mono', desc: 'Tabular nums, slashed zero' },
              { label: 'Colors', value: 'Green / Amber / Red', desc: 'Traffic-light only — no blue, no purple' },
              { label: 'Corners', value: '0px radius', desc: 'Sharp rectangles everywhere' },
              { label: 'Shadows', value: 'None', desc: 'Flat cards with border separation' },
            ].map(({ label, value, desc }) => (
              <StaggerItem key={label}>
                <TextCard padding="md">
                  <p className="text-xs font-bold tracking-wider mb-1" style={{ color: secondaryTextColor }}>{label}</p>
                  <p className="text-base font-bold" style={{ color: primaryColor }}>{value}</p>
                  <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{desc}</p>
                </TextCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* SMART FEATURES */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="md" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Intelligence Layer</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
              The system thinks so you don&apos;t have to
            </p>
          </TextCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <TextCard padding="md" style={{ borderLeft: `4px solid ${primaryColor}` }} className="flex-1">
                <p className="text-base font-bold mb-2" style={{ color: textColor }}>Auto-Generated Orders</p>
                <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>
                  POS scans trigger reorder calculations. Orders appear pre-built — merchandisers just adjust quantities before warehouse cutoff.
                </p>
              </TextCard>
              <TextCard padding="md" style={{ borderLeft: '4px solid #eab308' }} className="flex-1">
                <p className="text-base font-bold mb-2" style={{ color: textColor }}>Rolling Shrinkage Detection</p>
                <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>
                  Per-SKU variance tracked over rolling windows. Flagged when sustained above threshold for 7+ days — not one-off anomalies.
                </p>
              </TextCard>
            </div>
          </div>

          {/* Modals showcase */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.08}>
            {[
              { src: '/images/middleman/shrinkage-modal.png', label: 'Shrinkage Analysis' },
              { src: '/images/middleman/breakage-modal.png', label: 'Log Breakage' },
              { src: '/images/middleman/store-switcher.png', label: 'Store Switcher' },
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
        </AnimateIn>

        {/* BY THE NUMBERS */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="sm" className="mb-8 inline-block">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>The Hypothesis</p>
          </TextCard>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6" staggerDelay={0.1}>
            {[
              { icon: Clock, label: 'TIME PER STORE', value: '45 min → 15 min' },
              { icon: TrendingUp, label: 'STOCKOUTS', value: 'Down 60%' },
              { icon: ShieldCheck, label: 'SHRINKAGE', value: 'Caught in days, not weeks' },
              { icon: Zap, label: 'ORDER ACCURACY', value: 'POS-driven, not guessed' },
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

        {/* KEY DECISIONS */}
        <AnimateIn direction="up" className="py-16 md:py-24">
          <TextCard padding="sm" className="mb-8 inline-block">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Key Decisions</p>
          </TextCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TextCard padding="lg" style={{ borderLeft: `4px solid ${primaryColor}` }}>
              <p className="text-lg md:text-xl font-bold mb-3" style={{ color: textColor }}>Never lose your place</p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                The current store stays pinned on every screen — so you never pull product for the wrong account. One tap switches context.
              </p>
            </TextCard>
            <TextCard padding="lg" style={{ borderLeft: `4px solid ${primaryColor}` }}>
              <p className="text-lg md:text-xl font-bold mb-3" style={{ color: textColor }}>Actions before analytics</p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                The job is movement, not analysis. Pull lists and breakage logging come first. Stats are one tap away but never block the workflow.
              </p>
            </TextCard>
            <TextCard padding="lg" style={{ borderLeft: '4px solid #eab308' }}>
              <p className="text-lg md:text-xl font-bold mb-3" style={{ color: textColor }}>Separate breakage from shrinkage</p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                Merchandisers log breakage manually — broken bottles, damaged packaging. The system subtracts these from shrinkage calculations so the rolling variance only flags real theft or loss.
              </p>
            </TextCard>
            <TextCard padding="lg" style={{ borderLeft: '4px solid #eab308' }}>
              <p className="text-lg md:text-xl font-bold mb-3" style={{ color: textColor }}>Bloomberg over beauty</p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                Data density wins over polish. JetBrains Mono, sharp corners, traffic-light colors. You see the number, you act on it. The design system was built for a cooler at 2am, not a pitch deck.
              </p>
            </TextCard>
          </div>
        </AnimateIn>
      </div>
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
