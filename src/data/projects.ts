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
  readonly liveUrl?: string;
  readonly caseStudy?: boolean;
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

// A pitch site that didn't convert, re-skinned into an original concept brand for the
// portfolio. `real: true` keeps the actual identity (no de-identification needed).
export interface Rebrand {
  readonly title: string;
  readonly category: string;
  readonly blurb: string;
  readonly screenshot: string;
  readonly alt: string;
  readonly accent: string;
  readonly mark: 'mic' | 'waves' | 'anchor' | 'disc' | 'monitor' | 'moon' | 'flag' | 'trees' | 'building' | 'newspaper';
  readonly real?: boolean;
  readonly href?: string;
}

// Andy's & Bullfrog moved into SHOWCASE_DEMOS (the DEMOS section).
export const CLIENT_SITES: readonly ClientSite[] = [] as const;

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
    title: 'GUITAR PLAYER',
    category: 'Personal tool — practice companion',
    blurb: 'Still a bit of a mess and on the backburner right now — definitely coming back to it.',
    paused: true,
  },
] as const;

export const REBRANDS: readonly Rebrand[] = [
  {
    title: 'BARNITE',
    category: 'Karaoke bar & lounge — concept',
    blurb: 'Neon-noir rebrand of a karaoke bar pitch. Songbook-as-catalog, late-night booking flow, after-dark identity.',
    screenshot: '/images/rebrands/barnite.jpg',
    alt: 'Barnite — singer on a small stage washed in colored neon light',
    accent: '#FF2D78',
    mark: 'mic',
    href: 'http://localhost:4781',
  },
  {
    title: 'LAKE TAHOE AQUATIC SPORTS',
    category: 'Kayak & paddle rental — concept',
    blurb: 'Alpine-lake rental rebrand. Consistent pine-and-granite setting, seasonal booking, trip planner, and gear catalog.',
    screenshot: '/images/rebrands/lake-tahoe.jpg',
    alt: 'Lake Tahoe Aquatic Sports — paddlers on deep blue water below pine and granite shoreline',
    accent: '#156C82',
    mark: 'waves',
    href: 'http://localhost:4782',
  },
  {
    title: 'MYSTIQUE',
    category: 'Fine-line tattoo studio — concept',
    blurb: 'Fine-line & celestial tattoo studio. Airy, mysterious identity — artist portfolios, flash gallery, deposit-based booking.',
    screenshot: '/images/rebrands/mystique.jpg',
    alt: 'Mystique — a fine-line tattoo in progress in a light, airy studio',
    accent: '#5B3B72',
    mark: 'moon',
    href: 'http://localhost:4783',
  },
  {
    title: 'PINHOUSE LANES',
    category: 'Bowling alley & bar — concept',
    blurb: 'Mid-century bowling rebrand. Lane reservations, league-night listings, and a retro type system.',
    screenshot: '/images/rebrands/pinhouse.jpg',
    alt: 'Pinhouse Lanes — moody bowling alley with lanes receding to the pins',
    accent: '#E23B45',
    mark: 'disc',
    href: 'http://localhost:4784',
  },
  {
    title: 'LOFT & LIE GOLF',
    category: 'Custom club fitting & repair — concept',
    blurb: 'Artisan clubmaker rebrand. Heritage brass-and-oat identity, fitting-appointment flow, and a repair/regrip service catalog.',
    screenshot: '/images/rebrands/loft-and-lie.jpg',
    alt: 'Loft & Lie Golf — a clubmaker’s workbench with iron clubs and grips along the wall',
    accent: '#A87B33',
    mark: 'flag',
    href: 'http://localhost:4785',
  },
  {
    title: 'LAKESIDE LIVING',
    category: 'Lakeside home communities — concept',
    blurb: 'Manufactured-home community operator rebrand. Four lakeside communities mapped, availability listings, and a tour-request flow.',
    screenshot: '/images/rebrands/lakeside-living.jpg',
    alt: 'Lakeside Living — aerial view of a tidy lakeside community of single-story homes',
    accent: '#2D5A27',
    mark: 'trees',
    href: 'http://localhost:4786',
  },
  {
    title: 'CORNERSTONE',
    category: 'Property management — concept',
    blurb: 'Residential property-management rebrand. Slate-teal identity, vacancy listings across metros, and split tenant/owner intake.',
    screenshot: '/images/rebrands/cornerstone.jpg',
    alt: 'Cornerstone — a stacked-block wordmark over a clean residential listings layout',
    accent: '#1C6B5E',
    mark: 'building',
    href: 'http://localhost:4787',
  },
  {
    title: 'CEDAR FALLS COURIER',
    category: 'Community newspaper — concept',
    blurb: 'Local-weekly rebrand. Broadsheet identity, photo-of-the-week, subscription checkout, and a news-tip intake desk.',
    screenshot: '/images/rebrands/cedar-falls-courier.jpg',
    alt: 'Cedar Falls Courier — a small-town newspaper masthead over a Founders Day parade photo',
    accent: '#1A1A1A',
    mark: 'newspaper',
    href: 'http://localhost:4788',
  },
] as const;

// Real / keep-normal sites shown together in the DEMOS section.
export interface ShowcaseDemo {
  readonly title: string;
  readonly category: string;
  readonly blurb: string;
  readonly href: string;
  readonly screenshot: string;
  readonly alt: string;
  readonly accent: string;
  readonly badge: string;
}

export const SHOWCASE_DEMOS: readonly ShowcaseDemo[] = [
  {
    title: "ANDY'S PUB",
    category: 'Bar & grill — Erie, PA',
    blurb: 'Live site for a neighborhood pub — menus, hours, events. Designed, built, and hosted on a recurring engagement.',
    href: 'https://andyspub.com',
    screenshot: '/images/demos/andys.jpg',
    alt: "Andy's Pub — bar & grill",
    accent: '#22c55e',
    badge: 'Live client site',
  },
  {
    title: 'BULLFROG',
    category: 'Bar — Erie, PA',
    blurb: 'Live site for a long-running Erie bar. Photography-forward, simple menu and contact, fast and editable.',
    href: 'https://bullfrogbarerie.com',
    screenshot: '/images/demos/bullfrog.jpg',
    alt: 'Bullfrog Bar — live music, full bar',
    accent: '#22c55e',
    badge: 'Live client site',
  },
  {
    title: 'SEA CAVE',
    category: 'Saltwater aquarium store — Erie, PA',
    blurb: 'Live underwater r3f scene. Captive-bred coral and saltwater livestock, browsable inventory, in-store pickup.',
    href: 'https://seacave.vercel.app',
    screenshot: '/images/demos/seacave.jpg',
    alt: 'Sea Cave — saltwater aquarium store',
    accent: '#0EA5E9',
    badge: 'Live demo',
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
