'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, AccentColor } from '@/utils/cardStyles';

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  toggleTheme: () => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
}

function getInitialAccent(): AccentColor {
  if (typeof window === 'undefined') return 'bw';
  const stored = localStorage.getItem('accentColor');
  const valid: AccentColor[] = ['blue', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'bw', 'tan'];
  if (stored && valid.includes(stored as AccentColor)) return stored as AccentColor;
  return 'bw';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [accentColor, setAccentColorState] = useState<AccentColor>('bw');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setAccentColorState(getInitialAccent());
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
  };

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem('accentColor', color);
  };

  // Avoid flash of wrong theme on SSR
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'dark', accentColor: 'bw', toggleTheme: () => {}, setAccentColor: () => {} }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, accentColor, toggleTheme, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
