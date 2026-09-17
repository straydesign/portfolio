'use client';

// The bookshelf — CSS-art book spines, moved intact from the old /about page.
// Every book, color, and interaction is preserved; only the wrapper changed.

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import TextCard from '../TextCard';
import { NavigableSection } from '../NavigableSection';
import { useSectionRegistry } from '@/context/SectionRegistryContext';

const ALL_BOOKS = [
  { title: 'The Art of Innovation', description: 'IDEO treats creativity like a muscle, not a gift. Build a rough prototype, put it in front of someone, learn what breaks, rebuild. The companies that innovate fastest are the ones willing to look stupid early.' },
  { title: 'Creative Confidence', description: 'IDEO walks into organizations and finds creative people who don\'t think they\'re creative. Years of school and corporate life trained it out of them. Give someone permission to think like a designer and they surprise you.' },
  { title: 'Articulating Design Decisions', description: 'You can make the right design and still lose the room if you can\'t explain why it works. This book is about talking to stakeholders who think differently than you and getting them to see what you see. The rationale matters as much as the mockup.' },
  { title: 'The Science of Scaling', description: 'Most organizations plateau because they set goals they already know how to hit. Bigger goals force you to rethink the approach, which often makes execution simpler. Small thinking creates complicated workarounds.' },
  { title: 'Creative Selection', description: 'Written by an engineer who built Safari and the iPhone keyboard at Apple. Their process is obsessive: demo, tear apart, rebuild, simplify. Every feature starts bloated and gets carved down to the thing that matters.' },
  { title: 'Indistractable', description: 'We blame our phones, but the real problem is internal. You reach for a screen to escape boredom or discomfort. The fix is designing your environment so focus is the default, not something you have to white-knuckle through.' },
  { title: 'Hooked', description: 'Products that stick follow a loop: trigger, action, reward, investment. Every time you open Instagram you\'re running this cycle. Useful for building products people return to, and for noticing when it\'s being used on you.' },
  { title: 'How to Win Friends & Influence People', description: 'Be curious about the other person. That\'s most of the book. People open up when they feel like you care about their answer, not your next talking point. In client work and user research, this changes the quality of everything you hear.' },
  { title: 'The Power of When', description: 'Your biology decides when you peak in energy and focus. Most people fight that rhythm instead of working with it. I figured out my chronotype, moved my schedule around, and stopped forcing output at hours my brain had already checked out.' },
  { title: '48 Laws of Power', description: 'Power dynamics run underneath every meeting, negotiation, and design review. The book teaches you to see the game happening around you. Not to play dirty, but to understand why decisions land the way they do.' },
  { title: 'The Dichotomy of Leadership', description: 'The sequel to Extreme Ownership, and the more honest book. Take too much ownership and you micromanage. Push too hard and you lose your team. Every leadership principle has a version that backfires.' },
  { title: 'Start with Why', description: 'People buy why you do it, not what you do. Apple and Patagonia lead with purpose, not specs. If you can\'t explain why your product exists beyond what it does, you haven\'t found the thing that makes people care.' },
  { title: 'Steal Like an Artist', description: 'Nothing is original. Every creative person is a remix of their influences. The trick is pulling from enough different places that the combination feels like yours. Changed how I gather inspiration before starting a project.' },
  { title: 'Storyworthy', description: 'The best stories are small. Not the dramatic thing that happened, but the quiet moment where something shifted. A good story takes you from one state to another and makes the audience feel the turn. Case studies should work the same way.' },
  { title: 'The Ten Faces of Innovation', description: 'IDEO maps innovation to ten roles on a team: the Anthropologist, the Experimenter, the Cross-Pollinator, and others. No single person does it all. When I look at a team, I think about which roles are covered and which are empty.' },
  { title: 'Influence', description: 'Six principles of persuasion: reciprocity, commitment, social proof, authority, liking, scarcity. Not tricks. This is how people make decisions, and it\'s baked into every onboarding flow and pricing page you\'ve ever used.' },
  { title: 'The 5 AM Club', description: 'Do your most important work before the world starts asking things of you. The first hour sets the rest of the day. Most people give their best hours to email and meetings. Guard the morning.' },
  { title: 'Deep Work', description: 'Focused, uninterrupted work is getting rarer while getting more valuable. Email, Slack, and meetings fill the calendar but don\'t move anything forward. The people producing the best output protect blocks of time where nobody can reach them.' },
  { title: 'Building a StoryBrand', description: 'Most companies make themselves the hero of their own story. Wrong move. The customer is the hero, you\'re the guide. This framework changed how I write copy for clients.' },
  { title: 'Can\'t Hurt Me', description: 'Goggins says when you think you\'re done, you\'re at 40%. Most limits are your brain keeping you comfortable, not your body or ability giving out. I think about this when a deadline feels impossible or a problem feels stuck.' },
  { title: 'The Practice', description: 'Show up and do the work, especially when you don\'t feel like it. The people who produce great work over time aren\'t more talented. They\'re more consistent. Ship it imperfect, learn, come back tomorrow.' },
  { title: 'The Goal', description: 'Find the one bottleneck choking your entire system and fix that before you optimize anything else. In product work, this means figuring out the real blocker instead of spreading effort thin across ten things.' },
  { title: 'Atomic Habits', description: '1% better each day compounds into something unrecognizable over a year, but only if the habit sticks. Make it obvious, easy, and satisfying. I used this to rebuild my morning routine and reading habit from scratch.' },
  { title: 'How to Talk to Anyone', description: '92 conversation techniques, from first impressions to deep rapport. Good communicators practice patterns until they stop thinking about them. Small changes in how you listen shift the entire conversation, especially in user interviews.' },
  { title: 'The Intelligent Investor', description: 'Graham\'s advice holds up: invest long-term, don\'t time the market, index funds for 90% of it. Separating emotion from financial decisions is the same discipline as separating taste from data in design.' },
  { title: 'The Hero and the Outlaw', description: 'Twelve brand archetypes: the Hero, the Creator, the Explorer, the Sage. Brands that pick one and commit create stronger emotional connections because they tap into stories people already carry around. I use this when helping clients figure out positioning.' },
  { title: 'Laws of UX', description: 'Fitts\'s Law, Hick\'s Law, the Peak-End Rule, Jakob\'s Law. Not opinions about design. Research-backed patterns of how people behave on screens. I reference this more than any other design book.' },
  { title: 'Emotional Design', description: 'Design works on three levels: visceral, behavioral, and reflective. Most designers only think about behavioral (does it work?). But people fall in love with products that hit all three. A usable product nobody feels anything about still fails.' },
  { title: 'Sprint', description: 'Problem to tested prototype in five days. Google Ventures built a process that forces decisions and puts real users at the table by Friday. You learn more in one sprint than in months of meetings about what to build.' },
  { title: 'Inspired', description: 'Marty Cagan on how the best product companies work. Give teams problems, not feature specs. Let them discover the solution through continuous contact with users. Top-down roadmaps produce mediocre products.' },
  { title: 'Delivering Happiness', description: 'Tony Hsieh built Zappos around one idea: make customers and employees happy first, and the business follows. Culture as strategy, not a poster on the wall.' },
  { title: 'American Icon', description: 'Alan Mulally walked into Ford when it was bleeding billions and turned it around with radical transparency and one weekly meeting where nobody could hide. No bailout needed.' },
  { title: 'The Design of Everyday Things', description: 'Doors you push when they say pull are a design failure, not a user failure. Affordances, signifiers, feedback, mapping. Every bad interface I have critiqued traces back to one of those four.' },
  { title: 'The Mom Test', description: 'Never ask anyone whether they like your idea. Ask about their life and what they already do about the problem. Every user interview I have run since is about their past instead of my product.' },
  { title: 'The Lean Startup', description: 'Build, measure, learn, and keep the loop short. Shipping early is how you find out you were wrong while being wrong is still cheap.' },
  { title: 'UX Strategy', description: 'Competitive research, then a value proposition, then a prototype you test on strangers. The part most portfolios skip is the part that decides whether the thing should exist at all.' },
  { title: 'Never Split the Difference', description: 'An FBI hostage negotiator\'s method, and most of it is listening. Label what the other person is feeling and let the silence do the work. The calibrated questions come up in almost every client call.' },
  { title: 'The War of Art', description: 'Pressfield calls the thing stopping you Resistance and treats it as a physical force. It gets loudest right before the work that matters. Naming it is most of beating it.' },
  { title: 'Company of One', description: 'Growth is a choice rather than an obligation. Jarvis argues for staying small on purpose and optimising for autonomy over headcount. Closest thing I have read to a description of what I am building.' },
  { title: '$100M Offers', description: 'Price is downstream of the offer. Hormozi stacks guarantees, bonuses and risk reversal until saying no feels stupid. I rebuilt my own pricing around the guarantee after this one.' },
  { title: '$100M Leads', description: 'Four ways to get leads: warm outreach, content, cold outreach, paid ads. Pick one and run it until it works before adding a second. Most people run all four badly at once.' },
  { title: '$100M Money Models', description: 'How the money arrives matters as much as how much of it there is. Upfront cash, recurring, continuity — each one changes what the business can afford to do next. It reshaped how I set a build fee against a monthly.' },
];

/* The spines run the POST-PALETTE rotation — the muted spectrum every social
   post is built from, sampled off the Van Leeuwen shelf. Its order jumps
   across the wheel rather than walking it, so neighbouring spines are never
   near-identical; 42 books against 17 colours puts a repeat 17 spines away,
   which on a 21-book row is the far end of it.

   Source of truth: ~/Desktop/stray-social-assets/POST-PALETTE.md.

   A spine needs five faces, not one. They are mixed in sRGB from the base —
   toward black for the two shadowed edges, toward white for the lit centre —
   which holds the hue and reproduces the depth the hand-picked set had.

   The ink is MEASURED, not copied across. POST-PALETTE names an ink per
   colour, but that rule is written for a flat post background, and a spine's
   title sits on the lit face. White on terracotta clears 4.5:1 against
   #AC6051 itself and fails against every lighter face of it, so the ink is
   decided against the face the title actually crosses. */
const ROTATION = [
  '#AC6051', '#99C1BB', '#B288A5', '#A6C174', '#8F8BBA', '#C49A76',
  '#97B9C0', '#BD7C97', '#B2D6BC', '#876BBF', '#D6BB83', '#7BA1BD',
  '#CC8D9A', '#ABD3C2', '#B086CF', '#C9CC77', '#7B89C0',
] as const;

const channels = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (c: readonly number[]) =>
  '#' + c.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('');
const mix = (base: string, toward: number, amount: number) =>
  toHex(channels(base).map((v) => v + (toward - v) * amount));

const luminance = (h: string) =>
  channels(h)
    .map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    })
    .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/* A title runs down the centre of its spine, which on the gradient below
   spans `bg` at 18% through `light` at 45% and back to `bg` at 72%. So the
   ink has to clear 4.5:1 against BOTH of those, not against the base alone.

   Fifteen of the seventeen clear it in charcoal untouched. Terracotta
   (#AC6051, 3.77 charcoal / 3.73 white) and purple (#876BBF, 4.05 / 3.48)
   clear it in neither — they are the two mid-tones in the set, and a mid-tone
   is the worst case for both inks at once. Rather than hand-pick a
   replacement for those two, the base is lifted toward white in 2% steps
   until one ink passes, and stops at the first step that does. Every other
   colour is untouched at lift 0, so this is a correction where one is owed
   and nowhere else. */
const legible = (base: string) => {
  for (let lift = 0; lift <= 0.4; lift += 0.02) {
    const bg = mix(base, 255, lift);
    const light = mix(bg, 255, 0.12);
    for (const ink of ['#1A1A1A', '#FFFFFF']) {
      if (Math.min(contrast(ink, bg), contrast(ink, light)) >= 4.5) {
        return { bg, light, ink: ink === '#FFFFFF' ? 'rgba(255,255,255,0.94)' : 'rgba(26,26,26,0.92)' };
      }
    }
  }
  // Unreachable for this palette: white always wins by lift 0.4.
  const bg = mix(base, 255, 0.4);
  return { bg, light: mix(bg, 255, 0.12), ink: 'rgba(26,26,26,0.92)' };
};

const SPINES = ROTATION.map((base) => {
  const { bg, light, ink } = legible(base);
  return {
    bg,
    light,
    edge: mix(bg, 0, 0.3),
    side: mix(bg, 0, 0.16),
    top: mix(bg, 255, 0.05),
    text: ink,
  };
});

// Split into even rows from the live count, and carry each row's starting index
// with it. The offset is what maps a spine back to ALL_BOOKS, so deriving it
// from the same arithmetic as the slice is the only way it cannot drift — a
// hard-coded one silently opened the wrong book after the shelf grew to 42.
const ROW = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const offset = Math.round((i * ALL_BOOKS.length) / n);
    return { offset, books: ALL_BOOKS.slice(offset, Math.round(((i + 1) * ALL_BOOKS.length) / n)) };
  });
const DESKTOP_ROWS = ROW(2);
const MOBILE_ROWS = ROW(4);

function BookSpine({
  book,
  index,
  shelfIndex,
  isActive,
  isFocused,
  onToggle,
}: {
  book: typeof ALL_BOOKS[0];
  /** Position within its own row — this drives z-stacking, so each row
      restarts and the spines overlap left over right. */
  index: number;
  /** Position on the whole shelf, which is what the colour rotation walks.
      Rows split differently at different widths; the shelf does not. */
  shelfIndex: number;
  isActive: boolean;
  isFocused: boolean;
  onToggle: () => void;
}) {
  const c = SPINES[shelfIndex % SPINES.length];
  const baseH = 150;
  const h = baseH + Math.min(book.title.length * 2.5, 80);
  const w = 42 + (book.title.length % 4) * 3;
  const topDepth = 10;
  const topShift = 10;
  const totalW = w + topShift;
  const totalH = topDepth + h;
  const pageEdgeColor = '#D4CFC4';
  const pageEdgeDark = '#B8B0A0';
  const zBase = index + 1;
  const showOutline = isActive || isFocused;

  const bookShape = `polygon(${topShift}px 0px, ${totalW}px 0px, ${totalW}px ${h}px, ${w}px ${totalH}px, 0px ${totalH}px, 0px ${topDepth}px)`;
  const topShape = `polygon(${topShift}px 0px, ${totalW}px 0px, ${w}px ${topDepth}px, 0px ${topDepth}px)`;
  const rightSideShape = `polygon(${totalW}px 0px, ${totalW}px ${h}px, ${w}px ${totalH}px, ${w}px ${topDepth}px)`;

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ink)] focus-visible:ring-offset-2"
      style={{
        width: `${totalW}px`,
        height: `${totalH}px`,
        zIndex: isActive ? ALL_BOOKS.length + 10 : isFocused ? ALL_BOOKS.length + 5 : zBase,
        marginRight: `${-(topShift - 3)}px`,
        outline: 'none',
        filter: showOutline ? 'brightness(0.85) drop-shadow(0 0 6px rgba(0,0,0,0.4))' : 'none',
      }}
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      aria-label={book.title}
      title={book.title}
    >
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: isActive ? 'translateY(20px) translateX(-8px)' : 'none' }}
      >
        <div
          className="absolute inset-0"
          style={{
            clipPath: bookShape,
            background: `linear-gradient(90deg, ${c.edge} 0%, ${c.side} 6%, ${c.bg} 18%, ${c.light} 45%, ${c.bg} 72%, ${c.side} 90%, ${c.edge} 100%)`,
            boxShadow: isActive ? '2px 6px 16px rgba(0,0,0,0.4)' : 'none',
          }}
        />
        <div
          className="absolute"
          style={{
            clipPath: bookShape,
            left: 0,
            top: `${topDepth}px`,
            width: '6px',
            height: `${h}px`,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)',
          }}
        />
        <div
          className="absolute"
          style={{
            left: `${w - 6}px`,
            top: `${topDepth}px`,
            width: '8px',
            height: `${h}px`,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.15) 100%)',
          }}
        />
        <div className="absolute inset-0" style={{ clipPath: rightSideShape, background: c.side }} />
        <div
          className="absolute inset-0"
          style={{
            clipPath: rightSideShape,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.04) 60%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            clipPath: topShape,
            background: `linear-gradient(180deg, ${pageEdgeColor} 0%, ${pageEdgeDark} 70%, rgba(0,0,0,0.08) 100%)`,
          }}
        />
        <div
          className="absolute"
          style={{
            left: 0,
            top: `${topDepth - 1}px`,
            width: `${w}px`,
            height: '3px',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)',
          }}
        />
        <span
          className="absolute flex items-center justify-center text-[9px] md:text-[10px] font-semibold leading-none"
          style={{
            fontFamily: 'var(--font-family-body), sans-serif',
            left: 0,
            top: `${topDepth}px`,
            width: `${w}px`,
            height: `${h}px`,
            color: c.text,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            padding: '12px 3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          {book.title}
        </span>
      </div>
    </div>
  );
}

function ShelfRow({
  books,
  globalOffset,
  activeBookIndex,
  setActiveBookIndex,
  focusedShelfIndex,
}: {
  books: typeof ALL_BOOKS;
  globalOffset: number;
  activeBookIndex: number | null;
  setActiveBookIndex: (index: number | null) => void;
  focusedShelfIndex: number | null;
}) {
  // Measured, not guessed: the row overflows at some widths and not others,
  // and which ones depends on how many spines this particular shelf holds.
  const rowRef = useRef<HTMLDivElement>(null);
  const [scrolls, setScrolls] = useState(false);
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    // `observe` delivers an initial observation of its own, so there is no
    // separate first measurement to keep in step with this one.
    const measure = () => setScrolls(el.scrollWidth > el.clientWidth + 1);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="mb-4">
      {/* `safe center` and a scrollable row. A centred flex row wider than the
          viewport overflows equally on both sides, and `main` clips the x axis
          rather than scrolling it — so at 390 two spines sat left of x 0 with
          no way to reach them, still in the tab order. `safe` falls back to
          flex-start the moment the row stops fitting. */}
      {/* The row scrolls on a phone and macOS hides its scrollbar at rest, so
          the only thing telling a reader there are more books is the last spine
          running off the edge — and a spine cut by a hard edge reads as a
          clipping bug, not as an invitation. The mask fades the last 28px, which
          is the same cue a shelf gives you in a room. It only paints where the
          row actually overflows: `shelf-row--scrolls` is set from scrollWidth,
          not from a breakpoint, so a row that fits keeps a clean edge. */}
      <div
        ref={rowRef}
        className={`flex items-end overflow-x-auto shelf-row${scrolls ? ' shelf-row--scrolls' : ''}`}
        style={{ paddingBottom: '14px', paddingTop: '8px', justifyContent: 'safe center' }}
      >
        {books.map((book, i) => (
          <BookSpine
            key={globalOffset + i}
            book={book}
            index={i}
            shelfIndex={globalOffset + i}
            isActive={activeBookIndex === globalOffset + i}
            isFocused={focusedShelfIndex === globalOffset + i}
            onToggle={() => setActiveBookIndex(activeBookIndex === globalOffset + i ? null : globalOffset + i)}
          />
        ))}
      </div>

      {/* Glossy shelf — light marble in light theme, glossy black in dark */}
      <div
        style={{
          height: 12,
          background: 'var(--shelf)',
          boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.15), inset 0 2px 0 rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.15)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      />
      {/* Shelf underside shadow */}
      <div
        style={{
          height: 10,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 40%, transparent 100%)',
        }}
      />
    </div>
  );
}

function BookDetailModal({
  book,
  onClose,
}: {
  book: typeof ALL_BOOKS[0] | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!book) return;
    closeButtonRef.current?.focus();
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book || !mounted) return null;

  /* Portalled to <body>. A dialog anchored with position:fixed is only anchored
     to the viewport while no ancestor is a containing block — one `filter`,
     `transform` or `contain` anywhere up the tree silently re-parents it. Going
     straight to the body means no future wrapper can move it. */
  return createPortal(
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4"
      role="dialog"
      aria-modal="false"
      aria-label={book.title}
    >
      <div
        className="relative p-6 md:p-8"
        style={{
          backgroundColor: 'var(--paper)',
          border: '1px solid rgba(var(--hairline),0.10)',
          boxShadow: '0 -4px 20px rgba(var(--hairline),0.12)',
        }}
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-2xl font-light transition-opacity hover:opacity-70"
          style={{ color: 'var(--ink)' }}
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-lg md:text-xl font-bold mb-4 pr-10" style={{ color: 'var(--ink)' }}>
          {book.title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--ink-2)' }}>
          {book.description}
        </p>
      </div>
    </div>,
    document.body
  );
}

export default function Bookshelf() {
  const [activeBookIndex, setActiveBookIndex] = useState<number | null>(null);
  const [focusedShelfIndex, setFocusedShelfIndex] = useState(0);
  const [bookInput, setBookInput] = useState('');
  const [reasonInput, setReasonInput] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const { activeId, goNext: registryGoNext, goPrev: registryGoPrev } = useSectionRegistry();
  const activeBook = activeBookIndex !== null ? ALL_BOOKS[activeBookIndex] : null;

  // When bookshelf becomes active via keyboard nav, auto-focus the first book
  useEffect(() => {
    if (activeId === 'bookshelf') {
      setFocusedShelfIndex(0);
    }
  }, [activeId]);

  const handleBookshelfKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const rows = isDesktop ? DESKTOP_ROWS : MOBILE_ROWS;

    // Rows are not all the same length once the shelf stops dividing evenly, so
    // locate the row that actually contains this index rather than dividing by
    // an assumed row size.
    const rowOf = (i: number) => {
      const r = rows.findIndex(row => i >= row.offset && i < row.offset + row.books.length);
      return r === -1 ? 0 : r;
    };

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setFocusedShelfIndex(prev => (prev > rows[rowOf(prev)].offset ? prev - 1 : prev));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setFocusedShelfIndex(prev => {
        const row = rows[rowOf(prev)];
        return prev < row.offset + row.books.length - 1 ? prev + 1 : prev;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedShelfIndex(prev => {
        const r = rowOf(prev);
        if (r >= rows.length - 1) { registryGoNext(); return prev; }
        const next = rows[r + 1];
        return next.offset + Math.min(prev - rows[r].offset, next.books.length - 1);
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedShelfIndex(prev => {
        const r = rowOf(prev);
        if (r <= 0) { registryGoPrev(); return prev; }
        const above = rows[r - 1];
        return above.offset + Math.min(prev - rows[r].offset, above.books.length - 1);
      });
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveBookIndex(prev => (prev === focusedShelfIndex ? null : focusedShelfIndex));
    }
  }, [focusedShelfIndex, registryGoNext, registryGoPrev]);

  return (
    <>
      <NavigableSection id="bookshelf" label="Bookshelf" onKeyDown={handleBookshelfKeyDown}>
        <div className="px-4 md:px-8 pt-10 md:pt-14">
          <div className="max-w-7xl mx-auto">
            <TextCard padding="md" className="inline-block mb-8 md:mb-10">
              <p
                className="text-[15px] md:text-base italic mb-2"
                style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-display)' }}
              >
                {'Pull one off the shelf'}
              </p>
              <h3
                className="leading-none tracking-wide font-black"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--ink)',
                  fontSize: 'clamp(1.3rem, 2.6vw, 1.9rem)',
                }}
              >
                BOOKSHELF
              </h3>
            </TextCard>
          </div>

          {/* Desktop: 2 shelves */}
          <div className="hidden lg:block max-w-7xl mx-auto">
            {DESKTOP_ROWS.map((row, rowIndex) => (
              <ShelfRow
                key={rowIndex}
                books={row.books}
                globalOffset={row.offset}
                activeBookIndex={activeBookIndex}
                setActiveBookIndex={setActiveBookIndex}
                focusedShelfIndex={activeId === 'bookshelf' ? focusedShelfIndex : null}
              />
            ))}
          </div>

          {/* Mobile/Tablet: 4 shelves */}
          <div className="lg:hidden max-w-7xl mx-auto">
            {MOBILE_ROWS.map((row, rowIndex) => (
              <ShelfRow
                key={rowIndex}
                books={row.books}
                globalOffset={row.offset}
                activeBookIndex={activeBookIndex}
                setActiveBookIndex={setActiveBookIndex}
                focusedShelfIndex={activeId === 'bookshelf' ? focusedShelfIndex : null}
              />
            ))}
          </div>

          {/* Book detail modal — bottom center, no scrim */}
          <BookDetailModal book={activeBook} onClose={() => setActiveBookIndex(null)} />
        </div>
      </NavigableSection>

      {/* SUGGEST A BOOK */}
      <NavigableSection id="suggest-book" label="Suggest a Book">
        <div className="px-4 md:px-8 pt-8 md:pt-10">
          <div className="max-w-lg mx-auto">
            <div
              className="p-6 md:p-8"
              style={{
                backgroundColor: 'var(--paper)',
                border: '1px solid rgba(var(--hairline),0.08)',
                boxShadow: '0 1px 2px rgba(var(--hairline),0.04), 0 10px 30px rgba(var(--hairline),0.06)',
              }}
            >
              <h3
                className="text-[18px] md:text-[20px] leading-none tracking-wider font-black mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
              >
                SUGGEST A BOOK
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--ink-2)' }}>
                Think I should read something? Drop it here &mdash; it&apos;s anonymous.
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!bookInput.trim() || submitStatus === 'sending') return;
                  setSubmitStatus('sending');
                  try {
                    const book = bookInput.trim();
                    const reason = reasonInput.trim();
                    // FormData (not JSON) is Web3Forms' documented client method:
                    // it's a CORS "simple request" with no preflight, which is the
                    // most reliable path from the browser.
                    const fd = new FormData();
                    fd.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '');
                    fd.append('subject', `Book Suggestion: ${book}`);
                    fd.append('from_name', 'straydesign.co — Book Suggestion');
                    fd.append('book', book);
                    fd.append('reason', reason || '(none given)');
                    const res = await fetch('https://api.web3forms.com/submit', {
                      method: 'POST',
                      body: fd,
                    });
                    if (!res.ok) throw new Error('Failed');
                    setSubmitStatus('sent');
                    setBookInput('');
                    setReasonInput('');
                    setTimeout(() => setSubmitStatus('idle'), 4000);
                  } catch {
                    setSubmitStatus('error');
                    setTimeout(() => setSubmitStatus('idle'), 4000);
                  }
                }}
                className="flex flex-col gap-4"
              >
                <div>
                  <label htmlFor="book-input" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--ink-2)' }}>
                    Book name / author *
                  </label>
                  <input
                    id="book-input"
                    type="text"
                    required
                    value={bookInput}
                    onChange={(e) => setBookInput(e.target.value)}
                    placeholder="e.g. Thinking, Fast and Slow — Daniel Kahneman"
                    className="w-full px-4 py-2.5 text-sm bg-transparent border focus:outline-none focus:border-[var(--ink)] transition-colors"
                    style={{ color: 'var(--ink)', borderColor: 'rgba(var(--hairline),0.20)', borderRadius: 0 }}
                  />
                </div>
                <div>
                  <label htmlFor="reason-input" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--ink-2)' }}>
                    Why it&apos;s worth reading (optional)
                  </label>
                  <textarea
                    id="reason-input"
                    value={reasonInput}
                    onChange={(e) => setReasonInput(e.target.value)}
                    placeholder="What made it stick with you?"
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm bg-transparent border focus:outline-none focus:border-[var(--ink)] transition-colors resize-none"
                    style={{ color: 'var(--ink)', borderColor: 'rgba(var(--hairline),0.20)', borderRadius: 0 }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitStatus === 'sending' || submitStatus === 'sent'}
                  className="self-start px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: submitStatus === 'sent' ? '#22c55e' : 'var(--ink)',
                    color: 'var(--paper)',
                    borderRadius: 0,
                  }}
                >
                  {submitStatus === 'idle' && 'Submit'}
                  {submitStatus === 'sending' && 'Sending...'}
                  {submitStatus === 'sent' && 'Sent — thanks!'}
                  {submitStatus === 'error' && 'Submit'}
                </button>
                {/* A failure used to replace the button's own label, which took
                    the control away at the one moment the reader needs it and
                    told them nothing they could act on. The button stays a
                    button; the message goes beside it, with the way out in it. */}
                {submitStatus === 'error' && (
                  <p role="status" className="text-sm" style={{ color: 'var(--alert)' }}>
                    That did not send. Try again, or email{' '}
                    <a href="mailto:tom@straydesign.co" style={{ textDecoration: 'underline' }}>
                      tom@straydesign.co
                    </a>
                    .
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </NavigableSection>
    </>
  );
}
