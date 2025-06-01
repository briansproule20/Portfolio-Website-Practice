'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import photos from '@/utils/photos';

// Shuffle function using Fisher-Yates algorithm
const shuffleArray = (array: any[]) => {
  console.log('Starting shuffle with array length:', array.length);
  console.log('Original array:', array);
  
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  console.log('Shuffled array length:', shuffled.length);
  console.log('Shuffled array:', shuffled);
  return shuffled;
};

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'family', label: 'Family' },
  { id: 'friends', label: 'Friends' },
  { id: 'food', label: 'Food' },
  { id: 'memoriam', label: 'In Loving Memory' },
  { id: 'nature', label: 'Nature' },
  { id: 'pets', label: 'Pets' },
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

  // Create a new shuffled array on each render
  const shuffledPhotos = useMemo(() => shuffleArray([...photos]), []);

  // Assign consistent sizes to photos while maintaining aspect ratio
  const photoSizes = useMemo(() => {
    return shuffledPhotos.map(photo => {
      return {
        ...photo,
        span: 1, // All photos take up one column for consistency
        scaledHeight: 100, // Fixed height percentage
        offset: 0, // Remove random offset for alignment
      };
    });
  }, [shuffledPhotos]);

  const filteredPhotos = selectedCategory === 'all'
    ? photoSizes
    : photoSizes.filter(photo => photo.category.toLowerCase() === selectedCategory);

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
        className="max-w-7xl mx-auto px-4 pb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={item}
              className={`relative group ${
                photo.width > photo.height ? 'md:col-span-2' : ''
              }`}
            >
              <div 
                className="relative overflow-hidden bg-[var(--card)] border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors rounded-lg"
                style={{
                  aspectRatio: photo.width > photo.height ? '6/4' : '3/4',
                }}
              >
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                    photo.title === "Grandma Rosie" ? "object-[35%_center]" : ""
                  } ${
                    photo.width > photo.height ? "object-[center_35%]" : ""
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  priority
                />
                {/* Info Overlay - only visible on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 bg-black/70" />
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
        </div>
      </motion.section>
    </div>
  );
} 