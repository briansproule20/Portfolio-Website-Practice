'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SwimmingFish from '../components/SwimmingFish';

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SwimmingFish />
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
            About Me
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
          >
            Publisher, writer, and former teacher with a passion for storytelling and design.
          </motion.p>
        </div>
      </motion.section>

      {/* About Content */}
      <section className="max-w-4xl mx-auto px-4 -mt-20">
        <div className="bg-[var(--card)] rounded-2xl p-8 shadow-lg border border-[var(--accent)]">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-center gap-2">
                  <span className="w-8 h-1 bg-[var(--highlight)] rounded-full"></span>
                  Who Am I?
                </h3>
                <p className="text-lg text-[var(--foreground)] leading-relaxed">
                  I'm a publisher and former high school English teacher with a passion for sharing lasting narratives in unique, underrepresented voices and accessible forms. I enjoy working with modern technologies and creating experiences that pay homage to timeless designs and classic storytelling.
                </p>
                <p className="text-lg text-[var(--foreground)] leading-relaxed">
                  My approach combines traditional publishing wisdom with innovative digital solutions, striving to make content more engaging and accessible to diverse audiences.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[var(--foreground)] flex items-center gap-2">
                  <span className="w-8 h-1 bg-[var(--highlight)] rounded-full"></span>
                  When I'm Not Reading or Writing...
                </h3>
                <p className="text-lg text-[var(--foreground)]">
                  You may be able to find me:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-lg text-[var(--foreground)]">
                    <span className="w-2 h-2 bg-[var(--highlight)] rounded-full"></span>
                    Exploring South Florida's waterways
                  </li>
                  <li className="flex items-center gap-3 text-lg">
                    <span className="w-2 h-2 bg-[var(--highlight)] rounded-full"></span>
                    <Link 
                      href="/gamehome"
                      className="group relative text-[var(--foreground)] hover:text-[var(--highlight)] transition-all duration-300 cursor-pointer"
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="relative z-10"
                      >
                        Playing the latest Sci-Fi/Fantasy RPG
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-[var(--highlight)] opacity-0 group-hover:opacity-10 rounded-md -mx-2 -my-1"
                        whileHover={{ opacity: 0.1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-[var(--highlight)] w-0 group-hover:w-full transition-all duration-300"
                        whileHover={{ width: "100%" }}
                      />
                    </Link>
                  </li>
                  {[
                    'Struggling through a run',
                    'Trying new recipes in the kitchen',
                    'Caring for and talking to my houseplants',
                    'Sketching and drawing (not very well)',
                    'Acting like an amateur naturalist',
                    'Outdoors in the sun, drink in hand',
                  ].map((activity, index) => (
                    <li key={index + 2} className="flex items-center gap-3 text-lg text-[var(--foreground)]">
                      <span className="w-2 h-2 bg-[var(--highlight)] rounded-full"></span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 p-6 bg-[var(--background)] rounded-xl border border-[var(--accent)]">
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-[var(--highlight)] rounded-full"></span>
              My Philosophy
            </h3>
            <p className="text-lg text-[var(--foreground)] italic leading-relaxed">
              Every story deserves to be told in a way that resonates with its audience. My mission is to bridge the gap between traditional storytelling and modern short form media.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 