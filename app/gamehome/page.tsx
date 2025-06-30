'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { gameFilterConfig } from '../../lib/game-filters';

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
    lastPlayed: '2023-11-15',
    gameDescription: 'The fourth installment in The Elder Scrolls series, featuring an epic fantasy RPG experience in the province of Cyrodiil with groundbreaking AI and immersive gameplay.',
    developer: 'Bethesda Game Studios',
    releaseDate: '2006-03-20',
    recentAchievements: [
      {
        id: 'ach_2',
        name: 'Listener',
        description: 'Become Listener of the Dark Brotherhood',
        gamerscore: 30,
        rarity: 'rare',
        dateEarned: '2023-11-15'
      }
    ],
    achievementRarity: {
      common: 18,
      uncommon: 15,
      rare: 8,
      epic: 1,
      legendary: 0
    }
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
    lastPlayed: '2024-01-15',
    gameDescription: 'The first new universe in 25 years from Bethesda Game Studios. In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom.',
    developer: 'Bethesda Game Studios',
    releaseDate: '2023-09-06',
    recentAchievements: [
      {
        id: 'ach_3',
        name: 'Into the Unknown',
        description: 'Complete "Into the Unknown"',
        gamerscore: 40,
        rarity: 'uncommon',
        dateEarned: '2024-01-15'
      }
    ],
    achievementRarity: {
      common: 12,
      uncommon: 15,
      rare: 6,
      epic: 1,
      legendary: 0
    }
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
    lastPlayed: '2023-10-15',
    gameDescription: 'As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.',
    developer: 'CD PROJEKT RED',
    releaseDate: '2015-05-19',
    recentAchievements: [
      {
        id: 'ach_4',
        name: 'Lilac and Gooseberries',
        description: 'Find Yennefer of Vengerberg',
        gamerscore: 40,
        rarity: 'common',
        dateEarned: '2023-10-15'
      }
    ],
    achievementRarity: {
      common: 22,
      uncommon: 20,
      rare: 8,
      epic: 2,
      legendary: 1
    }
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
    lastPlayed: '2023-12-05',
    gameDescription: 'Embark on an endless Star Wars action experience from the bestselling Star Wars HD videogame franchise of all time. Experience rich multiplayer battlegrounds across all 3 eras.',
    developer: 'DICE',
    releaseDate: '2017-11-17',
    recentAchievements: [
      {
        id: 'ach_5',
        name: 'Imperial Commander',
        description: 'Complete the Campaign',
        gamerscore: 50,
        rarity: 'uncommon',
        dateEarned: '2023-12-05'
      }
    ],
    achievementRarity: {
      common: 15,
      uncommon: 10,
      rare: 2,
      epic: 1,
      legendary: 0
    }
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
    lastPlayed: '2024-01-08',
    gameDescription: 'A galaxy-spanning adventure awaits in Star Wars Jedi: Fallen Order, a new third-person action-adventure title from Respawn Entertainment.',
    developer: 'Respawn Entertainment',
    releaseDate: '2019-11-15',
    recentAchievements: [
      {
        id: 'ach_6',
        name: 'Trust Only in the Force',
        description: 'Complete the story',
        gamerscore: 90,
        rarity: 'epic',
        dateEarned: '2024-01-08'
      }
    ],
    achievementRarity: {
      common: 12,
      uncommon: 10,
      rare: 5,
      epic: 2,
      legendary: 0
    }
  }
];

export default function GameHome() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [apiError, setApiError] = useState<boolean>(false);
  const [games, setGames] = useState<Game[]>(sampleGames);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [xboxProfile, setXboxProfile] = useState<{
    gamertag: string;
    gamerscore: number;
    achievementCount: number;
    displayPicRaw?: string;
    realName?: string;
    bio?: string;
  } | null>(null);
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);

  // Fetch Xbox Live data on component mount
  useEffect(() => {
    fetchXboxData();
  }, []);

  const fetchXboxData = async () => {
    try {
      setIsLoading(true);
      setApiError(false);
      
      console.log('🎮 Attempting to fetch Xbox Live data...');
      
      // Force fresh data with cache busting to see Title Access data
      const cacheBuster = `?bust=${Date.now()}`;
      const response = await fetch(`/api/xbox${cacheBuster}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch Xbox data');
      }
      
      if (data.success) {
        console.log('✅ Xbox Live data fetched successfully');
        
        // Debug: Show first few games' complete structure from API
        console.log('🎮 RAW API RESPONSE - First 3 games:', data.games.slice(0, 3));
        data.games.slice(0, 3).forEach((game: any, index: number) => {
          console.log(`🎮 Game ${index + 1} "${game.title}" Structure:`, game);
          console.log(`🎮 Game ${index + 1} Developer:`, game.developer);
          console.log(`🎮 Game ${index + 1} Description:`, game.gameDescription);
          console.log(`🎮 Game ${index + 1} Release Date:`, game.releaseDate);
        });
        
        // Transform Xbox API data to our Game interface
        const transformedGames: Game[] = data.games.map((xboxGame: any) => ({
          id: xboxGame.id,
          title: xboxGame.title,
          genre: xboxGame.genre || 'Unknown',
          platform: xboxGame.platform || 'Xbox Series S',
          coverArt: xboxGame.coverArt || '/images/game-placeholder.jpg',
          rating: xboxGame.rating || 0,
          hoursPlayed: xboxGame.hoursPlayed || 0,
          review: xboxGame.review,
          achievements: xboxGame.achievements || 0,
          totalAchievements: xboxGame.totalAchievements || 0,
          lastPlayed: xboxGame.lastPlayed,
          gameDescription: xboxGame.gameDescription,
          developer: xboxGame.developer || undefined, // Don't set to empty string
          releaseDate: xboxGame.releaseDate,
          recentAchievements: xboxGame.recentAchievements || [],
          achievementRarity: xboxGame.achievementRarity,
        }));
        
        setGames(transformedGames);
        setXboxProfile({
          gamertag: data.profile.gamertag,
          gamerscore: data.profile.gamerscore,
          achievementCount: data.profile.achievementCount,
          displayPicRaw: data.profile.displayPicRaw,
          realName: data.profile.realName,
          bio: data.profile.bio,
        });
        setRecentAchievements(data.recentAchievements || []);
        
        console.log(`🎮 Loaded ${transformedGames.length} games for ${data.profile.gamertag}`);
      }
    } catch (error) {
      console.error('❌ Xbox Live API failed:', error);
      setApiError(true);
      // Keep using sample data when API fails
      setGames(sampleGames);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Gather all recent achievements for ticker
  const allRecentAchievements = recentAchievements.length > 0 ? 
    recentAchievements.slice(0, 12) : 
    games
      .filter(game => game.recentAchievements && game.recentAchievements.length > 0)
      .flatMap(game => game.recentAchievements!)
      .slice(0, 12);
  
  // Debug logging
  useEffect(() => {
    console.log('🎯 Achievement Debug:', {
      recentAchievementsCount: recentAchievements.length,
      gamesWithAchievements: games.filter(g => g.recentAchievements && g.recentAchievements.length > 0).length,
      allRecentAchievementsCount: allRecentAchievements.length,
      sampleAchievements: allRecentAchievements.slice(0, 3).map(a => a.name)
    });
  }, [recentAchievements, games, allRecentAchievements]);
  
  // Create ticker content based on state
  const getTickerContent = () => {
    if (apiError) {
      // Show error messages in red - repeat for seamless loop
      const errorMessages = [
        '🚫 Xbox Live API unavailable - Enable in environment settings or check credentials',
        '🚫 Displaying sample games below',
        '🚫 Check console for detailed error information',
        '🚫 Restart server after updating .env.local',
        '🚫 Verify Xbox credentials are correct'
      ];
      return errorMessages.join('    •    ') + '    •    ' + errorMessages.join('    •    ') + '    •    ';
    }
    
    if (isLoading) {
      // Show loading messages in blue - repeat for seamless loop
      const loadingMessages = [
        '🎮 Connecting to Xbox Live...',
        '🔄 Authenticating with Xbox servers...',
        '⏳ Fetching your game library...',
        '🎯 Loading achievement data...',
        '🔗 Syncing with Xbox Network...'
      ];
      return loadingMessages.join('    •    ') + '    •    ' + loadingMessages.join('    •    ') + '    •    ';
    }
    
    // Use real achievements if available
    const realAchievements = allRecentAchievements.map(a => `🏆 ${a.name}`);
    
    if (realAchievements.length > 0) {
      console.log('🎯 Using real achievements for ticker:', realAchievements.slice(0, 5));
      // Use real achievements - duplicate many times for seamless infinite loop
      const duplicatedAchievements = [...realAchievements, ...realAchievements, ...realAchievements, ...realAchievements, ...realAchievements, ...realAchievements, ...realAchievements, ...realAchievements, ...realAchievements, ...realAchievements];
      return duplicatedAchievements.join('    •    ') + '    •    ';
    } else {
      console.log('🎯 No real achievements available, using sample achievements');
      // Fall back to sample achievements if no real ones available
      const sampleAchievements = [
        '🏆 Dragon Slayer',
        '🏆 Master Explorer', 
        '🏆 Legend of the Galaxy',
        '🏆 Force Awakened',
        '🏆 Witcher Contract Complete',
        '🏆 Shout Mastered',
        '🏆 Imperial Victory',
        '🏆 Jedi Knight',
        '🏆 Thu\'um Master',
        '🏆 Galactic Hero'
      ];
      // Duplicate sample achievements many times for seamless infinite loop
      const duplicatedSamples = [...sampleAchievements, ...sampleAchievements, ...sampleAchievements, ...sampleAchievements, ...sampleAchievements, ...sampleAchievements, ...sampleAchievements, ...sampleAchievements, ...sampleAchievements, ...sampleAchievements];
      return duplicatedSamples.join('    •    ') + '    •    ';
    }
  };

  const tickerContent = getTickerContent();
  
  // Get ticker text color based on state
  const getTickerTextColor = () => {
    if (apiError) return 'text-red-400';
    if (isLoading) return 'text-blue-400';
    return 'text-[var(--accent)]';
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Get favorites from config
  const favoriteTitles = gameFilterConfig.favoriteGames || [];
  // Find favorite games in order, skip if not found
  const favoriteGames = favoriteTitles
    .map((title: string) => games.find(g => g.title.toLowerCase() === title.toLowerCase()))
    .filter(Boolean) as Game[];
  // All other games, sorted by lastPlayed (descending), excluding favorites
  const favoriteIds = new Set(favoriteGames.map(g => g.id));
  const otherGames = games
    .filter(g => !favoriteIds.has(g.id))
    .sort((a, b) => {
      if (!a.lastPlayed && !b.lastPlayed) return 0;
      if (!a.lastPlayed) return 1;
      if (!b.lastPlayed) return -1;
      return new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime();
    });

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
        
        {/* Left Bubble - Simple Rectangle */}
        {xboxProfile?.displayPicRaw ? (
          <motion.div
            className="absolute top-20 left-8 z-20 hidden md:block pointer-events-none"
            animate={{
              x: [0, 80, 20, 60, 10, 0],
              y: [0, 60, 120, 40, 100, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))" }}
          >
            <img
              src={xboxProfile.displayPicRaw}
              alt={`${xboxProfile.gamertag} profile picture`}
              className="w-16 h-16 rounded-full object-cover border-2 border-[var(--highlight)] shadow-2xl"
            />
          </motion.div>
        ) : null}
        
        {/* Right Bubble - Simple Rectangle */}
        {xboxProfile?.displayPicRaw ? (
          <motion.div
            className="absolute top-24 right-8 z-20 hidden md:block pointer-events-none"
            animate={{
              x: [0, -60, -20, -80, -10, 0],
              y: [0, 80, 40, 110, 20, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            style={{ filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))" }}
          >
            <img
              src={xboxProfile.displayPicRaw}
              alt={`${xboxProfile.gamertag} profile picture`}
              className="w-14 h-14 rounded-full object-cover border-2 border-[var(--accent)] shadow-2xl"
            />
          </motion.div>
        ) : null}
        
        <div className="relative z-10 text-center w-full mx-auto px-4">
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
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-[var(--foreground)]"
          >


            {/* Left Achievement Ticker */}
            <div className="hidden lg:block w-[20rem] xl:w-[30rem] h-12 overflow-hidden bg-[var(--card)] border border-[var(--accent)]/20 rounded-lg">
              <div className="h-full flex items-center">
                <div className={`animate-[scroll-right_600s_linear_infinite] whitespace-nowrap text-xs ${getTickerTextColor()}`}>
                  {tickerContent}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--highlight)]">
                {isLoading ? '...' : (xboxProfile?.gamerscore.toLocaleString() || '127,500')}
              </div>
              <div className="text-sm md:text-base text-[var(--accent)] uppercase tracking-wide">Gamerscore</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[var(--accent)] opacity-30"></div>
            <div className="text-center min-w-0 flex-shrink-0">
              <div className="text-lg md:text-xl font-bold text-[var(--highlight)] whitespace-nowrap">
                {isLoading ? '...' : (xboxProfile?.gamertag || 'fishmug')}
              </div>
              <div className="text-sm md:text-base text-[var(--accent)] uppercase tracking-wide">Gamertag</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-[var(--accent)] opacity-30"></div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--highlight)]">
                {isLoading ? '...' : (xboxProfile?.achievementCount || '342')}
              </div>
              <div className="text-sm md:text-base text-[var(--accent)] uppercase tracking-wide">Achievements</div>
            </div>
            
            {/* Right Achievement Ticker */}
            <div className="hidden lg:block w-[20rem] xl:w-[30rem] h-12 overflow-hidden bg-[var(--card)] border border-[var(--accent)]/20 rounded-lg">
              <div className="h-full flex items-center">
                <div className={`animate-[scroll-right_600s_linear_infinite] whitespace-nowrap text-xs ${getTickerTextColor()}`}>
                  {tickerContent}
                </div>
              </div>
            </div>
          </motion.div>
          

        </div>
      </motion.section>

      {/* Favorites Section */}
      {favoriteGames.length > 0 && (
        <motion.section 
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 pt-8 pb-2"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--highlight)] mb-4">Favorites</h2>
          <div className="grid gap-2 md:gap-3 lg:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {favoriteGames.map((game, index) => (
              <motion.div
                key={game.id}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedGame(game)}
              >
                {/* Compact Cover Art Card */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-[1.05] hover:-translate-y-1 h-[340px] md:h-[340px] sm:h-[260px] flex flex-col">
                  {/* Cover Art */}
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-[var(--highlight)] to-[var(--accent)] w-full flex-shrink-0">
                    <img
                      src={game.coverArt}
                      alt={`${game.title} cover art`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `
                          <div class='w-full h-full flex items-center justify-center text-4xl text-[var(--background)] opacity-50'>
                            <span>🎮</span>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Overlay: Title, genre, etc. */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent h-[110px] flex flex-col justify-end overflow-hidden">
                    {/* Title - Always at bottom */}
                    <h3 className="text-white font-bold text-sm mb-1 transition-all duration-300 line-clamp-1 leading-tight group-hover:text-[var(--highlight)]">
                      {game.title}
                    </h3>
                    {/* Genre and Year - Always visible at bottom */}
                    <div className="flex items-center justify-between">
                      <p className="text-white/60 text-xs truncate line-clamp-1">{game.genre}</p>
                      {game.releaseDate && (
                        <p className="text-white/50 text-xs font-medium line-clamp-1">
                          {new Date(game.releaseDate).getFullYear()}
                        </p>
                      )}
                    </div>
                    {/* Developer name - subtle and small */}
                    {game.developer && game.developer !== 'Unknown' && (
                      <p className="text-white/40 text-xs mt-1 truncate line-clamp-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
                        by {game.developer}
                      </p>
                    )}
                    {/* Description - Absolutely positioned, slides up from below */}
                    {game.gameDescription && (
                      <div className="absolute bottom-full left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                        <p className="text-white/80 text-xs line-clamp-2 leading-relaxed">
                          {game.gameDescription}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Achievement Badge */}
                  {game.achievements && game.achievements > 0 && (
                    <div className="absolute top-2 right-2 bg-[var(--highlight)]/90 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-xs font-semibold">
                      {game.achievements}
                    </div>
                  )}

                  {/* Hover Rating */}
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                    <div className="flex items-center gap-1 text-white text-xs">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold">{game.rating || 'N/A'}</span>
                    </div>
                  </div>

                  {/* Subtle Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_10px_30px_rgba(183,191,163,0.3)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
      {/* All Games Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 py-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--highlight)] mb-4">All Games</h2>
        <div className="grid gap-2 md:gap-3 lg:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {otherGames.map((game, index) => (
            <motion.div
              key={game.id}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedGame(game)}
            >
              {/* Compact Cover Art Card */}
              <div className="relative overflow-hidden rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-[1.05] hover:-translate-y-1 h-[340px] md:h-[340px] sm:h-[260px] flex flex-col">
                {/* Cover Art */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-[var(--highlight)] to-[var(--accent)] w-full flex-shrink-0">
                  <img
                    src={game.coverArt}
                    alt={`${game.title} cover art`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `
                        <div class='w-full h-full flex items-center justify-center text-4xl text-[var(--background)] opacity-50'>
                          <span>🎮</span>
                        </div>
                      `;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Overlay: Title, genre, etc. */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent h-[110px] flex flex-col justify-end overflow-hidden">
                  {/* Title - Always at bottom */}
                  <h3 className="text-white font-bold text-sm mb-1 transition-all duration-300 line-clamp-1 leading-tight group-hover:text-[var(--highlight)]">
                    {game.title}
                  </h3>
                  {/* Genre and Year - Always visible at bottom */}
                  <div className="flex items-center justify-between">
                    <p className="text-white/60 text-xs truncate line-clamp-1">{game.genre}</p>
                    {game.releaseDate && (
                      <p className="text-white/50 text-xs font-medium line-clamp-1">
                        {new Date(game.releaseDate).getFullYear()}
                      </p>
                    )}
                  </div>
                  {/* Developer name - subtle and small */}
                  {game.developer && game.developer !== 'Unknown' && (
                    <p className="text-white/40 text-xs mt-1 truncate line-clamp-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      by {game.developer}
                    </p>
                  )}
                  {/* Description - Absolutely positioned, slides up from below */}
                  {game.gameDescription && (
                    <div className="absolute bottom-full left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                      <p className="text-white/80 text-xs line-clamp-2 leading-relaxed">
                        {game.gameDescription}
                      </p>
                    </div>
                  )}
                </div>

                {/* Achievement Badge */}
                {game.achievements && game.achievements > 0 && (
                  <div className="absolute top-2 right-2 bg-[var(--highlight)]/90 backdrop-blur-sm rounded-lg px-2 py-1 text-white text-xs font-semibold">
                    {game.achievements}
                  </div>
                )}

                {/* Hover Rating */}
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0">
                  <div className="flex items-center gap-1 text-white text-xs">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold">{game.rating || 'N/A'}</span>
                  </div>
                </div>

                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_10px_30px_rgba(183,191,163,0.3)]" />
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
            
            <div className="space-y-6">
              {/* Game Info Header */}
              <div className="border-b border-[var(--accent)]/20 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[var(--accent)] text-sm font-medium">{selectedGame.genre}</span>
                  <span className="text-[var(--accent)]/40">•</span>
                  <span className="text-[var(--accent)] text-sm">{selectedGame.platform}</span>
                  {selectedGame.releaseDate && (
                    <>
                      <span className="text-[var(--accent)]/40">•</span>
                      <span className="text-[var(--accent)] text-sm">
                        {new Date(selectedGame.releaseDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </>
                  )}
                </div>
                {selectedGame.developer && selectedGame.developer !== 'Unknown' && (
                  <p className="text-[var(--foreground)]/70 text-sm">
                    Developed by <span className="text-[var(--highlight)] font-medium">{selectedGame.developer}</span>
                  </p>
                )}
              </div>
              
              {/* Game Description */}
              {selectedGame.gameDescription && (
                <div className="bg-[var(--background)]/30 rounded-lg p-4 border border-[var(--accent)]/10">
                  <h3 className="text-[var(--foreground)] font-semibold mb-2">About</h3>
                  <p className="text-[var(--foreground)]/80 text-sm leading-relaxed">
                    {selectedGame.gameDescription}
                  </p>
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