'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import * as cardStyles from '@/utils/cardStyles';

const ALL_BOOKS = [
  { title: 'The Art of Innovation', description: 'Creativity is not a lightbulb moment--it is a process with structure that makes the best creative works happen.' },
  { title: 'Creative Confidence', description: 'How IDEO goes into organizations and helps them with the creative process.' },
  { title: 'Articulating Design Decisions', description: 'How to work with clients in design based off of the author\'s long experience in design through building shared understanding.' },
  { title: 'The Science of Scaling', description: 'How organizations hold themselves back by forgetting about the big picture and setting low goals.' },
  { title: 'Creative Selection', description: 'The author\'s personal experience working at Apple--talks about simplicity and making things as easy as possible for the user.' },
  { title: 'Indistractable', description: 'About why we get distracted so easily and why it\'s so important to focus without distractions.' },
  { title: 'Hooked', description: 'Talks about how the most successful products build habits with people through different strategies: triggers, actions, rewards, investment.' },
  { title: 'How to Win Friends & Influence People', description: 'Shows the value in the world of being genuine and inquisitive.' },
  { title: 'The Power of When', description: 'You have a biological clock--you have peak energy times and should implement habits based on your type.' },
  { title: '48 Laws of Power', description: 'Power dynamics shape every interaction. Understanding these patterns helps you navigate politics and recognize manipulation.' },
  { title: 'The Dichotomy of Leadership', description: 'This book pairs with Extreme Ownership and explains the caveats of overdoing some of the things in the first book.' },
  { title: 'Start with Why', description: 'People don\'t buy what you do--they buy why you do it. Leading with purpose inspires loyalty and creates movements.' },
  { title: 'Steal Like an Artist', description: 'It is part of the creative process to be influenced by others\' work.' },
  { title: 'Storyworthy', description: 'What\'s important in a story is the transformation of the character through small moments.' },
  { title: 'The Ten Faces of Innovation', description: 'About how IDEO operates as a whole--they focus on creativity and believe that anything is possible.' },
  { title: 'Influence', description: 'Goes over the principles that persuade people, how other people use those against you, and how you can use them ethically.' },
  { title: 'The 5 AM Club', description: 'The morning sets the tone of your day. Getting things done early so that you can focus on primary work during the day.' },
  { title: 'Deep Work', description: 'Some roles benefit from stretches of undistracted, very focused work.' },
  { title: 'Building a StoryBrand', description: 'About your communications with the customer. Should be all related to their story of growth.' },
  { title: 'Can\'t Hurt Me', description: 'About mastering your mind and not giving up because you feel uncomfortable.' },
  { title: 'The Practice', description: 'Show up consistently and focus on improving bit by bit through repetition.' },
  { title: 'The Goal', description: 'Lean works because you map how everything actually functions and uncover what\'s limiting you.' },
  { title: 'Atomic Habits', description: 'About how to build and keep your habits.' },
  { title: 'How to Talk to Anyone', description: 'Master the art of conversation with practical techniques.' },
  { title: 'The Intelligent Investor', description: 'A guide about investing for life: 90% in index funds, 10% in stock picks.' },
];

export default function About() {
  const { theme, accentColor } = useTheme();
  const primaryColor = cardStyles.getPrimaryColor(accentColor, theme);
  const textColor = cardStyles.getTextColor(theme);
  const cardBg = cardStyles.getCardBackground(theme);
  const [activeBookIndex, setActiveBookIndex] = useState<number | null>(null);

  const cardStyle = {
    background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'}`,
    boxShadow: theme === 'dark' ? '0 4px 16px 0 rgba(0, 0, 0, 0.3)' : '0 4px 16px 0 rgba(0, 0, 0, 0.12)',
  };

  return (
    <div className="px-6 md:px-12 py-8 md:py-12 min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[48px] md:text-[80px] mb-6 md:mb-10 leading-none tracking-wider font-black"
          style={{ fontFamily: "var(--font-family-bungee), sans-serif", WebkitTextStroke: `5px ${primaryColor}`, WebkitTextFillColor: 'transparent', color: 'transparent', paintOrder: 'stroke fill' }}>
          BOOKS & INTERESTS
        </h1>

        {/* About Me */}
        <div className="p-6 md:p-8 rounded-[48px] mb-8 md:mb-10" style={cardStyle}>
          <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ color: primaryColor, fontWeight: 900 }}>ABOUT ME</h2>
          <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: textColor }}>
            I studied marketing at the University of New Hampshire and found my way into design through solving problems I experienced firsthand — working as a merchandiser, doing gig delivery, and building products from scratch. That hands-on background shapes how I approach design: start with the real workflow, understand the business constraints, then build something that actually works.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>
            Outside of work, I read constantly, climb, and tinker with aquascaping and home audio setups. The books below have shaped how I think about design, leadership, and communication.
          </p>
        </div>

        <div className="space-y-8 md:space-y-10">
          {/* Current Favorites */}
          <div className="p-6 md:p-8 rounded-[48px]" style={cardStyle}>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ color: primaryColor, fontWeight: 900 }}>CURRENT FAVORITES</h2>
            <div className="space-y-4 md:space-y-5">
              {[
                { title: 'Good to Great', desc: 'The leaders weren\'t driven by ego--they were selfless, worked for the love of it, and knew how to put the right people in the right roles. Success can trap you into repeating what worked before, but great companies stay great by constantly adapting and improving.' },
                { title: 'Super Communicators', desc: 'The best communicators ask lots of deep questions to show their interest and make people feel very heard. They understand the reason behind a conversation before they respond.' },
                { title: 'Extreme Ownership', desc: 'Leaders take full responsibility for outcomes, good or bad. In the workplace, it is so common for things to be pushed around--take responsibility for more than just your part.' },
              ].map((book) => (
                <div key={book.title}>
                  <h3 className="text-lg md:text-xl mb-2" style={{ color: primaryColor, fontWeight: 700 }}>{book.title}</h3>
                  <p className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>{book.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* All Books */}
          <div className="p-6 md:p-8 rounded-[48px]" style={cardStyle}>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ color: primaryColor, fontWeight: 900 }}>ALL BOOKS</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              {ALL_BOOKS.map((book, index) => (
                <button key={index}
                  onClick={() => setActiveBookIndex(activeBookIndex === index ? null : index)}
                  className="px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: activeBookIndex === index ? primaryColor : cardBg,
                    color: activeBookIndex === index ? (theme === 'dark' ? '#000000' : '#ffffff') : textColor,
                    border: `2px solid ${primaryColor}`,
                    boxShadow: activeBookIndex === index ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 2px 6px rgba(0, 0, 0, 0.1)',
                  }}>
                  {book.title}
                </button>
              ))}
            </div>
            {activeBookIndex !== null && (
              <div className="p-5 md:p-6 rounded-lg mt-4" style={{ backgroundColor: cardBg, boxShadow: '0 0 15px rgba(0, 0, 0, 0.15)', border: `2px solid ${primaryColor}` }}>
                <h3 className="text-lg md:text-xl mb-2 md:mb-3" style={{ color: primaryColor, fontWeight: 700 }}>{ALL_BOOKS[activeBookIndex].title}</h3>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>{ALL_BOOKS[activeBookIndex].description}</p>
              </div>
            )}
          </div>

          {/* Interests */}
          <div className="p-6 md:p-8 rounded-[48px]" style={cardStyle}>
            <h2 className="text-2xl md:text-3xl mb-4 md:mb-6" style={{ color: primaryColor, fontWeight: 900 }}>INTERESTS</h2>
            <div className="space-y-3 md:space-y-4">
              {[
                { label: 'Aquascaping & Aquaponics:', text: 'I enjoy creating aesthetically pleasing environments and understanding intricate biological processes.' },
                { label: 'Karaoke & Home Audio:', text: 'I want to bring joy to others and create immersive experiences.' },
                { label: 'The Great Outdoors & Reading:', text: 'I enjoy exploring diverse environments and acquiring new knowledge.' },
                { label: 'Design, Engineering & Architecture:', text: 'I value the process of bringing abstract ideas into tangible forms.' },
                { label: 'Climbing, Strength Training & Wellness:', text: 'I value overcoming obstacles and achieving ambitious goals.' },
              ].map((interest) => (
                <p key={interest.label} className="text-base md:text-lg leading-relaxed" style={{ color: textColor }}>
                  <strong style={{ color: primaryColor }}>{interest.label}</strong> {interest.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
