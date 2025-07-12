'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { generateTheme, applyThemeToSite, saveTheme, loadTheme, type Theme as RandomTheme, type Mood } from '../../lib/themeGenerator';

export type ThemeMode = 'light' | 'dark' | 'monochrome' | 'random';

type ThemeContextType = {
  currentTheme: ThemeMode;
  cycleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  generateRandomTheme: (mood?: Mood, existingTheme?: any) => void;
  returnToLight: () => void;
  currentRandomTheme: RandomTheme | null;
  // Legacy support for existing components
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('light');
  const [currentRandomTheme, setCurrentRandomTheme] = useState<RandomTheme | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme && ['light', 'dark', 'monochrome', 'random'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
      
      // If random theme, also load the saved random theme data
      if (savedTheme === 'random') {
        const savedRandomTheme = loadTheme();
        if (savedRandomTheme) {
          setCurrentRandomTheme(savedRandomTheme);
        }
      }
    }
  }, []);

  const applyTheme = (theme: ThemeMode) => {
    // Remove all theme classes and clear any random theme CSS variables
    document.documentElement.classList.remove('dark', 'monochrome');
    
    // Clear any random theme CSS variables that might be set
    document.documentElement.style.removeProperty('--background');
    document.documentElement.style.removeProperty('--foreground');
    document.documentElement.style.removeProperty('--accent');
    document.documentElement.style.removeProperty('--highlight');
    document.documentElement.style.removeProperty('--card');
    
    // Apply the exact original colors for each static theme
    if (theme === 'light') {
      // Light theme - original warm beige colors
      document.documentElement.style.setProperty('--background', '#f5f3ef');
      document.documentElement.style.setProperty('--foreground', '#3e372a');
      document.documentElement.style.setProperty('--accent', '#a89f91');
      document.documentElement.style.setProperty('--highlight', '#b7bfa3');
      document.documentElement.style.setProperty('--card', '#ede8de');
    } else if (theme === 'dark') {
      // Dark theme - original sophisticated dark colors
      document.documentElement.style.setProperty('--background', '#2d2a26');
      document.documentElement.style.setProperty('--foreground', '#ede8de');
      document.documentElement.style.setProperty('--accent', '#b7bfa3');
      document.documentElement.style.setProperty('--highlight', '#a89f91');
      document.documentElement.style.setProperty('--card', '#3e372a');
    } else if (theme === 'monochrome') {
      // Monochrome theme - original clean grayscale colors
      document.documentElement.style.setProperty('--background', '#fafafa');
      document.documentElement.style.setProperty('--foreground', '#1a1a1a');
      document.documentElement.style.setProperty('--accent', '#6b7280');
      document.documentElement.style.setProperty('--highlight', '#4b5563');
      document.documentElement.style.setProperty('--card', '#f3f4f6');
    } else if (theme === 'random') {
      // Apply random theme via CSS custom properties
      const savedRandomTheme = loadTheme();
      if (savedRandomTheme) {
        setCurrentRandomTheme(savedRandomTheme);
        applyThemeToSite(savedRandomTheme);
      } else {
        const newRandomTheme = generateTheme();
        setCurrentRandomTheme(newRandomTheme);
        applyThemeToSite(newRandomTheme);
        saveTheme(newRandomTheme);
      }
    }
  };

  const cycleTheme = () => {
    // Only cycle through static themes, never include random
    const themeOrder: ThemeMode[] = ['light', 'dark', 'monochrome'];
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const setTheme = (theme: ThemeMode) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  };

  const generateRandomTheme = (mood: Mood = 'none', existingTheme?: any) => {
    console.log('generateRandomTheme called with mood:', mood, 'existingTheme:', existingTheme);
    const newRandomTheme = existingTheme || generateTheme(mood);
    console.log('Using theme:', newRandomTheme);
    setCurrentRandomTheme(newRandomTheme);
    applyThemeToSite(newRandomTheme);
    console.log('Applied theme to site');
    saveTheme(newRandomTheme);
    console.log('Saved theme to localStorage');
    
    // Switch to random mode
    setCurrentTheme('random');
    localStorage.setItem('theme', 'random');
    console.log('Set current theme to random');
  };

  const returnToLight = () => {
    // Return to light theme from random theme
    setCurrentTheme('light');
    applyTheme('light');
    localStorage.setItem('theme', 'light');
    setCurrentRandomTheme(null);
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
      setTheme,
      generateRandomTheme,
      returnToLight,
      currentRandomTheme,
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