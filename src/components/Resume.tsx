'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import { Download, Mail, ExternalLink } from 'lucide-react';
import { type Page } from '@/data/projects';

interface ResumeProps {
  setCurrentPage?: (page: Page) => void;
}

export default function Resume({ setCurrentPage }: ResumeProps) {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = theme === 'dark' ? '#ffffff' : '#1d1d1f';
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);
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
            New Hampshire / Massachusetts. Open to full-time, contract, or remote
          </div>
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
              style={{ background: theme === 'dark' ? '#064e3b' : '#d1fae5', border: `1px solid ${theme === 'dark' ? '#34d399' : '#065f46'}`, color: theme === 'dark' ? '#34d399' : '#065f46', fontWeight: 600 }}>
              Available immediately
            </span>
          </div>
          <div className="mb-2 text-base" style={{ color: textColor }}>
            <Mail size={16} className="inline mr-2" />tom@straydesign.co
          </div>
          <div className="flex gap-3 flex-wrap mb-6">
            <a href="https://www.linkedin.com/in/tom-sesler/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: badgeBg, color: badgeText, fontWeight: 600, textDecoration: 'none' }}>
              LinkedIn <ExternalLink size={16} />
            </a>
            <a href="https://docs.google.com/document/d/1kTxSO1ZNzDd9DeFBos4rUYLo0tUII7KU/edit?usp=sharing&ouid=113634400728522442808&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: badgeBg, color: badgeText, fontWeight: 600, textDecoration: 'none' }}>
              <Download size={16} /> Download Resume
            </a>
          </div>
        </div>

        <div className="mb-8" style={{ borderTop: `2px solid ${divider}` }} />

        {/* Professional Summary */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4" style={{ color: primaryColor, fontWeight: 700 }}>PROFESSIONAL SUMMARY</h2>
          <p className="text-base leading-relaxed" style={{ color: textColor }}>
            Product Designer with a marketing background that informs user-centered, business-driven design decisions across web and mobile platforms. Proficient in Figma with hands-on experience creating wireframes, mockups, prototypes, and flow diagrams for cloud-based applications grounded in design systems. Experienced collaborating with cross-functional teams and clearly articulating design rationale. Strong foundation in user research, usability testing, and information architecture, with a focus on designing intuitive experiences that reduce complexity for users in high-stakes or time-sensitive contexts.
          </p>
        </section>

        <div className="mb-8" style={{ borderTop: `2px solid ${divider}` }} />

        {/* Professional Experience */}
        <section className="mb-8">
          <h2 className="text-2xl mb-4" style={{ color: primaryColor, fontWeight: 700 }}>PROFESSIONAL EXPERIENCE</h2>

          {/* Freelance */}
          <div className="mb-6">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>UX/UI Designer (Freelance)</h3>
              <span className="text-sm" style={{ color: secondaryTextColor }}>May 2025 – Present | Remote</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-base" style={{ color: textColor }}>
              <li>Design responsive websites and cloud-based digital products for small business clients using Figma&apos;s Auto Layout, component variants, and interactive prototyping</li>
              <li>Conduct client discovery interviews to understand user needs and business requirements, then translate findings into wireframes, flow diagrams, and high-fidelity mockups</li>
              <li>Apply information architecture principles to create intuitive navigation and content hierarchy, designing experiences that reduce friction for diverse user types</li>
              <li>Follow WCAG 2.1 accessibility guidelines and use Google Analytics 4 to validate design decisions with data</li>
            </ul>
            <div className="flex flex-wrap gap-2 mb-2">
              {['Figma', 'IA & UX Writing', 'WCAG 2.1', 'GA4'].map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-sm" style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>{s}</span>
              ))}
            </div>
            <a href="https://techxrev.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all hover:scale-105"
              style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor, textDecoration: 'none' }}>
              View Site <ExternalLink size={14} />
            </a>
          </div>

          {/* News Corp */}
          <div className="mb-6">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>Product Strategy Extern | News Corp &middot; Extern Program</h3>
              <span className="text-sm" style={{ color: secondaryTextColor }}>February 2026 – Present | Remote</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-base" style={{ color: textColor }}>
              <li>Completing an 8-week externship focused on AI-driven product strategy for News Corp&apos;s digital news products, with work reviewed by company leadership</li>
              <li>Designing and deploying user surveys to investigate how algorithmic feeds shape trust and engagement, then translating research findings into actionable product feature concepts</li>
              <li>Designing an AI feature concept aimed at presenting balanced perspectives in news content to counter filter bubble effects, informed by user research and behavioral patterns</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {['AI Product Strategy', 'User Surveys', 'Research Synthesis'].map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-sm" style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>{s}</span>
              ))}
            </div>
          </div>

          {/* TikTok */}
          <div className="mb-6">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>Brand & Content Strategy Extern | TikTok / Sapphire Studios &middot; Extern Program</h3>
              <span className="text-sm" style={{ color: secondaryTextColor }}>January 2026 – February 2026 | Remote</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-base" style={{ color: textColor }}>
              <li>Completed a 4-week brand strategy externship mentored by TikTok&apos;s Head of Agency, developing brand voice frameworks and visual identity systems with reusable templates and content grids</li>
              <li>Applied design system thinking to ensure cross-platform consistency across Instagram and TikTok, creating systematic caption frameworks and content templates</li>
              <li>Designed a structured conversation feature inspired by research in Supercommunicators, exploring how platform design can encourage more constructive dialogue between users</li>
              <li>Synthesized all work into a client-ready Brand Voice & Content Playbook, presenting design decisions and strategy to reviewers</li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {['Brand Strategy', 'Design Systems', 'Content Strategy', 'Cross-Platform'].map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-sm" style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Design Lab */}
          <div className="mb-6">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>Design Lab Technical Assistant | UNH Paul Creative Arts Center</h3>
              <span className="text-sm" style={{ color: secondaryTextColor }}>August 2023 – May 2024 | Durham, NH</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-base" style={{ color: textColor }}>
              <li>Supported 100+ students with Adobe Creative Suite workflows, mentoring on visual design principles including hierarchy, typography, and color theory</li>
              <li>Created standardized design documentation and workflow guides that improved lab efficiency and student self-service</li>
              <li>Troubleshot technical issues across file preparation, print production, and digital asset management workflows</li>
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
              <li>Executed strategic product placement across 15+ retail accounts, developing understanding of operational workflows and user pain points in high-volume environments</li>
              <li>Conducted contextual inquiry by observing merchandiser workflows in retail settings, identifying friction points that directly informed the design of a POS-Driven Merchandiser App</li>
              <li>Collaborated with store managers on inventory optimization, building empathy for users working within stressful, time-sensitive operational constraints</li>
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

          {/* Middleman */}
          <div className="mb-6">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>POS-Driven Merchandiser App | Mobile Product Design</h3>
              <span className="text-sm" style={{ color: secondaryTextColor }}>June 2025 – August 2025</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-base" style={{ color: textColor }}>
              <li>Designed a mobile-first application to reduce retail stock-outs by integrating real-time POS data with merchandiser workflows, with significant focus on information architecture for complex operational data</li>
              <li>Conducted user interviews to map workflows and identify pain points, then iterated from low-fidelity wireframes through interactive high-fidelity Figma prototypes</li>
              <li>Built a component-based design system with reusable UI elements, ensuring visual consistency, WCAG 2.1 Level AA compliance, and clean file organization for developer handoff</li>
              <li>Designed data visualization interfaces that presented complex operational metrics in clear, actionable formats for users in fast-paced environments</li>
              <li>Conducted usability testing with target users, incorporating feedback through rapid design iterations to improve task completion rates</li>
            </ul>
            <div className="flex flex-wrap gap-2 mb-2">
              {['User Research', 'Figma Prototyping', 'Design System', 'Usability Testing', 'Data Visualization'].map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-sm" style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>{s}</span>
              ))}
            </div>
            {setCurrentPage && (
              <button onClick={() => setCurrentPage('middleman-case-study')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all hover:scale-105"
                style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>
                View Case Study <ExternalLink size={14} />
              </button>
            )}
          </div>

          {/* FirstDay */}
          <div className="mb-6">
            <div className="flex flex-wrap items-baseline gap-3 mb-2">
              <h3 className="text-lg font-semibold" style={{ color: textColor }}>firstday.life | AI-Powered Web Application</h3>
              <span className="text-sm" style={{ color: secondaryTextColor }}>June 2025 – August 2025 | Live Product</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 mb-3 text-base" style={{ color: textColor }}>
              <li>Built and publicly launched an AI-powered web app that generates personalized 30-day self-improvement plans delivered in 7-day sprints, guiding users through structured goals in a supportive, step-by-step format</li>
              <li>Researched competitive wellness and productivity tools through comparative analysis to identify market gaps and unmet user needs</li>
              <li>Created a responsive, mobile-first interface in Figma with systematic breakpoint considerations, ensuring WCAG 2.1 Level AA compliance</li>
              <li>Gathered user feedback post-launch to drive iterative design improvements</li>
            </ul>
            <div className="flex flex-wrap gap-2 mb-2">
              {['Competitive Analysis', 'Responsive Design', 'Shipped Product', 'WCAG 2.1'].map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-sm" style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>{s}</span>
              ))}
            </div>
            {setCurrentPage && (
              <button onClick={() => setCurrentPage('day-one-case-study')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all hover:scale-105"
                style={{ background: chipBg, border: `1px solid ${divider}`, color: textColor }}>
                View Case Study <ExternalLink size={14} />
              </button>
            )}
          </div>

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
            { label: 'Design & Prototyping:', text: 'Figma (Auto Layout, Components, Variants, Variables, Interactive Prototyping, Design Systems), Adobe Creative Suite (Photoshop, Illustrator, InDesign), Webflow, Framer, Canva' },
            { label: 'UX Artifacts:', text: 'Wireframes, Mockups, Flow Diagrams, User Journey Maps, Interactive Prototypes, Design Specifications' },
            { label: 'Research & Analysis:', text: 'User Interviews, Usability Testing, Contextual Inquiry, Competitive Analysis, Survey Design, Google Analytics 4, Qualtrics' },
            { label: 'Strategy & Content:', text: 'Brand Voice Development, Content Strategy, AI Personalization Strategy, Information Architecture' },
            { label: 'Development Knowledge:', text: 'HTML/CSS Fundamentals, Responsive Design Principles, SEO Best Practices' },
            { label: 'Portfolio:', text: 'straydesign.co. Case studies showcasing user research, wireframes, prototypes, and business-centered design thinking' },
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
