'use client';

import { type Page } from '@/data/projects';
import Hero from './sections/Hero';
import Work from './sections/Work';
import LiveSites from './sections/LiveSites';
import AboutSection from './sections/AboutSection';
import KindWords from './sections/KindWords';
import Contact from './sections/Contact';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  return (
    <div className="min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-72px)]">
      <Hero onResume={() => setCurrentPage('resume')} />
      <Work onOpen={setCurrentPage} />
      <LiveSites />
      <AboutSection />
      <KindWords />
      <Contact />
      <div className="h-[calc(20vh+25px)] md:h-[calc(25vh+25px)]" />
    </div>
  );
}
