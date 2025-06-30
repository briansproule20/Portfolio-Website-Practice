# Game Library System

A comprehensive library system for storing custom information about your favorite games, including personal ratings, comments, quotes, and playthrough notes.

## Overview

The Game Library system enhances your Xbox Live game collection with personal data that isn't available from the Xbox API. It allows you to:

- Add personal ratings and reviews
- Store favorite quotes from games
- Track completion status and dates
- Add playthrough notes and memorable moments
- Categorize games with custom tags
- Rate difficulty and replayability

## How It Works

The system integrates seamlessly with your existing Xbox Live data:

1. **Data Merging**: When Xbox Live data is fetched, the system automatically merges it with your library entries
2. **Enhanced Display**: Games with library data show additional information on cards and in detail modals
3. **Visual Indicators**: Library games are marked with special indicators (colored stars, completion badges, etc.)

## Library Data Structure

Each game in your library can store the following information:

```typescript
interface GameLibraryEntry {
  title: string;                    // Game title (required)
  rating?: number;                  // Personal rating (1-10)
  comment?: string;                 // Personal thoughts/review
  quote?: string;                   // Favorite quote from the game
  description?: string;             // Custom description or notes
  playthroughNotes?: string;        // Notes about playthrough experience
  favoriteMoment?: string;          // Memorable moment or achievement
  completed?: boolean;              // Whether the game was completed
  completionDate?: string;          // When the game was completed
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
  replayability?: 'Low' | 'Medium' | 'High';
  tags?: string[];                  // Custom tags for categorization
  lastUpdated?: string;             // When this entry was last modified
}
```

## Adding Games to Your Library

### Method 1: Manual Addition (Recommended)

1. Open `lib/game-library.ts`
2. Add a new entry to the `gameLibrary` object:

```typescript
'Game Title Here': {
  title: 'Game Title Here',
  rating: 9.5,
  comment: 'Your personal thoughts about the game...',
  quote: '"Your favorite quote from the game"',
  description: 'Your custom description...',
  playthroughNotes: 'Notes about your playthrough...',
  favoriteMoment: 'Your most memorable moment...',
  completed: true,
  completionDate: '2024-01-15',
  difficulty: 'Medium',
  replayability: 'High',
  tags: ['RPG', 'Open World', 'Fantasy'],
  lastUpdated: '2024-01-20'
},
```

### Method 2: Using the Utility Functions

You can use the utility functions in `lib/library-utils.ts` to help create entries:

```typescript
import { createGameTemplate, addGameToLibrary } from './lib/library-utils';

// Create a template for a new game
const template = createGameTemplate('Your Game Title');

// Fill in the details
template.rating = 8.5;
template.comment = 'Great game with amazing story!';
template.completed = true;
template.tags = ['Action', 'Adventure'];

// Add to library (this will log the formatted entry for you to copy)
addGameToLibrary(template);
```

## Visual Indicators

Games with library data are visually distinguished:

- **Rating Star**: Library ratings show with a colored star (★)
- **Completion Badge**: Completed games show "✓ Completed" on hover
- **Tags**: Primary tag is displayed on hover
- **Quote Display**: Favorite quotes appear on hover in a highlighted box
- **Enhanced Modal**: Detail modal shows comprehensive library information

## Library Management

### Available Utility Functions

```typescript
import { 
  getLibraryStats,
  searchLibrary,
  getGamesByCompletion,
  getGamesByRatingRange,
  exportLibraryData,
  formatLibraryEntry
} from './lib/library-utils';

// Get library statistics
const stats = getLibraryStats();
console.log(`Total games: ${stats.totalGames}`);
console.log(`Completed: ${stats.completedGames}`);
console.log(`Average rating: ${stats.averageRating}`);

// Search library
const results = searchLibrary('skyrim');

// Get completed games
const completed = getGamesByCompletion(true);

// Get highly rated games
const topGames = getGamesByRatingRange(8, 10);

// Export library data
const jsonData = exportLibraryData();

// Format an entry for display
const formatted = formatLibraryEntry(gameEntry);
```

### Library Statistics

The system tracks various statistics about your library:

- Total number of games
- Number of completed games
- Average rating across all rated games
- Top 5 highest-rated games
- Most common tags
- Recently updated entries

## Integration with Xbox Live Data

The library system automatically integrates with your Xbox Live data:

1. **Automatic Matching**: Games are matched by title (case-insensitive)
2. **Data Override**: Library data takes precedence over Xbox data where applicable
3. **Enhanced Display**: Library information is shown alongside Xbox data
4. **Seamless Experience**: No additional configuration needed

## Example Library Entry

Here's a complete example of a library entry:

```typescript
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
}
```

## Tips for Building Your Library

1. **Start with Favorites**: Begin by adding your all-time favorite games
2. **Be Consistent**: Use similar rating scales and tag systems
3. **Add Quotes**: Include memorable quotes that capture the game's essence
4. **Track Completion**: Note when you complete games and your thoughts
5. **Use Tags**: Create a consistent tagging system (e.g., genre, platform, mood)
6. **Regular Updates**: Update entries as you replay games or change opinions

## Future Enhancements

Potential future features could include:

- Web interface for adding/editing library entries
- Import/export functionality for backup and sharing
- Advanced filtering and sorting options
- Integration with external game databases
- Achievement tracking and notes
- Screenshot and media attachments
- Social sharing of reviews and ratings

## Troubleshooting

### Game Not Showing Library Data

1. **Check Title Matching**: Ensure the game title in your library exactly matches the Xbox Live title
2. **Case Sensitivity**: The system is case-insensitive, but check for exact word matches
3. **Refresh Data**: Clear your browser cache and refresh the page
4. **Check Console**: Look for any error messages in the browser console

### Library Data Not Updating

1. **File Location**: Ensure you're editing the correct `lib/game-library.ts` file
2. **Syntax Errors**: Check for any TypeScript syntax errors
3. **Restart Development Server**: Restart your Next.js development server
4. **Clear Cache**: Clear browser cache and reload the page

## Support

If you encounter any issues or have questions about the library system:

1. Check the browser console for error messages
2. Verify your library entry syntax
3. Ensure game titles match exactly
4. Restart your development server

The library system is designed to be simple and intuitive while providing rich functionality for managing your game collection. 