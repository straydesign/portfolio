'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import { ArrowLeft, ExternalLink, Target, Brain, Calendar, CheckCircle, Lightbulb, TrendingUp } from 'lucide-react';
import LiteYouTube from './LiteYouTube';
import ImageWithSkeleton from './ImageWithSkeleton';

interface DayOneCaseStudyProps {
  onBack: () => void;
}

export default function DayOneCaseStudy({ onBack }: DayOneCaseStudyProps) {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);

  const statBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
  const divider = `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`;

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* Back + Live site links */}
        <div className="pt-6 mb-8 flex items-center gap-4">
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: primaryColor }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <a href="https://firstday.life" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-80"
            style={{ backgroundColor: primaryColor, color: accentColor === 'bw' ? (theme === 'dark' ? '#000000' : '#ffffff') : '#ffffff' }}>
            <ExternalLink className="w-4 h-4" /> Visit Live Site
          </a>
        </div>

        {/* PROJECT OVERVIEW */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: primaryColor }}>FIRSTDAY.LIFE</h1>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>PROJECT OVERVIEW</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>CONCEPT</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>An AI-powered goal achievement app that breaks big dreams into manageable daily actions through personalized 30-day plans delivered in 7-day sprints.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>PROBLEM</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>People want to achieve goals but feel overwhelmed by where to start. Existing productivity apps focus on task management, not goal achievement through behavioral design.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>SOLUTION</h3>
              <p className="text-base md:text-lg font-bold" style={{ color: primaryColor }}>Tell the app your goal → AI generates a personalized 30-day plan in 7-day sprints → 3 simple daily activities → Track progress and adapt</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>MY ROLE</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>UX Designer & Concept Developer — Research, user flows, wireframing, hi-fi prototyping, and brand identity</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>TOOLS</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>Figma, Competitive Analysis, User Journey Mapping, Behavioral Design Principles</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>STATUS</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>Live at firstday.life — Gathering user feedback for iteration</p>
            </div>
          </div>
          <LiteYouTube
            videoId="YBzZwWGH9bs"
            title="FirstDay.Life Demo"
            borderColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold mb-2 text-center" style={{ color: textColor, opacity: 0.6 }}>MOBILE VIEW</p>
              <ImageWithSkeleton src="/images/firstday/mobile-landing.png" alt="FirstDay.Life mobile landing page showing goal chips and Start Your Journey CTA" className="rounded-2xl w-full" style={{ border: `2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}` }} />
            </div>
            <div>
              <p className="text-xs font-bold mb-2 text-center" style={{ color: textColor, opacity: 0.6 }}>DESKTOP VIEW</p>
              <ImageWithSkeleton src="/images/firstday/desktop-landing.png" alt="FirstDay.Life desktop landing page showing popular goals and onboarding flow" className="rounded-2xl w-full" style={{ border: `2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}` }} />
            </div>
          </div>
        </div>

        {/* THE INSIGHT */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>THE INSIGHT</h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed" style={{ color: textColor }}>
            Have you ever wanted to get good at something but didn&apos;t know where to start?
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>
            This app is designed around that exact problem. You tell it what you want to achieve—like learning guitar, spending more time with your kids, becoming a better student, learning to ride a bike, or saving up to buy a house. The AI creates a personalized 7-day plan with three simple activities each day that move you closer to your goal. Instead of feeling overwhelmed by a huge dream, you get bite-sized tasks that actually feel doable.
          </p>
        </div>

        {/* RESEARCH & COMPETITIVE ANALYSIS */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>RESEARCH & COMPETITIVE ANALYSIS</h2>
          <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: textColor }}>
            Existing productivity tools fall into two camps: task managers that organize what you already know, and habit trackers that measure consistency. Neither bridges the gap between &quot;I want to learn guitar&quot; and &quot;here&apos;s what to do today.&quot;
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { tool: 'Todoist / Things', finding: 'Onboarding starts with an empty inbox — the user must already know their tasks. No guidance on breaking a goal into steps. The interaction model assumes planning has already happened elsewhere.' },
              { tool: 'Habitica / Streaks', finding: 'Gamification drives consistency but requires users to define their own habits upfront. The cold-start problem is significant: new users stare at a blank habit list with no help generating one.' },
              { tool: 'Coach.me / Noom', finding: 'Closest to the vision — they generate structured plans. But they\'re domain-locked (fitness, nutrition). The onboarding flow asks rigid category questions rather than accepting open-ended goals.' },
            ].map(({ tool, finding }) => (
              <div key={tool} className="p-4 rounded-xl" style={{ backgroundColor: statBg }}>
                <p className="text-base font-bold mb-2" style={{ color: primaryColor }}>{tool}</p>
                <p className="text-sm leading-relaxed" style={{ color: textColor }}>{finding}</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: statBg }}>
            <p className="text-base leading-relaxed" style={{ color: textColor }}>
              <strong style={{ color: primaryColor }}>The gap:</strong> No tool takes a free-form goal and generates a structured, time-bound plan with daily actions. The interaction pattern that&apos;s missing is: natural language input → AI-generated plan → daily action items. That&apos;s the space FirstDay occupies.
            </p>
          </div>
        </div>

        {/* THE CORE LOOP */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-8" style={{ color: primaryColor }}>THE CORE LOOP</h2>
          <p className="text-2xl md:text-3xl font-bold mb-8" style={{ color: primaryColor }}>
            Dream → Plan → Do → Reflect → Repeat
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Brain, label: 'Set Your Goal', desc: 'Tell the app what you want to achieve in your own words' },
              { icon: Calendar, label: 'Get Your Plan', desc: 'AI generates a personalized 30-day plan in weekly sprints with 3 daily activities' },
              { icon: Target, label: 'Track Progress', desc: 'Check off tasks, see your streak, and adapt as you grow' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center">
                <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: primaryColor }} />
                <div className="text-xl font-bold mb-2" style={{ color: primaryColor }}>{label}</div>
                <p className="text-base" style={{ color: textColor, opacity: 0.8 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* THE LIVE PRODUCT */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>THE LIVE PRODUCT</h2>
          <ImageWithSkeleton src="/images/firstday/desktop-features.png" alt="FirstDay.Life features section showing the 3-step onboarding process" className="rounded-2xl w-full mb-6" style={{ border: `2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}` }} />
          <p className="text-base text-center" style={{ color: textColor, opacity: 0.7 }}>
            Live at firstday.life — currently gathering user feedback for iteration
          </p>
        </div>

        {/* KEY DESIGN DECISIONS */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-8" style={{ color: primaryColor }}>KEY DESIGN DECISIONS</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: primaryColor }}>30-day goals in 7-day sprints</h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>
                The full program is 30 days, but delivered in weekly sprints. Research shows that shorter commitment windows lead to higher completion rates. A week feels achievable — so users focus on one sprint at a time while the 30-day arc keeps them moving toward the bigger goal.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: primaryColor }}>3 activities per day, not more</h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>
                Constraint breeds focus. Three tasks is enough to make meaningful progress without overwhelming the user. Each task is designed to take 15-30 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: primaryColor }}>Natural language goal input</h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>
                Users describe their goals in their own words rather than selecting from categories. This makes the experience feel personal and the AI can generate more relevant plans.
              </p>
            </div>
          </div>
        </div>

        {/* THE PIVOT */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>THE PIVOT — AND WHAT IT CHANGED</h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed" style={{ color: textColor }}>
            Originally designed as a native iOS app. Moving to a responsive web app changed more than the distribution — it changed the design.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl" style={{ backgroundColor: statBg }}>
              <h3 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>iOS Design</h3>
              <p className="text-base" style={{ color: textColor, opacity: 0.8 }}>Tab-based navigation, native gesture patterns, system-level notifications for daily reminders, fixed viewport assumptions</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: statBg }}>
              <h3 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>Responsive Web</h3>
              <p className="text-base" style={{ color: textColor, opacity: 0.8 }}>Fluid layout across 6 breakpoints, scroll-based hierarchy instead of tabs, progressive disclosure for mobile, no native notification access — required rethinking the daily nudge pattern</p>
            </div>
          </div>
        </div>

        {/* WHAT I LEARNED */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-8" style={{ color: primaryColor }}>WHAT I LEARNED</h2>
          <div className="space-y-6">
            {[
              { icon: Lightbulb, title: 'Start with the smallest viable loop', desc: 'The core value is goal → plan → daily action. Everything else can come later.' },
              { icon: TrendingUp, title: 'Behavioral design beats feature lists', desc: 'Three focused tasks per day creates more progress than a dashboard of 20 options.' },
              { icon: CheckCircle, title: 'Ship and learn', desc: 'Launching publicly at firstday.life and getting real user feedback taught me more than months of iteration in isolation. The live product is the research instrument.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <Icon className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                <div>
                  <p className="text-base md:text-lg font-bold mb-1" style={{ color: textColor }}>{title}</p>
                  <p className="text-base md:text-lg" style={{ color: textColor, opacity: 0.8 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEXT STEPS */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16">
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>NEXT STEPS</h2>
          <div className="space-y-4">
            {[
              { bold: 'User interviews:', text: 'Conduct 8-10 interviews with early users to understand how they use the daily plans and where they drop off' },
              { bold: 'Streak mechanics:', text: 'Add streak tracking and gentle nudges to improve day-over-day retention' },
              { bold: 'Goal community:', text: 'Explore social features where users with similar goals can share progress and tips' },
              { bold: 'AI refinement:', text: 'Improve plan quality based on user completion data and feedback patterns' },
            ].map(({ bold, text }) => (
              <div key={bold} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                <p className="text-base md:text-lg" style={{ color: textColor }}><strong>{bold}</strong> {text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
