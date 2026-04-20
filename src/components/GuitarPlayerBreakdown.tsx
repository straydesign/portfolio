'use client';

import Image from 'next/image';
import { ArrowLeft, Github, Download, Music, Gauge, Repeat, BookOpen } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';
import NextProject from './NextProject';
import { NavigableSection } from './NavigableSection';
import { type Page } from '@/data/projects';

interface GuitarPlayerBreakdownProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

const GITHUB_URL = 'https://github.com/straydesign/guitar-player';
const ZIP_URL = `${GITHUB_URL}/archive/refs/heads/main.zip`;

export default function GuitarPlayerBreakdown({ onBack, onNavigate }: GuitarPlayerBreakdownProps) {
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';
  const primaryColor = '#ffffff';
  const statBg = '#000000';
  const divider = '1px solid rgba(255,255,255,0.06)';

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* Fixed back + action bar */}
        <div className="fixed top-12 md:top-14 left-0 right-0 z-[100] bg-black py-3 px-4 md:px-8 flex items-center gap-3 flex-wrap">
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: primaryColor, borderRadius: 0 }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}>
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
          <a href={ZIP_URL}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #ffffff', borderRadius: 0 }}>
            <Download className="w-3.5 h-3.5" /> Download ZIP
          </a>
        </div>

        {/* HERO */}
        <NavigableSection id="gp-hero" label="Hero">
          <TextCard padding="lg">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: secondaryTextColor }}>
              WHAT
            </p>
            <div className="min-h-[80vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-16" style={{ borderBottom: divider }}>
              <div className="w-full md:w-1/2">
                <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: primaryColor }}>Personal Tool</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>GUITAR PLAYER</h1>
                <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>
                  A fingerpicking trainer that shows the next fret before you play it.
                </p>
                <p className="text-base mb-10 leading-relaxed" style={{ color: textColor }}>
                  Every guitar practice app I tried wanted to test me, gamify me, or sell me a subscription. I wanted a quiet tool that shows the fretboard the way I think about it — one note ahead, tempo cut to 10%, loop the hard bar until it sticks. So I built it for myself.
                </p>
                <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.06}>
                  {[
                    { label: 'THE USER', value: 'Me. Then anyone who wants the same thing.' },
                    { label: 'THE PAIN', value: 'No app shows the fretboard the way I want', highlight: true },
                    { label: 'STACK', value: 'Next.js · Zustand · Web Audio' },
                    { label: 'STATUS', value: 'Open source — MIT' },
                  ].map(({ label, value, highlight }) => (
                    <StaggerItem key={label}>
                      <div>
                        <p className="text-xs font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                        <p className="text-sm" style={{ color: highlight ? primaryColor : textColor, fontWeight: highlight ? 700 : 400 }}>{value}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              <div className="w-full md:w-1/2">
                <PhoneMockup
                  screenshot="/images/guitar-player/play-coal.png"
                  gradientFrom={primaryColor}
                  gradientTo="#000000"
                  alt="Guitar Player — fretboard view for Coal"
                  size="large"
                />
              </div>
            </div>
          </TextCard>
        </NavigableSection>

        {/* WHY I BUILT IT */}
        <NavigableSection id="gp-why" label="Why I Built It">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: secondaryTextColor }}>
                WHY
              </p>
              <p className="text-xl md:text-3xl leading-relaxed font-bold mb-6" style={{ color: textColor }}>
                I was stuck on one bar of <span style={{ color: primaryColor }}>Coal by Dylan Gossett</span> — the Am with the B-string lift. Tab stayed still while my hand got lost. YouTube was too fast. Every app wanted to teach me chords I already knew.
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: secondaryTextColor }}>
                I wanted the fretboard to show the next note before I hit it, tempo to drop to 10% without warping the audio, and a loop that stays on the hard bar until my pinky figures it out. Three features. No login. No lesson plans. No upsell.
              </p>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* WHAT IT DOES */}
        <NavigableSection id="gp-features" label="What It Does">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: secondaryTextColor }}>
                HOW
              </p>
              <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Features</p>
              <p className="text-xl md:text-2xl font-bold mb-8" style={{ color: textColor }}>
                Four things, done well.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerDelay={0.08}>
                {[
                  { icon: Music, title: 'Fretboard view', body: 'The next note pulses on the fretboard before you play it. Left hand follows the dot, right hand does the thing it already knows.' },
                  { icon: Gauge, title: 'Tempo 10–150%', body: 'Drop to 10% without pitch warp. Back to full speed when the bar clicks. Click track optional.' },
                  { icon: Repeat, title: 'Section loop', body: 'Intro, verse, chorus — mark a section and loop it. Stays on the bar you actually need to practice.' },
                  { icon: BookOpen, title: 'Printable sheets', body: 'Every song renders as a clean PDF of fretboard diagrams. For when you want to be off the screen.' },
                ].map(({ icon: Icon, title, body }) => (
                  <StaggerItem key={title}>
                    <div className="p-5 h-full" style={{ backgroundColor: statBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="w-8 h-8 flex items-center justify-center mb-3" style={{ backgroundColor: primaryColor, color: '#000000' }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="text-base font-bold mb-2" style={{ color: textColor }}>{title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>{body}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* GALLERY */}
        <NavigableSection id="gp-gallery" label="Screens">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Screens</p>
              <p className="text-xl md:text-2xl font-bold mb-8" style={{ color: textColor }}>
                Library, play view, printable sheet.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { src: '/images/guitar-player/library-desktop.png', alt: 'Library — all songs at a glance', caption: 'Library' },
                  { src: '/images/guitar-player/play-coal-desktop.png', alt: 'Play view with fretboard and coach notes', caption: 'Play view' },
                  { src: '/images/guitar-player/print-coal.png', alt: 'Printable fretboard sheet', caption: 'Printable sheet' },
                ].map((img) => (
                  <div key={img.src}>
                    <div className="relative w-full" style={{ aspectRatio: '16/10', backgroundColor: statBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <p className="text-xs font-bold tracking-wider uppercase mt-3" style={{ color: secondaryTextColor }}>{img.caption}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 md:gap-6 justify-center">
                {[
                  { src: '/images/guitar-player/library-mobile.png', alt: 'Library on mobile' },
                  { src: '/images/guitar-player/play-coal-mobile.png', alt: 'Play view on mobile' },
                  { src: '/images/guitar-player/glossary.png', alt: 'Glossary on mobile' },
                ].map((img) => (
                  <PhoneMockup key={img.src} screenshot={img.src} alt={img.alt} size="tiny" />
                ))}
              </div>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* HONEST */}
        <NavigableSection id="gp-honest" label="Honest">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Honest</p>
              <p className="text-xl md:text-2xl font-bold mb-6" style={{ color: textColor }}>
                Built for me. Shared as-is.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: secondaryTextColor }}>
                Four songs in the library. No sign-up, no sync, no cloud. You clone the repo, add your own tab JSON, and it renders. If you hit a bug I probably haven&apos;t seen yet — open an issue or fork it and fix it.
              </p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                Not a product. A tool I use every day. Shipped public so other guitar players can use it too, and because keeping it private felt weird.
              </p>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* GET IT */}
        <NavigableSection id="gp-get" label="Get It">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: secondaryTextColor }}>
                GET IT
              </p>
              <p className="text-xl md:text-2xl font-bold leading-relaxed mb-8" style={{ color: textColor }}>
                Clone, npm install, npm run dev. MIT licensed.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}>
                  <Github className="w-4 h-4" /> View on GitHub
                </a>
                <a href={ZIP_URL}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
                  style={{ backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #ffffff', borderRadius: 0 }}>
                  <Download className="w-4 h-4" /> Download ZIP
                </a>
              </div>
            </TextCard>
          </AnimateIn>
        </NavigableSection>
      </div>
      <NextProject currentProjectId="guitar-player-tool" onNavigate={onNavigate} />
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
