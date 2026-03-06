'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import { ArrowLeft, AlertTriangle, Shield, Camera, Key, Smartphone, TrendingDown, BarChart3, ImageIcon, Activity } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';

interface DoorDashCaseStudyProps {
  onBack: () => void;
}

export default function DoorDashCaseStudy({ onBack }: DoorDashCaseStudyProps) {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);

  const statBg = theme === 'dark' ? '#000000' : 'rgba(0, 0, 0, 0.03)';
  const imgBorder = `2px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`;
  const divider = `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`;

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* Back link */}
        <div className="pt-6 mb-8">
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: primaryColor }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        {/* PROJECT OVERVIEW */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: primaryColor }}>
            DOORDASH DASHER APP
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ color: textColor, opacity: 0.9 }}>
            When Error Recovery Fails, the Driver Becomes the Workaround
          </p>

          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>PROJECT OVERVIEW</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>SCOPE</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>UX heuristic evaluation of error recovery flows in the DoorDash Dasher (driver) app</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>PROBLEM</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>The core delivery flow works well. But when something goes wrong, the app has no graceful recovery. The driver becomes the workaround.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>RESEARCH</h3>
              <p className="text-base md:text-lg font-bold" style={{ color: primaryColor }}>1,000+ deliveries of ethnographic field research under real driving constraints</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>MY ROLE</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>UX Researcher & Designer. Ethnographic observation, heuristic evaluation, redesign proposals</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>FRAMEWORK</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>Nielsen&apos;s Error Prevention & Recovery Heuristics</p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-2 opacity-70" style={{ color: textColor }}>KEY CONSTRAINT</h3>
              <p className="text-base md:text-lg" style={{ color: textColor }}>Limited attention. Driving, time pressure, quick glances. App must be operated at driving speed.</p>
            </div>
          </div>
        </div>

        {/* PROBLEM SPACE */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-6" style={{ color: primaryColor }}>THE PROBLEM SPACE</h2>
          <p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ color: textColor }}>
            Gig delivery apps must be operated while driving. Gig workers are <strong style={{ color: primaryColor }}>4x more likely</strong> to use apps behind the wheel (IIHS, 2022). NHTSA reported <strong style={{ color: primaryColor }}>3,275 distracted driving fatalities</strong> in 2023.
          </p>
          <div className="p-5 rounded-2xl mb-6" style={{ backgroundColor: statBg }}>
            <p className="text-base md:text-lg italic leading-relaxed" style={{ color: textColor }}>
              How might we redesign error recovery to reduce support volume, improve data accuracy, and minimize driver distraction?
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Error paths assume stationary users',
              'Missing recovery degrades data quality',
              'Reducing interaction steps improves safety',
              'Friction can backfire at driving speed',
            ].map((assumption) => (
              <div key={assumption} className="flex items-start gap-3 p-3 rounded-xl" style={{ backgroundColor: statBg }}>
                <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                <p className="text-sm md:text-base" style={{ color: textColor }}>{assumption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RESEARCH METHOD */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-8" style={{ color: primaryColor }}>RESEARCH METHOD</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: statBg }}>
              <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: primaryColor }}>1,000+</p>
              <p className="text-sm font-bold" style={{ color: textColor, opacity: 0.7 }}>DELIVERIES COMPLETED</p>
            </div>
            <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: statBg }}>
              <p className="text-xl md:text-2xl font-bold mb-2" style={{ color: primaryColor }}>Ethnographic</p>
              <p className="text-sm font-bold" style={{ color: textColor, opacity: 0.7 }}>REAL-WORLD USAGE UNDER ACTUAL CONSTRAINTS</p>
            </div>
            <div className="text-center p-6 rounded-2xl" style={{ backgroundColor: statBg }}>
              <p className="text-xl md:text-2xl font-bold mb-2" style={{ color: primaryColor }}>Limited Attention</p>
              <p className="text-sm font-bold" style={{ color: textColor, opacity: 0.7 }}>DRIVING, TIME PRESSURE, QUICK GLANCES</p>
            </div>
          </div>
          <div className="p-4 rounded-xl" style={{ backgroundColor: statBg }}>
            <p className="text-sm" style={{ color: textColor, opacity: 0.7 }}>
              <strong>Limitations:</strong> Single-user study. Findings are directional hypotheses, not statistically validated. Framework: Nielsen&apos;s Error Prevention & Recovery Heuristics.
            </p>
          </div>
        </div>

        {/* ISSUE #1 */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6" style={{ color: primaryColor }} />
            <h2 className="text-sm md:text-base font-bold tracking-widest" style={{ color: primaryColor }}>ISSUE #1: BUTTON HIERARCHY MISMATCH</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex gap-4 justify-center md:w-1/2">
              <div className="w-[160px] md:w-[200px] flex-shrink-0">
                <p className="text-xs font-bold mb-2 text-center" style={{ color: textColor, opacity: 0.6 }}>EXAMPLE 1</p>
                <ImageWithSkeleton src="/images/doordash/slide4_Image_0.png" alt="DoorDash delivery screen showing Continue as primary red button" className="rounded-2xl w-full" style={{ border: imgBorder }} />
              </div>
              <div className="w-[160px] md:w-[200px] flex-shrink-0">
                <p className="text-xs font-bold mb-2 text-center" style={{ color: textColor, opacity: 0.6 }}>EXAMPLE 2</p>
                <ImageWithSkeleton src="/images/doordash/slide4_Image_1.png" alt="DoorDash delivery screen showing Handed order to customer and Directions buttons" className="rounded-2xl w-full" style={{ border: imgBorder }} />
              </div>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-lg md:text-xl font-bold mb-3" style={{ color: primaryColor }}>The Problem</h3>
              <p className="text-base leading-relaxed mb-4" style={{ color: textColor }}>
                Primary button (red) triggers &quot;complete delivery&quot; flow, but the user typically needs directions first. Visual hierarchy doesn&apos;t match actual user need at this point in the flow.
              </p>
              <h3 className="text-lg md:text-xl font-bold mb-3" style={{ color: primaryColor }}>Why It Might Exist</h3>
              <p className="text-base leading-relaxed mb-4" style={{ color: textColor }}>
                Likely optimized for poor-connectivity edge cases. Pre-loading the completion flow prevents failures when signal drops at the door.
              </p>
              <h3 className="text-lg md:text-xl font-bold mb-3" style={{ color: primaryColor }}>Proposed Redesign</h3>
              <p className="text-base leading-relaxed" style={{ color: textColor }}>
                Swap button priority via GPS: Directions as primary until arrival confirmed, then promote &quot;Complete delivery.&quot; Preserves connectivity optimization.
              </p>
            </div>
          </div>
        </div>

        {/* ISSUE #2 */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6" style={{ color: primaryColor }} />
            <h2 className="text-sm md:text-base font-bold tracking-widest" style={{ color: primaryColor }}>ISSUE #2: NO ERROR RECOVERY PATH</h2>
          </div>
          <p className="text-lg md:text-xl mb-6 leading-relaxed font-bold" style={{ color: textColor }}>
            Once an order is marked delivered, accidentally or legitimately, the address is permanently inaccessible.
          </p>
          <div className="mb-6">
            <h3 className="text-base font-bold mb-3" style={{ color: primaryColor }}>Edge cases requiring address recovery:</h3>
            <div className="space-y-2">
              {[
                'Accidental completion (mis-tap)',
                'Customer reports missing item',
                'Dasher realizes drink left in car',
                'Any need to return to location',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
                  <p className="text-base" style={{ color: textColor }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-2xl mb-6" style={{ backgroundColor: statBg }}>
            <h3 className="text-base font-bold mb-2" style={{ color: primaryColor }}>Why addresses disappear</h3>
            <p className="text-base leading-relaxed" style={{ color: textColor }}>
              Customer privacy and stalking prevention. Data minimization is regulatory best practice. These are valid, but the driver was at the address minutes ago, and currently gets it anyway by messaging through DoorDash.
            </p>
          </div>
          <div className="p-5 rounded-2xl" style={{ backgroundColor: statBg, border: `2px solid ${primaryColor}` }}>
            <h3 className="text-base font-bold mb-2" style={{ color: primaryColor }}>Proposed Redesign</h3>
            <p className="text-base leading-relaxed" style={{ color: textColor }}>
              15-minute nav-only recovery window. All usage logged. Window expires, address purged. Flagged if used frequently. Preserves privacy while enabling error recovery.
            </p>
          </div>
        </div>

        {/* ISSUE #3 */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-6 h-6" style={{ color: primaryColor }} />
            <h2 className="text-sm md:text-base font-bold tracking-widest" style={{ color: primaryColor }}>ISSUE #3: INFLEXIBLE PHOTO VALIDATION</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="flex justify-center md:w-1/3">
              <div className="w-[200px] md:w-[240px]">
                <ImageWithSkeleton src="/images/doordash/slide6_Image_0.png" alt="DoorDash wrong door photo validation rejection screen" className="rounded-2xl w-full" style={{ border: imgBorder }} />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: statBg }}>
                <p className="text-base italic" style={{ color: textColor }}>
                  Customer requests: &quot;Leave at garage door.&quot; Dasher complies. App rejects photo: <strong>&quot;Wrong door detected.&quot;</strong>
                </p>
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>The Paradox</h3>
              <p className="text-base leading-relaxed mb-4" style={{ color: textColor }}>
                ML compares to previous delivery photos for fraud prevention. Alternate locations don&apos;t match = rejected. System loses photo proof for non-standard locations, exactly when documentation matters most. Rejection forces bypass, producing no photo at all.
              </p>
              <div className="p-5 rounded-2xl" style={{ backgroundColor: statBg, border: `2px solid ${primaryColor}` }}>
                <h3 className="text-base font-bold mb-2" style={{ color: primaryColor }}>Proposed Redesign</h3>
                <p className="text-base leading-relaxed" style={{ color: textColor }}>
                  On mismatch: &quot;Alternate location&quot; prompt + notes. Photo + context saved. Better data than no photo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ISSUE #4 */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-6 h-6" style={{ color: primaryColor }} />
            <h2 className="text-sm md:text-base font-bold tracking-widest" style={{ color: primaryColor }}>ISSUE #4: PREMATURE INFORMATION REMOVAL</h2>
          </div>
          <p className="text-lg md:text-xl mb-6 leading-relaxed" style={{ color: textColor }}>
            Pizza portals and smart lockers require pickup codes. If &quot;picked up&quot; is tapped before code entry: <strong style={{ color: primaryColor }}>code disappears. No retrieval option.</strong>
          </p>
          <div className="p-5 rounded-2xl mb-6" style={{ backgroundColor: statBg }}>
            <h3 className="text-base font-bold mb-2" style={{ color: primaryColor }}>Why it might exist</h3>
            <p className="text-base leading-relaxed" style={{ color: textColor }}>
              Code is tied to order state. Once &quot;picked up&quot; is confirmed, ephemeral data clears. Simplifies state machine and reduces data retention. But real pickup involves juggling bags, unfamiliar restaurants, and divided attention.
            </p>
          </div>
          <div className="p-5 rounded-2xl" style={{ backgroundColor: statBg, border: `2px solid ${primaryColor}` }}>
            <h3 className="text-base font-bold mb-2" style={{ color: primaryColor }}>Proposed Redesign</h3>
            <p className="text-base leading-relaxed" style={{ color: textColor }}>
              Keep code visible until locker/portal API confirms physical retrieval. Code clears on hardware confirmation, not tap. A bad actor would memorize the code. This design only punishes honest mistakes.
            </p>
          </div>
        </div>

        {/* ISSUE #5 */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-6 h-6" style={{ color: primaryColor }} />
            <h2 className="text-sm md:text-base font-bold tracking-widest" style={{ color: primaryColor }}>ISSUE #5: EXCESSIVE INTERACTION COST</h2>
          </div>
          <p className="text-2xl md:text-3xl font-bold mb-2" style={{ color: primaryColor }}>12 taps to cancel.</p>
          <p className="text-lg mb-6" style={{ color: textColor }}>Stacked order = 24 taps. While operating a vehicle.</p>

          <div className="flex gap-3 md:gap-4 justify-center mb-8 overflow-x-auto pb-2">
            {[
              { src: '/images/doordash/slide8_Image_0.png', alt: 'Unassigned confirmation screen' },
              { src: '/images/doordash/slide8_Image_1.png', alt: 'Did we resolve your issue survey' },
              { src: '/images/doordash/slide8_Image_2.png', alt: 'Full satisfaction survey with multiple questions' },
            ].map((img) => (
              <div key={img.src} className="w-[140px] md:w-[180px] flex-shrink-0">
                <ImageWithSkeleton src={img.src} alt={img.alt} className="rounded-2xl w-full" style={{ border: imgBorder }} />
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl mb-6" style={{ backgroundColor: statBg }}>
            <h3 className="text-base font-bold mb-3" style={{ color: textColor }}>The 12-tap flow:</h3>
            <p className="text-sm leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
              Help → I have an issue → Something else → Unassign → Reason → Continue → Got it → Thumbs → Satisfaction → Submit → What did you like → Submit
            </p>
          </div>

          <div className="p-5 rounded-2xl mb-6" style={{ backgroundColor: statBg }}>
            <h3 className="text-base font-bold mb-2" style={{ color: primaryColor }}>Why 12 taps might be intentional</h3>
            <p className="text-base leading-relaxed" style={{ color: textColor }}>
              Friction deters cancellations (DoorDash needs high completion rates). Embedded surveys guarantee responses. Confirmations prevent accidental unassigns.
            </p>
          </div>

          <div className="p-5 rounded-2xl" style={{ backgroundColor: statBg, border: `2px solid ${primaryColor}` }}>
            <h3 className="text-base font-bold mb-2" style={{ color: primaryColor }}>Proposed Redesign</h3>
            <p className="text-base leading-relaxed" style={{ color: textColor }}>
              4-tap cancel + deferred survey at next stationary app open. <strong>67% fewer taps while driving.</strong> Higher quality survey data from focused respondents.
            </p>
          </div>
        </div>

        {/* DESIGN PHILOSOPHY */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16" style={{ borderBottom: divider }}>
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-8" style={{ color: primaryColor }}>DESIGN PHILOSOPHY</h2>
          <p className="text-xl md:text-2xl font-bold mb-8 leading-relaxed" style={{ color: primaryColor }}>
            Every redesign preserves the business goal the current design serves. The question isn&apos;t whether these goals matter. It&apos;s whether the current implementation achieves them or undermines them.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Preserves', items: ['Completion friction', 'Privacy', 'Fraud deterrence', 'Survey data'] },
              { label: 'Improves', items: ['Safety', 'Data accuracy', 'Support volume', 'Data quality'] },
            ].map((group) => (
              <div key={group.label} className="col-span-1 md:col-span-2 p-5 rounded-2xl" style={{ backgroundColor: statBg }}>
                <h3 className="text-base font-bold mb-3" style={{ color: primaryColor }}>{group.label}</h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <p key={item} className="text-sm" style={{ color: textColor }}>{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MEASURING SUCCESS */}
        <div className="min-h-screen flex flex-col justify-center py-12 md:py-16">
          <h2 className="text-sm md:text-base font-bold tracking-widest mb-8" style={{ color: primaryColor }}>MEASURING SUCCESS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: TrendingDown, label: 'Support Ticket Volume', desc: 'Fewer tickets for "lost address" and "can\'t complete delivery"' },
              { icon: BarChart3, label: 'Data Accuracy', desc: 'Fewer false "handed to customer" entries when actually left at door' },
              { icon: ImageIcon, label: 'Photo Proof Coverage', desc: 'More photo documentation for non-standard delivery locations' },
              { icon: Activity, label: 'Driver Safety', desc: 'Fewer required taps during active driving (cancellation flow)' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4 p-5 rounded-2xl" style={{ backgroundColor: statBg }}>
                <Icon className="w-8 h-8 flex-shrink-0" style={{ color: primaryColor }} />
                <div>
                  <p className="text-base font-bold mb-1" style={{ color: textColor }}>{label}</p>
                  <p className="text-sm" style={{ color: textColor, opacity: 0.8 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: statBg }}>
            <p className="text-sm" style={{ color: textColor, opacity: 0.7 }}>
              <strong>Secondary metrics:</strong> Survey quality (deferred vs. in-flow), Dasher NPS, support handle time, photo coverage for alternate locations
            </p>
          </div>
        </div>
      </div>
      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
