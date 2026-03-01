'use client';

import { useState } from 'react';
import { Mail, Phone, ExternalLink, Star, Linkedin } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import MiddlemanLogo from './MiddlemanLogo';
import LiteYouTube from './LiteYouTube';

type Page = 'home' | 'about' | 'work' | 'resume' | 'middleman-case-study' | 'day-one-case-study' | 'doordash-case-study' | 'design-system';

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

  const projects = [
    {
      id: 1, title: 'MERCHANDISING SYSTEM',
      description: 'USER EXPERIENCE DESIGN AND MOBILE PROTOTYPE DEVELOPMENT',
      tags: ['UX Design', 'Prototyping', 'Systems'],
      prototypeLink: 'https://ignite-keep-18329804.figma.site',
    },
    {
      id: 5, title: 'FIRSTDAY.LIFE',
      description: 'AI-powered goal tracker that turns visions into achievable daily actions through personalized calendars.',
      tags: ['UX Design', 'AI', 'Concept'],
      link: 'https://firstday.life',
    },
    {
      id: 6, title: 'DOORDASH DASHER APP',
      description: 'UX CASE STUDY — ERROR RECOVERY IN GIG DELIVERY',
      tags: ['UX Research', 'Heuristic Evaluation', 'Mobile'],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">
      {/* HERO SECTION */}
      <div className="relative px-6 md:px-16 pt-8 md:pt-12 pb-8 md:pb-12 flex justify-center items-start">
        <div className="rounded-[48px] p-6 md:p-10 w-full max-w-7xl" style={{ background: cardBg, border: cardBorder, boxShadow: cardShadow }}>
          <div className="mb-4 md:mb-6">
            <h1 className="text-[48px] sm:text-[60px] md:text-[72px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", WebkitTextStroke: `4px ${primaryColor}`, WebkitTextFillColor: 'transparent', color: 'transparent', paintOrder: 'stroke fill' }}>
              HELLO, I&apos;M TOM!
            </h1>
          </div>
          <div className="mb-6 md:mb-8">
            <p className="text-[20px] md:text-[24px]" style={{ color: primaryColor }}>UX/UI Product Designer</p>
          </div>
          <div>
            <p className="text-[15px] md:text-[17px] leading-snug" style={{ color: textColor }}>
              UX Designer focused on understanding context and solving real problems. I care about creating solutions that drive meaningful change.
            </p>
            <p className="text-[14px] md:text-[16px] mt-4 leading-relaxed" style={{ color: primaryColor, fontWeight: 500 }}>
              If you&apos;re here looking for web design, I can also help create customer-focused visual sites to engage your audience and promote your brand.
            </p>
            <p className="text-[13px] md:text-[15px] mt-4 leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
              Looking for remote positions or in New Hampshire/Massachusetts
            </p>
          </div>
          <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-3 md:gap-4">
            {[
              { icon: Phone, label: 'Phone', href: 'tel:+18149640081' },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/tom-sesler/' },
              { icon: Mail, label: 'Email', href: 'mailto:Tlsesler44@gmail.com' },
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
            {/* Project 1 - LEFT */}
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
                  {projects[0].description}
                </p>
                <div className="mb-4">
                  <LiteYouTube
                    videoId="TQagpOFdQpM"
                    title="Merchandising System Demo"
                    borderColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[0].tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: badgeBg, color: badgeText }}>{tag}</span>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={(e) => { e.stopPropagation(); setCurrentPage('middleman-case-study'); }}
                    className="w-full px-4 py-2.5 rounded-full text-sm transition-all hover:scale-105 font-bold"
                    style={{ backgroundColor: '#000000', color: '#ffffff', border: '2px solid #ffffff' }}>
                    View Project
                  </button>
                  <a href={projects[0].prototypeLink} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-4 py-2 rounded-full text-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                    style={{ backgroundColor: badgeBg, color: badgeText }}>
                    <ExternalLink className="w-4 h-4" /> Prototype
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 - RIGHT */}
            <div className="flex justify-end">
              <div className="rounded-[48px] p-6 md:p-8 cursor-pointer transition-transform hover:scale-[1.02] w-full md:w-[60%]"
                role="link" tabIndex={0} aria-label="View FirstDay.Life case study"
                onClick={() => setCurrentPage('day-one-case-study')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCurrentPage('day-one-case-study'); } }}
                style={{ background: cardBg, border: cardBorder, boxShadow: cardShadow }}>
                <h3 className="text-2xl md:text-3xl mb-3 font-bold" style={{ color: textColor }}>FIRSTDAY.LIFE</h3>
                <p className="text-base mb-4" style={{ color: secondaryTextColor }}>
                  AI-powered goal tracker that turns visions into achievable daily actions through personalized calendars.
                </p>
                <div className="mb-4">
                  <LiteYouTube
                    videoId="YBzZwWGH9bs"
                    title="FirstDay.Life Demo"
                    borderColor={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[1].tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: badgeBg, color: badgeText }}>{tag}</span>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <button onClick={(e) => { e.stopPropagation(); setCurrentPage('day-one-case-study'); }}
                    className="w-full px-4 py-2.5 rounded-full text-sm transition-all hover:scale-105 font-bold"
                    style={{ backgroundColor: '#000000', color: '#ffffff', border: '2px solid #ffffff' }}>
                    View Project
                  </button>
                  <a href={projects[1].link} target="_blank" rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full px-4 py-2 rounded-full text-sm transition-all hover:scale-105 flex items-center justify-center gap-2"
                    style={{ backgroundColor: badgeBg, color: badgeText }}>
                    <ExternalLink className="w-4 h-4" /> Visit Site
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 - LEFT */}
            <div className="flex justify-start">
              <div className="rounded-[48px] p-6 md:p-8 cursor-pointer transition-transform hover:scale-[1.02] w-full md:w-[60%]"
                role="link" tabIndex={0} aria-label="View DoorDash Dasher App case study"
                onClick={() => setCurrentPage('doordash-case-study')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCurrentPage('doordash-case-study'); } }}
                style={{ background: cardBg, border: cardBorder, boxShadow: cardShadow }}>
                <h3 className="text-2xl md:text-3xl mb-3 font-bold" style={{ color: textColor }}>DOORDASH DASHER APP</h3>
                <p className="text-base md:text-lg mb-4 font-semibold tracking-wide" style={{ color: primaryColor }}>
                  {projects[2].description}
                </p>
                <p className="text-base mb-4" style={{ color: secondaryTextColor }}>
                  Ethnographic research from 1,000+ deliveries analyzing error recovery failures in the DoorDash Dasher app. Five redesign proposals that preserve business goals while improving driver safety.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[2].tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: badgeBg, color: badgeText }}>{tag}</span>
                  ))}
                </div>
                <button onClick={(e) => { e.stopPropagation(); setCurrentPage('doordash-case-study'); }}
                  className="w-full px-4 py-2.5 rounded-full text-sm transition-all hover:scale-105 font-bold"
                  style={{ backgroundColor: '#000000', color: '#ffffff', border: '2px solid #ffffff' }}>
                  View Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
