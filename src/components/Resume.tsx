'use client';

import { Download, Mail, ExternalLink } from 'lucide-react';
import TextCard from './TextCard';
import { type Page } from '@/data/projects';

interface ResumeProps {
  setCurrentPage?: (page: Page) => void;
}

export default function Resume({ setCurrentPage }: ResumeProps) {
  return (
    <div className="px-6 md:px-12 py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">
      <div className="max-w-7xl mx-auto">
        <TextCard padding="lg">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-family-bungee), sans-serif", fontWeight: 400, color: '#ffffff' }}>
              Thomas Sesler
            </h1>
            <div className="text-xl md:text-2xl mb-2" style={{ color: '#ffffff', fontWeight: 600 }}>
              Product Designer
            </div>
            <div className="text-base md:text-lg mb-3" style={{ color: '#a1a1a6' }}>
              New Hampshire / Massachusetts. Open to full-time, contract, or remote
            </div>
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm"
                style={{ background: '#064e3b', border: '1px solid #34d399', color: '#34d399', fontWeight: 600, borderRadius: 0 }}>
                Available immediately
              </span>
            </div>
            <div className="mb-2 text-base" style={{ color: '#ffffff' }}>
              <Mail size={16} className="inline mr-2" />tom@straydesign.co
            </div>
            <div className="flex gap-3 flex-wrap mb-6">
              <a href="https://www.linkedin.com/in/tom-sesler/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
                style={{ backgroundColor: '#ffffff', color: '#000000', fontWeight: 600, textDecoration: 'none', borderRadius: 0 }}>
                LinkedIn <ExternalLink size={16} />
              </a>
              <a href="https://docs.google.com/document/d/1kTxSO1ZNzDd9DeFBos4rUYLo0tUII7KU/edit?usp=sharing&ouid=113634400728522442808&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
                style={{ backgroundColor: '#ffffff', color: '#000000', fontWeight: 600, textDecoration: 'none', borderRadius: 0 }}>
                <Download size={16} /> Download Resume
              </a>
            </div>
          </div>

          <div className="mb-8" style={{ borderTop: '2px solid rgba(255, 255, 255, 0.12)' }} />

          {/* Professional Summary */}
          <section className="mb-8">
            <h2 className="text-2xl mb-4" style={{ color: '#ffffff', fontWeight: 700 }}>PROFESSIONAL SUMMARY</h2>
            <p className="text-base leading-relaxed" style={{ color: '#ffffff' }}>
              Product Designer with a marketing background that informs user-centered, business-driven design decisions across web and mobile platforms. Proficient in Figma with hands-on experience creating wireframes, mockups, prototypes, and flow diagrams for cloud-based applications grounded in design systems. Experienced collaborating with cross-functional teams and clearly articulating design rationale. Strong foundation in user research, usability testing, and information architecture, with a focus on designing intuitive experiences that reduce complexity for users in high-stakes or time-sensitive contexts.
            </p>
          </section>

          <div className="mb-8" style={{ borderTop: '2px solid rgba(255, 255, 255, 0.12)' }} />

          {/* Design Projects */}
          <section className="mb-8">
            <h2 className="text-2xl mb-4" style={{ color: '#ffffff', fontWeight: 700 }}>DESIGN PROJECTS</h2>

            {/* Middleman */}
            <div className="mb-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>POS-Driven Merchandiser App | Mobile Product Design</h3>
                <span className="text-sm" style={{ color: '#a1a1a6' }}>June 2025 – August 2025</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 mb-3 text-base" style={{ color: '#ffffff' }}>
                <li>Designed a mobile-first application to reduce retail stock-outs by integrating real-time POS data with merchandiser workflows, with significant focus on information architecture for complex operational data</li>
                <li>Conducted user interviews to map workflows and identify pain points, then iterated from low-fidelity wireframes through interactive high-fidelity Figma prototypes</li>
                <li>Built a component-based design system with reusable UI elements, ensuring visual consistency, WCAG 2.1 Level AA compliance, and clean file organization for developer handoff</li>
                <li>Designed data visualization interfaces that presented complex operational metrics in clear, actionable formats for users in fast-paced environments</li>
                <li>Conducted usability testing with target users, incorporating feedback through rapid design iterations to improve task completion rates</li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-2">
                {['User Research', 'Figma Prototyping', 'Design System', 'Usability Testing', 'Data Visualization'].map(s => (
                  <span key={s} className="px-3 py-1 text-sm" style={{ background: '#111111', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', borderRadius: 0 }}>{s}</span>
                ))}
              </div>
              {setCurrentPage && (
                <button onClick={() => setCurrentPage('middleman-case-study')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm transition-all hover:scale-105"
                  style={{ background: '#111111', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', borderRadius: 0 }}>
                  View Case Study <ExternalLink size={14} />
                </button>
              )}
            </div>

            {/* FirstDay */}
            <div className="mb-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>firstday.life | AI-Powered Web Application</h3>
                <span className="text-sm" style={{ color: '#a1a1a6' }}>June 2025 – August 2025 | Live Product</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 mb-3 text-base" style={{ color: '#ffffff' }}>
                <li>Built and publicly launched an AI-powered web app that generates personalized 30-day self-improvement plans delivered in 7-day sprints, guiding users through structured goals in a supportive, step-by-step format</li>
                <li>Researched competitive wellness and productivity tools through comparative analysis to identify market gaps and unmet user needs</li>
                <li>Created a responsive, mobile-first interface in Figma with systematic breakpoint considerations, ensuring WCAG 2.1 Level AA compliance</li>
                <li>Gathered user feedback post-launch to drive iterative design improvements</li>
              </ul>
              <div className="flex flex-wrap gap-2 mb-2">
                {['Competitive Analysis', 'Responsive Design', 'Shipped Product', 'WCAG 2.1'].map(s => (
                  <span key={s} className="px-3 py-1 text-sm" style={{ background: '#111111', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', borderRadius: 0 }}>{s}</span>
                ))}
              </div>
              {setCurrentPage && (
                <button onClick={() => setCurrentPage('day-one-case-study')}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm transition-all hover:scale-105"
                  style={{ background: '#111111', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#ffffff', borderRadius: 0 }}>
                  View Case Study <ExternalLink size={14} />
                </button>
              )}
            </div>

          </section>

          <div className="mb-8" style={{ borderTop: '2px solid rgba(255, 255, 255, 0.12)' }} />

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl mb-4" style={{ color: '#ffffff', fontWeight: 700 }}>EDUCATION</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>
                Bachelor of Science in Business Administration, Marketing
              </h3>
              <div className="text-base" style={{ color: '#a1a1a6' }}>University of New Hampshire | Durham, NH</div>
              <div className="text-sm" style={{ color: '#a1a1a6' }}>August 2021 – May 2025</div>
            </div>
          </section>

          <div className="mb-8" style={{ borderTop: '2px solid rgba(255, 255, 255, 0.12)' }} />

          {/* Technical Skills */}
          <section className="mb-8">
            <h2 className="text-2xl mb-4" style={{ color: '#ffffff', fontWeight: 700 }}>TECHNICAL SKILLS & TOOLS</h2>
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
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#ffffff' }}>{label}</h3>
                <p className="text-base leading-relaxed" style={{ color: '#a1a1a6' }}>{text}</p>
              </div>
            ))}
          </section>
        </TextCard>
      </div>
    </div>
  );
}
