'use client';

import { useState } from 'react';
import { type Page } from '@/data/projects';
import AnimateIn, { StaggerContainer, StaggerItem } from './AnimateIn';
import Carousel from './Carousel';
import TextCard from './TextCard';

const ALL_BOOKS = [
  { title: 'The Art of Innovation', color: 'red', description: 'Creativity isn\'t a flash of genius--it\'s a disciplined process. IDEO proves that the best ideas come from building rapid prototypes, getting feedback early, and iterating relentlessly. Observe real people, prototype fast, and let the work evolve.' },
  { title: 'Creative Confidence', color: 'cobalt', description: 'IDEO goes into organizations and unlocks the creative potential that\'s already there. The core idea is that creativity isn\'t reserved for "creative people"--everyone has it, but most have been taught to suppress it. The best breakthroughs happen when you give non-designers permission to think creatively.' },
  { title: 'Articulating Design Decisions', color: 'brown', description: 'The hardest part of design isn\'t the design--it\'s explaining your decisions to people who think differently than you. This book is about building shared understanding with stakeholders through clear rationale. The designer who can articulate why something works will always beat the one who just makes things look good.' },
  { title: 'The Science of Scaling', color: 'tan', description: 'Organizations plateau because they set safe goals and forget the big picture. Thinking bigger often makes execution easier because it forces you to rethink your approach entirely. For product teams, this is the difference between incremental features and transformative product vision.' },
  { title: 'Creative Selection', color: 'cream', description: 'The author worked at Apple on Safari, the keyboard, and other foundational products. Apple\'s magic isn\'t genius--it\'s an obsessive process of demos, iteration, and simplification. Every feature starts complex and gets refined until only the essential remains.' },
  { title: 'Indistractable', color: 'burgundy', description: 'We blame technology for our distractions, but the real root cause is internal discomfort--we reach for our phones to escape boredom or anxiety. The fix isn\'t willpower, it\'s designing your environment and schedule to make focus the default. Applied this to my own workflow and the difference is night and day.' },
  { title: 'Hooked', color: 'darkgreen', description: 'The most successful products build habits through a four-part loop: trigger, action, variable reward, investment. Every time you check Instagram or open Slack, you\'re running through this cycle. Understanding this framework is essential for designing products people stick with--and for recognizing when it\'s being used against you.' },
  { title: 'How to Win Friends & Influence People', color: 'navy', description: 'The most powerful thing you can do in any conversation is be genuinely curious about the other person. People don\'t care what you know until they know that you care. In client work and user research, this principle changes everything about the quality of information you get.' },
  { title: 'The Power of When', color: 'teal', description: 'Everyone has a biological chronotype that determines when they peak in energy, creativity, and focus. Most people fight their natural rhythm instead of working with it. Once I figured out my type and restructured my schedule, I stopped forcing productivity and started having it show up naturally.' },
  { title: '48 Laws of Power', color: 'charcoal', description: 'Power dynamics run in the background of every interaction--meetings, negotiations, even design reviews. This book teaches you to see the game that\'s already being played, not to be manipulative. Once you recognize these patterns, you understand why decisions get made the way they do.' },
  { title: 'The Dichotomy of Leadership', color: 'olive', description: 'This is the sequel to Extreme Ownership that explains the caveats. Take too much ownership and you micromanage. Be too aggressive and you lose your team. Every leadership principle has a tipping point where it becomes counterproductive--the best leaders adjust constantly.' },
  { title: 'Start with Why', color: 'mustard', description: 'People don\'t buy what you do--they buy why you do it. Apple, Patagonia, and the strongest brands all lead with purpose, not features. In product design, if you can\'t articulate why your product exists beyond "it does X," you haven\'t found your differentiator yet.' },
  { title: 'Steal Like an Artist', color: 'plum', description: 'Every creative person is a remix of their influences--the idea that anything is truly "original" is a myth, and that\'s freeing. The trick is to steal from enough diverse sources that the combination becomes uniquely yours. Changed how I approach design research and inspiration gathering.' },
  { title: 'Storyworthy', color: 'rust', description: 'The best stories aren\'t about dramatic events--they\'re about small, specific moments of transformation. A good story changes you from one state to another in a way the audience can feel. In product work, this is exactly how case studies should be structured--show the transformation, not the feature list.' },
  { title: 'The Ten Faces of Innovation', color: 'blue', description: 'IDEO breaks innovation into ten distinct roles--the Anthropologist, the Experimenter, the Cross-Pollinator, and more. Innovation isn\'t one person\'s job, it\'s a team sport where different perspectives compound. When building a product team, I think about which "faces" are represented and which are missing.' },
  { title: 'Influence', color: 'terracotta', description: 'Cialdini breaks down six principles of persuasion: reciprocity, commitment, social proof, authority, liking, and scarcity. These aren\'t tricks--they\'re how human decision-making actually works. Every product designer should understand these because they\'re baked into every onboarding flow and pricing page.' },
  { title: 'The 5 AM Club', color: 'sage', description: 'The first hour of your day sets the trajectory for everything after. Getting the most important work done before the world starts demanding your attention is a competitive advantage most people never use. The principle of protecting your best hours for your most important work is real.' },
  { title: 'Deep Work', color: 'midnight', description: 'The ability to do deep, focused work is becoming rare exactly when it\'s becoming most valuable. Shallow work--emails, Slack, meetings--fills the day but doesn\'t move the needle. The people who produce exceptional output are the ones who carve out protected blocks for uninterrupted thinking.' },
  { title: 'Building a StoryBrand', color: 'forest', description: 'Most companies talk about themselves when they should be talking about the customer\'s journey. Your customer is the hero, you\'re the guide. Every piece of communication should connect to their story of growth--this framework changed how I write copy and position products.' },
  { title: 'Can\'t Hurt Me', color: 'oxblood', description: 'Goggins\' core message is that when you think you\'re at your limit, you\'re actually at about 40%. Most of what holds you back isn\'t physical or intellectual--it\'s your brain keeping you comfortable. Whether it\'s shipping a hard deadline or pushing through a tough climb, this mindset applies everywhere.' },
  { title: 'The Practice', color: 'white', description: 'Creativity isn\'t about inspiration--it\'s about showing up and doing the work consistently, especially when you don\'t feel like it. The professionals who produce great work aren\'t more talented, they\'re more disciplined about the practice. Ship imperfect work, learn, show up again tomorrow.' },
  { title: 'The Goal', color: 'wine', description: 'The whole book is about finding the one bottleneck limiting your entire system. Lean works because you map how everything actually functions and fix the real constraint before optimizing anything else. In product development, this means identifying the true blocker instead of spreading effort everywhere.' },
  { title: 'Atomic Habits', color: 'copper', description: 'The compound effect of 1% improvements is staggering over time, but only if the habits stick. James Clear\'s system--make it obvious, attractive, easy, and satisfying--is the most practical framework for building habits that last. Used it to restructure my morning routine, reading, and design practice.' },
  { title: 'How to Talk to Anyone', color: 'slate', description: '92 techniques for mastering conversation, from first impressions to deep rapport. Great communicators aren\'t born--they\'ve practiced specific patterns until they become second nature. In user interviews and client meetings, these small adjustments in how you listen change every interaction.' },
  { title: 'The Intelligent Investor', color: 'darkgreen', description: 'Graham\'s timeless advice: invest for the long term, don\'t time the market, put 90% in index funds. The discipline of separating emotion from financial decisions translates directly to design decisions--data over feelings, patience over panic.' },
  { title: 'The Hero and the Outlaw', color: 'red', description: 'Every powerful brand maps to one of twelve universal archetypes--the Hero, the Creator, the Explorer, the Sage. Brands that align with an archetype create deeper emotional connections because they tap into stories people already understand. When helping a client define positioning, this framework is always running in the background.' },
  { title: 'Laws of UX', color: 'cream', description: 'A concise collection of psychological principles that explain why users behave the way they do--Fitts\'s Law, Hick\'s Law, the Peak-End Rule, Jakob\'s Law. These aren\'t opinions about design, they\'re research-backed patterns of human behavior. Every product decision should be filtered through at least a few of these.' },
  { title: 'Emotional Design', color: 'cobalt', description: 'Design works on three levels--visceral, behavioral, and reflective--and the emotional response matters as much as usability. Most designers only optimize for behavioral, but the products people love succeed on all three. A beautiful product that\'s hard to use fails, but so does a usable product that feels nothing.' },
  { title: 'Sprint', color: 'mustard', description: 'Five days from problem to tested prototype. Google Ventures created a structured process that forces decisions and puts real user feedback at the center. The speed of validated learning is unmatched--you learn more in one sprint than months of speculation.' },
  { title: 'Inspired', color: 'burgundy', description: 'Marty Cagan breaks down how the best tech companies build products people love--through empowered teams, continuous discovery, and strong product leadership. Great products don\'t come from top-down roadmaps, they come from teams given problems to solve, not features to build.' },
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
  { title: 'Good to Great', desc: 'The leaders weren\'t driven by ego--they were selfless, worked for the love of it, and knew how to put the right people in the right roles. Success can trap you into repeating what worked before, but great companies stay great by constantly adapting and improving.' },
  { title: 'Super Communicators', desc: 'The best communicators ask lots of deep questions to show their interest and make people feel very heard. They understand the reason behind a conversation before they respond.' },
  { title: 'Extreme Ownership', desc: 'Leaders take full responsibility for outcomes, good or bad. In the workplace, it is so common for things to be pushed around--take responsibility for more than just your part.' },
];

interface AboutProps {
  setCurrentPage?: (page: Page) => void;
}

// Desktop: 2 rows of 15 | Mobile: 3 rows of 10
const DESKTOP_ROWS = [ALL_BOOKS.slice(0, 15), ALL_BOOKS.slice(15, 30)];
const MOBILE_ROWS = [ALL_BOOKS.slice(0, 10), ALL_BOOKS.slice(10, 20), ALL_BOOKS.slice(20, 30)];

function BookSpine({
  book,
  index,
  globalIndex,
  isActive,
  onToggle,
}: {
  book: typeof ALL_BOOKS[0];
  index: number;
  globalIndex: number;
  isActive: boolean;
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

  const bookShape = `polygon(${topShift}px 0px, ${totalW}px 0px, ${totalW}px ${h}px, ${w}px ${totalH}px, 0px ${totalH}px, 0px ${topDepth}px)`;
  const topShape = `polygon(${topShift}px 0px, ${totalW}px 0px, ${w}px ${topDepth}px, 0px ${topDepth}px)`;
  const rightSideShape = `polygon(${totalW}px 0px, ${totalW}px ${h}px, ${w}px ${totalH}px, ${w}px ${topDepth}px)`;

  return (
    <div
      className="relative flex-shrink-0 cursor-pointer"
      style={{
        width: `${totalW}px`,
        height: `${totalH}px`,
        zIndex: isActive ? ALL_BOOKS.length + 10 : zBase,
        marginRight: `${-(topShift - 3)}px`,
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
            fontFamily: 'var(--font-family-playfair), Georgia, serif',
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
}: {
  books: typeof ALL_BOOKS;
  globalOffset: number;
  activeBookIndex: number | null;
  setActiveBookIndex: (index: number | null) => void;
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

function BookModal({
  book,
  onClose,
}: {
  book: typeof ALL_BOOKS[0] | null;
  onClose: () => void;
}) {
  if (!book) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={book.title}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal card */}
      <div
        className="relative w-full max-w-lg p-6 md:p-8"
        style={{
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-2xl font-light transition-opacity hover:opacity-70"
          style={{ color: '#ffffff' }}
          aria-label="Close"
        >
          ×
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
  const activeBook = activeBookIndex !== null ? ALL_BOOKS[activeBookIndex] : null;

  return (
    <div className="py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">

      {/* HERO — full width */}
      <div className="px-4 md:px-8 mb-8 md:mb-12">
        <AnimateIn direction="up" className="pt-4 md:pt-8">
          <TextCard padding="lg">
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
            <p className="text-[15px] md:text-[17px] leading-[1.8] mb-5" style={{ color: '#ffffff' }}>
              I studied marketing at the University of New Hampshire and found my way into design through solving problems I experienced firsthand. Working as a merchandiser, doing gig delivery, and building products from scratch.
            </p>
            <p className="text-[15px] md:text-[17px] leading-[1.8] mb-5" style={{ color: '#ffffff' }}>
              That hands-on background shapes how I approach design: start with the real workflow, understand the business constraints, then build something that actually works.
            </p>
            <p className="text-[15px] md:text-[17px] leading-[1.8]" style={{ color: '#ffffff' }}>
              I read constantly. The books below have shaped how I think about design, leadership, and communication.
            </p>
          </TextCard>
        </AnimateIn>
      </div>

      {/* PHOTO CAROUSEL — below hero */}
      <div className="pb-8 md:pb-12">
        <Carousel
          speed={35}
          direction="left"
          pauseOnHover
          items={ABOUT_PHOTOS.map((img) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="h-48 md:h-64 w-48 md:w-64 object-cover aspect-square"
              style={{ borderRadius: 0 }}
              loading="lazy"
            />
          ))}
        />
      </div>

      <div className="max-w-[90rem] mx-auto px-4 md:px-8">

        {/* MY FAVORITES — standalone 3D books */}
        <AnimateIn direction="up" className="mb-16 md:mb-24 pb-8 md:pb-12">
          <TextCard padding="md" className="inline-block mb-8 md:mb-12">
            <h2
              className="text-[36px] md:text-[56px] leading-none tracking-wider font-black"
              style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: '#ffffff' }}
            >
              MY FAVORITES
            </h2>
          </TextCard>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-20 justify-items-center" style={{ perspective: '1200px' }}>
            {CURRENT_FAVORITES.map((book, index) => {
              const isActive = activeFavIndex === index;
              const colors = [BOOK_COLORS.red, BOOK_COLORS.blue, BOOK_COLORS.darkgreen];
              const c = colors[index % colors.length];
              const coverW = 200;
              const coverH = 280;
              const spineW = 26;
              const pageColor = '#d4cfc4';

              return (
                <div
                  key={book.title}
                  className="relative cursor-pointer"
                  style={{
                    width: `${coverW + spineW}px`,
                    height: `${coverH}px`,
                    zIndex: isActive ? 20 : 1,
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
                          style={{ fontFamily: 'var(--font-family-playfair), Georgia, serif', color: 'rgba(255,255,255,0.95)', textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.01em' }}
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
              );
            })}
          </div>
        </AnimateIn>

      </div>

      {/* BOOKSHELF — glossy black shelves with side description panel */}
      <div className="px-4 md:px-8">
        <AnimateIn direction="up" className="mb-12 md:mb-16 pb-8 md:pb-12">
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
                globalOffset={rowIndex * 15}
                activeBookIndex={activeBookIndex}
                setActiveBookIndex={setActiveBookIndex}
              />
            ))}
          </div>

          {/* Mobile/Tablet: 3 shelves */}
          <div className="lg:hidden max-w-[90rem] mx-auto">
            {MOBILE_ROWS.map((rowBooks, rowIndex) => (
              <ShelfRow
                key={rowIndex}
                books={rowBooks}
                globalOffset={rowIndex * 10}
                activeBookIndex={activeBookIndex}
                setActiveBookIndex={setActiveBookIndex}
              />
            ))}
          </div>

          {/* Book detail modal */}
          <BookModal book={activeBook} onClose={() => setActiveBookIndex(null)} />
        </AnimateIn>
      </div>

      {/* CTA */}
      <div className="max-w-[90rem] mx-auto px-4 md:px-8">
        <AnimateIn direction="up" className="mb-12 md:mb-16">
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
        </AnimateIn>
      </div>

      {/* Footer spacer */}
      <div className="h-[calc(30vh+25px)] md:h-[calc(35vh+25px)]" />
    </div>
  );
}
