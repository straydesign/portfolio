import { type Page } from '@/data/projects';

type Lane = 'portfolio' | 'services';

const SERVICES_PAGES: ReadonlySet<Page> = new Set(['services']);

export function getLane(page: Page): Lane {
  return SERVICES_PAGES.has(page) ? 'services' : 'portfolio';
}
