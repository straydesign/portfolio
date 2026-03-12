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
              The goal-setting space is crowded. Habit trackers, journaling apps, productivity systems with 40-page onboarding flows. I tried most of them. They all make the same assumption: that you already know the steps, and you just need accountability to follow them. But for most people, the steps are the hard part. &ldquo;Learn guitar&rdquo; is a feeling, not a plan. And the gap between that feeling and a structured daily practice is where most goals quietly die.
            </p>
          </TextCard>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.08}>
            {[
              { icon: Lightbulb, pain: 'Goal-setting apps assume you already know the path', detail: 'They give you a blank page and call it "flexibility." But a blank page is just another decision to make — and decision fatigue is the reason you haven\'t started.' },
              { icon: Clock, pain: 'Planning fatigue kills goals before day 1', detail: 'You spend an hour building a plan. It feels productive. By Wednesday, you\'ve already abandoned it because it was too ambitious or too vague.' },
              { icon: Flame, pain: 'Without daily direction, ambition becomes anxiety', detail: 'Wanting something and not knowing how to get it isn\'t motivating — it\'s stressful. The guilt of another wasted week compounds until you stop thinking about the goal entirely.' },
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
              The research pointed to something simple: the most successful goal frameworks — from James Clear&apos;s atomic habits to BJ Fogg&apos;s tiny habits — share one principle. Remove the decision. Make the next step so small and so obvious that starting requires zero willpower. But no existing app did this end-to-end. They all handed you the blank page at some point and said &ldquo;now plan your journey.&rdquo; The design thesis for FirstDay was: <strong style={{ color: textColor }}>what if the user never plans anything?</strong> What if AI builds a 7-day plan, the human executes it, and then the system learns from their feedback to build a better next week?
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
                <div className="p-5 text-center" style={{ backgroundColor: '#000000', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <p className="text-3xl md:text-5xl font-black" style={{ color: primaryColor }}>{stat}</p>
                  <p className="text-sm font-bold mt-2" style={{ color: textColor }}>{label}</p>
                  <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{sub}</p>
                </div>
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
              Every screen in FirstDay exists because of a failure point I identified in existing goal-setting tools. The flow is designed to eliminate friction at each stage — from the moment someone feels the impulse to start, through the middle of the week where motivation dips, to the end-of-week reflection where the system learns what worked and builds a smarter next sprint.
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
                Every goal-setting app begins with a form. Categories. Milestones. Sub-goals. Due dates. By the time you&apos;ve finished setting up, you&apos;ve burned the motivation that brought you there. FirstDay gives you a single text field. Type what you want in your own words. No categories. No setup wizard. No friction between the impulse and the commitment.
              </p>
              <div className="p-4" style={{ backgroundColor: '#000000', borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                <p className="text-sm" style={{ color: textColor }}>
                  <strong style={{ color: primaryColor }}>Design decision:</strong> Natural language input, not structured forms. The AI interprets intent — the user just speaks.
                </p>
              </div>
            </div>
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
                This is where most people spend hours and get nowhere. Building a plan for &ldquo;learn guitar&rdquo; requires knowing what to practice, in what order, at what pace. That expertise is exactly what beginners don&apos;t have. FirstDay&apos;s AI generates a full 7-day plan in seconds — day by day, with activities calibrated to your starting point. And when the week ends, it asks what worked and what didn&apos;t, then builds a smarter week two. The user never sees a planning screen because there isn&apos;t one.
              </p>
              <div className="p-4" style={{ backgroundColor: '#000000', borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                <p className="text-sm" style={{ color: textColor }}>
                  <strong style={{ color: primaryColor }}>Design decision:</strong> The AI planning moment is a full-screen animation, not a loading spinner. It should feel like something meaningful is happening — because it is.
                </p>
              </div>
            </div>
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
                Day 3, day 5 — the middle of any sprint is where motivation dips. You can&apos;t feel progress because you&apos;re too close to it. The calendar view solves this with visible momentum. Completed days fill in. The week takes shape. You can see exactly how far you&apos;ve come and how close you are to the finish line. And because each sprint is only 7 days, that finish line is always within reach — not a month away but days.
              </p>
              <div className="p-4" style={{ backgroundColor: '#000000', borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                <p className="text-sm" style={{ color: textColor }}>
                  <strong style={{ color: primaryColor }}>Design decision:</strong> 7-day grid, not an infinite timeline. A visible finish line changes the psychology from endurance to countdown — and weekly feedback makes each new sprint sharper than the last.
                </p>
              </div>
            </div>
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
                This is the screen you see every morning. Three things. Not five, not ten — three. Each one takes 15&ndash;30 minutes. The constraint is the feature. When the daily ask is small enough to fit between coffee and work, compliance goes up dramatically. You don&apos;t need to be disciplined. You just need to check three boxes. And when you do, the dopamine hit of a completed day compounds across the week — then the system asks what felt right, what felt off, and builds a better plan for your next sprint.
              </p>
              <div className="p-4" style={{ backgroundColor: '#000000', borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                <p className="text-sm" style={{ color: textColor }}>
                  <strong style={{ color: primaryColor }}>Design decision:</strong> No partial credit. Complete all three or the day stays open. Finishing feels like something.
                </p>
              </div>
            </div>
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
              FirstDay could have been more flexible, more customizable, more feature-rich. Every cut was deliberate — made by asking &ldquo;does this serve the person who&apos;s never followed through on a goal before?&rdquo;
            </p>
          </TextCard>

          <div className="space-y-6">
            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>3 tasks per day, never more</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                Early versions generated 5&ndash;7 tasks per day. Completion rates collapsed. Three is the number where &ldquo;I can do this&rdquo; doesn&apos;t turn into &ldquo;I&apos;ll do it tomorrow.&rdquo; Each task runs 15&ndash;30 minutes — short enough to fit between commitments, long enough to feel like actual work. The constraint isn&apos;t a limitation. It&apos;s the reason people finish.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: primaryColor }}>KILLED: Comprehensive daily plans with 5&ndash;7 activities</p>
            </TextCard>

            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>Natural language, not goal categories</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                Fitness. Finance. Learning. Career. Every competitor makes you pick a box first. But goals don&apos;t fit boxes — &ldquo;I want to spend more time with my kids&rdquo; isn&apos;t fitness or finance. Categorization adds a decision that doesn&apos;t serve the user. FirstDay takes free-form text and lets the AI figure out the structure. The user describes the feeling. The system does the organizing.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: primaryColor }}>KILLED: Structured goal taxonomies and category pickers</p>
            </TextCard>

            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>7-day sprints with feedback, not open-ended tracking</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                Lifelong habit trackers create an infinite obligation. Miss a day and the streak breaks. Miss a week and you abandon the app forever. Seven days is short enough to always see the finish line, but long enough to build real momentum. When a sprint ends, you reflect — what worked, what didn&apos;t, what needs to change. The AI takes that feedback and builds a smarter next week. The system gets better because you told it what you actually experienced. That loop is the product.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: '#eab308' }}>KILLED: Open-ended lifetime habit tracking</p>
            </TextCard>

            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>Dark and atmospheric, not bright and motivational</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                Goal-setting apps default to bright pastels and exclamation marks. That energy works for day one. By day twelve, it feels patronizing. FirstDay&apos;s visual language is quiet, dark, and cinematic — mosaic textures, atmospheric gradients, a sense of depth. The design borrows from the language of discovery, not cheerleading. When someone types something vulnerable like &ldquo;I want to be a better parent,&rdquo; the app should feel like it takes that seriously.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: '#eab308' }}>KILLED: Bright, energetic motivational aesthetic</p>
            </TextCard>

            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>AI plans everything — user plans nothing</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                An earlier iteration let users edit the AI-generated plan, rearrange days, swap activities. Nobody used it — and the option itself created anxiety. &ldquo;Should I change this? Is the AI wrong? Maybe I should swap Tuesday and Thursday.&rdquo; More decisions. More friction. The final design removes the planning interface entirely. The AI plans the week. The human executes it. At the end, you give feedback — and the next sprint adapts. Your voice shapes the plan, but through reflection, not micromanagement.
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
