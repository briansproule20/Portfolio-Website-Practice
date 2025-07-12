'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Mood, generateTheme, applyThemeToSite, saveTheme } from '../../lib/themeGenerator';
import { useState } from 'react';

export default function GetColorfulButton() {
  const { currentTheme, generateRandomTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedTheme, setGeneratedTheme] = useState<any>(null);
  // Remove moodOptions and selectedMood state
  // Remove Mood Selection section from the modal
  // Update handleGenerateTheme and handleGenerateButtonClick to use 'none' as the mood

  const handleGenerateTheme = () => {
    const newTheme = generateTheme('none');
    console.log('Generated theme:', newTheme); // Debug log
    console.log('Background color:', newTheme.background);
    console.log('Foreground color:', newTheme.foreground);
    console.log('Accent color:', newTheme.accent);
    console.log('Highlight color:', newTheme.highlight);
    console.log('Card color:', newTheme.card);
    setGeneratedTheme(newTheme);
    // setSelectedMood(mood); // This line is removed
  };

  const handleApplyTheme = () => {
    if (generatedTheme) {
      console.log('Applying theme:', generatedTheme);
      console.log('Selected mood:', 'none'); // This line is updated
      generateRandomTheme('none', generatedTheme);
      console.log('Theme applied, closing modal');
      setIsModalOpen(false);
    }
  };

  const handleGenerateButtonClick = () => {
    handleGenerateTheme();
  };

  // Remove moodOptions and selectedMood
  // Remove Mood Selection section

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const hexToCmyk = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const k = 1 - Math.max(r, g, b) / 255;
    const c = (1 - r / 255 - k) / (1 - k);
    const m = (1 - g / 255 - k) / (1 - k);
    const y = (1 - b / 255 - k) / (1 - k);

    return `${c.toFixed(2)}, ${m.toFixed(2)}, ${y.toFixed(2)}, ${k.toFixed(2)}`;
  };

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
        <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-50 p-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
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

              {/* Generate Theme Button */}
              <div className="mb-4">
                <button
                  onClick={handleGenerateButtonClick}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded font-medium hover:bg-purple-700 transition-colors"
                >
                  Generate Theme
                </button>
              </div>

              {/* Generated Theme Display */}
              {generatedTheme && (
                <div className="space-y-4">
                  {/* Color Palette Preview */}
                  <div className="grid grid-cols-5 gap-2">
                    <div className="text-center">
                      <div className="h-12 rounded mb-1 border border-gray-300 dark:border-gray-600" style={{ backgroundColor: generatedTheme.background }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">BG</span>
                    </div>
                    <div className="text-center">
                      <div className="h-12 rounded mb-1 border border-gray-300 dark:border-gray-600" style={{ backgroundColor: generatedTheme.foreground }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">FG</span>
                    </div>
                    <div className="text-center">
                      <div className="h-12 rounded mb-1 border border-gray-300 dark:border-gray-600" style={{ backgroundColor: generatedTheme.accent }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">AC</span>
                    </div>
                    <div className="text-center">
                      <div className="h-12 rounded mb-1 border border-gray-300 dark:border-gray-600" style={{ backgroundColor: generatedTheme.highlight }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">HL</span>
                    </div>
                    <div className="text-center">
                      <div className="h-12 rounded mb-1 border border-gray-300 dark:border-gray-600" style={{ backgroundColor: generatedTheme.card }} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">CD</span>
                    </div>
                  </div>

                  {/* Color Values Display */}
                  <div className="mb-2">
                    <h6 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Color Values</h6>
                    <div className="w-full">
                      <div className="grid grid-cols-4 gap-2 font-mono text-[11px]">
                        <div className="font-semibold text-gray-500 dark:text-gray-400 pl-2">Label</div>
                        <div className="font-semibold text-gray-500 dark:text-gray-400">HEX</div>
                        <div className="font-semibold text-gray-500 dark:text-gray-400">RGB</div>
                        <div className="font-semibold text-gray-500 dark:text-gray-400">CMYK</div>
                        {[
                          { label: 'Background', value: generatedTheme.background },
                          { label: 'Foreground', value: generatedTheme.foreground },
                          { label: 'Accent', value: generatedTheme.accent },
                          { label: 'Highlight', value: generatedTheme.highlight },
                          { label: 'Card', value: generatedTheme.card },
                        ].map((color) => (
                          <React.Fragment key={color.label}>
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 rounded border border-gray-300 dark:border-gray-500 mr-1" style={{ backgroundColor: color.value }} />
                              <span className="text-gray-700 dark:text-gray-200 truncate">{color.label}</span>
                            </div>
                            <button
                              className="text-gray-800 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 px-0 truncate text-left"
                              style={{ fontFamily: 'inherit' }}
                              onClick={() => navigator.clipboard.writeText(color.value)}
                              title={color.value}
                            >
                              {color.value}
                            </button>
                            <button
                              className="text-gray-800 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 px-0 truncate text-left"
                              style={{ fontFamily: 'inherit' }}
                              onClick={() => navigator.clipboard.writeText(hexToRgb(color.value))}
                              title={hexToRgb(color.value)}
                            >
                              {hexToRgb(color.value)}
                            </button>
                            <button
                              className="text-gray-800 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400 px-0 truncate text-left"
                              style={{ fontFamily: 'inherit' }}
                              onClick={() => navigator.clipboard.writeText(hexToCmyk(color.value))}
                              title={hexToCmyk(color.value)}
                            >
                              {hexToCmyk(color.value)}
                            </button>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
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
                        fontSize: '12px',
                        lineHeight: '1.4',
                      }}
                    >
                      {/* Header */}
                      <div style={{ 
                        borderBottom: `1px solid ${generatedTheme.accent}`, 
                        paddingBottom: '8px', 
                        marginBottom: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <h4 style={{ color: generatedTheme.foreground, margin: 0, fontSize: '14px' }}>Brian Sproule</h4>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span style={{ color: generatedTheme.accent, fontSize: '10px' }}>About</span>
                          <span style={{ color: generatedTheme.accent, fontSize: '10px' }}>Photos</span>
                          <span style={{ color: generatedTheme.accent, fontSize: '10px' }}>Writing</span>
                        </div>
                      </div>

                      {/* Main Content */}
                      <div style={{ marginBottom: '12px' }}>
                        <h5 style={{ color: generatedTheme.foreground, margin: '0 0 6px 0', fontSize: '12px' }}>Welcome</h5>
                        <p style={{ color: generatedTheme.foreground, margin: '0 0 8px 0', fontSize: '10px' }}>
                          My name is Brian, I'm a digital and traditional publisher with a love for natural designs and earthy aesthetics.
                        </p>
                      </div>

                      {/* Featured Section */}
                      <div style={{ 
                        background: generatedTheme.card, 
                        padding: '8px', 
                        borderRadius: '4px',
                        marginBottom: '8px',
                        border: `1px solid ${generatedTheme.accent}`
                      }}>
                        <h6 style={{ color: generatedTheme.foreground, margin: '0 0 4px 0', fontSize: '11px' }}>Featured Photos</h6>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <div style={{ 
                            width: '20px', 
                            height: '20px', 
                            background: generatedTheme.highlight, 
                            borderRadius: '2px' 
                          }}></div>
                          <div style={{ 
                            width: '20px', 
                            height: '20px', 
                            background: generatedTheme.accent, 
                            borderRadius: '2px' 
                          }}></div>
                          <div style={{ 
                            width: '20px', 
                            height: '20px', 
                            background: generatedTheme.highlight, 
                            borderRadius: '2px' 
                          }}></div>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          style={{
                            background: generatedTheme.highlight,
                            color: generatedTheme.background,
                            border: 'none',
                            borderRadius: 3,
                            padding: '3px 8px',
                            fontSize: '9px',
                            cursor: 'pointer'
                          }}
                        >
                          View Photos
                        </button>
                        <button
                          style={{
                            background: generatedTheme.accent,
                            color: generatedTheme.background,
                            border: 'none',
                            borderRadius: 3,
                            padding: '3px 8px',
                            fontSize: '9px',
                            cursor: 'pointer'
                          }}
                        >
                          Read More
                        </button>
                      </div>
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
                  <p>Click Generate Theme to generate a new color theme.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 