'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Worldbuilding() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const planets = [
    { id: 1, name: "Meridian", size: 0.8, distance: 60, color: "#8B4513", orbitSpeed: 20 },
    { id: 2, name: "Aurora", size: 1.2, distance: 100, color: "#4169E1", orbitSpeed: 15 },
    { id: 3, name: "Terra Nova", size: 1.0, distance: 140, color: "#228B22", orbitSpeed: 12 },
    { id: 4, name: "Crimson", size: 0.9, distance: 180, color: "#DC143C", orbitSpeed: 10 },
    { id: 5, name: "Jupiter's Echo", size: 2.5, distance: 240, color: "#DAA520", orbitSpeed: 8 },
    { id: 6, name: "Crystalline", size: 1.1, distance: 300, color: "#87CEEB", orbitSpeed: 6 },
    { id: 7, name: "Shadow", size: 1.3, distance: 360, color: "#2F4F4F", orbitSpeed: 5 },
    { id: 8, name: "Frost", size: 0.7, distance: 420, color: "#F0F8FF", orbitSpeed: 4 }
  ];

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
            Worldbuilding
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
          >
            Exploring the art of creating entire worlds and universes.
          </motion.p>
        </div>
      </motion.section>

      {/* Solar System Model */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-[var(--foreground)]">Solar System Model</h2>
          <p className="text-lg text-[var(--accent)] mb-8">A fictional solar system with unique worlds</p>
        </motion.div>

        <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center overflow-hidden">
          {/* Central Red Star */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute z-10 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-2xl shadow-red-500/50"
            style={{
              boxShadow: '0 0 50px rgba(239, 68, 68, 0.6), 0 0 100px rgba(239, 68, 68, 0.3)'
            }}
          />

          {/* Planet Orbits and Planets */}
          {mounted && planets.map((planet, index) => (
            <motion.div
              key={planet.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
              className="absolute"
              style={{
                width: planet.distance * 2,
                height: planet.distance * 2,
                animation: `orbit ${planet.orbitSpeed}s linear infinite`
              }}
            >
              {/* Orbit Ring */}
              <div 
                className="absolute inset-0 border border-[var(--accent)]/20 rounded-full"
                style={{ width: '100%', height: '100%' }}
              />
              
              {/* Planet */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: planet.size * 12,
                  height: planet.size * 12,
                  backgroundColor: planet.color,
                  borderRadius: '50%',
                  boxShadow: `0 0 20px ${planet.color}40, inset 0 0 20px rgba(0,0,0,0.3)`
                }}
                whileHover={{ 
                  scale: 1.2,
                  boxShadow: `0 0 30px ${planet.color}60, inset 0 0 20px rgba(0,0,0,0.3)`
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Planet Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs md:text-sm text-[var(--foreground)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {planet.name}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Planet Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {planets.map((planet) => (
            <div
              key={planet.id}
              className="bg-[var(--card)] rounded-lg p-4 border-2 border-[var(--accent)] hover:border-[var(--highlight)] transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: planet.color }}
                />
                <h3 className="font-semibold text-[var(--foreground)]">{planet.name}</h3>
              </div>
              <p className="text-sm text-[var(--accent)]">
                Distance: {planet.distance} AU | Size: {planet.size}x Earth
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
} 