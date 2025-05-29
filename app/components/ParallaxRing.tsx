'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ParallaxRing() {
  const [offset, setOffset] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent hydration mismatch

  useEffect(() => {
    // Check if we're on mobile and update on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      if (isMobile) return; // Don't apply scroll effects on mobile
      
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / maxScroll;
      
      setOffset(scrollPosition * 1.0);
      setRotation(scrollPercentage * 720);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] relative mt-4 md:mt-0">
      <div 
        className={`absolute w-full h-full ${!isMobile && 'transition-all duration-100 ease-linear'}`}
        style={{ 
          transform: isMobile ? 'none' : `translateY(${offset}px) rotate(${rotation}deg)`,
          willChange: isMobile ? 'auto' : 'transform'
        }}
      >
        <Image 
          src="/onering.png"
          alt="The One Ring"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
} 