'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function ParallaxRing() {
  const [offset, setOffset] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent hydration mismatch
  const [isClicked, setIsClicked] = useState(false);
  const [isHeating, setIsHeating] = useState(false);
  const [extraRotation, setExtraRotation] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/audio/one-ring.mp3');
    
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  // Cleanup animation when isClicked becomes false
  useEffect(() => {
    if (!isClicked && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      // Don't reset extraRotation - keep the ring at its final position
    }
  }, [isClicked]);

  const handleRingClick = () => {
    // Play the sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to beginning
      
      // Add event listener for this specific play
      const handleAudioEnd = () => {
        setIsHeating(false);
        setIsClicked(false);
        // Don't reset extraRotation - keep the ring at its final position
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        audioRef.current?.removeEventListener('ended', handleAudioEnd);
      };
      
      audioRef.current.addEventListener('ended', handleAudioEnd);
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Start heating effect and slow rotation
    setIsHeating(true);
    setIsClicked(true);
    
    // Start slow rotation animation
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rotationSpeed = 360 / 6000; // 360 degrees in 6 seconds
      setExtraRotation(elapsed * rotationSpeed);
      
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
  };

  return (
    <div className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] relative mt-4 md:mt-0">
      <div 
        className={`absolute w-full h-full cursor-pointer ${!isMobile && 'transition-all duration-100 ease-linear'} ${
          isHeating ? 'ring-heating' : ''
        }`}
        style={{ 
          transform: isMobile ? 'none' : `translate3d(0, ${offset}px, 0) rotate(${rotation + extraRotation}deg)`,
          willChange: 'transform, filter'
        }}
        onClick={handleRingClick}
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