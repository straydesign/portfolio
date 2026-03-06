'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import { ExternalLink, Zap, TrendingUp, Shield, BarChart3, Globe, Smartphone, Search, Gauge } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Services() {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const buttonPrimaryColor = cardStyles.getButtonPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);

  const statBg = theme === 'dark' ? '#000000' : 'rgba(0, 0, 0, 0.03)';
  const divider = `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`;

  const buttonTextColor = (accentColor === 'bw' && theme === 'dark') ? '#000000'
    : (accentColor === 'bw' && theme === 'light') ? '#ffffff'
    : (accentColor === 'yellow' || accentColor === 'tan') ? '#000000'
    : '#ffffff';

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">
      <div className="max-w-[90rem] mx-auto">

        {/* ─── HERO ─── */}
        <div className="mb-12 md:mb-16 pt-4 md:pt-8">
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
        </div>

        {/* ─── WHY IT MATTERS ─── */}
        <div className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-2xl md:text-3xl mb-8 font-bold" style={{ color: textColor }}>
            WHAT YOU GET
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
              <div key={title}>
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
            ))}
          </div>
        </div>

        {/* ─── PRICING ─── */}
        <div className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-2xl md:text-3xl mb-2 font-bold" style={{ color: textColor }}>
            WEBSITE PACKAGES
          </h2>
          <p className="text-lg mb-8" style={{ color: secondaryTextColor }}>One-time build. Yours to own.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                name: 'STARTER',
                price: '$500',
                description: 'A professional site for small service-based businesses.',
                features: ['Up to 5 pages', 'Custom design', 'Mobile responsive', 'Professional photo shoot', 'AI-powered SEO optimization', 'Google Analytics 4', 'Content curated to your business'],
              },
              {
                name: 'PROFESSIONAL',
                price: '$1,500',
                description: 'A full-featured site built to convert visitors into customers.',
                features: ['Up to 12 pages', 'Custom design + content strategy', 'CMS for easy self-editing', 'Professional photo shoot', 'AI-powered SEO + structured data', 'AI chatbot for your site', 'Blog or news section', 'Speed optimization (90+ Lighthouse)', 'AI-curated copy + content'],
                featured: true,
              },
              {
                name: 'CUSTOM',
                price: '$3,000',
                description: 'Full build with ads included to start driving traffic on day one.',
                features: ['Unlimited pages', 'E-commerce or booking system', 'Professional photo shoot', 'AI-powered SEO + content', 'AI email marketing curated to individuals', '3 months of ad management included', 'Custom interactive features', 'Third-party integrations', 'Launch strategy session'],
              },
              {
                name: 'MOBILE APP',
                price: '$5,000+',
                description: 'A native mobile app for iOS, Android, or both.',
                features: ['Custom UI/UX design', 'iOS and/or Android', 'Push notifications', 'Backend + API integration', 'App Store submission', 'Post-launch support included'],
              },
            ].map((tier) => (
              <div key={tier.name} className="py-6 md:py-8 px-1">
                {tier.featured && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ backgroundColor: primaryColor, color: buttonTextColor }}>
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-sm font-bold tracking-wider mb-3" style={{ color: primaryColor }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: textColor }}>{tier.price}</span>
                </div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>{tier.description}</p>
                <div className="space-y-2">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                      <p className="text-sm" style={{ color: textColor }}>{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── MONTHLY SUPPORT ─── */}
        <div className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-2xl md:text-3xl mb-2 font-bold" style={{ color: textColor }}>
            ONGOING SUPPORT
          </h2>
          <p className="text-lg mb-8" style={{ color: secondaryTextColor }}>Keep your site running, fresh, and growing. Cancel anytime.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: 'HOSTING & MAINTENANCE',
                price: '$25',
                period: '/mo',
                description: 'Your site stays live, secure, and up to date.',
                features: ['Managed hosting + SSL', 'Monthly backups', 'Security patches + updates', 'Uptime monitoring', 'Bug fixes', 'Email support'],
              },
              {
                name: 'GROWTH',
                price: '$125',
                period: '/mo',
                description: 'Ongoing design and content updates without hiring in-house.',
                features: ['Everything in Hosting', 'Up to 4 hours of updates/mo', 'Content changes + new pages', 'Design refreshes', 'SEO monitoring + adjustments', 'Priority response (24hr)'],
                featured: true,
              },
              {
                name: 'MARKETING',
                price: '$500',
                period: '/mo',
                description: 'Full digital marketing. Ads, analytics, and strategy.',
                features: ['Everything in Growth', 'Google + Meta ad management', 'Campaign strategy + creative', 'Monthly performance reports', 'Conversion tracking setup', 'Ad spend optimization'],
              },
            ].map((tier) => (
              <div key={tier.name} className="py-6 md:py-8 px-1">
                {tier.featured && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ backgroundColor: primaryColor, color: buttonTextColor }}>
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-sm font-bold tracking-wider mb-3" style={{ color: primaryColor }}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: textColor }}>{tier.price}</span>
                  <span className="text-sm" style={{ color: secondaryTextColor }}>{tier.period}</span>
                </div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>{tier.description}</p>
                <div className="space-y-2">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                      <p className="text-sm" style={{ color: textColor }}>{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FEATURED WORK ─── */}
        <div id="featured-work" className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
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
        </div>

        {/* ─── WHY LOCAL ─── */}
        <div className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
          <h2 className="text-2xl md:text-3xl mb-2 font-bold" style={{ color: textColor }}>
            WHY CHOOSE A LOCAL ERIE WEB DESIGNER?
          </h2>
          <p className="text-lg mb-8" style={{ color: secondaryTextColor }}>Working with someone who knows the market makes a difference.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Local Market Knowledge', text: 'I understand the Erie, PA business landscape, from Presque Isle tourism to the manufacturing and healthcare sectors. Your website will speak directly to your actual customers in Northwestern Pennsylvania.' },
              { title: 'Face-to-Face Collaboration', text: 'Unlike remote agencies, I\'m available for in-person meetings throughout Erie County. Let\'s grab coffee at Ember + Forge and talk about your project.' },
              { title: 'Ongoing Local Support', text: 'Your website isn\'t a one-and-done project. I provide ongoing maintenance, updates, and support right here in Erie to keep your business growing online.' },
            ].map(({ title, text }) => (
              <div key={title} className="py-4">
                <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: textColor }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SERVICE AREAS ─── */}
        <div className="mb-12 md:mb-16 pb-8" style={{ borderBottom: divider }}>
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
        </div>

        {/* ─── CTA ─── */}
        <div id="contact-form" className="mb-12 md:mb-16">
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
        </div>

      </div>
      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
