'use client';

import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { type Page } from '@/data/projects';
import { useSectionRegistry } from '@/context/SectionRegistryContext';
import Carousel from './Carousel';
import TextCard from './TextCard';
import { NavigableSection } from './NavigableSection';

const ALL_BOOKS = [
  { title: 'The Art of Innovation', color: 'red', description: 'IDEO treats creativity like a muscle, not a gift. Build a rough prototype, put it in front of someone, learn what breaks, rebuild. The companies that innovate fastest are the ones willing to look stupid early.' },
  { title: 'Creative Confidence', color: 'cobalt', description: 'IDEO walks into organizations and finds creative people who don\'t think they\'re creative. Years of school and corporate life trained it out of them. Give someone permission to think like a designer and they surprise you.' },
  { title: 'Articulating Design Decisions', color: 'brown', description: 'You can make the right design and still lose the room if you can\'t explain why it works. This book is about talking to stakeholders who think differently than you and getting them to see what you see. The rationale matters as much as the mockup.' },
  { title: 'The Science of Scaling', color: 'tan', description: 'Most organizations plateau because they set goals they already know how to hit. Bigger goals force you to rethink the approach, which often makes execution simpler. Small thinking creates complicated workarounds.' },
  { title: 'Creative Selection', color: 'cream', description: 'Written by an engineer who built Safari and the iPhone keyboard at Apple. Their process is obsessive: demo, tear apart, rebuild, simplify. Every feature starts bloated and gets carved down to the thing that matters.' },
  { title: 'Indistractable', color: 'burgundy', description: 'We blame our phones, but the real problem is internal. You reach for a screen to escape boredom or discomfort. The fix is designing your environment so focus is the default, not something you have to white-knuckle through.' },
  { title: 'Hooked', color: 'darkgreen', description: 'Products that stick follow a loop: trigger, action, reward, investment. Every time you open Instagram you\'re running this cycle. Useful for building products people return to, and for noticing when it\'s being used on you.' },
  { title: 'How to Win Friends & Influence People', color: 'navy', description: 'Be curious about the other person. That\'s most of the book. People open up when they feel like you care about their answer, not your next talking point. In client work and user research, this changes the quality of everything you hear.' },
  { title: 'The Power of When', color: 'teal', description: 'Your biology decides when you peak in energy and focus. Most people fight that rhythm instead of working with it. I figured out my chronotype, moved my schedule around, and stopped forcing output at hours my brain had already checked out.' },
  { title: '48 Laws of Power', color: 'charcoal', description: 'Power dynamics run underneath every meeting, negotiation, and design review. The book teaches you to see the game happening around you. Not to play dirty, but to understand why decisions land the way they do.' },
  { title: 'The Dichotomy of Leadership', color: 'olive', description: 'The sequel to Extreme Ownership, and the more honest book. Take too much ownership and you micromanage. Push too hard and you lose your team. Every leadership principle has a version that backfires.' },
  { title: 'Start with Why', color: 'mustard', description: 'People buy why you do it, not what you do. Apple and Patagonia lead with purpose, not specs. If you can\'t explain why your product exists beyond what it does, you haven\'t found the thing that makes people care.' },
  { title: 'Steal Like an Artist', color: 'plum', description: 'Nothing is original. Every creative person is a remix of their influences. The trick is pulling from enough different places that the combination feels like yours. Changed how I gather inspiration before starting a project.' },
  { title: 'Storyworthy', color: 'rust', description: 'The best stories are small. Not the dramatic thing that happened, but the quiet moment where something shifted. A good story takes you from one state to another and makes the audience feel the turn. Case studies should work the same way.' },
  { title: 'The Ten Faces of Innovation', color: 'blue', description: 'IDEO maps innovation to ten roles on a team: the Anthropologist, the Experimenter, the Cross-Pollinator, and others. No single person does it all. When I look at a team, I think about which roles are covered and which are empty.' },
  { title: 'Influence', color: 'terracotta', description: 'Six principles of persuasion: reciprocity, commitment, social proof, authority, liking, scarcity. Not tricks. This is how people make decisions, and it\'s baked into every onboarding flow and pricing page you\'ve ever used.' },
  { title: 'The 5 AM Club', color: 'sage', description: 'Do your most important work before the world starts asking things of you. The first hour sets the rest of the day. Most people give their best hours to email and meetings. Guard the morning.' },
  { title: 'Deep Work', color: 'midnight', description: 'Focused, uninterrupted work is getting rarer while getting more valuable. Email, Slack, and meetings fill the calendar but don\'t move anything forward. The people producing the best output protect blocks of time where nobody can reach them.' },
  { title: 'Building a StoryBrand', color: 'forest', description: 'Most companies make themselves the hero of their own story. Wrong move. The customer is the hero, you\'re the guide. This framework changed how I write copy for clients.' },
  { title: 'Can\'t Hurt Me', color: 'oxblood', description: 'Goggins says when you think you\'re done, you\'re at 40%. Most limits are your brain keeping you comfortable, not your body or ability giving out. I think about this when a deadline feels impossible or a problem feels stuck.' },
  { title: 'The Practice', color: 'white', description: 'Show up and do the work, especially when you don\'t feel like it. The people who produce great work over time aren\'t more talented. They\'re more consistent. Ship it imperfect, learn, come back tomorrow.' },
  { title: 'The Goal', color: 'wine', description: 'Find the one bottleneck choking your entire system and fix that before you optimize anything else. In product work, this means figuring out the real blocker instead of spreading effort thin across ten things.' },
  { title: 'Atomic Habits', color: 'copper', description: '1% better each day compounds into something unrecognizable over a year, but only if the habit sticks. Make it obvious, easy, and satisfying. I used this to rebuild my morning routine and reading habit from scratch.' },
  { title: 'How to Talk to Anyone', color: 'slate', description: '92 conversation techniques, from first impressions to deep rapport. Good communicators practice patterns until they stop thinking about them. Small changes in how you listen shift the entire conversation, especially in user interviews.' },
  { title: 'The Intelligent Investor', color: 'darkgreen', description: 'Graham\'s advice holds up: invest long-term, don\'t time the market, index funds for 90% of it. Separating emotion from financial decisions is the same discipline as separating taste from data in design.' },
  { title: 'The Hero and the Outlaw', color: 'red', description: 'Twelve brand archetypes: the Hero, the Creator, the Explorer, the Sage. Brands that pick one and commit create stronger emotional connections because they tap into stories people already carry around. I use this when helping clients figure out positioning.' },
  { title: 'Laws of UX', color: 'cream', description: 'Fitts\'s Law, Hick\'s Law, the Peak-End Rule, Jakob\'s Law. Not opinions about design. Research-backed patterns of how people behave on screens. I reference this more than any other design book.' },
  { title: 'Emotional Design', color: 'cobalt', description: 'Design works on three levels: visceral, behavioral, and reflective. Most designers only think about behavioral (does it work?). But people fall in love with products that hit all three. A usable product nobody feels anything about still fails.' },
  { title: 'Sprint', color: 'mustard', description: 'Problem to tested prototype in five days. Google Ventures built a process that forces decisions and puts real users at the table by Friday. You learn more in one sprint than in months of meetings about what to build.' },
  { title: 'Inspired', color: 'burgundy', description: 'Marty Cagan on how the best product companies work. Give teams problems, not feature specs. Let them discover the solution through continuous contact with users. Top-down roadmaps produce mediocre products.' },
  { title: 'Delivering Happiness', color: 'royalblue', description: 'Tony Hsieh built Zappos around one idea: make customers and employees happy first, and the business follows. Culture as strategy, not a poster on the wall.' },
  { title: 'American Icon', color: 'steelnavy', description: 'Alan Mulally walked into Ford when it was bleeding billions and turned it around with radical transparency and one weekly meeting where nobody could hide. No bailout needed.' },
];

const BOOK_COLORS: Record<string, { bg: string; light: string; edge: string; side: string; top: string; text: string }> = {
  red:        { bg: '#8B1A1A', light: '#A52A2A', edge: '#5C1010', side: '#6B1515', top: '#9A2020', text: 'rgba(255,255,255,0.92)' },
  blue:       { bg: '#1B3A6B', light: '#2A5298', edge: '#0F2440', side: '#162E55', top: '#2E5A8A', text: 'rgba(255,255,255,0.92)' },
  brown:      { bg: '#5C3A1E', light: '#7A4E2A', edge: '#3D2510', side: '#4A3018', top: '#6E4525', text: 'rgba(255,255,255,0.92)' },
  tan:        { bg: '#B8A07A', light: '#CCBA98', edge: '#8C7858', side: '#9E8A68', top: '#C4AE8E', text: 'rgba(40,30,15,0.9)' },
  white:      { bg: '#E8E4DC', light: '#F5F2EC', edge: '#C8C2B8', side: '#D5D0C6', top: '#EDE9E2', text: 'rgba(30,30,30,0.9)' },
  darkgreen:  { bg: '#1A4A2A', light: '#2A6A3E', edge: '#0E2E18', side: '#153A22', top: '#285A35', text: 'rgba(255,255,255,0.92)' },
  navy:       { bg: '#0F1F3D', light: '#1A3366', edge: '#080F20', side: '#0C1830', top: '#1E3A60', text: 'rgba(255,255,255,0.92)' },
  burgundy:   { bg: '#5A1028', light: '#7A1838', edge: '#3A0818', side: '#4A0E20', top: '#6E1830', text: 'rgba(255,255,255,0.92)' },
  olive:      { bg: '#4A4A1A', light: '#5E5E28', edge: '#2E2E0E', side: '#3C3C14', top: '#585822', text: 'rgba(255,255,255,0.92)' },
  slate:      { bg: '#3A4550', light: '#4E5D6A', edge: '#252E35', side: '#303A42', top: '#506070', text: 'rgba(255,255,255,0.92)' },
  rust:       { bg: '#8B3A0A', light: '#A84E18', edge: '#5C2505', side: '#6B300A', top: '#9A4515', text: 'rgba(255,255,255,0.92)' },
  plum:       { bg: '#4A1A4A', light: '#652A65', edge: '#2E0E2E', side: '#3C143C', top: '#5A225A', text: 'rgba(255,255,255,0.92)' },
  teal:       { bg: '#0A4A4A', light: '#186565', edge: '#052E2E', side: '#0A3C3C', top: '#1A5858', text: 'rgba(255,255,255,0.92)' },
  charcoal:   { bg: '#2A2A2A', light: '#3E3E3E', edge: '#181818', side: '#222222', top: '#3A3A3A', text: 'rgba(255,255,255,0.92)' },
  sage:       { bg: '#6B7A5A', light: '#82946E', edge: '#4A5640', side: '#5A684C', top: '#7A8C68', text: 'rgba(255,255,255,0.92)' },
  mustard:    { bg: '#9A7A1A', light: '#B8942A', edge: '#6E5810', side: '#846A14', top: '#AA8A22', text: 'rgba(30,20,5,0.9)' },
  oxblood:    { bg: '#4A0A0A', light: '#651818', edge: '#2E0505', side: '#3C0A0A', top: '#5A1212', text: 'rgba(255,255,255,0.92)' },
  forest:     { bg: '#1A3A1A', light: '#285028', edge: '#0E220E', side: '#142E14', top: '#224822', text: 'rgba(255,255,255,0.92)' },
  cobalt:     { bg: '#0A2A6B', light: '#1A3E8A', edge: '#051A45', side: '#0A2258', top: '#1E4A8A', text: 'rgba(255,255,255,0.92)' },
  copper:     { bg: '#8A5030', light: '#A86840', edge: '#5C3520', side: '#704228', top: '#985A38', text: 'rgba(255,255,255,0.92)' },
  cream:      { bg: '#D8CDB0', light: '#E8DCC5', edge: '#B0A488', side: '#C0B498', top: '#DED4BA', text: 'rgba(30,25,15,0.9)' },
  wine:       { bg: '#5A0A2A', light: '#781838', edge: '#380518', side: '#480A22', top: '#6A1232', text: 'rgba(255,255,255,0.92)' },
  midnight:   { bg: '#101828', light: '#1A2840', edge: '#080E18', side: '#0C1420', top: '#1E3048', text: 'rgba(255,255,255,0.92)' },
  terracotta: { bg: '#9A5A3A', light: '#B0704A', edge: '#6E3E28', side: '#844C32', top: '#A86242', text: 'rgba(255,255,255,0.92)' },
  royalblue:  { bg: '#2563eb', light: '#3B7AF5', edge: '#1A4AB0', side: '#1E52C8', top: '#4888F0', text: 'rgba(255,255,255,0.92)' },
  steelnavy:  { bg: '#1e3a5f', light: '#2A5080', edge: '#122440', side: '#18304E', top: '#2E5A85', text: 'rgba(255,255,255,0.92)' },
};

const ABOUT_PHOTOS = [
  { src: '/images/about/photo-1.jpg', alt: 'About photo 1' },
  { src: '/images/about/photo-2.jpg', alt: 'About photo 2' },
  { src: '/images/about/photo-3.jpg', alt: 'About photo 3' },
  { src: '/images/about/photo-4.jpg', alt: 'About photo 4' },
  { src: '/images/about/photo-5.jpg', alt: 'About photo 5' },
  { src: '/images/about/photo-6.jpg', alt: 'About photo 6' },
];

const CURRENT_FAVORITES = [
  { title: 'Good to Great', desc: 'The best leaders weren\'t ego-driven. They cared about the work and put the right people in the right seats. Success makes you repeat what worked. The companies that stayed great refused to.' },
  { title: 'Super Communicators', desc: 'The best communicators ask deep questions and make people feel heard. They figure out why someone is talking before they decide what to say.' },
  { title: 'Extreme Ownership', desc: 'Leaders own the outcome, good or bad. Everyone else passes blame around. Own more than your part.' },
];

interface AboutProps {
  setCurrentPage?: (page: Page) => void;
}

// Desktop: 2 rows of 16 | Mobile: 4 rows (10, 10, 10, 2)
const DESKTOP_ROWS = [ALL_BOOKS.slice(0, 16), ALL_BOOKS.slice(16, 32)];
const MOBILE_ROWS = [ALL_BOOKS.slice(0, 10), ALL_BOOKS.slice(10, 20), ALL_BOOKS.slice(20, 30), ALL_BOOKS.slice(30, 32)];

function BookSpine({
  book,
  index,
  globalIndex,
  isActive,
  isFocused,
  onToggle,
}: {
  book: typeof ALL_BOOKS[0];
  index: number;
  globalIndex: number;
  isActive: boolean;
  isFocused: boolean;
  onToggle: () => void;
}) {
  const c = BOOK_COLORS[book.color] || BOOK_COLORS.brown;
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
      className="relative flex-shrink-0 cursor-pointer"
      style={{
        width: `${totalW}px`,
        height: `${totalH}px`,
        zIndex: isActive ? ALL_BOOKS.length + 10 : isFocused ? ALL_BOOKS.length + 5 : zBase,
        marginRight: `${-(topShift - 3)}px`,
        outline: 'none',
        filter: showOutline ? 'brightness(1.4) drop-shadow(0 0 6px rgba(255,255,255,0.5))' : 'none',
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
            fontFamily: 'var(--font-family-inter), sans-serif',
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
  return (
    <div className="mb-4">
      <div
        className="flex items-end justify-center"
        style={{ paddingBottom: '14px', paddingTop: '8px' }}
      >
        {books.map((book, i) => (
          <BookSpine
            key={globalOffset + i}
            book={book}
            index={i}
            globalIndex={globalOffset + i}
            isActive={activeBookIndex === globalOffset + i}
            isFocused={focusedShelfIndex === globalOffset + i}
            onToggle={() => setActiveBookIndex(activeBookIndex === globalOffset + i ? null : globalOffset + i)}
          />
        ))}
      </div>

      {/* Glossy black shelf */}
      <div
        style={{
          height: 12,
          background: 'linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 25%, #0a0a0a 50%, #050505 80%, #000000 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.30), inset 0 2px 0 rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.6)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      />
      {/* Shelf underside shadow */}
      <div
        style={{
          height: 10,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 40%, transparent 100%)',
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

  useEffect(() => {
    if (!book) return;
    closeButtonRef.current?.focus();
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [book, onClose]);

  if (!book) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4"
      role="dialog"
      aria-label={book.title}
    >
      <div
        className="relative p-6 md:p-8"
        style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
        }}
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-2xl font-light transition-opacity hover:opacity-70"
          style={{ color: '#ffffff' }}
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-lg md:text-xl font-bold mb-4 pr-10" style={{ color: '#ffffff' }}>
          {book.title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: '#a1a1a6' }}>
          {book.description}
        </p>
      </div>
    </div>
  );
}

export default function About({ setCurrentPage }: AboutProps) {
  const [activeBookIndex, setActiveBookIndex] = useState<number | null>(null);
  const [activeFavIndex, setActiveFavIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [focusedShelfIndex, setFocusedShelfIndex] = useState(0);
  const [bookInput, setBookInput] = useState('');
  const [reasonInput, setReasonInput] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [expandedPhotoIndex, setExpandedPhotoIndex] = useState<number | null>(null);
  const { activeId, goNext: registryGoNext, goPrev: registryGoPrev } = useSectionRegistry();
  const activeBook = activeBookIndex !== null ? ALL_BOOKS[activeBookIndex] : null;

  // Close expanded photo on Escape
  useEffect(() => {
    if (expandedPhotoIndex === null) return;
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') setExpandedPhotoIndex(null);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [expandedPhotoIndex]);

  const handleCarouselKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCarouselIndex(prev => prev > 0 ? prev - 1 : ABOUT_PHOTOS.length - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCarouselIndex(prev => prev < ABOUT_PHOTOS.length - 1 ? prev + 1 : 0);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setExpandedPhotoIndex(carouselIndex);
    }
  }, [carouselIndex]);

  // When bookshelf becomes active via keyboard nav, auto-focus the first book
  useEffect(() => {
    if (activeId === 'about-bookshelf') {
      setFocusedShelfIndex(0);
    }
  }, [activeId]);

  const handleBookshelfKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    // Determine which row layout to use based on viewport
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
    const rows = isDesktop ? DESKTOP_ROWS : MOBILE_ROWS;
    const rowSize = isDesktop ? 16 : 10;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setFocusedShelfIndex(prev => {
        // Find which row we're in and don't wrap across rows
        const rowStart = Math.floor(prev / rowSize) * rowSize;
        return prev > rowStart ? prev - 1 : prev;
      });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setFocusedShelfIndex(prev => {
        const rowStart = Math.floor(prev / rowSize) * rowSize;
        const currentRow = rows[Math.floor(prev / rowSize)];
        const rowEnd = rowStart + (currentRow?.length ?? rowSize) - 1;
        return prev < rowEnd ? prev + 1 : prev;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedShelfIndex(prev => {
        const currentRowIndex = Math.floor(prev / rowSize);
        const posInRow = prev - currentRowIndex * rowSize;
        if (currentRowIndex >= rows.length - 1) {
          // On last row, exit to next section
          registryGoNext();
          return prev;
        }
        const nextRowStart = (currentRowIndex + 1) * rowSize;
        const nextRow = rows[currentRowIndex + 1];
        const nextPos = Math.min(posInRow, (nextRow?.length ?? rowSize) - 1);
        return nextRowStart + nextPos;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedShelfIndex(prev => {
        const currentRowIndex = Math.floor(prev / rowSize);
        const posInRow = prev - currentRowIndex * rowSize;
        if (currentRowIndex <= 0) {
          // On first row, exit to previous section
          registryGoPrev();
          return prev;
        }
        const prevRowStart = (currentRowIndex - 1) * rowSize;
        const prevRow = rows[currentRowIndex - 1];
        const prevPos = Math.min(posInRow, (prevRow?.length ?? rowSize) - 1);
        return prevRowStart + prevPos;
      });
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveBookIndex(prev => prev === focusedShelfIndex ? null : focusedShelfIndex);
    }
  }, [focusedShelfIndex, registryGoNext, registryGoPrev]);

  return (
    <div className="py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">

      {/* HERO — card-like container with sub-sections */}
      <div className="px-4 md:px-8 mb-8 md:mb-12">
        <div className="pt-4 md:pt-8 relative" style={{ backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Top edge shine */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

          <NavigableSection id="about-intro" label="About">
            <div className="px-6 py-6 md:px-10 md:py-8">
              <h1
                className="text-[48px] sm:text-[60px] md:text-[72px] leading-none tracking-wider font-black mb-6 md:mb-8"
                style={{
                  fontFamily: "var(--font-family-bungee), sans-serif",
                  WebkitTextStroke: '4px #ffffff',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  paintOrder: 'stroke fill',
                }}
              >
                ABOUT
              </h1>
              <p className="text-[15px] md:text-[17px] leading-relaxed mb-6" style={{ color: '#ffffff' }}>
                I found design the way most people find their best ideas, by being frustrated enough to build something better. I drove for DoorDash, stocked shelves as a beer merchandiser, and kept running into problems that nobody was solving. So I started solving them myself.
              </p>
              <p className="text-[15px] md:text-[17px] leading-relaxed mb-6" style={{ color: '#ffffff' }}>
                Design was always the interest. I studied marketing at UNH and got most of the way through a design minor. When I graduated, marketing jobs were scarce and sales didn&apos;t feel right. I made it to the second round at Enterprise. The first interview went great. I walked into the second one confident. I&apos;d researched the company, had answers written down, felt ready. Then they started asking questions I technically had answers for but phrased differently, and I kept trying to come up with something new to say when what I had was already the answer. They got frustrated. I could feel it. I asked them a bunch of questions after because I was genuinely interested in what they did, but by then it was over. I went home and knew.
              </p>
              <p className="text-[15px] md:text-[17px] leading-relaxed mb-6" style={{ color: '#ffffff' }}>
                People ask me why I don&apos;t just take a sales job. It pays well and I could figure the rest out later. But for the first time in my life I feel certain about one thing and I&apos;m going all in on it. If it&apos;s all I put my energy towards I&apos;ll get there.
              </p>
              <p className="text-[15px] md:text-[17px] leading-relaxed" style={{ color: '#ffffff' }}>
                I learned design in Figma before any of the AI tools existed. Cursor, Figma Make, Claude Code, Lovable, Replit, all came after. I&apos;m competent in the traditional workflow and I&apos;d be happy to work directly in that format because I still believe in early wireframing and ideation that can only happen when you don&apos;t have concrete answers from the start. But it is cheaper than ever to see what your final design would actually look like and how people might feel about it before committing to one direction over another. So I use both.
              </p>
            </div>
          </NavigableSection>

          <NavigableSection id="about-background" label="Background">
            <div className="px-6 pb-6 md:px-10 md:pb-8">
              <p className="text-[15px] md:text-[17px] leading-[1.8] mb-5" style={{ color: '#ffffff' }}>
                What I keep thinking about is why some things stick and most don&apos;t. I walked into that Enterprise interview with everything prepared and it didn&apos;t matter. The answers were right but the feeling was wrong. I&apos;ve built projects where the opposite happened, where the design wasn&apos;t perfect but something about using it made you want to stay. The thing that makes something stick isn&apos;t how it looks. It&apos;s a feeling that builds as someone moves through it, and right now nobody really owns that. Designers own layouts. Engineers own systems. Marketers own the message. The thing connecting all of it is nobody&apos;s job yet.
              </p>
              <p className="text-[15px] md:text-[17px] leading-[1.8] mb-5" style={{ color: '#ffffff' }}>
                And even when you get it right it doesn&apos;t last. The second time is never the first time. The places I remember aren&apos;t the ones I thought were beautiful. They&apos;re the ones I wasn&apos;t ready for.
              </p>
              <p className="text-[15px] md:text-[17px] leading-[1.8] mb-5" style={{ color: '#ffffff' }}>
                The only constant I can find is that everyone is orbiting two things. Belonging, and the gap between what you know you&apos;re capable of and what you&apos;re actually doing about it. That doesn&apos;t go away with better tools or more experience.
              </p>
              <p className="text-[15px] md:text-[17px] leading-[1.8] mb-5" style={{ color: '#ffffff' }}>
                I don&apos;t know if I&apos;m a good designer. I know I love to read. I love to rearrange things and think about how they&apos;d look. I love the idea of having an impact. I want to be somewhere where people feel the same way about creating things and where nobody has the same perspective as the person next to them. It&apos;s going to be hard to put me down at this point.
              </p>
              <p className="text-[15px] md:text-[17px] leading-[1.8] mb-5" style={{ color: '#ffffff' }}>
                At the time of writing this I&apos;m three weeks in. I&apos;ve pitched nine websites to local businesses, built them before the client asked me to and brought the finished site to the conversation. Most said not right now. Too much going on, not looking to grow, timing wasn&apos;t right. Two might go live soon. I&apos;m going to keep going because I feel like nothing could stop me after nine more. At this rate in six years I&apos;ll have 300 websites up, 900 pitched, and if I&apos;m lucky maybe I&apos;ll get an interview.
              </p>
              <p className="text-[15px] md:text-[17px] leading-[1.8]" style={{ color: '#ffffff' }}>
                The work is on this page. That&apos;s all I&apos;ve got.
              </p>
            </div>
          </NavigableSection>
        </div>
      </div>

      {/* PHOTO CAROUSEL */}
      <NavigableSection id="about-photos" label="Photos" onKeyDown={handleCarouselKeyDown}>
        <div className="pb-8 md:pb-12">
          <Carousel
            speed={35}
            direction="left"
            pauseOnHover
            focusedIndex={activeId === 'about-photos' ? carouselIndex : null}
            items={ABOUT_PHOTOS.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className="h-48 md:h-64 w-48 md:w-64 p-0 border-0 bg-transparent cursor-pointer focus:outline-none"
                onClick={() => setExpandedPhotoIndex(i)}
                aria-label={`View ${img.alt}`}
                tabIndex={-1}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-48 md:h-64 w-48 md:w-64 object-cover aspect-square"
                  style={{ borderRadius: 0 }}
                  loading="lazy"
                />
              </button>
            ))}
          />
        </div>
      </NavigableSection>

      {/* Photo modal overlay */}
      {expandedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
          onClick={() => setExpandedPhotoIndex(null)}
          role="dialog"
          aria-label={ABOUT_PHOTOS[expandedPhotoIndex]?.alt ?? 'Photo'}
        >
          <button
            type="button"
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-2xl font-light transition-opacity hover:opacity-70 z-50"
            style={{ color: '#ffffff', background: 'none', border: 'none' }}
            onClick={() => setExpandedPhotoIndex(null)}
            aria-label="Close"
            autoFocus
          >
            &times;
          </button>
          <img
            src={ABOUT_PHOTOS[expandedPhotoIndex]?.src}
            alt={ABOUT_PHOTOS[expandedPhotoIndex]?.alt}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            style={{ borderRadius: 0 }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* MY FAVORITES heading */}
      <NavigableSection id="about-favorites" label="My Favorites">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8 mb-8 md:mb-12">
          <TextCard padding="md" className="inline-block">
            <h2
              className="text-[36px] md:text-[56px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
            >
              MY FAVORITES
            </h2>
          </TextCard>
        </div>
      </NavigableSection>

      {/* Individual favorite books */}
      <div className="max-w-[90rem] mx-auto px-4 md:px-8 mb-16 md:mb-24 pb-8 md:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-20 justify-items-center">
          {CURRENT_FAVORITES.map((book, index) => {
            const isActive = activeFavIndex === index;
            const isFocusedByKeyboard = activeId === `about-fav-${index}`;
            const colors = [BOOK_COLORS.red, BOOK_COLORS.blue, BOOK_COLORS.darkgreen];
            const c = colors[index % colors.length];
            const coverW = 200;
            const coverH = 280;
            const spineW = 26;
            const pageColor = '#d4cfc4';

            return (
              <NavigableSection key={book.title} id={`about-fav-${index}`} label={book.title} className="w-fit" style={{ perspective: '1200px' }}>
                <div
                  className="relative cursor-pointer focus:outline-none"
                  style={{
                    width: `${coverW + spineW}px`,
                    height: `${coverH}px`,
                    zIndex: isActive ? 20 : 1,
                    outline: isFocusedByKeyboard ? '2px solid #ffffff' : 'none',
                    outlineOffset: '4px',
                  }}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveFavIndex(isActive ? null : index)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveFavIndex(isActive ? null : index); } }}
                  aria-label={book.title}
                  title={book.title}
                >
                  <div
                    className="absolute"
                    style={{
                      width: `${coverW}px`,
                      height: `${coverH}px`,
                      left: `${spineW}px`,
                      top: 0,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div
                      className="absolute top-0 h-full"
                      style={{
                        width: `${spineW}px`,
                        left: 0,
                        background: `linear-gradient(90deg, ${c.edge}, ${c.side})`,
                        transform: `translateX(-${spineW}px) rotateY(-90deg)`,
                        transformOrigin: 'right center',
                        borderRadius: '2px 0 0 2px',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                      }}
                    />
                    <div
                      className="absolute inset-0 overflow-hidden p-4 flex flex-col justify-center"
                      style={{
                        background: pageColor,
                        boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.1)',
                        zIndex: 1,
                        borderRadius: 0,
                      }}
                    >
                      <div className="absolute right-0 top-2 bottom-2 w-[3px]" style={{ background: 'repeating-linear-gradient(180deg, transparent 0px, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)' }} />
                      <p
                        className="text-[11px] md:text-[12px] leading-relaxed"
                        style={{ color: 'rgba(40,30,15,0.8)', fontStyle: 'italic' }}
                      >
                        {book.desc}
                      </p>
                    </div>
                    <div
                      className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{
                        transformOrigin: 'left center',
                        transformStyle: 'preserve-3d',
                        transform: isActive ? 'rotateY(-155deg)' : 'rotateY(0deg)',
                        zIndex: 3,
                        borderRadius: 0,
                      }}
                    >
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center p-5"
                        style={{
                          background: `linear-gradient(145deg, ${c.light} 0%, ${c.bg} 40%, ${c.edge} 100%)`,
                          boxShadow: '2px 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                          backfaceVisibility: 'hidden',
                          borderRadius: 0,
                        }}
                      >
                        <span
                          className="text-[16px] md:text-[18px] font-bold text-center leading-tight italic"
                          style={{ fontFamily: 'var(--font-family-inter), sans-serif', color: 'rgba(255,255,255,0.95)', textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.01em' }}
                        >
                          {book.title}
                        </span>
                        <div className="w-12 h-[2px] mt-3" style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 0 }} />
                      </div>
                      <div
                        className="absolute inset-0"
                        style={{
                          background: c.edge,
                          transform: 'rotateY(180deg)',
                          backfaceVisibility: 'hidden',
                          borderRadius: 0,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </NavigableSection>
            );
          })}
        </div>
      </div>

      {/* BOOKSHELF */}
      <NavigableSection id="about-bookshelf" label="Bookshelf" onKeyDown={handleBookshelfKeyDown}>
        <div className="px-4 md:px-8">
          <div className="mb-12 md:mb-16 pb-8 md:pb-12">
            <div className="max-w-[90rem] mx-auto">
              <TextCard padding="md" className="inline-block mb-8 md:mb-12">
                <h2
                  className="text-[36px] md:text-[56px] leading-none tracking-wider font-black"
                  style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
                >
                  BOOKSHELF
                </h2>
              </TextCard>
            </div>

            {/* Desktop: 2 shelves */}
            <div className="hidden lg:block max-w-[90rem] mx-auto">
              {DESKTOP_ROWS.map((rowBooks, rowIndex) => (
                <ShelfRow
                  key={rowIndex}
                  books={rowBooks}
                  globalOffset={rowIndex * 16}
                  activeBookIndex={activeBookIndex}
                  setActiveBookIndex={setActiveBookIndex}
                  focusedShelfIndex={activeId === 'about-bookshelf' ? focusedShelfIndex : null}
                />
              ))}
            </div>

            {/* Mobile/Tablet: 4 shelves */}
            <div className="lg:hidden max-w-[90rem] mx-auto">
              {MOBILE_ROWS.map((rowBooks, rowIndex) => (
                <ShelfRow
                  key={rowIndex}
                  books={rowBooks}
                  globalOffset={rowIndex * 10}
                  activeBookIndex={activeBookIndex}
                  setActiveBookIndex={setActiveBookIndex}
                  focusedShelfIndex={activeId === 'about-bookshelf' ? focusedShelfIndex : null}
                />
              ))}
            </div>

            {/* Book detail modal — bottom center, no scrim */}
            <BookDetailModal book={activeBook} onClose={() => setActiveBookIndex(null)} />
          </div>
        </div>
      </NavigableSection>

      {/* SUGGEST A BOOK */}
      <NavigableSection id="about-suggest" label="Suggest a Book" className="max-w-lg mx-auto">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8 mb-12 md:mb-16">
          <div className="max-w-lg mx-auto">
            <div className="p-6 md:p-8" style={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3
                className="text-[20px] md:text-[24px] leading-none tracking-wider font-black mb-2"
                style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: '#ffffff' }}
              >
                SUGGEST A BOOK
              </h3>
              <p className="text-sm mb-6" style={{ color: '#a1a1a6' }}>
                Think I should read something? Drop it here — it&apos;s anonymous.
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!bookInput.trim() || submitStatus === 'sending') return;
                  setSubmitStatus('sending');
                  try {
                    const res = await fetch('/api/suggest-book', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ book: bookInput.trim(), reason: reasonInput.trim() || undefined }),
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
                  <label htmlFor="book-input" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#a1a1a6' }}>
                    Book name / author *
                  </label>
                  <input
                    id="book-input"
                    type="text"
                    required
                    value={bookInput}
                    onChange={(e) => setBookInput(e.target.value)}
                    placeholder="e.g. Thinking, Fast and Slow — Daniel Kahneman"
                    className="w-full px-4 py-2.5 text-sm bg-transparent border focus:outline-none focus:border-white transition-colors"
                    style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.15)', borderRadius: 0 }}
                  />
                </div>
                <div>
                  <label htmlFor="reason-input" className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#a1a1a6' }}>
                    Why it&apos;s worth reading (optional)
                  </label>
                  <textarea
                    id="reason-input"
                    value={reasonInput}
                    onChange={(e) => setReasonInput(e.target.value)}
                    placeholder="What made it stick with you?"
                    rows={3}
                    className="w-full px-4 py-2.5 text-sm bg-transparent border focus:outline-none focus:border-white transition-colors resize-none"
                    style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.15)', borderRadius: 0 }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitStatus === 'sending' || submitStatus === 'sent'}
                  className="self-start px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: submitStatus === 'sent' ? '#22c55e' : '#ffffff',
                    color: '#000000',
                    borderRadius: 0,
                  }}
                >
                  {submitStatus === 'idle' && 'Submit'}
                  {submitStatus === 'sending' && 'Sending...'}
                  {submitStatus === 'sent' && 'Sent — thanks!'}
                  {submitStatus === 'error' && 'Something went wrong'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </NavigableSection>

      {/* CTA */}
      <NavigableSection id="about-cta" label="Get in Touch">
        <div className="max-w-[90rem] mx-auto px-4 md:px-8">
          <div className="mb-12 md:mb-16">
            <div className="max-w-lg mx-auto text-center">
              <TextCard padding="lg">
                <h2
                  className="text-[28px] md:text-[44px] leading-none tracking-wider font-black mb-4"
                  style={{ fontFamily: 'var(--font-family-bungee), sans-serif', color: '#ffffff' }}
                >
                  WANT TO WORK TOGETHER?
                </h2>
                <p className="text-base mb-8" style={{ color: '#a1a1a6' }}>
                  Whether you need a website, an app, or a product rethink &mdash; let&apos;s talk.
                </p>
                <a
                  href="mailto:tom@straydesign.co"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] cursor-pointer"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    borderRadius: 0,
                  }}
                >
                  Get in Touch
                </a>
              </TextCard>
            </div>
          </div>
        </div>
      </NavigableSection>

      {/* Footer spacer */}
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
