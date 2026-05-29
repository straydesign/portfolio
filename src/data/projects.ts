export type Page =
  | 'home'
  | 'about'
  | 'work'
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
}

export interface InProgressDemo {
  readonly title: string;
  readonly category: string;
  readonly blurb: string;
  readonly href?: string;
  // When true, the demo has no live URL yet — render as paused/backburner rather than "View live".
  readonly paused?: boolean;
}

export interface ClientSite extends Omit<InProgressDemo, 'href'> {
  readonly href: string;
  readonly screenshot: string;
  readonly alt: string;
}

export const CLIENT_SITES: readonly ClientSite[] = [
  {
    title: "ANDY'S PUB",
    category: 'Bar & grill — Erie, PA',
    blurb: 'Live site for a neighborhood pub. Menus, hours, and event listings — designed, built, and hosted as part of a recurring engagement.',
    href: 'https://andyspub.com',
    screenshot: '/images/clients/andys-mobile.jpg',
    alt: "Andy's Pub mobile homepage — Great Food. Late Kitchen.",
  },
  {
    title: 'BULLFROG',
    category: 'Bar — Erie, PA',
    blurb: 'Live site for a long-running Erie bar. Photography-forward landing, simple menu and contact, kept fast and editable.',
    href: 'https://bullfrogbarerie.com',
    screenshot: '/images/clients/bullfrog-mobile.jpg',
    alt: 'Bullfrog Bar mobile homepage — Live Music. Full Bar.',
  },
] as const;

export const DEMOS_IN_PROGRESS: readonly InProgressDemo[] = [
  {
    title: '1000 BEERS',
    category: 'Bar — Erie, PA',
    blurb: 'Catalog-driven beer bar pitch. 1,000+ bottles modeled as a browsable inventory, not a static menu.',
    href: 'https://1000-beers.vercel.app',
  },
  {
    title: 'ERIE CARBONIC',
    category: 'Wholesale CO₂ supplier — Erie, PA',
    blurb: '3D hero modeling industrial CO₂ tanks. B2B-first, designed for distributors who place orders by phone.',
    href: 'https://erie-carbonic.vercel.app',
  },
  {
    title: 'SEA CAVE',
    category: 'Saltwater aquarium store — Erie, PA',
    blurb: 'Live underwater r3f scene. Captive-bred coral and saltwater livestock, browsable inventory, in-store pickup.',
    href: 'https://seacave.vercel.app',
  },
  {
    title: 'GUITAR PLAYER',
    category: 'Personal tool — practice companion',
    blurb: 'Still a bit of a mess and on the backburner right now — definitely coming back to it.',
    paused: true,
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
    gradientTo: '#000000',
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
