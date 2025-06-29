'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface Game {
  id: string;
  title: string;
  genre: string;
  platform: string;
  coverArt: string;
  rating: number;
  hoursPlayed: number;
  review?: string;
  achievements?: number;
  totalAchievements?: number;
  lastPlayed?: string;
  // Additional Xbox Live API fields
  recentAchievements?: Achievement[];
  gameDescription?: string;
  developer?: string;
  releaseDate?: string;
  achievementRarity?: {
    common: number;
    uncommon: number;
    rare: number;
    epic: number;
    legendary: number;
  };
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  gamerscore: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  dateEarned: string;
  iconUrl?: string;
}

// Sample data - will be replaced with Xbox Live API
const sampleGames: Game[] = [
  {
    id: '1',
    title: 'The Elder Scrolls V: Skyrim',
    genre: 'RPG',
    platform: 'Xbox Series S',
    coverArt: '/images/skyrim-cover.jpg', // placeholder
    rating: 4.9,
    hoursPlayed: 312,
    review: 'A timeless masterpiece that continues to captivate with its vast world and endless possibilities. Every playthrough feels different.',
    achievements: 75,
    totalAchievements: 75,
    lastPlayed: '2024-01-20',
    gameDescription: 'The Elder Scrolls V: Skyrim is an epic fantasy open world RPG where you discover legends, create your own stories, and play any type of character you can imagine.',
    developer: 'Bethesda Game Studios',
    releaseDate: '2011-11-11',
    recentAchievements: [
      {
        id: 'ach_1',
        name: 'Dragonslayer',
        description: 'Complete "Dragonslayer"',
        gamerscore: 50,
        rarity: 'uncommon',
        dateEarned: '2024-01-20'
      }
    ],
    achievementRarity: {
      common: 25,
      uncommon: 30,
      rare: 15,
      epic: 4,
      legendary: 1
    }
  },
  {
    id: '2',
    title: 'The Elder Scrolls IV: Oblivion',
    genre: 'RPG',
    platform: 'Xbox Series S',
    coverArt: '/images/oblivion-cover.jpg', // placeholder
    rating: 4.7,
    hoursPlayed: 198,
    review: 'The perfect blend of classic Elder Scrolls gameplay and refined mechanics. The Dark Brotherhood questline remains unmatched.',
    achievements: 42,
    totalAchievements: 50,
    lastPlayed: '2023-11-15'
  },
  {
    id: '3',
    title: 'Starfield',
    genre: 'RPG',
    platform: 'Xbox Series S',
    coverArt: '/images/starfield-cover.jpg', // placeholder
    rating: 4.2,
    hoursPlayed: 87,
    review: 'An expansive space exploration RPG with incredible depth. The ship building mechanics are addictive, and the main story keeps you engaged for hours.',
    achievements: 34,
    totalAchievements: 50,
    lastPlayed: '2024-01-15'
  },
  {
    id: '4',
    title: 'The Witcher 3: Wild Hunt',
    genre: 'RPG',
    platform: 'Xbox Series S',
    coverArt: '/images/witcher3-cover.jpg', // placeholder
    rating: 4.8,
    hoursPlayed: 243,
    review: 'The gold standard for RPGs. Incredible world-building, memorable characters, and side quests that rival the main story.',
    achievements: 51,
    totalAchievements: 53,
    lastPlayed: '2023-10-15'
  },
  {
    id: '5',
    title: 'Star Wars Battlefront II',
    genre: 'Action',
    platform: 'Xbox Series S',
    coverArt: '/images/battlefront2-cover.jpg', // placeholder
    rating: 4.3,
    hoursPlayed: 156,
    review: 'Incredible Star Wars atmosphere with epic large-scale battles. The single-player campaign tells a compelling Imperial story.',
    achievements: 28,
    totalAchievements: 35,
    lastPlayed: '2023-12-05'
  },
  {
    id: '6',
    title: 'Star Wars Jedi: Fallen Order',
    genre: 'Action-Adventure',
    platform: 'Xbox Series S',
    coverArt: '/images/fallen-order-cover.jpg', // placeholder
    rating: 4.6,
    hoursPlayed: 89,
    review: 'A fantastic return to single-player Star Wars gaming. Great combat, exploration, and an engaging story about rebuilding the Jedi Order.',
    achievements: 29,
    totalAchievements: 40,
    lastPlayed: '2024-01-08'
  }
];

export default function GameHome() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [apiError, setApiError] = useState<boolean>(false);
  
  // TODO: Replace with actual Xbox Live API call
  // For now, we'll simulate API success with sample data
  // When Xbox Live API fails, set setApiError(true)
  const games = sampleGames;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[35vh] md:h-[40vh] flex items-center justify-center overflow-hidden pt-16 md:pt-20"
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
            Games
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4 mb-8"
          >
            An exhibition games played, worlds explored.
          </motion.p>
          
          {/* Xbox Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-[var(--foreground)]"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--highlight)]">127,500</div>
              <div className="text-sm md:text-base text-[var(--accent)] uppercase tracking-wide">Gamerscore</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[var(--accent)] opacity-30"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--highlight)]">fishmug</div>
              <div className="text-sm md:text-base text-[var(--accent)] uppercase tracking-wide">Gamertag</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[var(--accent)] opacity-30"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--highlight)]">342</div>
              <div className="text-sm md:text-base text-[var(--accent)] uppercase tracking-wide">Achievements</div>
            </div>
          </motion.div>
          
          {/* API Error Message */}
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 px-4 py-3 bg-red-900/20 border border-red-700/30 rounded-xl text-red-400 text-center max-w-md mx-auto"
            >
              <p className="text-sm">
                ⚠️ Unable to connect to Xbox Live. Showing sample games below.
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Clean Game Gallery */}
      <motion.section 
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-8 py-8"
      >
        <div className="grid gap-3 md:gap-4 lg:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Display max 30 games on main page - full list available at /gamehome/full */}
          {games.slice(0, 30).map((game, index) => (
            <motion.div
              key={game.id}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedGame(game)}
            >
              {/* Main Cover Art Card */}
              <div className="relative overflow-hidden rounded-3xl shadow-xl transform transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2">
                {/* Cover Art */}
                <div className="relative bg-gradient-to-br from-[var(--highlight)] to-[var(--accent)] flex items-center justify-center text-9xl text-[var(--background)] opacity-50 aspect-[3/4]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="relative z-10">🎮</span>
                </div>

                                 {/* Clean Title Area */}
                 <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                   <h3 className="text-white font-bold text-2xl mb-2 group-hover:text-[var(--highlight)] transition-colors duration-300">
                     {game.title}
                   </h3>
                   <p className="text-white/70 text-base">{game.genre}</p>
                 </div>

                 {/* Hover Rating */}
                 <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-sm rounded-2xl px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                   <div className="flex items-center gap-2 text-white">
                     <span className="text-yellow-400 text-lg">★</span>
                     <span className="font-semibold">{game.rating}</span>
                   </div>
                 </div>

                 {/* Subtle Hover Glow */}
                 <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-[0_20px_60px_rgba(183,191,163,0.2)]" />
               </div>
            </motion.div>
          ))}
        </div>
        
        {/* Full List Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <a
            href="/gamehome/full"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--card)] border border-[var(--accent)] rounded-2xl text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-[var(--background)] transition-all duration-300 group"
          >
            <span className="font-semibold">View Full Game Library</span>
            <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </motion.div>
      </motion.section>

      {/* Game Detail Modal */}
      {selectedGame && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedGame(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[var(--card)] rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">{selectedGame.title}</h2>
              <button
                onClick={() => setSelectedGame(null)}
                className="text-[var(--accent)] hover:text-[var(--highlight)] text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-[var(--accent)]">{selectedGame.genre} • {selectedGame.platform}</span>
                {selectedGame.developer && (
                  <span className="text-[var(--accent)]">• {selectedGame.developer}</span>
                )}
              </div>
              
              {selectedGame.gameDescription && (
                <div>
                  <p className="text-[var(--foreground)] text-sm leading-relaxed">{selectedGame.gameDescription}</p>
                </div>
              )}
              
              {selectedGame.releaseDate && (
                <div>
                  <span className="text-[var(--accent)]">Released: </span>
                  <span className="text-[var(--foreground)] font-semibold">
                    {new Date(selectedGame.releaseDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[var(--accent)]">Rating: </span>
                  <span className="text-[var(--foreground)] font-semibold">★ {selectedGame.rating}</span>
                </div>
                {selectedGame.achievements && (
                  <>
                    <div>
                      <span className="text-[var(--accent)]">Achievements: </span>
                      <span className="text-[var(--foreground)] font-semibold">
                        {selectedGame.achievements}/{selectedGame.totalAchievements}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--accent)]">Completion: </span>
                      <span className="text-[var(--foreground)] font-semibold">
                        {Math.round((selectedGame.achievements / selectedGame.totalAchievements!) * 100)}%
                      </span>
                    </div>
                  </>
                )}
              </div>
              
              {selectedGame.review && (
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">My Review</h3>
                  <p className="text-[var(--accent)] leading-relaxed">{selectedGame.review}</p>
                </div>
              )}
              
              {selectedGame.lastPlayed && (
                <div className="text-sm text-[var(--accent)]">
                  Last played: {new Date(selectedGame.lastPlayed).toLocaleDateString()}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 