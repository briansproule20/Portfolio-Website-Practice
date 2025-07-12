'use client';

import { useTheme } from '../context/ThemeContext';
import { Mood, generateTheme, applyThemeToSite, saveTheme } from '../../lib/themeGenerator';
import { useState } from 'react';

export default function GetColorfulButton() {
  const { currentTheme, generateRandomTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedTheme, setGeneratedTheme] = useState<any>(null);
  const [selectedMood, setSelectedMood] = useState<Mood>('none');

  const handleGenerateTheme = (mood: Mood) => {
    const newTheme = generateTheme(mood);
    console.log('Generated theme:', newTheme); // Debug log
    console.log('Background color:', newTheme.background);
    console.log('Foreground color:', newTheme.foreground);
    console.log('Accent color:', newTheme.accent);
    console.log('Highlight color:', newTheme.highlight);
    console.log('Card color:', newTheme.card);
    setGeneratedTheme(newTheme);
    setSelectedMood(mood);
  };

  const handleApplyTheme = () => {
    if (generatedTheme) {
      console.log('Applying theme:', generatedTheme);
      console.log('Selected mood:', selectedMood);
      generateRandomTheme(selectedMood, generatedTheme);
      console.log('Theme applied, closing modal');
      setIsModalOpen(false);
    }
  };

  const handleGenerateButtonClick = () => {
    if (selectedMood) {
      handleGenerateTheme(selectedMood);
    }
  };

  const moodOptions = [
    { mood: 'none' as Mood, label: 'Random', emoji: '🎲' },
    { mood: 'euphoric' as Mood, label: 'Euphoric', emoji: '🌟' },
    { mood: 'melancholy' as Mood, label: 'Melancholy', emoji: '🌙' }
  ];

  return (
    <>
      {/* Main Button */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-full shadow-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
          title="Generate random color themes"
        >
          <span className="text-lg">🎨</span>
          <span className="hidden sm:inline">Get Colorful</span>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[70vh] overflow-y-auto shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Theme Generator</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mood Selection */}
              <div className="mb-3">
                <div className="flex gap-1">
                  {moodOptions.map((option) => (
                    <button
                      key={option.mood}
                      onClick={() => setSelectedMood(option.mood)}
                      className={`px-2 py-1 rounded text-xs border transition-all duration-300 ${
                        selectedMood === option.mood 
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500'
                      }`}
                    >
                      {option.emoji} {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Theme Button */}
              <div className="mb-3">
                <button
                  onClick={handleGenerateButtonClick}
                  disabled={!selectedMood}
                  className="w-full px-3 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Theme
                </button>
              </div>

              {/* Generated Theme Display */}
              {generatedTheme && (
                <div className="space-y-3">
                  {/* Color Palette Preview */}
                  <div className="grid grid-cols-5 gap-1">
                    <div className="text-center">
                      <div className="h-8 rounded mb-1 border border-gray-300 dark:border-gray-600" style={{ backgroundColor: generatedTheme.background }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">BG</span>
                    </div>
                    <div className="text-center">
                      <div className="h-8 rounded mb-1 border border-gray-300 dark:border-gray-600" style={{ backgroundColor: generatedTheme.foreground }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">FG</span>
                    </div>
                    <div className="text-center">
                      <div className="h-8 rounded mb-1 border border-gray-300 dark:border-gray-600" style={{ backgroundColor: generatedTheme.accent }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">AC</span>
                    </div>
                    <div className="text-center">
                      <div className="h-8 rounded mb-1 border border-gray-300 dark:border-gray-600" style={{ backgroundColor: generatedTheme.highlight }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">HL</span>
                    </div>
                    <div className="text-center">
                      <div className="h-8 rounded mb-1 border border-gray-300 dark:border-gray-600" style={{ backgroundColor: generatedTheme.card }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">CD</span>
                    </div>
                  </div>

                  {/* Color Values Display */}
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <div>Background: {generatedTheme.background}</div>
                    <div>Foreground: {generatedTheme.foreground}</div>
                    <div>Accent: {generatedTheme.accent}</div>
                    <div>Highlight: {generatedTheme.highlight}</div>
                    <div>Card: {generatedTheme.card}</div>
                  </div>

                  {/* Live Preview Sample Content */}
                  <div style={{ marginTop: 16 }}>
                    <div
                      style={{
                        background: generatedTheme.background,
                        color: generatedTheme.foreground,
                        border: `2px solid ${generatedTheme.accent}`,
                        borderRadius: 8,
                        padding: 16,
                        marginTop: 16,
                      }}
                    >
                      <h4 style={{ color: generatedTheme.foreground, marginBottom: 8 }}>Sample Content</h4>
                      <p style={{ color: generatedTheme.foreground, marginBottom: 12 }}>
                        This is how your site will look with this theme.
                      </p>
                      <button
                        style={{
                          background: generatedTheme.highlight,
                          color: generatedTheme.background,
                          border: 'none',
                          borderRadius: 4,
                          padding: '4px 16px',
                          marginRight: 8,
                        }}
                      >
                        Primary
                      </button>
                      <button
                        style={{
                          background: generatedTheme.accent,
                          color: generatedTheme.background,
                          border: 'none',
                          borderRadius: 4,
                          padding: '4px 16px',
                        }}
                      >
                        Secondary
                      </button>
                    </div>
                  </div>

                  {/* Apply Theme Button */}
                  <div className="flex justify-center pt-2">
                    <button
                      onClick={handleApplyTheme}
                      className="px-6 py-2 bg-green-600 text-white rounded font-medium hover:bg-green-700 transition-colors text-sm"
                    >
                      Apply Theme
                    </button>
                  </div>
                </div>
              )}

              {/* Instructions */}
              {!generatedTheme && (
                <div className="text-center text-gray-500 dark:text-gray-400 text-xs py-4">
                  <p>Select a mood and click Generate Theme</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 