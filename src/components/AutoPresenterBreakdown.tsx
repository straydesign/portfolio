'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight, Github, Download, AlertTriangle } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './AnimateIn';
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

const RECORDING_JOURNEY: { step: string; friction?: string }[] = [
  { step: 'Open Keynote' },
  { step: 'Open teleprompter app in second window' },
  { step: 'Open QuickTime to record' },
  { step: 'Hit record. Start talking', friction: 'four windows fighting for the screen' },
  { step: 'Read from teleprompter', friction: 'eyes drift off the lens' },
  { step: 'Reach for trackpad to click slide', friction: 'breaks eye contact, breaks delivery' },
  { step: 'Lose my place in the script', friction: 'tab keeps scrolling, mouth stops' },
  { step: 'Click next slide late' },
  { step: 'Stumble through next paragraph', friction: 'energy drops, take is gone' },
  { step: 'Cut. Restart take', friction: 'voice has lost the warmth' },
  { step: '30 min in, two usable takes', friction: 'most takes die at the trackpad' },
];

const NEW_JOURNEY = [
  {
    label: 'Open Auto-Presenter',
    folds: 'Folds: Keynote + teleprompter window + QuickTime',
  },
  {
    label: 'Paste in script and slides',
    folds: 'Folds: manually aligning slide order to script paragraphs (Claude maps cues once)',
  },
  {
    label: 'Press start',
    folds: 'Folds: hit record + queue teleprompter + start scrolling at the right pace',
  },
  {
    label: 'Present',
    folds: 'Folds: reaching for the trackpad mid-sentence. Slides advance on your voice. Hands stay where they should.',
  },
] as const;

const PROPOSALS = [
  {
    n: '01',
    title: 'Drop in slides + script',
    before: 'Slide order in Keynote, script in Notes, no link between them.',
    after: 'Both paste into one window. The app keeps them married.',
    img: '/images/auto-presenter/config-populated.png',
  },
  {
    n: '02',
    title: 'Claude maps the cues',
    before: 'I manually mark slide breaks in the script.',
    after: 'Claude reads the deck and the script, drops cues where they fit.',
    img: '/images/auto-presenter/config-mapped.png',
  },
  {
    n: '03',
    title: 'Voice advances slides',
    before: 'Reach for trackpad mid-sentence. Lose the room.',
    after: 'Say the cue, slide moves. Hands stay where they should.',
    img: '/images/auto-presenter/slide-progression.png',
  },
  {
    n: '04',
    title: 'Teleprompter dims spoken words',
    before: 'Eyes lose their place in a wall of script.',
    after: 'Said words dim. Current word is bright. One line of focus.',
    img: '/images/auto-presenter/teleprompter-closeup.png',
  },
];

const TRADEOFFS = [
  { cut: 'Built-in recording', why: 'QuickTime already records. I do not need another button.' },
  { cut: 'Video editor', why: 'Final Cut exists. Stay in scope.' },
  { cut: 'Take manager', why: 'Folder of MOVs is already a take manager.' },
  { cut: 'Cloud sync', why: 'Scripts are not worth a backend. Local file is fine.' },
  { cut: 'Team mode', why: 'Two people on one teleprompter is a different product.' },
];

const BG = {
  hero: 'var(--paper)',
  journey: 'var(--surface-2)',
  validation: 'var(--surface-3)',
  ideation: 'var(--surface-2)',
  iteration: 'var(--surface-3)',
  outcome: 'var(--out-indigo)',
} as const;

export default function AutoPresenterBreakdown({ onBack, onNavigate }: AutoPresenterBreakdownProps) {
  const textColor = 'var(--ink)';
  const secondaryTextColor = 'var(--ink-2)';
  const primaryColor = 'var(--ink)';
  const statBg = 'var(--chip)';
  const divider = '1px solid rgba(var(--hairline),0.08)';
  const sectionPad = 'py-8 md:py-12';
  const inner = 'w-full px-4 md:px-8 max-w-[90rem] mx-auto';

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG.hero }}>
      {/* Fixed back + action bar */}
      <div className="fixed top-12 md:top-14 left-0 right-0 z-[100] bg-[var(--paper)] py-3 px-4 md:px-8 flex items-center gap-3 flex-wrap">
        <button onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: primaryColor, borderRadius: 0 }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}>
          <Github className="w-3.5 h-3.5" /> GitHub
        </a>
        <a href={ZIP_URL}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)', borderRadius: 0 }}>
          <Download className="w-3.5 h-3.5" /> Download ZIP
        </a>
      </div>

      {/* HERO */}
      <NavigableSection id="ap-hero" label="Hero" style={{ backgroundColor: BG.hero }}>
        <div className={inner}>
          <TextCard padding="lg">
            <div className="min-h-[78vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-8 md:py-12" style={{ borderBottom: divider }}>
              <div className="w-full md:w-1/2">
                <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: primaryColor }}>Personal Tool — Built &amp; Shipped</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>AUTO-PRESENTER</h1>
                <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>
                  A teleprompter that listens to you. Slides advance when you say the right words.
                </p>
                <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: textColor }}>
                  I was recording pitch videos and hated switching between Keynote and a teleprompter app. I wanted one window: the script scrolls, the slides advance when I say the right words, and when I stop talking everything stops. So I built that.
                </p>
                <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.06}>
                  {[
                    { label: 'THE USER', value: 'Me, recording pitch videos at 2am.' },
                    { label: 'THE PAIN', value: 'Most takes die at the trackpad.', highlight: true },
                    { label: 'STACK', value: 'Electron · Claude · native Swift' },
                    { label: 'STATUS', value: 'Open source · MIT · v0.3' },
                  ].map(({ label, value, highlight }) => (
                    <StaggerItem key={label}>
                      <div>
                        <p className="text-[11px] font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                        <p className="text-sm" style={{ color: highlight ? primaryColor : textColor, fontWeight: highlight ? 700 : 400 }}>{value}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative w-full" style={{ aspectRatio: '16/10', backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
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
        </div>
      </NavigableSection>

      {/* USER JOURNEY */}
      <NavigableSection id="ap-user-journey" label="User Journey" style={{ backgroundColor: BG.journey }}>
        <div className={inner}>
          <div className={sectionPad} style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 01</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>The user journey</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Recording a pitch video at 2am. The user is me. Most of the friction happens between my mouth and the trackpad.
              </p>

              <p className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: secondaryTextColor }}>Before — 11 steps, most fail</p>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-6 gap-2" staggerDelay={0.04}>
                {RECORDING_JOURNEY.map(({ step, friction }, i) => (
                  <StaggerItem key={step}>
                    <div className="p-2.5 h-full flex flex-col" style={{ backgroundColor: statBg, border: friction ? `1px solid ${primaryColor}` : '1px solid rgba(var(--hairline),0.08)' }}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <p className="text-xs font-black" style={{ color: primaryColor }}>{String(i + 1).padStart(2, '0')}</p>
                        {friction && <AlertTriangle className="w-3 h-3" style={{ color: primaryColor }} />}
                      </div>
                      <p className="text-[11px] font-semibold leading-snug" style={{ color: textColor }}>{step}</p>
                      {friction && <p className="text-[10px] mt-1.5 leading-snug" style={{ color: secondaryTextColor }}>{friction}</p>}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <div className="flex items-center gap-3 mt-8 mb-3">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: primaryColor }}>After — 4 steps, no trackpad</p>
                <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(var(--hairline),0.12)' }} />
                <p className="text-[10px] font-mono" style={{ color: secondaryTextColor }}>11 → 4 · trackpad → mouth</p>
              </div>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-2" staggerDelay={0.05}>
                {NEW_JOURNEY.map(({ label, folds }, i) => (
                  <StaggerItem key={label}>
                    <div className="p-3 h-full flex flex-col" style={{ backgroundColor: statBg, border: `1px solid ${primaryColor}` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs font-black" style={{ color: primaryColor }}>{String(i + 1).padStart(2, '0')}</p>
                        <ArrowRight className="w-3 h-3" style={{ color: primaryColor, opacity: 0.5 }} />
                      </div>
                      <p className="text-sm font-bold leading-snug mb-2" style={{ color: textColor }}>{label}</p>
                      <p className="text-[10px] leading-snug mt-auto" style={{ color: secondaryTextColor }}>{folds}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* VALIDATION */}
      <NavigableSection id="ap-validation" label="Validation" style={{ backgroundColor: BG.validation }}>
        <div className={inner}>
          <div className={sectionPad} style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 02</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Validation</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                I am the validation. Every pitch video on this portfolio gets recorded with this tool. If it breaks, I notice the same night.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { stat: '1 window', label: 'Replaces Keynote + teleprompter + QuickTime' },
                  { stat: 'Daily', label: 'Tool I actually use for pitch recordings' },
                  { stat: 'MIT', label: 'Public on GitHub — fork it, fix it' },
                ].map(({ stat, label }) => (
                  <div key={label} className="p-4 text-center" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
                    <p className="text-2xl md:text-3xl font-black" style={{ color: primaryColor }}>{stat}</p>
                    <p className="text-[11px] font-bold mt-2 tracking-wider uppercase" style={{ color: secondaryTextColor }}>{label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-5 leading-relaxed" style={{ color: secondaryTextColor }}>
                Not a product validation story — no user research, no funnel. The honest version: I had a problem recording pitch videos, built the smallest thing that fixed it, and use it every week.
              </p>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* IDEATION */}
      <NavigableSection id="ap-ideation" label="Ideation" style={{ backgroundColor: BG.ideation }}>
        <div className={inner}>
          <div className={sectionPad} style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 03</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Ideation</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Four moves. Each removes one job my hands or eyes shouldn&apos;t have to do mid-take.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-3" staggerDelay={0.05}>
                {PROPOSALS.map(({ n, title, before, after, img }) => (
                  <StaggerItem key={n}>
                    <div className="p-3 h-full flex flex-col" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-black" style={{ color: primaryColor }}>{n}</p>
                        <p className="text-xs font-bold" style={{ color: textColor }}>{title}</p>
                      </div>
                      <div className="mb-2 h-72 flex items-center justify-center p-2" style={{ overflow: 'hidden', border: '1px solid rgba(var(--hairline),0.08)', backgroundColor: 'var(--chip)' }}>
                        <img src={img} alt={title} className="max-w-full max-h-full object-contain" loading="lazy" />
                      </div>
                      <div className="mb-1.5">
                        <p className="text-[10px] font-bold tracking-wider mb-0.5" style={{ color: secondaryTextColor }}>BEFORE</p>
                        <p className="text-[11px] leading-snug" style={{ color: secondaryTextColor }}>{before}</p>
                      </div>
                      <div style={{ borderLeft: '2px solid var(--ink)', paddingLeft: '8px' }}>
                        <p className="text-[10px] font-bold tracking-wider mb-0.5" style={{ color: primaryColor }}>AFTER</p>
                        <p className="text-[11px] leading-snug" style={{ color: textColor }}>{after}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* ITERATION */}
      <NavigableSection id="ap-iteration" label="Iteration" style={{ backgroundColor: BG.iteration }}>
        <div className={inner}>
          <div className={sectionPad} style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 04</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Iteration</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Five features I almost built. Each one would have made it a different product. Cut them all.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-2.5" staggerDelay={0.05}>
                {TRADEOFFS.map(({ cut, why }, i) => (
                  <StaggerItem key={cut}>
                    <div className="p-3 h-full flex flex-col" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-lg font-black" style={{ color: primaryColor }}>{String(i + 1).padStart(2, '0')}</p>
                        <ArrowRight className="w-3.5 h-3.5" style={{ color: primaryColor, opacity: 0.5 }} />
                      </div>
                      <p className="text-[11px] font-bold tracking-wider mb-1 uppercase" style={{ color: primaryColor }}>CUT</p>
                      <p className="text-sm font-bold mb-2" style={{ color: textColor }}>{cut}</p>
                      <p className="text-[11px] leading-snug mt-auto" style={{ color: secondaryTextColor }}>{why}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* OUTCOME */}
      <NavigableSection id="ap-outcome" label="Outcome" style={{ backgroundColor: BG.outcome }}>
        <div className={inner}>
          <div className={sectionPad} style={{ borderBottom: divider }}>
            <TextCard padding="lg" style={{ borderLeft: '4px solid var(--ink)' }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>OUTCOME</p>
              <p className="text-xl md:text-3xl font-bold leading-relaxed mb-3" style={{ color: textColor }}>
                One window. Mouth runs the show. <span style={{ color: primaryColor }}>Hands stay off the trackpad.</span>
              </p>
              <p className="text-sm md:text-base mb-5 leading-relaxed" style={{ color: secondaryTextColor }}>
                Mac-only, v0.3. Voice tracking is on-device — audio never leaves the laptop. Slide mapping hits the Anthropic API once per script, with your own key from Keychain.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { stat: '1', label: 'Window replaces three' },
                  { stat: 'On-device', label: 'Voice never leaves laptop' },
                  { stat: 'BYO key', label: 'Anthropic key from Keychain' },
                  { stat: 'MIT', label: 'Fork it, fix it' },
                ].map(({ stat, label }) => (
                  <div key={label} className="p-3 text-center" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
                    <p className="text-xl md:text-2xl font-black" style={{ color: primaryColor }}>{stat}</p>
                    <p className="text-[10px] font-bold mt-1.5 tracking-wider uppercase" style={{ color: secondaryTextColor }}>{label}</p>
                  </div>
                ))}
              </div>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      <NextProject currentProjectId="auto-presenter-tool" onNavigate={onNavigate} />
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
