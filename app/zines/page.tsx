'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const zines = [
  {
    title: "The Atlantic Ocean",
    category: "Nature & Conservation",
    description: "For all of human history, we have depended on the natural world for the most foundational functions of life... We can mistreat, pollute, and destroy the natural world at our own peril, but do not look to history and claim we weren't warned.",
    pdfUrl: "/pdfs/atlantic-ocean.pdf"
  },
  {
    title: "Speculative Fiction Mini Games and World-Building",
    category: "Game Design & Narrative",
    description: "Gwent, Sabaac, Orlog, and how other mini games augment and enrich their respective universes.",
    pdfUrl: "/pdfs/speculative-fiction-games.pdf"
  },
  {
    title: "A Local's Guide to Native Species",
    category: "Nature & Conservation",
    description: "A journey through the foothills of the Appalachian Mountains.",
    pdfUrl: "/pdfs/native-species-guide.pdf"
  },
  {
    title: "Ink and Pen and Paper and Transistors",
    category: "Technology & Culture",
    description: "A personal struggle with authenticity and accessibility in writing technologies.",
    pdfUrl: "/pdfs/ink-and-pen.pdf"
  },
  {
    title: "The Elder Scrolls, Fallout, and Starfield",
    category: "Game Design & Narrative",
    description: "An obsession borne of the writings of the deity, Todd Howard. (Please give us more content, Todd, and don't sue me.)",
    pdfUrl: "/pdfs/bethesda-games.pdf"
  },
  {
    title: "A Review of Oblivion Remastered in Light of the Elder Scrolls VI",
    category: "Game Design & Narrative",
    description: "Thoughts, comparisons, and a wishlist for the eternally awaited Elder Scrolls VI.",
    pdfUrl: "/pdfs/story-of-your-life.pdf"
  },
  {
    title: "The Sproule Family History",
    category: "Genealogies",
    description: "A genealogy of the family on my father's side.",
    pdfUrl: "/pdfs/sproule-history.pdf"
  },
  {
    title: "The Wallace Family History",
    category: "Genealogies",
    description: "A genealogy of the family on my mother's side.",
    pdfUrl: "/pdfs/wallace-history.pdf"
  }
];

const categories = Array.from(new Set(zines.map(zine => zine.category)));

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Zines() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredZine, setHoveredZine] = useState<string | null>(null);

  const filteredZines = selectedCategory === 'all' 
    ? zines 
    : zines.filter(zine => zine.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--card)] to-transparent opacity-30" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-7xl font-black mb-6 text-[var(--foreground)] tracking-tight"
          >
            Zines
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-[var(--accent)] font-serif italic"
          >
            A collection of thoughts, research, publications, explorations, and informal ramblings.
          </motion.p>
        </div>
      </motion.section>

      {/* Category Navigation */}
      <nav className="sticky top-16 z-20 bg-[var(--background)] border-b border-[var(--accent)] mb-12">
        <div className="max-w-6xl mx-auto px-4 py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-max">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[var(--highlight)] text-[var(--foreground)]'
                  : 'text-[var(--accent)] hover:text-[var(--foreground)]'
              }`}
            >
              All Zines
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-[var(--highlight)] text-[var(--foreground)]'
                    : 'text-[var(--accent)] hover:text-[var(--foreground)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Zines Grid */}
      <motion.section 
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 pb-24"
      >
        <div className="grid gap-8 md:grid-cols-2">
          {filteredZines.map((zine, index) => (
            <motion.article
              key={zine.title}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-[var(--card)] rounded-xl p-8 border-2 border-[var(--accent)] transition-all duration-300 ${
                hoveredZine === zine.title ? 'scale-[1.02]' : ''
              }`}
              onMouseEnter={() => setHoveredZine(zine.title)}
              onMouseLeave={() => setHoveredZine(null)}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <span className="text-sm text-[var(--highlight)] uppercase tracking-wider font-medium">
                    {zine.category}
                  </span>
                  <h2 className="text-2xl font-bold text-[var(--foreground)] mt-2 mb-3">
                    {zine.title}
                  </h2>
                </div>
                
                <p className="text-[var(--accent)] leading-relaxed mb-6">
                  {zine.description}
                </p>
                
                <div className="mt-auto">
                  <a 
                    href={zine.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[var(--highlight)] hover:text-[var(--accent)] transition-colors"
                  >
                    Read Zine 
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </div>
  );
} 