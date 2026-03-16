'use client';

import { ArrowLeft, Smartphone, Shield, Camera, Key, ArrowRight } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';
import NextProject from './NextProject';
import CancellationFlowDiagram from './CancellationFlowDiagram';
import { NavigableSection } from './NavigableSection';
import { type Page } from '@/data/projects';

const NIELSENS_HEURISTICS = [
  { id: 1, name: 'Visibility of System Status', applied: true },
  { id: 2, name: 'Match Between System and Real World', applied: false },
  { id: 3, name: 'User Control and Freedom', applied: true },
  { id: 4, name: 'Consistency and Standards', applied: false },
  { id: 5, name: 'Error Prevention', applied: true },
  { id: 6, name: 'Recognition Rather Than Recall', applied: true },
  { id: 7, name: 'Flexibility and Efficiency of Use', applied: true },
  { id: 8, name: 'Aesthetic and Minimalist Design', applied: true },
  { id: 9, name: 'Help Users Recover from Errors', applied: true },
  { id: 10, name: 'Help and Documentation', applied: false },
];

const ISSUE_HEURISTICS: Record<number, number[]> = {
  1: [5, 8],
  2: [3, 9],
  3: [7, 9],
  4: [6, 1],
  5: [3, 7],
};

function HeuristicBadges({ issueNumber }: { issueNumber: number }) {
  const heuristicIds = ISSUE_HEURISTICS[issueNumber] || [];
  return (
    <div className="flex flex-wrap gap-1.5 ml-auto">
      {heuristicIds.map((id) => {
        const h = NIELSENS_HEURISTICS.find((n) => n.id === id);
        if (!h) return null;
        return (
          <span
            key={id}
            className="text-[10px] font-semibold px-2 py-0.5 whitespace-nowrap"
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            #{id} {h.name}
          </span>
        );
      })}
    </div>
  );
}

interface DoorDashCaseStudyProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

export default function DoorDashCaseStudy({ onBack, onNavigate }: DoorDashCaseStudyProps) {
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';
  const primaryColor = '#ffffff';

  const statBg = '#000000';
  const divider = '1px solid rgba(255,255,255,0.06)';
  const onPrimaryColor = '#000000';

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* Sticky back bar */}
        <div className="sticky top-0 z-50 bg-black py-4 flex items-center gap-4">
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: primaryColor, borderRadius: 0 }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        {/* HERO */}
        <NavigableSection id="dd-hero" label="Hero">
          <TextCard padding="lg">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#a1a1a6' }}>
              WHAT
            </p>
            <div className="min-h-[80vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-16" style={{ borderBottom: divider }}>
              <div className="w-full md:w-2/5">
                <PhoneMockup
                  screenshot="/images/doordash/slide6_Image_0.png"
                  gradientFrom={primaryColor}
                  gradientTo="#000000"
                  alt="DoorDash Dasher app screenshot"
                  size="large"
                />
              </div>

              <div className="w-full md:w-3/5">
                <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: primaryColor }}>Case Study</p>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>
                  DOORDASH DASHER APP
                </h1>
                <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>
                  12 taps to cancel an order. While driving.
                </p>
                <p className="text-base mb-8 leading-relaxed" style={{ color: textColor }}>
                  After completing 1,000+ deliveries as a Dasher, I identified 5 critical UX issues in the driver app. This is an independent evaluation — not work done at DoorDash — with redesign proposals grounded in real-world experience behind the wheel.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'SCOPE', value: 'Heuristic evaluation of error recovery' },
                    { label: 'RESEARCH', value: '1,000+ deliveries as a Dasher', highlight: true },
                    { label: 'MY ROLE', value: 'Independent UX Evaluator' },
                    { label: 'FRAMEWORK', value: "Nielsen\u2019s 10 Heuristics" },
                  ].map(({ label, value, highlight }) => (
                    <div key={label}>
                      <p className="text-xs font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                      <p className="text-sm" style={{ color: highlight ? primaryColor : textColor, fontWeight: highlight ? 700 : 400 }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TextCard>
        </NavigableSection>

        {/* THE HUMAN COST */}
        <NavigableSection id="dd-human-cost" label="The Human Cost">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#a1a1a6' }}>
                WHY
              </p>
              <p className="text-xl md:text-3xl leading-relaxed font-bold" style={{ color: textColor }}>
                Gig drivers are <span style={{ color: primaryColor }}>4x more likely</span> to use apps behind the wheel (per industry reports). Every unnecessary tap is time your eyes aren&apos;t on the road.
              </p>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* PROPOSED IMPROVEMENTS */}
        <NavigableSection id="dd-impact" label="Proposed Improvements">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-xs font-bold tracking-widest mb-8 uppercase" style={{ color: primaryColor }}>Proposed Improvements</p>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.08}>
                {[
                  { stat: '5', label: 'Redesign proposals', sub: 'Without breaking the business model' },
                  { stat: '67%', label: 'Fewer taps', sub: '12 → 4 while driving' },
                  { stat: '15 min', label: 'Recovery window', sub: 'For lost addresses' },
                  { stat: '100%', label: 'Photo coverage', sub: 'Even at alternate locations' },
                ].map(({ stat, label, sub }) => (
                  <StaggerItem key={label}>
                    <div className="p-5 text-center" style={{ backgroundColor: statBg, borderRadius: 0, border: '1px dashed rgba(255, 255, 255, 0.12)' }}>
                      <p className="text-[10px] font-bold tracking-[0.15em] uppercase mb-1" style={{ color: '#a1a1a6' }}>Projected</p>
                      <p className="text-3xl md:text-5xl font-black" style={{ color: primaryColor }}>{stat}</p>
                      <p className="text-sm font-bold mt-2" style={{ color: textColor }}>{label}</p>
                      <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{sub}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* THE FRAMEWORK — Nielsen's 10 Heuristics Grid */}
        <NavigableSection id="dd-framework" label="The Framework">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#a1a1a6' }}>
                HOW
              </p>
              <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Framework</p>
              <p className="text-xl md:text-2xl font-bold mb-2" style={{ color: textColor }}>
                Nielsen&apos;s 10 Usability Heuristics
              </p>
              <p className="text-base mb-8" style={{ color: secondaryTextColor }}>
                7 of 10 heuristics are violated across the 5 issues identified.
              </p>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-3" staggerDelay={0.05}>
                {NIELSENS_HEURISTICS.map((h) => (
                  <StaggerItem key={h.id}>
                    <div
                      className="p-4 h-full"
                      style={{
                        backgroundColor: '#000000',
                        border: h.applied
                          ? '1px solid rgba(255,255,255,0.2)'
                          : '1px solid rgba(255,255,255,0.06)',
                        opacity: h.applied ? 1 : 0.35,
                      }}
                    >
                      <p
                        className="text-2xl font-black mb-2"
                        style={{ color: h.applied ? primaryColor : secondaryTextColor }}
                      >
                        {h.id}
                      </p>
                      <p
                        className="text-xs font-medium leading-snug"
                        style={{ color: h.applied ? textColor : secondaryTextColor }}
                      >
                        {h.name}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* ISSUE #1 — Button Hierarchy */}
        <NavigableSection id="dd-issue-1" label="Issue 1">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: onPrimaryColor, borderRadius: 0 }}>
                  <Smartphone className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Issue #1</p>
                <HeuristicBadges issueNumber={1} />
              </div>
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="flex gap-6 justify-center items-center md:w-2/5">
                  <PhoneMockup screenshot="/images/doordash/slide4_Image_0.png" alt="Continue button prominent" size="tiny" />
                  <PhoneMockup screenshot="/images/doordash/slide4_Image_1.png" alt="Handed to customer" size="tiny" />
                </div>
                <div className="md:w-3/5">
                  <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>
                    The biggest button says &quot;Complete&quot; &mdash; but you need directions first.
                  </p>
                  <p className="text-base mb-4" style={{ color: secondaryTextColor }}>
                    You&apos;re still driving, distracted, and the biggest tap target on screen triggers &quot;complete delivery.&quot; One accidental bump and the order is done before you&apos;ve arrived.
                  </p>
                  <div className="p-3 mb-4" style={{ backgroundColor: statBg, borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <p className="text-sm" style={{ color: secondaryTextColor }}>
                      <strong style={{ color: textColor }}>Why:</strong> Pre-loading completion prevents failures when signal drops at the door.
                    </p>
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#000000', borderRadius: 0, borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                    <p className="text-sm" style={{ color: textColor }}>
                      <strong style={{ color: primaryColor }}>Fix:</strong> Show directions until you arrive. Then show &quot;Complete.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* ISSUE #2 — No Error Recovery */}
        <NavigableSection id="dd-issue-2" label="Issue 2">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: onPrimaryColor, borderRadius: 0 }}>
                  <Shield className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Issue #2</p>
                <HeuristicBadges issueNumber={2} />
              </div>
              <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>
                You left the drink in your car. The address is already gone.
              </p>
              <p className="text-base mb-6" style={{ color: secondaryTextColor }}>
                Once you tap &quot;delivered,&quot; the address vanishes. No way to go back &mdash; even if you realize immediately.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {['Forgot an item', 'Wrong apartment', 'Drink left in car', 'Accidental tap'].map((item) => (
                  <div key={item} className="p-3 text-center" style={{ backgroundColor: statBg, borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <p className="text-sm font-medium" style={{ color: textColor }}>{item}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 mb-4" style={{ backgroundColor: statBg, borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <p className="text-sm" style={{ color: secondaryTextColor }}>
                  <strong style={{ color: textColor }}>Why:</strong> Customer privacy &mdash; minimizing stored location data prevents stalking risk.
                </p>
              </div>
              <div className="p-4" style={{ backgroundColor: '#000000', borderRadius: 0, borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                <p className="text-sm" style={{ color: textColor }}>
                  <strong style={{ color: primaryColor }}>Fix:</strong> 15-minute nav-only window. Logged for privacy. Then gone.
                </p>
              </div>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* ISSUE #3 — Photo Validation */}
        <NavigableSection id="dd-issue-3" label="Issue 3">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: onPrimaryColor, borderRadius: 0 }}>
                  <Camera className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Issue #3</p>
                <HeuristicBadges issueNumber={3} />
              </div>
              <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-center">
                <div className="md:w-3/5">
                  <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>
                    Customer says &quot;leave at garage.&quot; App rejects the photo.
                  </p>
                  <p className="text-base mb-4" style={{ color: secondaryTextColor }}>
                    You follow the customer&apos;s instructions. The app flags it as wrong. So you skip the photo &mdash; now there&apos;s no proof at all.
                  </p>
                  <div className="p-3 mb-4" style={{ backgroundColor: statBg, borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <p className="text-sm" style={{ color: secondaryTextColor }}>
                      <strong style={{ color: textColor }}>Why:</strong> ML validation deters fraud by ensuring photos match the expected delivery location.
                    </p>
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#000000', borderRadius: 0, borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                    <p className="text-sm" style={{ color: textColor }}>
                      <strong style={{ color: primaryColor }}>Fix:</strong> &quot;Alternate location&quot; prompt on mismatch. Photo + note saved. Some proof is better than none.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center md:w-2/5">
                  <PhoneMockup
                    screenshot="/images/doordash/slide6_Image_0.png"
                    gradientFrom={primaryColor}
                    gradientTo="#000000"
                    alt="Photo rejection screen"
                  />
                </div>
              </div>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* ISSUE #4 — Code Disappears */}
        <NavigableSection id="dd-issue-4" label="Issue 4">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: onPrimaryColor, borderRadius: 0 }}>
                  <Key className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Issue #4</p>
                <HeuristicBadges issueNumber={4} />
              </div>
              <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>
                You&apos;re at the locker, arms full of bags. The pickup code is gone.
              </p>
              <p className="text-base mb-6" style={{ color: secondaryTextColor }}>
                One tap of &quot;picked up&quot; and the code vanishes. You&apos;re still standing there, locker unopened.
              </p>
              <div className="p-3 mb-4" style={{ backgroundColor: statBg, borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <p className="text-sm" style={{ color: secondaryTextColor }}>
                  <strong style={{ color: textColor }}>Why:</strong> Temporary data clears on state change &mdash; the system assumes pickup is complete once confirmed.
                </p>
              </div>
              <div className="p-4" style={{ backgroundColor: '#000000', borderRadius: 0, borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                <p className="text-sm" style={{ color: textColor }}>
                  <strong style={{ color: primaryColor }}>Fix:</strong> Keep code visible until the locker actually opens &mdash; not until you tap a button.
                </p>
              </div>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* ISSUE #5 — 12 Taps to Cancel */}
        <NavigableSection id="dd-issue-5" label="Issue 5">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: onPrimaryColor, borderRadius: 0 }}>
                  <Smartphone className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Issue #5</p>
                <HeuristicBadges issueNumber={5} />
              </div>
              <p className="text-xl md:text-2xl font-bold mb-8" style={{ color: textColor }}>
                Cancelling an order takes 12 taps. At a red light, you get maybe 3.
              </p>

              {/* Before / After */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
                <div className="text-center p-6" style={{ backgroundColor: statBg, borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <p className="text-xs font-bold tracking-wider mb-2" style={{ color: secondaryTextColor }}>CURRENT</p>
                  <p className="text-5xl md:text-6xl font-black" style={{ color: textColor, opacity: 0.3 }}>12</p>
                  <p className="text-sm font-bold mt-2" style={{ color: textColor }}>taps to cancel</p>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-8 h-8" style={{ color: primaryColor }} />
                </div>
                <div className="text-center p-6" style={{ backgroundColor: '#000000', borderRadius: 0, border: '2px solid rgba(255, 255, 255, 0.2)' }}>
                  <p className="text-xs font-bold tracking-wider mb-2" style={{ color: primaryColor }}>PROPOSED</p>
                  <p className="text-5xl md:text-6xl font-black" style={{ color: primaryColor }}>4</p>
                  <p className="text-sm font-bold mt-2" style={{ color: textColor }}>taps to cancel</p>
                </div>
              </div>

              <div className="flex gap-4 md:gap-6 justify-center mb-6">
                {[
                  { src: '/images/doordash/slide8_Image_0.png', alt: 'Unassigned confirmation' },
                  { src: '/images/doordash/slide8_Image_1.png', alt: 'Survey prompt' },
                  { src: '/images/doordash/slide8_Image_2.png', alt: 'Full satisfaction survey' },
                ].map((img) => (
                  <PhoneMockup key={img.src} screenshot={img.src} alt={img.alt} size="tiny" />
                ))}
              </div>

              <div className="p-3 mb-4" style={{ backgroundColor: statBg, borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <p className="text-sm" style={{ color: secondaryTextColor }}>
                  <strong style={{ color: textColor }}>Why:</strong> Friction deters cancellations. Embedded surveys guarantee response rates.
                </p>
              </div>
              <div className="p-4" style={{ backgroundColor: '#000000', borderRadius: 0, borderLeft: '3px solid #ffffff', border: '1px solid rgba(255, 255, 255, 0.06)', borderLeftWidth: '3px', borderLeftColor: '#ffffff' }}>
                <p className="text-sm" style={{ color: textColor }}>
                  <strong style={{ color: primaryColor }}>Fix:</strong> 4-tap cancel. Survey after the shift, not at a red light.
                </p>
              </div>
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* THE FLOW — Cancellation Flow Diagram */}
        <NavigableSection id="dd-flow" label="Cancellation Flow">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg">
              <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Flow</p>
              <p className="text-xl md:text-2xl font-bold mb-2" style={{ color: textColor }}>
                12 taps to 4. Here&apos;s exactly what changed.
              </p>
              <p className="text-base mb-8" style={{ color: secondaryTextColor }}>
                The current cancellation flow buries the action in menus, adds friction through embedded surveys, and forces drivers to complete multi-step forms at red lights. The redesign collapses it to 4 taps and moves the survey to the end of the shift.
              </p>
              <CancellationFlowDiagram />
            </TextCard>
          </AnimateIn>
        </NavigableSection>

        {/* CONCLUSION */}
        <NavigableSection id="dd-conclusion" label="Conclusion">
          <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
            <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#a1a1a6' }}>
                OUTCOME
              </p>
              <p className="text-xs font-bold tracking-widest mb-6 uppercase" style={{ color: primaryColor }}>Conclusion</p>
              <p className="text-xl md:text-2xl font-bold leading-relaxed mb-6" style={{ color: textColor }}>
                Five issues. One philosophy: <span style={{ color: primaryColor }}>the app should protect the driver, not punish them.</span>
              </p>
              <p className="text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Every proposal here respects DoorDash&apos;s business constraints &mdash; fraud prevention, data collection, customer privacy &mdash; while removing the friction that puts drivers at risk. Button hierarchy that matches the task at hand. Error recovery that doesn&apos;t erase your progress. Photo validation that adapts to real-world delivery. Codes that stay visible until the job is actually done. And a cancellation flow cut from 12 taps to 4.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { stat: '12 → 4', label: 'Taps to cancel' },
                  { stat: '5', label: 'Redesign proposals' },
                  { stat: '1,000+', label: 'Deliveries researched' },
                ].map(({ stat, label }) => (
                  <div key={label} className="p-4 text-center" style={{ backgroundColor: statBg, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <p className="text-2xl md:text-3xl font-black" style={{ color: primaryColor }}>{stat}</p>
                    <p className="text-xs font-bold mt-2" style={{ color: secondaryTextColor }}>{label}</p>
                  </div>
                ))}
              </div>
            </TextCard>
          </AnimateIn>
        </NavigableSection>
      </div>
      <NextProject currentProjectId="doordash-case-study" onNavigate={onNavigate} />
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
