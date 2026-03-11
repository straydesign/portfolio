'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/components/Home';
import { type Page, getPageFromPath, getPathFromPage, getDocumentTitle } from '@/data/projects';

import { BrickWallWrapper } from '@/components/three/BrickWallWrapper';

// Lazy-load pages that aren't the default view
const About = dynamic(() => import('@/components/About'));
const Resume = dynamic(() => import('@/components/Resume'));
const MiddlemanCaseStudy = dynamic(() => import('@/components/MiddlemanCaseStudy'));
const DayOneCaseStudy = dynamic(() => import('@/components/DayOneCaseStudy'));
const DoorDashCaseStudy = dynamic(() => import('@/components/DoorDashCaseStudy'));
const Work = dynamic(() => import('@/components/Work'));

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    setCurrentPage(getPageFromPath(window.location.pathname));
  }, []);

  useEffect(() => {
    const newPath = getPathFromPage(currentPage);
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = getDocumentTitle(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(getPageFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {currentPage !== 'work' && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <main id="main-content" className="flex-1 relative overflow-hidden">
        <div className="fixed inset-0 z-[2] pointer-events-none">
          <BrickWallWrapper theme="dark" accentColor="#ffffff" />
        </div>
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
              {currentPage === 'about' && <About setCurrentPage={setCurrentPage} />}
              {currentPage === 'work' && <Work />}
              {currentPage === 'resume' && <Resume setCurrentPage={setCurrentPage} />}
              {currentPage === 'middleman-case-study' && <MiddlemanCaseStudy onBack={() => setCurrentPage('home')} />}
              {currentPage === 'day-one-case-study' && <DayOneCaseStudy onBack={() => setCurrentPage('home')} />}
              {currentPage === 'doordash-case-study' && <DoorDashCaseStudy onBack={() => setCurrentPage('home')} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      {currentPage !== 'work' && <Footer setCurrentPage={setCurrentPage} currentPage={currentPage} />}
    </div>
  );
}
