'use client';

import { ArrowLeft, ExternalLink, Lightbulb, Clock, Flame, Check, Sparkles } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';
import NextProject from './NextProject';
import { NavigableSection } from './NavigableSection';
import { type Page } from '@/data/projects';

interface DayOneCaseStudyProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

export default function DayOneCaseStudy({ onBack, onNavigate }: DayOneCaseStudyProps) {
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';
  const primaryColor = '#ffffff';

  const divider = '1px solid rgba(255,255,255,0.06)';

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* ── HERO ── */}
        {/* Fixed back + visit site bar */}
        <div className="fixed top-16 left-0 right-0 z-50 bg-black py-3 px-4 md:px-8 flex items-center gap-4">
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

        <NavigableSection id="d1-hero" label="Hero">

        <TextCard padding="lg">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#a1a1a6' }}>
            WHAT
          </p>

          <div className="min-h-[80vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-16" style={{ borderBottom: divider }}>
            <div className="w-full md:w-1/2">
              <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: primaryColor }}>Live Product</p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>FIRSTDAY.LIFE</h1>
              <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>
                Everyone has a goal they&apos;ve been &ldquo;meaning to start.&rdquo; The problem was never motivation.
              </p>
              <p className="text-base mb-10 leading-relaxed" style={{ color: textColor }}>
                It was the blank page between wanting something and knowing what to do tomorrow morning. I designed, built, and shipped an AI-powered system that turns any goal into a 7-day plan, then iterates on your feedback week after week — so day one actually happens.
              </p>
              <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.06}>
                {[
                  { label: 'THE USER', value: 'Anyone stuck between "I want to" and "I don\'t know how"' },
                  { label: 'THE PAIN', value: 'Planning fatigue kills goals before day 1', highlight: true },
                  { label: 'MY ROLE', value: 'Solo designer & developer' },
                  { label: 'STATUS', value: 'Live at firstday.life' },
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
                screenshot="/images/firstday/hero.png"
                gradientFrom={primaryColor}
                gradientTo="#000000"
                alt="FirstDay.Life — achieve any goal in weekly sprints"
                size="large"
              />
            </div>
          </div>
        </TextCard>
        </NavigableSection>

        {/* ── THE WEIGHT OF "SOMEDAY" ── */}
        <NavigableSection id="d1-weight" label="The Weight of Someday">
        <div className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#a1a1a6' }}>
              WHY
            </p>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
              <AnimateIn direction="left" className="w-full md:w-3/5">
                <div style={{ borderLeft: '4px solid #ffffff', paddingLeft: '1.5rem' }}>
                  <p className="text-xl md:text-3xl leading-relaxed font-bold" style={{ color: textColor }}>
                    You&apos;ve said it a hundred times. <span style={{ color: primaryColor }}>&ldquo;I&apos;m going to start.&rdquo;</span> Learn guitar. Run a 5K. Read more books. Write that thing you keep thinking about. And then Monday comes, and you don&apos;t know what the first step even looks like.
                  </p>
                </div>
              </AnimateIn>
              <AnimateIn direction="right" className="w-full md:w-2/5">
                <PhoneMockup
                  screenshot="/images/firstday/congrats-view.png"
                  gradientFrom={primaryColor}
                  gradientTo="#000000"
                  alt="What following through looks like"
                />
              </AnimateIn>
            </div>

            <AnimateIn direction="up">
              <div className="mb-8">
                <p className="text-base md:text-lg leading-relaxed" style={{ color: secondaryTextColor }}>
                  Every goal-setting app makes the same assumption: you already know the steps. You just need accountability. But for most people, the steps are the hard part. &ldquo;Learn guitar&rdquo; is a feeling, not a plan. And the gap between that feeling and a structured daily practice is where most goals quietly die.
                </p>
              </div>
            </AnimateIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.08}>
              {[
                { icon: Lightbulb, pain: 'Apps assume you know the path', detail: 'A blank page isn\'t flexibility — it\'s another decision. Decision fatigue is why you haven\'t started.' },
                { icon: Clock, pain: 'Planning fatigue kills goals before day 1', detail: 'You spend an hour building a plan. By Wednesday you\'ve abandoned it — too ambitious or too vague.' },
                { icon: Flame, pain: 'Without daily direction, ambition becomes anxiety', detail: 'Not knowing how to start isn\'t motivating — it\'s stressful. The guilt compounds until you stop thinking about the goal entirely.' },
              ].map(({ icon: Icon, pain, detail }) => (
                <StaggerItem key={pain}>
                  <div className="p-4" style={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-10 h-10 mb-4 flex items-center justify-center" style={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <Icon className="w-5 h-5" style={{ color: primaryColor }} />
                    </div>
                    <p className="text-base font-bold mb-2" style={{ color: textColor }}>{pain}</p>
                    <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>{detail}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </TextCard>
        </div>
        </NavigableSection>

        {/* ── THE INSIGHT ── */}
        <NavigableSection id="d1-insight" label="The Insight">
        <div className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 mb-12">
              <AnimateIn direction="right" className="w-full md:w-2/5">
                <PhoneMockup
                  screenshot="/images/firstday/loading-screen.png"
                  gradientFrom={primaryColor}
                  gradientTo="#000000"
                  alt="AI building your personalized plan — zero planning required"
                />
              </AnimateIn>
              <AnimateIn direction="left" className="w-full md:w-3/5">
                <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Insight</p>
                <p className="text-xl md:text-2xl font-bold mb-6" style={{ color: textColor }}>
                  People don&apos;t fail goals because they&apos;re lazy. They fail because every morning requires a decision.
                </p>
                <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                  The best goal frameworks — atomic habits, tiny habits — share one principle: remove the decision. Make the next step so obvious that starting requires zero willpower. I couldn&apos;t find an app that handled this end-to-end. The design thesis for FirstDay: <strong style={{ color: textColor }}>what if the user never plans anything?</strong> AI builds a 7-day plan. The human executes. The system learns from their feedback and builds a better next week.
                </p>
              </AnimateIn>
            </div>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.08}>
              {[
                { stat: '3', label: 'Tasks per day', sub: 'The line between "I can" and "too much"' },
                { stat: '7', label: 'Day sprints', sub: 'Short enough to finish. Smart enough to adapt.' },
                { stat: '0', label: 'Planning required', sub: 'AI handles the entire breakdown' },
                { stat: '< 1 min', label: 'To first plan', sub: 'Type your goal. Wake up with a plan.' },
              ].map(({ stat, label, sub }) => (
                <StaggerItem key={label}>
                  <div className="p-4 text-center" style={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-3xl md:text-5xl font-black" style={{ color: primaryColor }}>{stat}</p>
                    <p className="text-sm font-bold mt-2" style={{ color: textColor }}>{label}</p>
                    <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{sub}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </TextCard>
        </div>
        </NavigableSection>

        {/* ── THE SYSTEM ── */}
        <NavigableSection id="d1-system" label="The System">
        <div className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#a1a1a6' }}>
              HOW
            </p>
            <AnimateIn direction="up">
              <div className="mb-6">
                <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The System</p>
                <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
                  Each screen solves one specific moment where people normally quit.
                </p>
              </div>
            </AnimateIn>

            {/* Goal Creation → "Where do I even start?" */}
            <AnimateIn direction="left" className="mb-16">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-2/5">
                  <PhoneMockup
                    screenshot="/images/firstday/goal-creation.png"
                    gradientFrom={primaryColor}
                    gradientTo="#000000"
                    alt="Goal creation — type your dream in natural language"
                  />
                </div>
                <div className="w-full md:w-3/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: '#000000' }}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Failure Point #1</p>
                  </div>
                  <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>
                    &ldquo;Where do I even start?&rdquo;
                  </p>
                  <p className="text-base mb-4" style={{ color: secondaryTextColor }}>
                    Categories. Milestones. Sub-goals. Due dates. By the time you&apos;ve finished setting up, you&apos;ve burned the motivation that brought you there. FirstDay gives you one text field and a grid of goal suggestions — tap one or type your own in plain language. No friction between the impulse and the commitment.
                  </p>
                  <div className="p-4" style={{ backgroundColor: '#000000', borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                    <p className="text-sm" style={{ color: textColor }}>
                      <strong style={{ color: primaryColor }}>Design decision:</strong> Natural language input, not structured forms. The AI interprets intent — the user just speaks.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* AI Planning → "How do I break this down?" */}
            <AnimateIn direction="right" className="mb-16">
              <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
                <div className="w-full md:w-2/5">
                  <PhoneMockup
                    screenshot="/images/firstday/loading-screen.png"
                    gradientFrom={primaryColor}
                    gradientTo="#000000"
                    alt="AI building your personalized 7-day plan"
                  />
                </div>
                <div className="w-full md:w-3/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: '#000000' }}>
                      <Clock className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Failure Point #2</p>
                  </div>
                  <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>
                    &ldquo;How do I break this into steps?&rdquo;
                  </p>
                  <p className="text-base mb-4" style={{ color: secondaryTextColor }}>
                    &ldquo;Learn guitar&rdquo; requires knowing what to practice, in what order, at what pace — expertise beginners don&apos;t have. FirstDay&apos;s AI generates a full 7-day plan in seconds. When the week ends, it asks what worked, then builds a smarter week two. There is no planning screen.
                  </p>
                  <div className="p-4" style={{ backgroundColor: '#000000', borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                    <p className="text-sm" style={{ color: textColor }}>
                      <strong style={{ color: primaryColor }}>Design decision:</strong> The AI planning moment is a full-screen animation, not a loading spinner. It should feel like something meaningful is happening — because it is.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Calendar View → "What do I do tomorrow?" */}
            <AnimateIn direction="left" className="mb-16">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-2/5">
                  <PhoneMockup
                    screenshot="/images/firstday/calendar-view.png"
                    gradientFrom={primaryColor}
                    gradientTo="#000000"
                    alt="Weekly calendar view — your sprint at a glance"
                  />
                </div>
                <div className="w-full md:w-3/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: '#000000' }}>
                      <Flame className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Failure Point #3</p>
                  </div>
                  <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>
                    &ldquo;Am I actually making progress?&rdquo;
                  </p>
                  <p className="text-base mb-4" style={{ color: secondaryTextColor }}>
                    Mid-sprint is where motivation dips. The calendar view makes progress visible — completed days fill in, the week takes shape. Because each sprint is only 7 days, the finish line is always within reach.
                  </p>
                  <div className="p-4" style={{ backgroundColor: '#000000', borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                    <p className="text-sm" style={{ color: textColor }}>
                      <strong style={{ color: primaryColor }}>Design decision:</strong> 7-day grid, not an infinite timeline. A visible finish line changes the psychology from endurance to countdown — and weekly feedback makes each new sprint sharper than the last.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Day View → "What do I do right now?" */}
            <AnimateIn direction="right">
              <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
                <div className="w-full md:w-2/5">
                  <PhoneMockup
                    screenshot="/images/firstday/day-view.png"
                    gradientFrom={primaryColor}
                    gradientTo="#000000"
                    alt="Daily task view — three focused activities"
                  />
                </div>
                <div className="w-full md:w-3/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: '#000000' }}>
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Failure Point #4</p>
                  </div>
                  <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>
                    &ldquo;What do I do right now?&rdquo;
                  </p>
                  <p className="text-base mb-4" style={{ color: secondaryTextColor }}>
                    Three things. Not five, not ten — three. Each takes 15&ndash;30 minutes. When the daily ask fits between coffee and work, you don&apos;t need discipline — you just check three boxes. The satisfaction of a completed day compounds across the week, then the system asks what worked and builds a better next sprint.
                  </p>
                  <div className="p-4" style={{ backgroundColor: '#000000', borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                    <p className="text-sm" style={{ color: textColor }}>
                      <strong style={{ color: primaryColor }}>Design decision:</strong> No partial credit. Complete all three or the day stays open. Finishing feels like something.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </TextCard>
        </div>
        </NavigableSection>

        {/* ── MORE OF THE APP ── */}
        <NavigableSection id="d1-screens" label="The Live Product">
        <div className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#a1a1a6' }}>
              OUTCOME
            </p>
            <AnimateIn direction="up">
              <div className="mb-10">
                <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Live Product</p>
                <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
                  Designed, built, and shipped — every screen considered.
                </p>
              </div>
            </AnimateIn>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12" staggerDelay={0.08}>
              {[
                { src: '/images/firstday/goal-creation.png', label: 'Set your goal' },
                { src: '/images/firstday/loading-screen.png', label: 'AI builds your plan' },
                { src: '/images/firstday/calendar-view.png', label: 'Your weekly sprint' },
                { src: '/images/firstday/day-view.png', label: 'Daily activities' },
                { src: '/images/firstday/congrats-view.png', label: 'Celebrate wins' },
              ].map(({ src, label }) => (
                <StaggerItem key={label}>
                  <div className="text-center">
                    <PhoneMockup screenshot={src} alt={label} size="tiny" />
                    <div className="mt-2 text-center">
                      <p className="text-xs font-bold tracking-wider uppercase" style={{ color: secondaryTextColor }}>{label}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Website screenshots — flat images, not phone mockups */}
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" staggerDelay={0.08}>
              {[
                { src: '/images/firstday/hero.png', label: 'Hero' },
                { src: '/images/firstday/features.png', label: 'How It Works' },
                { src: '/images/firstday/mosaic.png', label: 'Steps' },
                { src: '/images/firstday/section-3.png', label: 'Social Proof' },
              ].map(({ src, label }) => (
                <StaggerItem key={label}>
                  <div>
                    <div className="overflow-hidden rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                      <img src={src} alt={`FirstDay.Life ${label}`} className="w-full h-auto object-cover" loading="lazy" />
                    </div>
                    <div className="mt-2 text-center">
                      <p className="text-xs font-bold" style={{ color: secondaryTextColor }}>{label}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <div className="text-center">
              <p className="text-sm" style={{ color: secondaryTextColor }}>
                Live at <a href="https://firstday.life" target="_blank" rel="noopener noreferrer" style={{ color: primaryColor, fontWeight: 600 }}>firstday.life</a>
              </p>
            </div>
          </TextCard>
        </div>
        </NavigableSection>

        {/* ── TRADE-OFFS ── */}
        <NavigableSection id="d1-tradeoffs" label="Trade-Offs">
        <AnimateIn direction="up" className="py-16 md:py-24">
          <TextCard padding="lg">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Trade-Offs</p>
            <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>
              Every design decision cut something else. Here&apos;s what I chose and why.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ color: secondaryTextColor }}>
              Every cut was deliberate — made by asking &ldquo;does this serve someone who&apos;s never followed through on a goal before?&rdquo;
            </p>

            <StaggerContainer className="space-y-6" staggerDelay={0.1}>
              <StaggerItem>
                <div className="p-6" style={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-lg font-bold mb-2" style={{ color: textColor }}>3 tasks per day, never more</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                    Early versions generated 5&ndash;7 tasks. I stopped finishing days. Three is where &ldquo;I can do this&rdquo; doesn&apos;t become &ldquo;I&apos;ll do it tomorrow.&rdquo; 15&ndash;30 minutes each. The constraint is the reason people finish.
                  </p>
                  <p className="text-xs font-bold tracking-wider" style={{ color: primaryColor }}>CUT: Comprehensive daily plans with 5&ndash;7 activities</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-6" style={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-lg font-bold mb-2" style={{ color: textColor }}>Natural language, not goal categories</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                    Fitness. Finance. Learning. Career. Every competitor makes you pick a box. But &ldquo;I want to spend more time with my kids&rdquo; isn&apos;t fitness or finance. FirstDay takes free-form text and lets the AI handle structure. You describe the feeling. The system organizes.
                  </p>
                  <p className="text-xs font-bold tracking-wider" style={{ color: primaryColor }}>CUT: Structured goal taxonomies and category pickers</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-6" style={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-lg font-bold mb-2" style={{ color: textColor }}>7-day sprints, not 30-day plans</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                    The first version was a 30-day plan. Too long. By week two, it felt like a chore. Seven days is short enough to always see the finish line. When a sprint ends, you reflect. The AI takes that feedback and builds a smarter next week. That loop — not a month-long commitment — is the product.
                  </p>
                  <p className="text-xs font-bold tracking-wider" style={{ color: '#eab308' }}>CUT: 30-day plans and open-ended habit tracking</p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="p-6" style={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-lg font-bold mb-2" style={{ color: textColor }}>AI plans everything — user plans nothing</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                    An earlier version let users rearrange the AI plan. I didn&apos;t use it — and the option created anxiety. &ldquo;Should I change this? Is the AI wrong?&rdquo; More decisions. More friction. The final design has no planning interface. AI plans the week. You execute. At the end, you give feedback — and the next sprint adapts. Reflection, not micromanagement.
                  </p>
                  <p className="text-xs font-bold tracking-wider" style={{ color: '#ef4444' }}>CUT: User-customizable plan editing and reordering</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </TextCard>
        </AnimateIn>
        </NavigableSection>
      </div>
      <NavigableSection id="d1-next" label="Next Project">
      <NextProject currentProjectId="day-one-case-study" onNavigate={onNavigate} />
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
      </NavigableSection>
    </div>
  );
}
