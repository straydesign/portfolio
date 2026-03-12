'use client';

import PhoneMockup from './PhoneMockup';
import AnimateIn from './AnimateIn';
import TextCard from './TextCard';
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
          className="text-xs font-bold tracking-widest mb-10 uppercase text-center"
          style={{ color: '#ffffff' }}
        >
          MORE WORK
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col sm:flex-row items-center gap-6 cursor-pointer"
              onClick={() => onNavigate(project.id)}
              role="link"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onNavigate(project.id); } }}
            >
              <div className="w-[160px] md:w-[200px] flex-shrink-0">
                <PhoneMockup
                  screenshot={project.screenshot}
                  gradientFrom={project.gradientFrom ?? '#888888'}
                  gradientTo={project.gradientTo ?? '#000000'}
                  alt={project.alt}
                />
              </div>
              <TextCard padding="md" className="flex-1">
                <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: '#ffffff' }}>
                  {project.title}
                </h3>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: '#a1a1a6' }}>
                  {project.description}
                </p>
                <span
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: 0 }}
                >
                  View Project
                </span>
              </TextCard>
            </div>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
