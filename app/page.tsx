import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from './components/ThemeToggle';
import SwimmingFish from './components/SwimmingFish';
import TerminalWelcome from './components/TerminalWelcome';
import HelloThereQuote from './components/HelloThereQuote';
import ParallaxRing from './components/ParallaxRing';
import SketchbookDrawer from './components/SketchbookDrawer';
import ChatWidget from './components/ChatWidget';
import AmbientSoundToggleWrapper from './components/AmbientSoundToggleWrapper';
import GitHubActivity from './components/GitHubActivity';
import Image from "next/image";
import { getFeaturedPhotos, type Photo } from '../utils/photos';
import InfiniteMovingCardsDemo from '../components/infinite-moving-cards-demo';

export const metadata: Metadata = {
  title: "Brian Sproule | Writer, Publisher, Designer",
  description: "Digital publisher, web developer, and creative technologist. Explore my portfolio of digital publishing projects, narrative theory research, and interactive web experiences.",
  keywords: ["digital publishing", "web development", "narrative theory", "creative technology", "portfolio"],
  authors: [{ name: "Brian Sproule" }],
  creator: "Brian Sproule",
  publisher: "Brian Sproule",
  robots: "index, follow",
  openGraph: {
    title: "Brian Sproule | Writer, Publisher, Designer",
    description: "Digital publisher, web developer, and creative technologist. Explore my portfolio of digital publishing projects, narrative theory research, and interactive web experiences.",
    url: "https://briansproule.com",
    siteName: "Brian Sproule Portfolio",
    images: [
      {
        url: "https://www.briansproule.com/fish.png",
        width: 1200,
        height: 630,
        alt: "Brian Sproule - Digital Publisher & Developer",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Sproule | Writer, Publisher, Designer",
    description: "Digital publisher, web developer, and creative technologist. Explore my portfolio of digital publishing projects, narrative theory research, and interactive web experiences.",
    creator: "@briansproule",
    images: ["https://www.briansproule.com/fish.png"],
  },
  alternates: {
    canonical: "https://briansproule.com",
  },
};

async function getRecentBooks() {
  try {
    // Use absolute URL for server-side fetches
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const fetchUrl = `${baseUrl}/api/reading`;
    console.log('Homepage attempting to fetch from:', fetchUrl);
    
    const res = await fetch(fetchUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch books');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return { 
      books: [
        {
          title: "The Midnight Library",
          author: "Matt Haig",
          year: "2020"
        },
        {
          title: "Project Hail Mary",
          author: "Andy Weir",
          year: "2021"
        },
        {
          title: "Klara and the Sun",
          author: "Kazuo Ishiguro",
          year: "2021"
        }
      ]
    };
  }
}

export default async function Home() {
  const { books } = await getRecentBooks();
  const featuredPhotos = getFeaturedPhotos();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <SwimmingFish />
      <ChatWidget />
      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-between px-4 py-12 bg-[var(--card)] rounded-xl shadow-md mx-2 mt-4 mb-8">
        <div className="flex-1">
          <Image src="/elderscroll.png" alt="Profile" width={240} height={240} className="rounded-full mb-2 object-cover" />
          <HelloThereQuote />
          <p className="text-xl max-w-2xl mb-6 text-[var(--foreground)]">My name is Brian, I'm a digitial and traditional publisher with a love for natural designs and earthy aesthetics. Welcome to my corner of the internet. Grab a cup of tea, a snack, get comfy, and stay a while. Please mind the fish.</p>
        </div>
        <ParallaxRing />
      </section>

      {/* GitHub Activity Section */}
      <GitHubActivity />

      {/* Reading Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[var(--foreground)] text-center">What I've Been Reading</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book: { title: string; author: string; year?: string }) => (
            <div key={book.title} className="rounded-xl shadow-lg p-6 bg-[var(--card)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
              <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{book.title}</h3>
              <p className="text-[var(--accent)] mb-1">{book.author}</p>
              {book.year && <p className="text-sm text-[var(--accent)] opacity-75">{book.year}</p>}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a 
            href="/reads" 
            className="inline-block px-6 py-3 bg-[var(--highlight)] text-[var(--foreground)] rounded-full font-semibold shadow hover:bg-[var(--accent)] transition"
          >
            See All
          </a>
        </div>
      </section>

      {/* Live Deployments Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-[var(--foreground)] text-center">Live Deployments</h2>
        <InfiniteMovingCardsDemo />
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-[var(--accent)] text-sm mt-auto">
        <div className="flex flex-col items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Brian Sproule. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
