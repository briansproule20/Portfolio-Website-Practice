import fs from 'fs';
import path from 'path';
import { PersistentTrack, PlaylistRankings } from '@/types/rankings';

const RANKINGS_FILE = path.join(process.cwd(), 'data', 'playlist-rankings.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load existing rankings from file
export function loadRankings(): PlaylistRankings | null {
  try {
    ensureDataDirectory();
    if (!fs.existsSync(RANKINGS_FILE)) {
      return null;
    }
    const data = fs.readFileSync(RANKINGS_FILE, 'utf8');
    const rankings = JSON.parse(data);
    
    return rankings;
  } catch (error) {
    console.error('Error loading rankings:', error);
    return null;
  }
}

// Save rankings to file
export function saveRankings(rankings: PlaylistRankings): void {
  try {
    ensureDataDirectory();
    fs.writeFileSync(RANKINGS_FILE, JSON.stringify(rankings, null, 2));
  } catch (error) {
    console.error('Error saving rankings:', error);
  }
}

// Initialize rankings from Spotify data
export function initializeRankings(playlistData: any): PlaylistRankings {
  const tracks: PersistentTrack[] = playlistData.tracks.map((track: any) => ({
    id: track.id,
    name: track.name,
    artist: track.artist,
    album: track.album,
    preview_url: track.preview_url,
    external_urls: track.external_urls,
    image_url: track.image_url,
    duration_ms: track.duration_ms,
    addedBy: track.addedBy,
    eloRating: 1500,
    totalWins: 0,
    totalLosses: 0,
    totalComparisons: 0,
    lastUpdated: new Date().toISOString(),
    rankingHistory: [{
      date: new Date().toISOString(),
      rating: 1500,
      rank: 0 // Will be calculated
    }]
  }));

  return {
    playlistId: playlistData.id,
    playlistName: playlistData.name,
    lastUpdated: new Date().toISOString(),
    totalVotes: 0,
    tracks
  };
}

// Update rankings after a vote
export function updateRankings(
  rankings: PlaylistRankings,
  winnerId: string,
  loserId: string
): PlaylistRankings {
  const winnerTrack = rankings.tracks.find(t => t.id === winnerId);
  const loserTrack = rankings.tracks.find(t => t.id === loserId);

  if (!winnerTrack || !loserTrack) {
    return rankings;
  }

  // Calculate new Elo ratings
  const kFactor = 32;
  const expectedWinner = 1 / (1 + Math.pow(10, (loserTrack.eloRating - winnerTrack.eloRating) / 400));
  const expectedLoser = 1 / (1 + Math.pow(10, (winnerTrack.eloRating - loserTrack.eloRating) / 400));
  
  const newWinnerRating = Math.round(winnerTrack.eloRating + kFactor * (1 - expectedWinner));
  const newLoserRating = Math.round(loserTrack.eloRating + kFactor * (0 - expectedLoser));

  // Update tracks
  const updatedTracks = rankings.tracks.map(track => {
    if (track.id === winnerId) {
      return {
        ...track,
        eloRating: newWinnerRating,
        totalWins: track.totalWins + 1,
        totalComparisons: track.totalComparisons + 1,
        lastUpdated: new Date().toISOString()
      };
    } else if (track.id === loserId) {
      return {
        ...track,
        eloRating: newLoserRating,
        totalLosses: track.totalLosses + 1,
        totalComparisons: track.totalComparisons + 1,
        lastUpdated: new Date().toISOString()
      };
    }
    return track;
  });

  // Sort by rating to get new ranks
  const sortedTracks = [...updatedTracks].sort((a, b) => b.eloRating - a.eloRating);
  
  // Update ranking history for tracks that changed significantly
  const tracksWithHistory = sortedTracks.map((track, index) => {
    const currentRank = index + 1;
    const lastHistoryEntry = track.rankingHistory[track.rankingHistory.length - 1];
    
    // Add to history if rank changed by 2+ positions or rating changed by 50+ points
    if (
      Math.abs(lastHistoryEntry.rank - currentRank) >= 2 ||
      Math.abs(lastHistoryEntry.rating - track.eloRating) >= 50
    ) {
      return {
        ...track,
        rankingHistory: [
          ...track.rankingHistory,
          {
            date: new Date().toISOString(),
            rating: track.eloRating,
            rank: currentRank
          }
        ]
      };
    }
    return track;
  });

  return {
    ...rankings,
    tracks: tracksWithHistory,
    totalVotes: rankings.totalVotes + 1,
    lastUpdated: new Date().toISOString()
  };
}

// Get ranked tracks
export function getRankedTracks(rankings: PlaylistRankings): PersistentTrack[] {
  return [...rankings.tracks].sort((a, b) => b.eloRating - a.eloRating);
}

// Sync new tracks from Spotify playlist
export function syncNewTracks(
  existingRankings: PlaylistRankings,
  spotifyPlaylistData: any
): PlaylistRankings {
  const existingTrackIds = new Set(existingRankings.tracks.map(t => t.id));
  const newTracks: PersistentTrack[] = [];

  // Find tracks that exist in Spotify but not in our rankings
  for (const track of spotifyPlaylistData.tracks) {
    if (!existingTrackIds.has(track.id)) {
      newTracks.push({
        id: track.id,
        name: track.name,
        artist: track.artist,
        album: track.album,
        preview_url: track.preview_url,
        external_urls: track.external_urls,
        image_url: track.image_url,
        duration_ms: track.duration_ms,
        addedBy: track.addedBy,
        eloRating: 1500, // Start with default rating
        totalWins: 0,
        totalLosses: 0,
        totalComparisons: 0,
        lastUpdated: new Date().toISOString(),
        rankingHistory: [{
          date: new Date().toISOString(),
          rating: 1500,
          rank: 0
        }]
      });
    }
  }

  // If no new tracks, return existing rankings
  if (newTracks.length === 0) {
    return existingRankings;
  }

  console.log(`Found ${newTracks.length} new tracks to add:`, newTracks.map(t => t.name));

  // Return updated rankings with new tracks
  return {
    ...existingRankings,
    tracks: [...existingRankings.tracks, ...newTracks],
    lastUpdated: new Date().toISOString()
  };
} 