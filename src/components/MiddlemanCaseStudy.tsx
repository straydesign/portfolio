'use client';

import MiddlemanLogo from './MiddlemanLogo';
import { ArrowLeft, ExternalLink, AlertTriangle, ArrowRight } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';
import NextProject from './NextProject';
import { NavigableSection } from './NavigableSection';
import { type Page } from '@/data/projects';

interface MiddlemanCaseStudyProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

const MERCHANDISER_JOURNEY = [
  { step: 1, label: 'Drive to store', friction: null, detail: null },
  {
    step: 2,
    label: 'Walk in cold',
    friction: 'No POS context. The data exists at HQ — the floor never sees it.',
    detail: 'The company tracks every SKU through POS. You arrive with none of it: no priority list, no top movers, no recent variance. Every store visit starts from scratch.',
  },
  {
    step: 3,
    label: 'Walk aisles, eyeball + tally',
    friction: 'Pen marks vs reality. Memory has to hold.',
    detail: 'You count the shelf, scrawl numbers on cardboard, then translate that to what to pull from the back. Sticky notes fall off, ink smears, and you recount when you forget.',
  },
  { step: 4, label: 'Walk to backstock', friction: null, detail: null },
  {
    step: 5,
    label: 'Dig through pallets',
    friction: 'Half the SKUs aren\'t on the floor. Cross-reference memory.',
    detail: 'Pallets get rearranged after every delivery. A SKU in row 3 yesterday might be row 7 today. You retrace by case art, not by location.',
  },
  { step: 6, label: 'Restock shelves', friction: null, detail: null },
  {
    step: 7,
    label: 'Submit order',
    friction: 'Hand-written sheet. One mistake = next week\'s stockout.',
    detail: 'Faxed-in sheet of SKU codes and quantities. A transposed digit drops a whole truck. The error doesn\u2019t surface until you walk in next week and the shelf is empty.',
  },
] as const;

const PROPOSALS = [
  {
    n: '01',
    title: 'Dashboard',
    variant: 1,
    before: 'We had nothing. No screen, no view, no signal.',
    after: 'One screen: what we do every day, visible — risk, actions, recent activity, all in reach.',
  },
  {
    n: '02',
    title: 'Pull List',
    variant: 2,
    before: 'Cardboard tally — no priorities, no quantities',
    after: 'Pull counts computed from POS, sorted by urgency.',
  },
  {
    n: '03',
    title: 'Orders / Deliveries',
    variant: 3,
    before: 'Hand-written sheets, PO numbers, scattered between days',
    after: 'One page with two tabs at top — Orders and Deliveries, one tap apart.',
  },
  {
    n: '04',
    title: 'Variance',
    variant: 4,
    before: 'Shrinkage hides in noise until the quarterly audit',
    after: 'Pinpoint shrinkage to small windows — not breakage — so we can chase displacement or theft and drive the number down.',
  },
] as const;

const DECISIONS = [
  { move: 'Cards → list', why: 'Cards were pretty. A flat list reads 3× faster on a moving cart.' },
  { move: 'Orders + deliveries: one tab', why: 'Two tabs added taps. Keep them visually distinct in the same view.' },
  { move: 'Cut: photograph-the-shelf', why: 'CV creep. The goal is POS awareness, not solving merchandising via camera.' },
  { move: 'Cut: pallet builder', why: 'Belongs to the warehouse side. The route side is its own job.' },
  { move: 'No dollar amounts', why: 'NHD doesn\'t give merchandisers POS access — margins are proprietary.' },
] as const;

const HERO_SCREENS = [
  { src: '/images/middleman/dashboard.png', alt: 'Risk dashboard', label: 'Dashboard' },
  { src: '/images/middleman/stock.png', alt: 'Pull list', label: 'Pull List' },
  { src: '/images/middleman/orders.png', alt: 'Schedule', label: 'Schedule' },
] as const;

const BG = {
  hero: '#000000',
  journey: '#18181b',
  validation: '#050507',
  ideation: '#18181b',
  iteration: '#050507',
  outcome: '#062818',
} as const;

// Hand-drawn-style wireframes for the four ideation moves.
// Black outlines on white — deliberately "early sketch."
function Wireframe({ variant }: { variant: number }) {
  const svgProps = {
    viewBox: '0 0 300 600',
    xmlns: 'http://www.w3.org/2000/svg',
    style: { maxWidth: '100%', maxHeight: '100%', display: 'block' as const },
  };
  const frame = (
    <>
      <rect x="8" y="8" width="284" height="584" rx="28" fill="#ffffff" stroke="#000000" strokeWidth="2.5" />
      <rect x="125" y="22" width="50" height="5" rx="2.5" fill="#000000" />
    </>
  );
  const titleProps = {
    fontFamily: 'ui-monospace, Menlo, monospace',
    fontSize: 12,
    fontWeight: 700,
    fill: '#000000',
  };

  if (variant === 1) {
    return (
      <svg {...svgProps}>
        {frame}
        {/* Store header */}
        <rect x="24" y="46" width="28" height="28" fill="none" stroke="#000" strokeWidth="1.5" />
        <circle cx="38" cy="60" r="4" fill="#000" />
        <text x="60" y="60" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="#000" fontWeight="700">HANNAFORD</text>
        <text x="60" y="72" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#000">#96 · S BURLINGTON</text>
        <line x1="24" y1="86" x2="276" y2="86" stroke="#000" strokeWidth="0.75" />
        {/* DASHBOARD + SYNC */}
        <text x="24" y="104" {...titleProps} fontSize={11}>DASHBOARD</text>
        <text x="276" y="104" textAnchor="end" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#000">SYNC 11:30</text>
        {/* 3 KPI tiles */}
        {[
          { x: 24, n: '2', lbl: 'CRITICAL' },
          { x: 112, n: '9', lbl: 'WARNING' },
          { x: 200, n: '19', lbl: 'HEALTHY' },
        ].map((k, i) => (
          <g key={`kpi${i}`}>
            <rect x={k.x} y={114} width={76} height={56} fill="none" stroke="#000" strokeWidth="1.5" />
            <text x={k.x + 38} y={144} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="22" fill="#000" fontWeight="700">{k.n}</text>
            <text x={k.x + 38} y={162} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill="#000" fontWeight="700">{k.lbl}</text>
          </g>
        ))}
        {/* ACTIONS */}
        <text x="24" y="194" {...titleProps} fontSize={11}>ACTIONS</text>
        {['NOTES', 'PULL', 'DELIV', 'BREAK'].map((act, i) => (
          <g key={`act${i}`}>
            <rect x={24 + i * 65} y={202} width={56} height={48} fill="none" stroke="#000" strokeWidth="1.25" />
            <rect x={24 + i * 65 + 22} y={212} width={12} height={12} fill="none" stroke="#000" strokeWidth="1.25" />
            <text x={24 + i * 65 + 28} y={240} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill="#000" fontWeight="700">{act}</text>
          </g>
        ))}
        {/* RECENT ACTIVITY */}
        <text x="24" y="274" {...titleProps} fontSize={11}>RECENT ACTIVITY</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={`a${i}`}>
            <rect x="24" y={284 + i * 42} width="252" height="34" fill="none" stroke="#000" strokeWidth="1" />
            <rect x="32" y={296 + i * 42} width="5" height="5" fill="#000" />
            <line x1="44" y1={300 + i * 42} x2="190" y2={300 + i * 42} stroke="#000" strokeWidth="1.5" />
            <line x1="44" y1={312 + i * 42} x2="150" y2={312 + i * 42} stroke="#000" strokeWidth="0.75" />
            <text x="246" y={304 + i * 42} fontFamily="ui-monospace, Menlo, monospace" fontSize="8" fill="#000">11:30</text>
          </g>
        ))}
        {/* Bottom nav */}
        <line x1="24" y1="482" x2="276" y2="482" stroke="#000" strokeWidth="1" />
        {['DASH', 'ORDERS', 'STOCK'].map((nav, i) => (
          <g key={`n${i}`}>
            <rect x={66 + i * 64} y={500} width={18} height={18} fill="none" stroke="#000" strokeWidth="1.5" />
            <text x={75 + i * 64} y={538} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#000" fontWeight={i === 0 ? 700 : 400}>{nav}</text>
            {i === 0 && <line x1={62 + i * 64} y1={494} x2={88 + i * 64} y2={494} stroke="#000" strokeWidth="2" />}
          </g>
        ))}
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg {...svgProps}>
        {frame}
        <text x="24" y="80" {...titleProps}>PULL LIST</text>
        <line x1="24" y1="92" x2="276" y2="92" stroke="#000" strokeWidth="1" />
        {/* search bar */}
        <rect x="24" y="106" width="252" height="32" fill="none" stroke="#000" strokeWidth="1.5" />
        <circle cx="40" cy="122" r="5" fill="none" stroke="#000" strokeWidth="1.25" />
        <line x1="44" y1="126" x2="50" y2="132" stroke="#000" strokeWidth="1.25" />
        {/* filter chips */}
        {[0, 1, 2].map((i) => (
          <rect key={`c${i}`} x={24 + i * 82} y={152} width="72" height="26" rx="13" fill={i === 0 ? '#000' : 'none'} stroke="#000" strokeWidth="1.5" />
        ))}
        {/* list rows */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={`pr${i}`}>
            <rect x="24" y={196 + i * 56} width="252" height="46" fill="none" stroke="#000" strokeWidth="1.25" />
            <rect x="34" y={210 + i * 56} width="18" height="18" fill="none" stroke="#000" strokeWidth="1.5" />
            {i < 2 && <line x1="38" y1={220 + i * 56} x2="48" y2={224 + i * 56} stroke="#000" strokeWidth="2" />}
            <line x1="62" y1={216 + i * 56} x2="190" y2={216 + i * 56} stroke="#000" strokeWidth="1.5" />
            <line x1="62" y1={230 + i * 56} x2="150" y2={230 + i * 56} stroke="#000" strokeWidth="1" />
            <text x="242" y={222 + i * 56} fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="#000" fontWeight="700">×{4 + i}</text>
          </g>
        ))}
      </svg>
    );
  }

  if (variant === 3) {
    return (
      <svg {...svgProps}>
        {frame}
        {/* Store header */}
        <rect x="24" y="46" width="28" height="28" fill="none" stroke="#000" strokeWidth="1.5" />
        <circle cx="38" cy="60" r="4" fill="#000" />
        <text x="60" y="60" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="#000" fontWeight="700">HANNAFORD</text>
        <text x="60" y="72" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#000">#96 · S BURLINGTON</text>
        {/* Two tabs at top — the key visual */}
        <rect x="24" y="94" width="124" height="36" fill="#000" stroke="#000" strokeWidth="2" />
        <text x="86" y="117" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="#fff" fontWeight="700">ORDERS</text>
        <rect x="152" y="94" width="124" height="36" fill="none" stroke="#000" strokeWidth="2" />
        <text x="214" y="117" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="#000" fontWeight="700">DELIVERIES</text>
        {/* TODAY label */}
        <text x="24" y="152" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fill="#000" fontWeight="700">TODAY · THU</text>
        {/* Today card */}
        <rect x="24" y="160" width="252" height="80" fill="none" stroke="#000" strokeWidth="2" />
        <text x="36" y="180" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="#000" fontWeight="700">ON THE WAY</text>
        <text x="36" y="208" fontFamily="ui-monospace, Menlo, monospace" fontSize="18" fill="#000" fontWeight="700">ETA 11:30 AM</text>
        <rect x="36" y="216" width="180" height="6" fill="#000" />
        <rect x="216" y="216" width="44" height="6" fill="none" stroke="#000" strokeWidth="1" />
        <text x="36" y="234" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#000">122 cases</text>
        {/* SUNDAY */}
        <text x="24" y="266" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fill="#000" fontWeight="700">SUNDAY</text>
        {/* Scheduled card */}
        <rect x="24" y="274" width="252" height="76" fill="none" stroke="#000" strokeWidth="1.25" />
        <text x="36" y="294" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="#000" fontWeight="700">SCHEDULED</text>
        <text x="36" y="316" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fill="#000">~116 cases · building</text>
        <line x1="36" y1="330" x2="240" y2="330" stroke="#000" strokeWidth="0.75" />
        <line x1="36" y1="340" x2="200" y2="340" stroke="#000" strokeWidth="0.75" />
        {/* Action button */}
        <rect x="24" y="368" width="252" height="36" fill="none" stroke="#000" strokeWidth="1.5" />
        <text x="150" y="391" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="#000" fontWeight="700">REVIEW & EDIT</text>
        {/* Recent list */}
        <text x="24" y="430" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fill="#000" fontWeight="700">RECENT</text>
        {[0, 1].map((i) => (
          <g key={`rc${i}`}>
            <rect x="24" y={440 + i * 24} width="252" height="20" fill="none" stroke="#000" strokeWidth="0.75" />
            <line x1="32" y1={452 + i * 24} x2="180" y2={452 + i * 24} stroke="#000" strokeWidth="0.75" />
          </g>
        ))}
        {/* Bottom nav */}
        <line x1="24" y1="482" x2="276" y2="482" stroke="#000" strokeWidth="1" />
        {['DASH', 'ORDERS', 'STOCK'].map((nav, i) => (
          <g key={`n${i}`}>
            <rect x={66 + i * 64} y={500} width={18} height={18} fill="none" stroke="#000" strokeWidth="1.5" />
            <text x={75 + i * 64} y={538} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="9" fill="#000" fontWeight={i === 1 ? 700 : 400}>{nav}</text>
            {i === 1 && <line x1={62 + i * 64} y1={494} x2={88 + i * 64} y2={494} stroke="#000" strokeWidth="2" />}
          </g>
        ))}
      </svg>
    );
  }

  // variant 4 — Variance
  const bars = [38, 22, 52, 16, 44, 28, 36];
  return (
    <svg {...svgProps}>
      {frame}
      <text x="24" y="80" {...titleProps}>VARIANCE</text>
      <line x1="24" y1="92" x2="276" y2="92" stroke="#000" strokeWidth="1" />
      {/* chart frame */}
      <line x1="32" y1="218" x2="276" y2="218" stroke="#000" strokeWidth="1.5" />
      <line x1="32" y1="112" x2="32" y2="218" stroke="#000" strokeWidth="1.5" />
      {bars.map((h, i) => (
        <rect key={`b${i}`} x={48 + i * 32} y={218 - h * 1.8} width="20" height={h * 1.8} fill={i === 2 ? '#000' : 'none'} stroke="#000" strokeWidth="1.25" />
      ))}
      <text x="32" y="246" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fill="#000">EXPECTED · COUNTED · PULLED</text>
      <text x="24" y="278" {...titleProps} fontSize={11}>BIGGEST GAPS</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={`v${i}`}>
          <rect x="24" y={292 + i * 68} width="252" height="56" fill="none" stroke="#000" strokeWidth="1.25" />
          <line x1="36" y1={314 + i * 68} x2="180" y2={314 + i * 68} stroke="#000" strokeWidth="1.5" />
          <line x1="36" y1={330 + i * 68} x2="140" y2={330 + i * 68} stroke="#000" strokeWidth="1" />
          <text x="226" y={320 + i * 68} fontFamily="ui-monospace, Menlo, monospace" fontSize="11" fill="#000" fontWeight="700">−{8 + i * 3}</text>
        </g>
      ))}
    </svg>
  );
}

export default function MiddlemanCaseStudy({ onBack, onNavigate }: MiddlemanCaseStudyProps) {
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';
  const primaryColor = '#22c55e';
  const cardBg = 'rgba(255,255,255,0.02)';
  const sectionPad = 'py-10 md:py-14';
  const inner = 'w-full px-4 md:px-8 max-w-[90rem] mx-auto';

  return (
    <div className="min-h-screen" style={{ backgroundColor: BG.hero }}>
      {/* Fixed back + visit site bar */}
      <div className="fixed top-12 md:top-14 left-0 right-0 z-[100] bg-black py-3 px-4 md:px-8 flex items-center gap-4">
        <button onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: textColor, borderRadius: 0 }}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <a href="https://middleman.quest" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-80"
          style={{ backgroundColor: primaryColor, color: '#000000', borderRadius: 0 }}>
          <ExternalLink className="w-4 h-4" /> Try Live Prototype
        </a>
      </div>

      {/* HERO */}
      <NavigableSection id="mm-hero" label="Hero" style={{ backgroundColor: BG.hero }}>
        <div className={inner}>
          <TextCard padding="lg">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-3" style={{ color: secondaryTextColor }}>WHAT</p>
            <div className="min-h-[78vh] flex flex-col md:flex-row items-center gap-8 md:gap-14 py-6 md:py-8">
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-3">
                  <MiddlemanLogo color={primaryColor} className="w-10 md:w-14 h-auto" />
                  <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Live Prototype</p>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight" style={{ color: textColor }}>MIDDLEMAN</h1>
                <p className="text-lg md:text-xl mb-3 leading-relaxed" style={{ color: secondaryTextColor }}>
                  Walk in cold. No list. No plan. Just memory and a cardboard tally sheet.
                </p>
                <p className="text-sm md:text-base mb-5 leading-relaxed" style={{ color: textColor }}>
                  I designed this from the inside. I worked as a beer merchandiser at New Hampshire Distributors — a daily route of grocery and convenience stops, pen-and-cardboard ordering. This is what it should have been.
                </p>
                <a href="https://middleman.quest" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3.5 text-base font-bold mb-6 transition-opacity hover:opacity-80"
                  style={{ backgroundColor: primaryColor, color: '#000000', borderRadius: 0 }}>
                  <ExternalLink className="w-5 h-5" /> Try the live prototype
                </a>
                <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.06}>
                  {[
                    { label: 'CUSTOMER', value: 'Beer merchandisers running a daily store route' },
                    { label: 'THE PAIN', value: '2.5+ hrs per store when you actually count' },
                    { label: 'MY ROLE', value: 'Solo designer — also worked the job' },
                    { label: 'SYSTEM', value: 'Bloomberg Terminal / warehouse grid' },
                  ].map(({ label, value }) => (
                    <StaggerItem key={label}>
                      <div>
                        <p className="text-[10px] font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                        <p className="text-sm" style={{ color: textColor }}>{value}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
              <div className="w-full md:w-1/2">
                <StaggerContainer className="grid grid-cols-3 gap-3" staggerDelay={0.08}>
                  {HERO_SCREENS.map(({ src, alt, label }, i) => (
                    <StaggerItem key={src}>
                      <div className="flex flex-col gap-2" style={{ transform: i === 1 ? 'translateY(-12px)' : undefined }}>
                        <div style={{ border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#0a0a0b' }}>
                          <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
                        </div>
                        <p className="text-[10px] font-bold tracking-wider text-center uppercase" style={{ color: secondaryTextColor }}>{label}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </TextCard>
        </div>
      </NavigableSection>

      {/* USER JOURNEY */}
      <NavigableSection id="mm-user-journey" label="User Journey" style={{ backgroundColor: BG.journey }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 01</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>User Journey</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                The route, repeated every day. I lived it. The friction wasn&apos;t the lifting — it was the guesswork.
              </p>
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-2.5" staggerDelay={0.04}>
                {MERCHANDISER_JOURNEY.map(({ step, label, friction, detail }) => (
                  <StaggerItem key={step}>
                    <div className="group relative p-3 h-full flex flex-col" style={{
                      backgroundColor: cardBg,
                      border: friction ? `1px solid ${primaryColor}40` : '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="text-[10px] font-bold tracking-wider" style={{ color: secondaryTextColor }}>STEP {String(step).padStart(2, '0')}</p>
                        {friction && <AlertTriangle className="w-3 h-3" style={{ color: primaryColor }} />}
                      </div>
                      <p className="text-sm font-bold mb-1.5" style={{ color: textColor }}>{label}</p>
                      {friction && (
                        <p className="text-[11px] leading-snug mt-auto" style={{ color: primaryColor }}>{friction}</p>
                      )}
                      {detail && (
                        <div
                          className="pointer-events-none absolute left-0 right-0 bottom-full mb-2 p-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100 z-20"
                          style={{
                            backgroundColor: '#000000',
                            border: `1px solid ${primaryColor}`,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                          }}
                        >
                          <p className="text-[11px] leading-snug" style={{ color: textColor }}>{detail}</p>
                          <span
                            className="absolute left-4 -bottom-1.5 w-3 h-3 rotate-45"
                            style={{ backgroundColor: '#000000', borderRight: `1px solid ${primaryColor}`, borderBottom: `1px solid ${primaryColor}` }}
                          />
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* VALIDATION */}
      <NavigableSection id="mm-validation" label="Field Notes" style={{ backgroundColor: BG.validation }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 02</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Field Notes</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Not user-tested — I worked the route myself. The job: get in, see what&apos;s needed, figure it out. The frustration: NHD has the POS data; the floor never sees it.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                {[
                  { stat: 'Daily', label: 'Store route', sub: 'Grocery + convenience stops' },
                  { stat: '2.5 hrs+', label: 'Per store, thorough', sub: 'Hit fast and miss cases, or stay and count' },
                  { stat: '0', label: 'Tools provided', sub: 'Pen, cardboard, memory' },
                ].map(({ stat, label, sub }) => (
                  <div key={label} className="p-4" style={{ backgroundColor: cardBg, border: '1px dashed rgba(255,255,255,0.12)' }}>
                    <p className="text-3xl md:text-4xl font-black" style={{ color: primaryColor }}>{stat}</p>
                    <p className="text-sm font-bold mt-1" style={{ color: textColor }}>{label}</p>
                    <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{sub}</p>
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-bold tracking-wider mb-3 uppercase" style={{ color: primaryColor }}>Three moments that designed the product</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { tag: 'The 6am cooler', body: 'Restocking before doors open, no idea what sold yesterday. Pulled 8 cases of Bud Light. They needed 22.' },
                  { tag: 'The data behind the wall', body: 'NHD has the POS. Merchandisers don\u2019t. Every shift you feel the gap — this could be easier, faster, more effective.' },
                  { tag: 'Speed vs. detail', body: 'Hit fast and miss cases, or count thorough for 2.5+ hours. There was no middle.' },
                ].map(({ tag, body }) => (
                  <div key={tag} className="p-3" style={{ backgroundColor: cardBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-[10px] font-bold tracking-wider mb-1.5 uppercase" style={{ color: primaryColor }}>{tag}</p>
                    <p className="text-[12px] leading-snug" style={{ color: textColor }}>{body}</p>
                  </div>
                ))}
              </div>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* IDEATION */}
      <NavigableSection id="mm-ideation" label="Ideation" style={{ backgroundColor: BG.ideation }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 03</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Ideation</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Four moves, sketched first. Each replaces a moment of guesswork from the route above.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-3" staggerDelay={0.05}>
                {PROPOSALS.map(({ n, title, before, after, variant }) => (
                  <StaggerItem key={n}>
                    <div className="p-3 h-full flex flex-col" style={{ backgroundColor: cardBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-black" style={{ color: primaryColor }}>{n}</p>
                        <p className="text-xs font-bold" style={{ color: textColor }}>{title}</p>
                      </div>
                      <div className="mb-2 h-72 flex items-center justify-center p-2" style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#ffffff' }}>
                        <Wireframe variant={variant} />
                      </div>
                      <div className="mb-1.5">
                        <p className="text-[10px] font-bold tracking-wider mb-0.5" style={{ color: secondaryTextColor }}>BEFORE</p>
                        <p className="text-[11px] leading-snug" style={{ color: secondaryTextColor }}>{before}</p>
                      </div>
                      <div style={{ borderLeft: `2px solid ${primaryColor}`, paddingLeft: '8px' }}>
                        <p className="text-[10px] font-bold tracking-wider mb-0.5" style={{ color: primaryColor }}>AFTER</p>
                        <p className="text-[11px] leading-snug" style={{ color: textColor }}>{after}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      {/* ITERATION */}
      <NavigableSection id="mm-iteration" label="Iteration" style={{ backgroundColor: BG.iteration }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>DESIGN PROCESS — 04</p>
              <h2 className="text-2xl md:text-4xl font-bold mb-2" style={{ color: textColor }}>Iteration</h2>
              <p className="text-sm md:text-base mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>
                Five decisions that defined the scope. Each one cost something I liked.
              </p>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-2.5" staggerDelay={0.05}>
                {DECISIONS.map(({ move, why }, i) => (
                  <StaggerItem key={move}>
                    <div className="p-3 h-full flex flex-col" style={{ backgroundColor: cardBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-lg font-black" style={{ color: primaryColor }}>{String(i + 1).padStart(2, '0')}</p>
                        <ArrowRight className="w-3.5 h-3.5" style={{ color: primaryColor, opacity: 0.5 }} />
                      </div>
                      <p className="text-[11px] font-bold tracking-wider mb-1 uppercase" style={{ color: primaryColor }}>DECISION</p>
                      <p className="text-sm font-bold mb-2" style={{ color: textColor }}>{move}</p>
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
      <NavigableSection id="mm-outcome" label="Outcome" style={{ backgroundColor: BG.outcome }}>
        <div className={inner}>
          <div className={sectionPad}>
            <TextCard padding="lg" style={{ borderLeft: `4px solid ${primaryColor}` }}>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: secondaryTextColor }}>OUTCOME</p>
              <p className="text-xl md:text-3xl font-bold leading-relaxed mb-3" style={{ color: textColor }}>
                A formula that tracks variance from expected stock to what&apos;s counted and pulled.
              </p>
              <p className="text-sm md:text-base mb-5 leading-relaxed" style={{ color: secondaryTextColor }}>
                Hours back on the route, shrinkage surfaced in days. Hypothesis from workflow analysis — not yet validated with live users.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { stat: '3h → 2h', label: 'Deliveries' },
                  { stat: '1.5h → 45m', label: 'Store hits' },
                  { stat: 'Pinpointed', label: 'Shrinkage tied to small windows, not quarters' },
                ].map(({ stat, label }) => (
                  <div key={label} className="p-3 text-center" style={{ backgroundColor: cardBg, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-xl md:text-2xl font-black" style={{ color: primaryColor }}>{stat}</p>
                    <p className="text-[10px] font-bold mt-1.5 tracking-wider uppercase" style={{ color: secondaryTextColor }}>{label}</p>
                  </div>
                ))}
              </div>
            </TextCard>
          </div>
        </div>
      </NavigableSection>

      <NextProject currentProjectId="middleman-case-study" onNavigate={onNavigate} />
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
