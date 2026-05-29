'use client';

import { ArrowLeft, ExternalLink, AlertTriangle, ArrowRight } from 'lucide-react';
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

const DESIGN_MOVES = [
  {
    n: '01',
    title: 'Natural-language input',
    failure: 'Categories, milestones, sub-goals',
    move: 'One text field. AI interprets intent. You speak.',
    img: '/images/firstday/wf-input.png',
  },
  {
    n: '02',
    title: 'AI plans the week',
    failure: '"How do I break this into steps?"',
    move: 'Full 7-day plan in seconds. No planning screen.',
    img: '/images/firstday/wf-plan.png',
  },
  {
    n: '03',
    title: '7-day visible finish',
    failure: 'Mid-sprint motivation dip',
    move: 'A grid, not an infinite timeline. Finish line in view.',
    img: '/images/firstday/wf-week-7day.png',
  },
  {
    n: '04',
    title: 'Three things daily',
    failure: 'Five-to-seven tasks = decision fatigue',
    move: '15–30 min each. Check three boxes. Day done.',
    img: '/images/firstday/wf-daily-flat.png',
  },
] as const;

const TRADEOFFS = [
  { cut: '5–7 tasks per day', why: 'Three is where "I can do this" doesn\'t become "tomorrow."' },
  { cut: 'Goal categories', why: '"More time with my kids" isn\'t fitness or finance. Free-form text.' },
  { cut: '30-day plans', why: 'Too long. By week two it\'s a chore. Seven days keeps the finish in view.' },
  { cut: 'User plan editing', why: 'Customization creates "should I change this?" anxiety. AI plans. You execute.' },
] as const;

const BG = {
  hero: '#000000',
  journey: '#18181b',
  validation: '#050507',
  ideation: '#18181b',
  decisions: '#0c0c10',
  iteration: '#050507',
  outcome: '#04101c',
} as const;

const DECISIONS = [
  {
    n: '01',
    title: 'Sprint length',
    shipped: { label: '7-day', img: '/images/firstday/calendar-view.png', note: 'Finish in view by day 1.' },
    explored: { label: '30-day arc, one week at a time', img: '/images/firstday/wf-week.png', note: 'Bigger milestone, week-by-week reveal.' },
    rationale: '30 days felt more ambitious on paper, but it reintroduces the infinite-timeline feeling I designed away. The visible finish line is the point — once the user can\'t see Saturday from Monday, the app stops working.',
    decision: 'Shipped 7. Holding the 30-day arc as a v2 wrapper, not a replacement.',
  },
  {
    n: '02',
    title: 'Daily card surface',
    shipped: { label: 'Three flat tasks', img: '/images/firstday/day-view.png', note: 'Today reads in five seconds.' },
    explored: { label: '"Builds on yesterday" header', img: '/images/firstday/wf-daily.png', note: 'Today is contextualized by yesterday.' },
    rationale: 'The "builds on Day X" framing is honest to how skills compound, but it adds a recall task before the user can check a box. Today\'s door should open faster than the explanation of why today matters.',
    decision: 'Shipped flat. The contextual header is a Notes-app feature pretending to be a goal app.',
  },
  {
    n: '03',
    title: 'End-of-week reflection',
    shipped: { label: 'Implicit re-plan', note: 'AI re-plans week 2 from completion data alone.' },
    explored: { label: 'Explicit recap — Hold / Push +1 / Pull back', img: '/images/firstday/wf-recap.png', note: 'User writes next week from a checklist.' },
    rationale: 'Forcing weekly reflection adds friction at the most fragile moment — right after a 7-day commitment closes. Implicit re-planning preserves momentum. But it also means the user has no tiller. This is the decision I\'m least sure about.',
    decision: 'Shipped implicit. The recap loop is the most likely thing I add back.',
  },
  {
    n: '04',
    title: 'Social surface',
    shipped: { label: 'Fully private', note: 'Goal data stays yours. No followers, no exports.' },
    explored: { label: 'Followable 30-day arc', img: '/images/firstday/wf-share.png', note: 'Profile = live arc. Daily cards export at 9:16.' },
    rationale: 'Social mechanics drive engagement, but they also drive performative goal-setting — picking goals that look good on a profile instead of goals that actually matter. v1 prioritizes the goal over the audience.',
    decision: 'Shipped private. Followable arcs are a real growth lever if I ever need one.',
  },
] as const;

export default function DayOneCaseStudy({ onBack, onNavigate }: DayOneCaseStudyProps) {
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';
  const primaryColor = '#ffffff';
  const statBg = 'rgba(255,255,255,0.02)';
  const sectionPad = 'py-8 md:py-12';
  const inner = 'w-full px-4 md:px-8 max-w-[90rem] mx-auto';

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG.hero }}>
      {/* Fixed back + visit site bar */}
      <div className="fixed top-12 md:top-14 left-0 right-0 z-[100] bg-black py-3 px-4 md:px-8 flex items-center gap-4">
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
      <NavigableSection id="d1-hero" label="Hero" style={{ backgroundColor: BG.hero }}>
        <div className={inner}>
          <TextCard padding="lg">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: secondaryTextColor }}>WHAT</p>
            <div className="min-h-[78vh] flex flex-col md:flex-row items-center gap-8 md:gap-14 py-6 md:py-8">
              <div className="w-full md:w-1/2">
                <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Live Product</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight" style={{ color: textColor }}>FIRSTDAY.LIFE</h1>
                <p className="text-lg md:text-xl mb-3 leading-relaxed" style={{ color: secondaryTextColor }}>
                  Everyone has a goal they&apos;ve been &ldquo;meaning to start.&rdquo; The problem was never motivation.
                </p>
                <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: textColor }}>
                  It was the blank page between wanting something and knowing what to do tomorrow morning. An AI-powered system that turns any goal into a 7-day plan and iterates on your feedback week after week.
                </p>
                <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.06}>
                  {[
                    { label: 'THE USER', value: 'Stuck between "I want to" and "I don\'t know how"' },
                    { label: 'THE PAIN', value: 'Planning fatigue kills goals before day 1', highlight: true },
                    { label: 'MY ROLE', value: 'Solo designer & developer' },
                    { label: 'STATUS', value: 'Live at firstday.life' },
                  ].map(({ label, value, highlight }) => (
                    <StaggerItem key={label}>
                      <div>
                        <p className="text-[10px] font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                        <p className="text-sm" style={{ color: highlight ? primaryColor : textColor, fontWeight: highlight ? 700 : 400 }}>{value}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
              <div className="w-full md:w-1/2">
                <PhoneMockup
                  screenshot="/images/firstday/hero.png"
                  gradientFrom={primaryColor}
                  gradientTo="#000000"
                  alt="FirstDay.Life hero"
                  size="large"
                />
              </div>
            </div>
          </TextCard>
        </div>
      </NavigableSection>

      {/* USER JOURNEY — 11 steps from goal to abandonment */}
      <NavigableSection id="d1-user-journey" label="User Journey" style={{ backgroundColor: BG.journey }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 01</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>User Journey</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Eleven steps from &ldquo;I should&rdquo; to quietly forgotten. Every goal-setting app drops you at step 5 and assumes the rest. The friction is everywhere else.
              </p>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-2.5" staggerDelay={0.04}>
                {STARTER_JOURNEY.map(({ step, label, friction }) => (
                  <StaggerItem key={step}>
                    <div className="p-3 h-full flex flex-col" style={{
                      backgroundColor: statBg,
                      border: friction ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.06)',
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

      {/* VALIDATION — own experience + frameworks */}
      <NavigableSection id="d1-validation" label="Validation" style={{ backgroundColor: BG.validation }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 02</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Validation</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                I was the user. I&apos;d started and abandoned the same goals enough times to recognize the pattern — and the literature on habit formation says the same thing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                {[
                  { stat: '92%', label: 'New Year\'s resolutions', sub: 'Abandoned by mid-February (U. of Scranton)' },
                  { stat: '< 1 min', label: 'To first plan', sub: 'Type goal. Wake up with a plan.' },
                  { stat: 'Self', label: 'As first user', sub: 'I quit guitar 4 times before this' },
                ].map(({ stat, label, sub }) => (
                  <div key={label} className="p-4" style={{ backgroundColor: statBg, border: '1px dashed rgba(255,255,255,0.12)' }}>
                    <p className="text-2xl md:text-3xl font-black" style={{ color: primaryColor }}>{stat}</p>
                    <p className="text-sm font-bold mt-1" style={{ color: textColor }}>{label}</p>
                    <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{sub}</p>
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-bold tracking-wider mb-3 uppercase" style={{ color: primaryColor }}>Three goals I quit before this existed</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { tag: 'Learn guitar', body: 'Bought the guitar. Bought the book. Stared at chord diagrams for a week. Never picked it up again. Day-one paralysis.' },
                  { tag: 'Get up at 6am', body: 'Built a Notion habit tracker. Spent the hour I should have slept designing the tracker. Quit by day three.' },
                  { tag: 'Run a 5K', body: 'Couch-to-5K plan was 9 weeks. Week 4 hurt. Skipped one run. Skipped a week. The plan still sits in my Notes app.' },
                ].map(({ tag, body }) => (
                  <div key={tag} className="p-3" style={{ backgroundColor: statBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[10px] font-bold tracking-wider mb-1.5 uppercase" style={{ color: primaryColor }}>{tag}</p>
                    <p className="text-[12px] leading-snug" style={{ color: textColor }}>{body}</p>
                  </div>
                ))}
              </div>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* IDEATION — 4 design moves */}
      <NavigableSection id="d1-ideation" label="Ideation" style={{ backgroundColor: BG.ideation }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 03</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Ideation</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Four design moves, each collapsing a moment from the journey above. Thesis: <em>what if the user never plans anything?</em> Lo-fi wireframes below — the structure I drew before anything got polished.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-3" staggerDelay={0.05}>
                {DESIGN_MOVES.map(({ n, title, failure, move, img }) => (
                  <StaggerItem key={n}>
                    <div className="p-3 h-full flex flex-col" style={{ backgroundColor: statBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-black" style={{ color: primaryColor }}>{n}</p>
                        <p className="text-xs font-bold" style={{ color: textColor }}>{title}</p>
                      </div>
                      <div className="mb-2 h-72 flex items-center justify-center p-2 relative" style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#f5f5f7' }}>
                        <span className="absolute top-1.5 left-1.5 text-[8px] font-bold tracking-[0.18em] uppercase px-1.5 py-0.5" style={{ color: '#6b6b73', border: '1px solid #0d0d10', backgroundColor: '#ffffff' }}>Wireframe</span>
                        <img src={img} alt={title} className="max-w-full max-h-full object-contain" loading="lazy" />
                      </div>
                      <div className="mb-1.5">
                        <p className="text-[10px] font-bold tracking-wider mb-0.5" style={{ color: secondaryTextColor }}>FAILURE POINT</p>
                        <p className="text-[11px] leading-snug" style={{ color: secondaryTextColor }}>{failure}</p>
                      </div>
                      <div style={{ borderLeft: '2px solid #ffffff', paddingLeft: '8px' }}>
                        <p className="text-[10px] font-bold tracking-wider mb-0.5" style={{ color: primaryColor }}>MOVE</p>
                        <p className="text-[11px] leading-snug" style={{ color: textColor }}>{move}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* DECISIONS — 4 tradeoffs, text-only */}
      <NavigableSection id="d1-decisions" label="Decisions" style={{ backgroundColor: BG.decisions }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 04</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Decisions</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Four tradeoffs where I considered a heavier alternative and chose the lighter one. The reasons are the case study.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5" staggerDelay={0.06}>
                {DECISIONS.map(({ n, title, shipped, explored, rationale, decision }) => (
                  <StaggerItem key={n}>
                    <div className="p-4 md:p-5 h-full flex flex-col" style={{ backgroundColor: statBg, border: '1px solid rgba(255,255,255,0.08)' }}>
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
                      <div className="mt-auto pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <p className="text-[11px] leading-relaxed mb-3" style={{ color: secondaryTextColor }}>{rationale}</p>
                        <div className="flex items-start gap-2" style={{ borderLeft: '2px solid #ffffff', paddingLeft: '8px' }}>
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

      {/* ITERATION — 4 deliberate cuts */}
      <NavigableSection id="d1-iteration" label="Iteration" style={{ backgroundColor: BG.iteration }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 05</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Iteration</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                I shipped each cut after testing the alternative on myself. Every one of these started as a feature I had to remove.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-3" staggerDelay={0.05}>
                {TRADEOFFS.map(({ cut, why }, i) => (
                  <StaggerItem key={cut}>
                    <div className="p-3 h-full flex flex-col" style={{ backgroundColor: statBg, border: '1px solid rgba(255,255,255,0.06)' }}>
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
      <NavigableSection id="d1-outcome" label="Outcome" style={{ backgroundColor: BG.outcome }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>OUTCOME</p>
              <p className="text-xl md:text-3xl font-bold leading-relaxed mb-3" style={{ color: textColor }}>
                Designed, built, and shipped. <span style={{ color: primaryColor }}>Day one actually happens.</span>
              </p>
              <p className="text-sm md:text-base mb-5 leading-relaxed" style={{ color: secondaryTextColor }}>
                Live at <a href="https://firstday.life" target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, fontWeight: 600 }}>firstday.life</a> — type a goal, wake up with a plan.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { stat: '3', label: 'Tasks per day' },
                  { stat: '7', label: 'Day sprints' },
                  { stat: '0', label: 'Planning required' },
                  { stat: '< 1 min', label: 'To first plan' },
                ].map(({ stat, label }) => (
                  <div key={label} className="p-3 text-center" style={{ backgroundColor: statBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-xl md:text-2xl font-black" style={{ color: primaryColor }}>{stat}</p>
                    <p className="text-[10px] font-bold mt-1.5 tracking-wider uppercase" style={{ color: secondaryTextColor }}>{label}</p>
                  </div>
                ))}
              </div>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      <NextProject currentProjectId="day-one-case-study" onNavigate={onNavigate} />
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
