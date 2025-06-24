export interface PersistentTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  image_url?: string;
  duration_ms: number;
  addedBy?: string; // User who added this track to the playlist
  // Persistent stats
  eloRating: number;
  totalWins: number;
  totalLosses: number;
  totalComparisons: number;
  lastUpdated: string;
  rankingHistory: Array<{
    date: string;
    rating: number;
    rank: number;
  }>;
}

export interface PlaylistRankings {
  playlistId: string;
  playlistName: string;
  lastUpdated: string;
  totalVotes: number;
  tracks: PersistentTrack[];
}

export interface VoteRecord {
  id: string;
  winnerId: string;
  loserId: string;
  timestamp: string;
  winnerRatingBefore: number;
  loserRatingBefore: number;
  winnerRatingAfter: number;
  loserRatingAfter: number;
}

// Get track statistics (client-safe function)
export function getTrackStats(track: PersistentTrack) {
  const winRate = track.totalComparisons > 0 ? (track.totalWins / track.totalComparisons) * 100 : 0;
  const trend = track.rankingHistory.length > 1 
    ? track.rankingHistory[track.rankingHistory.length - 1].rating - track.rankingHistory[track.rankingHistory.length - 2].rating
    : 0;
  
  return {
    winRate: Math.round(winRate),
    trend,
    isHot: trend > 0,
    isCold: trend < 0,
    comparisons: track.totalComparisons
  };
} 