'use client';

import Image from 'next/image';
import { ArrowLeft, Github, Download, Mic, Zap, Layers, Eye } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';
import NextProject from './NextProject';
import { NavigableSection } from './NavigableSection';
import { type Page } from '@/data/projects';

interface AutoPresenterBreakdownProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

const GITHUB_URL = 'https://github.com/straydesign/auto-presenter';
const ZIP_URL = `${GITHUB_URL}/archive/refs/heads/main.zip`;

export default function AutoPresenterBreakdown({ onBack, onNavigate }: AutoPresenterBreakdownProps) {
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
        <NavigableSection id="ap-hero" label="Hero">
          <TextCard padding="lg">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: secondaryTextColor }}>
              WHAT
            </p>
            <div className="min-h-[80vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-16" style={{ borderBottom: divider }}>
              <div className="w-full md:w-1/2">
                <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: primaryColor }}>Personal Tool</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>AUTO-PRESENTER</h1>
                <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>
                  A teleprompter that listens to you. Slides advance when you say the right words.
                </p>
                <p className="text-base mb-10 leading-relaxed" style={{ color: textColor }}>
                  I was recording pitch videos and hated switching between Keynote and a teleprompter app. I wanted one window: the script scrolls, the slides advance when I say the right words, and when I stop talking everything stops. So I built that.
                </p>
                <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.06}>
                  {[
                    { label: 'THE USER', value: 'Me, recording pitch videos at 2am.' },
                    { label: 'THE PAIN', value: 'Switching between slides and teleprompter kills flow', highlight: true },
                    { label: 'STACK', value: 'Electron · Claude · native Swift' },
                    { label: 'STATUS', value: 'Open source — MIT · v0.3' },
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
                <div className="relative w-full" style={{ aspectRatio: '16/10', backgroundColor: statBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Image
                    src="/images/auto-presenter/setup-desktop.png"
                    alt="Auto-Presenter setup screen"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </TextCard>
        </NavigableSection>

        {/* WHY I BUILT IT */}
        <NavigableSection id="ap-why" label="Why I Built It">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: secondaryTextColor }}>
                WHY
              </p>
              <p className="text-xl md:text-3xl leading-relaxed font-bold mb-6" style={{ color: textColor }}>
                Every pitch recording had the same problem: <span style={{ color: primaryColor }}>I was reading, clicking, watching my face, and pretending to look natural</span> at the same time. Four jobs. One person. One take before the energy dies.
              </p>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: secondaryTextColor }}>
                I didn&apos;t want a tool that records me or edits me or manages takes. I wanted one that removed the clicking. If the app could hear me, it could advance the slide when I said the thing. The teleprompter scrolls at my pace because it&apos;s watching me too. If I stop, it waits. That&apos;s the whole app.
              </p>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* HOW IT WORKS */}
        <NavigableSection id="ap-how" label="How It Works">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: secondaryTextColor }}>
                HOW
              </p>
              <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>How It Works</p>
              <p className="text-xl md:text-2xl font-bold mb-8" style={{ color: textColor }}>
                Four pieces, one window.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4" staggerDelay={0.08}>
                {[
                  { icon: Layers, title: '1. Drop in slides', body: 'PDF, PowerPoint, or images. I export from Keynote or Canva. Anything that renders.' },
                  { icon: Mic, title: '2. Paste your script', body: 'Just the words you want to say. No slide markers needed. Paste it raw.' },
                  { icon: Zap, title: '3. Claude maps it', body: 'Claude reads the slides and the script and figures out which slide goes with which paragraph. You can tweak before recording.' },
                  { icon: Eye, title: '4. Hit start and talk', body: 'On-device speech recognition via a native Swift helper tracks your voice. Slides advance as you speak. Stop talking, everything pauses.' },
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
        <NavigableSection id="ap-gallery" label="Screens">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Screens</p>
              <p className="text-xl md:text-2xl font-bold mb-8" style={{ color: textColor }}>
                Setup → mapping → live teleprompter → review.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { src: '/images/auto-presenter/config-populated.png', alt: 'Config with slides loaded and script pasted', caption: 'Setup' },
                  { src: '/images/auto-presenter/config-mapped.png', alt: 'Config showing Claude mapped 4 slide cues across the script', caption: 'Mapped by Claude' },
                  { src: '/images/auto-presenter/presenter-initial.png', alt: 'Presenter window with slide and script ready', caption: 'Initial view' },
                  { src: '/images/auto-presenter/teleprompter-closeup.png', alt: 'Teleprompter close-up with spoken words dimmed and current word lit', caption: 'Reading guide' },
                  { src: '/images/auto-presenter/slide-progression.png', alt: 'Presenter on slide two with confidence and WPM telemetry', caption: 'Slide cues fire' },
                  { src: '/images/auto-presenter/review-complete.png', alt: 'Presentation Complete review screen with stats and Save Video button', caption: 'Review' },
                ].map((img) => (
                  <div key={img.src}>
                    <div className="relative w-full" style={{ aspectRatio: '1/1', backgroundColor: statBg, border: '1px solid rgba(255,255,255,0.06)' }}>
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
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* STACK */}
        <NavigableSection id="ap-stack" label="Stack">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Stack</p>
              <p className="text-xl md:text-2xl font-bold mb-8" style={{ color: textColor }}>
                Electron shell. Native speech. Anthropic SDK. No React.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Shell', value: 'Electron 41' },
                  { label: 'UI', value: 'Vanilla JS · no build step' },
                  { label: 'Speech', value: 'Native Swift helper (on-device)' },
                  { label: 'Slide mapping', value: '@anthropic-ai/sdk (your API key)' },
                  { label: 'Key storage', value: 'macOS Keychain' },
                  { label: 'Packaging', value: 'electron-builder → .dmg' },
                ].map(({ label, value }) => (
                  <div key={label} className="p-4" style={{ backgroundColor: statBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: secondaryTextColor }}>{label}</p>
                    <p className="text-sm" style={{ color: textColor }}>{value}</p>
                  </div>
                ))}
              </div>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* HONEST */}
        <NavigableSection id="ap-honest" label="Honest">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Honest</p>
              <p className="text-xl md:text-2xl font-bold mb-6" style={{ color: textColor }}>
                Mac only. v0.3. Works well for the way I pitch.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: secondaryTextColor }}>
                Voice tracking is on-device, which means your audio never leaves your laptop. Slide mapping does hit the Anthropic API (with your own key, stored in Keychain) once, when you load a new script. After that it&apos;s offline.
              </p>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                Not a product — I&apos;m not going to tune it for you. But the source is here if you want to make it yours.
              </p>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* GET IT */}
        <NavigableSection id="ap-get" label="Get It">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: secondaryTextColor }}>
                GET IT
              </p>
              <p className="text-xl md:text-2xl font-bold leading-relaxed mb-8" style={{ color: textColor }}>
                Clone, npm install, npm start. Add an Anthropic API key to Keychain. MIT licensed.
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
      <NextProject currentProjectId="auto-presenter-tool" onNavigate={onNavigate} />
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
