import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-foreground hover:text-accent transition-colors">
            <span className="text-xl font-medium">Brian Sproule</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/#about" className="text-foreground hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/#contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </Link>
            <Link href="/designs" className="text-foreground hover:text-accent transition-colors">
              Design
            </Link>
            <Link href="/projects" className="text-foreground hover:text-accent transition-colors">
              Projects
            </Link>
            <Link href="/reads" className="text-foreground hover:text-accent transition-colors">
              Reads
            </Link>
            <Link href="/writing" className="text-foreground hover:text-accent transition-colors">
              Writing
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
} 