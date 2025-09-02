'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface SlideImage {
  src: string;
  alt: string;
  caption: string;
  isVideo?: boolean;
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
        {images[currentIndex].isVideo ? (
          <video
            src={images[currentIndex].src}
            controls
            className="w-full h-full object-cover transition-opacity duration-500"
            aria-label={images[currentIndex].alt}
          />
        ) : (
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-cover transition-opacity duration-500"
          />
        )}
        
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
          
          {/* Merit Systems and GitHub Buttons */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 text-center"
          >
            <p className="text-sm text-[var(--accent)] mb-3 font-medium">
              Visit Merit Systems and Add to your Repo
            </p>
            <div className="flex items-center justify-center gap-6">
              {/* Merit Systems Logo */}
              <motion.a
                href="https://www.merit.systems/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center relative group cursor-pointer"
                aria-label="Visit Merit Systems website"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated ring effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[var(--highlight)] opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Pulsing glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[var(--highlight)] opacity-0 group-hover:opacity-20 blur-xl"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main logo container */}
                <motion.div
                  className="relative z-10 p-2"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Image
                    src="/images/merit.png"
                    alt="Merit Systems Logo"
                    width={56}
                    height={56}
                    className="drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                  />
                </motion.div>
                
                {/* Orbiting particles */}
                <motion.div
                  className="absolute w-2 h-2 bg-[var(--highlight)] rounded-full opacity-60"
                  animate={{
                    rotate: 360,
                    x: [20, -20, 20],
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute w-1.5 h-1.5 bg-[var(--accent)] rounded-full opacity-40"
                  animate={{
                    rotate: -360,
                    x: [-25, 25, -25],
                    y: [10, -10, 10],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.a>

              {/* GitHub Link */}
              <motion.a
                href="https://github.com/briansproule20/merit-manifesto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center relative group cursor-pointer"
                aria-label="Visit Merit Manifesto GitHub"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated ring effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[var(--highlight)] opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Pulsing glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[var(--highlight)] opacity-0 group-hover:opacity-20 blur-xl"
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* GitHub icon container */}
                <motion.div
                  className="relative z-10 p-2"
                  animate={{
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-[var(--highlight)] drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </motion.div>
                
                {/* Orbiting particles */}
                <motion.div
                  className="absolute w-2 h-2 bg-[var(--highlight)] rounded-full opacity-60"
                  animate={{
                    rotate: 360,
                    x: [20, -20, 20],
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute w-1.5 h-1.5 bg-[var(--accent)] rounded-full opacity-40"
                  animate={{
                    rotate: -360,
                    x: [-25, 25, -25],
                    y: [10, -10, 10],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>



        {/* README Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 bg-[var(--card)] rounded-xl"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Merit Manifesto README
          </h2>
          <div className="bg-[var(--background)] rounded-lg p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-[var(--accent)] whitespace-pre-wrap">
{`# Merit Systems
The coordination company for the information economy

Merit Systems is building the infrastructure for a new commons: where creators own what they build, attribution flows naturally, and human ingenuity is properly aligned and incentivized toward humanity's biggest challenges.

## Bringing the Manifesto to Life
What began as a conversation over a Christmas pint soon became blocks of texts and early rough drafts. Sam and Ryan had a brilliant idea in the tryworks, and we made it our goal to publish a piece that shared these ideas with the world in a clean, accessible format.

## Critical Dependency: Emily Devery
Bringing Emily onto the project changed everything. This wasn't just a typography cleanup, she completely streamlined the communication architecture.

Emily's contributions:
• Restructured information flow
• Strategic white space implementation
• Typography selection that made technical concepts approachable
• Visual hierarchy that guided readers through complex arguments

The content remained unchanged, but Emily's design work transformed a rough draft into a final proof.

## Printing Woes
Printing should have been straightforward: take Emily's beautifully designed PDF, send to printer, receive books. Instead, it became a months-long debugging session.

Issues encountered:
• Color profiles that worked on screen failed in print
• Paper stock couldn't handle the ink coverage
• Binding specifications incompatible with layout requirements
• Multiple printer iterations, each introducing new failure modes

I became an accidental expert in print production: paper weights, color management, binding techniques. None of this was in the original scope, but it was blocking ship. While Sam and Ryan could focus on content iteration and building out the Merit platform, I found myself deep in the manufacturing pipeline, solving print problems precluding the final product.

## Publisher's Retrospective
The Merit Systems Manifesto became a year-long proof of concept. It wasn't just describing better coordination systems, it was the output of that coordination system. Four people with different expertise collaborated fluidly, contributed according to their strengths, and shipped something none of them could have built alone.

Sam handled the strategic vision, Ryan brought the technical framework, Emily solved the design problems, and the publishing pipeline brought it into the world as a physical artifact. The final manifestos prove their own point: when you give talented people the right coordination tools and incentives, they build things that matter.

---

**Merit Systems**
Brooklyn, New York | 2024

**Sam Ragsdale** - Founder & Chief Executive Officer
**Ryan Sproule** - Founder & Chief Technology Officer

Technology is humanity's greatest lever for increasing abundance, yet the technology for organizing people has not evolved. Merit is building the infrastructure for humanity's next chapter.`}
            </pre>
          </div>
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

        {/* Complete Merit Book Gallery */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8 text-center">
            Complete Merit Book Gallery
          </h2>
          <ImageSlideshow 
            images={[
              {
                src: "/images/merit-books/IMG_1359.jpeg",
                alt: "Merit Systems Book Photo 1",
                caption: "Merit Book - Photo 1"
              },
              {
                src: "/images/merit-books/IMG_1360.jpeg",
                alt: "Merit Systems Book Photo 2",
                caption: "Merit Book - Photo 2"
              },
              {
                src: "/images/merit-books/IMG_1396.jpeg",
                alt: "Merit Systems Book Photo 3",
                caption: "Merit Book - Photo 3"
              },
              {
                src: "/images/merit-books/IMG_1410.jpeg",
                alt: "Merit Systems Book Photo 4",
                caption: "Merit Book - Photo 4"
              },
              {
                src: "/images/merit-books/IMG_1412.jpeg",
                alt: "Merit Systems Book Photo 5",
                caption: "Merit Book - Photo 5"
              },
              {
                src: "/images/merit-books/IMG_1413.jpeg",
                alt: "Merit Systems Book Photo 6",
                caption: "Merit Book - Photo 6"
              },
              {
                src: "/images/merit-books/IMG_1414.jpeg",
                alt: "Merit Systems Book Photo 7",
                caption: "Merit Book - Photo 7"
              },
              {
                src: "/images/merit-books/IMG_1415.jpeg",
                alt: "Merit Systems Book Photo 8",
                caption: "Merit Book - Photo 8"
              },
              {
                src: "/images/merit-books/IMG_1652.MOV",
                alt: "Merit Systems Book Video",
                caption: "Merit Book - Video Documentation",
                isVideo: true
              },
              {
                src: "/images/merit-books/IMG_1901.jpeg",
                alt: "Merit Systems Book Photo 9",
                caption: "Merit Book - Photo 9"
              },
              {
                src: "/images/merit-books/IMG_1904.jpeg",
                alt: "Merit Systems Book Photo 10",
                caption: "Merit Book - Photo 10"
              },
              {
                src: "/images/merit-books/IMG_1906.jpeg",
                alt: "Merit Systems Book Photo 11",
                caption: "Merit Book - Photo 11"
              },
              {
                src: "/images/merit-books/IMG_1907.jpeg",
                alt: "Merit Systems Book Photo 12",
                caption: "Merit Book - Photo 12"
              },
              {
                src: "/images/merit-books/IMG_1908.jpeg",
                alt: "Merit Systems Book Photo 13",
                caption: "Merit Book - Photo 13"
              },
              {
                src: "/images/merit-books/IMG_1909.jpeg",
                alt: "Merit Systems Book Photo 14",
                caption: "Merit Book - Photo 14"
              },
              {
                src: "/images/merit-books/IMG_2380.jpeg",
                alt: "Merit Systems Book Photo 15",
                caption: "Merit Book - Photo 15"
              },
              {
                src: "/images/merit-books/IMG_2383.jpeg",
                alt: "Merit Systems Book Photo 16",
                caption: "Merit Book - Photo 16"
              },
              {
                src: "/images/merit-books/IMG_2384.jpeg",
                alt: "Merit Systems Book Photo 17",
                caption: "Merit Book - Photo 17"
              },
              {
                src: "/images/merit-books/IMG_2385.jpeg",
                alt: "Merit Systems Book Photo 18",
                caption: "Merit Book - Photo 18"
              },
              {
                src: "/images/merit-books/IMG_2387.jpeg",
                alt: "Merit Systems Book Photo 19",
                caption: "Merit Book - Photo 19"
              },
              {
                src: "/images/merit-books/IMG_2388.jpeg",
                alt: "Merit Systems Book Photo 20",
                caption: "Merit Book - Photo 20"
              },
              {
                src: "/images/merit-books/IMG_2389.jpeg",
                alt: "Merit Systems Book Photo 21",
                caption: "Merit Book - Photo 21"
              },
              {
                src: "/images/merit-books/IMG_2390.jpeg",
                alt: "Merit Systems Book Photo 22",
                caption: "Merit Book - Photo 22"
              },
              {
                src: "/images/merit-books/IMG_2391.jpeg",
                alt: "Merit Systems Book Photo 23",
                caption: "Merit Book - Photo 23"
              },
              {
                src: "/images/merit-books/IMG_2392.jpeg",
                alt: "Merit Systems Book Photo 24",
                caption: "Merit Book - Photo 24"
              },
              {
                src: "/images/merit-books/IMG_2393.jpeg",
                alt: "Merit Systems Book Photo 25",
                caption: "Merit Book - Photo 25"
              },
              {
                src: "/images/merit-books/IMG_2394.jpeg",
                alt: "Merit Systems Book Photo 26",
                caption: "Merit Book - Photo 26"
              },
              {
                src: "/images/merit-books/IMG_2395.jpeg",
                alt: "Merit Systems Book Photo 27",
                caption: "Merit Book - Photo 27"
              },
              {
                src: "/images/merit-books/IMG_2396.jpeg",
                alt: "Merit Systems Book Photo 28",
                caption: "Merit Book - Photo 28"
              },
              {
                src: "/images/merit-books/IMG_2397.jpeg",
                alt: "Merit Systems Book Photo 29",
                caption: "Merit Book - Photo 29"
              },
              {
                src: "/images/merit-books/IMG_2398.jpeg",
                alt: "Merit Systems Book Photo 30",
                caption: "Merit Book - Photo 30"
              },
              {
                src: "/images/merit-books/IMG_2399.jpeg",
                alt: "Merit Systems Book Photo 31",
                caption: "Merit Book - Photo 31"
              },
              {
                src: "/images/merit-books/IMG_2400.jpeg",
                alt: "Merit Systems Book Photo 32",
                caption: "Merit Book - Photo 32"
              },
              {
                src: "/images/merit-books/IMG_2401.jpeg",
                alt: "Merit Systems Book Photo 33",
                caption: "Merit Book - Photo 33"
              },
              {
                src: "/images/merit-books/IMG_2402.jpeg",
                alt: "Merit Systems Book Photo 34",
                caption: "Merit Book - Photo 34"
              },
              {
                src: "/images/merit-books/IMG_2403.jpeg",
                alt: "Merit Systems Book Photo 35",
                caption: "Merit Book - Photo 35"
              }
            ]}
          />
        </motion.div>
      </motion.section>
    </div>
  );
} 