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

export default function SprouleGenealogy() {
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
            Sproule Family Genealogy
          </h1>
          <p className="text-xl text-[var(--accent)] font-serif italic mb-4">
            Information Design / Genealogy
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
                src: "/images/sproule-genealogy.png",
                alt: "Sproule Family Tree Design",
                caption: "Sproule Family Tree and Lineage"
              },
              {
                src: "/images/sproule-timeline.png",
                alt: "Sproule Family Timeline",
                caption: "Historical Timeline of the Sproule Family"
              },
              {
                src: "/images/sproule-ancestral-chart.png",
                alt: "Sproule Ancestral Chart",
                caption: "Multi-Generational Sproule Family Chart"
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
              The Sproule Family Genealogy project traces the rich history and heritage of the Sproule 
              lineage through comprehensive visual documentation. This genealogical study combines 
              traditional family research with modern design principles to preserve the Sproule family story.
            </p>
            <p className="text-[var(--accent)] leading-relaxed">
              From ancestral origins to present generations, this project captures the geographical 
              migrations, historical context, and personal narratives that define the Sproule family 
              legacy, creating a meaningful heirloom document for future generations.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
              Design Elements
            </h2>
            <ul className="space-y-3 text-[var(--accent)]">
              <li className="flex items-start">
                <span className="text-[var(--highlight)] mr-2">•</span>
                Traditional family tree structures and formats
              </li>
              <li className="flex items-start">
                <span className="text-[var(--highlight)] mr-2">•</span>
                Timeline-based genealogical documentation
              </li>
              <li className="flex items-start">
                <span className="text-[var(--highlight)] mr-2">•</span>
                Multi-generational chart systems
              </li>
              <li className="flex items-start">
                <span className="text-[var(--highlight)] mr-2">•</span>
                Integration of historical photographs and documents
              </li>
              <li className="flex items-start">
                <span className="text-[var(--highlight)] mr-2">•</span>
                Geographical mapping of family migration patterns
              </li>
              <li className="flex items-start">
                <span className="text-[var(--highlight)] mr-2">•</span>
                Custom typography for names and dates
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Design Philosophy */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 bg-[var(--card)] rounded-xl border border-[var(--accent)]/20"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 text-center">
            Design Philosophy
          </h2>
          <p className="text-[var(--accent)] leading-relaxed text-center max-w-3xl mx-auto">
            Genealogy is more than just names and dates—it's about preserving the stories, 
            connections, and legacy of families. My approach to genealogical design emphasizes 
            clarity, beauty, and respect for the individuals whose lives are being documented. 
            Each project aims to create a visual narrative that honors the past while providing 
            a meaningful resource for future generations.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
} 