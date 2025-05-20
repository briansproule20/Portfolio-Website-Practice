'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const FISH_COUNT = 3;
const SWIM_DURATION = 12; // seconds

function getRandomTop() {
  return Math.random() * 70 + 10; // 10% to 80% of viewport height
}
function getRandomDelay() {
  return Math.random() * SWIM_DURATION; // 0 to 12s
}

function Fish({ top, delay, keyId }: { top: number; delay: number; keyId: number }) {
  return (
    <div
      key={keyId}
      style={{
        position: 'fixed',
        top: `${top}vh`,
        right: '-300px',
        zIndex: 1000,
        pointerEvents: 'none',
        animation: `swim-fish-left ${SWIM_DURATION}s linear ${delay}s infinite`,
      }}
    >
      <Image
        src="/fish.png"
        alt="Swimming Fish"
        width={220}
        height={100}
        style={{ pointerEvents: 'none', transform: 'scaleX(-1)' }}
        priority
      />
      <style jsx global>{`
        @keyframes swim-fish-left {
          0% {
            right: -300px;
            transform: scaleX(-1) rotate(-2deg);
          }
          10% {
            transform: scaleX(-1.05) rotate(2deg);
          }
          50% {
            right: 100vw;
            transform: scaleX(-1) rotate(-2deg);
          }
          100% {
            right: 100vw;
            transform: scaleX(-1) rotate(-2deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function SwimmingFish() {
  const [fishArray, setFishArray] = useState<{ top: number; delay: number; keyId: number }[]>([]);

  useEffect(() => {
    // Initialize fish with random positions and delays
    setFishArray(
      Array.from({ length: FISH_COUNT }, (_, i) => ({
        top: getRandomTop(),
        delay: getRandomDelay(),
        keyId: i + Math.random(),
      }))
    );
  }, []);

  // After each swim, respawn fish with new position and delay
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    fishArray.forEach((fish, idx) => {
      timers.push(
        setTimeout(function respawn() {
          setFishArray(fishArr => {
            const newArr = [...fishArr];
            newArr[idx] = { top: getRandomTop(), delay: getRandomDelay(), keyId: Math.random() };
            return newArr;
          });
          timers[idx] = setTimeout(respawn, (SWIM_DURATION + getRandomDelay()) * 1000);
        }, (SWIM_DURATION + fish.delay) * 1000)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [fishArray.length]);

  return <>{fishArray.map(fish => <Fish {...fish} key={fish.keyId} />)}</>;
} 