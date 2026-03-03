'use client';

import { Mail, Phone, ExternalLink, Star, Linkedin } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import MiddlemanLogo from './MiddlemanLogo';
import LiteYouTube from './LiteYouTube';

type Page = 'home' | 'about' | 'work' | 'resume' | 'middleman-case-study' | 'day-one-case-study' | 'doordash-case-study' | 'design-system' | 'services';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const buttonPrimaryColor = cardStyles.getButtonPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);
  const cardBg = theme === 'dark' ? '#1a1a1a' : '#ffffff';
  const cardBorder = `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`;
  const cardShadow = theme === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3)' : '0 4px 16px 0 rgba(0, 0, 0, 0.12)';
  const badgeBg = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const badgeText = theme === 'dark' ? '#ffffff' : '#1d1d1f';

  const buttonTextColor = (accentColor === 'bw' && theme === 'dark') ? '#ffffff'
    : (accentColor === 'bw' && theme === 'light') ? '#000000'
    : (accentColor === 'yellow' || accentColor === 'tan') ? '#000000'
    : '#ffffff';

  const viewButtonStyle = {
    backgroundColor: buttonPrimaryColor,
    color: buttonTextColor,
    border: `2px solid ${buttonPrimaryColor}`,
  };

  return (
    <div className="min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">
      {/* HERO SECTION */}
      <div className="relative px-6 md:px-16 pt-8 md:pt-12 pb-8 md:pb-12 flex justify-center items-start">
        <div className="rounded-[48px] p-6 md:p-10 w-full max-w-7xl" style={{ background: cardBg, border: cardBorder, boxShadow: cardShadow }}>
          <div className="mb-2">
            <p className="text-[15px] md:text-[17px] font-medium" style={{ color: textColor }}>Tom Sesler</p>
          </div>
          <div className="mb-4 md:mb-6">
            <h1 className="text-[48px] sm:text-[60px] md:text-[72px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", WebkitTextStroke: `4px ${primaryColor}`, WebkitTextFillColor: 'transparent', color: 'transparent', paintOrder: 'stroke fill' }}>
              PRODUCT DESIGNER
            </h1>
          </div>
          <div className="mb-6 md:mb-8">
            <p className="text-[20px] md:text-[24px]" style={{ color: primaryColor, fontWeight: 600 }}>I design it, then I build it.</p>
          </div>
          <div>
            <p className="text-[15px] md:text-[17px] leading-snug" style={{ color: textColor }}>
              From ethnographic field research to interactive Figma prototypes to live products. Marketing background means I design for users and business outcomes — closing the gap between design intent and what actually ships.
            </p>
            <p className="text-[13px] md:text-[15px] mt-4 leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
              New Hampshire / Massachusetts — open to full-time, contract, or remote
            </p>
          </div>
          <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 md:gap-4">
            {[
              { icon: Phone, label: 'Phone', href: 'tel:+18149640081' },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tom-sesler/' },
              { icon: Mail, label: 'Email', href: 'mailto:tlsesler44@gmail.com' },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105"
                style={{ backgroundColor: badgeBg, color: badgeText }}>
                <link.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* WORK SECTION */}
      <div id="work" className="px-6 md:px-12 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[48px] md:text-[80px] mb-8 md:mb-12 leading-none tracking-wider font-black"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}>
            MY WORK
          </h2>

          <div className="space-y-8 md:space-y-12">
            {/* Project 1 — Merchandising System (LEFT) */}
            <div className="flex justify-start">
              <div className="rounded-[48px] p-6 md:p-8 cursor-pointer transition-transform hover:scale-[1.02] w-full md:w-[60%]"
                role="link" tabIndex={0} aria-label="View Merchandising System case study"
                onClick={() => setCurrentPage('middleman-case-study')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCurrentPage('middleman-case-study'); } }}
                style={{ background: cardBg, border: cardBorder, boxShadow: cardShadow }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                    style={{ backgroundColor: buttonPrimaryColor, color: buttonTextColor, border: `2px solid ${buttonPrimaryColor}` }}>
                    <Star className="w-3 h-3" style={{ fill: buttonTextColor }} /> FEATURED
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl mb-3 font-bold flex items-center gap-3" style={{ color: textColor }}>
                  MERCHANDISING SYSTEM
                  <MiddlemanLogo color={primaryColor} className="w-16 md:w-20 h-auto" />
                </h3>
                <p className="text-base md:text-lg mb-4 font-semibold tracking-wide" style={{ color: primaryColor }}>
                  Mobile app design to reduce retail stock-outs using real-time POS data.
                </p>
                <div className="mb-4">
                  <LiteYouTube
                    videoId="TQagpOFdQpM"
                    title="Merchandising System Demo"
                    borderColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['UX Design', 'Prototyping', 'Systems'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: badgeBg, color: badgeText }}>{tag}</span>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={(e) => { e.stopPropagation(); setCurrentPage('middleman-case-study'); }}
                    className="w-full px-4 py-2.5 rounded-full text-sm transition-all hover:scale-105 font-bold"
                    style={viewButtonStyle}>
                    View Project
                  </button>
                  <a href="https://middleman.quest" target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-4 py-2 rounded-full text-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                    style={{ backgroundColor: badgeBg, color: badgeText }}>
                    <ExternalLink className="w-4 h-4" /> Prototype
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 — DoorDash (RIGHT) */}
            <div className="flex justify-end">
              <div className="rounded-[48px] p-6 md:p-8 cursor-pointer transition-transform hover:scale-[1.02] w-full md:w-[60%]"
                role="link" tabIndex={0} aria-label="View DoorDash UX evaluation case study"
                onClick={() => setCurrentPage('doordash-case-study')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCurrentPage('doordash-case-study'); } }}
                style={{ background: cardBg, border: cardBorder, boxShadow: cardShadow }}>
                <h3 className="text-2xl md:text-3xl mb-3 font-bold" style={{ color: textColor }}>DOORDASH DASHER APP</h3>
                <p className="text-base md:text-lg mb-4 font-semibold tracking-wide" style={{ color: primaryColor }}>
                  Ethnographic UX research across 1,000+ deliveries with five redesign proposals.
                </p>
                <p className="text-base mb-4" style={{ color: secondaryTextColor }}>
                  Error recovery analysis using Nielsen&apos;s heuristics. Each proposal preserves business goals while improving driver safety.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['UX Research', 'Heuristic Evaluation', 'Mobile'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: badgeBg, color: badgeText }}>{tag}</span>
                  ))}
                </div>
                <button onClick={(e) => { e.stopPropagation(); setCurrentPage('doordash-case-study'); }}
                  className="w-full px-4 py-2.5 rounded-full text-sm transition-all hover:scale-105 font-bold"
                  style={viewButtonStyle}>
                  View Project
                </button>
              </div>
            </div>

            {/* Project 3 — FirstDay.Life (LEFT) */}
            <div className="flex justify-start">
              <div className="rounded-[48px] p-6 md:p-8 cursor-pointer transition-transform hover:scale-[1.02] w-full md:w-[60%]"
                role="link" tabIndex={0} aria-label="View FirstDay.Life case study"
                onClick={() => setCurrentPage('day-one-case-study')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCurrentPage('day-one-case-study'); } }}
                style={{ background: cardBg, border: cardBorder, boxShadow: cardShadow }}>
                <h3 className="text-2xl md:text-3xl mb-3 font-bold" style={{ color: textColor }}>FIRSTDAY.LIFE</h3>
                <p className="text-base md:text-lg mb-4 font-semibold tracking-wide" style={{ color: primaryColor }}>
                  AI-powered goal tracker — designed, built, and shipped as a live product.
                </p>
                <div className="mb-4">
                  <LiteYouTube
                    videoId="YBzZwWGH9bs"
                    title="FirstDay.Life Demo"
                    borderColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['UX Design', 'AI', 'Shipped Product'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: badgeBg, color: badgeText }}>{tag}</span>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={(e) => { e.stopPropagation(); setCurrentPage('day-one-case-study'); }}
                    className="w-full px-4 py-2.5 rounded-full text-sm transition-all hover:scale-105 font-bold"
                    style={viewButtonStyle}>
                    View Project
                  </button>
                  <a href="https://firstday.life" target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-4 py-2 rounded-full text-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                    style={{ backgroundColor: badgeBg, color: badgeText }}>
                    <ExternalLink className="w-4 h-4" /> Visit Site
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT EXPERIENCE */}
          <h2 className="text-[36px] md:text-[56px] mt-12 md:mt-16 mb-8 md:mb-12 leading-none tracking-wider font-black"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}>
            RECENT EXPERIENCE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* News Corp */}
            <div className="rounded-[48px] p-6 md:p-8"
              style={{ background: cardBg, border: cardBorder, boxShadow: cardShadow }}>
              <h3 className="text-xl md:text-2xl mb-2 font-bold" style={{ color: textColor }}>NEWS CORP</h3>
              <p className="text-sm mb-3 font-semibold" style={{ color: primaryColor }}>Product Strategy Extern</p>
              <p className="text-base mb-4" style={{ color: secondaryTextColor }}>
                AI-driven product strategy for digital news products. Designing user surveys, translating research into feature concepts, and countering filter bubble effects.
              </p>
              <div className="flex flex-wrap gap-2">
                {['AI Product Strategy', 'User Surveys', 'Research'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: badgeBg, color: badgeText }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* TikTok */}
            <div className="rounded-[48px] p-6 md:p-8"
              style={{ background: cardBg, border: cardBorder, boxShadow: cardShadow }}>
              <h3 className="text-xl md:text-2xl mb-2 font-bold" style={{ color: textColor }}>TIKTOK / SAPPHIRE STUDIOS</h3>
              <p className="text-sm mb-3 font-semibold" style={{ color: primaryColor }}>Brand & Content Strategy Extern</p>
              <p className="text-base mb-4" style={{ color: secondaryTextColor }}>
                Brand voice frameworks and visual identity systems mentored by TikTok&apos;s Head of Agency. Delivered a client-ready Brand Voice & Content Playbook.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Brand Strategy', 'Design Systems', 'Content Strategy'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: badgeBg, color: badgeText }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
