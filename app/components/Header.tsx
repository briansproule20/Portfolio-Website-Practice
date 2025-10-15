'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import AmbientSoundToggleWrapper from './AmbientSoundToggleWrapper';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '../../components/ui/sheet';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/apps", label: "Apps" },
    { href: "/designs", label: "Design" },
    { href: "/coffee-golf", label: "Coffee Golf" },
    { href: "/elo", label: "ELO" },
    { href: "/narrative", label: "Narrative" },
    { href: "/photos", label: "Photos" },
    { href: "/reads", label: "Reads" },
    { href: "/tunes", label: "Tunes" },
    { href: "/worlds", label: "Worlds" },
    { href: "/writing", label: "Writing" },
    { href: "/zines", label: "Zines" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-foreground hover:text-accent transition-colors shrink-0">
              <Image src="/elderscroll.png" alt="Brian Sproule" width={100} height={100} className="rounded-full object-cover" />
            </Link>

            <div className="flex items-center gap-2">
              {/* Theme and Sound toggles - always visible */}
              <div className="flex items-center gap-2">
                <AmbientSoundToggleWrapper />
                <ThemeToggle />
              </div>

              {/* Hamburger menu button - always visible */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 text-foreground hover:text-accent transition-colors rounded-md hover:bg-accent/10"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sheet Menu */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="w-[280px] sm:w-[320px]">
          <SheetClose onClick={() => setIsMenuOpen(false)} />
          <SheetHeader className="mb-8">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-accent transition-colors text-lg py-2 px-4 rounded-md hover:bg-accent/10"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
} 