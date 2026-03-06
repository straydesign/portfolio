'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import { ExternalLink, TrendingUp, Shield, Gauge } from 'lucide-react';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import ContactForm from './ContactForm';
import PricingCard from './PricingCard';

export default function Services() {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);

  const statBg = theme === 'dark' ? '#000000' : 'rgba(0, 0, 0, 0.03)';
  const divider = `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`;

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">
      <div className="max-w-[90rem] mx-auto">

        {/* ─── HERO ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pt-4 md:pt-8">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
            Erie, Pennsylvania &bull; Web Design &amp; Development
          </p>
          <h1 className="text-[40px] sm:text-[52px] md:text-[64px] leading-[1.05] tracking-tight font-black mb-4 md:mb-6"
            style={{ color: textColor }}>
            Professional Web Design{' '}
            <span style={{ color: primaryColor }}>in Erie, PA</span>
          </h1>
          <p className="text-[20px] md:text-[24px] mb-6" style={{ color: primaryColor, fontWeight: 600 }}>
            A fast, professional site that grows with your Erie business.
          </p>
          <p className="text-[15px] md:text-[17px] leading-relaxed max-w-3xl" style={{ color: textColor }}>
            I design and build high-performance websites for businesses in Erie, Pennsylvania and the surrounding region. Every project ships with real SEO, analytics tracking, and a responsive build that scores high on Google&apos;s Core Web Vitals. Your site becomes a growth tool, not just a brochure.
          </p>
        </AnimateIn>

        {/* ─── WHY IT MATTERS ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-2xl md:text-3xl mb-8 font-bold" style={{ color: textColor }}>
            WHAT YOU GET
          </h2>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.12}>
            {[
              {
                icon: Gauge,
                title: 'Performance',
                points: ['Optimized load times', '90+ Lighthouse scores', 'Core Web Vitals compliant', 'Image optimization & lazy loading'],
              },
              {
                icon: TrendingUp,
                title: 'Growth-Ready',
                points: ['SEO baked in from day one', 'Google Analytics 4 setup', 'Structured data for search', 'Built to scale as you grow'],
              },
              {
                icon: Shield,
                title: 'Built Right',
                points: ['Responsive on every device', 'Accessible (WCAG standards)', 'Clean, maintainable code', 'Fast hosting infrastructure'],
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
        </AnimateIn>

        {/* ─── PRICING ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-2xl md:text-3xl mb-2 font-bold" style={{ color: textColor }}>
            WEBSITE PACKAGES
          </h2>
          <p className="text-lg mb-8" style={{ color: secondaryTextColor }}>One-time build. Yours to own.</p>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
            <StaggerItem>
              <PricingCard
                name="STARTER"
                price="$1,000"
                subtitle="A professional site for small service-based businesses."
                features={[
                  { label: 'Up to 5 pages' },
                  { label: 'Custom design' },
                  { label: 'Mobile responsive' },
                  { label: 'Professional photo shoot' },
                  { label: 'AI-powered SEO optimization' },
                  { label: 'Google Analytics 4' },
                  { label: 'Content curated to your business' },
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
                price="$1,500"
                subtitle="A full-featured site built to convert visitors into customers."
                featured
                features={[
                  { label: 'Up to 12 pages' },
                  { label: 'Custom design + content strategy' },
                  { label: 'CMS for easy self-editing' },
                  { label: 'Professional photo shoot' },
                  { label: 'AI-powered SEO + structured data' },
                  { label: 'AI chatbot for your site' },
                  { label: 'Blog or news section' },
                  { label: 'Speed optimization (90+ Lighthouse)' },
                  { label: 'AI-curated copy + content' },
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
                subtitle="Full build with ads included to start driving traffic on day one."
                features={[
                  { label: 'Unlimited pages' },
                  { label: 'E-commerce or booking system' },
                  { label: 'Professional photo shoot' },
                  { label: 'AI-powered SEO + content' },
                  { label: 'AI email marketing curated to individuals' },
                  { label: '3 months of ad management included' },
                  { label: 'Custom interactive features' },
                  { label: 'Third-party integrations' },
                  { label: 'Launch strategy session' },
                ]}
                primaryColor={primaryColor}
                textColor={textColor}
                secondaryTextColor={secondaryTextColor}
                theme={theme}
              />
            </StaggerItem>
          </StaggerContainer>
        </AnimateIn>

        {/* ─── MONTHLY SUPPORT ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-2xl md:text-3xl mb-2 font-bold" style={{ color: textColor }}>
            ONGOING SUPPORT
          </h2>
          <p className="text-lg mb-8" style={{ color: secondaryTextColor }}>Keep your site running, fresh, and growing. Cancel anytime.</p>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
            <StaggerItem>
              <PricingCard
                name="HOSTING & MAINTENANCE"
                price="$50"
                periodLabel="/mo"
                subtitle="Your site stays live, secure, and up to date."
                features={[
                  { label: 'Managed hosting + SSL' },
                  { label: 'Monthly backups' },
                  { label: 'Security patches + updates' },
                  { label: 'Uptime monitoring' },
                  { label: 'Bug fixes' },
                  { label: 'Email support' },
                ]}
                primaryColor={primaryColor}
                textColor={textColor}
                secondaryTextColor={secondaryTextColor}
                theme={theme}
              />
            </StaggerItem>
            <StaggerItem>
              <PricingCard
                name="GROWTH"
                price="$125"
                periodLabel="/mo"
                subtitle="Ongoing design and content updates without hiring in-house."
                featured
                features={[
                  { label: 'Everything in Hosting' },
                  { label: 'Up to 4 hours of updates/mo' },
                  { label: 'Content changes + new pages' },
                  { label: 'Design refreshes' },
                  { label: 'SEO monitoring + adjustments' },
                  { label: 'Priority response (24hr)' },
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
                subtitle="Full digital marketing. Ads, analytics, and strategy."
                features={[
                  { label: 'Everything in Growth' },
                  { label: 'Google + Meta ad management' },
                  { label: 'Campaign strategy + creative' },
                  { label: 'Monthly performance reports' },
                  { label: 'Conversion tracking setup' },
                  { label: 'Ad spend optimization' },
                ]}
                primaryColor={primaryColor}
                textColor={textColor}
                secondaryTextColor={secondaryTextColor}
                theme={theme}
              />
            </StaggerItem>
          </StaggerContainer>
        </AnimateIn>

        {/* ─── FEATURED WORK ─── */}
        <AnimateIn direction="up" id="featured-work" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-2xl md:text-3xl mb-6 md:mb-8 font-bold" style={{ color: textColor }}>
            FEATURED WORK
          </h2>
          <div className="py-4">
            <h3 className="text-xl font-bold mb-2" style={{ color: textColor }}>TechxRev</h3>
            <p className="text-base mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>
              Responsive website for a technology services company. Custom design, SEO optimization, and Google Analytics integration.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              {['Web Design', 'SEO', 'GA4'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: statBg, color: textColor }}>{tag}</span>
              ))}
            </div>
            <a href="https://techxrev.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: primaryColor }}>
              <ExternalLink className="w-4 h-4" /> Visit Site
            </a>
          </div>
        </AnimateIn>

        {/* ─── WHY LOCAL ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-2xl md:text-3xl mb-2 font-bold" style={{ color: textColor }}>
            WHY CHOOSE A LOCAL ERIE WEB DESIGNER?
          </h2>
          <p className="text-lg mb-8" style={{ color: secondaryTextColor }}>Working with someone who knows the market makes a difference.</p>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.12}>
            {[
              { title: 'Local Market Knowledge', text: 'I understand the Erie, PA business landscape, from Presque Isle tourism to the manufacturing and healthcare sectors. Your website will speak directly to your actual customers in Northwestern Pennsylvania.' },
              { title: 'Face-to-Face Collaboration', text: 'Unlike remote agencies, I\'m available for in-person meetings throughout Erie County. Let\'s grab coffee at Ember + Forge and talk about your project.' },
              { title: 'Ongoing Local Support', text: 'Your website isn\'t a one-and-done project. I provide ongoing maintenance, updates, and support right here in Erie to keep your business growing online.' },
            ].map(({ title, text }) => (
              <StaggerItem key={title}>
                <div className="py-4">
                  <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: textColor }}>{text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimateIn>

        {/* ─── SERVICE AREAS ─── */}
        <AnimateIn direction="up" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-2xl md:text-3xl mb-2 font-bold" style={{ color: textColor }}>
            SERVING ERIE, PA &amp; SURROUNDING AREAS
          </h2>
          <p className="text-lg mb-8" style={{ color: secondaryTextColor }}>Professional web design available throughout Northwestern Pennsylvania. Remote collaboration available nationwide.</p>
          <div className="flex flex-wrap gap-3">
            {['Erie, PA', 'Millcreek Township', 'Harborcreek', 'Fairview', 'Edinboro', 'Meadville', 'Corry', 'North East, PA', 'Girard', 'Waterford', 'Warren, PA', 'Northwestern PA'].map((area) => (
              <span key={area} className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: statBg, color: textColor }}>
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
          <p className="text-base md:text-lg mb-8 text-center" style={{ color: secondaryTextColor }}>
            Free consultation for Erie, PA businesses. Tell me about your project and I&apos;ll get back to you within 24 hours.
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
