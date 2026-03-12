'use client';

import { ArrowLeft, ExternalLink, Lightbulb, Clock, Flame, Check, Sparkles } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';
import PhoneMockup from './PhoneMockup';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';
import NextProject from './NextProject';
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

        {/* ── HERO ── */}
        <div className="min-h-[80vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-16" style={{ borderBottom: divider }}>
          <AnimateIn direction="left" className="w-full md:w-1/2">
            <TextCard padding="lg">
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
            </TextCard>
          </AnimateIn>

          <AnimateIn direction="right" className="w-full md:w-1/2">
            <PhoneMockup
              screenshot="/images/firstday/hero.png"
              gradientFrom={primaryColor}
              gradientTo="#000000"
              alt="FirstDay.Life — achieve any goal in weekly sprints"
              size="large"
            />
          </AnimateIn>
        </div>

        {/* ── THE WEIGHT OF "SOMEDAY" ── */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" className="mb-8" style={{ borderLeft: '4px solid #ffffff' }}>
            <p className="text-xl md:text-3xl leading-relaxed font-bold" style={{ color: textColor }}>
              You&apos;ve said it a hundred times. <span style={{ color: primaryColor }}>&ldquo;I&apos;m going to start.&rdquo;</span> Learn guitar. Run a 5K. Read more books. Write that thing you keep thinking about. And then Monday comes, and you don&apos;t know what the first step even looks like.
            </p>
          </TextCard>
          <TextCard padding="md" className="mb-8">
            <p className="text-base md:text-lg leading-relaxed" style={{ color: secondaryTextColor }}>
              Every goal-setting app makes the same assumption: you already know the steps. You just need accountability. But for most people, the steps are the hard part. &ldquo;Learn guitar&rdquo; is a feeling, not a plan. And the gap between that feeling and a structured daily practice is where most goals quietly die.
            </p>
          </TextCard>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.08}>
            {[
              { icon: Lightbulb, pain: 'Apps assume you know the path', detail: 'A blank page isn\'t flexibility — it\'s another decision. Decision fatigue is why you haven\'t started.' },
              { icon: Clock, pain: 'Planning fatigue kills goals before day 1', detail: 'You spend an hour building a plan. By Wednesday you\'ve abandoned it — too ambitious or too vague.' },
              { icon: Flame, pain: 'Without daily direction, ambition becomes anxiety', detail: 'Not knowing how to start isn\'t motivating — it\'s stressful. The guilt compounds until you stop thinking about the goal entirely.' },
            ].map(({ icon: Icon, pain, detail }) => (
              <StaggerItem key={pain}>
                <TextCard padding="md">
                  <div className="w-10 h-10 mb-4 flex items-center justify-center" style={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Icon className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <p className="text-base font-bold mb-2" style={{ color: textColor }}>{pain}</p>
                  <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>{detail}</p>
                </TextCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* ── THE INSIGHT ── */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="md" className="mb-6">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Insight</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
              People don&apos;t fail goals because they&apos;re lazy. They fail because every morning requires a decision.
            </p>
          </TextCard>
          <TextCard padding="md" className="mb-8">
            <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
              The best goal frameworks — atomic habits, tiny habits — share one principle: remove the decision. Make the next step so obvious that starting requires zero willpower. No existing app did this end-to-end. The design thesis for FirstDay: <strong style={{ color: textColor }}>what if the user never plans anything?</strong> AI builds a 7-day plan. The human executes. The system learns from their feedback and builds a better next week.
            </p>
          </TextCard>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.08}>
            {[
              { stat: '3', label: 'Tasks per day', sub: 'The line between "I can" and "too much"' },
              { stat: '7', label: 'Day sprints', sub: 'Short enough to finish. Smart enough to adapt.' },
              { stat: '0', label: 'Planning required', sub: 'AI handles the entire breakdown' },
              { stat: '< 1 min', label: 'To first plan', sub: 'Type your goal. Wake up with a plan.' },
            ].map(({ stat, label, sub }) => (
              <StaggerItem key={label}>
                <TextCard padding="md" className="text-center">
                  <p className="text-3xl md:text-5xl font-black" style={{ color: primaryColor }}>{stat}</p>
                  <p className="text-sm font-bold mt-2" style={{ color: textColor }}>{label}</p>
                  <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{sub}</p>
                </TextCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* ── THE SYSTEM ── */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="md" className="mb-6">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The System</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
              Each screen solves one specific moment where people normally quit.
            </p>
          </TextCard>
          <TextCard padding="md" className="mb-10">
            <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
              Every screen exists because of a specific moment where people quit. The flow eliminates friction from first impulse through mid-week dip to end-of-week reflection, where the system learns and adapts.
            </p>
          </TextCard>

          {/* Goal Creation → "Where do I even start?" */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16">
            <div className="w-full md:w-2/5">
              <ImageWithSkeleton
                src="/images/firstday/goal-creation.png"
                alt="Goal creation — type your dream in natural language"
                className="w-full"
                style={{ aspectRatio: '9/19', objectFit: 'cover', border: videoBorder }}
              />
            </div>
            <TextCard padding="lg" className="w-full md:w-3/5">
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
                Categories. Milestones. Sub-goals. Due dates. By the time you&apos;ve finished setting up, you&apos;ve burned the motivation that brought you there. FirstDay gives you one text field. Type what you want in your own words. No friction between the impulse and the commitment.
              </p>
              <div className="p-4" style={{ backgroundColor: '#000000', borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                <p className="text-sm" style={{ color: textColor }}>
                  <strong style={{ color: primaryColor }}>Design decision:</strong> Natural language input, not structured forms. The AI interprets intent — the user just speaks.
                </p>
              </div>
            </TextCard>
          </div>

          {/* AI Planning → "How do I break this down?" */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 mb-16">
            <div className="w-full md:w-2/5">
              <ImageWithSkeleton
                src="/images/firstday/loading-screen.png"
                alt="AI building your personalized 7-day plan"
                className="w-full"
                style={{ aspectRatio: '9/19', objectFit: 'cover', border: videoBorder }}
              />
            </div>
            <TextCard padding="lg" className="w-full md:w-3/5">
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
            </TextCard>
          </div>

          {/* Calendar View → "What do I do tomorrow?" */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-16">
            <div className="w-full md:w-2/5">
              <ImageWithSkeleton
                src="/images/firstday/calendar-view.png"
                alt="Weekly calendar view — your sprint at a glance"
                className="w-full"
                style={{ aspectRatio: '9/19', objectFit: 'cover', border: videoBorder }}
              />
            </div>
            <TextCard padding="lg" className="w-full md:w-3/5">
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
            </TextCard>
          </div>

          {/* Day View → "What do I do right now?" */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
            <div className="w-full md:w-2/5">
              <ImageWithSkeleton
                src="/images/firstday/day-view.png"
                alt="Daily task view — three focused activities"
                className="w-full"
                style={{ aspectRatio: '9/19', objectFit: 'cover', border: videoBorder }}
              />
            </div>
            <TextCard padding="lg" className="w-full md:w-3/5">
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
                Three things. Not five, not ten — three. Each takes 15&ndash;30 minutes. When the daily ask fits between coffee and work, you don&apos;t need discipline — you just check three boxes. The dopamine of a completed day compounds across the week, then the system asks what worked and builds a better next sprint.
              </p>
              <div className="p-4" style={{ backgroundColor: '#000000', borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                <p className="text-sm" style={{ color: textColor }}>
                  <strong style={{ color: primaryColor }}>Design decision:</strong> No partial credit. Complete all three or the day stays open. Finishing feels like something.
                </p>
              </div>
            </TextCard>
          </div>
        </AnimateIn>

        {/* ── MORE OF THE APP ── */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="md" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Live Product</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
              Designed, built, and shipped — every screen considered.
            </p>
          </TextCard>

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

        {/* ── TRADE-OFFS ── */}
        <AnimateIn direction="up" className="py-16 md:py-24">
          <TextCard padding="lg" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Trade-Offs</p>
            <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>
              Every design decision killed something else. Here&apos;s what I chose and why.
            </p>
            <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
              Every cut was deliberate — made by asking &ldquo;does this serve someone who&apos;s never followed through on a goal before?&rdquo;
            </p>
          </TextCard>

          <div className="space-y-6">
            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>3 tasks per day, never more</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                Early versions generated 5&ndash;7 tasks. Completion collapsed. Three is where &ldquo;I can do this&rdquo; doesn&apos;t become &ldquo;I&apos;ll do it tomorrow.&rdquo; 15&ndash;30 minutes each. The constraint is the reason people finish.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: primaryColor }}>KILLED: Comprehensive daily plans with 5&ndash;7 activities</p>
            </TextCard>

            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>Natural language, not goal categories</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                Fitness. Finance. Learning. Career. Every competitor makes you pick a box. But &ldquo;I want to spend more time with my kids&rdquo; isn&apos;t fitness or finance. FirstDay takes free-form text and lets the AI handle structure. You describe the feeling. The system organizes.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: primaryColor }}>KILLED: Structured goal taxonomies and category pickers</p>
            </TextCard>

            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>7-day sprints with feedback, not open-ended tracking</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                Lifelong habit trackers create infinite obligations. Miss a day, streak breaks. Miss a week, app abandoned. Seven days is short enough to always see the finish line. When a sprint ends, you reflect. The AI takes that feedback and builds a smarter next week. That loop is the product.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: '#eab308' }}>KILLED: Open-ended lifetime habit tracking</p>
            </TextCard>

            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>Dark and atmospheric, not bright and motivational</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                Bright pastels and exclamation marks work for day one. By day five, they feel patronizing. FirstDay is quiet, dark, cinematic — mosaic textures, atmospheric depth. When someone types &ldquo;I want to be a better parent,&rdquo; the app should feel like it takes that seriously.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: '#eab308' }}>KILLED: Bright, energetic motivational aesthetic</p>
            </TextCard>

            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>AI plans everything — user plans nothing</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                An earlier version let users rearrange the AI plan. Nobody used it — and the option created anxiety. &ldquo;Should I change this? Is the AI wrong?&rdquo; More decisions. More friction. The final design has no planning interface. AI plans the week. You execute. At the end, you give feedback — and the next sprint adapts. Reflection, not micromanagement.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: '#ef4444' }}>KILLED: User-customizable plan editing and reordering</p>
            </TextCard>
          </div>
        </AnimateIn>
      </div>
      <NextProject currentProjectId="day-one-case-study" onNavigate={onNavigate} />
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
