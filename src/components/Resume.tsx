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

          {/* Professional Experience */}
          <section className="mb-8">
            <h2 className="text-2xl mb-6" style={{ color: '#ffffff', fontWeight: 700 }}>PROFESSIONAL EXPERIENCE</h2>

            {/* News Corp */}
            <div className="mb-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>Product Strategy Extern</h3>
                <span className="text-base" style={{ color: '#a1a1a6' }}>News Corp &middot; Extern Program</span>
              </div>
              <div className="text-sm mb-3" style={{ color: '#a1a1a6' }}>February 2026 &ndash; Present &middot; Remote</div>
              <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: '#ffffff' }}>
                <li>Completing an 8-week externship focused on AI-driven product strategy for News Corp&apos;s digital news products, with work reviewed by company leadership and opportunities to present design recommendations directly</li>
                <li>Designing and deploying user surveys to investigate how algorithmic feeds shape trust and engagement, then translating research findings into actionable product feature concepts</li>
                <li>Designed an AI feature concept aimed at presenting balanced perspectives in news content to counter filter bubble effects, informed by user research and behavioral patterns</li>
              </ul>
            </div>

            {/* TikTok / Sapphire Studios */}
            <div className="mb-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>Brand &amp; Content Strategy Extern</h3>
                <span className="text-base" style={{ color: '#a1a1a6' }}>TikTok / Sapphire Studios &middot; Extern Program</span>
              </div>
              <div className="text-sm mb-3" style={{ color: '#a1a1a6' }}>January 2026 &ndash; February 2026 &middot; Remote</div>
              <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: '#ffffff' }}>
                <li>Completed a 4-week brand strategy externship mentored by TikTok&apos;s Head of Agency, developing brand voice frameworks and visual identity systems with reusable templates and content grids</li>
                <li>Applied design system thinking to ensure cross-platform consistency across Instagram and TikTok, creating systematic caption frameworks and content templates</li>
                <li>Designed a structured conversation feature inspired by research in Supercommunicators, exploring how platform design can encourage more constructive dialogue between users</li>
                <li>Synthesized all work into a client-ready Brand Voice &amp; Content Playbook, presenting design decisions and strategy to reviewers</li>
              </ul>
            </div>

            {/* Freelance */}
            <div className="mb-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>UX/UI Designer (Freelance)</h3>
              </div>
              <div className="text-sm mb-3" style={{ color: '#a1a1a6' }}>May 2025 &ndash; Present &middot; Remote</div>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#ffffff' }}>
                I started freelancing because I kept seeing the same thing — small businesses with real ambition stuck behind websites that didn&apos;t represent them. So I started building for them. Not templates. Not themes. Real products, designed around how they actually work.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#ffffff' }}>
                Most of my work lives in that sweet spot between design and development. I interview the owner, map out the user flow, design the system in Figma, and then build it — responsive, accessible, and fast. I&apos;ve shipped everything from restaurant sites with online ordering to full e-commerce storefronts to mobile-first tools for people who work on their feet all day.
              </p>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#ffffff' }}>
                I care about the details — the scroll feel, the loading states, the way a card tilts when you hover it. That stuff adds up. It&apos;s the difference between &ldquo;someone made us a website&rdquo; and &ldquo;this actually feels like us.&rdquo;
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#ffffff' }}>
                My workflow bridges design and engineering — I use Figma with the MCP integration in Claude Code to go from design to production in a single pass. Design tokens, component specs, and responsive layouts move directly from Figma into code without handoff friction.
              </p>
            </div>

            {/* Design Lab */}
            <div className="mb-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>Design Lab Technical Assistant</h3>
                <span className="text-base" style={{ color: '#a1a1a6' }}>UNH Paul Creative Arts Center</span>
              </div>
              <div className="text-sm mb-3" style={{ color: '#a1a1a6' }}>August 2023 &ndash; May 2024 &middot; Durham, NH</div>
              <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: '#ffffff' }}>
                <li>Supported 50+ students with Adobe Creative Suite workflows, mentoring on visual design principles including hierarchy, typography, and color theory</li>
                <li>Troubleshot technical issues across file preparation, print production, and digital asset management workflows</li>
              </ul>
            </div>

            {/* NH Distributors */}
            <div className="mb-6">
              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>Merchandiser</h3>
                <span className="text-base" style={{ color: '#a1a1a6' }}>New Hampshire Distributors</span>
              </div>
              <div className="text-sm mb-3" style={{ color: '#a1a1a6' }}>January 2024 &ndash; May 2025 &middot; Rochester, NH</div>
              <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: '#ffffff' }}>
                <li>Executed strategic product placement across 15+ retail accounts, developing understanding of operational workflows and user pain points in high-volume environments</li>
              </ul>
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
