'use client';

import PhoneMockup from './PhoneMockup';
import AnimateIn from './AnimateIn';
import { PROJECTS, type Page } from '@/data/projects';
import { useRef } from 'react';

interface NextProjectProps {
  currentProjectId: Page;
  onNavigate: (page: Page) => void;
}

export default function NextProject({ currentProjectId, onNavigate }: NextProjectProps) {
  const otherProjects = PROJECTS.filter((p) => p.id !== currentProjectId);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <AnimateIn direction="up" className="py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-[90rem] mx-auto">
        <p
          className="text-xs font-bold tracking-widest mb-10 uppercase text-center"
          style={{ color: '#ffffff' }}
        >
          MORE WORK
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          role="navigation"
          aria-label="Other projects"
        >
          {otherProjects.map((project, i) => (
            <button
              key={project.id}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={() => onNavigate(project.id)}
              aria-label={`View ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  const next = itemRefs.current[(i + 1) % otherProjects.length];
                  if (next) next.focus();
                }
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  const prev = itemRefs.current[(i - 1 + otherProjects.length) % otherProjects.length];
                  if (prev) prev.focus();
                }
              }}
              className="flex flex-col items-center gap-6 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-sm"
            >
              <span
                className="px-6 py-3 text-xs md:text-sm font-bold tracking-widest uppercase"
                style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
              >
                {project.title}
              </span>
              <div className="w-[200px] md:w-[240px]">
                <PhoneMockup
                  screenshot={project.screenshot}
                  gradientFrom={project.gradientFrom ?? '#888888'}
                  gradientTo={project.gradientTo ?? '#000000'}
                  alt={project.alt}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
