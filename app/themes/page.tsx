'use client';

import { motion } from 'framer-motion';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { Mood } from '../../lib/themeGenerator';

export default function Themes() {
  const { currentTheme, setTheme, generateRandomTheme, currentRandomTheme } = useTheme();
  
  // Debug logging
  console.log('Themes page loaded', { currentTheme, currentRandomTheme });

  const staticThemes = [
    {
      name: 'light' as ThemeMode,
      label: 'Light',
      description: 'Clean and minimal with warm beige tones',
      colors: {
        background: '#f5f3ef',
        foreground: '#3e372a',
        accent: '#a89f91',
        highlight: '#b7bfa3',
        card: '#ede8de'
      }
    },
    {
      name: 'dark' as ThemeMode,
      label: 'Dark',
      description: 'Sophisticated dark theme with earthy accents',
      colors: {
        background: '#2d2a26',
        foreground: '#ede8de',
        accent: '#b7bfa3',
        highlight: '#a89f91',
        card: '#3e372a'
      }
    },
    {
      name: 'monochrome' as ThemeMode,
      label: 'Monochrome',
      description: 'Clean grayscale for focused reading',
      colors: {
        background: '#fafafa',
        foreground: '#1a1a1a',
        accent: '#6b7280',
        highlight: '#4b5563',
        card: '#f3f4f6'
      }
    }
  ];

  const moodOptions = [
    { mood: undefined, label: 'Random', emoji: '🎲', description: 'Completely random color generation' },
    { mood: 'euphoric' as Mood, label: 'Euphoric', emoji: '🌟', description: 'Warm, vibrant colors for positive moods' },
    { mood: 'melancholy' as Mood, label: 'Melancholy', emoji: '🌙', description: 'Cool, subdued colors for contemplative moods' }
  ];

  const renderColorSwatch = (color: string, label: string) => (
    <div className="flex items-center gap-2">
      <div 
        className="w-4 h-4 rounded-full border border-[var(--accent)]" 
        style={{ backgroundColor: color }}
      />
      <span className="text-xs font-mono">{label}</span>
    </div>
  );

  const renderStaticThemeCard = (theme: typeof staticThemes[0], index: number) => (
    <motion.div
      key={theme.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative rounded-xl p-6 border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
        currentTheme === theme.name 
          ? 'border-[var(--highlight)] bg-[var(--highlight)] bg-opacity-10' 
          : 'border-[var(--accent)] hover:border-[var(--highlight)]'
      }`}
      onClick={() => setTheme(theme.name)}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-[var(--foreground)]">{theme.label}</h3>
          {currentTheme === theme.name && (
            <div className="w-6 h-6 bg-[var(--highlight)] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[var(--background)]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          )}
        </div>
        
        <p className="text-sm text-[var(--accent)] mb-4">{theme.description}</p>
        
        {/* Color Palette Preview */}
        <div className="grid grid-cols-5 gap-1 mb-4">
          <div className="h-8 rounded" style={{ backgroundColor: theme.colors.background }} title="Background" />
          <div className="h-8 rounded" style={{ backgroundColor: theme.colors.foreground }} title="Foreground" />
          <div className="h-8 rounded" style={{ backgroundColor: theme.colors.accent }} title="Accent" />
          <div className="h-8 rounded" style={{ backgroundColor: theme.colors.highlight }} title="Highlight" />
          <div className="h-8 rounded" style={{ backgroundColor: theme.colors.card }} title="Card" />
        </div>
      </div>

      {/* Sample Content */}
      <div className="space-y-3">
        <div className="bg-[var(--card)] p-3 rounded-lg">
          <h4 className="font-semibold text-[var(--foreground)] mb-2">Sample Content</h4>
          <p className="text-sm text-[var(--foreground)]">This is how text appears in this theme.</p>
          <button className="mt-2 px-3 py-1 bg-[var(--highlight)] text-[var(--background)] rounded text-sm">
            Sample Button
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderMoodCard = (moodOption: typeof moodOptions[0], index: number) => (
    <motion.div
      key={moodOption.label}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index + 3) * 0.1 }}
      className="relative rounded-xl p-6 border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-all duration-300 cursor-pointer hover:scale-105"
      onClick={() => generateRandomTheme(moodOption.mood)}
    >
      <div className="text-center">
        <div className="text-4xl mb-3">{moodOption.emoji}</div>
        <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{moodOption.label}</h3>
        <p className="text-sm text-[var(--accent)] mb-4">{moodOption.description}</p>
        
        <button className="px-6 py-2 bg-[var(--highlight)] text-[var(--background)] rounded-lg font-medium hover:bg-opacity-80 transition-colors">
          Generate Theme
        </button>
      </div>
    </motion.div>
  );

  const renderCurrentRandomTheme = () => {
    if (!currentRandomTheme || currentTheme !== 'random') return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[var(--card)] rounded-xl p-6 border-2 border-[var(--highlight)]"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-[var(--foreground)]">Current Random Theme</h3>
          <div className="flex gap-2">
            <button
              onClick={() => generateRandomTheme()}
              className="px-4 py-2 bg-[var(--highlight)] text-[var(--background)] rounded-lg text-sm font-medium hover:bg-opacity-80 transition-colors"
            >
              Generate New
            </button>
            <button
              onClick={() => setTheme('light')}
              className="px-4 py-2 bg-[var(--accent)] text-[var(--background)] rounded-lg text-sm font-medium hover:bg-opacity-80 transition-colors"
            >
              Back to Light
            </button>
          </div>
        </div>
        
        {/* Color Palette */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          <div className="text-center">
            <div className="h-12 rounded mb-2" style={{ backgroundColor: currentRandomTheme.background }} />
            <span className="text-xs text-[var(--accent)]">Background</span>
          </div>
          <div className="text-center">
            <div className="h-12 rounded mb-2" style={{ backgroundColor: currentRandomTheme.foreground }} />
            <span className="text-xs text-[var(--accent)]">Foreground</span>
          </div>
          <div className="text-center">
            <div className="h-12 rounded mb-2" style={{ backgroundColor: currentRandomTheme.accent }} />
            <span className="text-xs text-[var(--accent)]">Accent</span>
          </div>
          <div className="text-center">
            <div className="h-12 rounded mb-2" style={{ backgroundColor: currentRandomTheme.highlight }} />
            <span className="text-xs text-[var(--accent)]">Highlight</span>
          </div>
          <div className="text-center">
            <div className="h-12 rounded mb-2" style={{ backgroundColor: currentRandomTheme.card }} />
            <span className="text-xs text-[var(--accent)]">Card</span>
          </div>
        </div>

        {/* Color Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-2">Color Values:</h4>
            <div className="space-y-1">
              {renderColorSwatch(currentRandomTheme.background, currentRandomTheme.background)}
              {renderColorSwatch(currentRandomTheme.foreground, currentRandomTheme.foreground)}
              {renderColorSwatch(currentRandomTheme.accent, currentRandomTheme.accent)}
              {renderColorSwatch(currentRandomTheme.highlight, currentRandomTheme.highlight)}
              {renderColorSwatch(currentRandomTheme.card, currentRandomTheme.card)}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-2">Features:</h4>
            <ul className="text-[var(--accent)] space-y-1">
              <li>• WCAG AAA compliant contrast</li>
              <li>• Color theory based harmony</li>
              <li>• High accessibility standards</li>
              <li>• Balanced saturation & lightness</li>
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--card)] to-transparent opacity-30" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black mb-4 md:mb-6 text-[var(--foreground)] tracking-tight"
          >
            Theme Generator
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
          >
            Generate beautiful, accessible color themes using advanced color theory.
          </motion.p>
        </div>
      </motion.section>

      {/* Current Random Theme Display */}
      {renderCurrentRandomTheme()}

      {/* Static Themes Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="py-12"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">
            Static Themes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {staticThemes.map((theme, index) => renderStaticThemeCard(theme, index))}
          </div>
        </div>
      </motion.section>

      {/* Random Theme Generation Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="py-12 bg-[var(--card)]"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-8 text-center">
            Generate Random Themes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {moodOptions.map((moodOption, index) => renderMoodCard(moodOption, index))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="py-12"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Color Theory</h3>
              <p className="text-[var(--accent)]">
                Uses complementary, triadic, analogous, and monochromatic color relationships to create harmonious palettes.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Accessibility</h3>
              <p className="text-[var(--accent)]">
                Ensures WCAG AAA compliance with 7:1 contrast ratios between foreground and background colors.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Mood-Based</h3>
              <p className="text-[var(--accent)]">
                Choose euphoric for warm, vibrant colors or melancholy for cool, subdued tones.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[var(--foreground)]">Persistent</h3>
              <p className="text-[var(--accent)]">
                Your generated themes are automatically saved and will persist across browser sessions.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
} 