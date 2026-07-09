export type Page =
  | 'home'
  | 'resume'
  | 'middleman-case-study'
  | 'day-one-case-study'
  | 'doordash-case-study'
  | 'auto-presenter-tool';

export type ProjectType = 'case-study' | 'project' | 'tool';

export interface Project {
  readonly id: Page;
  readonly title: string;
  readonly description: string;
  readonly deliverable: string;
  readonly screenshot: string;
  readonly screenshots?: readonly string[];
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
  readonly liveUrl?: string;
  readonly caseStudy?: boolean;
}




// Live client sites shown in the LIVE SITES section.
export interface ShowcaseDemo {
  readonly title: string;
  readonly category: string;
  readonly href: string;
  readonly screenshot: string;
  readonly alt: string;
  readonly badge: string;
}

export const SHOWCASE_DEMOS: readonly ShowcaseDemo[] = [
  {
    title: "ANDY'S PUB",
    category: 'Bar & grill — Erie, PA',
    href: 'https://andyspub.com',
    screenshot: '/images/sites/andys.png',
    alt: "Andy's Pub website on a MacBook",
    badge: 'Live client site',
  },
  {
    title: 'BULLFROG',
    category: 'Bar — Erie, PA',
    href: 'https://bullfrogbarerie.com',
    screenshot: '/images/sites/bullfrog.png',
    alt: 'Bullfrog Bar website on a MacBook',
    badge: 'Live client site',
  },
  {
    title: 'SEA CAVE',
    category: 'Saltwater aquarium store — Erie, PA',
    href: 'https://seacaveinc.com',
    screenshot: '/images/sites/seacave.png',
    alt: 'Sea Cave website on a MacBook',
    badge: 'Live client site',
  },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    id: 'middleman-case-study',
    title: 'MERCHANDISING SYSTEM',
    description: 'Bloomberg Terminal-inspired mobile app for beer merchandisers. Real-time POS data, auto-orders, shrinkage detection.',
    deliverable: 'Live prototype + Bloomberg Terminal design system',
    screenshot: '/images/middleman/dashboard.png',
    screenshots: [
      '/images/middleman/dashboard.png',
      '/images/middleman/dashboard-scrolled.png',
      '/images/middleman/dashboard-trends.png',
      '/images/middleman/order-detail.png',
    ],
    alt: 'MIDDLEMAN dashboard — risk overview and quick actions',
    slug: 'middleman',
    slugAliases: ['middleman-case-study'],
    documentTitle: 'Merchandising System Case Study | Tom Sesler',
    type: 'project',
    gradientFrom: '#888888',
    gradientTo: '#ffffff',
    caseStudy: true,
  },
  {
    id: 'day-one-case-study',
    title: 'FIRSTDAY.LIFE',
    description: 'AI-powered goal tracker with iterative weekly sprints. Designed, built, and shipped as a live product.',
    deliverable: 'Live shipped product — design, engineering, AI planning',
    screenshot: '/images/firstday/hero.png',
    screenshots: [
      '/images/firstday/hero.png',
      '/images/firstday/day-view.png',
      '/images/firstday/goals-list.png',
      '/images/firstday/calendar-view.png',
    ],
    alt: 'FirstDay.Life app screenshot',
    slug: 'dayone',
    slugAliases: ['day-one', 'day-one-case-study'],
    documentTitle: 'firstday.life Case Study | Tom Sesler',
    type: 'project',
    caseStudy: true,
    liveUrl: 'https://firstday.life',
  },
  {
    id: 'doordash-case-study',
    title: 'DOORDASH DASHER APP UX CRITIQUE',
    description: 'Heuristic evaluation of the Dasher app drawn from 1,000+ deliveries on the platform, with five redesign proposals.',
    deliverable: 'Heuristic evaluation + 5 redesign concepts',
    screenshot: '/images/doordash/slide6_Image_0.png',
    screenshots: [
      '/images/doordash/slide6_Image_0.png',
      '/images/doordash/slide4_Image_0.png',
      '/images/doordash/slide4_Image_1.png',
      '/images/doordash/slide8_Image_0.png',
    ],
    alt: 'DoorDash Dasher app screenshot',
    slug: 'doordash',
    slugAliases: ['doordash-case-study'],
    documentTitle: 'DoorDash UX Evaluation | Tom Sesler',
    type: 'case-study',
    caseStudy: true,
  },
  {
    id: 'auto-presenter-tool',
    title: 'AUTO-PRESENTER',
    description: 'Desktop app that watches my slides and my script at the same time. Voice tracking advances the slide as I speak. Built because I hated switching between Keynote and a teleprompter while recording pitch videos.',
    deliverable: 'Personal tool — Electron + Claude, open source',
    screenshot: '/images/auto-presenter/setup.png',
    screenshots: [
      '/images/auto-presenter/setup.png',
      '/images/auto-presenter/presenter-active.png',
      '/images/auto-presenter/slide-progression.png',
      '/images/auto-presenter/teleprompter-closeup.png',
    ],
    alt: 'Auto-Presenter setup panel — load slides, script, voice-driven advance',
    slug: 'auto-presenter',
    slugAliases: [],
    documentTitle: 'Auto-Presenter | Tom Sesler',
    type: 'tool',
    githubUrl: 'https://github.com/straydesign/auto-presenter',
    liveUrl: 'https://github.com/straydesign/auto-presenter',
    context: 'Built for me, shared as-is.',
  },
] as const;

export const STATIC_PAGES: ReadonlyMap<Page, string> = new Map([
  ['home', 'Tom Sesler — Product Designer'],
  ['resume', 'Resume | Tom Sesler — Product Designer'],
]);

export function getPageFromPath(pathname: string): Page {
  const path = pathname.replace(/^\//, '');

  // Check static pages ('about' and 'work' collapsed into home anchors)
  if (path === '' || path === '/') return 'home';
  if (path === 'resume') return 'resume';

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
