'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';
import Carousel from './Carousel';

const ALL_BOOKS = [
  { title: 'The Art of Innovation', color: 'red', description: 'Creativity is not a lightbulb moment--it is a process with structure that makes the best creative works happen.' },
  { title: 'Creative Confidence', color: 'cobalt', description: 'How IDEO goes into organizations and helps them with the creative process.' },
  { title: 'Articulating Design Decisions', color: 'brown', description: 'How to work with clients in design based off of the author\'s long experience in design through building shared understanding.' },
  { title: 'The Science of Scaling', color: 'tan', description: 'How organizations hold themselves back by forgetting about the big picture and setting low goals.' },
  { title: 'Creative Selection', color: 'cream', description: 'The author\'s personal experience working at Apple--talks about simplicity and making things as easy as possible for the user.' },
  { title: 'Indistractable', color: 'burgundy', description: 'About why we get distracted so easily and why it\'s so important to focus without distractions.' },
  { title: 'Hooked', color: 'darkgreen', description: 'Talks about how the most successful products build habits with people through different strategies: triggers, actions, rewards, investment.' },
  { title: 'How to Win Friends & Influence People', color: 'navy', description: 'Shows the value in the world of being genuine and inquisitive.' },
  { title: 'The Power of When', color: 'teal', description: 'You have a biological clock--you have peak energy times and should implement habits based on your type.' },
  { title: '48 Laws of Power', color: 'charcoal', description: 'Power dynamics shape every interaction. Understanding these patterns helps you navigate politics and recognize manipulation.' },
  { title: 'The Dichotomy of Leadership', color: 'olive', description: 'This book pairs with Extreme Ownership and explains the caveats of overdoing some of the things in the first book.' },
  { title: 'Start with Why', color: 'mustard', description: 'People don\'t buy what you do--they buy why you do it. Leading with purpose inspires loyalty and creates movements.' },
  { title: 'Steal Like an Artist', color: 'plum', description: 'It is part of the creative process to be influenced by others\' work.' },
  { title: 'Storyworthy', color: 'rust', description: 'What\'s important in a story is the transformation of the character through small moments.' },
  { title: 'The Ten Faces of Innovation', color: 'blue', description: 'About how IDEO operates as a whole--they focus on creativity and believe that anything is possible.' },
  { title: 'Influence', color: 'terracotta', description: 'Goes over the principles that persuade people, how other people use those against you, and how you can use them ethically.' },
  { title: 'The 5 AM Club', color: 'sage', description: 'The morning sets the tone of your day. Getting things done early so that you can focus on primary work during the day.' },
  { title: 'Deep Work', color: 'midnight', description: 'Some roles benefit from stretches of undistracted, very focused work.' },
  { title: 'Building a StoryBrand', color: 'forest', description: 'About your communications with the customer. Should be all related to their story of growth.' },
  { title: 'Can\'t Hurt Me', color: 'oxblood', description: 'About mastering your mind and not giving up because you feel uncomfortable.' },
  { title: 'The Practice', color: 'white', description: 'Show up consistently and focus on improving bit by bit through repetition.' },
  { title: 'The Goal', color: 'wine', description: 'Lean works because you map how everything actually functions and uncover what\'s limiting you.' },
  { title: 'Atomic Habits', color: 'copper', description: 'About how to build and keep your habits.' },
  { title: 'How to Talk to Anyone', color: 'slate', description: 'Master the art of conversation with practical techniques.' },
  { title: 'The Intelligent Investor', color: 'darkgreen', description: 'A guide about investing for life: 90% in index funds, 10% in stock picks.' },
  { title: 'The Hero and the Outlaw', color: 'red', description: 'Brands that tap into universal archetypes create deeper emotional connections and stand out in crowded markets.' },
  { title: 'Laws of UX', color: 'cream', description: 'A collection of psychology principles that designers can use to build more intuitive, human-centered products.' },
  { title: 'Emotional Design', color: 'cobalt', description: 'Good design works on three levels--visceral, behavioral, and reflective--and the emotional response matters as much as usability.' },
  { title: 'Sprint', color: 'mustard', description: 'Five days to go from problem to tested prototype. A structured process for answering critical business questions through design and prototyping.' },
  { title: 'Inspired', color: 'burgundy', description: 'How the best tech companies build products people love--through empowered product teams, continuous discovery, and strong product leadership.' },
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

// Placeholder photos — replace with real images in public/images/about/
const ABOUT_PHOTOS = [
  { src: '/images/about/photo-1.jpg', alt: 'About photo 1' },
  { src: '/images/about/photo-2.jpg', alt: 'About photo 2' },
  { src: '/images/about/photo-3.jpg', alt: 'About photo 3' },
  { src: '/images/about/photo-4.jpg', alt: 'About photo 4' },
  { src: '/images/about/photo-5.jpg', alt: 'About photo 5' },
  { src: '/images/about/photo-6.jpg', alt: 'About photo 6' },
];

const INTERESTS = [
  { label: 'Aquascaping & Aquaponics', text: 'I enjoy creating aesthetically pleasing environments and understanding intricate biological processes.' },
  { label: 'Karaoke & Home Audio', text: 'I want to bring joy to others and create immersive experiences.' },
  { label: 'The Great Outdoors & Reading', text: 'I enjoy exploring diverse environments and acquiring new knowledge.' },
  { label: 'Design, Engineering & Architecture', text: 'I value the process of bringing abstract ideas into tangible forms.' },
  { label: 'Climbing, Strength Training & Wellness', text: 'I value overcoming obstacles and achieving ambitious goals.' },
];

const CURRENT_FAVORITES = [
  { title: 'Good to Great', desc: 'The leaders weren\'t driven by ego--they were selfless, worked for the love of it, and knew how to put the right people in the right roles. Success can trap you into repeating what worked before, but great companies stay great by constantly adapting and improving.' },
  { title: 'Super Communicators', desc: 'The best communicators ask lots of deep questions to show their interest and make people feel very heard. They understand the reason behind a conversation before they respond.' },
  { title: 'Extreme Ownership', desc: 'Leaders take full responsibility for outcomes, good or bad. In the workplace, it is so common for things to be pushed around--take responsibility for more than just your part.' },
];

export default function About() {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const secondaryTextColor = cardStyles.getSecondaryTextColor(theme);
  const [activeBookIndex, setActiveBookIndex] = useState<number | null>(null);
  const [activeFavIndex, setActiveFavIndex] = useState<number | null>(null);


  return (
    <div className="py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">

      {/* ─── PHOTO CAROUSEL — full width at top ─── */}
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
              className="h-48 md:h-64 w-48 md:w-64 rounded-lg object-cover aspect-square"
              loading="lazy"
            />
          ))}
        />
      </div>

      <div className="max-w-[90rem] mx-auto px-4 md:px-8">

        {/* ─── HERO ─── */}
        <div className="pt-4 md:pt-8 mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Photo */}
            <div
              className="w-full aspect-[4/5] rounded-2xl flex items-center justify-center order-first"
              style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }}
            >
              <img
                src="/images/about-photo.jpg"
                alt="Tom Sesler"
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<span style="color: ${secondaryTextColor}; font-size: 14px;">Photo placeholder</span>`;
                  }
                }}
              />
            </div>
            {/* Text */}
            <div>
              <h1
                className="text-[48px] sm:text-[60px] md:text-[72px] leading-none tracking-wider font-black mb-6 md:mb-8"
                style={{
                  fontFamily: "var(--font-family-bungee), sans-serif",
                  WebkitTextStroke: `4px ${primaryColor}`,
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  paintOrder: 'stroke fill',
                }}
              >
                ABOUT
              </h1>
              <p className="text-[15px] md:text-[17px] leading-[1.8] mb-5" style={{ color: textColor }}>
                I studied marketing at the University of New Hampshire and found my way into design through solving problems I experienced firsthand — working as a merchandiser, doing gig delivery, and building products from scratch.
              </p>
              <p className="text-[15px] md:text-[17px] leading-[1.8] mb-5" style={{ color: textColor }}>
                That hands-on background shapes how I approach design: start with the real workflow, understand the business constraints, then build something that actually works.
              </p>
              <p className="text-[15px] md:text-[17px] leading-[1.8]" style={{ color: textColor }}>
                Outside of work, I read constantly, climb, and tinker with aquascaping and home audio setups. The books below have shaped how I think about design, leadership, and communication.
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-[90rem] mx-auto px-4 md:px-8">

        {/* ─── INTERESTS ─── */}
        <div className="mb-12 md:mb-16 pb-8 md:pb-12">
          <h2
            className="text-[36px] md:text-[56px] mb-8 md:mb-12 leading-none tracking-wider font-black"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}
          >
            INTERESTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
            {INTERESTS.map((interest) => (
              <div key={interest.label} className="py-2">
                <h3 className="text-base font-bold mb-1" style={{ color: primaryColor }}>
                  {interest.label}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: secondaryTextColor }}>
                  {interest.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── MY FAVORITES — standalone 3D books ─── */}
        <div className="mb-16 md:mb-24 pb-8 md:pb-12">
          <h2
            className="text-[36px] md:text-[56px] mb-8 md:mb-12 leading-none tracking-wider font-black"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}
          >
            MY FAVORITES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-20 justify-items-center" style={{ perspective: '1200px' }}>
            {CURRENT_FAVORITES.map((book, index) => {
              const isActive = activeFavIndex === index;
              const colors = [BOOK_COLORS.red, BOOK_COLORS.blue, BOOK_COLORS.darkgreen];
              const c = colors[index % colors.length];
              const coverW = 200;
              const coverH = 280;
              const spineW = 26;
              const pageColor = theme === 'dark' ? '#d4cfc4' : '#f0ebe0';

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
                  {/* 3D book body */}
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
                    {/* SPINE — left edge */}
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

                    {/* PAGES — visible when cover opens */}
                    <div
                      className="absolute inset-0 rounded-r-sm overflow-hidden p-4 flex flex-col justify-center"
                      style={{
                        background: pageColor,
                        boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.1)',
                        zIndex: 1,
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

                    {/* FRONT COVER — swings open on click */}
                    <div
                      className="absolute inset-0 rounded-r-md transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{
                        transformOrigin: 'left center',
                        transformStyle: 'preserve-3d',
                        transform: isActive ? 'rotateY(-155deg)' : 'rotateY(0deg)',
                        zIndex: 3,
                      }}
                    >
                      {/* Front face */}
                      <div
                        className="absolute inset-0 rounded-r-md flex flex-col items-center justify-center p-5"
                        style={{
                          background: `linear-gradient(145deg, ${c.light} 0%, ${c.bg} 40%, ${c.edge} 100%)`,
                          boxShadow: `2px 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)`,
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <span
                          className="text-[16px] md:text-[18px] font-bold text-center leading-tight italic"
                          style={{ fontFamily: 'var(--font-family-playfair), Georgia, serif', color: 'rgba(255,255,255,0.95)', textShadow: '0 2px 4px rgba(0,0,0,0.4)', letterSpacing: '0.01em' }}
                        >
                          {book.title}
                        </span>
                        <div className="w-12 h-[2px] mt-3 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
                      </div>
                      {/* Back face (visible when flipped) */}
                      <div
                        className="absolute inset-0 rounded-r-md"
                        style={{
                          background: c.edge,
                          transform: 'rotateY(180deg)',
                          backfaceVisibility: 'hidden',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── BOOKSHELF ─── */}
        <div className="mb-12 md:mb-16 pb-8 md:pb-12">
          <h2
            className="text-[36px] md:text-[56px] mb-8 md:mb-12 leading-none tracking-wider font-black"
            style={{ fontFamily: "var(--font-family-bungee), sans-serif", color: textColor }}
          >
            BOOKSHELF
          </h2>

          {/* Shelf — 3D books using clip-path for unified silhouette */}
          <div className="relative">
            <div
              className="flex flex-wrap items-end"
              style={{ paddingBottom: '18px', paddingTop: '12px' }}
            >
              {ALL_BOOKS.map((book, index) => {
                const isActive = activeBookIndex === index;
                const c = BOOK_COLORS[book.color] || BOOK_COLORS.brown;
                const baseH = 150;
                const h = baseH + Math.min(book.title.length * 2.5, 80);
                const w = 42 + (book.title.length % 4) * 3;
                const topDepth = 10;
                const topShift = 10;
                const totalW = w + topShift;
                const totalH = topDepth + h;
                const pageEdgeColor = theme === 'dark' ? '#D4CFC4' : '#F0EBE0';
                const pageEdgeDark = theme === 'dark' ? '#B8B0A0' : '#DED6C4';
                const zBase = index + 1;

                // Expanded shape — includes right side face for visible page edges
                const bookShape = `polygon(${topShift}px 0px, ${totalW}px 0px, ${totalW}px ${h}px, ${w}px ${totalH}px, 0px ${totalH}px, 0px ${topDepth}px)`;
                const topShape = `polygon(${topShift}px 0px, ${totalW}px 0px, ${w}px ${topDepth}px, 0px ${topDepth}px)`;
                const rightSideShape = `polygon(${totalW}px 0px, ${totalW}px ${h}px, ${w}px ${totalH}px, ${w}px ${topDepth}px)`;

                return (
                  <div
                    key={index}
                    className="relative flex-shrink-0 cursor-pointer"
                    style={{
                      width: `${totalW}px`,
                      height: `${totalH}px`,
                      zIndex: isActive ? ALL_BOOKS.length + 10 : zBase,
                      marginRight: `${-(topShift - 3)}px`,
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveBookIndex(isActive ? null : index)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveBookIndex(isActive ? null : index); } }}
                    aria-label={book.title}
                    title={book.title}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-300 ease-out"
                      style={{ transform: isActive ? 'translateY(20px) translateX(-8px)' : 'none' }}
                    >
                      {/* Base layer — curved spine with cylindrical lighting */}
                      <div
                        className="absolute inset-0"
                        style={{
                          clipPath: bookShape,
                          background: `linear-gradient(90deg, ${c.edge} 0%, ${c.side} 6%, ${c.bg} 18%, ${c.light} 45%, ${c.bg} 72%, ${c.side} 90%, ${c.edge} 100%)`,
                          boxShadow: isActive ? '2px 6px 16px rgba(0,0,0,0.4)' : 'none',
                        }}
                      />

                      {/* Left edge — rounded corner shading */}
                      <div
                        className="absolute"
                        style={{
                          clipPath: bookShape,
                          left: 0,
                          top: `${topDepth}px`,
                          width: '6px',
                          height: `${h}px`,
                          background: `linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.08) 40%, transparent 100%)`,
                        }}
                      />

                      {/* Right edge of spine — rounded corner transition to page edges */}
                      <div
                        className="absolute"
                        style={{
                          left: `${w - 6}px`,
                          top: `${topDepth}px`,
                          width: '8px',
                          height: `${h}px`,
                          background: `linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.15) 100%)`,
                        }}
                      />

                      {/* Right side face — page edges */}
                      <div
                        className="absolute inset-0"
                        style={{
                          clipPath: rightSideShape,
                          background: c.side,
                        }}
                      />

                      {/* Right side shadow — depth at the spine-to-pages corner */}
                      <div
                        className="absolute inset-0"
                        style={{
                          clipPath: rightSideShape,
                          background: `linear-gradient(90deg, rgba(0,0,0,${theme === 'dark' ? '0.35' : '0.18'}) 0%, rgba(0,0,0,0.04) 60%, transparent 100%)`,
                        }}
                      />

                      {/* Top face overlay — cream page edges */}
                      <div
                        className="absolute inset-0"
                        style={{
                          clipPath: topShape,
                          background: `linear-gradient(180deg, ${pageEdgeColor} 0%, ${pageEdgeDark} 70%, rgba(0,0,0,0.08) 100%)`,
                        }}
                      />

                      {/* Soft edge between top face and spine */}
                      <div
                        className="absolute"
                        style={{
                          left: 0,
                          top: `${topDepth - 1}px`,
                          width: `${w}px`,
                          height: '3px',
                          background: `linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,${theme === 'dark' ? '0.18' : '0.1'}) 50%, transparent 100%)`,
                        }}
                      />

                      {/* Title on spine */}
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
              })}
            </div>

            {/* Shelf surface */}
            <div
              className="h-[6px] rounded-sm"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)'
                  : 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 100%)',
              }}
            />
            {/* Shelf shadow */}
            <div
              className="h-[8px]"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%)'
                  : 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 100%)',
              }}
            />
          </div>

          {/* Slide-out description panel */}
          <div
            className="overflow-hidden transition-all duration-300 ease-out"
            style={{
              maxHeight: activeBookIndex !== null ? '200px' : '0px',
              opacity: activeBookIndex !== null ? 1 : 0,
            }}
          >
            {activeBookIndex !== null && (
              <div className="pt-6 pb-2">
                <h3 className="text-xl font-bold mb-2" style={{ color: textColor }}>
                  {ALL_BOOKS[activeBookIndex].title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: secondaryTextColor }}>
                  {ALL_BOOKS[activeBookIndex].description}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Footer spacer */}

      <div className="h-[calc(60vh+50px)] md:h-[calc(70vh+50px)]" />
    </div>
  );
}
