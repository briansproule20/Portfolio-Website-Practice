'use client';

import { motion } from 'framer-motion';

export default function NarrativeTheory() {
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
            Narrative Theory
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
          >
            Exploring the art and science of storytelling.
          </motion.p>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-8"
        >
          {/* Introduction */}
          <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
            <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">What is Narrative Theory?</h2>
            <p className="text-lg text-[var(--foreground)] leading-relaxed">
              Narrative theory examines how stories work, why they matter, and how they shape our understanding of the world. 
              From ancient myths to modern media, narratives are fundamental to human communication and culture.
            </p>
          </div>

          {/* Key Concepts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Story Structure</h3>
              <p className="text-[var(--foreground)]">
                The fundamental building blocks of narrative: plot, character, setting, and theme. 
                Understanding how these elements work together creates compelling stories.
              </p>
            </div>

            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Character Development</h3>
              <p className="text-[var(--foreground)]">
                How characters grow, change, and drive the story forward. 
                Character arcs and motivations are central to engaging narratives.
              </p>
            </div>

            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Narrative Perspective</h3>
              <p className="text-[var(--foreground)]">
                Point of view shapes how readers experience the story. 
                First, second, and third person perspectives each offer unique storytelling possibilities.
              </p>
            </div>

            <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Thematic Elements</h3>
              <p className="text-[var(--foreground)]">
                The deeper meanings and messages within stories. 
                Themes connect individual narratives to universal human experiences.
              </p>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)]">
            <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Applications in Modern Media</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-semibold mb-2 text-[var(--foreground)]">Literature</h4>
                <p className="text-sm text-[var(--accent)]">Novels, short stories, poetry</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2 text-[var(--foreground)]">Film & Television</h4>
                <p className="text-sm text-[var(--accent)]">Movies, series, documentaries</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2 text-[var(--foreground)]">Games</h4>
                <p className="text-sm text-[var(--accent)]">Video games, tabletop RPGs</p>
              </div>
            </div>
          </div>

          {/* Future Content Placeholder */}
          <div className="bg-[var(--card)] rounded-lg p-6 border-2 border-[var(--accent)] text-center">
            <h2 className="text-2xl font-bold mb-4 text-[var(--foreground)]">Coming Soon</h2>
            <p className="text-[var(--foreground)]">
              More detailed explorations of narrative theory concepts, case studies, and practical applications 
              will be added here as this section develops.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
} 