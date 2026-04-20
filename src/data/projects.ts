export type Page =
  | 'home'
  | 'about'
  | 'work'
  | 'resume'
  | 'middleman-case-study'
  | 'day-one-case-study'
  | 'doordash-case-study'
  | 'guitar-player-tool'
  | 'auto-presenter-tool';

export type ProjectType = 'case-study' | 'project' | 'tool';

export interface Project {
  readonly id: Page;
  readonly title: string;
  readonly description: string;
  readonly deliverable: string;
  readonly screenshot: string;
  readonly alt: string;
  readonly slug: string;
  readonly slugAliases: readonly string[];
  readonly documentTitle: string;
  readonly type: ProjectType;
  readonly videoId?: string;
  readonly introVideoSrc?: string;
  readonly gradientFrom?: string;
  readonly gradientTo?: string;
  readonly githubUrl?: string;
  readonly context?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'middleman-case-study',
    title: 'MERCHANDISING SYSTEM',
    description: 'Bloomberg Terminal-inspired mobile app for beer merchandisers. Real-time POS data, auto-orders, shrinkage detection.',
    deliverable: 'Live prototype + Bloomberg Terminal design system',
    screenshot: '/images/middleman/dashboard.png',
    alt: 'MIDDLEMAN dashboard — risk overview and quick actions',
    slug: 'middleman',
    slugAliases: ['middleman-case-study'],
    documentTitle: 'Merchandising System Case Study | Tom Sesler',
    type: 'project',
    gradientFrom: '#888888',
    gradientTo: '#000000',
  },
  {
    id: 'day-one-case-study',
    title: 'FIRSTDAY.LIFE',
    description: 'AI-powered goal tracker with iterative weekly sprints. Designed, built, and shipped as a live product.',
    deliverable: 'Live shipped product — design, engineering, AI planning',
    screenshot: '/images/firstday/hero.png',
    alt: 'FirstDay.Life app screenshot',
    slug: 'dayone',
    slugAliases: ['day-one', 'day-one-case-study'],
    documentTitle: 'firstday.life Case Study | Tom Sesler',
    type: 'project',
  },
  {
    id: 'doordash-case-study',
    title: 'DOORDASH DASHER APP UX CRITIQUE',
    description: 'Ethnographic UX research across 1,000+ deliveries with five redesign proposals.',
    deliverable: 'Heuristic evaluation + 5 redesign concepts',
    screenshot: '/images/doordash/slide6_Image_0.png',
    alt: 'DoorDash Dasher app screenshot',
    slug: 'doordash',
    slugAliases: ['doordash-case-study'],
    documentTitle: 'DoorDash UX Evaluation | Tom Sesler',
    type: 'case-study',
  },
  {
    id: 'guitar-player-tool',
    title: 'GUITAR PLAYER',
    description: 'A personal fingerpicking trainer. Lights up the next fret, slows tempo to 10%, loops sections. I built it because no practice app showed the fretboard the way I wanted.',
    deliverable: 'Personal tool — Next.js + Zustand, open source',
    screenshot: '/images/guitar-player/play-coal.png',
    alt: 'Guitar Player — fretboard view for Coal by Dylan Gossett',
    slug: 'guitar-player',
    slugAliases: [],
    documentTitle: 'Guitar Player | Tom Sesler',
    type: 'tool',
    githubUrl: 'https://github.com/straydesign/guitar-player',
    context: 'Built for me, shared as-is.',
  },
  {
    id: 'auto-presenter-tool',
    title: 'AUTO-PRESENTER',
    description: 'Desktop app that watches my slides and my script at the same time. Voice tracking advances the slide as I speak. Built because I hated switching between Keynote and a teleprompter while recording pitch videos.',
    deliverable: 'Personal tool — Electron + Claude, open source',
    screenshot: '/images/auto-presenter/setup.png',
    alt: 'Auto-Presenter setup panel — load slides, script, voice-driven advance',
    slug: 'auto-presenter',
    slugAliases: [],
    documentTitle: 'Auto-Presenter | Tom Sesler',
    type: 'tool',
    githubUrl: 'https://github.com/straydesign/auto-presenter',
    context: 'Built for me, shared as-is.',
  },
] as const;

export const STATIC_PAGES: ReadonlyMap<Page, string> = new Map([
  ['home', 'Tom Sesler — Product Designer'],
  ['about', 'About | Tom Sesler — Product Designer'],
  ['resume', 'Resume | Tom Sesler — Product Designer'],
]);

export function getPageFromPath(pathname: string): Page {
  const path = pathname.replace(/^\//, '');

  // Check static pages
  if (path === '' || path === '/') return 'home';
  const staticMatch = (['about', 'work', 'resume'] as const).find(
    (p) => p === path,
  );
  if (staticMatch) return staticMatch;

  // Check project slugs and aliases
  for (const project of PROJECTS) {
    if (path === project.slug || project.slugAliases.includes(path)) {
      return project.id;
    }
  }

  return 'home';
}

export function getPathFromPage(page: Page): string {
  if (page === 'home') return '/';

  // Check static pages
  if (STATIC_PAGES.has(page)) return `/${page}`;

  // Check projects
  const project = PROJECTS.find((p) => p.id === page);
  if (project) return `/${project.slug}`;

  return '/';
}

export function getDocumentTitle(page: Page): string {
  // Check static pages first
  const staticTitle = STATIC_PAGES.get(page);
  if (staticTitle) return staticTitle;

  // Check projects
  const project = PROJECTS.find((p) => p.id === page);
  if (project) return project.documentTitle;

  return 'Tom Sesler — Product Designer';
}

export function getProjectTypeLabel(type: ProjectType): string {
  if (type === 'case-study') return 'Case Study';
  if (type === 'tool') return 'Personal Tool';
  return 'Project';
}
