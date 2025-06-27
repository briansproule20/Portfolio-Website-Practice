'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'monochrome';

type ThemeContextType = {
  currentTheme: ThemeMode;
  cycleTheme: () => void;
  // Legacy support for existing components
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme && ['light', 'dark', 'monochrome'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (theme: ThemeMode) => {
    // Remove all theme classes
    document.documentElement.classList.remove('dark', 'monochrome');
    
    // Apply the new theme class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'monochrome') {
      document.documentElement.classList.add('monochrome');
    }
    // light theme is the default (no class needed)
  };

  const cycleTheme = () => {
    const themeOrder: ThemeMode[] = ['light', 'dark', 'monochrome'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const toggleDarkMode = () => {
    // Legacy support - cycles between light and dark only
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ 
      currentTheme, 
      cycleTheme, 
      isDarkMode: currentTheme === 'dark', 
      toggleDarkMode 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 