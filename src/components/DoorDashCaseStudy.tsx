'use client';

import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';
import NextProject from './NextProject';
import CancellationFlowDiagram from './CancellationFlowDiagram';
import { NavigableSection } from './NavigableSection';
import { type Page } from '@/data/projects';

interface DoorDashCaseStudyProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

const DASHER_JOURNEY = [
  { step: 1, label: 'Log into app', friction: null },
  { step: 2, label: 'Start a dash', friction: null },
  { step: 3, label: 'Drive to hotspot', friction: null },
  { step: 4, label: 'Get an order', friction: null },
  { step: 5, label: 'Accept or deny', friction: null },
  { step: 6, label: 'Drive to restaurant', friction: '12 taps to cancel. While driving.' },
  { step: 7, label: 'Verify order', friction: null },
  { step: 8, label: 'Confirm pickup', friction: 'Locker code vanishes the moment you tap.' },
  { step: 9, label: 'Drive to delivery', friction: null },
  { step: 10, label: 'Deliver — photo or handoff', friction: 'ML rejects valid photos at side doors.' },
  { step: 11, label: 'Complete', friction: '"Complete" is the biggest button mid-route.' },
] as const;

const NIELSENS_HEURISTICS = [
  { id: 1, name: 'System Status', applied: true },
  { id: 2, name: 'Match Real World', applied: false },
  { id: 3, name: 'User Control', applied: true },
  { id: 4, name: 'Consistency', applied: false },
  { id: 5, name: 'Error Prevention', applied: true },
  { id: 6, name: 'Recognition', applied: true },
  { id: 7, name: 'Flexibility', applied: true },
  { id: 8, name: 'Minimal Design', applied: true },
  { id: 9, name: 'Recover from Errors', applied: true },
  { id: 10, name: 'Help & Docs', applied: false },
];

const PROPOSALS = [
  {
    n: '01',
    title: 'Directions until arrival',
    before: '"Complete" is the biggest button mid-route',
    after: 'Show directions. "Complete" appears only on arrival.',
  },
  {
    n: '02',
    title: '15-min nav-only window',
    before: 'Address vanishes the instant you tap delivered',
    after: 'Address stays for 15 minutes. Logged for privacy. Then gone.',
  },
  {
    n: '03',
    title: 'Alternate-location prompt',
    before: 'ML rejects valid photos at side doors and garages',
    after: 'Mismatch → "alternate location" prompt. Photo + note saved.',
  },
  {
    n: '04',
    title: 'Persistent locker code',
    before: 'Code disappears the moment you tap "picked up"',
    after: 'Code stays visible until the locker actually opens.',
  },
  {
    n: '05',
    title: '4-tap cancel',
    before: '12 taps to cancel — embedded survey at red lights',
    after: '4 taps. Survey moves to end of shift.',
  },
] as const;

const BG = {
  hero: 'var(--paper)',
  journey: 'var(--surface-2)',
  validation: 'var(--surface-3)',
  ideation: 'var(--surface-2)',
  iteration: 'var(--surface-3)',
  outcome: 'var(--out-red)',
} as const;

export default function DoorDashCaseStudy({ onBack, onNavigate }: DoorDashCaseStudyProps) {
  const textColor = 'var(--ink)';
  const secondaryTextColor = 'var(--ink-2)';
  const primaryColor = 'var(--ink)';
  const statBg = 'var(--chip)';
  const divider = '1px solid rgba(var(--hairline),0.08)';
  const sectionPad = 'py-8 md:py-12';
  const inner = 'w-full px-4 md:px-8 max-w-[90rem] mx-auto';

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG.hero }}>
      {/* Fixed back bar */}
      <div className="fixed top-12 md:top-14 left-0 right-0 z-[100] bg-[var(--paper)] py-3 px-4 md:px-8 flex items-center gap-4">
        <button onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: primaryColor, borderRadius: 0 }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* HERO */}
      <NavigableSection id="dd-hero" label="Hero" style={{ backgroundColor: BG.hero }}>
        <div className={inner}>
          <TextCard padding="lg">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: secondaryTextColor }}>WHAT</p>
            <div className="min-h-[78vh] flex flex-col md:flex-row items-center gap-8 md:gap-14 py-6 md:py-8" style={{ borderBottom: divider }}>
              <div className="w-full md:w-2/5">
                <PhoneMockup
                  screenshot="/images/doordash/slide6_Image_0.png"
                  gradientFrom={primaryColor}
                  gradientTo="var(--paper)"
                  alt="DoorDash Dasher app"
                  size="large"
                />
              </div>
              <div className="w-full md:w-3/5">
                <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Case Study</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight" style={{ color: textColor }}>
                  DOORDASH DASHER APP
                </h1>
                <p className="text-lg md:text-xl mb-3 leading-relaxed" style={{ color: secondaryTextColor }}>
                  12 taps to cancel an order. While driving.
                </p>
                <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: textColor }}>
                  An independent UX evaluation of the driver app, grounded in 1,000+ deliveries behind the wheel.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'SCOPE', value: 'Heuristic eval of error recovery' },
                    { label: 'RESEARCH', value: '1,000+ deliveries as a Dasher', highlight: true },
                    { label: 'ROLE', value: 'Independent UX Evaluator' },
                    { label: 'FRAMEWORK', value: "Nielsen's 10 Heuristics" },
                  ].map(({ label, value, highlight }) => (
                    <div key={label}>
                      <p className="text-[10px] font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                      <p className="text-sm" style={{ color: highlight ? primaryColor : textColor, fontWeight: highlight ? 700 : 400 }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TextCard>
        </div>
      </NavigableSection>

      {/* USER JOURNEY — 11-step dasher workflow */}
      <NavigableSection id="dd-user-journey" label="User Journey" style={{ backgroundColor: BG.journey }}>
        <div className={inner}>
          <div className={sectionPad} style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 01</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>User Journey</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Eleven steps from clocking in to handing off. Friction lives in the gaps between them — where I noticed it on every shift.
              </p>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-2.5" staggerDelay={0.04}>
                {DASHER_JOURNEY.map(({ step, label, friction }) => (
                  <StaggerItem key={step}>
                    <div className="p-3 h-full flex flex-col" style={{
                      backgroundColor: statBg,
                      border: friction ? '1px solid rgba(var(--hairline),0.25)' : '1px solid rgba(var(--hairline),0.08)',
                    }}>
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="text-[10px] font-bold tracking-wider" style={{ color: secondaryTextColor }}>STEP {String(step).padStart(2, '0')}</p>
                        {friction && <AlertTriangle className="w-3 h-3" style={{ color: primaryColor }} />}
                      </div>
                      <p className="text-sm font-bold mb-1.5" style={{ color: textColor }}>{label}</p>
                      {friction && (
                        <p className="text-[11px] leading-snug mt-auto" style={{ color: primaryColor }}>{friction}</p>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* VALIDATION — 1000+ deliveries + Nielsen framework */}
      <NavigableSection id="dd-validation" label="Validation" style={{ backgroundColor: BG.validation }}>
        <div className={inner}>
          <div className={sectionPad} style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 02</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Validation</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                A thousand deliveries is the dataset. Nielsen&apos;s ten heuristics is the lens.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                {[
                  { stat: '1,000+', label: 'Deliveries logged', sub: 'My own — across two markets' },
                  { stat: '5', label: 'Recurring issues', sub: 'Observed across the full journey' },
                  { stat: '7/10', label: 'Heuristics violated', sub: 'Across the five issues' },
                ].map(({ stat, label, sub }) => (
                  <div key={label} className="p-4" style={{ backgroundColor: statBg, border: '1px dashed rgba(var(--hairline),0.12)' }}>
                    <p className="text-3xl md:text-4xl font-black" style={{ color: primaryColor }}>{stat}</p>
                    <p className="text-sm font-bold mt-1" style={{ color: textColor }}>{label}</p>
                    <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{sub}</p>
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-bold tracking-wider mb-2 uppercase" style={{ color: primaryColor }}>Nielsen&apos;s 10 Usability Heuristics</p>
              <StaggerContainer className="grid grid-cols-5 md:grid-cols-10 gap-1.5" staggerDelay={0.03}>
                {NIELSENS_HEURISTICS.map((h) => (
                  <StaggerItem key={h.id}>
                    <div className="p-2 h-full text-center" style={{
                      backgroundColor: statBg,
                      border: h.applied ? '1px solid rgba(var(--hairline),0.20)' : '1px solid rgba(var(--hairline),0.08)',
                      opacity: h.applied ? 1 : 0.35,
                    }}>
                      <p className="text-lg font-black" style={{ color: h.applied ? primaryColor : secondaryTextColor }}>{h.id}</p>
                      <p className="text-[10px] leading-tight mt-1" style={{ color: h.applied ? textColor : secondaryTextColor }}>{h.name}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* IDEATION — 5 redesign proposals */}
      <NavigableSection id="dd-ideation" label="Ideation" style={{ backgroundColor: BG.ideation }}>
        <div className={inner}>
          <div className={sectionPad} style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 03</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Ideation</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Five proposals. Each respects DoorDash&apos;s business constraints — fraud prevention, privacy, data — while removing friction that puts drivers at risk.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-2.5" staggerDelay={0.05}>
                {PROPOSALS.map(({ n, title, before, after }) => (
                  <StaggerItem key={n}>
                    <div className="p-3 h-full flex flex-col" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
                      <p className="text-2xl font-black mb-1" style={{ color: primaryColor }}>{n}</p>
                      <p className="text-sm font-bold mb-2" style={{ color: textColor }}>{title}</p>
                      <div className="mb-2">
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

      {/* ITERATION — 12 → 4 taps, the cancellation flow rebuilt */}
      <NavigableSection id="dd-iteration" label="Iteration" style={{ backgroundColor: BG.iteration }}>
        <div className={inner}>
          <div className={sectionPad} style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 04</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Iteration</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                The cancellation flow was the worst offender. I rebuilt it — 12 taps to 4. The survey moves to the end of the shift, not the red light.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-5">
                <div className="text-center p-4" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
                  <p className="text-[10px] font-bold tracking-wider mb-1" style={{ color: secondaryTextColor }}>CURRENT</p>
                  <p className="text-5xl md:text-6xl font-black" style={{ color: textColor, opacity: 0.3 }}>12</p>
                  <p className="text-xs font-bold mt-1" style={{ color: textColor }}>taps to cancel</p>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-7 h-7" style={{ color: primaryColor }} />
                </div>
                <div className="text-center p-4" style={{ backgroundColor: statBg, border: '2px solid rgba(var(--hairline),0.20)' }}>
                  <p className="text-[10px] font-bold tracking-wider mb-1" style={{ color: primaryColor }}>PROPOSED</p>
                  <p className="text-5xl md:text-6xl font-black" style={{ color: primaryColor }}>4</p>
                  <p className="text-xs font-bold mt-1" style={{ color: textColor }}>taps to cancel</p>
                </div>
              </div>

              <CancellationFlowDiagram />
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* OUTCOME */}
      <NavigableSection id="dd-outcome" label="Outcome" style={{ backgroundColor: BG.outcome }}>
        <div className={inner}>
          <div className={sectionPad} style={{ borderBottom: divider }}>
            <TextCard padding="lg" style={{ borderLeft: '4px solid var(--ink)' }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>OUTCOME</p>
              <p className="text-xl md:text-3xl font-bold leading-relaxed mb-5" style={{ color: textColor }}>
                Five issues. One philosophy: <span style={{ color: primaryColor }}>the app should protect the driver, not punish them.</span>
              </p>
              <p className="text-sm md:text-base mb-5 leading-relaxed" style={{ color: secondaryTextColor }}>
                Every proposal respects the business — fraud prevention, privacy, data collection — while removing friction that puts drivers at risk.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { stat: '12 → 4', label: 'Taps to cancel' },
                  { stat: '5', label: 'Redesign proposals' },
                  { stat: '1,000+', label: 'Deliveries researched' },
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

      <NextProject currentProjectId="doordash-case-study" onNavigate={onNavigate} />
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
