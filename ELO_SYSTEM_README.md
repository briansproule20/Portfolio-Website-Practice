# ELO Ranking System

A comprehensive pairwise ELO ranking system for Animals, Dinosaurs, and Characters with four distinct dimensions and a superscore leaderboard.

## Features

### Four Ranking Dimensions

1. **⚔️ Who Would Win in a Fight** - Combat prowess and fighting ability
2. **🏆 Which is Better** - Overall quality and superiority  
3. **🥰 Which is Cuter** - Adorableness and cuteness factor
4. **🤝 Who Would You Choose as an Ally** - Reliability and partnership value

### Categories

- **Animals**: Lion, Elephant, Tiger, Puppy, Dolphin, Eagle
- **Dinosaurs**: T-Rex, Velociraptor, Triceratops, Brachiosaurus, Stegosaurus, Pterodactyl
- **Characters**: Superman, Batman, Spider-Man, Wonder Woman, Iron Man, Captain America

### Leaderboards

- **Individual Dimension Leaderboards**: Separate rankings for each of the four dimensions
- **Superscore Leaderboard**: Overall ranking combining all dimensions with weighted scoring

## How It Works

### ELO Algorithm
- Uses standard ELO rating system with K-factor of 32
- Initial ELO score: 1200
- Scores adjust based on expected vs actual outcomes
- Win/loss records and win rates are tracked

### Superscore Calculation
- Average of all four dimension scores
- Bonus points for total wins
- Penalty points for total losses
- Formula: `Average Score + (Total Wins × 10) - (Total Losses × 5)`

### Pairwise Voting
- Random entity pairs are presented for voting
- Users choose the winner in the selected dimension
- ELO scores update immediately after each vote
- New random matchup is generated after each vote

## File Structure

```
app/elo/
├── page.tsx                    # Main ELO page
├── components/
│   ├── EloMatchup.tsx         # Voting interface
│   ├── EloLeaderboard.tsx     # Individual dimension rankings
│   └── EloSuperscoreLeaderboard.tsx # Overall rankings
data/
└── elo-entities.ts            # Entity definitions
lib/
└── elo-utils.ts              # ELO calculations and utilities
types/
└── elo.ts                    # TypeScript type definitions
public/images/elo/            # Entity images directory
```

## Adding New Entities

1. **Add to data file**: Update `data/elo-entities.ts` with new entity
2. **Add image**: Place entity image in `public/images/elo/`
3. **Update image path**: Ensure imageUrl points to correct file

Example:
```typescript
createNewEntity('new-entity', 'New Entity', 'animal', '/images/elo/new-entity.jpg', 'Description')
```

## Customization

### Adding New Dimensions
1. Update `EloDimension` type in `types/elo.ts`
2. Add dimension config to `ELO_DIMENSIONS`
3. Update entity interfaces to include new dimension
4. Modify ELO calculation functions

### Changing ELO Parameters
- **K-factor**: Modify `K_FACTOR` in `lib/elo-utils.ts`
- **Initial score**: Modify `INITIAL_ELO` in `lib/elo-utils.ts`
- **Superscore formula**: Update `generateSuperscoreLeaderboard` function

## Usage

1. Navigate to the ELO page
2. Select a ranking dimension
3. Vote on the presented entity pair
4. View updated leaderboards
5. Switch between dimensions to see different rankings
6. Check the superscore leaderboard for overall rankings

## Technical Details

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom theme
- **State Management**: React useState/useEffect
- **Images**: Next.js Image component with optimization
- **Responsive**: Mobile-first design with responsive grid layouts

## Future Enhancements

- [ ] Persistent data storage (database/localStorage)
- [ ] User accounts and personal rankings
- [ ] Tournament mode
- [ ] Historical match data
- [ ] Advanced statistics and analytics
- [ ] Export/import functionality
- [ ] API endpoints for external integration 