'use client';

import { Download, Mail, ExternalLink } from 'lucide-react';
import TextCard from './TextCard';

export default function Resume() {
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

          {/* Freelance */}
          <section className="mb-8">
            <h2 className="text-2xl mb-4" style={{ color: '#ffffff', fontWeight: 700 }}>FREELANCE</h2>
            <div className="mb-2">
              <div className="flex flex-wrap items-baseline gap-3 mb-2">
                <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>Stray Design Co. | Product & Web Design</h3>
                <span className="text-sm" style={{ color: '#a1a1a6' }}>2024 – Present</span>
              </div>
            </div>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#ffffff' }}>
              I started freelancing because I kept seeing the same thing — small businesses with real ambition stuck behind websites that didn&apos;t represent them. So I started building for them. Not templates. Not themes. Real products, designed around how they actually work.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#ffffff' }}>
              Most of my work lives in that sweet spot between design and development. I&apos;ll interview the owner, map out the user flow, design the system in Figma, and then build it — responsive, accessible, and fast. I&apos;ve designed and shipped everything from restaurant sites with online ordering to full e-commerce storefronts to mobile-first tools for people who work on their feet all day.
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#ffffff' }}>
              A few things I&apos;ve been deep in lately: building a mobile merchandising app from scratch — user research, design system, live prototype — that replaces pen-and-paper workflows with real-time inventory data. Designing and launching an AI-powered goal-setting web app. Rebuilding local business sites with proper information architecture, booking flows, and e-commerce that actually converts. Every project ships with a custom design system, not borrowed components.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#ffffff' }}>
              I care about the details — the scroll feel, the loading states, the way a card tilts when you hover it. That stuff adds up. It&apos;s the difference between &ldquo;someone made us a website&rdquo; and &ldquo;this actually feels like us.&rdquo;
            </p>
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

          {/* References */}
          <section className="mb-8">
            <p className="text-base" style={{ color: '#a1a1a6' }}>
              References available upon request · Public recommendations on LinkedIn
            </p>
          </section>
        </TextCard>
      </div>
    </div>
  );
}
