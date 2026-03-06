'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import { ExternalLink, ChevronDown, Bot, Gauge, TrendingUp, Shield, Check, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import ContactForm from './ContactForm';
import PricingCard from './PricingCard';

function scrollToContact() {
  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
}

export default function Services() {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);

  const [showSpecs, setShowSpecs] = useState(false);

  const glassBg = theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const glassBorder = theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
  const pillBg = theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  const pillBorder = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  const Pill = ({ children }: { children: string }) => (
    <span
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-default"
      style={{ backgroundColor: pillBg, border: `1px solid ${pillBorder}`, color: textColor }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${primaryColor}60`;
        e.currentTarget.style.backgroundColor = `${primaryColor}08`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = pillBorder;
        e.currentTarget.style.backgroundColor = pillBg;
      }}
    >
      {children}
    </span>
  );

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">
      <div className="max-w-[90rem] mx-auto">

        {/* ═══════════════════════════════════════════
            1. THE CHARACTER — Your customers are looking.
        ═══════════════════════════════════════════ */}
        <AnimateIn direction="up" className="mb-24 md:mb-32 pt-8 md:pt-16">
          <div className="w-16 h-1.5 rounded-full mb-8" style={{ backgroundColor: primaryColor }} />
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
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] cursor-pointer"
              style={{
                backgroundColor: primaryColor,
                color: accentColor === 'yellow' || accentColor === 'tan' ? '#000' : accentColor === 'bw' && theme === 'dark' ? '#000' : '#fff',
                boxShadow: `0 4px 24px ${primaryColor}30`,
              }}
            >
              Start a Project <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] cursor-pointer"
              style={{ color: textColor, border: `1px solid ${glassBorder}`, backgroundColor: glassBg }}
              onClick={(e) => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              See Pricing
            </a>
          </div>
        </AnimateIn>

        {/* ═══════════════════════════════════════════
            2. THE PROBLEM — What's holding you back.
        ═══════════════════════════════════════════ */}
        <AnimateIn direction="up" className="mb-24 md:mb-32 max-w-3xl">
          <h2 className="text-[28px] md:text-[44px] mb-6 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
            The Problem
          </h2>
          <div className="space-y-6">
            {[
              { bold: 'Slow, bloated templates', rest: 'that tank your Google ranking before a customer ever sees the page.' },
              { bold: '30 plugins and a prayer', rest: '— every update is a chance for something to break. Or get hacked.' },
              { bold: 'Invisible to AI', rest: '— ChatGPT, Siri, and Google\'s AI overviews can\'t read your site because it wasn\'t built for them.' },
            ].map(({ bold, rest }, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed" style={{ color: secondaryTextColor }}>
                <span style={{ color: textColor, fontWeight: 700 }}>{bold}</span> {rest}
              </p>
            ))}
          </div>
        </AnimateIn>

        {/* ═══════════════════════════════════════════
            3. THE GUIDE — What you actually get.
        ═══════════════════════════════════════════ */}
        <AnimateIn direction="up" className="mb-24 md:mb-32">
          <h2 className="text-[28px] md:text-[44px] mb-3 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
            Every Site Includes
          </h2>
          <p className="text-base mb-8" style={{ color: secondaryTextColor }}>
            Not extras. Not add-ons. Standard on every build.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {['Custom Design', 'Photo Shoot', 'Mobile Responsive', 'AI-Powered SEO', 'Google Analytics', 'llms.txt', 'Structured Data', 'FAQ Schema', 'Sitemap', '90+ Lighthouse', 'SSL + CDN'].map((tag) => (
              <Pill key={tag}>{tag}</Pill>
            ))}
          </div>

          {/* Expand for specs */}
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
            style={{ color: primaryColor, border: `1px solid ${primaryColor}40` }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${primaryColor}10`; e.currentTarget.style.borderColor = primaryColor; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = `${primaryColor}40`; }}
          >
            {showSpecs ? 'Less detail' : 'What does that actually mean?'}
            <ChevronDown className="w-4 h-4 transition-transform duration-300" style={{ transform: showSpecs ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>

          <AnimatePresence>
            {showSpecs && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                {/* Technical detail cards */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-8" staggerDelay={0.1}>
                  {[
                    { icon: Bot, title: 'AI & Crawlability', points: ['llms.txt — LLM-readable manifest', 'JSON-LD FaqPage + LocalBusiness', 'PWA manifest.json', 'robots.txt + XML sitemap'] },
                    { icon: Gauge, title: 'Performance', points: ['Next.js SSR + static gen', 'WebP / AVIF with srcset', 'Lazy loading via Intersection Observer', '90+ Lighthouse, LCP/CLS/INP tuned'] },
                    { icon: TrendingUp, title: 'SEO & Analytics', points: ['GA4 + gtag.js', 'Open Graph + Twitter Card meta', 'Canonical URLs', 'SSR meta + Search Console ready'] },
                    { icon: Shield, title: 'Infrastructure', points: ['TypeScript + React 19', 'Tailwind CSS + Vercel CDN', 'HTTPS / TLS by default', 'WCAG 2.1 AA markup'] },
                  ].map(({ icon: Icon, title, points }) => (
                    <StaggerItem key={title}>
                      <div className="rounded-xl p-5 h-full relative overflow-hidden" style={{ backgroundColor: glassBg, border: `1px solid ${glassBorder}` }}>
                        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }} />
                        <Icon className="w-7 h-7 mb-4" style={{ color: primaryColor }} />
                        <h3 className="text-base font-bold mb-3" style={{ color: textColor }}>{title}</h3>
                        <div className="space-y-2">
                          {points.map((p) => (
                            <div key={p} className="flex items-start gap-2">
                              <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                              <p className="text-[13px] leading-relaxed" style={{ color: secondaryTextColor }}>{p}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                {/* Your site vs WordPress */}
                <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${glassBorder}` }}>
                  <h3 className="text-lg font-bold mb-6" style={{ color: textColor }}>Your site vs. WordPress</h3>
                  <div className="space-y-3">
                    {[
                      { mine: 'Pre-rendered pages on a global CDN.', wp: 'Queries MySQL on every page load.' },
                      { mine: 'AI reads your llms.txt + structured data.', wp: 'No llms.txt. Needs a plugin most skip.' },
                      { mine: 'Images auto-optimized per device.', wp: 'Serves original uploads unoptimized.' },
                      { mine: 'Zero plugins. One compiled codebase.', wp: '20-30 plugins. Each a security risk.' },
                      { mine: 'No login page. Nothing to hack.', wp: '/wp-admin exposed by default.' },
                    ].map((item, i) => (
                      <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}06`, border: `1px solid ${primaryColor}15` }}>
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} strokeWidth={3} />
                          <p className="text-sm leading-relaxed" style={{ color: textColor }}>{item.mine}</p>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)', border: `1px solid ${glassBorder}` }}>
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: theme === 'dark' ? '#666' : '#999' }} strokeWidth={3} />
                          <p className="text-sm leading-relaxed" style={{ color: secondaryTextColor }}>{item.wp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimateIn>

        {/* ═══════════════════════════════════════════
            4. THE PLAN — Three steps.
        ═══════════════════════════════════════════ */}
        <AnimateIn direction="up" className="mb-24 md:mb-32 max-w-3xl">
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
        </AnimateIn>

        {/* ═══════════════════════════════════════════
            5. THE CALL TO ACTION — Pricing.
        ═══════════════════════════════════════════ */}
        <AnimateIn direction="up" id="pricing" className="mb-24 md:mb-32">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[44px] mb-3 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
              Pricing
            </h2>
            <p className="text-base" style={{ color: secondaryTextColor }}>Everything above included. One-time build. Yours to own.</p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.1}>
            <StaggerItem>
              <PricingCard name="STARTER" price="$1,000" subtitle="Up to 5 pages. Perfect for small service businesses."
                features={[{ label: 'Up to 5 pages' }, { label: 'All standard features included' }]}
                primaryColor={primaryColor} textColor={textColor} secondaryTextColor={secondaryTextColor} theme={theme} onCtaClick={scrollToContact} />
            </StaggerItem>
            <StaggerItem>
              <PricingCard name="PROFESSIONAL" price="$2,000" subtitle="Up to 12 pages. Built to convert walk-in traffic." featured
                features={[{ label: 'Up to 12 pages' }, { label: 'CMS for self-editing' }, { label: 'AI chatbot' }, { label: 'Blog section' }, { label: 'Content strategy' }]}
                primaryColor={primaryColor} textColor={textColor} secondaryTextColor={secondaryTextColor} theme={theme} onCtaClick={scrollToContact} />
            </StaggerItem>
            <StaggerItem>
              <PricingCard name="CUSTOM" price="$3,000" subtitle="Unlimited pages. E-commerce, ads, and integrations."
                features={[{ label: 'Unlimited pages' }, { label: 'E-commerce or booking' }, { label: 'Third-party integrations' }, { label: 'Optional: AI chatbot' }, { label: 'Optional: AI email marketing' }, { label: 'Optional: Meta ads setup' }]}
                primaryColor={primaryColor} textColor={textColor} secondaryTextColor={secondaryTextColor} theme={theme} onCtaClick={scrollToContact} />
            </StaggerItem>
          </StaggerContainer>
        </AnimateIn>

        {/* ─── Ongoing Support ─── */}
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
                features={[{ label: 'Managed hosting + SSL' }, { label: 'Monthly backups' }, { label: 'Uptime monitoring' }, { label: 'Bug fixes + patches' }]}
                primaryColor={primaryColor} textColor={textColor} secondaryTextColor={secondaryTextColor} theme={theme} onCtaClick={scrollToContact} />
            </StaggerItem>
            <StaggerItem>
              <PricingCard name="MARKETING" price="$500" periodLabel="/mo" subtitle="Ads, analytics, and strategy."
                features={[{ label: 'Google + Meta ad management' }, { label: 'Campaign strategy' }, { label: 'Monthly performance reports' }, { label: 'Conversion tracking' }]}
                primaryColor={primaryColor} textColor={textColor} secondaryTextColor={secondaryTextColor} theme={theme} onCtaClick={scrollToContact} />
            </StaggerItem>
          </StaggerContainer>
        </AnimateIn>

        {/* ═══════════════════════════════════════════
            6. SUCCESS — The result.
        ═══════════════════════════════════════════ */}
        <AnimateIn direction="up" className="mb-24 md:mb-32 max-w-3xl">
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
                <div className="w-2 h-2 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: primaryColor }} />
                <p className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>{line}</p>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* ─── Credibility: Featured Work + Tech ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 md:mb-32">
          <AnimateIn direction="left">
            <h3 className="text-[22px] md:text-[28px] mb-6 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
              Featured Work
            </h3>
            <a href="https://techxrev.com" target="_blank" rel="noopener noreferrer"
              className="block rounded-xl p-6 transition-all duration-300 cursor-pointer"
              style={{ backgroundColor: glassBg, border: `1px solid ${glassBorder}` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${primaryColor}40`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = glassBorder; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: primaryColor }}>Client Project</p>
              <h4 className="text-xl font-bold mb-2" style={{ color: textColor }}>TechxRev</h4>
              <p className="text-sm leading-relaxed mb-4" style={{ color: secondaryTextColor }}>Custom site for an IT services company. Design, development, SEO, analytics.</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: primaryColor }}>
                Visit Site <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          </AnimateIn>

          <AnimateIn direction="right">
            <h3 className="text-[22px] md:text-[28px] mb-6 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
              Tech I Work With
            </h3>
            <div className="space-y-5">
              {[
                { cat: 'Web', items: ['Next.js', 'React', 'Astro', 'Vue', 'Nuxt', 'Svelte'] },
                { cat: 'Mobile', items: ['React Native', 'SwiftUI', 'Flutter', 'Jetpack Compose'] },
                { cat: 'Design', items: ['Tailwind CSS', 'shadcn/ui', 'Remotion', 'Framer Motion'] },
                { cat: 'Infra', items: ['TypeScript', 'Vercel', 'GA4'] },
              ].map(({ cat, items }) => (
                <div key={cat}>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] mb-2" style={{ color: primaryColor }}>{cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((t) => <Pill key={t}>{t}</Pill>)}
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>

        {/* ─── Service Areas ─── */}
        <AnimateIn direction="up" className="mb-24 md:mb-32">
          <h2 className="text-[28px] md:text-[44px] mb-4 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
            Service Areas
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {['Erie, PA', 'Millcreek', 'Harborcreek', 'Fairview', 'Edinboro', 'Meadville', 'Corry', 'North East', 'Girard', 'Waterford', 'Warren', 'Northwestern PA', 'Remote / Nationwide'].map((a) => (
              <Pill key={a}>{a}</Pill>
            ))}
          </div>
        </AnimateIn>

        {/* ═══════════════════════════════════════════
            7. FINAL CTA — Let's go.
        ═══════════════════════════════════════════ */}
        <AnimateIn direction="up" id="contact-form" className="mb-12 md:mb-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-12 h-1.5 rounded-full mx-auto mb-8" style={{ backgroundColor: primaryColor }} />
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
      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
