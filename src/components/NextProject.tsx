'use client';

import PhoneMockup from './PhoneMockup';
import AnimateIn from './AnimateIn';
import { PROJECTS, type Page } from '@/data/projects';

interface NextProjectProps {
  currentProjectId: Page;
  onNavigate: (page: Page) => void;
}

export default function NextProject({ currentProjectId, onNavigate }: NextProjectProps) {
  const otherProjects = PROJECTS.filter((p) => p.id !== currentProjectId);

  return (
    <AnimateIn direction="up" className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[90rem] mx-auto">
        <p
          className="text-xs font-bold tracking-widest mb-6 uppercase text-center"
          style={{ color: '#ffffff' }}
        >
          MORE WORK
        </p>

        {/* Project name buttons — spread wide, keyboard navigable */}
        <div
          className="flex justify-center gap-3 md:gap-6 mb-10"
          role="navigation"
          aria-label="Other projects"
        >
          {otherProjects.map((project, i) => (
            <button
              key={project.id}
              onClick={() => onNavigate(project.id)}
              tabIndex={0}
              aria-label={`View ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                  if (next) next.focus();
                }
                if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const prev = e.currentTarget.previousElementSibling as HTMLElement | null;
                  if (prev) prev.focus();
                }
              }}
              className="px-6 py-3 text-xs md:text-sm font-bold tracking-widest uppercase transition-all hover:scale-105 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
            >
              {project.title}
            </button>
          ))}
        </div>

        {/* Phone mockups only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="flex justify-center cursor-pointer"
              onClick={() => onNavigate(project.id)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate(project.id); } }}
            >
              <div className="w-[200px] md:w-[240px]">
                <PhoneMockup
                  screenshot={project.screenshot}
                  gradientFrom={project.gradientFrom ?? '#888888'}
                  gradientTo={project.gradientTo ?? '#000000'}
                  alt={project.alt}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
