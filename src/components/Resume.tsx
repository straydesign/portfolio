'use client';

import { Download, Mail, ExternalLink } from 'lucide-react';
import TextCard from './TextCard';
import { NavigableSection } from './NavigableSection';

export default function Resume() {
  return (
    <div className="px-6 md:px-12 py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <NavigableSection id="resume-header" label="Header">
          <TextCard padding="lg">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-family-bungee), sans-serif", fontWeight: 400, color: '#ffffff' }}>
                Thomas Sesler
              </h1>
              <div className="text-xl md:text-2xl mb-2" style={{ color: '#ffffff', fontWeight: 600 }}>
                Product Designer
              </div>
              <div className="text-base md:text-lg mb-4" style={{ color: '#a1a1a6' }}>
                New Hampshire / Massachusetts
              </div>
              <div className="mb-5 flex justify-center">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm"
                  style={{ background: '#064e3b', border: '1px solid #34d399', color: '#34d399', fontWeight: 600, borderRadius: 0 }}>
                  Open to full-time, contract, or remote
                </span>
              </div>
              <div className="mb-4 text-base flex justify-center items-center gap-2" style={{ color: '#ffffff' }}>
                <Mail size={16} />tom@straydesign.co
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
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
          </TextCard>
        </NavigableSection>

        {/* News Corp */}
        <NavigableSection id="resume-newscorp" label="News Corp">
          <TextCard padding="lg">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>News Corp &mdash; Extern Program</h3>
              <div className="text-base" style={{ color: '#a1a1a6' }}>Product Strategy Extern</div>
              <div className="text-sm" style={{ color: '#a1a1a6' }}>February 2026 &ndash; Present &middot; Remote</div>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: '#ffffff' }}>
              <li>Completing an 8-week externship focused on AI-driven product strategy for News Corp&apos;s digital news products, with work reviewed by company leadership and opportunities to present design recommendations directly</li>
              <li>Designing and deploying user surveys to investigate how algorithmic feeds shape trust and engagement, then translating research findings into actionable product feature concepts</li>
              <li>Designed an AI feature concept aimed at presenting balanced perspectives in news content to counter filter bubble effects, informed by user research and behavioral patterns</li>
            </ul>
          </TextCard>
        </NavigableSection>

        {/* TikTok */}
        <NavigableSection id="resume-tiktok" label="TikTok">
          <TextCard padding="lg">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>TikTok / Sapphire Studios &mdash; Extern Program</h3>
              <div className="text-base" style={{ color: '#a1a1a6' }}>Brand &amp; Content Strategy Extern</div>
              <div className="text-sm" style={{ color: '#a1a1a6' }}>January 2026 &ndash; February 2026 &middot; Remote</div>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: '#ffffff' }}>
              <li>Completed a 4-week brand strategy externship mentored by TikTok&apos;s Head of Agency, developing brand voice frameworks and visual identity systems with reusable templates and content grids</li>
              <li>Applied design system thinking to ensure cross-platform consistency across Instagram and TikTok, creating systematic caption frameworks and content templates</li>
              <li>Designed a structured conversation feature inspired by research in Supercommunicators, exploring how platform design can encourage more constructive dialogue between users</li>
              <li>Synthesized all work into a client-ready Brand Voice &amp; Content Playbook, presenting design decisions and strategy to reviewers</li>
            </ul>
          </TextCard>
        </NavigableSection>

        {/* Freelance */}
        <NavigableSection id="resume-freelance" label="Freelance">
          <TextCard padding="lg">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>UX/UI Designer (Freelance)</h3>
              <div className="text-sm" style={{ color: '#a1a1a6' }}>May 2025 &ndash; Present &middot; Remote</div>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: '#ffffff' }}>
              <li>Designed and shipped 6+ client projects end-to-end — user research, Figma prototypes, custom design systems, and production code (Next.js, React, Tailwind)</li>
              <li>Built a real-time inventory management app (MIDDLEMAN) with 10-product stock dashboard, risk scoring, and delivery tracking — designed to reduce manual stockout checks</li>
              <li>Designed and launched an AI-powered 7-day sprint goal-tracking app (First Day) with 30+ unique screens, AI-generated weekly plans, and an iterative feedback loop that adapts each new sprint</li>
              <li>Achieved sub-2s load times and 90+ Lighthouse scores across all client sites through image optimization, code splitting, and semantic HTML</li>
              <li>Built a design-to-code pipeline that cut handoff time from hours to minutes</li>
              <li>Delivered e-commerce, restaurant ordering, and service booking sites for small businesses — each with a custom design system, not borrowed templates</li>
            </ul>
          </TextCard>
        </NavigableSection>

        {/* Design Lab */}
        <NavigableSection id="resume-designlab" label="Design Lab">
          <TextCard padding="lg">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>Design Lab Technical Assistant</h3>
              <div className="text-base" style={{ color: '#a1a1a6' }}>UNH Paul Creative Arts Center</div>
              <div className="text-sm" style={{ color: '#a1a1a6' }}>August 2023 &ndash; May 2024 &middot; Durham, NH</div>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: '#ffffff' }}>
              <li>Supported 50+ students with Adobe Creative Suite workflows, mentoring on visual design principles including hierarchy, typography, and color theory</li>
              <li>Troubleshot technical issues across file preparation, print production, and digital asset management workflows</li>
            </ul>
          </TextCard>
        </NavigableSection>

        {/* NH Distributors */}
        <NavigableSection id="resume-nhdist" label="NH Distributors">
          <TextCard padding="lg">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>Merchandiser</h3>
              <div className="text-base" style={{ color: '#a1a1a6' }}>New Hampshire Distributors</div>
              <div className="text-sm" style={{ color: '#a1a1a6' }}>January 2024 &ndash; May 2025 &middot; Rochester, NH</div>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: '#ffffff' }}>
              <li>Managed inventory across 15+ retail locations, maintaining optimal stock levels and shelf presentation</li>
            </ul>
          </TextCard>
        </NavigableSection>

        {/* Education */}
        <NavigableSection id="resume-education" label="Education">
          <TextCard padding="lg">
            <div className="text-center">
              <h3 className="text-lg font-semibold" style={{ color: '#ffffff' }}>
                Bachelor of Science in Business Administration, Marketing
              </h3>
              <div className="text-base" style={{ color: '#a1a1a6' }}>University of New Hampshire | Durham, NH</div>
              <div className="text-sm" style={{ color: '#a1a1a6' }}>August 2021 – May 2025</div>
            </div>
          </TextCard>
        </NavigableSection>

        {/* References */}
        <NavigableSection id="resume-references" label="References">
          <TextCard padding="lg">
            <p className="text-base text-center" style={{ color: '#a1a1a6' }}>
              References available upon request · Public recommendations on LinkedIn
            </p>
          </TextCard>
        </NavigableSection>

      </div>
      {/* Footer spacer */}
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
