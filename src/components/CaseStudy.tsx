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

function TopicBlock({ topic, id }: { topic: Topic; id: string }) {
  // -1 until the observer claims one, which is what keeps all three lines at
  // full strength for a reader who never scrolls or has JS off.
  const [active, setActive] = useState(-1);
  /* `active` drops back to -1 the moment the column of phones clears the
     band, which on desktop just turns the highlight off. The bottom caption
     under 1000px holds one sentence and nothing else, so -1 would empty the
     bar for the whole length of its own slide-out. `shown` never goes
     backwards to nothing — it keeps the last sentence it was given. */
  const [shown, setShown] = useState(0);
  const [lead, setLead] = useState<string | null>(null);
  /* Under 1000px the three lines become one caption pinned to the bottom of
     the screen, and the other two are display:none. That is only safe while
     something is actually swapping them — with JS off, or under reduce, all
     three have to stay in the page. So the CSS that hides them is gated on
     this class, which is only ever set from inside the effect that installs
     the observers. No observers, no hiding. */
  const [pinnable, setPinnable] = useState(false);
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
          if (!entry.isIntersecting) continue;
          const i = els.indexOf(entry.target as HTMLElement);
          setActive(i);
          setShown(i);
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

    /* Reduce means the caption does not take over the block — the reader
       keeps the plain stack with all three lines in it, which is what ships
       today and is already good. Watched rather than read once, so turning
       the preference on mid-visit puts the lines back. */
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPinnable(!still.matches);
    sync();
    still.addEventListener('change', sync);

    return () => {
      io.disconnect();
      out.disconnect();
      still.removeEventListener('change', sync);
      setPinnable(false);
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
      id={id}
      data-cs-section=""
      aria-label={topic.label}
      className={`cs-topic${active >= 0 ? ' cs-topic--live' : ''}${pinnable ? ' cs-topic--pinnable' : ''}`}
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
            <div
              className={`cs-item${i === active ? ' is-active' : ''}${i === shown ? ' is-shown' : ''}`}
              key={item.shot}
            >
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

/* The route, paired.
   One step and what replaced it on the same line, because two lists side by
   side never compared: to check step four a reader had to hold the left one in
   their head while finding the right one, and the two columns were not even in
   the same order — "pull from the back from memory" sat opposite "log the
   breakage where it happened".

   One screen, pinned, not one per row. Seven handsets ran the block to 2,000px
   and rendered five dark terminal UIs at 144px, where nothing on them can be
   read. The pinned screen carries a count instead: the marked rows are the
   five of seven that happen on it, which is the argument for the app and is
   checkable against the table. */
function FlowBlock({ flow, id }: { flow: Flow; id: string }) {
  const screen = getShot(flow.screen);
  return (
    <section id={id} data-cs-section="" className="cs-flow">
      <div className="cs-flow__text">
        <p className="cs-label">{flow.label}</p>
        <p className="cs-para">{flow.lead}</p>
      </div>

      <div className="cs-flow__body">
        <div className="cs-flow__table">
          <div className="cs-flow__head">
            <span className="cs-flow__n" aria-hidden="true" />
            <div>
              <p className="cs-flow__title">{flow.beforeLabel}</p>
              <p className="cs-flow__note">{flow.beforeNote}</p>
            </div>
            <span className="cs-flow__arrow" aria-hidden="true" />
            <div>
              <p className="cs-flow__title">{flow.afterLabel}</p>
              <p className="cs-flow__note">{flow.afterNote}</p>
            </div>
          </div>

          <ol className="cs-flow__rows">
            {flow.steps.map((step, i) => (
              <li
                className={`cs-flow__row${step.here ? ' is-here' : ''}`}
                key={step.before}
              >
                <span className="cs-flow__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="cs-flow__before">{step.before}</p>
                {/* The arrow is the comparison itself, so it is neither
                    decoration nor a character inside either sentence. */}
                <span className="cs-flow__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 10" fill="none">
                    <path d="M0 5h21M17 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </span>
                <p className="cs-flow__after">{step.after}</p>
              </li>
            ))}
          </ol>
        </div>

        {screen && (
          <div className="cs-flow__screen">
            <SafariPhone shot={screen} sizes="(max-width: 1000px) 60vw, 20vw" />
            <p className="cs-flow__screennote">{flow.screenNote}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* The rail. A case study is five or six sections long and, until now, a reader
   three screens in had no way to know that — the page just kept producing
   phones. This is the table of contents, pinned to the left edge, with the
   section currently crossing the middle of the screen lit.

   Each entry carries a gloss as well as a label. "Two catalogues" tells
   somebody where they are; "live tanks and hardware, kept apart" tells them
   what they are about to read, which is the half that was missing.

   It is a scrollspy nav: buttons, not anchors, because the whole site is one
   client shell and a hash in the URL is a route change it would have to
   answer for. */
const railId = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

interface RailSection {
  readonly id: string;
  readonly label: string;
  readonly gloss: string;
}

function SectionRail({ sections, active }: { sections: readonly RailSection[]; active: number }) {
  return (
    <nav className="cs-rail" aria-label="Sections">
      <ol className="cs-rail__list">
        {sections.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              className={`cs-rail__item${i === active ? ' is-on' : ''}`}
              aria-current={i === active ? 'true' : undefined}
              onClick={() =>
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            >
              <span className="cs-rail__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="cs-rail__label">{s.label}</span>
              <span className="cs-rail__gloss">{s.gloss}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function CaseStudy({ slug, projectId, onBack, onNavigate }: CaseStudyProps) {
  const study = getCaseStudy(slug);

  /* Whichever section is crossing the middle of the viewport owns the rail.
     The margins collapse the root box to a single line at the centre, and
     every section is taller than that, so exactly one can ever cross it and
     the rail cannot flicker between two. */
  const [section, setSection] = useState(0);
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-cs-section]'));
    if (nodes.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = nodes.indexOf(entry.target as HTMLElement);
            if (i >= 0) setSection(i);
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [slug]);

  if (!study) return null;

  const { impact, liveUrl } = study;

  const sections: RailSection[] = [
    { id: 'overview', label: 'Overview', gloss: 'what it is, and why' },
    ...study.topics.map((t) => ({ id: railId(t.label), label: t.label, gloss: t.gloss })),
    ...(study.flow
      ? [{ id: railId(study.flow.label), label: study.flow.label, gloss: study.flow.gloss }]
      : []),
    { id: 'impact', label: 'Impact', gloss: 'what shipped, counted' },
    { id: 'learnings', label: 'Learnings', gloss: 'what I would do again' },
  ];

  return (
    <article className="cs">
      <button onClick={onBack} className="cs-back" aria-label="Back to work">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Work
      </button>

      <SectionRail sections={sections} active={section} />

      {/* Title — copy bottom-left, the build running off the right edge.
          The heading says what the thing is and the line under it says why it
          was the thing to build. It used to be an aphorism with a second
          aphorism beneath it in its own section, which meant a reader met two
          riddles before meeting any work. */}
      <header className="cs-cover" id="overview" data-cs-section="">
        <div className="cs-cover__text">
          <p className="cs-eyebrow">{study.client}</p>
          <h1 className="cs-title">{study.title}</h1>
          <p className="cs-summary">{study.summary}</p>
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

      {/* Topics */}
      {study.topics.map((topic) => (
        <TopicBlock key={topic.label} topic={topic} id={railId(topic.label)} />
      ))}

      {study.flow && <FlowBlock flow={study.flow} id={railId(study.flow.label)} />}

      {/* Impact — the number is the headline */}
      <section className="cs-impact" id="impact" data-cs-section="">
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
      <section className="cs-learnings" id="learnings" data-cs-section="">
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
