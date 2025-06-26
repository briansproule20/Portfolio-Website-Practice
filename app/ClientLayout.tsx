'use client';

import { useState, useEffect } from 'react';
import TerminalWelcome from './components/TerminalWelcome';
import Header from './components/Header';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('hasVisitedPortfolio');
    console.log('Debug - hasVisited:', hasVisited);
    
    if (!hasVisited) {
      console.log('Debug - Setting showTerminal to true');
      setShowTerminal(true);
      setIsFirstVisit(true);
    } else {
      console.log('Debug - User has visited before, not showing terminal');
      setIsFirstVisit(false);
    }
  }, []);

  const handleTerminalComplete = () => {
    setShowTerminal(false);
    localStorage.setItem('hasVisitedPortfolio', 'true');
  };

  return (
    <>
      {showTerminal && isFirstVisit && (
        <TerminalWelcome onComplete={handleTerminalComplete} />
      )}
      <div className={showTerminal && isFirstVisit ? 'hidden' : ''}>
        <Header />
        {children}
      </div>
    </>
  );
};

export default ClientLayout; 