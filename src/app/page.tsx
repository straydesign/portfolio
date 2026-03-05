'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/context/ThemeContext';
import { colorMap } from '@/utils/cardStyles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/components/Home';

// Lazy-load heavy canvas animation — nothing to SSR (it's a <canvas>)
const Waves = dynamic(() => import('@/components/Waves'), { ssr: false });

// Lazy-load pages that aren't the default view
const About = dynamic(() => import('@/components/About'));
const Resume = dynamic(() => import('@/components/Resume'));
const MiddlemanCaseStudy = dynamic(() => import('@/components/MiddlemanCaseStudy'));
const DayOneCaseStudy = dynamic(() => import('@/components/DayOneCaseStudy'));
const DoorDashCaseStudy = dynamic(() => import('@/components/DoorDashCaseStudy'));
const Services = dynamic(() => import('@/components/Services'));
const Work = dynamic(() => import('@/components/Work'));

type Page = 'home' | 'about' | 'work' | 'resume' | 'middleman-case-study' | 'day-one-case-study' | 'doordash-case-study' | 'services';

function getPageFromPath(pathname: string): Page {
  const path = pathname.replace(/^\//, '');
  switch (path) {
    case 'about': return 'about';
    case 'work': return 'work';
    case 'resume': return 'resume';
    case 'middleman': case 'middleman-case-study': return 'middleman-case-study';
    case 'dayone': case 'day-one': case 'day-one-case-study': return 'day-one-case-study';
    case 'doordash': case 'doordash-case-study': return 'doordash-case-study';
    case 'services': return 'services';
    default: return 'home';
  }
}

function getPathFromPage(page: Page): string {
  switch (page) {
    case 'home': return '/';
    case 'about': return '/about';
    case 'work': return '/work';
    case 'resume': return '/resume';
    case 'middleman-case-study': return '/middleman';
    case 'day-one-case-study': return '/dayone';
    case 'doordash-case-study': return '/doordash';
    case 'services': return '/services';
    default: return '/';
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { theme, accentColor } = useTheme();

  useEffect(() => {
    setCurrentPage(getPageFromPath(window.location.pathname));
  }, []);

  useEffect(() => {
    const newPath = getPathFromPage(currentPage);
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update document title for accessibility (WCAG 2.4.2)
    const titles: Record<Page, string> = {
      'home': 'Tom Sesler — Web Design & Product Design | Erie, PA',
      'about': 'About Tom Sesler | Web Designer in Erie, PA',
      'work': 'My Work | Tom Sesler — Erie, PA',
      'resume': 'Resume | Tom Sesler — Web Designer Erie, PA',
      'middleman-case-study': 'Merchandising System Case Study | Tom Sesler',
      'day-one-case-study': 'firstday.life Case Study | Tom Sesler',
      'doordash-case-study': 'DoorDash UX Evaluation | Tom Sesler',
      'services': 'Professional Web Design in Erie, PA | Tom Sesler',
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(getPageFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const basePrimaryColor = colorMap[accentColor];
  const primaryColor = accentColor === 'bw' && theme === 'dark' ? '#ffffff' : basePrimaryColor;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {currentPage !== 'work' && currentPage !== 'services' && <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />}
      <main id="main-content" className="flex-1 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-0" style={{ background: theme === 'dark' ? '#000000' : '#ffffff' }} />
        <div className="fixed inset-0 z-[2] pointer-events-none">
          <Waves
            lineColor={primaryColor}
            backgroundColor="rgba(255, 255, 255, 0)"
            isDarkMode={theme === 'dark'}
            waveSpeedX={0.01}
            waveSpeedY={0.005}
            waveAmpX={15}
            waveAmpY={8}
            friction={0.975}
            tension={0.00125}
            maxCursorMove={15}
            xGap={12}
            yGap={36}
          />
        </div>
        <div className="relative z-10">
          {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
          {currentPage === 'about' && <About />}
          {currentPage === 'work' && <Work />}
          {currentPage === 'resume' && <Resume setCurrentPage={setCurrentPage} />}
          {currentPage === 'middleman-case-study' && <MiddlemanCaseStudy onBack={() => setCurrentPage('home')} />}
          {currentPage === 'day-one-case-study' && <DayOneCaseStudy onBack={() => setCurrentPage('home')} />}
          {currentPage === 'doordash-case-study' && <DoorDashCaseStudy onBack={() => setCurrentPage('home')} />}
          {currentPage === 'services' && <Services />}
        </div>
      </main>
      {currentPage !== 'work' && <Footer setCurrentPage={setCurrentPage} currentPage={currentPage} />}
    </div>
  );
}
