import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import App from '@/components/App';
import { PROJECTS, getDocumentTitle, type Page } from '@/data/projects';
import { getCaseStudy } from '@/data/caseStudies';

/* Every route other than the home page.
 *
 * One dynamic segment, not a catch-all. Next refuses an `opengraph-image`
 * beside a catch-all route, and nothing here is ever more than one segment
 * deep — so a deeper path 404s, which is what it should do anyway.
 *
 * This used to be `export { default } from '../page'` — one line, and it meant
 * the server had no idea which page it was rendering. /andys, /seacave and
 * /resume all served the home page's HTML, its <title>, its canonical and its
 * og:url, and only corrected themselves once React had hydrated and read
 * `window.location`. Anything that does not run JavaScript — Google, a Slack
 * or LinkedIn link preview, a recruiter's ATS scraper, a reader with scripting
 * off — saw the portfolio home page five times over and never saw a case study
 * at all. For a portfolio whose whole job is to be sent as a link, that is the
 * one thing that had to be right.
 *
 * The page is still the same client shell; it is just told up front what to
 * open on, so the first HTML off the server is the study itself. */

type Params = { slug: string };

const STATIC_ROUTES: Record<string, Page> = { resume: 'resume' };

/** Resolve a URL path to the page it names, or null if nothing claims it. */
function resolve(path: string): { page: Page; canonical: string } | null {
  if (STATIC_ROUTES[path]) return { page: STATIC_ROUTES[path], canonical: `/${path}` };
  const project = PROJECTS.find((p) => p.slug === path);
  if (project) return { page: project.id, canonical: `/${project.slug}` };
  return null;
}

/* A meta description is a ~158-character budget, not a paragraph — past that
   Google truncates mid-word and the last thing a searcher reads is an ellipsis.
   Whole sentences only, taken from the front until the next one would not fit,
   so the text never has to be written twice and can never drift from the lead
   it came from. */
const RESUME_DESCRIPTION =
  'Product designer in Erie, PA. Five live builds — four local businesses and a route-merchandising prototype — designed, built and handed over with the CMS.';

const BUDGET = 158;
function budget(text: string): string {
  if (text.length <= BUDGET) return text;
  // Whole sentences first.
  const sentences = text.match(/[^.!?]+[.!?]+\s*/g) ?? [];
  let out = '';
  for (const s of sentences) {
    if ((out + s).trim().length > BUDGET) break;
    out += s;
  }
  if (out.trim()) return out.trim();
  // One long sentence and nothing to take: cut at the last clause boundary
  // that fits and close it, so the last thing a searcher reads is a full
  // stop rather than half a word.
  const head = text.slice(0, BUDGET - 1);
  const cut = Math.max(head.lastIndexOf(', '), head.lastIndexOf('; '), head.lastIndexOf(' — '));
  return (cut > 60 ? head.slice(0, cut) : head.slice(0, head.lastIndexOf(' '))).trimEnd() + '.';
}

/** An older spelling of a slug, and the slug it is now. */
function aliasOf(path: string): string | null {
  const project = PROJECTS.find((p) => p.slugAliases.includes(path));
  return project ? project.slug : null;
}

export function generateStaticParams(): Params[] {
  return [
    ...Object.keys(STATIC_ROUTES).map((slug) => ({ slug })),
    ...PROJECTS.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const path = (await params).slug;
  const hit = resolve(path);
  if (!hit) return {};

  // One source for the title, so the server HTML and the title a client-side
  // navigation writes are the same string. They were not: /resume served
  // "Resume | Tom Sesler" and became "Resume | Tom Sesler — Product Designer"
  // the moment you navigated to it from the home page. `getDocumentTitle`
  // already carries its own suffix, so the layout template is overridden.
  const title = getDocumentTitle(hit.page);
  const project = PROJECTS.find((p) => p.id === hit.page);
  if (!project) {
    /* A route with no case study behind it — /resume. Giving it only a title
       and a canonical left the rest of the card inherited from the layout, so
       the resume unfurled under the HOME page's og:url, og:title and
       description while carrying the resume's own image. A preview that
       contradicts itself is worse than a plain one. */
    const description = RESUME_DESCRIPTION;
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: hit.canonical },
      openGraph: { type: 'profile', title, description, url: hit.canonical },
      twitter: { card: 'summary_large_image', title, description },
    };
  }

  // The study's own opening line, written about this client and this build.
  const study = getCaseStudy(project.slug);
  const description = budget(study?.summary ?? project.description);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: hit.canonical },
    openGraph: { type: 'article', title, description, url: hit.canonical },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function SlugPage({ params }: { params: Promise<Params> }) {
  const path = (await params).slug;

  const alias = aliasOf(path);
  if (alias) permanentRedirect(`/${alias}`);

  const hit = resolve(path);
  // A 404 rather than the home page at a 200. A soft 404 teaches a crawler
  // that every misspelling is a real page.
  if (!hit) notFound();

  return <App initialPage={hit.page} />;
}
