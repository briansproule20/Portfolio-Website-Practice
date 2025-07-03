// Game Library - Custom data for favorited games
export interface GameLibraryEntry {
  title: string; // Game title (case-insensitive matching)
  rating?: number; // Personal rating (1-10)
  comment?: string; // Personal thoughts/review
  quote?: string; // Favorite quote from the game
  description?: string; // Custom description or notes
  playthroughNotes?: string; // Notes about playthrough experience
  favoriteMoment?: string; // Memorable moment or achievement
  playtime?: number; // Hours played (if different from Xbox data)
  completed?: boolean; // Whether the game was completed
  completionDate?: string; // When the game was completed
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Very Hard'; // Personal difficulty rating
  replayability?: 'Low' | 'Medium' | 'High'; // How likely to replay
  tags?: string[]; // Custom tags for categorization
  lastUpdated?: string; // When this entry was last modified
  coverArt?: string; // Cover art URL
}

// Game Library Database
export const gameLibrary: Record<string, GameLibraryEntry> = {
  // The Elder Scrolls V: Skyrim Special Edition
  'The Elder Scrolls V: Skyrim Special Edition': {
    title: 'The Elder Scrolls V: Skyrim Special Edition',
    rating: 9.5,
    comment: 'A timeless masterpiece that continues to captivate with its vast world and endless possibilities. Every playthrough feels different, and the modding community keeps it fresh.',
    quote: '"Fus Ro Dah!" - The iconic shout that launched a thousand memes and defined a generation of gaming.',
    description: 'The definitive fantasy RPG experience. From the moment you step out of Helgen, the world feels alive and full of stories waiting to be discovered.',
    playthroughNotes: 'Completed main quest, Dragonborn DLC, and most side quests. Still discovering new locations after hundreds of hours.',
    favoriteMoment: 'First time seeing a dragon in the wild and realizing the scale of the world. The moment at High Hrothgar when the Greybeards call you Dragonborn.',
    completed: true,
    completionDate: '2023-12-15',
    difficulty: 'Medium',
    replayability: 'High',
    tags: ['RPG', 'Open World', 'Fantasy', 'Moddable', 'Classic'],
    lastUpdated: '2024-01-20'
  },

  // Starfield
  'Starfield': {
    title: 'Starfield',
    rating: 8.2,
    comment: 'An expansive space exploration RPG with incredible depth. The ship building mechanics are addictive, and the main story keeps you engaged for hours.',
    quote: '"The stars are calling, and we must answer." - A perfect encapsulation of the game\'s exploration theme.',
    description: 'Bethesda\'s first new universe in 25 years delivers on the promise of space exploration with deep RPG mechanics and a compelling narrative.',
    playthroughNotes: 'Completed main story and several faction quests. Ship building became an obsession - spent more time designing ships than playing missions.',
    favoriteMoment: 'First time landing on a new planet and stepping out to see an alien landscape. The moment when you realize the scale of the universe.',
    completed: false,
    difficulty: 'Medium',
    replayability: 'High',
    tags: ['RPG', 'Space', 'Exploration', 'Ship Building', 'Sci-Fi'],
    lastUpdated: '2024-01-15'
  },

  // Fallout 4
  'Fallout 4': {
    title: 'Fallout 4',
    rating: 8.8,
    comment: 'A fantastic post-apocalyptic RPG that balances story, exploration, and base building perfectly. The Commonwealth feels alive with danger and opportunity.',
    quote: '"War. War never changes." - The iconic opening that sets the tone for the entire series.',
    description: 'Step into the shoes of the Sole Survivor and navigate the harsh wasteland of post-nuclear Boston. Build settlements, fight mutants, and uncover the truth about your past.',
    playthroughNotes: 'Completed main story and all DLC. Settlement building became a major focus - created a network of thriving communities across the Commonwealth.',
    favoriteMoment: 'First time discovering Diamond City and realizing the scale of civilization in the wasteland. The moment when you first meet Nick Valentine.',
    completed: true,
    completionDate: '2023-11-20',
    difficulty: 'Medium',
    replayability: 'High',
    tags: ['RPG', 'Post-Apocalyptic', 'Base Building', 'Open World', 'Sci-Fi'],
    lastUpdated: '2024-01-10'
  },

  // The Witcher 3: Wild Hunt
  'The Witcher 3: Wild Hunt': {
    title: 'The Witcher 3: Wild Hunt',
    rating: 9.7,
    comment: 'The gold standard for RPGs. Incredible world-building, memorable characters, and side quests that rival the main story. A true masterpiece.',
    quote: '"Evil is evil. Lesser, greater, middling... makes no difference. The degree is arbitrary, the definitions blurred." - Geralt\'s philosophy on morality.',
    description: 'As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy.',
    playthroughNotes: 'Completed main story, Hearts of Stone, and Blood and Wine DLCs. Every side quest felt meaningful and well-crafted.',
    favoriteMoment: 'The entire Blood and Wine DLC - Toussaint is breathtaking. The moment when you first see the fairy tale world come to life.',
    completed: true,
    completionDate: '2023-10-15',
    difficulty: 'Medium',
    replayability: 'High',
    tags: ['RPG', 'Fantasy', 'Open World', 'Story-Driven', 'Masterpiece'],
    lastUpdated: '2024-01-05'
  },

  // Red Dead Redemption 2
  'Red Dead Redemption 2': {
    title: 'Red Dead Redemption 2',
    rating: 9.3,
    comment: 'A cinematic masterpiece that redefines what\'s possible in open-world gaming. The attention to detail is staggering, and the story is unforgettable.',
    quote: '"We\'re more ghosts than people." - Arthur Morgan\'s reflection on the changing times.',
    description: 'Experience the decline of the outlaw era in this epic western. Live the life of Arthur Morgan as he struggles to survive in a world that\'s changing around him.',
    playthroughNotes: 'Completed main story and most side activities. The world feels so alive - spent hours just hunting, fishing, and exploring.',
    favoriteMoment: 'The entire epilogue - seeing John build his new life. The moment when you first ride into Valentine and realize the scale of the world.',
    completed: true,
    completionDate: '2023-09-30',
    difficulty: 'Medium',
    replayability: 'Medium',
    tags: ['Western', 'Open World', 'Story-Driven', 'Cinematic', 'Masterpiece'],
    lastUpdated: '2024-01-01'
  },

  // Cyberpunk 2077
  'Cyberpunk 2077': {
    title: 'Cyberpunk 2077',
    rating: 8.5,
    comment: 'A flawed but ambitious game that finally delivers on its promise. The story is compelling, the world is immersive, and the characters are memorable.',
    quote: '"Wake up, Samurai. We have a city to burn." - Johnny Silverhand\'s iconic line.',
    description: 'In Night City, a megalopolis obsessed with power, glamour, and body modification, you play as V, a mercenary outlaw going after a one-of-a-kind implant.',
    playthroughNotes: 'Completed main story and several side quests. The world-building is incredible, even if the launch was rocky.',
    favoriteMoment: 'The entire Johnny Silverhand storyline. The moment when you realize the depth of the conspiracy.',
    completed: false,
    difficulty: 'Medium',
    replayability: 'High',
    tags: ['RPG', 'Cyberpunk', 'Open World', 'Sci-Fi', 'Story-Driven'],
    lastUpdated: '2023-12-20'
  },

  // Mass Effect Legendary Edition
  'Mass Effect Legendary Edition': {
    title: 'Mass Effect Legendary Edition',
    rating: 9.4,
    comment: 'The definitive way to experience one of gaming\'s greatest trilogies. The remaster brings new life to these classic games.',
    quote: '"I\'m Commander Shepard, and this is my favorite store on the Citadel." - The iconic line that became a meme.',
    description: 'Experience the epic space opera trilogy that defined a generation. Command the Normandy and save the galaxy from the Reapers.',
    playthroughNotes: 'Completed all three games with the same character. The continuity and choices that carry over are incredible.',
    favoriteMoment: 'The entire Suicide Mission in Mass Effect 2. The moment when you realize every choice matters.',
    completed: true,
    completionDate: '2023-08-15',
    difficulty: 'Medium',
    replayability: 'High',
    tags: ['RPG', 'Sci-Fi', 'Story-Driven', 'Space Opera', 'Classic'],
    lastUpdated: '2023-12-15'
  },

  // Assassin's Creed Valhalla
  'Assassin\'s Creed Valhalla': {
    title: 'Assassin\'s Creed Valhalla',
    rating: 8.0,
    comment: 'A massive Viking adventure that captures the brutality and beauty of the era. The combat is satisfying, and the world is stunning.',
    quote: '"I am Eivor Wolf-Kissed, and I will carve my own path." - Eivor\'s declaration of independence.',
    description: 'Lead your clan from the harsh shores of Norway to a new home in the fertile lands of England. Raid, build, and fight for glory.',
    playthroughNotes: 'Completed main story and several DLCs. The settlement building and raiding mechanics are incredibly fun.',
    favoriteMoment: 'First time raiding a monastery - the chaos and brutality felt authentic to the Viking era.',
    completed: false,
    difficulty: 'Medium',
    replayability: 'Medium',
    tags: ['Action', 'Viking', 'Open World', 'Historical', 'RPG'],
    lastUpdated: '2023-11-30'
  },

  // Call of Duty: Zombies (Custom Card)
  'Call of Duty: Zombies': {
    title: 'Call of Duty: Zombies',
    rating: 9.1,
    comment: 'The ultimate cooperative survival experience. From the simple beginnings in Nacht der Untoten to the complex storylines of later maps, Zombies has defined a generation of gaming.',
    quote: '"I am that duck!" - The absurd humor that makes Zombies so memorable.',
    description: 'A cooperative survival mode that has evolved from a simple bonus mode to one of gaming\'s most beloved experiences. Fight endless waves of zombies while uncovering deep lore and Easter eggs.',
    playthroughNotes: 'Played across multiple Call of Duty titles. From World at War to Black Ops Cold War, each iteration brings new mechanics and storylines. The Easter egg hunts are some of the most rewarding gaming experiences.',
    favoriteMoment: 'Completing the Moon Easter egg for the first time - the moment when you realize the scope of the story and the connection to all previous maps.',
    completed: false,
    difficulty: 'Hard',
    replayability: 'High',
    tags: ['Zombies', 'Cooperative', 'Survival', 'Easter Eggs', 'Multiplayer'],
    lastUpdated: '2024-01-25',
    coverArt: '/images/zombies-blackops.jpg'
  },

  // Tom Clancy's Rainbow Six Siege X
  'Tom Clancy\'s Rainbow Six Siege X': {
    title: 'Tom Clancy\'s Rainbow Six Siege X',
    rating: 8.7,
    comment: 'The definitive tactical shooter that redefined competitive multiplayer. The destructible environments and operator system create endless strategic possibilities.',
    quote: '"Time to breach and clear!" - The iconic call that signals the start of intense tactical operations.',
    description: 'A tactical first-person shooter where players take on the role of either attackers or defenders in intense close-quarters combat scenarios.',
    playthroughNotes: 'Played extensively across multiple seasons. The learning curve is steep but incredibly rewarding. Each operator brings unique abilities that change the meta.',
    favoriteMoment: 'First successful 1v5 clutch as a defender - the adrenaline rush of outsmarting the entire attacking team.',
    completed: false,
    difficulty: 'Hard',
    replayability: 'High',
    tags: ['Tactical Shooter', 'Multiplayer', 'Competitive', 'Strategy', 'FPS'],
    lastUpdated: '2024-01-25'
  }
};

// Helper functions for the game library
export function getGameLibraryEntry(title: string): GameLibraryEntry | null {
  // Try exact match first
  if (gameLibrary[title]) {
    return gameLibrary[title];
  }
  
  // Try case-insensitive matching
  const titleLower = title.toLowerCase();
  for (const [key, entry] of Object.entries(gameLibrary)) {
    if (key.toLowerCase() === titleLower) {
      return entry;
    }
  }
  
  // Try partial matching for variations
  for (const [key, entry] of Object.entries(gameLibrary)) {
    if (titleLower.includes(key.toLowerCase()) || key.toLowerCase().includes(titleLower)) {
      return entry;
    }
  }
  
  return null;
}

export function isGameInLibrary(title: string): boolean {
  return getGameLibraryEntry(title) !== null;
}

export function getFavoriteGames(): GameLibraryEntry[] {
  return Object.values(gameLibrary).sort((a, b) => {
    // Sort by rating (highest first), then by title
    if (a.rating && b.rating) {
      return b.rating - a.rating;
    }
    if (a.rating) return -1;
    if (b.rating) return 1;
    return a.title.localeCompare(b.title);
  });
}

export function getGamesByTag(tag: string): GameLibraryEntry[] {
  return Object.values(gameLibrary).filter(game => 
    game.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getCompletedGames(): GameLibraryEntry[] {
  return Object.values(gameLibrary).filter(game => game.completed);
}

export function getGamesByRating(minRating: number): GameLibraryEntry[] {
  return Object.values(gameLibrary).filter(game => 
    game.rating && game.rating >= minRating
  );
}

// Function to merge library data with Xbox game data
export function enrichGameWithLibraryData(xboxGame: any): any {
  const libraryEntry = getGameLibraryEntry(xboxGame.title);
  
  if (libraryEntry) {
    return {
      ...xboxGame,
      // Override Xbox data with library data if available
      rating: libraryEntry.rating || xboxGame.rating,
      gameDescription: libraryEntry.description || xboxGame.gameDescription,
      // Add library-specific fields
      personalComment: libraryEntry.comment,
      favoriteQuote: libraryEntry.quote,
      playthroughNotes: libraryEntry.playthroughNotes,
      favoriteMoment: libraryEntry.favoriteMoment,
      completed: libraryEntry.completed,
      completionDate: libraryEntry.completionDate,
      difficulty: libraryEntry.difficulty,
      replayability: libraryEntry.replayability,
      tags: libraryEntry.tags,
      lastUpdated: libraryEntry.lastUpdated,
      // Flag that this game has library data
      hasLibraryData: true
    };
  }
  
  return xboxGame;
} 