'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import MiddlemanLogo from './MiddlemanLogo';
import { ArrowLeft, ExternalLink, Clock, TrendingUp, Target, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import LiteYouTube from './LiteYouTube';

interface MiddlemanCaseStudyProps {
  onBack: () => void;
}

export default function MiddlemanCaseStudy({ onBack }: MiddlemanCaseStudyProps) {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);

  const statBg = theme === 'dark' ? '#000000' : 'rgba(0, 0, 0, 0.03)';
  const divider = `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`;

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* Back + Prototype links */}
        <div className="pt-6 mb-8 flex items-center gap-4">
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: primaryColor }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <a href="https://middleman.quest" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-80"
            style={{ backgroundColor: primaryColor, color: accentColor === 'bw' ? (theme === 'dark' ? '#000000' : '#ffffff') : '#ffffff' }}>
            <ExternalLink className="w-4 h-4" /> Try Live Prototype
          </a>
        </div>

        {/* PROJECT OVERVIEW */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl md:text-5xl font-bold" style={{ color: primaryColor }}>MERCHANDISING SYSTEM</h1>
            <MiddlemanLogo color={primaryColor} className="w-16 md:w-20 h-auto" />
          </div>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>PROJECT OVERVIEW</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>CUSTOMER</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>Beer route merchandisers managing 6-12 stores per day across rural/suburban territories</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>PROBLEM</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>Existing merchandising apps are slow and cumbersome, taking 45+ min per store. Lack visibility into backstock and what to pull to prevent stockouts.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>HYPOTHESIS</h3>
              <p className="text-base md:text-lg font-bold" style={{ color: primaryColor }}>Could reduce time per store from 45 min to 15 min | Cut stockouts by 60% | Increase backstock pull accuracy to 85%+</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>MY ROLE</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>Solo UX Designer & Researcher. Problem definition, user research, IA, interaction design, prototyping (10+ iterations)</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>TOOLS</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>Figma (wireframes to hi-fi), Field experience as merchandiser, Task analysis</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>TIMEFRAME</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>3 months (Concept to high-fidelity interactive prototype)</p>
            </div>
          </div>
          <LiteYouTube
            videoId="TQagpOFdQpM"
            title="Merchandising System Demo"
            borderColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}
          />
        </div>

        {/* THE MOMENT */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>THE MOMENT</h2>
          <p className="text-base md:text-lg mb-4 leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
            In beverage distribution, merchandisers visit retail stores daily to restock shelves from backroom inventory. The job is physical, fast-paced, and done across 6–12 stores per shift.
          </p>
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: textColor }}>
            The sales side has ordering software, but merchandisers never touch it. The actual in-store work, deciding what to pull from the backroom, in what priority, is still pen, cardboard, and manual counting with no data to guide decisions.
          </p>
        </div>

        {/* RESEARCH & DISCOVERY */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>RESEARCH & DISCOVERY</h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed font-bold" style={{ color: primaryColor }}>
            A year as a merchandiser. 6–12 stores per day. Every pain point is firsthand.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              { note: 'Spent 10+ minutes counting backstock in walk-in coolers. No way to know what was already on shelf without walking back and forth', label: 'FIELD OBSERVATION' },
              { note: 'Pulled wrong SKU twice in one store because the existing app shows product names but not shelf locations or photos', label: 'ERROR PATTERN' },
              { note: 'Coworkers kept personal spreadsheets of what each store needed because the company tools were too slow to reference in-aisle', label: 'WORKAROUND BEHAVIOR' },
              { note: 'Store managers would flag stockouts verbally at check-in. No system captured this, so the same products stayed out of stock for weeks', label: 'COMMUNICATION GAP' },
            ].map(({ note, label }) => (
              <div key={label} className="p-4 rounded-xl" style={{ backgroundColor: statBg }}>
                <p className="text-xs font-bold mb-2 tracking-wider" style={{ color: primaryColor }}>{label}</p>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: textColor }}>{note}</p>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: statBg }}>
            <p className="text-sm" style={{ color: textColor, opacity: 0.7 }}>
              <strong>Method:</strong> Ethnographic field research. I was the user. These observations come from daily work across 15+ retail accounts over a year, not from interviews conducted after the fact.
            </p>
          </div>
        </div>

        {/* COMPETITIVE LANDSCAPE */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>COMPETITIVE LANDSCAPE</h2>
          <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: textColor }}>
            Existing tools like VIP, Repsly, and distributor-built apps focus on order entry and delivery confirmation. None address the in-store merchandising workflow — what to pull from backstock, in what order, based on what's actually selling.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tool: 'VIP / Encompass', gap: 'Order-focused. No backstock visibility. Merchandisers use it for ordering, not in-store work.' },
              { tool: 'Repsly', gap: 'Audit and compliance tool. Takes photos of shelves but doesn\'t tell you what to pull or prioritize.' },
              { tool: 'Internal tools', gap: 'Spreadsheets and paper lists. Updated weekly at best. No real-time POS data integration.' },
            ].map(({ tool, gap }) => (
              <div key={tool} className="p-4 rounded-xl" style={{ backgroundColor: statBg }}>
                <p className="text-base font-bold mb-2" style={{ color: primaryColor }}>{tool}</p>
                <p className="text-sm leading-relaxed" style={{ color: textColor }}>{gap}</p>
              </div>
            ))}
          </div>
        </div>

        {/* THE PROBLEM */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>THE PROBLEM</h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed font-bold" style={{ color: textColor }}>In-store decisions are slow and based on guesswork:</p>
          <div className="space-y-3">
            {['You cannot quickly see what is in backstock', 'You cannot quickly see what is about to stock out', 'So you waste time and still miss pulls'].map(t => (
              <div key={t} className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                <p className="text-base md:text-lg" style={{ color: textColor }}>{t}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TARGETS */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-4" style={{ color: primaryColor }}>DESIGN HYPOTHESIS</h2>
          <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: textColor }}>
            If the app surfaces real-time POS data and generates prioritized pull lists, then:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Clock, label: 'TIME PER STORE', value: '45 min → 15 min' },
              { icon: TrendingUp, label: 'STOCKOUTS', value: 'Down 60%' },
              { icon: Target, label: 'PULL ACCURACY', value: '85%+' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center p-4 rounded-xl" style={{ backgroundColor: statBg }}>
                <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: primaryColor }} />
                <p className="text-xs font-bold mb-1 tracking-wider" style={{ color: textColor, opacity: 0.7 }}>{label}</p>
                <p className="text-lg md:text-xl font-bold" style={{ color: primaryColor }}>{value}</p>
                <p className="text-xs mt-1" style={{ color: textColor, opacity: 0.5 }}>untested hypothesis</p>
              </div>
            ))}
          </div>
        </div>

        {/* DESIGN PROCESS */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>DESIGN PROCESS</h2>
          <p className="text-base md:text-lg mb-6 leading-relaxed" style={{ color: textColor }}>
            10+ iterations across 3 months. Each round was informed by the field observations above. I was still working as a merchandiser during the design process, testing mental models against real shifts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { phase: 'TASK ANALYSIS', desc: 'Mapped the actual merchandiser workflow across a full shift: arrive → check backroom → count shelf → decide pulls → restock → confirm → next store' },
              { phase: 'LOW-FI WIREFRAMES', desc: 'Paper sketches testing two IA approaches: store-first (select store, see pull list) vs. product-first (see all low-stock items across stores)' },
              { phase: 'MID-FI PROTOTYPE', desc: 'Figma flows testing the store-first approach, which matched the physical workflow better. Iterated on information density for quick in-aisle scanning' },
              { phase: 'HI-FI INTERACTIVE', desc: 'Full interactive prototype with component system, real data patterns, and the 3-step core flow: pick store → pull list → confirm pulled' },
            ].map(({ phase, desc }) => (
              <div key={phase} className="p-4 rounded-xl" style={{ backgroundColor: statBg }}>
                <p className="text-xs font-bold mb-2 tracking-wider" style={{ color: primaryColor }}>{phase}</p>
                <p className="text-sm leading-relaxed" style={{ color: textColor }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* THE IDEA */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>THE IDEA</h2>
          <p className="text-2xl md:text-3xl font-bold mb-8" style={{ color: primaryColor }}>
            Tell me what to pull first.<br />Everything else is secondary.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['1. Pick store', '2. Pull list', '3. Confirm pulled'].map((step) => (
              <div key={step} className="text-center">
                <div className="text-xl font-bold" style={{ color: primaryColor }}>{step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TWO CHOICES THAT MATTER */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-8" style={{ color: primaryColor }}>TWO CHOICES THAT MATTER</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: primaryColor }}>Keep the store visible at all times</h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>So you do not do the right work in the wrong store.</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: primaryColor }}>Put actions before stats</h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>Because the job is movement, not analysis.</p>
            </div>
          </div>
        </div>

        {/* WHAT IS REAL VS WHAT IS NEXT */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-8" style={{ color: primaryColor }}>WHAT IS REAL VS WHAT IS NEXT</h2>
          <div className="space-y-6">
            {[
              { icon: CheckCircle, title: 'Real', desc: 'Built from a year of daily merchandising across 15+ stores. Every pain point and workflow observed firsthand' },
              { icon: AlertTriangle, title: 'Not proven yet', desc: 'The exact time savings and accuracy numbers' },
              { icon: Zap, title: 'Next', desc: 'Test with 8 to 10 merchandisers, then a 2 week pilot' },
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
              { bold: 'User validation:', text: 'Conduct usability testing with 8-10 merchandisers to validate assumptions and measure task completion rates' },
              { bold: 'Pilot implementation:', text: 'Partner with one distributor to build MVP and deploy with 5-10 merchandisers for 2-week field trial' },
              { bold: 'Success metrics:', text: 'Track actual time per store, stockout frequency, backstock pull accuracy, and merchandiser satisfaction over 3 months' },
              { bold: 'AI-powered forecasting:', text: 'Explore predictive ordering using historical sales patterns and seasonal trends' },
              { bold: 'Route optimization:', text: 'Add intelligent route planning based on store urgency and proximity' },
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
