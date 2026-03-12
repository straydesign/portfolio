'use client';

import { ArrowLeft, Smartphone, Shield, Camera, Key, ArrowRight } from 'lucide-react';
import ImageWithSkeleton from './ImageWithSkeleton';
import PhoneMockup from './PhoneMockup';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';
import NextProject from './NextProject';
import { type Page } from '@/data/projects';

interface DoorDashCaseStudyProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

export default function DoorDashCaseStudy({ onBack, onNavigate }: DoorDashCaseStudyProps) {
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';
  const primaryColor = '#ffffff';

  const statBg = '#000000';
  const imgBorder = '2px solid rgba(255, 255, 255, 0.1)';
  const divider = '1px solid rgba(255,255,255,0.06)';
  const onPrimaryColor = '#000000';

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* Back link */}
        <div className="pt-6 mb-8">
          <button onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: primaryColor, borderRadius: 0 }}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        {/* HERO */}
        <div className="min-h-[80vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-16" style={{ borderBottom: divider }}>
          <AnimateIn direction="left" className="w-full md:w-2/5">
            <PhoneMockup
              screenshot="/images/doordash/slide6_Image_0.png"
              gradientFrom={primaryColor}
              gradientTo="#000000"
              alt="DoorDash Dasher app screenshot"
              size="large"
            />
          </AnimateIn>

          <AnimateIn direction="right" className="w-full md:w-3/5">
            <TextCard padding="lg">
              <p className="text-xs font-bold tracking-widest mb-4 uppercase" style={{ color: primaryColor }}>Case Study</p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>
                DOORDASH DASHER APP
              </h1>
              <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>
                12 taps to cancel an order. While driving.
              </p>
              <p className="text-base mb-8 leading-relaxed" style={{ color: textColor }}>
                When the app fails, the driver becomes the workaround. 5 redesign proposals from 1,000+ deliveries behind the wheel.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'SCOPE', value: 'Heuristic evaluation of error recovery' },
                  { label: 'RESEARCH', value: '1,000+ deliveries as a Dasher', highlight: true },
                  { label: 'MY ROLE', value: 'UX Researcher & Designer' },
                  { label: 'FRAMEWORK', value: "Nielsen\u2019s 10 Heuristics" },
                ].map(({ label, value, highlight }) => (
                  <div key={label}>
                    <p className="text-xs font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                    <p className="text-sm" style={{ color: highlight ? primaryColor : textColor, fontWeight: highlight ? 700 : 400 }}>{value}</p>
                  </div>
                ))}
              </div>
            </TextCard>
          </AnimateIn>
        </div>

        {/* THE HUMAN COST */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
            <p className="text-xl md:text-3xl leading-relaxed font-bold" style={{ color: textColor }}>
              Gig drivers are <span style={{ color: primaryColor }}>4x more likely</span> to use apps behind the wheel. Every unnecessary tap is time your eyes aren&apos;t on the road.
            </p>
          </TextCard>
        </AnimateIn>

        {/* IMPACT AT A GLANCE */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg">
            <p className="text-xs font-bold tracking-widest mb-8 uppercase" style={{ color: primaryColor }}>Impact at a Glance</p>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.08}>
              {[
                { stat: '5', label: 'Redesign proposals', sub: 'Without breaking the business model' },
                { stat: '67%', label: 'Fewer taps', sub: '12 \u2192 4 while driving' },
                { stat: '15 min', label: 'Recovery window', sub: 'For lost addresses' },
                { stat: '100%', label: 'Photo coverage', sub: 'Even at alternate locations' },
              ].map(({ stat, label, sub }) => (
                <StaggerItem key={label}>
                  <div className="p-5 text-center" style={{ backgroundColor: statBg, borderRadius: 0, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <p className="text-3xl md:text-5xl font-black" style={{ color: primaryColor }}>{stat}</p>
                    <p className="text-sm font-bold mt-2" style={{ color: textColor }}>{label}</p>
                    <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{sub}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </TextCard>
        </AnimateIn>

        {/* ISSUE #1 — Button Hierarchy */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: onPrimaryColor, borderRadius: 0 }}>
                <Smartphone className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Issue #1</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="flex gap-4 justify-center md:w-2/5">
                <div className="w-[140px] md:w-[180px] flex-shrink-0">
                  <ImageWithSkeleton src="/images/doordash/slide4_Image_0.png" alt="Continue button prominent" className="rounded-2xl w-full" style={{ border: imgBorder }} />
                </div>
                <div className="w-[140px] md:w-[180px] flex-shrink-0">
                  <ImageWithSkeleton src="/images/doordash/slide4_Image_1.png" alt="Handed to customer" className="rounded-2xl w-full" style={{ border: imgBorder }} />
                </div>
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

        {/* ISSUE #2 — No Error Recovery */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: onPrimaryColor, borderRadius: 0 }}>
                <Shield className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Issue #2</p>
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

        {/* ISSUE #3 — Photo Validation */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: onPrimaryColor, borderRadius: 0 }}>
                <Camera className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Issue #3</p>
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
                <div className="w-[180px] md:w-[220px]">
                  <ImageWithSkeleton src="/images/doordash/slide6_Image_0.png" alt="Photo rejection screen" className="rounded-2xl w-full" style={{ border: imgBorder }} />
                </div>
              </div>
            </div>
          </TextCard>
        </AnimateIn>

        {/* ISSUE #4 — Code Disappears */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: onPrimaryColor, borderRadius: 0 }}>
                <Key className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Issue #4</p>
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

        {/* ISSUE #5 — 12 Taps to Cancel */}
        <AnimateIn direction="up" className="py-16 md:py-24">
          <TextCard padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: primaryColor, color: onPrimaryColor, borderRadius: 0 }}>
                <Smartphone className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Issue #5</p>
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

            <div className="flex gap-3 md:gap-4 justify-center mb-6 overflow-x-auto pb-2">
              {[
                { src: '/images/doordash/slide8_Image_0.png', alt: 'Unassigned confirmation' },
                { src: '/images/doordash/slide8_Image_1.png', alt: 'Survey prompt' },
                { src: '/images/doordash/slide8_Image_2.png', alt: 'Full satisfaction survey' },
              ].map((img) => (
                <div key={img.src} className="w-[120px] md:w-[160px] flex-shrink-0">
                  <ImageWithSkeleton src={img.src} alt={img.alt} className="rounded-2xl w-full" style={{ border: imgBorder }} />
                </div>
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

        {/* CONCLUSION */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" style={{ borderLeft: '4px solid #ffffff' }}>
            <p className="text-xs font-bold tracking-widest mb-6 uppercase" style={{ color: primaryColor }}>Conclusion</p>
            <p className="text-xl md:text-2xl font-bold leading-relaxed mb-6" style={{ color: textColor }}>
              Five issues. One philosophy: <span style={{ color: primaryColor }}>the app should protect the driver, not punish them.</span>
            </p>
            <p className="text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
              Every proposal here respects DoorDash&apos;s business constraints &mdash; fraud prevention, data collection, customer privacy &mdash; while removing the friction that puts drivers at risk. Button hierarchy that matches the task at hand. Error recovery that doesn&apos;t erase your progress. Photo validation that adapts to real-world delivery. Codes that stay visible until the job is actually done. And a cancellation flow cut from 12 taps to 4.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { stat: '12 → 4', label: 'Taps to cancel' },
                { stat: '5', label: 'Redesign proposals' },
                { stat: '1,000+', label: 'Deliveries researched' },
                { stat: '0', label: 'Business constraints broken' },
              ].map(({ stat, label }) => (
                <div key={label} className="p-4 text-center" style={{ backgroundColor: statBg, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <p className="text-2xl md:text-3xl font-black" style={{ color: primaryColor }}>{stat}</p>
                  <p className="text-xs font-bold mt-2" style={{ color: secondaryTextColor }}>{label}</p>
                </div>
              ))}
            </div>
          </TextCard>
        </AnimateIn>
      </div>
      <NextProject currentProjectId="doordash-case-study" onNavigate={onNavigate} />
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
