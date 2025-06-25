'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const designs = [
  {
    id: 1,
    title: "White Horse Conservation",
    category: "Brand Identity / Digital Marketing",
    description: "A series of logos and designs inspired by the rolling foothills of Western Pennsylvania.",
    image: "/images/whitehorse1.png",
    href: "/designs/whitehorse",
  },
  {
    id: 2,
    title: "Merit Systems",
    category: "Print",
    description: "Mission: Open Source",
    image: "/images/merit.png",
    href: "/designs/merit",
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
            Crafting digital and print media with clean designs and memorable aesthetics.
          </motion.p>
        </div>
      </motion.section>

      {/* Design Grid */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-4 -mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {designs.map((design) => (
          <Link key={design.id} href={design.href}>
            <motion.div
              variants={item}
              onMouseEnter={() => setHoveredId(design.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative aspect-[4/5] md:aspect-[4/5] rounded-xl overflow-hidden bg-[var(--card)] cursor-pointer"
            >
            <div className="absolute inset-0 z-10">
              <div className="absolute inset-x-[10%] top-[5%] bottom-[35%] md:bottom-[35%] overflow-hidden">
                <Image
                  src={design.image}
                  alt={design.title}
                  fill
                  className="object-cover object-[center_0%] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className={`absolute inset-0 z-20 p-4 md:p-8 flex flex-col ${
              design.id === 2 
                ? 'justify-start pt-[88%] md:pt-[88%]' 
                : 'justify-end'
            } transform translate-y-0 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500`}>
              <div className="space-y-2">
                <p className="text-[var(--highlight)] text-sm tracking-wider uppercase font-semibold">
                  {design.category}
                </p>
                <h3 className="text-[var(--accent)] text-xl md:text-2xl font-bold">
                  {design.title}
                </h3>
                <p className="text-[var(--highlight)] text-sm md:text-base font-medium opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {design.description}
                </p>
              </div>
            </div>

            <motion.div
              className="absolute inset-0 z-0 bg-[var(--highlight)] opacity-40 md:opacity-0 group-hover:opacity-40 transition-opacity duration-500"
              animate={{
                scale: hoveredId === design.id ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            </motion.div>
          </Link>
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