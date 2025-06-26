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

  const terminalLines = [
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
      // Typing effect
      const timer = setTimeout(() => {
        setCurrentText(currentLine.substring(0, currentText.length + 1));
      }, 30 + Math.random() * 20); // Variable typing speed for realism
      
      return () => clearTimeout(timer);
    } else {
      // Move to next line after a pause
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentText('');
      }, 300 + Math.random() * 200);
      
      return () => clearTimeout(timer);
    }
  }, [currentText, currentLineIndex, terminalLines, isComplete, onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-black font-mono text-green-400 transition-opacity duration-500 ${
      isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="h-full flex flex-col justify-center items-start p-8 max-w-4xl mx-auto">
        {/* Terminal header */}
        <div className="mb-8 text-green-500">
          <div className="text-sm opacity-70">BRIAN-STATION-ALPHA TERMINAL v2.4.7</div>
          <div className="text-sm opacity-70">Earth Standard Time: {new Date().toLocaleString()}</div>
          <div className="border-b border-green-800 w-full my-2"></div>
        </div>

        {/* Terminal output */}
        <div className="flex-1 w-full max-w-3xl">
          {terminalLines.slice(0, currentLineIndex).map((line, index) => (
            <div 
              key={index} 
              className={`mb-2 text-lg leading-relaxed ${
                line.includes('WELCOME') || line.includes('SUCCESSFUL') || line.includes('ONLINE') 
                  ? 'terminal-glow text-green-300' 
                  : ''
              }`}
            >
              {line}
            </div>
          ))}
          
          {currentLineIndex < terminalLines.length && (
            <div className="mb-2 text-lg leading-relaxed">
              {currentText}
              <span className="terminal-cursor">_</span>
            </div>
          )}
        </div>

        {/* Skip message */}
        {showSkipMessage && !isComplete && (
          <div className="fixed bottom-8 right-8 text-green-600 text-sm animate-pulse">
            Press ESC, SPACE, or ENTER to skip
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