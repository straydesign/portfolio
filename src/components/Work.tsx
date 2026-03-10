'use client';

import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import PhoneMockup from './PhoneMockup';
import ContactForm from './ContactForm';
import Carousel from './Carousel';
import { PROJECTS } from '@/data/projects';
import { CAROUSEL_ITEMS } from '@/data/carousel';

export default function Work() {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <div className="px-6 md:px-16 pt-16 md:pt-24 pb-8 md:pb-12">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[15px] md:text-[17px] font-medium mb-2" style={{ color: secondaryTextColor }}>
            Tom Sesler
          </p>
          <h1
            className="text-[48px] sm:text-[60px] md:text-[72px] leading-none tracking-wider font-black mb-4 md:mb-6"
            style={{
              fontFamily: "var(--font-family-bungee), sans-serif",
              WebkitTextStroke: `4px ${primaryColor}`,
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              paintOrder: 'stroke fill',
            }}
          >
            MY WORK
          </h1>
          <p className="text-[17px] md:text-[20px] leading-relaxed max-w-2xl mx-auto" style={{ color: textColor }}>
            From ethnographic field research to interactive Figma prototypes to live products.
          </p>
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
              className="h-44 md:h-56 w-44 md:w-56 rounded-xl object-cover aspect-square shadow-lg transition-transform duration-300 hover:scale-[1.03]"
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
              className="mb-16 md:mb-20 last:mb-0"
              style={{ borderBottom: i < PROJECTS.length - 1 ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` : 'none', paddingBottom: i < PROJECTS.length - 1 ? '4rem' : 0 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: textColor }}>
                {project.title}
              </h2>
              <p className="text-base md:text-lg mb-2 leading-relaxed" style={{ color: textColor }}>
                {project.description}
              </p>
              <p className="text-sm font-semibold mb-8" style={{ color: primaryColor }}>
                {project.deliverable}
              </p>
              <div className="max-w-md">
                <PhoneMockup
                  screenshot={project.screenshot}
                  gradientFrom={primaryColor}
                  gradientTo={theme === 'dark' ? '#000000' : '#1a1a1a'}
                  alt={project.alt}
                  introVideoSrc={project.introVideoSrc}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-md mx-auto">
          <h2
            className="text-[32px] md:text-[48px] leading-none tracking-wider font-black mb-4 text-center"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: primaryColor }}
          >
            GET IN TOUCH
          </h2>
          <p className="text-base mb-8 text-center" style={{ color: secondaryTextColor }}>
            Interested in working together? Drop me a line.
          </p>
          <ContactForm />
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
