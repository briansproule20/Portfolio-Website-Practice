'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Shuffle function using Fisher-Yates algorithm
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const photos = [
  {
    id: 1,
    title: "Wolff's Cabin",
    category: "Nature",
    description: "A peaceful retreat in the wilderness, smoke rising over the water.",
    image: "/photos/cabin.jpg",
    width: 3024,
    height: 4032
  },
  {
    id: 2,
    title: "Behind Enemy Lines",
    category: "Friends",
    description: "Some Buckeyes out in enemy territory.",
    image: "/photos/ND.jpg",
    width: 3024,
    height: 4032
  }
];

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'family', label: 'Family' },
  { id: 'friends', label: 'Friends' },
  { id: 'food', label: 'Food' },
  { id: 'memoriam', label: 'In Loving Memory' },
  { id: 'nature', label: 'Nature' },
  { id: 'pets', label: 'Pets' },
  { id: 'style', label: 'Style' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Photos() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [shuffledPhotos, setShuffledPhotos] = useState(photos);

  // Shuffle photos when the page loads
  useEffect(() => {
    setShuffledPhotos(shuffleArray(photos));
  }, []);

  const filteredPhotos = selectedCategory === 'all'
    ? shuffledPhotos
    : shuffledPhotos.filter(photo => photo.category.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--card)] to-transparent opacity-30" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black mb-4 md:mb-6 text-[var(--foreground)] tracking-tight"
          >
            Photos
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
          >
            Like social media, but better, because there's no algorithm, doom scrolling, or ads. And I don't have any quality metrics, liberating me from the weight of your opinion!
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

      {/* Photo Grid */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto px-4 pb-16 columns-1 md:columns-2 lg:columns-3 gap-8"
      >
        {filteredPhotos.map((photo) => (
          <motion.div
            key={photo.id}
            variants={item}
            className="relative break-inside-avoid mb-8 group"
            onMouseEnter={() => setHoveredId(photo.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative overflow-hidden bg-[var(--card)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors">
              <div style={{ paddingTop: `${(photo.height / photo.width) * 100}%` }} />
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              {/* Info Overlay - only visible on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/70" />
                {/* Text content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white/70 text-sm tracking-wider uppercase mb-2">
                      {photo.category}
                    </p>
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {photo.title}
                    </h3>
                    <p className="text-white/90">
                      {photo.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
} 