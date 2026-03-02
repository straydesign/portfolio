'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import { ExternalLink, Mail, Palette, Smartphone, BarChart3, Wrench } from 'lucide-react';

export default function Services() {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);
  const backgroundColor = cardStyles.getBackgroundColor(theme);
  const badgeBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const badgeText = theme === 'dark' ? '#ffffff' : '#1d1d1f';

  const cardStyle = {
    background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`,
    boxShadow: theme === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3)' : '0 4px 16px 0 rgba(0, 0, 0, 0.12)',
  };

  const buttonTextColor = (accentColor === 'bw' && theme === 'dark') ? '#ffffff'
    : (accentColor === 'bw' && theme === 'light') ? '#000000'
    : (accentColor === 'yellow' || accentColor === 'tan') ? '#000000'
    : '#ffffff';

  const services = [
    { icon: Palette, title: 'Custom Website Design', description: 'From wireframes in Figma to a polished, branded site that reflects your business.' },
    { icon: Smartphone, title: 'Responsive Development', description: 'Mobile-first builds that look great on every screen size.' },
    { icon: BarChart3, title: 'SEO & Analytics', description: 'Google Analytics 4 setup, search optimization, and tracking so you can measure results.' },
    { icon: Wrench, title: 'Ongoing Support', description: 'Content updates, maintenance, and iterative improvements after launch.' },
  ];

  const packages = [
    {
      name: 'STARTER',
      price: 'From $500',
      description: 'Perfect for a focused landing page or single-page site.',
      features: ['Single-page design', 'Mobile responsive', 'Basic SEO setup', '1 round of revisions'],
    },
    {
      name: 'BUSINESS',
      price: 'From $1,500',
      description: 'A complete web presence for your growing business.',
      features: ['Up to 5 pages', 'Custom design in Figma', 'SEO + GA4 setup', '2 rounds of revisions'],
      featured: true,
    },
    {
      name: 'PREMIUM',
      price: 'From $3,000',
      description: 'Full-service design with strategy and ongoing support.',
      features: ['Full custom site', 'Content strategy', 'SEO + analytics', '1 month ongoing support', '3 rounds of revisions'],
    },
  ];

  const featuredWork = [
    {
      title: 'TechxRev',
      description: 'Responsive website for a technology services company. Custom design, SEO optimization, and Google Analytics integration.',
      tags: ['Web Design', 'SEO', 'GA4'],
      link: 'https://techxrev.com',
    },
  ];

  return (
    <div className="px-6 md:px-12 py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="mb-8 md:mb-12 p-6 md:p-10 rounded-[48px]" style={cardStyle}>
          <h1 className="text-[48px] sm:text-[60px] md:text-[72px] leading-none tracking-wider font-black mb-4 md:mb-6"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", WebkitTextStroke: `4px ${primaryColor}`, WebkitTextFillColor: 'transparent', color: 'transparent', paintOrder: 'stroke fill' }}>
            WEB DESIGN
          </h1>
          <p className="text-[20px] md:text-[24px] mb-6" style={{ color: primaryColor, fontWeight: 600 }}>
            Custom websites that engage your audience and grow your business.
          </p>
          <p className="text-[15px] md:text-[17px] leading-snug" style={{ color: textColor }}>
            I combine a marketing background with design expertise to build sites that look great and actually drive results. Every project starts with understanding your business goals, your audience, and what success looks like for you.
          </p>
        </div>

        {/* WHAT I DO */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl mb-6 md:mb-8 font-bold" style={{ color: textColor }}>
            WHAT I DO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {services.map((service) => (
              <div key={service.title} className="p-6 md:p-8 rounded-[32px]" style={cardStyle}>
                <service.icon className="w-8 h-8 mb-4" style={{ color: primaryColor }} />
                <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: textColor }}>{service.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PACKAGES */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl mb-6 md:mb-8 font-bold" style={{ color: textColor }}>
            PACKAGES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {packages.map((pkg) => (
              <div key={pkg.name} className="p-6 md:p-8 rounded-[32px] flex flex-col"
                style={{ ...cardStyle, border: pkg.featured ? `2px solid ${primaryColor}` : cardStyle.border }}>
                {pkg.featured && (
                  <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold mb-4"
                    style={{ backgroundColor: primaryColor, color: buttonTextColor }}>
                    POPULAR
                  </span>
                )}
                <h3 className="text-lg font-bold tracking-wider mb-2" style={{ color: primaryColor }}>{pkg.name}</h3>
                <p className="text-2xl md:text-3xl font-bold mb-3" style={{ color: textColor }}>{pkg.price}</p>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: secondaryTextColor }}>{pkg.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: textColor }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="mailto:tlsesler44@gmail.com?subject=Web Design Inquiry"
                  className="w-full px-4 py-2.5 rounded-full text-sm text-center transition-all hover:scale-105 font-bold"
                  style={{ backgroundColor: pkg.featured ? primaryColor : 'transparent', color: pkg.featured ? buttonTextColor : textColor, border: `2px solid ${primaryColor}`, display: 'block' }}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURED WORK */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl mb-6 md:mb-8 font-bold" style={{ color: textColor }}>
            FEATURED WORK
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {featuredWork.map((project) => (
              <div key={project.title} className="p-6 md:p-8 rounded-[32px]" style={cardStyle}>
                <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: textColor }}>{project.title}</h3>
                <p className="text-base mb-4 leading-relaxed" style={{ color: secondaryTextColor }}>{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: badgeBg, color: badgeText }}>{tag}</span>
                  ))}
                </div>
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all hover:scale-105"
                  style={{ backgroundColor: badgeBg, color: badgeText }}>
                  <ExternalLink className="w-4 h-4" /> Visit Site
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 md:p-10 rounded-[48px] text-center" style={cardStyle}>
          <h2 className="text-[32px] md:text-[48px] leading-none tracking-wider font-black mb-4"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: primaryColor }}>
            LET&apos;S BUILD YOUR SITE.
          </h2>
          <p className="text-base md:text-lg mb-6" style={{ color: secondaryTextColor }}>
            Tell me about your project and I&apos;ll get back to you within 24 hours.
          </p>
          <a href="mailto:tlsesler44@gmail.com?subject=Web Design Inquiry"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-base transition-all hover:scale-105 font-bold"
            style={{ backgroundColor: primaryColor, color: buttonTextColor }}>
            <Mail className="w-5 h-5" /> Get in Touch
          </a>
        </div>

      </div>
      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
