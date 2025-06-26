'use client';

import { useState, useEffect } from 'react';

interface TerminalWelcomeProps {
  onComplete: () => void;
}

const TerminalWelcome: React.FC<TerminalWelcomeProps> = ({ onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showSkipMessage, setShowSkipMessage] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const terminalLines = isMobile ? [
    '> INIT STATION CONNECTION...',
    '> CONNECTING TO BRIAN-ALPHA...',
    '> [████████████████████] 100%',
    '> AUTH SUCCESSFUL',
    '> LOADING PROFILE...',
    '> PROFILE: BRIAN SPROULE',
    '> ROLE: WRITER|PUBLISHER|DESIGNER',
    '> ACCESS: VISITOR',
    '> SYSTEMS ONLINE',
    '> ENV CONTROLS: STABLE',
    '> LIFE SUPPORT: OPTIMAL',
    '> GRAVITY: ENABLED',
    '> COMMS: ACTIVE',
    '> WELCOME TO PORTFOLIO STATION',
    '> TAP TO CONTINUE...'
  ] : [
    '> INITIALIZING SPACE STATION CONNECTION...',
    '> CONNECTING TO BRIAN-STATION-ALPHA...',
    '> [████████████████████████████████] 100%',
    '> AUTHENTICATION SUCCESSFUL',
    '> LOADING USER PROFILE...',
    '> PROFILE: BRIAN SPROULE',
    '> ROLE: WRITER | PUBLISHER | DESIGNER',
    '> CLEARANCE LEVEL: VISITOR',
    '> SYSTEMS ONLINE',
    '> ENVIRONMENTAL CONTROLS: STABLE',
    '> LIFE SUPPORT: OPTIMAL',
    '> ARTIFICIAL GRAVITY: ENABLED',
    '> COMMUNICATION ARRAY: ACTIVE',
    '> WELCOME TO THE PORTFOLIO STATION',
    '> PRESS ANY KEY TO CONTINUE...'
  ];

  useEffect(() => {
    // Show skip message after 2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkipMessage(true);
    }, 2000);

    // Handle keyboard input for skipping
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        setIsComplete(true);
        setTimeout(onComplete, 500);
      }
    };

    // Handle click for skipping
    const handleClick = () => {
      setIsComplete(true);
      setTimeout(onComplete, 500);
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    return () => {
      clearTimeout(skipTimer);
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
    };
  }, [onComplete]);

  useEffect(() => {
    if (isComplete || currentLineIndex >= terminalLines.length) {
      if (currentLineIndex >= terminalLines.length) {
        // Auto-complete after showing all lines
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 2000);
        }, 1000);
      }
      return;
    }

    const currentLine = terminalLines[currentLineIndex];
    
    if (currentText.length < currentLine.length) {
      // Typing effect - faster on mobile
      const baseSpeed = isMobile ? 20 : 30;
      const randomVariation = isMobile ? 10 : 20;
      const timer = setTimeout(() => {
        setCurrentText(currentLine.substring(0, currentText.length + 1));
      }, baseSpeed + Math.random() * randomVariation);
      
      return () => clearTimeout(timer);
    } else {
      // Move to next line after a pause - shorter pause on mobile
      const basePause = isMobile ? 200 : 300;
      const randomPause = isMobile ? 100 : 200;
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentText('');
      }, basePause + Math.random() * randomPause);
      
      return () => clearTimeout(timer);
    }
  }, [currentText, currentLineIndex, terminalLines, isComplete, onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-black font-mono text-green-400 transition-opacity duration-500 overflow-hidden ${
      isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="h-full flex flex-col justify-center items-start p-4 sm:p-8 max-w-4xl mx-auto overflow-hidden">
        {/* Terminal header */}
        <div className="mb-4 sm:mb-8 text-green-500">
          <div className="text-xs sm:text-sm opacity-70">BRIAN-STATION-ALPHA TERMINAL v2.4.7</div>
          <div className="text-xs sm:text-sm opacity-70 hidden sm:block">Earth Standard Time: {new Date().toLocaleString()}</div>
          <div className="text-xs sm:hidden opacity-70">EST: {new Date().toLocaleTimeString()}</div>
          <div className="border-b border-green-800 w-full my-1 sm:my-2"></div>
        </div>

        {/* Terminal output */}
        <div className="flex-1 w-full max-w-3xl">
          {terminalLines.slice(0, currentLineIndex).map((line, index) => (
            <div 
              key={index} 
              className={`mb-1 sm:mb-2 text-sm sm:text-lg leading-relaxed ${
                line.includes('WELCOME') || line.includes('SUCCESSFUL') || line.includes('ONLINE') 
                  ? 'terminal-glow text-green-300' 
                  : ''
              }`}
            >
              {line}
            </div>
          ))}
          
          {currentLineIndex < terminalLines.length && (
            <div className="mb-1 sm:mb-2 text-sm sm:text-lg leading-relaxed">
              {currentText}
              <span className="terminal-cursor">_</span>
            </div>
          )}
        </div>

        {/* Skip message */}
        {showSkipMessage && !isComplete && (
          <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 text-green-600 text-xs sm:text-sm animate-pulse text-center sm:text-right">
            <div className="sm:hidden">Tap to skip</div>
            <div className="hidden sm:block">Press ESC, SPACE, or ENTER to skip</div>
          </div>
        )}

        {/* Scanlines effect */}
        <div className="fixed inset-0 pointer-events-none opacity-20 terminal-scanlines"></div>

        {/* Subtle glow effect */}
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-r from-green-900/5 via-transparent to-green-900/5"></div>
      </div>
    </div>
  );
};

export default TerminalWelcome; 