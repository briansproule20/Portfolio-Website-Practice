export interface GameFilterConfig {
  // Minimum achievements to show a game
  minAchievements?: number;
  // Maximum days since last played
  maxDaysSinceLastPlayed?: number;
  // Specific games to always hide (by title)
  hideGames?: string[];
  // Specific games to always show (by title) 
  alwaysShowGames?: string[];
  // Minimum gamerscore to show
  minGamerscore?: number;
}

// Easy to modify configuration
export const gameFilterConfig: GameFilterConfig = {
  minAchievements: 1, // Only show games with at least 1 achievement
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
  ],
  alwaysShowGames: [
    // Add any game titles you always want to show regardless of other filters
    "Plants vs. Zombies",
  ],
  minGamerscore: 0, // Minimum total gamerscore earned in the game
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