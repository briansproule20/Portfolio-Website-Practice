'use client';

import { useState } from 'react';
import Image from 'next/image';

type WritingCategory = 'essays' | 'poetry' | 'reviews';

interface WritingPiece {
  title: string;
  excerpt: string;
  category: WritingCategory;
  date: string;
  readTime: string;
  image: string;
}

export default function Writing() {
  const [selectedCategory, setSelectedCategory] = useState<WritingCategory | 'all'>('all');
  const [hoveredPiece, setHoveredPiece] = useState<string | null>(null);

  const writings: WritingPiece[] = [
    {
      title: "Free Will and Actualization in Chiang's Story of Your Life",
      excerpt: "In Chiang's Story of Your Life, Louise's daughter is the focal point of the narrative, representing the beauty of teleological free will and actualizing a predetermined future.",
      category: "essays",
      date: "March 2022",
      readTime: "16 min",
      image: "/writing/dusk.png"
    },
    {
      title: "The Spanish Civil War and its Influence on Twentieth Century Europe",
      excerpt: "The Spanish Civil War attracted vast amounts of critical reception abroad, in large part because of mass executions carried out by both sides. Such events elicited harsh artistic reception and fathered works like Orwell's Homage to Catalonia, Hemingway's For Whom the Bell Tolls, and Picasso's Guernica.",
      category: "essays",
      date: "May 2023",
      readTime: "35 min",
      image: "/writing/guernica.jpg"
    },
    {
      title: "The Forgotten Mile",
      excerpt: "A lone stretch of beach watches on as a family grows older, and the sands of time erode memories of the past.",
      category: "poetry",
      date: "January 2024",
      readTime: "3 min",
      image: "/writing/forgotten.jpg"
    },
    {
      title: "On Our Way Home from the Revolution: Reflections on Ukraine",
      excerpt: "Essay Collection by Sonya Bilocerkowycz",
      category: "reviews",
      date: "December 2023",
      readTime: "10 min",
      image: "/writing/review.png"
    }
  ];

  const categories: { id: WritingCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Writing' },
    { id: 'essays', label: 'Essays' },
    { id: 'poetry', label: 'Poetry' },
    { id: 'reviews', label: 'Reviews' }
  ];

  const filteredWritings = selectedCategory === 'all'
    ? writings
    : writings.filter(piece => piece.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--background)] pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--card)] opacity-50"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-black mb-6 text-[var(--foreground)]">Writing</h1>
          <p className="text-xl text-[var(--accent)] font-serif italic">
           Essays, thoughts, and explorations on the information age, our connection to nature, historical perspectives, and the human experience. 
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <nav className="sticky top-16 z-20 bg-[var(--background)] border-b border-[var(--accent)] mb-12">
        <div className="max-w-6xl mx-auto px-4 py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[var(--highlight)] text-[var(--foreground)]'
                    : 'text-[var(--accent)] hover:text-[var(--foreground)]'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Writing Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          {filteredWritings.map((piece, index) => (
            <article
              key={piece.title}
              className={`group relative bg-[var(--card)] rounded-xl p-8 border-2 border-[var(--accent)] transition-all duration-300 ${
                hoveredPiece === piece.title ? 'scale-[1.02]' : ''
              }`}
              onMouseEnter={() => setHoveredPiece(piece.title)}
              onMouseLeave={() => setHoveredPiece(null)}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="text-sm text-[var(--accent)] uppercase tracking-wider">
                    {piece.category}
                  </span>
                  <h2 className="text-2xl font-bold text-[var(--foreground)] mt-2 mb-3">
                    {piece.title}
                  </h2>
                  <p className="text-[var(--accent)] italic mb-4">
                    {piece.date} • {piece.readTime} read
                  </p>
                </div>
                
                {piece.image && (
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={piece.image}
                      alt={piece.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                
                <p className="text-[var(--foreground)] leading-relaxed">
                  {piece.excerpt}
                </p>
                
                <div className="mt-auto pt-6">
                  <button className="text-[var(--highlight)] hover:text-[var(--accent)] transition-colors">
                    Read more →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
} 