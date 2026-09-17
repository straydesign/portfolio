export type Page =
  | 'home'
  | 'resume'
  | 'middleman-case-study'
  | 'seacave-case-study'
  | 'andys-case-study'
  | 'bullfrog-case-study'
  | 'presqueisle-case-study';

export type ProjectType = 'case-study' | 'project' | 'tool';

export interface Project {
  readonly id: Page;
  readonly title: string;
  readonly description: string;
  readonly deliverable: string;
  readonly screenshot: string;
  /** A real handset capture. Anywhere a project is shown inside a phone frame
      the desktop `screenshot` would be object-cover cropped to a sliver of its
      own hero, so a site that has a mobile capture must declare it here. */
  readonly phoneScreenshot?: string;
  /** A photoreal device render — the handset itself, wearing the iOS status
      bar and the Safari address bar, cut out on transparency. Built by
      `scripts/compose-device-screens.mjs` plus `scripts/ps/run-screen-jobs.sh`.
      Prefer this anywhere a phone is shown: `phoneScreenshot` is a bare screen
      that still needs a frame drawn around it. */
  readonly deviceShot?: string;
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
export const PROJECTS: readonly Project[] = [
  {
    id: 'middleman-case-study',
    deviceShot: '/images/devices/phone-middleman.webp',
    title: 'MERCHANDISING SYSTEM',
    description: 'Bloomberg Terminal-inspired mobile app for beer merchandisers. Real-time POS data, auto-orders, shrinkage detection.',
    deliverable: 'Live prototype + Bloomberg Terminal design system',
    screenshot: '/images/middleman/dashboard.webp',
    screenshots: [
      '/images/middleman/dashboard.webp',
      '/images/middleman/dashboard-scrolled.webp',
      '/images/middleman/dashboard-trends.webp',
      '/images/middleman/order-detail.webp',
    ],
    alt: 'MIDDLEMAN dashboard — risk overview and quick actions',
    slug: 'middleman',
    slugAliases: ['middleman-case-study'],
    documentTitle: 'Merchandising System Case Study | Tom Sesler',
    type: 'project',
    gradientFrom: '#888888',
    gradientTo: '#ffffff',
    // The prototype is the highest-value link on the site and this row carried
    // a "Live prototype" label with nothing behind it — the only way in was to
    // open the case study first and find the link at the bottom.
    liveUrl: 'https://middleman.quest',
    caseStudy: true,
  },
  {
    id: 'seacave-case-study',
    deviceShot: '/images/devices/phone-seacave.webp',
    title: 'SEA CAVE',
    description: 'Aquatics retail in Erie since 1975. Shop, live catalogue, care guides and tank servicing — built so the shop runs it themselves.',
    deliverable: 'Live client site — design, build, CMS, design system',
    screenshot: '/images/case-studies/seacave/home-desktop.webp',
    phoneScreenshot: '/images/case-studies/seacave/home-mobile.webp',
    screenshots: [
      '/images/case-studies/seacave/home-desktop.webp',
      '/images/case-studies/seacave/shop-desktop.webp',
      '/images/case-studies/seacave/catalogue-category-saltwater-fish-desktop.webp',
      '/images/case-studies/seacave/services-desktop.webp',
    ],
    alt: 'Sea Cave home page — reef tank hero with numbered service tabs',
    slug: 'seacave',
    slugAliases: ['sea-cave', 'seacave-case-study'],
    documentTitle: 'Sea Cave Case Study | Tom Sesler',
    type: 'case-study',
    caseStudy: true,
    liveUrl: 'https://seacaveinc.com',
  },
  {
    id: 'presqueisle-case-study',
    deviceShot: '/images/devices/phone-presqueisle.webp',
    title: 'PRESQUE ISLE FISH & FARM',
    description: "Erie's only fishery. Twelve counters, 234 products with a page each, and every price checked against the sticker on the shelf.",
    deliverable: 'Live client site — design, build, CMS, design system',
    screenshot: '/images/case-studies/presqueisle/home-desktop.webp',
    phoneScreenshot: '/images/case-studies/presqueisle/home-mobile.webp',
    screenshots: [
      '/images/case-studies/presqueisle/home-desktop.webp',
      '/images/case-studies/presqueisle/lake-erie-desktop.webp',
      '/images/case-studies/presqueisle/item-walleye-desktop.webp',
      '/images/case-studies/presqueisle/captain-desktop.webp',
    ],
    alt: 'Presque Isle home page — sunset off the boat behind the headline',
    slug: 'presqueisle',
    slugAliases: ['presque-isle', 'presqueisle-case-study'],
    documentTitle: 'Presque Isle Fish & Farm Case Study | Tom Sesler',
    type: 'case-study',
    caseStudy: true,
    liveUrl: 'https://presqueislefishandfarm.com',
  },
  {
    id: 'andys-case-study',
    deviceShot: '/images/devices/phone-andys.webp',
    title: "ANDY'S ALE HOUSE",
    description: 'Peach Street bar and grill since 1985. Daily specials that open on today, a page per dish, and two sister bars one tap away.',
    deliverable: 'Live client site — design, build, CMS',
    screenshot: '/images/case-studies/andys/home-desktop.webp',
    phoneScreenshot: '/images/case-studies/andys/home-mobile.webp',
    screenshots: [
      '/images/case-studies/andys/home-desktop.webp',
      '/images/case-studies/andys/menu-desktop.webp',
      '/images/case-studies/andys/events-desktop.webp',
      '/images/case-studies/andys/gallery-desktop.webp',
    ],
    alt: "Andy's home page — dark hero with today's specials panel",
    slug: 'andys',
    slugAliases: ['andys-pub', 'andys-case-study'],
    documentTitle: "Andy's Ale House Case Study | Tom Sesler",
    type: 'case-study',
    caseStudy: true,
    liveUrl: 'https://andyspub.com',
  },
  {
    id: 'bullfrog-case-study',
    deviceShot: '/images/devices/phone-bullfrog.webp',
    title: 'BULLFROG BAR',
    description: "The second bar in the same group. Same architecture as Andy's, restyled end to end — one system, three brands.",
    deliverable: 'Live client site — reskin of a shared system',
    screenshot: '/images/case-studies/bullfrog/home-desktop.webp',
    phoneScreenshot: '/images/case-studies/bullfrog/home-mobile.webp',
    screenshots: [
      '/images/case-studies/bullfrog/home-desktop.webp',
      '/images/case-studies/bullfrog/events-desktop.webp',
      '/images/case-studies/bullfrog/menu-desktop.webp',
      '/images/case-studies/bullfrog/gallery-desktop.webp',
    ],
    alt: 'Bullfrog home page — green and black with the next live show',
    slug: 'bullfrog',
    slugAliases: ['bullfrog-bar', 'bullfrog-case-study'],
    documentTitle: 'Bullfrog Bar Case Study | Tom Sesler',
    type: 'case-study',
    caseStudy: true,
    liveUrl: 'https://bullfrogbarerie.com',
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
