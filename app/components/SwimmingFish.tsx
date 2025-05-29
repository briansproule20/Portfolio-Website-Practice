'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const FISH_COUNT = 5;

function getRandomDuration() {
  return Math.random() * 10 + 15; // 15-25 seconds
}

function getRandomDelay() {
  return Math.random() * 8; // 0-8 seconds delay
}

function Fish({ top, index }: { top: number; index: number }) {
  const duration = getRandomDuration();
  const delay = getRandomDelay();
  
  return (
    <div
      style={{
        position: 'fixed',
        top: `${top}vh`,
        right: '-300px',
        zIndex: 9999,
        animation: `swim-fish ${duration}s linear ${delay}s infinite`,
      }}
    >
      <Image
        src="/fish.png"
        alt="Swimming Fish"
        width={220}
        height={100}
        priority
      />
      <style jsx global>{`
        @keyframes swim-fish {
          from {
            right: -300px;
          }
          to {
            right: 100vw;
          }
        }
      `}</style>
    </div>
  );
}

export default function SwimmingFish() {
  const [fishPositions, setFishPositions] = useState<number[]>([]);

  useEffect(() => {
    // Ensure fish are spaced out vertically
    const positions = Array.from({ length: FISH_COUNT }, (_, i) => {
      const sectionSize = 70 / FISH_COUNT; // Divide viewable area into sections
      const minY = 10 + (i * sectionSize); // Start at 10% + section offset
      const maxY = minY + sectionSize - 10; // Leave some gap between sections
      return Math.random() * (maxY - minY) + minY;
    });
    setFishPositions(positions);
  }, []);

  return (
    <>
      {fishPositions.map((top, idx) => (
        <Fish key={idx} top={top} index={idx} />
      ))}
    </>
  );
} 