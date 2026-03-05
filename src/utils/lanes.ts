type Page = 'home' | 'about' | 'work' | 'resume' | 'middleman-case-study' | 'day-one-case-study' | 'doordash-case-study' | 'services';

type Lane = 'portfolio' | 'services';

const SERVICES_PAGES: ReadonlySet<Page> = new Set(['services']);

export function getLane(page: Page): Lane {
  return SERVICES_PAGES.has(page) ? 'services' : 'portfolio';
}
