'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--highlight)] to-[var(--background)] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-70" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black mb-4 md:mb-6 text-[var(--foreground)] tracking-tight"
          >
            Writing
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
          >
            Longer form writing.
          </motion.p>
        </div>
      </motion.section>

      {/* Category Navigation */}
      <nav className="sticky top-16 z-20 bg-[var(--background)] border-b border-[var(--accent)] mb-8 md:mb-12">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 md:gap-4 min-w-max">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base transition-colors ${
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