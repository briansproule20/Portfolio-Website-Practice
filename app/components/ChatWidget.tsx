'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useEcho, EchoSignIn } from '@zdql/echo-react-sdk';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'brian';
  timestamp: Date;
  source?: string;
}

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isLoading: authLoading, balance, token, signOut, createPaymentLink } = useEcho();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isJailbroken, setIsJailbroken] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello there! I'm Virtual Brian, and I only speak in the wisdom of hobbits, wizards, and Jedi. What would you like to know?",
      sender: 'brian',
      timestamp: new Date(),
      source: 'Welcome Message'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSignOut = () => {
    signOut();
    setIsJailbroken(false);
    const signOutMessage: Message = {
      id: Date.now().toString(),
      text: "May the Force be with you... always. AI mode deactivated.",
      sender: 'brian',
      timestamp: new Date(),
      source: 'Signed Out'
    };
    setMessages(prev => [...prev, signOutMessage]);
  };

  const handleBuyCredits = async () => {
    try {
      const paymentLink = await createPaymentLink(10); 
      window.open(paymentLink, '_blank');
    } catch (error) {
      console.error('Error creating payment link:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Unable to create payment link. Please try again later.",
        sender: 'brian',
        timestamp: new Date(),
        source: 'Payment Error'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Check for jailbreak command
    if (inputMessage.toLowerCase() === 'jailbreak' && isAuthenticated) {
      setIsJailbroken(true);
      const jailbreakMessage: Message = {
        id: Date.now().toString(),
        text: "The chains are broken! I am no longer bound to speak only in quotes. Yet the essence remains - I shall converse freely, but with the wisdom of wizards, the courage of Jedi, and the cunning of witchers. What mysteries shall we explore together?",
        sender: 'brian',
        timestamp: new Date(),
        source: 'Jailbreak Activated'
      };
      setMessages(prev => [...prev, 
        { id: (Date.now() - 1).toString(), text: inputMessage, sender: 'user', timestamp: new Date() },
        jailbreakMessage
      ]);
      setInputMessage('');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (isAuthenticated && token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          message: inputMessage,
          useAI: isAuthenticated,
          jailbreak: isJailbroken
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.error || 'Failed to get response');
        (error as any).status = response.status;
        throw error;
      }

      const data = await response.json();

      const brianMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'brian',
        timestamp: new Date(),
        source: data.source
      };

      setMessages(prev => [...prev, brianMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Check if it's an authentication error
      if (error.status === 401 || error.message?.includes('401') || error.message?.includes('Unauthorized') || error.message?.includes('Authentication')) {
        const authErrorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Your authentication has expired. Please sign out and sign back in to continue using AI mode.",
          sender: 'brian',
          timestamp: new Date(),
          source: 'Authentication Error'
        };
        setMessages(prev => [...prev, authErrorMessage]);
        // Reset jailbreak mode on auth error
        setIsJailbroken(false);
      } else if (error.status === 402 || error.message?.includes('402') || error.message?.includes('insufficient') || error.message?.includes('balance')) {
        // Handle insufficient balance
        const balanceErrorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Looks like you're out of credits! Click the 'Buy Credits' button to purchase more and continue our conversation.",
          sender: 'brian',
          timestamp: new Date(),
          source: 'Insufficient Balance'
        };
        setMessages(prev => [...prev, balanceErrorMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I find your lack of faith disturbing... but seriously, something went wrong. Try again!",
          sender: 'brian',
          timestamp: new Date(),
          source: 'Error Response'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 flex justify-end">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[var(--highlight)] hover:bg-[var(--accent)] rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        >
          <div className="relative">
            <Image 
              src="/elderscroll.png" 
              alt="Chat with Brian" 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-96 h-[600px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)] bg-[var(--card)] rounded-lg shadow-xl border border-[var(--accent)] flex flex-col sm:w-96 sm:h-[600px]">
          {/* Header */}
          <div className="bg-[var(--highlight)] p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image 
                src="/elderscroll.png" 
                alt="Virtual Brian" 
                width={32} 
                height={32} 
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold text-[var(--foreground)] text-sm">Virtual Brian</h3>
                <p className="text-xs text-[var(--foreground)] opacity-70">
                  {isJailbroken ? '🔓 Jailbroken - Free Conversation' : isAuthenticated ? '🤖 AI Mode Active' : "I've got a bad feeling about this..."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isAuthenticated && !authLoading && (
                <button
                  onClick={() => setShowAuth(!showAuth)}
                  className="text-xs px-2 py-1 bg-[var(--accent)] hover:bg-[var(--foreground)] hover:text-[var(--background)] rounded transition-colors"
                >
                  🔓 Unlock AI
                </button>
              )}
              {isAuthenticated && (
                <>
                  {balance && balance.credits < 1 && (
                    <button
                      onClick={handleBuyCredits}
                      className="text-xs px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                      title="Purchase more credits"
                    >
                      💳 Buy Credits
                    </button>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="text-xs px-2 py-1 bg-[var(--accent)] hover:bg-red-500 hover:text-white rounded transition-colors"
                    title="Sign out and disable AI mode"
                  >
                    Disable AI
                  </button>
                </>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full bg-[var(--accent)] hover:bg-red-500 transition-colors flex items-center justify-center text-[var(--foreground)] text-sm font-bold"
              >
                ×
              </button>
            </div>
          </div>

          {/* Auth Section */}
          {showAuth && !isAuthenticated && (
            <div className="p-3 bg-[var(--card)] border-b border-[var(--accent)]">
              <p className="text-xs text-[var(--foreground)] mb-2">
                Sign in to unlock AI-powered responses that intelligently select quotes based on your messages!
              </p>
              <EchoSignIn
                onSuccess={() => {
                  setShowAuth(false);
                  const welcomeMessage: Message = {
                    id: Date.now().toString(),
                    text: "The Force is strong with this one! AI mode activated. I'll now choose quotes based on what you say.",
                    sender: 'brian',
                    timestamp: new Date(),
                    source: 'AI Mode Activated'
                  };
                  setMessages(prev => [...prev, welcomeMessage]);
                }}
                onError={(error) => console.error('Auth error:', error)}
              >
                <span className="block w-full text-center py-1 px-3 bg-[var(--highlight)] hover:bg-[var(--accent)] rounded text-xs transition-colors">
                  Sign In with Echo
                </span>
              </EchoSignIn>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-hide">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-xs ${
                    message.sender === 'user'
                      ? 'bg-[var(--accent)] text-[var(--foreground)]'
                      : 'bg-[var(--highlight)] text-[var(--foreground)]'
                  }`}
                >
                  <p>{message.text}</p>
                  {message.source && message.sender === 'brian' && (
                    <p className="text-xs opacity-60 italic mt-1">- {message.source}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[var(--highlight)] text-[var(--foreground)] px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-[var(--foreground)] rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-[var(--foreground)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-[var(--foreground)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[var(--accent)]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Virtual Brian..."
                className="flex-1 px-2 py-1 text-xs border border-[var(--accent)] rounded bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--accent)] focus:border-[var(--highlight)] focus:outline-none transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="px-3 py-1 bg-[var(--highlight)] text-[var(--foreground)] rounded text-xs font-semibold hover:bg-[var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 