'use client';

import MiddlemanLogo from './MiddlemanLogo';
import { ArrowLeft, ExternalLink, Clock, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import ImageWithSkeleton from './ImageWithSkeleton';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import TextCard from './TextCard';

interface MiddlemanCaseStudyProps {
  onBack: () => void;
}

export default function MiddlemanCaseStudy({ onBack }: MiddlemanCaseStudyProps) {
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';
  const primaryColor = '#22c55e';
  const amberColor = '#eab308';
  const redColor = '#ef4444';

  const divider = '1px solid rgba(255,255,255,0.06)';
  const imgBorder = '2px solid rgba(255,255,255,0.1)';

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 md:px-8 max-w-[90rem] mx-auto">

        {/* Back + Prototype links */}
        <div className="pt-[72px] mb-8 flex items-center gap-4">
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

        {/* ── HERO ── */}
        <div className="min-h-[80vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-16" style={{ borderBottom: divider }}>
          <AnimateIn direction="left" className="w-full md:w-1/2">
            <TextCard padding="lg">
              <div className="flex items-center gap-4 mb-3">
                <MiddlemanLogo color={primaryColor} className="w-12 md:w-16 h-auto" />
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>Live Prototype</p>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: textColor }}>MIDDLEMAN</h1>
              <p className="text-lg md:text-xl mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>
                You walk into a store cold. No list. No plan. Just your memory and a cardboard tally sheet.
              </p>
              <p className="text-base mb-10 leading-relaxed" style={{ color: textColor }}>
                Beer merchandisers visit 6&ndash;12 stores a day. MIDDLEMAN replaces guesswork with real-time POS data, auto-generated orders, and rolling shrinkage detection.
              </p>
              <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.06}>
                {[
                  { label: 'CUSTOMER', value: 'Beer merchandisers (6-12 stores/day)' },
                  { label: 'THE PAIN', value: '45+ min per store guessing what to restock' },
                  { label: 'MY ROLE', value: 'Solo designer — also worked as a merchandiser' },
                  { label: 'DESIGN SYSTEM', value: 'Bloomberg Terminal / Warehouse Grid' },
                ].map(({ label, value }) => (
                  <StaggerItem key={label}>
                    <div>
                      <p className="text-xs font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                      <p className="text-sm" style={{ color: textColor }}>{value}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </TextCard>
          </AnimateIn>

          <AnimateIn direction="right" className="w-full md:w-1/2">
            <PhoneMockup
              screenshot="/images/middleman/dashboard.png"
              gradientFrom={primaryColor}
              gradientTo="#000000"
              alt="Middleman app dashboard — risk overview, quick actions, and activity feed"
              introVideoSrc="/videos/middleman-intro.mp4"
              size="large"
            />
          </AnimateIn>
        </div>

        {/* ── THE PROBLEM ── */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" className="mb-8">
            <p className="text-xl md:text-3xl leading-relaxed font-bold" style={{ color: textColor }}>
              Sales reps have ordering software. The person restocking shelves has <span style={{ color: primaryColor }}>pen, cardboard, and guesswork.</span>
            </p>
          </TextCard>
          <TextCard padding="md" className="mb-8">
            <p className="text-base md:text-lg leading-relaxed" style={{ color: secondaryTextColor }}>
              I know because I was the person with the cardboard. As a merchandiser at New Hampshire Distributors, I visited 15+ retail accounts a week. Every store visit started the same way — walk in, squint at the shelves, try to remember what sold since last time. There&apos;s no system telling you what&apos;s low. No list prioritizing what to pull from the back. Just you, your best guess, and a race against the clock before you drive to the next store.
            </p>
          </TextCard>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Orders come from POS data — the merchandiser shouldn\'t have to guess quantities',
              'Shrinkage hides in daily noise until it\'s too late — you need rolling variance, not hunches',
              'You spend 45 minutes per store on work the system should handle automatically',
            ].map((pain, i) => (
              <TextCard key={i} padding="md">
                <p className="text-base" style={{ color: textColor }}>{pain}</p>
              </TextCard>
            ))}
          </div>
        </AnimateIn>

        {/* ── THE COMMAND CENTER ── */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="md" className="mb-6">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Command Center</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>Walk in. See what matters. Act on it.</p>
          </TextCard>
          <TextCard padding="md" className="mb-10">
            <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
              The dashboard tells you everything in a glance — how many products are critical, what needs attention, and when your next delivery arrives. Quick actions put the four things you actually do (notes, pull stock, check deliveries, log breakage) one tap away. No menus to dig through. No learning curve.
            </p>
          </TextCard>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-2/5">
              <ImageWithSkeleton src="/images/middleman/dashboard.png" alt="Dashboard — risk stats, quick actions, activity feed" className="w-full" style={{ border: imgBorder }} />
            </div>
            <div className="w-full md:w-3/5">
              <ImageWithSkeleton src="/images/middleman/dashboard-scrolled.png" alt="Dashboard scrolled — KPIs and recent activity" className="w-full" style={{ border: imgBorder }} />
            </div>
          </div>
        </AnimateIn>

        {/* ── THE PULL LIST ── */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="md" className="mb-6">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Pull List</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>Your job is to fill shelves. This tells you exactly what to pull.</p>
          </TextCard>
          <TextCard padding="md" className="mb-10">
            <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
              Instead of a data table you have to interpret, the stock view is a task list. Critical items at the top. Each one tells you how many units to pull from backstock to the shelf. Tap a button, mark it done, move to the next one. Products that are healthy stay out of the way in a quiet list below. You only see what demands your attention.
            </p>
          </TextCard>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <ImageWithSkeleton src="/images/middleman/stock.png" alt="Pull List — critical and warning items with pull-to-shelf CTAs" className="w-full" style={{ border: imgBorder }} />
              <TextCard padding="sm" noTilt className="mt-3">
                <p className="text-sm font-bold" style={{ color: primaryColor }}>Pull List</p>
                <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>Critical and warning items sorted by urgency. Tap to mark as pulled.</p>
              </TextCard>
            </div>
            <div className="w-full md:w-1/2">
              <ImageWithSkeleton src="/images/middleman/product-detail.png" alt="Product detail — stock history, sales velocity, frontstock/backstock" className="w-full" style={{ border: imgBorder }} />
              <TextCard padding="sm" noTilt className="mt-3">
                <p className="text-sm font-bold" style={{ color: primaryColor }}>Product Detail</p>
                <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>Full history, sales velocity, and stock breakdown for any SKU.</p>
              </TextCard>
            </div>
          </div>
        </AnimateIn>

        {/* ── THE SCHEDULE ── */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="md" className="mb-6">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Schedule</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>Time is the axis. Today&apos;s truck is the hero.</p>
          </TextCard>
          <TextCard padding="md" className="mb-10">
            <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
              Deliveries aren&apos;t organized by PO number — nobody thinks in PO numbers. Today&apos;s incoming truck gets the spotlight: big ETA, progress bar, case count, and a direct line to the driver. Upcoming orders sit below with a clear &ldquo;review and edit&rdquo; window before warehouse cutoff. Past deliveries collapse into a quiet log. You always know what&apos;s coming and when.
            </p>
          </TextCard>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <ImageWithSkeleton src="/images/middleman/orders.png" alt="The Schedule — today's truck, upcoming orders, past deliveries" className="w-full" style={{ border: imgBorder }} />
              <TextCard padding="sm" noTilt className="mt-3">
                <p className="text-sm font-bold" style={{ color: primaryColor }}>The Schedule</p>
                <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>Today&apos;s delivery as hero, upcoming as editable, past as a log.</p>
              </TextCard>
            </div>
            <div className="w-full md:w-1/2">
              <ImageWithSkeleton src="/images/middleman/order-edit.png" alt="Order Edit — adjust quantities before warehouse cutoff" className="w-full" style={{ border: imgBorder }} />
              <TextCard padding="sm" noTilt className="mt-3">
                <p className="text-sm font-bold" style={{ color: primaryColor }}>Order Edit</p>
                <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>Adjust auto-generated quantities before the warehouse locks it in.</p>
              </TextCard>
            </div>
          </div>
        </AnimateIn>

        {/* ── DESIGN SYSTEM ── */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="lg" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>The Design System</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
              Bloomberg Terminal meets warehouse floor
            </p>
            <p className="text-base mt-3 leading-relaxed" style={{ color: secondaryTextColor }}>
              Merchandisers work in dimly-lit coolers and bright fluorescent aisles. The design system prioritizes scanability over aesthetics: monospace type, traffic-light colors, zero border radius, data-dense layouts. Every design choice was made for gloveboxes and loading docks, not conference rooms.
            </p>
          </TextCard>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10" staggerDelay={0.08}>
            {[
              { label: 'Typography', value: 'JetBrains Mono', desc: 'Tabular nums, slashed zero' },
              { label: 'Colors', value: 'Green / Amber / Red', desc: 'Traffic-light only — no blue, no purple' },
              { label: 'Corners', value: '0px radius', desc: 'Sharp rectangles everywhere' },
              { label: 'Shadows', value: 'None', desc: 'Flat cards with border separation' },
            ].map(({ label, value, desc }) => (
              <StaggerItem key={label}>
                <TextCard padding="md">
                  <p className="text-xs font-bold tracking-wider mb-1" style={{ color: secondaryTextColor }}>{label}</p>
                  <p className="text-base font-bold" style={{ color: primaryColor }}>{value}</p>
                  <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>{desc}</p>
                </TextCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* All screens grid */}
          <StaggerContainer className="grid grid-cols-3 md:grid-cols-5 gap-4" staggerDelay={0.08}>
            {[
              { src: '/images/middleman/login.png', label: 'Login' },
              { src: '/images/middleman/dashboard.png', label: 'Dashboard' },
              { src: '/images/middleman/stock.png', label: 'Pull List' },
              { src: '/images/middleman/orders.png', label: 'Deliveries' },
              { src: '/images/middleman/order-edit.png', label: 'Order Edit' },
              { src: '/images/middleman/order-detail.png', label: 'Order Detail' },
              { src: '/images/middleman/product-detail.png', label: 'Product Detail' },
              { src: '/images/middleman/statistics.png', label: 'Statistics' },
              { src: '/images/middleman/settings.png', label: 'Settings' },
              { src: '/images/middleman/merch-notes-modal.png', label: 'Notes' },
            ].map(({ src, label }) => (
              <StaggerItem key={label}>
                <div className="text-center">
                  <ImageWithSkeleton src={src} alt={label} className="w-full" style={{ border: imgBorder }} />
                  <p className="text-xs font-bold mt-2 tracking-wider uppercase" style={{ color: secondaryTextColor }}>{label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* ── INTELLIGENCE LAYER ── */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="md" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Intelligence Layer</p>
            <p className="text-xl md:text-2xl font-bold" style={{ color: textColor }}>
              The system thinks so you don&apos;t have to
            </p>
          </TextCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <TextCard padding="md">
              <p className="text-base font-bold mb-2" style={{ color: textColor }}>Auto-Generated Orders</p>
              <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>
                POS scans trigger reorder calculations. Orders appear pre-built — merchandisers just adjust quantities before warehouse cutoff. The system does the math so you can focus on the shelves.
              </p>
            </TextCard>
            <TextCard padding="md">
              <p className="text-base font-bold mb-2" style={{ color: textColor }}>Rolling Shrinkage Detection</p>
              <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>
                Per-SKU variance tracked over rolling windows. Flagged when sustained above threshold for 7+ days — not one-off anomalies. Breakage is logged separately so the system only flags real loss.
              </p>
            </TextCard>
          </div>

          {/* Order detail */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2">
              <ImageWithSkeleton src="/images/middleman/order-detail.png" alt="Order detail — line items, case counts, delivery status" className="w-full" style={{ border: imgBorder }} />
              <TextCard padding="sm" noTilt className="mt-3">
                <p className="text-sm font-bold" style={{ color: primaryColor }}>Order Detail</p>
                <p className="text-xs mt-1" style={{ color: secondaryTextColor }}>Every line item, delivery status, and case count at a glance.</p>
              </TextCard>
            </div>
            <div className="w-full md:w-1/2">
              <TextCard padding="lg">
                <p className="text-base font-bold mb-3" style={{ color: textColor }}>Why no dollar amounts?</p>
                <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>
                  Merchandisers use this on store floors — in plain view of competitors, store staff, and customers. Showing distributor margins or unit costs would be a security risk. Every financial metric lives in back-office tools where it belongs. The merchandiser sees cases, not dollars.
                </p>
              </TextCard>
            </div>
          </div>
        </AnimateIn>

        {/* ── THE HYPOTHESIS ── */}
        <AnimateIn direction="up" className="py-16 md:py-24" style={{ borderBottom: divider }}>
          <TextCard padding="sm" className="mb-8 inline-block">
            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: primaryColor }}>The Hypothesis</p>
          </TextCard>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6" staggerDelay={0.1}>
            {[
              { icon: Clock, label: 'TIME PER STORE', value: '45 min → 15 min' },
              { icon: TrendingUp, label: 'STOCKOUTS', value: 'Down 60%' },
              { icon: ShieldCheck, label: 'SHRINKAGE', value: 'Caught in days, not weeks' },
              { icon: Zap, label: 'ORDER ACCURACY', value: 'POS-driven, not guessed' },
            ].map(({ icon: Icon, label, value }) => (
              <StaggerItem key={label}>
                <TextCard padding="lg" className="text-center">
                  <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: primaryColor }} />
                  <p className="text-xs font-bold mb-1 tracking-wider" style={{ color: secondaryTextColor }}>{label}</p>
                  <p className="text-xl md:text-2xl font-bold" style={{ color: primaryColor }}>{value}</p>
                </TextCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* ── TRADE-OFFS ── */}
        <AnimateIn direction="up" className="py-16 md:py-24">
          <TextCard padding="lg" className="mb-10">
            <p className="text-xs font-bold tracking-widest mb-3 uppercase" style={{ color: primaryColor }}>Trade-Offs</p>
            <p className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>
              Every design decision killed something else. Here&apos;s what I chose and why.
            </p>
            <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
              These aren&apos;t compromises — they&apos;re deliberate cuts. Each one came from watching merchandisers work and asking &ldquo;what actually matters in that moment?&rdquo;
            </p>
          </TextCard>

          <div className="space-y-6">
            {/* Trade-off 1 */}
            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>Stripped every dollar amount from the app</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                No unit costs, no revenue, no margin data anywhere in the UI. Merchandisers share their screens constantly — with store managers, with each other, sometimes with competitors standing right there in the aisle. Showing distributor pricing would be a genuine security problem. Financial reporting belongs in back-office tools, not on a phone in a cooler.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: primaryColor }}>KILLED: In-app financial reporting</p>
            </TextCard>

            {/* Trade-off 2 */}
            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>Pull list instead of a data table</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                The stock view could have been a sortable table with columns for every metric. Instead it&apos;s a task list — here&apos;s what&apos;s low, here&apos;s how many to pull, tap when you&apos;re done. Merchandisers don&apos;t analyze inventory. They fill shelves. The app should feel like a checklist, not a spreadsheet. Healthy products stay in a quiet list below. You only see what needs your hands.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: primaryColor }}>KILLED: Traditional sortable data table</p>
            </TextCard>

            {/* Trade-off 3 */}
            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>Time as the delivery axis, not PO numbers</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                Nobody walks into a store thinking &ldquo;I wonder about PO-47293.&rdquo; They think &ldquo;is a truck coming today?&rdquo; So the schedule page organizes by time — today&apos;s delivery is the hero with a big ETA and progress bar. Upcoming orders sit below with an edit window. Past deliveries collapse into a one-line log. The mental model matches the merchandiser&apos;s actual day, not the warehouse&apos;s filing system.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: amberColor }}>KILLED: PO-number-centric order management</p>
            </TextCard>

            {/* Trade-off 4 */}
            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>Neutral delivery status, not color-coded warnings</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                An early version used amber to indicate &ldquo;on route.&rdquo; But a delivery on its way is good news — it&apos;s not a warning. Amber means &ldquo;something needs attention&rdquo; in this system. So on-route deliveries use a neutral badge with the ETA time front and center. The traffic-light system only fires when something actually needs your intervention.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: amberColor }}>KILLED: Color-coded delivery status</p>
            </TextCard>

            {/* Trade-off 5 */}
            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>Store name always visible, not hidden in a menu</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                The store name takes up prime real estate on every single screen. That&apos;s expensive space on mobile. But merchandisers visit 6-12 stores a day and context-switching is where mistakes happen — pulling product for the wrong account, logging breakage to the wrong store. The store name is the single most important piece of context in the entire app. It earns that space.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: redColor }}>KILLED: Compact header with more content space</p>
            </TextCard>

            {/* Trade-off 6 */}
            <TextCard padding="lg">
              <p className="text-lg font-bold mb-2" style={{ color: textColor }}>Bloomberg over beauty</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: secondaryTextColor }}>
                Data density wins over polish. JetBrains Mono, sharp corners, traffic-light colors, zero shadows, no border radius anywhere. The design system was built for a cooler at 2am and a loading dock at 6am, not a pitch deck. Every pixel is information. If it doesn&apos;t tell you something actionable, it doesn&apos;t belong on the screen.
              </p>
              <p className="text-xs font-bold tracking-wider" style={{ color: redColor }}>KILLED: Visual polish, rounded corners, decorative elements</p>
            </TextCard>
          </div>
        </AnimateIn>
      </div>
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
