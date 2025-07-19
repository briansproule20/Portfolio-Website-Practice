export interface EloEntity {
  id: string;
  name: string;
  category: 'animal' | 'dinosaur' | 'character';
  imageUrl: string;
  description?: string;
  eloScores: {
    fight: number;
    better: number;
    cute: number;
    ally: number;
  };
  totalMatches: {
    fight: number;
    better: number;
    cute: number;
    ally: number;
  };
  wins: {
    fight: number;
    better: number;
    cute: number;
    ally: number;
  };
  losses: {
    fight: number;
    better: number;
    cute: number;
    ally: number;
  };
}

export type EloDimension = 'fight' | 'better' | 'cute' | 'ally';

export interface EloMatch {
  id: string;
  entity1Id: string;
  entity2Id: string;
  dimension: EloDimension;
  winner: string; // entity1Id or entity2Id
  timestamp: Date;
  eloChange: number;
}

export interface EloLeaderboardEntry {
  entity: EloEntity;
  rank: number;
  score: number;
  wins: number;
  losses: number;
  winRate: number;
}

export interface SuperscoreEntry {
  entity: EloEntity;
  rank: number;
  superscore: number;
  averageScore: number;
  totalWins: number;
  totalLosses: number;
  overallWinRate: number;
}

export const ELO_DIMENSIONS = {
  fight: {
    name: 'Fight',
    description: 'Combat prowess and fighting ability',
    icon: '⚔️'
  },
  better: {
    name: 'Which is Better',
    description: 'Overall quality and superiority',
    icon: '🏆'
  },
  cute: {
    name: 'Cute',
    description: 'Adorableness and cuteness factor',
    icon: '🥰'
  },
  ally: {
    name: 'Ally',
    description: 'Reliability and partnership value',
    icon: '🤝🏼'
  }
} as const; 