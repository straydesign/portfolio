'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import { ExternalLink, ChevronDown, Bot, Gauge, TrendingUp, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import ContactForm from './ContactForm';
import PricingCard from './PricingCard';

export default function Services() {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);

  const [showTechnical, setShowTechnical] = useState(false);
  const statBg = theme === 'dark' ? '#000000' : 'rgba(0, 0, 0, 0.03)';
  const divider = `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`;

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">
      <div className="max-w-[90rem] mx-auto">

        {/* ─── HERO ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pt-4 md:pt-8">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
            Erie, PA &bull; Web Design &amp; Development
          </p>
          <h1 className="text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] tracking-tight font-black mb-4 md:mb-6"
            style={{ color: textColor }}>
            Not a WordPress site.
          </h1>
          <p className="text-[20px] md:text-[24px] mb-6" style={{ color: primaryColor, fontWeight: 600 }}>
            Custom-built. AI-optimized. Engineered to rank.
          </p>
        </AnimateIn>

        {/* ─── WHAT SHIPS WITH EVERY SITE ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-[28px] md:text-[44px] mb-4 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
            What Ships With Every Site
          </h2>

          <div className="flex flex-wrap gap-3 mb-6">
            {['Custom Design', 'Photo Shoot', 'Mobile Responsive', 'AI-Powered SEO', 'Google Analytics 4', 'llms.txt', 'JSON-LD Structured Data', 'FAQ Schema', 'Sitemap + Robots.txt', 'PWA Manifest', '90+ Lighthouse'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: statBg, color: textColor }}>
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{ backgroundColor: primaryColor, color: accentColor === 'yellow' || accentColor === 'tan' ? '#000000' : accentColor === 'bw' && theme === 'dark' ? '#000000' : '#ffffff' }}
          >
            {showTechnical ? 'Hide Details' : "Let's Get Technical"}
            <ChevronDown
              className="w-4 h-4 transition-transform duration-300"
              style={{ transform: showTechnical ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          <AnimatePresence>
            {showTechnical && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-8" staggerDelay={0.12}>
                  {[
                    {
                      icon: Bot,
                      title: 'AI & Crawlability',
                      points: ['llms.txt — LLM-readable site manifest', 'JSON-LD FaqPage schema', 'JSON-LD LocalBusiness + Service data', 'manifest.json — PWA install prompt', 'robots.txt + XML sitemap'],
                    },
                    {
                      icon: Gauge,
                      title: 'Performance',
                      points: ['Next.js SSR + static generation', 'WebP / AVIF with srcset', 'Intersection Observer lazy loading', '90+ Lighthouse across all audits', 'LCP, CLS, INP optimized'],
                    },
                    {
                      icon: TrendingUp,
                      title: 'SEO & Analytics',
                      points: ['GA4 + gtag.js', 'Open Graph + Twitter Card meta', 'Canonical URLs', 'SSR <title> + meta description', 'Search Console ready'],
                    },
                    {
                      icon: Shield,
                      title: 'Infrastructure',
                      points: ['TypeScript + React 19', 'Tailwind CSS', 'Vercel edge CDN', 'HTTPS / TLS default', 'WCAG 2.1 AA markup'],
                    },
                  ].map(({ icon: Icon, title, points }) => (
                    <StaggerItem key={title}>
                      <div>
                        <Icon className="w-8 h-8 mb-4" style={{ color: primaryColor }} />
                        <h3 className="text-lg font-bold mb-3" style={{ color: textColor }}>{title}</h3>
                        <div className="space-y-2">
                          {points.map((point) => (
                            <div key={point} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                              <p className="text-sm" style={{ color: secondaryTextColor }}>{point}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                {/* ─── What This Means vs WordPress ─── */}
                <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` }}>
                  <h3 className="text-lg font-bold mb-4" style={{ color: textColor }}>
                    What this means vs. WordPress
                  </h3>
                  <div className="space-y-4 max-w-3xl">
                    {[
                      { mine: 'Pre-rendered pages served from a global CDN. No database query per visit.', wp: 'WordPress queries MySQL on every page load. Slow without caching plugins.' },
                      { mine: 'AI assistants read your llms.txt and structured data directly.', wp: 'No llms.txt. Structured data needs a plugin — most skip it or misconfigure it.' },
                      { mine: 'Images auto-converted to WebP/AVIF at the right size per device.', wp: 'Serves original uploads unless you add an optimization plugin.' },
                      { mine: 'Zero plugins. Single compiled codebase. Nothing to update or break.', wp: 'Average site runs 20–30 plugins. Each one is a security risk and maintenance burden.' },
                      { mine: 'No login page. No admin panel. Static files on a CDN — nothing to hack.', wp: '/wp-admin exposed by default. Most targeted CMS on the internet.' },
                    ].map((item, i) => (
                      <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' }}>
                          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>Your site</p>
                          <p className="text-sm leading-relaxed" style={{ color: textColor }}>{item.mine}</p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)' }}>
                          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: secondaryTextColor }}>WordPress</p>
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

        {/* ─── PRICING ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-[28px] md:text-[44px] mb-2 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
            Pricing
          </h2>
          <p className="text-base mb-8" style={{ color: secondaryTextColor }}>Everything above included. One-time build. Yours to own.</p>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            <StaggerItem>
              <PricingCard
                name="STARTER"
                price="$1,000"
                subtitle="Up to 5 pages. Perfect for small service businesses."
                features={[
                  { label: 'Up to 5 pages' },
                  { label: 'All standard features included' },
                ]}
                primaryColor={primaryColor}
                textColor={textColor}
                secondaryTextColor={secondaryTextColor}
                theme={theme}
              />
            </StaggerItem>
            <StaggerItem>
              <PricingCard
                name="PROFESSIONAL"
                price="$2,000"
                subtitle="Up to 12 pages. Built to convert walk-in traffic."
                featured
                features={[
                  { label: 'Up to 12 pages' },
                  { label: 'CMS for self-editing' },
                  { label: 'AI chatbot' },
                  { label: 'Blog section' },
                  { label: 'Content strategy' },
                ]}
                primaryColor={primaryColor}
                textColor={textColor}
                secondaryTextColor={secondaryTextColor}
                theme={theme}
              />
            </StaggerItem>
            <StaggerItem>
              <PricingCard
                name="CUSTOM"
                price="$3,000"
                subtitle="Unlimited pages. E-commerce, ads, and integrations."
                features={[
                  { label: 'Unlimited pages' },
                  { label: 'E-commerce or booking' },
                  { label: 'Third-party integrations' },
                  { label: 'Optional: AI chatbot' },
                  { label: 'Optional: AI email marketing' },
                  { label: 'Optional: Meta ads setup' },
                ]}
                primaryColor={primaryColor}
                textColor={textColor}
                secondaryTextColor={secondaryTextColor}
                theme={theme}
              />
            </StaggerItem>
          </StaggerContainer>
        </AnimateIn>

        {/* ─── ONGOING SUPPORT ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-[28px] md:text-[44px] mb-2 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
            Ongoing Support
          </h2>
          <p className="text-base mb-8" style={{ color: secondaryTextColor }}>Cancel anytime.</p>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.12}>
            <StaggerItem>
              <PricingCard
                name="HOSTING & MAINTENANCE"
                price="$50"
                periodLabel="/mo"
                subtitle="Hosting, SSL, backups, monitoring, bug fixes."
                features={[
                  { label: 'Managed hosting + SSL' },
                  { label: 'Monthly backups' },
                  { label: 'Uptime monitoring' },
                  { label: 'Bug fixes + patches' },
                ]}
                primaryColor={primaryColor}
                textColor={textColor}
                secondaryTextColor={secondaryTextColor}
                theme={theme}
              />
            </StaggerItem>
            <StaggerItem>
              <PricingCard
                name="MARKETING"
                price="$500"
                periodLabel="/mo"
                subtitle="Ads, analytics, and strategy."
                features={[
                  { label: 'Google + Meta ad management' },
                  { label: 'Campaign strategy' },
                  { label: 'Monthly performance reports' },
                  { label: 'Conversion tracking' },
                ]}
                primaryColor={primaryColor}
                textColor={textColor}
                secondaryTextColor={secondaryTextColor}
                theme={theme}
              />
            </StaggerItem>
          </StaggerContainer>
        </AnimateIn>

        {/* ─── TECH STACKS ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-[28px] md:text-[44px] mb-2 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
            Tech I Work With
          </h2>
          <p className="text-base mb-8" style={{ color: secondaryTextColor }}>Right tool for the job. Not one-size-fits-all.</p>

          <div className="flex flex-wrap gap-3">
            {[
              'Next.js', 'React', 'Astro', 'Vue', 'Nuxt', 'Svelte',
              'React Native', 'SwiftUI', 'Flutter', 'Jetpack Compose',
              'Tailwind CSS', 'shadcn/ui', 'TypeScript',
              'Remotion', 'Framer Motion',
              'Vercel', 'Google Analytics 4',
            ].map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: statBg, color: textColor }}>
                {tech}
              </span>
            ))}
          </div>
        </AnimateIn>

        {/* ─── FEATURED WORK ─── */}
        <AnimateIn direction="up" id="featured-work" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-[28px] md:text-[44px] mb-6 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
            Featured Work
          </h2>
          <div>
            <h3 className="text-xl font-bold mb-2" style={{ color: textColor }}>TechxRev</h3>
            <p className="text-sm mb-3" style={{ color: secondaryTextColor }}>
              Custom site for an IT services company. Design, SEO, analytics.
            </p>
            <a href="https://techxrev.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: primaryColor }}>
              <ExternalLink className="w-4 h-4" /> Visit Site
            </a>
          </div>
        </AnimateIn>

        {/* ─── SERVICE AREAS ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-[28px] md:text-[44px] mb-4 leading-none tracking-wider font-black" style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: textColor }}>
            Service Areas
          </h2>
          <div className="flex flex-wrap gap-3">
            {['Erie, PA', 'Millcreek', 'Harborcreek', 'Fairview', 'Edinboro', 'Meadville', 'Corry', 'North East', 'Girard', 'Waterford', 'Warren', 'Northwestern PA', 'Remote / Nationwide'].map((area) => (
              <span key={area} className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ backgroundColor: statBg, color: textColor }}>
                {area}
              </span>
            ))}
          </div>
        </AnimateIn>

        {/* ─── CTA ─── */}
        <AnimateIn direction="up" id="contact-form" className="mb-12 md:mb-16">
          <h2 className="text-[32px] md:text-[48px] leading-none tracking-wider font-black mb-4 text-center"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: primaryColor }}>
            LET&apos;S BUILD YOUR SITE.
          </h2>
          <p className="text-base mb-8 text-center" style={{ color: secondaryTextColor }}>
            Free consultation. I&apos;ll get back to you within 24 hours.
          </p>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </AnimateIn>

      </div>
      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
