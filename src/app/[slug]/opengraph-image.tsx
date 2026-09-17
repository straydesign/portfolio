import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { PROJECTS } from '@/data/projects';
import { getCaseStudy } from '@/data/caseStudies';

/* The card a case-study link unfurls into.
 *
 * Every study route was inheriting nothing and arriving in Slack, LinkedIn and
 * iMessage as a bare grey link. A case-study URL is the single thing a
 * recruiter pastes into a channel when they pass someone along, so it is worth
 * a card of its own — the client, the design claim the study opens on, and the
 * same cat mark and hairline as the site's own card so the two read as a set.
 *
 * Deliberately typographic. A phone capture is 900x1948; letterboxing one into
 * a 1200x630 card leaves two grey margins and a screenshot too small to read. */

// A static export: Next emits the same og:image:alt on every route this
// generator serves, and /resume is one of them. So it names the site, not a
// case study.
export const alt = 'Tom Sesler — straydesign.co';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CAT_PATH =
  'M44.55,16.01c11.2.06,14.63-.06,14.71.56.09.69-4.07,1.92-5.77,2.35-3.2.82-10.52,3.59-10.36,4.71.32,2.22,13.02,2.15,16.25,2.12,31.67-.29,68.53-4.11,68.63-3.46.04.26-8.81,2.67-21.54,4.4-11.67,1.58-21.2,1.86-22.25,5.84-.34,1.28.04,3.04,1.02,6.63.58,2.15,1.68,5.29,2.97,9.62.08.28.38,1.31.46,2.69.08,1.55-.09,3.93-.76,4.06-.65.13-1.56-1.94-2.28-3.55-3.46-7.73-5.24-11.55-6.48-12.82-2.66-2.72-6.51-2.83-14.2-3.06-.52-.02-4.87-.08-10.26,1.34-4.4,1.16-5.32,2.21-5.72,3.04-.83,1.74-.22,4.09.44,6.61.4,1.52.86,3.03,1.12,4.58.06.37.32,1.05.28,1.95,0,.1-.12,2.25-.83,2.41-.91.22-2.89-3.89-6.78-12.12-.14-.29-1.63-3.45-4.06-7.18-1.1-1.69-2.7-3.94-5.32-4.72-2.14-.64-2.95.06-6.81.44-2.2.21-7.06.69-9.54-2.12-1.84-2.09-1.49-5-1.41-5.53.47-3.35,3.14-5.3,4.16-6.05,1.35-.99,3.93-2.47,15.61-2.78,2.17-.06,2.25-.01,8.71.03h0Z';

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const path = (await params).slug;
  const project = PROJECTS.find((p) => p.slug === path);
  const study = project ? getCaseStudy(project.slug) : undefined;

  // /resume comes through this route too, and has no study behind it.
  const eyebrow = study?.client ?? 'Tom Sesler';
  const headline = study?.title ?? 'Product Designer';
  const footline = study?.meta ?? 'straydesign.co';

  const displayFont = await readFile(join(process.cwd(), 'src/app/fonts/InstrumentSerif-Regular.ttf'));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#FFFFFF',
          position: 'relative',
          fontFamily: 'Instrument Serif, Georgia, serif',
        }}
      >
        <svg width="126" height="56" viewBox="12 12 120 48" fill="none" style={{ marginBottom: '36px' }}>
          <path d={CAT_PATH} stroke="#111111" strokeWidth="3.4" />
        </svg>

        <div
          style={{
            display: 'flex',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '20px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#56565A',
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: '68px',
            color: '#111111',
            lineHeight: 1.08,
            marginTop: '18px',
            maxWidth: '900px',
          }}
        >
          {headline}
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '22px',
            color: '#56565A',
            marginTop: '22px',
          }}
        >
          {footline}
        </div>

        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '86px',
            right: '80px',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '18px',
            color: '#111111',
          }}
        >
          straydesign.co
        </div>

        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: '#111111',
          }}
        />
      </div>
    ),
    { ...size, fonts: [{ name: 'Instrument Serif', data: displayFont, weight: 400 }] },
  );
}
