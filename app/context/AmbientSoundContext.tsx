'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';

export type AmbientSoundType = 'martian-breeze' | 'ocean-waves' | 'birdsong' | null;

type AmbientSoundContextType = {
  currentSound: AmbientSoundType;
  isPlaying: boolean;
  volume: number;
  setSound: (sound: AmbientSoundType) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
};

const AmbientSoundContext = createContext<AmbientSoundContextType | undefined>(undefined);

export function AmbientSoundProvider({ children }: { children: React.ReactNode }) {
  const [currentSound, setCurrentSound] = useState<AmbientSoundType>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    // Check if user has saved preferences
    const savedSoundString = localStorage.getItem('ambientSound');
    const savedVolume = localStorage.getItem('ambientVolume');
    const savedIsPlaying = localStorage.getItem('ambientIsPlaying') === 'true';
    
    if (savedSoundString && savedSoundString !== 'null') {
      const savedSound = savedSoundString as AmbientSoundType;
      setCurrentSound(savedSound);
    }
    if (savedVolume) {
      setVolumeState(parseFloat(savedVolume));
    }
    if (savedIsPlaying && savedSoundString && savedSoundString !== 'null') {
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Clean up previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (currentSound && isPlaying) {
      const audio = new Audio(`/audio/${currentSound}.mp3`);
      audio.loop = true;
      audio.volume = volume;
      
      audio.play().catch(error => {
        console.warn('Audio play failed:', error);
        setIsPlaying(false);
      });
      
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentSound, isPlaying, volume, mounted]);

  const setSound = (sound: AmbientSoundType) => {
    setCurrentSound(sound);
    localStorage.setItem('ambientSound', sound || 'null');
    
    if (sound === null) {
      setIsPlaying(false);
      localStorage.setItem('ambientIsPlaying', 'false');
    }
  };

  const togglePlay = () => {
    const newIsPlaying = !isPlaying;
    setIsPlaying(newIsPlaying);
    localStorage.setItem('ambientIsPlaying', newIsPlaying.toString());
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    localStorage.setItem('ambientVolume', newVolume.toString());
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <AmbientSoundContext.Provider 
        value={{ 
          currentSound: null, 
          isPlaying: false, 
          volume: 0.3, 
          setSound: () => {}, 
          togglePlay: () => {}, 
          setVolume: () => {} 
        }}
      >
        {children}
      </AmbientSoundContext.Provider>
    );
  }

  return (
    <AmbientSoundContext.Provider 
      value={{ 
        currentSound, 
        isPlaying, 
        volume, 
        setSound, 
        togglePlay, 
        setVolume 
      }}
    >
      {children}
    </AmbientSoundContext.Provider>
  );
}

export function useAmbientSound() {
  const context = useContext(AmbientSoundContext);
  if (context === undefined) {
    // During development, provide more helpful error information
    if (typeof window !== 'undefined') {
      console.error('useAmbientSound must be used within an AmbientSoundProvider. Make sure your component is wrapped with <AmbientSoundProvider>');
    }
    throw new Error('useAmbientSound must be used within an AmbientSoundProvider');
  }
  return context;
} 