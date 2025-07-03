export interface GameFilterConfig {
  // Minimum achievements to show a game
  minAchievements?: number;
  // Maximum days since last played
  maxDaysSinceLastPlayed?: number;
  // Specific games to always hide (by title)
  hideGames?: string[];
  // Specific games to always show (by title) 
  alwaysShowGames?: string[];
  // Specific games to always hide (exact matches)
  alwaysHideGames?: string[];
  // Minimum gamerscore to show
  minGamerscore?: number;
  // Add favorites array for the favorites section
  favoriteGames?: string[];
}

// Easy to modify configuration
export const gameFilterConfig: GameFilterConfig = {
  minAchievements: 0, // Show ALL games regardless of achievements
  // maxDaysSinceLastPlayed: removed - no time-based filtering
  hideGames: [
    // Games to always hide (case-insensitive matching)
    "Zuma",
    "Motionsports™",
    "Isonzo",
    "Planet Zoo",
    "EA WRC",
    "The Hunter",
    "RedFall",
    "College Football 25",
    "EA Sports WRC", // Alternative name for EA WRC
    "EA SPORTS WRC", // All caps version
    "WRC", // Just in case it's shortened
    "theHunter", // Alternative name without space
    
    // Minecraft variants to hide (but keep Minecraft Dungeons)
    "Minecraft",
    "Minecraft Launcher",
    "Minecraft: Xbox 360 Edition",
    "Minecraft: Xbox One Edition",
    "Minecraft Bedrock",
    "Minecraft: Story Mode",
    "Minecraft: Story Mode - Episode 1: The Order of the Stone",
    "Minecraft Story Mode",
    "Minecraft Xbox 360",
    "Minecraft Xbox One",
    "Minecraft Bedrock Edition",
    
    // Additional games to hide
    "One Lonely Outpost",
    "Farming Simulator 22",
    "Space Engineers",
    "Frostpunk",
    
    // Call of Duty games to hide (keeping custom Zombies card in favorites)
    "Call of Duty",
    "Call of Duty®",
    "Call of Duty: Modern Warfare",
    "Call of Duty: Black Ops",
    "Call of Duty: WWII",
    "Call of Duty: Ghosts",
    "Call of Duty: Advanced Warfare",
    "Call of Duty 3",
    "Modern Warfare",
    "Modern Warfare®",
    "Modern Warfare 2",
    "Modern Warfare 3",
    "Black Ops",
    "Black Ops®",
    

  ],
  alwaysShowGames: [
    // Add any game titles you always want to show regardless of other filters
    "Plants vs. Zombies",
    "Minecraft Dungeons", // Keep this visible even if it contains "Minecraft"
  ],
  // Specific games to always hide (exact matches)
  alwaysHideGames: [
    // Hide the original Xbox 360 Oblivion specifically
    "Oblivion", // Original Xbox 360 version only
  ],
  minGamerscore: 0, // Minimum total gamerscore earned in the game
  // Add favorites array for the favorites section
  favoriteGames: [
    "The Elder Scrolls V: Skyrim Special Edition",
    "Starfield",
    "Fallout 4",
    "Tom Clancy's Rainbow Six Siege X",
    "Call of Duty: Zombies",
    "Red Dead Redemption 2",
    "The Witcher 3: Wild Hunt – Complete Edition",
    "The Elder Scrolls IV: Oblivion Remastered",
    "Indiana Jones and the Great Circle"
  ],
};

export function filterGames(games: any[], config: GameFilterConfig = gameFilterConfig): any[] {
  console.log(`🎮 Filtering ${games.length} games with config:`, {
    minAchievements: config.minAchievements,
    hideGamesCount: config.hideGames?.length || 0,
    alwaysShowCount: config.alwaysShowGames?.length || 0
  });

  const filteredGames = games.filter(game => {
    const title = game.title || '';
    const achievements = game.achievements || 0;
    const gamerscore = game.gamerscore || 0;
    const lastPlayed = game.lastPlayed;
    
    // Log each game being processed
    console.log(`🔍 Processing game: "${title}" (${achievements} achievements, ${gamerscore} gamerscore)`);
    
    // Always show games in the alwaysShow list (case-insensitive)
    if (config.alwaysShowGames?.some(allowedGame => 
      title.toLowerCase().includes(allowedGame.toLowerCase()) ||
      allowedGame.toLowerCase().includes(title.toLowerCase())
    )) {
      console.log(`✅ Always showing: "${title}"`);
      return true;
    }
    
    // Always hide games in the hide list (case-insensitive)
    const shouldHide = config.hideGames?.some(hiddenGame => 
      title.toLowerCase().includes(hiddenGame.toLowerCase()) ||
      hiddenGame.toLowerCase().includes(title.toLowerCase())
    );
    
    if (shouldHide) {
      console.log(`🚫 Hiding game: "${title}"`);
      return false;
    }
    
    // Always hide games in the alwaysHide list (exact matches)
    const shouldAlwaysHide = config.alwaysHideGames?.some(hiddenGame => 
      title === hiddenGame
    );
    
    if (shouldAlwaysHide) {
      console.log(`🚫 Always hiding game: "${title}"`);
      return false;
    }
    
    // Check minimum achievements
    if (config.minAchievements && achievements < config.minAchievements) {
      console.log(`❌ Filtered out "${title}" - insufficient achievements (${achievements} < ${config.minAchievements})`);
      return false;
    }
    
    // Check minimum gamerscore
    if (config.minGamerscore && gamerscore < config.minGamerscore) {
      console.log(`❌ Filtered out "${title}" - insufficient gamerscore (${gamerscore} < ${config.minGamerscore})`);
      return false;
    }
    
    // Check if played recently enough
    if (config.maxDaysSinceLastPlayed && lastPlayed) {
      const daysSinceLastPlayed = (Date.now() - new Date(lastPlayed).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceLastPlayed > config.maxDaysSinceLastPlayed) {
        console.log(`❌ Filtered out "${title}" - played too long ago (${Math.round(daysSinceLastPlayed)} days)`);
        return false;
      }
    }
    
    console.log(`✅ Keeping game: "${title}"`);
    return true;
  });

  console.log(`🎯 Filtered ${games.length} games down to ${filteredGames.length}`);
  return filteredGames;
} 