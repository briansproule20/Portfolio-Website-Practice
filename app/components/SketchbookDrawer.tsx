'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { sketches as sketchData, type Sketch } from '../../data/sketches';

// Process sketch data to add full image paths
const processedSketches: Sketch[] = sketchData.map(sketch => ({
  ...sketch,
  image: `/sketches/${sketch.image}` // Convert to full path
}));

interface SketchbookDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SketchbookDrawer: React.FC<SketchbookDrawerProps> = ({ isOpen, onToggle }) => {
  const [sketches, setSketches] = useState<Sketch[]>(processedSketches);
  const [loading, setLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debug: Log what sketches are actually loaded and force reset
  useEffect(() => {
    console.log('SketchbookDrawer - Loaded sketches:', processedSketches.map(s => ({ title: s.title, image: s.image })));
    console.log('SketchbookDrawer - Total sketches:', processedSketches.length);
    // Force reset the sketches state to ensure fresh data
    setSketches([...processedSketches]);
  }, []);

  // Helper function to get image container classes based on aspect ratio and size
  const getImageClasses = (aspectRatio: string = 'square', size: string = 'medium') => {
    // Different height classes based on aspect ratio for better presentation
    const getHeightClass = (aspect: string, size: string) => {
      if (aspect === 'portrait') {
        // Portrait sketches get extra height to show properly
        return size === 'small' ? 'h-32' : size === 'medium' ? 'h-48' : 'h-56';
      } else if (aspect === 'wide') {
        // Wide sketches stay shorter
        return size === 'small' ? 'h-20' : size === 'medium' ? 'h-24' : 'h-32';
      } else {
        // Square and landscape get standard heights
        return size === 'small' ? 'h-24' : size === 'medium' ? 'h-32' : 'h-40';
      }
    };

    const aspectClasses = {
      square: 'aspect-square',
      portrait: 'aspect-[3/4]',
      landscape: 'aspect-[4/3]', 
      wide: 'aspect-[16/9]'
    };

    return `${getHeightClass(aspectRatio, size)} ${aspectClasses[aspectRatio as keyof typeof aspectClasses]}`;
  };

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Infinite scroll - cycle through the six real sketches
  const loadMoreSketches = () => {
    if (loading) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Cycle through the original sketches with new IDs
      const newSketches = processedSketches.map((sketch, index) => ({
        ...sketch,
        id: sketches.length + index + 1,
      }));
      
      setSketches(prev => [...prev, ...newSketches]);
      setLoading(false);
    }, 1000);
  };

  // Check if user scrolled near bottom
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading) {
      loadMoreSketches();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={onToggle}
        className={`fixed top-1/2 -translate-y-1/2 z-50 p-3 bg-[var(--card)] border-2 border-[var(--accent)] rounded-l-lg shadow-lg transition-all duration-300 ${
          isOpen ? 'right-80 md:right-96' : 'right-0'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-4 h-0.5 bg-[var(--foreground)] rounded transition-transform duration-200" 
               style={{ transform: isOpen ? 'rotate(45deg) translateY(3px)' : 'none' }} />
          <div className="w-4 h-0.5 bg-[var(--foreground)] rounded transition-opacity duration-200" 
               style={{ opacity: isOpen ? 0 : 1 }} />
          <div className="w-4 h-0.5 bg-[var(--foreground)] rounded transition-transform duration-200" 
               style={{ transform: isOpen ? 'rotate(-45deg) translateY(-3px)' : 'none' }} />
        </div>
        <span className="text-xs text-[var(--accent)] mt-1 writing-mode-vertical">
          {isOpen ? 'Close' : 'Sketches'}
        </span>
      </motion.button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-16 right-0 w-80 md:w-96 h-[calc(100vh-4rem)] bg-[var(--card)] border-l-2 border-[var(--accent)] shadow-2xl z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--accent)] bg-gradient-to-r from-[var(--card)] to-[var(--background)]">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-1">Sketchbook</h2>
              <p className="text-sm text-[var(--accent)]">Design concepts & hand-drawn notes</p>
            </div>

            {/* Sketches Container */}
            <div
              ref={containerRef}
              className="h-full pb-20 overflow-y-auto scrollbar-hide"
              onScroll={handleScroll}
            >
              <div className="p-4 space-y-6">
                {sketches.map((sketch, index) => (
                  <motion.div
                    key={sketch.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    {/* Parallax Background */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-[var(--highlight)]/10 to-transparent rounded-lg transform"
                      style={{
                        transform: `translateY(${(scrollY * 0.1 * (index % 3 - 1))}px)`,
                      }}
                    />
                    
                                         {/* Sketch Card */}
                     <div className="relative bg-[var(--background)] rounded-lg p-4 border border-[var(--accent)]/20 hover:border-[var(--highlight)] transition-all duration-300 group-hover:shadow-lg">
                       {/* Image */}
                       <div className={`relative w-full mb-3 rounded overflow-hidden bg-[var(--accent)]/10 ${getImageClasses(sketch.aspectRatio, sketch.size)}`}>
                         <Image
                           src={sketch.image}
                           alt={sketch.title}
                           fill
                           className="opacity-70 group-hover:opacity-100 transition-opacity duration-300 object-contain"
                           style={{
                             transform: `translateY(${scrollY * 0.05 * (index % 2 === 0 ? 1 : -1)}px)`,
                           }}
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                       </div>

                                             {/* Content */}
                       <div className="space-y-2">
                         <div className="flex items-start justify-between">
                           <div className="flex-1">
                             <h3 className="font-semibold text-[var(--foreground)] text-sm group-hover:text-[var(--highlight)] transition-colors">
                               {sketch.title}
                             </h3>
                             {/* Dimensions indicator */}
                             <div className="flex items-center gap-2 mt-1">
                               <span className="text-xs px-1.5 py-0.5 bg-[var(--accent)]/20 text-[var(--accent)] rounded">
                                 {sketch.aspectRatio || 'square'}
                               </span>
                               <span className="text-xs px-1.5 py-0.5 bg-[var(--highlight)]/20 text-[var(--highlight)] rounded">
                                 {sketch.size || 'medium'}
                               </span>
                             </div>
                           </div>
                           <span className="text-xs text-[var(--accent)] whitespace-nowrap ml-2">
                             {sketch.date}
                           </span>
                         </div>
                        
                        <p className="text-xs text-[var(--accent)] leading-relaxed">
                          {sketch.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 pt-2">
                          {sketch.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-[var(--highlight)]/20 text-[var(--highlight)] rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--highlight)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                    </div>
                  </motion.div>
                ))}

                {/* Loading indicator */}
                {loading && (
                  <div className="flex justify-center py-8">
                    <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-[var(--highlight)] rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--card)] to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SketchbookDrawer; 