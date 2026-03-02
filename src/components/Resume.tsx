'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import { Download, Mail, ExternalLink } from 'lucide-react';

type Page = 'home' | 'about' | 'work' | 'resume' | 'middleman-case-study' | 'day-one-case-study' | 'doordash-case-study' | 'design-system' | 'services';

interface ResumeProps {
  setCurrentPage?: (page: Page) => void;
}

export default function Resume({ setCurrentPage }: ResumeProps) {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = theme === 'dark' ? '#ffffff' : '#1d1d1f';
  const secondaryTextColor = theme === 'dark' ? '#a1a1a6' : '#6e6e73';
  const backgroundColor = theme === 'dark' ? '#000000' : '#ffffff';
  const badgeBg = cardStyles.getBadgeBackground(accentColor, theme);
  const badgeText = cardStyles.getBadgeTextColor(accentColor, theme);
  const chipBg = cardStyles.getChipBackground(theme);
  const divider = cardStyles.getDividerColor(theme);

  return (
    <div className="px-6 md:px-12 py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-family-bungee), sans-serif", fontWeight: 400, color: textColor }}>
            Thomas Sesler
          </h1>
          <div className="text-xl md:text-2xl mb-2" style={{ color: primaryColor, fontWeight: 600 }}>
            Product Designer
          </div>
          <div className="text-base md:text-lg mb-3" style={{ color: secondaryTextColor }}>
            New Hampshire / Massachusetts — open to full-time, contract, or remote
          </div>
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
              style={{ background: '#d1fae5', border: '1px solid #065f46', color: '#065f46', fontWeight: 600 }}>
              Available immediately
            </span>
          </div>
          <div className="mb-2 text-base" style={{ color: textColor }}>
            <Mail size={16} className="inline mr-2" />tlsesler44@gmail.com
          </div>
          <div className="flex gap-3 flex-wrap mb-6">
            <a href="https://www.linkedin.com/in/tom-sesler/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: badgeBg, color: badgeText, fontWeight: 600, textDecoration: 'none' }}>
              LinkedIn <ExternalLink size={16} />
            </a>
            <a href="https://drive.google.com/file/d/1drBX6we0E2ZaAEpjEje30QULNwHOAUeg/view?usp=sharing" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: badgeBg, color: badgeText, fontWeight: 600, textDecoration: 'none' }}>
              <Download size={16} /> Download PDF
            </a>
          </div>
        </div>

        <div className="mb-8" style={{ borderTop: `2px solid ${divider}` }} />

        {/* Professional Summary */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4" style={{ color: primaryColor, fontWeight: 700 }}>PROFESSIONAL SUMMARY</h2>
          <p className="text-base leading-relaxed" style={{ color: textColor }}>
            Product Designer with a marketing degree and hands-on field experience. Skilled in Figma (Auto Layout, component libraries, design systems), user research, usability testing, and working within Agile teams. My design decisions start with real workflows, not assumptions — I focus on designs that serve both user needs and business goals.
          </p>
        </section>

        <div className="mb-8" style={{ borderTop: `2px solid ${divider}` }} />

        {/* Professional Experience */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4" style={{ color: primaryColor, fontWeight: 700 }}>PROFESSIONAL EXPERIENCE</h2>

          {/* TechxRev */}
          <div className="mb-6">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>UX/UI Designer (Freelance)</h3>
              <span className="text-sm" style={{ color: secondaryTextColor }}>May 2025 – Present | Remote</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-base" style={{ color: textColor }}>
              <li>Design responsive websites and digital products for small business clients using Figma&apos;s Auto Layout, component variants, and interactive prototyping features</li>
              <li>Conduct client interviews to understand business requirements, target audiences, and commercial goals</li>
              <li>Apply information architecture principles to structure site navigation and content hierarchy</li>
              <li>Create detailed design specifications and handoff documentation following WCAG 2.1 accessibility guidelines</li>
              <li>Implement SEO best practices and Google Analytics 4 tracking to enable data-driven iteration</li>
            </ul>
            <div className="flex flex-wrap gap-2 mb-2">
              {['Figma', 'IA & UX Writing', 'WCAG 2.1', 'SEO', 'GA4'].map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-sm" style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>{s}</span>
              ))}
            </div>
            <a href="https://techxrev.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
              style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor, textDecoration: 'none' }}>
              View Site <ExternalLink size={14} />
            </a>
          </div>

          {/* Design Lab */}
          <div className="mb-6">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>Design Lab Technical Assistant | UNH Paul Creative Arts Center</h3>
              <span className="text-sm" style={{ color: secondaryTextColor }}>August 2023 – May 2024 | Durham, NH</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-base" style={{ color: textColor }}>
              <li>Supported 100+ students with Adobe Creative Suite workflows, teaching visual design principles</li>
              <li>Created standardized design documentation and workflow guides</li>
              <li>Troubleshot technical issues related to file preparation and print production</li>
              <li>Mentored students on layout design for both digital and print deliverables</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {['Adobe Creative Suite (Ps/Ai/Id)', 'Visual Design Principles', 'Documentation'].map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-sm" style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Merchandiser */}
          <div className="mb-6">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>Merchandiser | New Hampshire Distributors</h3>
              <span className="text-sm" style={{ color: secondaryTextColor }}>January 2024 – May 2025 | Rochester, NH</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-base" style={{ color: textColor }}>
              <li>Executed strategic product placement across 15+ retail accounts</li>
              <li>Conducted contextual inquiry by observing merchandiser workflows in retail environments</li>
              <li>Collaborated with store managers on inventory optimization</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {['Retail Operations', 'User Research', 'Contextual Inquiry'].map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-sm" style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>{s}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="mb-8" style={{ borderTop: `2px solid ${divider}` }} />

        {/* Design Projects */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4" style={{ color: primaryColor, fontWeight: 700 }}>DESIGN PROJECTS</h2>

          {[
            { title: 'POS-Driven Merchandiser App', subtitle: 'Mobile Product Design', date: 'June 2025 – August 2025', desc: 'Designed a mobile-first app to reduce retail stock-outs using real-time POS data. Built from 1.5 years of firsthand merchandising experience across 15+ accounts. Solo designer: research, IA, interaction design, and 10+ prototype iterations in Figma.', tags: ['User Research', 'Figma Prototyping', 'Design System', 'Usability Testing'], page: 'middleman-case-study' as const },
            { title: 'DoorDash Dasher App', subtitle: 'UX Heuristic Evaluation', date: '2025', desc: 'Ethnographic field research across 1,000+ deliveries analyzing error recovery failures. Applied Nielsen\u2019s heuristics to evaluate 5 critical flows and proposed business-aware redesigns.', tags: ['Ethnographic Research', 'Heuristic Evaluation', 'Error Recovery', 'Mobile UX'], page: 'doordash-case-study' as const },
            { title: 'FirstDay.Life', subtitle: 'Responsive Web Application', date: 'June 2025 – August 2025', desc: 'AI-powered goal tracker designed, built, and shipped as a live product. Competitive analysis, user journey mapping, and responsive mobile-first interface with WCAG 2.1 AA compliance.', tags: ['Competitive Analysis', 'Responsive Design', 'Shipped Product'], page: 'day-one-case-study' as const },
          ].map(({ title, subtitle, date, desc, tags, page }) => (
            <div key={title} className="mb-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h3 className="text-lg font-semibold" style={{ color: textColor }}>{title} | {subtitle}</h3>
                <span className="text-sm" style={{ color: secondaryTextColor }}>{date}</span>
              </div>
              <p className="text-base leading-relaxed mb-3" style={{ color: textColor }}>{desc}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full text-sm" style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>{s}</span>
                ))}
              </div>
              {setCurrentPage && (
                <button onClick={() => setCurrentPage(page)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all hover:scale-105"
                  style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>
                  View Case Study <ExternalLink size={14} />
                </button>
              )}
            </div>
          ))}
        </section>

        <div className="mb-8" style={{ borderTop: `2px solid ${divider}` }} />

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4" style={{ color: primaryColor, fontWeight: 700 }}>EDUCATION</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold" style={{ color: textColor }}>
              Bachelor of Science in Business Administration, Marketing
            </h3>
            <div className="text-base" style={{ color: secondaryTextColor }}>University of New Hampshire | Durham, NH</div>
            <div className="text-sm" style={{ color: secondaryTextColor }}>August 2021 – May 2025</div>
          </div>
        </section>

        <div className="mb-8" style={{ borderTop: `2px solid ${divider}` }} />

        {/* Technical Skills */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4" style={{ color: primaryColor, fontWeight: 700 }}>TECHNICAL SKILLS & TOOLS</h2>
          {[
            { label: 'Design & Prototyping:', text: 'Figma (Auto Layout, Components, Variants, Variables, Interactive Prototyping, Design Systems), Adobe Creative Suite (Photoshop, Illustrator, InDesign), Webflow, Framer' },
            { label: 'Research & Analysis:', text: 'User Interviews, Usability Testing, Competitive Analysis, Google Analytics 4, Google Surveys, Qualtrics, Power BI, Tableau' },
            { label: 'Development Knowledge:', text: 'HTML/CSS Fundamentals, Responsive Design Principles, SEO Best Practices' },
            { label: 'Portfolio:', text: 'straydesign.co — Case studies showcasing user research, business-centered design thinking, wireframes, and prototypes' },
            { label: 'References:', text: 'Available upon request | Public recommendations on LinkedIn' },
          ].map(({ label, text }) => (
            <div key={label} className="mb-4">
              <h3 className="text-lg font-semibold mb-2" style={{ color: textColor }}>{label}</h3>
              <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>{text}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
