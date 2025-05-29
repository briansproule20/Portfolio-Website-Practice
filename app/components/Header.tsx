'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-foreground hover:text-accent transition-colors shrink-0">
            <Image src="/elderscroll.png" alt="Brian Sproule" width={100} height={100} className="rounded-full object-cover" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-accent"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6 px-2">
              <Link href="/#about" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                About
              </Link>
              <Link href="/#contact" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Contact
              </Link>
              <Link href="/designs" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Design
              </Link>
              <Link href="/reads" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Reads
              </Link>
              <Link href="/wanted" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Wanted
              </Link>
              <Link href="/writing" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Writing
              </Link>
              <Link href="/zines" className="text-foreground hover:text-accent transition-colors whitespace-nowrap">
                Zines
              </Link>
              <ThemeToggle />
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden ${
            isMenuOpen ? 'block' : 'hidden'
          } bg-[var(--background)] border-t border-[var(--accent)]/20 py-4`}
        >
          <div className="flex flex-col space-y-4 px-4">
            <Link
              href="/#about"
              className="text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/designs"
              className="text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Design
            </Link>
            <Link
              href="/reads"
              className="text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Reads
            </Link>
            <Link
              href="/wanted"
              className="text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Wanted
            </Link>
            <Link
              href="/writing"
              className="text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Writing
            </Link>
            <Link
              href="/zines"
              className="text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Zines
            </Link>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 