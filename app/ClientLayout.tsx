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
    // Check if user has visited before in this session
    const hasVisitedThisSession = sessionStorage.getItem('hasVisitedPortfolio');
    
    if (!hasVisitedThisSession) {
      setShowTerminal(true);
      setIsFirstVisit(true);
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  const handleTerminalComplete = () => {
    setShowTerminal(false);
    sessionStorage.setItem('hasVisitedPortfolio', 'true');
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