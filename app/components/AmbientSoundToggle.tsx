'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAmbientSound, AmbientSoundType } from '../context/AmbientSoundContext';

const soundOptions = [
  {
    id: 'martian-breeze' as AmbientSoundType,
    name: 'Martian Breeze',
    description: 'Gentle winds from another world',
    icon: '🌪️',
  },
  {
    id: 'ocean-waves' as AmbientSoundType,
    name: 'Ocean Waves',
    description: 'Rolling waves on distant shores',
    icon: '🌊',
  },
  {
    id: 'birdsong' as AmbientSoundType,
    name: 'Birdsong',
    description: 'Peaceful chirping in nature',
    icon: '🐦',
  },
];

export default function AmbientSoundToggle() {
  const { currentSound, isPlaying, volume, setSound, togglePlay, setVolume } = useAmbientSound();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-[var(--accent)] transition-colors relative"
        aria-label="Toggle ambient sounds"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-5 h-5"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.5c-.69 0-1.25-.56-1.25-1.25V9.75c0-.69.56-1.25 1.25-1.25H6.75z" 
          />
        </svg>
        
        {/* Playing indicator */}
        {isPlaying && currentSound && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 md:right-0 md:left-auto top-full mt-2 w-64 bg-[var(--card)] border-2 border-[var(--accent)] rounded-lg shadow-xl z-50 p-4"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">Ambient Sounds</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--accent)] hover:text-[var(--foreground)] p-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Sound Options */}
              <div className="space-y-2">
                {soundOptions.map((sound) => (
                  <motion.button
                    key={sound.id}
                    onClick={() => setSound(sound.id)}
                    className={`w-full p-3 rounded-lg border transition-all text-left ${
                      currentSound === sound.id
                        ? 'border-[var(--highlight)] bg-[var(--highlight)]/10'
                        : 'border-[var(--accent)] hover:border-[var(--highlight)] hover:bg-[var(--accent)]/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{sound.icon}</span>
                      <div>
                        <div className="font-medium text-sm text-[var(--foreground)]">
                          {sound.name}
                        </div>
                        <div className="text-xs text-[var(--accent)]">
                          {sound.description}
                        </div>
                      </div>
                      {currentSound === sound.id && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 bg-[var(--highlight)] rounded-full" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}

                {/* Off Option */}
                <motion.button
                  onClick={() => setSound(null)}
                  className={`w-full p-3 rounded-lg border transition-all text-left ${
                    currentSound === null
                      ? 'border-[var(--highlight)] bg-[var(--highlight)]/10'
                      : 'border-[var(--accent)] hover:border-[var(--highlight)] hover:bg-[var(--accent)]/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🔇</span>
                    <div>
                      <div className="font-medium text-sm text-[var(--foreground)]">
                        Off
                      </div>
                      <div className="text-xs text-[var(--accent)]">
                        Silence
                      </div>
                    </div>
                    {currentSound === null && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-[var(--highlight)] rounded-full" />
                      </div>
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Controls */}
              {currentSound && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 pt-3 border-t border-[var(--accent)]"
                >
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    className="flex items-center gap-2 px-3 py-2 bg-[var(--highlight)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--accent)] transition-colors w-full justify-center"
                  >
                    {isPlaying ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Pause
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Play
                      </>
                    )}
                  </button>

                  {/* Volume Control */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-[var(--accent)]">Volume</label>
                      <span className="text-xs text-[var(--accent)]">{Math.round(volume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-[var(--accent)] rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 