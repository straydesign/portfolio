'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { ExternalLink, ArrowRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import ContactForm from './ContactForm';
import PricingCard from './PricingCard';
import TextCard from './TextCard';

function scrollToContact() {
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
}

type Feature = { label: string; desc: string };
type Category = { name: string; features: Feature[] };

const CATEGORIES: Category[] = [
  {
    name: 'Design',
    features: [
      { label: 'Custom Design', desc: 'Every site designed from scratch in Figma. No templates, no themes.' },
      { label: 'Photo Shoot', desc: 'Professional photography included. Your actual business, not stock photos.' },
      { label: 'Mobile Responsive', desc: 'Looks and works perfectly on every screen size — phone, tablet, desktop.' },
      { label: 'Tailwind CSS', desc: 'Utility-first CSS framework. Clean, performant styling with zero bloat.' },
      { label: 'shadcn/ui', desc: 'Modern component library. Accessible, themeable, production-ready UI.' },
      { label: 'Remotion', desc: 'Programmatic video generation in React. Motion graphics, product demos, social content.' },
      { label: 'Framer Motion', desc: 'Production animation library. Smooth page transitions, scroll reveals, micro-interactions.' },
    ],
  },
  {
    name: 'AI & SEO',
    features: [
      { label: 'AI-Powered SEO', desc: 'Built so AI assistants like ChatGPT and Google AI can read and recommend your business.' },
      { label: 'llms.txt', desc: 'A machine-readable manifest that tells AI models exactly what your business does.' },
      { label: 'JSON-LD Structured Data', desc: 'Schema markup that helps Google understand your business type, services, and location.' },
      { label: 'FAQ Schema', desc: 'Your FAQs appear directly in Google search results as rich snippets.' },
      { label: 'Sitemap + Robots.txt', desc: 'Tells search engines exactly which pages to index and how to crawl your site.' },
      { label: 'Open Graph Meta', desc: 'Your site looks great when shared on Facebook, Twitter, LinkedIn, and iMessage.' },
      { label: 'Canonical URLs', desc: 'Prevents duplicate content issues. Every page has one authoritative URL.' },
      { label: 'Search Console Ready', desc: 'Pre-configured for Google Search Console. Monitor impressions, clicks, and ranking.' },
    ],
  },
  {
    name: 'Performance',
    features: [
      { label: '90+ Lighthouse', desc: 'Scores 90+ across all Google Lighthouse audits — performance, accessibility, SEO, best practices.' },
      { label: 'SSR + Static Generation', desc: 'Pages pre-rendered at build time. No database queries. Instant load times.' },
      { label: 'WebP / AVIF Images', desc: 'Images auto-converted to modern formats and sized per device. Faster loads, less bandwidth.' },
      { label: 'Lazy Loading', desc: 'Images and content load only when scrolled into view via Intersection Observer.' },
      { label: 'Core Web Vitals', desc: 'LCP, CLS, and INP optimized. The three metrics Google uses to rank page experience.' },
    ],
  },
  {
    name: 'Analytics',
    features: [
      { label: 'Google Analytics 4', desc: 'Full GA4 setup with event tracking. See exactly how visitors find and use your site.' },
      { label: 'Conversion Tracking', desc: 'Track form submissions, phone calls, and purchases. Know what\'s working.' },
      { label: 'GA4 + gtag.js', desc: 'Lightweight analytics script. No heavy plugins. Direct Google integration.' },
    ],
  },
  {
    name: 'Infrastructure',
    features: [
      { label: 'SSL / HTTPS', desc: 'Encrypted by default. Secure connection for every visitor. Required for Google ranking.' },
      { label: 'Vercel Edge CDN', desc: 'Deployed to a global content delivery network. Fast load times worldwide.' },
      { label: '24/7 Error Monitoring', desc: 'Sentry watches your site around the clock. If something breaks, I know before your customers do.' },
      { label: 'Automatic Bug Fixes', desc: 'When an error is detected, AI diagnoses the issue and creates a fix automatically. Most bugs resolved without you lifting a finger.' },
      { label: 'WCAG 2.1 AA', desc: 'Accessible markup. Screen readers, keyboard navigation, proper contrast ratios.' },
      { label: 'PWA Manifest', desc: 'Your site can be installed like an app on phones. Adds to home screen with your icon.' },
      { label: 'TypeScript', desc: 'Type-safe code. Catches bugs before they reach production. Industry standard.' },
      { label: 'React 19', desc: 'Latest version of the most popular UI framework. Fast, maintainable, future-proof.' },
    ],
  },
  {
    name: 'Web',
    features: [
      { label: 'Next.js', desc: 'React framework with SSR, routing, and image optimization built in. Powers most of what I build.' },
      { label: 'React', desc: 'Component-based UI library used by Meta, Netflix, Airbnb. The foundation of modern web.' },
      { label: 'Astro', desc: 'Ships zero JavaScript by default. Perfect for content-heavy, blazing-fast marketing sites.' },
      { label: 'Vue', desc: 'Progressive framework with a gentle learning curve. Great for interactive dashboards.' },
      { label: 'Nuxt', desc: 'Vue\'s answer to Next.js. Server rendering, auto-routing, and SEO out of the box.' },
      { label: 'Svelte', desc: 'Compiles to vanilla JS at build time. No virtual DOM. Smallest bundle sizes possible.' },
    ],
  },
  {
    name: 'Mobile',
    features: [
      { label: 'React Native', desc: 'Build iOS and Android apps from one codebase. Native performance, shared logic.' },
      { label: 'SwiftUI', desc: 'Apple\'s native framework for iOS and macOS. The smoothest, most polished Apple experience.' },
      { label: 'Flutter', desc: 'Google\'s cross-platform toolkit. One codebase for iOS, Android, web, and desktop.' },
      { label: 'Jetpack Compose', desc: 'Android\'s modern UI toolkit. Declarative, reactive, built for Kotlin.' },
    ],
  },
];

function FeatureBadges() {
  const primaryColor = '#ffffff';
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';

  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const pillBg = 'rgba(255,255,255,0.04)';
  const pillBorder = 'rgba(255,255,255,0.08)';
  const glassBorder = 'rgba(255,255,255,0.06)';

  const updateIndicator = useCallback(() => {
    const tab = tabsRef.current[activeCategory];
    if (tab) {
      const parent = tab.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const tabRect = tab.getBoundingClientRect();
        setIndicatorStyle({
          left: tabRect.left - parentRect.left,
          width: tabRect.width,
        });
      }
    }
  }, [activeCategory]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const handleCategoryChange = (index: number) => {
    setActiveCategory(index);
    setSelectedFeature(null);
  };

  const handleBadgeClick = (feature: Feature) => {
    setSelectedFeature(selectedFeature?.label === feature.label ? null : feature);
  };

  return (
    <div>
      {/* Category tabs with sliding indicator */}
      <div className="relative mb-8">
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide relative" style={{ borderBottom: `1px solid ${glassBorder}` }}>
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              ref={(el) => { tabsRef.current[i] = el; }}
              onClick={() => handleCategoryChange(i)}
              className="px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-200 relative cursor-pointer"
              style={{
                color: activeCategory === i ? primaryColor : secondaryTextColor,
              }}
            >
              {cat.name}
            </button>
          ))}

          {/* Sliding indicator */}
          <motion.div
            className="absolute bottom-0 h-[2px]"
            style={{ backgroundColor: primaryColor, borderRadius: 0 }}
            animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        </div>
      </div>

      {/* Hint */}
      <p className="flex items-center gap-1.5 text-xs mb-4" style={{ color: secondaryTextColor }}>
        <Info className="w-3.5 h-3.5" style={{ color: primaryColor }} />
        Tap any badge to learn more
      </p>

      {/* Badges grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap gap-2.5"
        >
          {CATEGORIES[activeCategory].features.map((feature) => {
            const isSelected = selectedFeature?.label === feature.label;
            return (
              <button
                key={feature.label}
                onClick={() => handleBadgeClick(feature)}
                className="px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer"
                style={{
                  borderRadius: 0,
                  backgroundColor: isSelected ? '#111111' : pillBg,
                  border: `1px solid ${isSelected ? primaryColor : pillBorder}`,
                  color: isSelected ? primaryColor : textColor,
                  boxShadow: isSelected ? `0 0 12px rgba(255,255,255,0.08)` : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = pillBorder;
                    e.currentTarget.style.backgroundColor = pillBg;
                  }
                }}
              >
                {feature.label}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Explanation panel */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            key={selectedFeature.label}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div
              className="p-5 relative"
              style={{
                borderRadius: 0,
                backgroundColor: '#000000',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #ffffff, transparent)' }} />
              <p className="text-sm font-bold mb-1" style={{ color: primaryColor }}>{selectedFeature.label}</p>
              <p className="text-sm leading-relaxed" style={{ color: textColor }}>{selectedFeature.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Services() {
  const primaryColor = '#ffffff';
  const textColor = '#ffffff';
  const secondaryTextColor = '#a1a1a6';

  const glassBg = '#000000';
  const glassBorder = 'rgba(255,255,255,0.06)';

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">
      <div className="max-w-[90rem] mx-auto">

        {/* 1. HERO */}
        <AnimateIn direction="up" className="mb-24 md:mb-32 pt-8 md:pt-16">
          <div className="w-16 h-1.5 mb-8" style={{ backgroundColor: primaryColor, borderRadius: 0 }} />
          <p className="text-sm font-bold uppercase tracking-[0.2em] mb-6" style={{ color: primaryColor }}>
            Erie, PA &bull; Web Design &amp; Development
          </p>
          <h1
            className="text-[44px] sm:text-[56px] md:text-[72px] lg:text-[88px] leading-[0.95] tracking-tight font-black mb-6"
            style={{ color: textColor }}
          >
            Your customers are
            <br />
            looking for you<span style={{ color: primaryColor }}>.</span>
          </h1>
          <p className="text-[18px] md:text-[22px] max-w-xl leading-relaxed mb-10" style={{ color: secondaryTextColor }}>
            If they can&apos;t find you online &mdash; or your site looks like it was built in 2015 &mdash; they&apos;ll find someone else.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] cursor-pointer"
              style={{
                borderRadius: 0,
                backgroundColor: '#ffffff',
                color: '#000000',
              }}
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] cursor-pointer"
              style={{ borderRadius: 0, color: textColor, border: `1px solid ${glassBorder}`, backgroundColor: glassBg }}
              onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              See Pricing
            </a>
          </div>
        </AnimateIn>

        {/* 2. THE GUIDE -- Interactive badge explorer */}
        <AnimateIn direction="up" className="mb-24 md:mb-32">
          <TextCard padding="lg">
            <h2 className="text-[28px] md:text-[44px] mb-3 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
              What You Get
            </h2>
            <p className="text-base mb-8" style={{ color: secondaryTextColor }}>
              Every feature, every framework, every tool — included or available.
            </p>

            <FeatureBadges />
          </TextCard>
        </AnimateIn>

        {/* 4. THE PLAN */}
        <AnimateIn direction="up" className="mb-24 md:mb-32 max-w-3xl">
          <TextCard padding="lg">
            <h2 className="text-[28px] md:text-[44px] mb-8 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
              How It Works
            </h2>
            <div className="space-y-8">
              {[
                { num: '01', title: 'We talk.', desc: 'Free consultation. You tell me about your business, your goals, and what\'s not working. I\'ll tell you exactly what I\'d build and why.' },
                { num: '02', title: 'I build it.', desc: 'Custom design, development, photo shoot, SEO, analytics — the whole thing. You get updates along the way. Typical turnaround is 2-4 weeks.' },
                { num: '03', title: 'You launch.', desc: 'Your site goes live. Customers find you. AI assistants recommend you. You look like the professional you are.' },
              ].map(({ num, title, desc }) => (
                <div key={num} className="flex gap-6 items-start">
                  <span
                    className="text-[32px] md:text-[40px] font-black leading-none shrink-0 w-16 text-right"
                    style={{ color: primaryColor, fontFamily: 'var(--font-family-bungee), sans-serif', opacity: 0.3 }}
                  >
                    {num}
                  </span>
                  <div className="pt-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: textColor }}>{title}</h3>
                    <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </TextCard>
        </AnimateIn>

        {/* 5. PRICING */}
        <AnimateIn direction="up" id="pricing" className="mb-24 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[44px] mb-3 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
              Pricing
            </h2>
            <p className="text-base mb-2" style={{ color: secondaryTextColor }}>Most Erie agencies charge $5,000–$15,000 for a custom website. I keep overhead low and pass the savings to you.</p>
            <p className="text-base mb-2" style={{ color: secondaryTextColor }}>Everything above included. One-time build. Yours to own.</p>
            <p className="text-sm font-bold" style={{ color: primaryColor }}>Unlimited revisions until you love it.</p>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.1}>
            <StaggerItem>
              <PricingCard name="STARTER" price="$997" subtitle="Up to 5 pages. Perfect for small service businesses."
                features={[{ label: 'Up to 5 pages' }, { label: 'All standard features included' }]}
                onCtaClick={scrollToContact} />
            </StaggerItem>
            <StaggerItem>
              <PricingCard name="PROFESSIONAL" price="$1,997" subtitle="Up to 12 pages. Built to convert walk-in traffic." featured
                features={[{ label: 'Up to 12 pages' }, { label: 'CMS for self-editing' }, { label: 'AI chatbot' }, { label: 'Blog section' }, { label: 'Content strategy' }]}
                onCtaClick={scrollToContact} />
            </StaggerItem>
            <StaggerItem>
              <PricingCard name="CUSTOM" price="$2,997" subtitle="Unlimited pages. E-commerce, ads, and integrations."
                features={[{ label: 'Unlimited pages' }, { label: 'E-commerce or booking' }, { label: 'Third-party integrations' }, { label: 'Optional: AI chatbot' }, { label: 'Optional: AI email marketing' }, { label: 'Optional: Meta ads setup' }]}
                onCtaClick={scrollToContact} />
            </StaggerItem>
          </StaggerContainer>
        </AnimateIn>

        {/* Ongoing Support */}
        <AnimateIn direction="up" className="mb-24 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[44px] mb-3 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
              Ongoing Support
            </h2>
            <p className="text-base" style={{ color: secondaryTextColor }}>Cancel anytime.</p>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto" staggerDelay={0.12}>
            <StaggerItem>
              <PricingCard name="HOSTING & MAINTENANCE" price="$50" periodLabel="/mo" subtitle="Hosting, SSL, backups, monitoring, bug fixes."
                features={[{ label: 'Managed hosting + SSL' }, { label: 'Monthly backups' }, { label: '24/7 error monitoring' }, { label: 'Automatic bug fixes' }, { label: 'Uptime monitoring' }]}
                onCtaClick={scrollToContact} />
            </StaggerItem>
            <StaggerItem>
              <PricingCard name="MARKETING" price="$497" periodLabel="/mo" subtitle="Ads, analytics, and strategy."
                features={[{ label: 'Google + Meta ad management' }, { label: 'Campaign strategy' }, { label: 'Monthly performance reports' }, { label: 'Conversion tracking' }]}
                onCtaClick={scrollToContact} />
            </StaggerItem>
          </StaggerContainer>
        </AnimateIn>

        {/* 6. SUCCESS */}
        <AnimateIn direction="up" className="mb-24 md:mb-32 max-w-3xl">
          <TextCard padding="lg">
            <h2 className="text-[28px] md:text-[44px] mb-8 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
              What Changes
            </h2>
            <div className="space-y-5">
              {[
                'Customers Google your industry + city. You show up.',
                'Someone asks ChatGPT for a recommendation. Your site is readable.',
                'A visitor lands on your page. It loads instantly. It looks like you take your business seriously.',
                'You stop paying for a site that works against you.',
              ].map((line, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2.5 shrink-0" style={{ backgroundColor: primaryColor, borderRadius: 0 }} />
                  <p className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>{line}</p>
                </div>
              ))}
            </div>
          </TextCard>
        </AnimateIn>

        {/* Featured Work */}
        <AnimateIn direction="up" className="mb-24 md:mb-32">
          <h2 className="text-[28px] md:text-[44px] mb-8 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
            Featured Work
          </h2>
          <a href="https://techxrev-rebuild.vercel.app" target="_blank" rel="noopener noreferrer"
            className="block p-6 md:p-8 transition-all duration-300 cursor-pointer max-w-2xl"
            style={{ borderRadius: 0, backgroundColor: '#000000', border: `1px solid ${glassBorder}` }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,255,255,0.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = glassBorder; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: primaryColor }}>Client Project</p>
            <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: textColor }}>TechxRev</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: secondaryTextColor }}>Custom site for an IT services company. Design, development, SEO, analytics.</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: primaryColor }}>
              Visit Site <ExternalLink className="w-4 h-4" />
            </span>
          </a>
        </AnimateIn>

        {/* Service Areas */}
        <AnimateIn direction="up" className="mb-24 md:mb-32">
          <h2 className="text-[28px] md:text-[44px] mb-4 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
            Service Areas
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {['Erie, PA', 'Millcreek', 'Harborcreek', 'Fairview', 'Edinboro', 'Meadville', 'Corry', 'North East', 'Girard', 'Waterford', 'Warren', 'Northwestern PA', 'Remote / Nationwide'].map((a) => (
              <span
                key={a}
                className="px-4 py-2 text-sm font-medium"
                style={{ borderRadius: 0, backgroundColor: '#111111', border: '1px solid rgba(255,255,255,0.08)', color: textColor }}
              >
                {a}
              </span>
            ))}
          </div>
        </AnimateIn>

        {/* FAQ */}
        <AnimateIn direction="up" className="mb-24 md:mb-32 max-w-3xl">
          <TextCard padding="lg">
            <h2 className="text-[28px] md:text-[44px] mb-8 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
              FAQ
            </h2>
            <div className="space-y-6">
              {[
                { q: 'I already have a website. Why would I pay for a new one?', a: 'If your current site isn\'t bringing in customers, it\'s costing you money. A modern site built for search engines and AI assistants pays for itself.' },
                { q: 'Can\'t I just use Wix or Squarespace?', a: 'You can — but you\'ll get a template that looks like everyone else, loads slowly, and ranks poorly. A custom site is built around your business, not a drag-and-drop editor.' },
                { q: 'What if I need changes after the site launches?', a: 'That\'s what the $50/mo maintenance plan is for. Bug fixes, content updates, and monitoring — all included.' },
                { q: 'How long does it take?', a: 'Most projects launch in 2–4 weeks. Complex builds with e-commerce or integrations may take longer.' },
                { q: 'What if I don\'t like the design?', a: 'Unlimited revisions until you love it. I don\'t ship anything you\'re not happy with.' },
              ].map(({ q, a }) => (
                <div key={q}>
                  <h3 className="text-base font-bold mb-1" style={{ color: textColor }}>{q}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>{a}</p>
                </div>
              ))}
            </div>
          </TextCard>
        </AnimateIn>

        {/* 7. FINAL CTA */}
        <AnimateIn direction="up" id="contact-form" className="mb-12 md:mb-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-12 h-1.5 mx-auto mb-8" style={{ backgroundColor: primaryColor, borderRadius: 0 }} />
            <h2 className="text-[32px] md:text-[48px] leading-none tracking-wider font-black mb-4"
              style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: primaryColor }}>
              LET&apos;S BUILD
              <br />
              YOUR SITE.
            </h2>
            <p className="text-base mb-10" style={{ color: secondaryTextColor }}>
              Free consultation. I&apos;ll get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>
        </AnimateIn>

      </div>
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
