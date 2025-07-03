// Fallback game metadata when API doesn't provide enhanced data
export const gameMetadata: Record<string, {
  developer?: string;
  description?: string;
  releaseYear?: string;
  genre?: string;
}> = {
  // Star Wars Games
  'STAR WARS Jedi: Survivor™': {
    developer: 'Respawn Entertainment',
    description: 'Continue Cal Kestis\'s journey in this epic action-adventure sequel.',
    releaseYear: '2023',
    genre: 'Action'
  },
  'STAR WARS™ Battlefront™ II': {
    developer: 'EA DICE',
    description: 'Immerse yourself in the ultimate Star Wars battle experience.',
    releaseYear: '2017',
    genre: 'Shooter'
  },
  'STAR WARS Jedi: Fallen Order™': {
    developer: 'Respawn Entertainment',
    description: 'Embark on an adventure as a young Padawan in this single-player story.',
    releaseYear: '2019',
    genre: 'Action'
  },
  
  // Elder Scrolls
  'Skyrim': {
    developer: 'Bethesda Game Studios',
    description: 'The legendary open-world fantasy RPG that redefined gaming.',
    releaseYear: '2011',
    genre: 'RPG'
  },
  'The Elder Scrolls IV: Oblivion': {
    developer: 'Bethesda Game Studios',
    description: 'Step into the world of Cyrodiil in this acclaimed fantasy RPG.',
    releaseYear: '2006',
    genre: 'RPG'
  },
  'Oblivion': {
    developer: 'Bethesda Game Studios',
    description: 'Step into the world of Cyrodiil in this acclaimed fantasy RPG.',
    releaseYear: '2006',
    genre: 'RPG'
  },
  
  // Call of Duty
  'Modern Warfare® 3': {
    developer: 'Infinity Ward',
    description: 'The epic conclusion to the Modern Warfare trilogy.',
    releaseYear: '2011',
    genre: 'Shooter'
  },
  'Modern Warfare® 2': {
    developer: 'Infinity Ward',
    description: 'Intense military action in this acclaimed sequel.',
    releaseYear: '2009',
    genre: 'Shooter'
  },
  'Call of Duty®: Black Ops': {
    developer: 'Treyarch',
    description: 'Experience the Cold War era in this thrilling campaign.',
    releaseYear: '2010',
    genre: 'Shooter'
  },
  'Call of Duty®: WWII': {
    developer: 'Sledgehammer Games',
    description: 'Return to the World War II setting that started it all.',
    releaseYear: '2017',
    genre: 'Shooter'
  },
  
  // Assassin's Creed
  'Assassin\'s Creed® Origins': {
    developer: 'Ubisoft Montreal',
    description: 'Discover the origins of the Assassin\'s Brotherhood in ancient Egypt.',
    releaseYear: '2017',
    genre: 'Action'
  },
  'Assassin\'s Creed IV Black Flag': {
    developer: 'Ubisoft Montreal',
    description: 'Sail the Caribbean seas as a pirate in the Golden Age.',
    releaseYear: '2013',
    genre: 'Action'
  },
  'Assassin\'s Creed® III': {
    developer: 'Ubisoft Montreal',
    description: 'Experience the American Revolution through the eyes of Connor.',
    releaseYear: '2012',
    genre: 'Action'
  },
  
  // Other Popular Games
  'Red Dead Redemption 2': {
    developer: 'Rockstar Games',
    description: 'Experience the decline of the outlaw era in this epic western.',
    releaseYear: '2018',
    genre: 'Action'
  },
  'GTA V': {
    developer: 'Rockstar North',
    description: 'The definitive crime adventure in Los Santos.',
    releaseYear: '2013',
    genre: 'Action'
  },
  'Minecraft': {
    developer: 'Mojang Studios',
    description: 'Build, explore, and survive in infinite procedurally-generated worlds.',
    releaseYear: '2011',
    genre: 'Sandbox'
  },
  'Fallout: New Vegas': {
    developer: 'Obsidian Entertainment',
    description: 'Navigate the post-nuclear wasteland of the Mojave Desert.',
    releaseYear: '2010',
    genre: 'RPG'
  },
  'Fallout 3': {
    developer: 'Bethesda Game Studios',
    description: 'Emerge from Vault 101 into the Capital Wasteland.',
    releaseYear: '2008',
    genre: 'RPG'
  },
  'Tom Clancy\'s Rainbow Six Siege': {
    developer: 'Ubisoft Montreal',
    description: 'The definitive tactical shooter that redefined competitive multiplayer. The destructible environments and operator system create endless strategic possibilities.',
    releaseYear: '2015',
    genre: 'Tactical Shooter'
  },
  'Borderlands 3': {
    developer: 'Gearbox Software',
    description: 'The ultimate looter-shooter returns with mayhem and billions of guns.',
    releaseYear: '2019',
    genre: 'Shooter'
  },
  'Portal 2': {
    developer: 'Valve',
    description: 'Solve mind-bending puzzles with the iconic portal gun.',
    releaseYear: '2011',
    genre: 'Puzzle'
  }
};

export function getGameMetadata(title: string) {
  // Try exact match first
  if (gameMetadata[title]) {
    return gameMetadata[title];
  }
  
  // Try partial matches for variations
  const titleLower = title.toLowerCase();
  for (const [key, metadata] of Object.entries(gameMetadata)) {
    if (titleLower.includes(key.toLowerCase()) || key.toLowerCase().includes(titleLower)) {
      return metadata;
    }
  }
  
  return null;
} 