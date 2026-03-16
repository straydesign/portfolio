'use client';

import { Mail } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import Carousel from './Carousel';
import TextCard from './TextCard';
import { PROJECTS, type Page, getProjectTypeLabel } from '@/data/projects';
import { CAROUSEL_ITEMS } from '@/data/carousel';

interface WorkProps {
  setCurrentPage: (page: Page) => void;
}

export default function Work({ setCurrentPage }: WorkProps) {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="px-6 md:px-16 pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="max-w-5xl mx-auto text-center">
          <TextCard padding="lg" className="inline-block">
            <p className="text-[15px] md:text-[17px] font-medium mb-2" style={{ color: '#a1a1a6' }}>
              Tom Sesler
            </p>
            <h1
              className="text-[64px] sm:text-[96px] md:text-[128px] leading-none tracking-wider font-black mb-4 md:mb-6"
              style={{
                fontFamily: "var(--font-family-bungee), sans-serif",
                WebkitTextStroke: '4px #ffffff',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                paintOrder: 'stroke fill',
              }}
            >
              MY WORK
            </h1>
            <p className="text-[17px] md:text-[20px] leading-relaxed max-w-2xl mx-auto" style={{ color: '#ffffff' }}>
              From ethnographic field research to interactive Figma prototypes to live products.
            </p>
          </TextCard>
        </div>
      </div>

      {/* Carousel */}
      <div className="py-6 md:py-10">
        <Carousel
          speed={40}
          direction="left"
          pauseOnHover
          items={CAROUSEL_ITEMS.map((item) => (
            <video
              key={item.src}
              src={item.src}
              className="h-44 md:h-56 w-44 md:w-56 object-cover aspect-square shadow-lg transition-transform duration-300 hover:scale-[1.03]"
              style={{ borderRadius: 0 }}
              autoPlay
              loop
              muted
              playsInline
              aria-label={item.alt}
            />
          ))}
        />
      </div>

      {/* Projects */}
      <div className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className="mb-16 md:mb-20 last:mb-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-sm"
              style={{ borderBottom: i < PROJECTS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', paddingBottom: i < PROJECTS.length - 1 ? '4rem' : 0 }}
              onClick={() => setCurrentPage(project.id)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCurrentPage(project.id); } }}
            >
              <TextCard padding="md" className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#ffffff' }}>
                  {project.title}
                </h2>
                <p className="text-base md:text-lg mb-2 leading-relaxed" style={{ color: '#ffffff' }}>
                  {project.description}
                </p>
                <p className="text-sm font-semibold" style={{ color: '#ffffff' }}>
                  {project.deliverable}
                </p>
              </TextCard>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-full sm:w-[280px] flex-shrink-0">
                  <PhoneMockup
                    screenshot={project.screenshot}
                    gradientFrom={project.gradientFrom ?? '#888888'}
                    gradientTo={project.gradientTo ?? '#000000'}
                    alt={project.alt}
                    introVideoSrc={project.introVideoSrc}
                  />
                </div>
                <div className="pt-2">
                  <span
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-80"
                    style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
                  >
                    View {getProjectTypeLabel(project.type)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-md mx-auto text-center">
          <TextCard padding="lg">
            <h2
              className="text-[32px] md:text-[48px] leading-none tracking-wider font-black mb-4"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
            >
              GET IN TOUCH
            </h2>
            <p className="text-base mb-8" style={{ color: '#a1a1a6' }}>
              Interested in working together? Drop me a line.
            </p>
            <a
              href="mailto:tom@straydesign.co"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold transition-opacity hover:opacity-80"
              style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
            >
              <Mail className="w-4 h-4" />
              tom@straydesign.co
            </a>
          </TextCard>
        </div>
      </div>

      {/* Bottom spacer — extra room for background interaction */}
      <div className="h-[60vh] md:h-[80vh]" />
    </div>
  );
}
