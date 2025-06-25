'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface SlideImage {
  src: string;
  alt: string;
  caption: string;
}

interface ImageSlideshowProps {
  images: SlideImage[];
}

function ImageSlideshow({ images }: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      {/* Main Image Container */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--card)]">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-cover transition-opacity duration-500"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="mt-4 text-center">
        <p className="text-[var(--accent)] text-sm font-medium">
          {images[currentIndex].caption}
        </p>
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-[var(--highlight)]' 
                  : 'bg-[var(--accent)]/30 hover:bg-[var(--accent)]/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Merit() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-8">
        <Link 
          href="/designs" 
          className="inline-flex items-center text-[var(--accent)] hover:text-[var(--highlight)] transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Designs
        </Link>
      </div>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto px-4 pb-16"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-[var(--foreground)] tracking-tight">
            Merit Systems
          </h1>
          <p className="text-xl text-[var(--accent)] font-serif italic mb-4">
            Print Design / Mission: Open Source
          </p>
        </motion.div>

        {/* Image Slideshow */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <ImageSlideshow 
            images={[
              {
                src: "/images/merit.png",
                alt: "Merit Systems Main Design",
                caption: "Primary Merit Systems Design"
              },
              {
                src: "/images/merit.png",
                alt: "Merit Systems Logo Variations",
                caption: "Logo Design Variations"
              },
              {
                src: "/images/merit.png",
                alt: "Merit Systems Typography",
                caption: "Typography System"
              }
            ]}
          />
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
              Project Overview
            </h2>
            <p className="text-[var(--accent)] leading-relaxed mb-6">
              Merit Systems represents a commitment to open-source principles and transparent design. 
              This print design project explores the intersection of technology and accessibility, 
              creating visual systems that embody the values of open collaboration and shared knowledge.
            </p>
            <p className="text-[var(--accent)] leading-relaxed">
              The design emphasizes clean typography, structured layouts, and a minimalist aesthetic 
              that reflects the clarity and precision inherent in well-crafted open-source projects.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
              Design Philosophy
            </h2>
            <ul className="space-y-3 text-[var(--accent)]">
              <li className="flex items-start">
                <span className="text-[var(--highlight)] mr-2">•</span>
                Open-source methodology and transparent processes
              </li>
              <li className="flex items-start">
                <span className="text-[var(--highlight)] mr-2">•</span>
                Minimalist design principles for maximum clarity
              </li>
              <li className="flex items-start">
                <span className="text-[var(--highlight)] mr-2">•</span>
                Structured typography and grid systems
              </li>
              <li className="flex items-start">
                <span className="text-[var(--highlight)] mr-2">•</span>
                Accessibility-first design considerations
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Additional Design Showcase */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8 text-center">
            Design Development & Applications
          </h2>
          <ImageSlideshow 
            images={[
              {
                src: "/images/merit.png",
                alt: "Merit Systems Development Process",
                caption: "Design Development Process"
              },
              {
                src: "/images/merit.png",
                alt: "Merit Systems Print Applications",
                caption: "Print Design Applications"
              },
              {
                src: "/images/merit.png",
                alt: "Merit Systems Digital Implementations",
                caption: "Digital System Implementations"
              }
            ]}
          />
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-16 p-8 bg-[var(--card)] rounded-xl"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Technical Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-[var(--highlight)] mb-2">Category</h3>
              <p className="text-[var(--accent)]">Print Design</p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--highlight)] mb-2">Focus</h3>
              <p className="text-[var(--accent)]">Open Source Systems</p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--highlight)] mb-2">Medium</h3>
              <p className="text-[var(--accent)]">Print / Digital</p>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
} 