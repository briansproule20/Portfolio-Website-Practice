// Library Management Utilities
import { GameLibraryEntry, gameLibrary } from './game-library';

// Function to add a new game to the library
export function addGameToLibrary(entry: GameLibraryEntry): void {
  // Validate the entry
  if (!entry.title || entry.title.trim() === '') {
    throw new Error('Game title is required');
  }
  
  if (entry.rating && (entry.rating < 1 || entry.rating > 10)) {
    throw new Error('Rating must be between 1 and 10');
  }
  
  // Add timestamp
  entry.lastUpdated = new Date().toISOString();
  
  // Add to library (this would need to be persisted in a real app)
  console.log(`📚 Adding "${entry.title}" to library:`, entry);
  
  // In a real application, you'd save this to a database or file
  // For now, we'll just log it and you can manually add it to game-library.ts
  console.log('💡 To add this game to your library, copy the following to lib/game-library.ts:');
  console.log('');
  console.log(`'${entry.title}': {`);
  console.log(`  title: '${entry.title}',`);
  if (entry.rating) console.log(`  rating: ${entry.rating},`);
  if (entry.comment) console.log(`  comment: '${entry.comment}',`);
  if (entry.quote) console.log(`  quote: '${entry.quote}',`);
  if (entry.description) console.log(`  description: '${entry.description}',`);
  if (entry.playthroughNotes) console.log(`  playthroughNotes: '${entry.playthroughNotes}',`);
  if (entry.favoriteMoment) console.log(`  favoriteMoment: '${entry.favoriteMoment}',`);
  if (entry.completed !== undefined) console.log(`  completed: ${entry.completed},`);
  if (entry.completionDate) console.log(`  completionDate: '${entry.completionDate}',`);
  if (entry.difficulty) console.log(`  difficulty: '${entry.difficulty}',`);
  if (entry.replayability) console.log(`  replayability: '${entry.replayability}',`);
  if (entry.tags && entry.tags.length > 0) {
    console.log(`  tags: [${entry.tags.map(tag => `'${tag}'`).join(', ')}],`);
  }
  console.log(`  lastUpdated: '${entry.lastUpdated}'`);
  console.log('},');
  console.log('');
}

// Function to create a template entry for a game
export function createGameTemplate(title: string): GameLibraryEntry {
  return {
    title,
    rating: undefined,
    comment: undefined,
    quote: undefined,
    description: undefined,
    playthroughNotes: undefined,
    favoriteMoment: undefined,
    completed: undefined,
    completionDate: undefined,
    difficulty: undefined,
    replayability: undefined,
    tags: [],
    lastUpdated: new Date().toISOString()
  };
}

// Function to validate a library entry
export function validateLibraryEntry(entry: GameLibraryEntry): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!entry.title || entry.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (entry.rating !== undefined && (entry.rating < 1 || entry.rating > 10)) {
    errors.push('Rating must be between 1 and 10');
  }
  
  if (entry.difficulty && !['Easy', 'Medium', 'Hard', 'Very Hard'].includes(entry.difficulty)) {
    errors.push('Difficulty must be Easy, Medium, Hard, or Very Hard');
  }
  
  if (entry.replayability && !['Low', 'Medium', 'High'].includes(entry.replayability)) {
    errors.push('Replayability must be Low, Medium, or High');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Function to get library statistics
export function getLibraryStats() {
  const games = Object.values(gameLibrary);
  
  return {
    totalGames: games.length,
    completedGames: games.filter(g => g.completed).length,
    averageRating: games.filter(g => g.rating).reduce((sum, g) => sum + g.rating!, 0) / games.filter(g => g.rating).length,
    topRatedGames: games
      .filter(g => g.rating)
      .sort((a, b) => b.rating! - a.rating!)
      .slice(0, 5)
      .map(g => ({ title: g.title, rating: g.rating })),
    mostCommonTags: games
      .flatMap(g => g.tags || [])
      .reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    recentUpdates: games
      .filter(g => g.lastUpdated)
      .sort((a, b) => new Date(b.lastUpdated!).getTime() - new Date(a.lastUpdated!).getTime())
      .slice(0, 5)
      .map(g => ({ title: g.title, lastUpdated: g.lastUpdated }))
  };
}

// Function to search library entries
export function searchLibrary(query: string): GameLibraryEntry[] {
  const queryLower = query.toLowerCase();
  
  return Object.values(gameLibrary).filter(game => {
    return (
      game.title.toLowerCase().includes(queryLower) ||
      game.comment?.toLowerCase().includes(queryLower) ||
      game.quote?.toLowerCase().includes(queryLower) ||
      game.description?.toLowerCase().includes(queryLower) ||
      game.playthroughNotes?.toLowerCase().includes(queryLower) ||
      game.favoriteMoment?.toLowerCase().includes(queryLower) ||
      game.tags?.some(tag => tag.toLowerCase().includes(queryLower))
    );
  });
}

// Function to get games by completion status
export function getGamesByCompletion(completed: boolean): GameLibraryEntry[] {
  return Object.values(gameLibrary).filter(game => game.completed === completed);
}

// Function to get games by rating range
export function getGamesByRatingRange(min: number, max: number): GameLibraryEntry[] {
  return Object.values(gameLibrary).filter(game => 
    game.rating && game.rating >= min && game.rating <= max
  );
}

// Function to export library data (useful for backups)
export function exportLibraryData(): string {
  return JSON.stringify(gameLibrary, null, 2);
}

// Function to get library entry as formatted text
export function formatLibraryEntry(entry: GameLibraryEntry): string {
  let formatted = `📚 ${entry.title}\n`;
  formatted += '='.repeat(entry.title.length + 4) + '\n\n';
  
  if (entry.rating) {
    formatted += `⭐ Rating: ${entry.rating}/10\n`;
  }
  
  if (entry.completed !== undefined) {
    formatted += `📋 Status: ${entry.completed ? 'Completed' : 'In Progress'}\n`;
    if (entry.completionDate) {
      formatted += `📅 Completed: ${new Date(entry.completionDate).toLocaleDateString()}\n`;
    }
  }
  
  if (entry.difficulty) {
    formatted += `🎯 Difficulty: ${entry.difficulty}\n`;
  }
  
  if (entry.replayability) {
    formatted += `🔄 Replayability: ${entry.replayability}\n`;
  }
  
  if (entry.tags && entry.tags.length > 0) {
    formatted += `🏷️  Tags: ${entry.tags.join(', ')}\n`;
  }
  
  if (entry.quote) {
    formatted += `\n💬 Favorite Quote:\n"${entry.quote}"\n`;
  }
  
  if (entry.comment) {
    formatted += `\n💭 My Thoughts:\n${entry.comment}\n`;
  }
  
  if (entry.description) {
    formatted += `\n📖 Description:\n${entry.description}\n`;
  }
  
  if (entry.playthroughNotes) {
    formatted += `\n📝 Playthrough Notes:\n${entry.playthroughNotes}\n`;
  }
  
  if (entry.favoriteMoment) {
    formatted += `\n⭐ Favorite Moment:\n${entry.favoriteMoment}\n`;
  }
  
  if (entry.lastUpdated) {
    formatted += `\n🕒 Last Updated: ${new Date(entry.lastUpdated).toLocaleDateString()}\n`;
  }
  
  return formatted;
} 