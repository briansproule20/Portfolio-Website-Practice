'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const zines = [
  {
    title: "The Atlantic Ocean",
    category: "Nature & Conservation",
    description: "We can mistreat, pollute, and destroy the natural world at our own peril, but do not look to history and claim we weren't warned of nature's wrath.",
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
    description: "A journey through the foothills of the Appalachian Mountains, featuring the native species of Penn's Woods.",
    pdfUrl: "/pdfs/native-species.pdf"
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
            Zines
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
          >
            A collection of one page zines I've created.
          </motion.p>
        </div>
      </motion.section>

      {/* Category Navigation */}
      <nav className="sticky top-16 z-20 bg-[var(--background)] border-b border-[var(--accent)] mb-8 md:mb-12">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 md:gap-4 min-w-max">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base transition-colors ${
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
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base transition-colors ${
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
        className="max-w-6xl mx-auto px-4 pb-16 md:pb-24"
      >
        <div className="grid gap-4 md:gap-8 md:grid-cols-2">
          {filteredZines.map((zine, index) => (
            <motion.article
              key={zine.title}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-[var(--card)] rounded-lg md:rounded-xl p-4 md:p-8 border-2 border-[var(--accent)] transition-all duration-300 ${
                hoveredZine === zine.title ? 'scale-[1.02]' : ''
              }`}
              onMouseEnter={() => setHoveredZine(zine.title)}
              onMouseLeave={() => setHoveredZine(null)}
            >
              <div className="flex flex-col h-full">
                <div className="mb-3 md:mb-4">
                  <span className="text-xs md:text-sm text-[var(--highlight)] uppercase tracking-wider font-medium">
                    {zine.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mt-2 mb-2 md:mb-3">
                    {zine.title}
                  </h2>
                </div>
                
                <p className="text-sm md:text-base text-[var(--accent)] leading-relaxed mb-4 md:mb-6">
                  {zine.description}
                </p>
                
                <div className="mt-auto pt-4 md:pt-6">
                  <a 
                    href={zine.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-sm md:text-base text-[var(--highlight)] hover:text-[var(--accent)] transition-colors"
                  >
                    Read more →
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