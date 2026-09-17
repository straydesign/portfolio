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
              <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: 'var(--ink)' }}>
                Thomas Sesler
              </h1>
              <div className="text-xl md:text-2xl mb-2" style={{ color: 'var(--ink)', fontWeight: 600 }}>
                Product Designer
              </div>
              <div className="text-base md:text-lg mb-4" style={{ color: 'var(--ink-2)' }}>
                New Hampshire / Massachusetts
              </div>
              <div className="mb-5 flex justify-center">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-sm"
                  style={{ background: 'var(--out-green)', border: '1px solid rgba(var(--hairline),0.2)', color: 'var(--ink)', fontWeight: 600, borderRadius: 0 }}>
                  Open to full-time, contract, or remote
                </span>
              </div>
              <div className="mb-4 text-base flex justify-center items-center gap-2" style={{ color: 'var(--ink)' }}>
                <Mail size={16} />tom@straydesign.co
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <a href="https://www.linkedin.com/in/tom-sesler/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', fontWeight: 600, textDecoration: 'none', borderRadius: 0 }}>
                  LinkedIn <ExternalLink size={16} />
                </a>
                <a href="/Thomas_Sesler_Resume.pdf" download target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)', fontWeight: 600, textDecoration: 'none', borderRadius: 0 }}>
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
              <h2 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>News Corp &mdash; Externship Program</h2>
              <div className="text-base" style={{ color: 'var(--ink-2)' }}>Product Strategy Extern</div>
              <div className="text-sm" style={{ color: 'var(--ink-2)' }}>February 2026 &ndash; April 2026 &middot; Remote</div>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: 'var(--ink)' }}>
              <li>Remote, project-based externship focused on algorithm-driven features for digital news products</li>
              <li>Translated algorithmic concepts into UX deliverables and explored how automated systems shape user trust and engagement</li>
              <li>Produced a final project presentation articulating design decisions and tradeoffs</li>
            </ul>
          </TextCard>
        </NavigableSection>

        {/* TikTok */}
        <NavigableSection id="resume-tiktok" label="TikTok">
          <TextCard padding="lg">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>TikTok / Sapphire Studios &mdash; Externship Program</h2>
              <div className="text-base" style={{ color: 'var(--ink-2)' }}>Brand &amp; Content Strategy Extern</div>
              <div className="text-sm" style={{ color: 'var(--ink-2)' }}>January 2026 &ndash; February 2026 &middot; Remote</div>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: 'var(--ink)' }}>
              <li>Remote, project-based externship developing brand-voice frameworks and visual identity systems with reusable templates and content grids</li>
              <li>Applied design-system thinking for cross-platform consistency across Instagram and TikTok — caption frameworks and content templates</li>
              <li>Synthesized the work into a Brand Voice &amp; Content Playbook as the program capstone</li>
            </ul>
          </TextCard>
        </NavigableSection>

        {/* Freelance */}
        <NavigableSection id="resume-freelance" label="Freelance">
          <TextCard padding="lg">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>Freelance Product &amp; Web Designer &mdash; Stray Design</h2>
              <div className="text-sm" style={{ color: 'var(--ink-2)' }}>May 2025 &ndash; Present &middot; Remote</div>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: 'var(--ink)' }}>
              <li>Design client websites end-to-end in Figma — discovery, custom design systems, component libraries — then build and ship them as live sites</li>
              <li>Build custom, easy-to-use content-management back ends so non-technical business owners can update their own sites without technical help</li>
              <li>Maintain client sites &mdash; Andy&apos;s (bar &amp; grill), Bullfrog (bar), and Sea Cave (aquatics retail) &mdash; with a combined 2,500+ users and 50,000+ Google search impressions a month (Sea Cave alone: ~25,000)</li>
              <li>Produced 15+ complete spec-pitch site concepts for local businesses across hospitality, retail, and services, controlling design and build end-to-end</li>
              <li>Also design and build my own products, including MIDDLEMAN &mdash; a merchandising and inventory system for beer distributors</li>
            </ul>
          </TextCard>
        </NavigableSection>

        {/* Design Lab */}
        <NavigableSection id="resume-designlab" label="Design Lab">
          <TextCard padding="lg">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>Design Lab Technical Assistant</h2>
              <div className="text-base" style={{ color: 'var(--ink-2)' }}>UNH Paul Creative Arts Center</div>
              <div className="text-sm" style={{ color: 'var(--ink-2)' }}>August 2023 &ndash; May 2024 &middot; Durham, NH</div>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: 'var(--ink)' }}>
              <li>Helped students with Adobe Creative Suite (Photoshop, Illustrator, InDesign) and project-design questions during open lab hours</li>
            </ul>
          </TextCard>
        </NavigableSection>

        {/* NH Distributors */}
        <NavigableSection id="resume-nhdist" label="NH Distributors">
          <TextCard padding="lg">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>Merchandiser</h2>
              <div className="text-base" style={{ color: 'var(--ink-2)' }}>New Hampshire Distributors</div>
              <div className="text-sm" style={{ color: 'var(--ink-2)' }}>June 2024 &ndash; May 2025 &middot; Rochester, NH</div>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-base" style={{ color: 'var(--ink)' }}>
              <li>Stocked and merchandised beer product across retail accounts</li>
              <li>Hands-on retail experience that inspired the concept for MIDDLEMAN</li>
            </ul>
          </TextCard>
        </NavigableSection>

        {/* Education */}
        <NavigableSection id="resume-education" label="Education">
          <TextCard padding="lg">
            <div className="text-center">
              <h2 className="text-lg font-semibold" style={{ color: 'var(--ink)' }}>
                B.S. Marketing
              </h2>
              <div className="text-base" style={{ color: 'var(--ink-2)' }}>University of New Hampshire | Durham, NH</div>
              <div className="text-sm" style={{ color: 'var(--ink-2)' }}>August 2021 – May 2025</div>
            </div>
          </TextCard>
        </NavigableSection>

        {/* References */}
        <NavigableSection id="resume-references" label="References">
          <TextCard padding="lg">
            <p className="text-base text-center" style={{ color: 'var(--ink-2)' }}>
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
