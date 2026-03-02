'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import MiddlemanLogo from './MiddlemanLogo';
import { ArrowLeft, ExternalLink, Clock, TrendingUp, Target, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import LiteYouTube from './LiteYouTube';
import ImageWithSkeleton from './ImageWithSkeleton';

interface MiddlemanCaseStudyProps {
  onBack: () => void;
}

export default function MiddlemanCaseStudy({ onBack }: MiddlemanCaseStudyProps) {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const cardBg = theme === 'dark' ? '#1a1a1a' : '#ffffff';

  const cardStyle = {
    background: cardBg,
    border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`,
    boxShadow: theme === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3)' : '0 4px 16px 0 rgba(0, 0, 0, 0.12)',
  };

  return (
    <div className="min-h-screen">
      <div className="w-full px-6 md:px-12 max-w-full">
        {/* Fixed Navigation */}
        <div className="fixed left-6 md:left-12 py-4 z-[90] flex items-center gap-3" style={{ top: '20px' }}>
          <button onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:opacity-80 text-base md:text-lg font-semibold"
            style={{ color: primaryColor, backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f7', border: `2px solid ${primaryColor}` }}>
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" /> Back
          </button>
          <a href="https://middleman.quest" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:opacity-80 text-base md:text-lg font-semibold"
            style={{ color: primaryColor, backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5f7', border: `2px solid ${primaryColor}` }}>
            <ExternalLink className="w-5 h-5" /> View Live Prototype
          </a>
        </div>

        <div className="pt-48 md:pt-48">
          {/* PROJECT OVERVIEW */}
          <div className="mb-8 p-8 md:p-10 rounded-[48px]" style={{ ...cardStyle, border: `2px solid ${primaryColor}` }}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold" style={{ color: primaryColor }}>MERCHANDISING SYSTEM</h1>
              <MiddlemanLogo color={primaryColor} className="w-20 md:w-24 h-auto" />
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
                <p className="text-base md:text-lg" style={{ color: textColor }}>Solo UX Designer & Researcher — Problem definition, user research, IA, interaction design, prototyping (10+ iterations)</p>
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
          <div className="mb-8 p-8 md:p-12 rounded-[48px]" style={cardStyle}>
            <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>THE MOMENT</h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ color: textColor }}>
              Sales has the ordering tool, and it helps with placing orders.<br />
              But the actual in store work is still pen, cardboard, and manual counting with no data helping you decide what to pull.
            </p>
          </div>

          {/* RESEARCH & DISCOVERY */}
          <div className="mb-8 p-8 md:p-12 rounded-[48px]" style={cardStyle}>
            <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>RESEARCH & DISCOVERY</h2>
            <p className="text-lg md:text-xl mb-6 leading-relaxed font-bold" style={{ color: primaryColor }}>
              1.5 years as a merchandiser. 6–12 stores per day. Every pain point is firsthand.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { note: 'Spent 10+ minutes counting backstock in walk-in coolers — no way to know what was already on shelf without walking back and forth', label: 'FIELD OBSERVATION' },
                { note: 'Pulled wrong SKU twice in one store because the existing app shows product names but not shelf locations or photos', label: 'ERROR PATTERN' },
                { note: 'Coworkers kept personal spreadsheets of what each store needed because the company tools were too slow to reference in-aisle', label: 'WORKAROUND BEHAVIOR' },
                { note: 'Store managers would flag stockouts verbally at check-in — no system captured this, so the same products stayed out of stock for weeks', label: 'COMMUNICATION GAP' },
              ].map(({ note, label }) => (
                <div key={label} className="p-4 rounded-xl" style={{ backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }}>
                  <p className="text-xs font-bold mb-2 tracking-wider" style={{ color: primaryColor }}>{label}</p>
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: textColor }}>{note}</p>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }}>
              <p className="text-sm" style={{ color: textColor, opacity: 0.7 }}>
                <strong>Method:</strong> Ethnographic field research — I was the user. These observations come from daily work across 15+ retail accounts over 1.5 years, not from interviews conducted after the fact.
              </p>
            </div>
          </div>

          {/* WHO THIS IS FOR */}
          <div className="mb-8 p-8 md:p-12 rounded-[48px]" style={cardStyle}>
            <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>WHO THIS IS FOR</h2>
            <p className="text-xl md:text-2xl font-bold" style={{ color: primaryColor }}>
              Beer route merchandisers running 6 to 12 stores a day.
            </p>
          </div>

          {/* COMPETITIVE LANDSCAPE */}
          <div className="mb-8 p-8 md:p-12 rounded-[48px]" style={cardStyle}>
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
                <div key={tool} className="p-4 rounded-xl" style={{ backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' }}>
                  <p className="text-base font-bold mb-2" style={{ color: primaryColor }}>{tool}</p>
                  <p className="text-sm leading-relaxed" style={{ color: textColor }}>{gap}</p>
                </div>
              ))}
            </div>
          </div>

          {/* THE PROBLEM */}
          <div className="mb-8 p-8 md:p-12 rounded-[48px]" style={cardStyle}>
            <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>THE PROBLEM</h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed font-bold" style={{ color: textColor }}>In store decisions are slow and guessy:</p>
            <div className="space-y-3 mb-8">
              {['You cannot quickly see what is in backstock', 'You cannot quickly see what is about to stock out', 'So you waste time and still miss pulls'].map(t => (
                <div key={t} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                  <p className="text-base md:text-lg" style={{ color: textColor }}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* TARGETS */}
          <div className="mb-8 p-8 md:p-12 rounded-[48px]" style={cardStyle}>
            <h2 className="text-sm md:text-base font-bold tracking-widest mb-8" style={{ color: primaryColor }}>WHAT I AIMED TO IMPROVE (TARGETS)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Clock, label: 'TIME PER STORE', value: '45 min → 15 min' },
                { icon: TrendingUp, label: 'STOCKOUTS', value: 'Down 60%' },
                { icon: Target, label: 'PULL ACCURACY', value: '85%+' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: primaryColor }} />
                  <p className="text-sm font-bold mb-2" style={{ color: textColor, opacity: 0.7 }}>{label}</p>
                  <p className="text-2xl md:text-3xl font-bold" style={{ color: primaryColor }}>{value}</p>
                  <p className="text-sm mt-1" style={{ color: textColor, opacity: 0.6 }}>(target)</p>
                </div>
              ))}
            </div>
          </div>

          {/* THE IDEA */}
          <div className="mb-8 p-8 md:p-12 rounded-[48px]" style={cardStyle}>
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
          <div className="mb-8 p-8 md:p-12 rounded-[48px]" style={cardStyle}>
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
          <div className="mb-8 p-8 md:p-12 rounded-[48px]" style={cardStyle}>
            <h2 className="text-sm md:text-base font-bold tracking-widest mb-8" style={{ color: primaryColor }}>WHAT IS REAL VS WHAT IS NEXT</h2>
            <div className="space-y-6">
              {[
                { icon: CheckCircle, title: 'Real', desc: 'Built from 1.5 years of daily merchandising across 15+ stores — every pain point and workflow observed firsthand' },
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
          <div className="mb-8 p-8 md:p-12 rounded-[48px]" style={cardStyle}>
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
      </div>
      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
