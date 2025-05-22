'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const designs = [
  {
    id: 1,
    title: "Digital Landscapes",
    category: "UI/UX",
    description: "A series of digital interfaces inspired by natural landscapes",
    image: "/images/design1.jpg",
  },
  {
    id: 2,
    title: "Typography Studies",
    category: "Print",
    description: "Exploring the intersection of classic and modern typography",
    image: "/images/design2.jpg",
  },
  {
    id: 3,
    title: "Brand Evolution",
    category: "Branding",
    description: "Visual identity systems that grow with businesses",
    image: "/images/design3.jpg",
  },
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

export default function Designs() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--card)] to-transparent opacity-40" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-7xl font-black mb-6 text-[var(--foreground)] tracking-tight"
          >
            Design Portfolio
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-[var(--accent)] font-serif italic"
          >
            Crafting digital experiences with purpose and precision
          </motion.p>
        </div>
      </motion.section>

      {/* Design Grid */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {designs.map((design) => (
          <motion.div
            key={design.id}
            variants={item}
            onMouseEnter={() => setHoveredId(design.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-[var(--card)]"
          >
            <div className="absolute inset-0 z-10">
              <Image
                src={design.image}
                alt={design.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <div className="space-y-2">
                <p className="text-white/70 text-sm tracking-wider uppercase">
                  {design.category}
                </p>
                <h3 className="text-white text-2xl font-bold">
                  {design.title}
                </h3>
                <p className="text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {design.description}
                </p>
              </div>
            </div>

            <motion.div
              className="absolute inset-0 z-0 bg-[var(--highlight)] opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              animate={{
                scale: hoveredId === design.id ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-[var(--foreground)]">
            Let's Create Something Together
          </h2>
          <p className="text-[var(--accent)] text-lg max-w-2xl mx-auto">
            I'm always open to discussing new projects and creative opportunities.
          </p>
          <button className="mt-8 px-8 py-3 bg-[var(--highlight)] text-[var(--background)] rounded-full font-medium hover:opacity-90 transition-opacity">
            Get in Touch
          </button>
        </motion.div>
      </section>
    </div>
  );
} 