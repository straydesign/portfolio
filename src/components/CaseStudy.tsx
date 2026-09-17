'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import NextProject from './NextProject';
import SafariPhone from './SafariPhone';
import { type Page } from '@/data/projects';
import { getCaseStudy, getShot, type Flow, type Topic } from '@/data/caseStudies';

interface CaseStudyProps {
  slug: string;
  projectId: Page;
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

/* The reference deck, unrolled into a scroll.
   Text left, screens right, nothing centred and nothing overlaid. A topic
   pins its three lines while its three phones scroll past — the scroll
   equivalent of the deck holding one slide's text while the product advances.
   Everything else on this page is deliberately plain so the only thing with
   weight is the work.

   Every capture is a handset in Safari carrying a marker drawn around the
   element its line is talking about, so no sentence on this page is a claim
   without a picture of the thing it claims. */

function TopicBlock({ topic }: { topic: Topic }) {
  // -1 until the observer claims one, which is what keeps all three lines at
  // full strength for a reader who never scrolls or has JS off.
  const [active, setActive] = useState(-1);
  const [lead, setLead] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const shotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = shotsRef.current;
    if (!host) return;
    const els = Array.from(host.querySelectorAll<HTMLElement>('[data-shot]'));
    if (els.length === 0) return;

    // A narrow band across the middle of the screen. Whatever is crossing it
    // owns the copy; in the gap between two phones nothing crosses, so the
    // last claim stands rather than flickering back to nothing.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(els.indexOf(entry.target as HTMLElement));
        }
      },
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));

    /* Holding the last claim is right inside a topic and wrong at the seam
       between two: this topic's final sentence stayed lit for ~150px of scroll
       while the next topic's first sentence lit up below it, so two sentences
       claimed the same screen. Nothing in the band is the answer once the whole
       column of phones has left it — so the host is watched too, and `active`
       goes back to -1, which also drops `cs-topic--live`. */
    const out = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setActive(-1);
      },
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 },
    );
    out.observe(host);

    return () => {
      io.disconnect();
      out.disconnect();
    };
  }, [topic]);

  /* The leader line. It runs from the live sentence, across the empty column
     between the copy and the phone, to the exact height of the marker on that
     phone — so the pairing is drawn rather than inferred.

     It lands on the phone's outer edge, not on the marker itself: the marker
     sits inside the screen, and a line crossing the Safari chrome to reach it
     would read as part of the screenshot. Arriving at the bezel, level with
     the boxed element, says the same thing without touching the capture. */
  useEffect(() => {
    if (active < 0) {
      setLead(null);
      return;
    }
    const draw = () => {
      const sec = sectionRef.current;
      const item = sec?.querySelectorAll<HTMLElement>('.cs-item')[active];
      const shot = sec?.querySelectorAll<HTMLElement>('[data-shot]')[active];
      const mark = shot?.querySelector<HTMLElement>('.cs-mark');
      const phone = shot?.querySelector<HTMLElement>('.cs-safari');
      if (!sec || !item || !mark || !phone) return setLead((prev) => (prev === null ? prev : null));

      const s = sec.getBoundingClientRect();
      const i = item.getBoundingClientRect();
      const m = mark.getBoundingClientRect();
      const p = phone.getBoundingClientRect();

      const x1 = i.right - s.left;
      const y1 = i.top - s.top + i.height / 2;
      const x2 = p.left - s.left;
      const y2 = m.top - s.top + m.height / 2;

      // Under a stacked layout the phone sits below the copy, not beside it,
      // and a line between them would cross the whole block.
      if (x2 - x1 < 90) return setLead((prev) => (prev === null ? prev : null));

      const a = x1 + 16;
      const b = x2 - 10;
      const mid = a + (b - a) * 0.5;
      // Rounded, and only committed when it actually moves. Writing a new path
      // string on every scroll frame re-rendered the whole topic continuously,
      // which is a repaint per frame for a line that has not changed.
      const r = (n: number) => Math.round(n);
      const d = `M ${r(x1)} ${r(y1)} H ${r(a)} C ${r(mid)} ${r(y1)}, ${r(mid)} ${r(y2)}, ${r(b)} ${r(y2)} H ${r(x2)}`;
      setLead((prev) => (prev === d ? prev : d));
    };

    draw();
    let raf = 0;
    const onMove = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener('scroll', onMove, { passive: true });
    window.addEventListener('resize', onMove);
    return () => {
      window.removeEventListener('scroll', onMove);
      window.removeEventListener('resize', onMove);
      cancelAnimationFrame(raf);
    };
  }, [active, topic]);

  return (
    <section
      ref={sectionRef}
      aria-label={topic.label}
      className={`cs-topic${active >= 0 ? ' cs-topic--live' : ''}`}
    >
      {lead && (
        <svg className="cs-lead" aria-hidden="true">
          <path d={lead} />
        </svg>
      )}

      <div className="cs-topic__text">
        <p className="cs-label">{topic.label}</p>
        <p className="cs-para">{topic.lead}</p>
        <div className="cs-items">
          {topic.items.map((item, i) => (
            <div className={`cs-item${i === active ? ' is-active' : ''}`} key={item.shot}>
              <h3 className="cs-item__heading">{item.heading}</h3>
              <p className="cs-item__body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cs-topic__shots" ref={shotsRef}>
        {topic.items.map((item) => {
          const shot = getShot(item.shot);
          if (!shot) return null;
          return (
            <div className="cs-shot" data-shot={item.shot} key={item.shot}>
              <SafariPhone shot={shot} sizes="(max-width: 1000px) 74vw, 24vw" />
              {shot.note && <p className="cs-shot__note">{shot.note}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* Two step lists side by side. The only evidence needed is the count, so
   there is no screenshot here — a picture of a menu would bury the number. */
function FlowBlock({ flow }: { flow: Flow }) {
  return (
    <section className="cs-flow">
      <div className="cs-flow__text">
        <p className="cs-label">{flow.label}</p>
        <p className="cs-para">{flow.lead}</p>
      </div>
      <div className="cs-flow__cols">
        {[
          { title: flow.beforeLabel, steps: flow.before, tone: 'before' },
          { title: flow.afterLabel, steps: flow.after, tone: 'after' },
        ].map((col) => (
          <div key={col.title} className={`cs-flow__col cs-flow__col--${col.tone}`}>
            <p className="cs-flow__title">{col.title}</p>
            <ol className="cs-flow__steps">
              {col.steps.map((step, i) => (
                <li key={step}>
                  <span className="cs-flow__n" aria-hidden="true">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CaseStudy({ slug, projectId, onBack, onNavigate }: CaseStudyProps) {
  const study = getCaseStudy(slug);
  if (!study) return null;

  const { context, impact, liveUrl } = study;

  return (
    <article className="cs">
      <button onClick={onBack} className="cs-back" aria-label="Back to work">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Work
      </button>

      {/* Title — copy bottom-left, the build running off the right edge */}
      <header className="cs-cover">
        <div className="cs-cover__text">
          <p className="cs-eyebrow">{study.client}</p>
          <h1 className="cs-title">{study.title}</h1>
          <p className="cs-meta">{study.meta}</p>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="cs-live">
              {study.liveLabel ?? liveUrl.replace('https://', '')}
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="cs-cover__wall">
          <div className="cs-cover__phones">
            {study.cover.map((id) => {
              const shot = getShot(id);
              if (!shot) return null;
              return (
                <SafariPhone
                  key={id}
                  shot={shot}
                  /* These used to ship `chrome={false}` on the grounds that the
                     bars are a grey smudge at 90px. Measured, the wall's phones
                     are 157px at 390, 233px at 1440 and 312px at 768 — at 768
                     that is 18px off a body shot that does carry chrome. So the
                     first phones a reader sees were the only ones not in
                     Safari, which is the whole conceit of the page. */
                  /* The whole wall is above the fold at every width, so every
                     phone in it is an LCP candidate. Priority on the first two
                     only left Next reporting the third as an un-preloaded LCP. */
                  priority
                  sizes="(max-width: 1000px) 40vw, 16vw"
                />
              );
            })}
          </div>
        </div>
      </header>

      {/* Context — framing only, so it carries no claim needing a picture */}
      <section className="cs-context">
        <h2 className="cs-headline">{context.headline}</h2>
        <p className="cs-para">{context.lead}</p>
      </section>

      {/* Topics */}
      {study.topics.map((topic) => (
        <TopicBlock key={topic.label} topic={topic} />
      ))}

      {study.flow && <FlowBlock flow={study.flow} />}

      {/* Impact — the number is the headline */}
      <section className="cs-impact">
        <p className="cs-label">Impact</p>
        <p className="cs-para">{impact.lead}</p>
        <div className="cs-impact__grid">
          {impact.metrics.map((m) => (
            <div key={m.label}>
              <p className="cs-impact__value">{m.value}</p>
              <p className="cs-impact__label">{m.label}</p>
            </div>
          ))}
        </div>
        {impact.note && <p className="cs-impact__note">{impact.note}</p>}
      </section>

      {/* Learnings */}
      <section className="cs-learnings">
        <p className="cs-label">Learnings</p>
        <div className="cs-learnings__grid">
          {study.learnings.map((l, i) => (
            <div key={l.heading}>
              <span className="cs-badge" aria-hidden="true">{i + 1}</span>
              <h3 className="cs-item__heading">{l.heading}</h3>
              <p className="cs-item__body">{l.body}</p>
            </div>
          ))}
        </div>
      </section>

      {liveUrl && (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="cs-visit">
          {study.liveLabel ?? 'Visit the live site'}
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
        </a>
      )}

      <NextProject currentProjectId={projectId} onNavigate={onNavigate} />
    </article>
  );
}
