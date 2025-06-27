'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HelloThereQuote() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const helloAudioRef = useRef<HTMLAudioElement | null>(null);
  const kenobiAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload audio
    if (helloAudioRef.current) {
      helloAudioRef.current.load();
    }
    if (kenobiAudioRef.current) {
      kenobiAudioRef.current.load();
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = () => {
    // Trigger hover effect on touch for mobile
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    // Keep hover effect briefly after touch
    setTimeout(() => setIsHovered(false), 1000);
  };

  const handleClick = () => {
    if (helloAudioRef.current) {
      console.log('Attempting to play hello audio...');
      setIsPlaying(true);
      setShowPopup(false); // Don't show popup yet
      helloAudioRef.current.currentTime = 0;
      helloAudioRef.current.play()
        .then(() => {
          console.log('Hello audio started playing successfully');
        })
        .catch(error => {
          console.error('Hello audio play failed:', error);
          setIsPlaying(false);
        });
    }
  };

  const handleHelloAudioEnded = () => {
    console.log('Hello audio finished playing');
    // Now play General Kenobi audio and show popup
    if (kenobiAudioRef.current) {
      console.log('Playing General Kenobi audio...');
      setShowPopup(true); // Show popup when General Kenobi starts
      kenobiAudioRef.current.currentTime = 0;
      kenobiAudioRef.current.play()
        .then(() => {
          console.log('General Kenobi audio started playing successfully');
        })
        .catch(error => {
          console.error('General Kenobi audio play failed:', error);
          setIsPlaying(false);
          setShowPopup(false);
        });
    }
  };

  const handleKenobiAudioEnded = () => {
    console.log('General Kenobi audio finished playing');
    setIsPlaying(false);
    setShowPopup(false);
  };

  const handleAudioError = (e: any) => {
    console.error('Audio error:', e);
    setIsPlaying(false);
    setShowPopup(false);
  };

  const text = "Hello there.";
  const letters = text.split('');

  return (
    <div className="relative">
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 cursor-pointer select-none inline-block touch-manipulation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        title="Click to hear the greeting!"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            animate={isHovered ? {
              y: [0, -8, 0],
              color: 'var(--highlight)',
            } : {
              y: 0,
              color: 'var(--foreground)',
            }}
            transition={{
              y: {
                duration: 0.6,
                repeat: isHovered ? Infinity : 0,
                delay: index * 0.1,
                ease: "easeInOut"
              },
              color: {
                duration: 0.3
              }
            }}
            style={{ 
              display: letter === ' ' ? 'inline' : 'inline-block',
              minWidth: letter === ' ' ? '0.3em' : 'auto'
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.h1>

      {/* Enhanced General Kenobi popup - mobile optimized positioning */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="absolute -top-14 sm:-top-16 md:-top-12 left-1/2 transform -translate-x-1/2 pointer-events-none z-20 max-w-xs sm:max-w-none"
            initial={{ opacity: 0, y: 30, scale: 0.5, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              rotate: 0,
            }}
            exit={{ opacity: 0, y: -30, scale: 0.5, rotate: 10 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            {/* Glow effect background */}
            <motion.div
              className="absolute -inset-3 bg-gradient-to-r from-blue-400/20 via-cyan-400/30 to-blue-400/20 rounded-xl blur-md"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Main text with enhanced animations - mobile responsive */}
            <motion.span
              className="relative text-sm sm:text-base font-bold text-[var(--accent)] bg-[var(--card)] px-3 sm:px-4 py-2 rounded-full shadow-xl border-2 border-[var(--accent)] backdrop-blur-sm whitespace-nowrap"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ⚔️ "General Kenobi!" ⚔️
            </motion.span>

            {/* Floating particles - four lightsabers (two cyan, two green) like Grievous */}
            {/* Cyan lightsaber 1 */}
            <motion.div
              className="absolute -top-2 -left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-cyan-400 rounded-full shadow-cyan-400/50 shadow-lg"
              animate={{
                y: [0, -20, 0],
                x: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Cyan lightsaber 2 */}
            <motion.div
              className="absolute -top-1 -right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-cyan-400 rounded-full shadow-cyan-400/50 shadow-lg"
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Green lightsaber 1 */}
            <motion.div
              className="absolute -bottom-1 left-1 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-green-400 rounded-full shadow-green-400/50 shadow-lg"
              animate={{
                y: [0, 15, 0],
                x: [0, -5, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />
            
            {/* Green lightsaber 2 */}
            <motion.div
              className="absolute -bottom-2 -right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full shadow-green-500/50 shadow-lg"
              animate={{
                y: [0, 18, 0],
                x: [0, 8, 0],
                opacity: [0.6, 1, 0.6],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden audio elements */}
      <audio
        ref={helloAudioRef}
        onEnded={handleHelloAudioEnded}
        onError={handleAudioError}
        preload="auto"
      >
        <source src="/audio/hello-there-obi-wan.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <audio
        ref={kenobiAudioRef}
        onEnded={handleKenobiAudioEnded}
        onError={handleAudioError}
        preload="auto"
      >
        <source src="/audio/general-kenobi.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
} 