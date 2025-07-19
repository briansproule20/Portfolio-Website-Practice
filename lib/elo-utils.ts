import { EloEntity, EloDimension, EloLeaderboardEntry, SuperscoreEntry, EloMatch } from '@/types/elo';

const K_FACTOR = 32; // Standard K-factor for ELO calculations
const INITIAL_ELO = 1200; // Starting ELO score for new entities

export function calculateEloChange(winnerElo: number, loserElo: number): number {
  const expectedWinner = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
  const expectedLoser = 1 - expectedWinner;
  
  const winnerChange = Math.round(K_FACTOR * (1 - expectedWinner));
  const loserChange = Math.round(K_FACTOR * (0 - expectedLoser));
  
  return winnerChange; // Return the winner's change (loser gets negative)
}

export function processMatch(
  entity1: EloEntity,
  entity2: EloEntity,
  dimension: EloDimension,
  winner: 'entity1' | 'entity2'
): { entity1: EloEntity; entity2: EloEntity; eloChange: number } {
  const entity1Score = entity1.eloScores[dimension];
  const entity2Score = entity2.eloScores[dimension];
  
  const eloChange = calculateEloChange(
    winner === 'entity1' ? entity1Score : entity2Score,
    winner === 'entity1' ? entity2Score : entity1Score
  );
  
  const updatedEntity1 = {
    ...entity1,
    eloScores: {
      ...entity1.eloScores,
      [dimension]: entity1.eloScores[dimension] + (winner === 'entity1' ? eloChange : -eloChange)
    },
    totalMatches: {
      ...entity1.totalMatches,
      [dimension]: entity1.totalMatches[dimension] + 1
    },
    wins: {
      ...entity1.wins,
      [dimension]: entity1.wins[dimension] + (winner === 'entity1' ? 1 : 0)
    },
    losses: {
      ...entity1.losses,
      [dimension]: entity1.losses[dimension] + (winner === 'entity1' ? 0 : 1)
    }
  };
  
  const updatedEntity2 = {
    ...entity2,
    eloScores: {
      ...entity2.eloScores,
      [dimension]: entity2.eloScores[dimension] + (winner === 'entity2' ? eloChange : -eloChange)
    },
    totalMatches: {
      ...entity2.totalMatches,
      [dimension]: entity2.totalMatches[dimension] + 1
    },
    wins: {
      ...entity2.wins,
      [dimension]: entity2.wins[dimension] + (winner === 'entity2' ? 1 : 0)
    },
    losses: {
      ...entity2.losses,
      [dimension]: entity2.losses[dimension] + (winner === 'entity2' ? 0 : 1)
    }
  };
  
  return {
    entity1: updatedEntity1,
    entity2: updatedEntity2,
    eloChange
  };
}

export function generateLeaderboard(
  entities: EloEntity[],
  dimension: EloDimension
): EloLeaderboardEntry[] {
  return entities
    .map(entity => ({
      entity,
      rank: 0,
      score: entity.eloScores[dimension],
      wins: entity.wins[dimension],
      losses: entity.losses[dimension],
      winRate: entity.totalMatches[dimension] > 0 
        ? entity.wins[dimension] / entity.totalMatches[dimension] 
        : 0
    }))
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
}

export function generateSuperscoreLeaderboard(entities: EloEntity[]): SuperscoreEntry[] {
  return entities
    .map(entity => {
      const scores = [
        entity.eloScores.fight,
        entity.eloScores.better,
        entity.eloScores.cute,
        entity.eloScores.ally
      ];
      
      const totalWins = entity.wins.fight + entity.wins.better + entity.wins.cute + entity.wins.ally;
      const totalLosses = entity.losses.fight + entity.losses.better + entity.losses.cute + entity.losses.ally;
      const totalMatches = totalWins + totalLosses;
      
      // Calculate superscore: weighted average of all dimensions
      const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const superscore = Math.round(averageScore + (totalWins * 10) - (totalLosses * 5));
      
      return {
        entity,
        rank: 0,
        superscore,
        averageScore: Math.round(averageScore),
        totalWins,
        totalLosses,
        overallWinRate: totalMatches > 0 ? totalWins / totalMatches : 0
      };
    })
    .sort((a, b) => b.superscore - a.superscore)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
}

export function createNewEntity(
  id: string,
  name: string,
  category: 'animal' | 'dinosaur' | 'character',
  imageUrl: string,
  description?: string
): EloEntity {
  return {
    id,
    name,
    category,
    imageUrl,
    description,
    eloScores: {
      fight: INITIAL_ELO,
      better: INITIAL_ELO,
      cute: INITIAL_ELO,
      ally: INITIAL_ELO
    },
    totalMatches: {
      fight: 0,
      better: 0,
      cute: 0,
      ally: 0
    },
    wins: {
      fight: 0,
      better: 0,
      cute: 0,
      ally: 0
    },
    losses: {
      fight: 0,
      better: 0,
      cute: 0,
      ally: 0
    }
  };
}

export function getRandomPair(entities: EloEntity[]): [EloEntity, EloEntity] | null {
  if (entities.length < 2) return null;
  
  const shuffled = [...entities].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

export function getEntityStats(entity: EloEntity, dimension: EloDimension) {
  const score = entity.eloScores[dimension];
  const wins = entity.wins[dimension];
  const losses = entity.losses[dimension];
  const total = entity.totalMatches[dimension];
  const winRate = total > 0 ? (wins / total) * 100 : 0;
  
  return { score, wins, losses, total, winRate };
} 