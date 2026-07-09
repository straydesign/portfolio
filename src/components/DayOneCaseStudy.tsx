'use client';

import { ArrowLeft, ExternalLink, AlertTriangle } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';
import NextProject from './NextProject';
import { NavigableSection } from './NavigableSection';
import { type Page } from '@/data/projects';

interface DayOneCaseStudyProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

// CONTEXT — what a recruiter scans for first
const CONTEXT = [
  { label: 'Role', value: 'Solo — product design + AI-assisted build' },
  { label: 'Tools', value: 'Figma → Next.js, Tailwind, Supabase, Vercel' },
  { label: 'Scope', value: 'End-to-end: problem, UX, visual system, build, ship' },
  { label: 'Status', value: 'Live at firstday.life — a shipped product, not a concept' },
] as const;

// PROBLEM — the 11-step path from intention to abandonment
const STARTER_JOURNEY = [
  { step: 1, label: 'Have a vague goal', friction: '"I should learn guitar"' },
  { step: 2, label: 'Open a notes app', friction: null },
  { step: 3, label: 'Try to break it down', friction: 'Expertise you don\'t have' },
  { step: 4, label: 'Pick a category', friction: 'Goals don\'t fit boxes' },
  { step: 5, label: 'Draft a 30-day plan', friction: null },
  { step: 6, label: 'Set a start date', friction: '"Monday for sure"' },
  { step: 7, label: 'Wait for Monday', friction: null },
  { step: 8, label: 'Stare at blank Monday', friction: 'What do I do today?' },
  { step: 9, label: 'Skip a day', friction: null },
  { step: 10, label: 'Skip a week', friction: 'Guilt compounds' },
  { step: 11, label: 'Quietly abandon', friction: 'Goal vanishes from mind' },
] as const;

const FAILURES = [
  { tag: 'Learn guitar', body: 'Bought the guitar. Bought the book. Stared at chord diagrams for a week. Never picked it up again. Day-one paralysis.' },
  { tag: 'Get up at 6am', body: 'Built a Notion habit tracker. Spent the hour I should have slept designing the tracker. Quit by day three.' },
  { tag: 'Run a 5K', body: 'Couch-to-5K was 9 weeks. Week 4 hurt. Skipped one run, then a week. The plan still sits in my Notes app.' },
] as const;

// PROCESS — the four forks that shaped the product. (Rationale reconstructed to match what shipped — confirm wording.)
const DECISIONS = [
  {
    n: '01',
    title: 'How the goal gets planned',
    shipped: { label: 'One sentence, AI builds the program', note: 'You describe it in your words.' },
    explored: { label: 'Categories, milestones, a planning wizard', note: 'User assembles the plan.' },
    rationale: 'Planning is the friction that kills goals before day one — so removing it is the whole product. You type the goal (or tap a template); the AI does the structuring into days and activities. There is no planning screen to abandon.',
    decision: 'Shipped one field + templates. The user never plans anything.',
  },
  {
    n: '02',
    title: 'The shape of the plan',
    shipped: { label: 'A program, one sprint at a time', note: 'Days unlock as you go.' },
    explored: { label: 'The whole multi-week plan, dumped at once', note: 'Everything visible immediately.' },
    rationale: 'A full multi-week plan recreates the overwhelm that kills goals. Revealing the program one short sprint at a time — with later days locked — keeps each step finishable while the overall arc stays ambitious enough to matter.',
    decision: 'Shipped progressive sprints. Locked days are a feature, not a limit.',
  },
  {
    n: '03',
    title: 'What brings people back',
    shipped: { label: 'Light gamification — streaks, XP, a daily challenge', note: 'Returning is the rewarded act.' },
    explored: { label: 'A plain, unscored checklist', note: 'Just the tasks, no mechanics.' },
    rationale: 'The failure mode isn\'t doing the work — it\'s not coming back. So the app rewards showing up: a streak and XP make consistency visible. I keep the mechanics secondary to the day\'s actual activities so they serve the goal instead of becoming it.',
    decision: 'Shipped light gamification. The activities lead; the points sit under them.',
  },
  {
    n: '04',
    title: 'The daily surface',
    shipped: { label: 'A few short activities + an optional reflection', note: 'A small, startable day.' },
    explored: { label: 'A long task list / "builds on yesterday" header', note: 'More context, more to read.' },
    rationale: 'A handful of startable activities beats a backlog, and a one-line reflection captures momentum without forcing a journaling chore. Today\'s door should open faster than any explanation of why today matters.',
    decision: 'Shipped a small day with reflection optional.',
  },
] as const;

// SOLUTION — the shipped product, screen by screen, each with its reason (live greyscale build)
const SOLUTION = [
  { img: '/images/firstday/live-create.png', step: 'Create', why: 'One sentence, or a template. The AI builds the whole program — no planning screen to abandon.' },
  { img: '/images/firstday/live-program.png', step: 'Program', why: 'Your goal becomes sprints, revealed a week at a time. Days unlock as you go; a streak and XP track that you kept showing up.' },
  { img: '/images/firstday/live-day.png', step: 'The day', why: 'A few short activities with a clear start, plus a one-line reflection. Small enough to actually begin.' },
  { img: '/images/firstday/live-finish.png', step: 'The payoff', why: 'Finish a day and it celebrates. The reward is for returning — the part that was actually hard.' },
] as const;

// REFLECTION — honest, what I learned and what's next
const REFLECTION = [
  { tag: 'What worked', body: 'Removing the setup was the design. One field, no categories, no planning screen — that\'s what gets someone from a vague goal to a real plan in under a minute. The front-door friction is where goals actually die.' },
  { tag: 'What I\'d revisit', body: 'The gamification. Streaks and XP get people back, but they can quietly become the goal. The thing I watch is whether the points ever start outranking the activities — if they do, they get dialed back down.' },
  { tag: 'What\'s next', body: 'Tighter feedback between sprints — using how the last week actually went to shape the next one, instead of only unlocking the days that follow.' },
] as const;

const BG = {
  hero: 'var(--paper)',
  context: 'var(--surface-2)',
  problem: 'var(--surface-3)',
  process: 'var(--surface-2)',
  solution: 'var(--surface-3)',
  outcome: 'var(--out-navy)',
  reflection: 'var(--surface-2)',
} as const;

export default function DayOneCaseStudy({ onBack, onNavigate }: DayOneCaseStudyProps) {
  const textColor = 'var(--ink)';
  const secondaryTextColor = 'var(--ink-2)';
  const primaryColor = 'var(--ink)';
  const statBg = 'rgba(var(--hairline),0.02)';
  const sectionPad = 'py-8 md:py-12';
  const inner = 'w-full px-4 md:px-8 max-w-[90rem] mx-auto';
  const eyebrow = 'text-[11px] font-bold tracking-[0.2em] uppercase mb-2';
  const heading = 'text-2xl md:text-4xl font-bold mb-2';
  const lede = 'text-sm md:text-base mb-6 leading-relaxed';

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG.hero }}>
      {/* Fixed back + visit site bar */}
      <div className="fixed top-12 md:top-14 left-0 right-0 z-[100] bg-[var(--paper)] py-3 px-4 md:px-8 flex items-center gap-4">
        <button onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: primaryColor, borderRadius: 0 }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <a href="https://firstday.life" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-80"
          style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', borderRadius: 0 }}>
          <ExternalLink className="w-4 h-4" /> Visit Live Site
        </a>
      </div>

      {/* 1 · HERO — one-liner + outcome */}
      <NavigableSection id="d1-hero" label="Hero" style={{ backgroundColor: BG.hero }}>
        <div className={inner}>
          <TextCard padding="lg">
            <div className="min-h-[72vh] flex flex-col md:flex-row items-center gap-8 md:gap-14 py-6 md:py-8">
              <div className="w-full md:w-1/2">
                <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Live Product</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight" style={{ color: textColor }}>FIRSTDAY.LIFE</h1>
                <p className="text-lg md:text-xl mb-3 leading-relaxed" style={{ color: secondaryTextColor }}>
                  A web app that turns any &ldquo;someday&rdquo; goal into an AI-built program you actually follow. The problem was never motivation.
                </p>
                <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: textColor }}>
                  It was the blank page between wanting something and knowing what to do tomorrow morning. Type a goal; the AI builds the plan and paces it one sprint at a time.
                </p>
                <div className="inline-block px-4 py-2.5" style={{ borderLeft: '4px solid var(--ink)', backgroundColor: statBg }}>
                  <p className="text-sm font-bold" style={{ color: textColor }}>Designed, built, and shipped live — solo.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <PhoneMockup
                  screenshot="/images/firstday/live-hero.png"
                  gradientFrom={primaryColor}
                  gradientTo="var(--paper)"
                  alt="FirstDay.Life hero"
                  size="large"
                />
              </div>
            </div>
          </TextCard>
        </div>
      </NavigableSection>

      {/* 2 · CONTEXT — role, tools, scope, status */}
      <NavigableSection id="d1-context" label="Context" style={{ backgroundColor: BG.context }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className={eyebrow} style={{ color: secondaryTextColor }}>01 — Context</p>
              <h2 className={heading} style={{ color: textColor }}>Role &amp; scope</h2>
              <p className={lede} style={{ color: secondaryTextColor }}>
                A personal product I took from problem to live deployment. No team to hand off to — every decision below is mine.
              </p>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" staggerDelay={0.05}>
                {CONTEXT.map(({ label, value }) => (
                  <StaggerItem key={label}>
                    <div className="p-4 h-full" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
                      <p className="text-[10px] font-bold mb-1.5 tracking-wider uppercase" style={{ color: primaryColor }}>{label}</p>
                      <p className="text-sm leading-snug" style={{ color: textColor }}>{value}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* 3 · PROBLEM — the friction path + I was the user */}
      <NavigableSection id="d1-problem" label="Problem" style={{ backgroundColor: BG.problem }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className={eyebrow} style={{ color: secondaryTextColor }}>02 — Problem</p>
              <h2 className={heading} style={{ color: textColor }}>Goals die before day one</h2>
              <p className={lede} style={{ color: secondaryTextColor }}>
                Eleven steps from &ldquo;I should&rdquo; to quietly forgotten. Every goal-setting app drops you at step 5 and assumes the rest. The friction is everywhere else — and I know it because I was the user.
              </p>

              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6" staggerDelay={0.04}>
                {STARTER_JOURNEY.map(({ step, label, friction }) => (
                  <StaggerItem key={step}>
                    <div className="p-3 h-full flex flex-col" style={{
                      backgroundColor: statBg,
                      border: friction ? '1px solid rgba(var(--hairline),0.25)' : '1px solid rgba(var(--hairline),0.06)',
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="p-4 flex flex-col justify-center" style={{ backgroundColor: statBg, border: '1px dashed rgba(var(--hairline),0.18)' }}>
                  <p className="text-3xl md:text-4xl font-black" style={{ color: primaryColor }}>92%</p>
                  <p className="text-sm font-bold mt-1" style={{ color: textColor }}>of New Year&apos;s resolutions are abandoned by mid-February</p>
                  <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>University of Scranton</p>
                </div>
                <div className="p-4 flex flex-col justify-center" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
                  <p className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: primaryColor }}>User 0</p>
                  <p className="text-sm leading-snug" style={{ color: textColor }}>I quit guitar four times before this existed. I built it for the version of me that kept abandoning the same goals — then tested every decision on myself.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {FAILURES.map(({ tag, body }) => (
                  <div key={tag} className="p-3" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
                    <p className="text-[10px] font-bold tracking-wider mb-1.5 uppercase" style={{ color: primaryColor }}>{tag}</p>
                    <p className="text-[12px] leading-snug" style={{ color: textColor }}>{body}</p>
                  </div>
                ))}
              </div>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* 4 · PROCESS — the four forks */}
      <NavigableSection id="d1-process" label="Process" style={{ backgroundColor: BG.process }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className={eyebrow} style={{ color: secondaryTextColor }}>03 — Process</p>
              <h2 className={heading} style={{ color: textColor }}>What if the user never plans anything?</h2>
              <p className={lede} style={{ color: secondaryTextColor }}>
                That thesis set the whole product: one sentence, and the AI turns it into a plan. From there, four forks — each with an easy default I didn&apos;t take. The reasons are the case study.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5" staggerDelay={0.06}>
                {DECISIONS.map(({ n, title, shipped, explored, rationale, decision }) => (
                  <StaggerItem key={n}>
                    <div className="p-4 md:p-5 h-full flex flex-col" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.10)' }}>
                      <div className="flex items-baseline gap-3 mb-4">
                        <p className="text-2xl font-black" style={{ color: primaryColor }}>{n}</p>
                        <p className="text-base font-bold" style={{ color: textColor }}>{title}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="inline-block w-2 h-2" style={{ backgroundColor: primaryColor }} />
                            <p className="text-[10px] font-bold tracking-wider uppercase" style={{ color: primaryColor }}>Chose</p>
                          </div>
                          <p className="text-sm font-bold mb-1" style={{ color: textColor }}>{shipped.label}</p>
                          <p className="text-[11px] leading-snug" style={{ color: secondaryTextColor }}>{shipped.note}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="inline-block w-2 h-2" style={{ backgroundColor: 'transparent', border: `1px dashed ${secondaryTextColor}` }} />
                            <p className="text-[10px] font-bold tracking-wider uppercase" style={{ color: secondaryTextColor }}>Considered</p>
                          </div>
                          <p className="text-sm font-bold mb-1" style={{ color: textColor }}>{explored.label}</p>
                          <p className="text-[11px] leading-snug" style={{ color: secondaryTextColor }}>{explored.note}</p>
                        </div>
                      </div>
                      <div className="mt-auto pt-3" style={{ borderTop: '1px solid rgba(var(--hairline),0.08)' }}>
                        <p className="text-[11px] leading-relaxed mb-3" style={{ color: secondaryTextColor }}>{rationale}</p>
                        <div className="flex items-start gap-2" style={{ borderLeft: '2px solid var(--ink)', paddingLeft: '8px' }}>
                          <p className="text-[10px] font-bold tracking-wider uppercase shrink-0" style={{ color: primaryColor }}>Decision</p>
                          <p className="text-[11px] leading-snug" style={{ color: textColor }}>{decision}</p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* 5 · SOLUTION — the shipped product, annotated */}
      <NavigableSection id="d1-solution" label="Solution" style={{ backgroundColor: BG.solution }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className={eyebrow} style={{ color: secondaryTextColor }}>04 — Solution</p>
              <h2 className={heading} style={{ color: textColor }}>Four screens, one loop</h2>
              <p className={lede} style={{ color: secondaryTextColor }}>
                The whole product is a loop you keep returning to: describe the goal → get a program → do the day → get the payoff. Here it is shipped — each screen with the reason it looks the way it does.
              </p>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" staggerDelay={0.06}>
                {SOLUTION.map(({ img, step, why }) => (
                  <StaggerItem key={step}>
                    <div className="h-full flex flex-col" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
                      <div className="p-3 flex items-center justify-center" style={{ backgroundColor: '#f5f5f7', borderBottom: '1px solid rgba(var(--hairline),0.08)' }}>
                        <img src={img} alt={step} className="w-full h-auto max-h-[420px] object-contain" loading="lazy" />
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] font-bold tracking-wider mb-1 uppercase" style={{ color: primaryColor }}>{step}</p>
                        <p className="text-[12px] leading-snug" style={{ color: textColor }}>{why}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* 6 · OUTCOME */}
      <NavigableSection id="d1-outcome" label="Outcome" style={{ backgroundColor: BG.outcome }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg" style={{ borderLeft: '4px solid var(--ink)' }}>
              <p className={eyebrow} style={{ color: secondaryTextColor }}>05 — Outcome</p>
              <p className="text-xl md:text-3xl font-bold leading-relaxed mb-3" style={{ color: textColor }}>
                Designed, built, and shipped. <span style={{ color: primaryColor }}>Day one actually happens.</span>
              </p>
              <p className="text-sm md:text-base mb-5 leading-relaxed" style={{ color: secondaryTextColor }}>
                Live at <a href="https://firstday.life" target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, fontWeight: 600 }}>firstday.life</a> — a real, deployed product on its own backend. Type a goal, wake up with a plan.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { stat: '3', label: 'Activities per day' },
                  { stat: '1 wk', label: 'At a time' },
                  { stat: '0', label: 'Planning required' },
                  { stat: '< 1 min', label: 'To first plan' },
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

      {/* 7 · REFLECTION */}
      <NavigableSection id="d1-reflection" label="Reflection" style={{ backgroundColor: BG.reflection }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className={eyebrow} style={{ color: secondaryTextColor }}>06 — Reflection</p>
              <h2 className={heading} style={{ color: textColor }}>What I learned, what&apos;s next</h2>
              <p className={lede} style={{ color: secondaryTextColor }}>
                The honest version — what held up, what I&apos;m still unsure about, and where it goes from here.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.06}>
                {REFLECTION.map(({ tag, body }) => (
                  <StaggerItem key={tag}>
                    <div className="p-4 h-full" style={{ backgroundColor: statBg, border: '1px solid rgba(var(--hairline),0.08)' }}>
                      <p className="text-[10px] font-bold tracking-wider mb-2 uppercase" style={{ color: primaryColor }}>{tag}</p>
                      <p className="text-[13px] leading-relaxed" style={{ color: textColor }}>{body}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      <NextProject currentProjectId="day-one-case-study" onNavigate={onNavigate} />
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
