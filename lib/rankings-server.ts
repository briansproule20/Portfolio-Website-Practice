import fs from 'fs';
import path from 'path';
import { PersistentTrack, PlaylistRankings, VoteRecord } from '@/types/rankings';

// Vercel KV import with fallback
let kv: any = null;
let redis: any = null;

try {
  kv = require('@vercel/kv').kv;
} catch (error) {
  console.log('Vercel KV not available');
}

// Redis client for Redis Cloud
try {
  const Redis = require('redis');
  const redisUrl = process.env.REDIS_URL;
  console.log('Redis URL check:', redisUrl ? 'configured' : 'not found');
  
  if (redisUrl) {
    redis = Redis.createClient({
      url: redisUrl,
      socket: {
        connectTimeout: 5000,
        reconnectStrategy: (retries: number) => {
          if (retries > 3) {
            console.log('Redis max retries reached');
            return false;
          }
          return Math.min(retries * 200, 1000);
        }
      }
    });
    
    redis.on('error', (err: any) => console.log('Redis Client Error:', err));
    redis.on('connect', () => console.log('✅ Redis connected'));
    redis.on('ready', () => console.log('✅ Redis ready'));
    
    // Connect with timeout
    const connectPromise = redis.connect();
    setTimeout(() => {
      if (!redis.isOpen) {
        console.log('⚠️ Redis connection timeout, using fallback storage');
      }
    }, 3000);
    
    connectPromise.catch((err: any) => {
      console.log('❌ Redis connection failed:', err);
      redis = null;
    });
    
    console.log('🔄 Redis Cloud client initialized');
  } else {
    console.log('❌ REDIS_URL environment variable not found');
  }
} catch (error) {
  console.log('❌ Redis client setup failed:', error);
  redis = null;
}

const RANKINGS_FILE = path.join(process.cwd(), 'data', 'playlist-rankings.json');
const VOTES_FILE = path.join(process.cwd(), 'data', 'votes-log.json');
const KV_KEY = 'playlist-rankings';
const KV_VOTES_KEY = 'playlist-votes';

// In-memory fallback for development/testing
let memoryRankings: PlaylistRankings | null = null;
let memoryVotes: VoteRecord[] = [];

// Ensure data directory exists
function ensureDataDirectory() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    return true;
  } catch (error) {
    console.warn('Cannot create data directory:', error);
    return false;
  }
}

// Check if we can write files (not possible on Vercel/Netlify)
function canWriteFiles(): boolean {
  try {
    const testFile = path.join(process.cwd(), 'test-write.tmp');
    fs.writeFileSync(testFile, 'test');
    fs.unlinkSync(testFile);
    return true;
  } catch (error) {
    return false;
  }
}

// Load existing rankings with priority: KV/Redis > File > Memory
export async function loadRankings(): Promise<PlaylistRankings | null> {
  try {
    // Try Redis Cloud first
    if (redis && redis.isOpen) {
      try {
        const redisData = await redis.get(KV_KEY);
        if (redisData) {
          console.log('Loading rankings from Redis Cloud');
          return JSON.parse(redisData);
        }
      } catch (error) {
        console.warn('Redis load failed, trying KV:', error);
      }
    }

    // Try Vercel KV second
    if (kv) {
      try {
        const kvData = await kv.get(KV_KEY);
        if (kvData) {
          console.log('Loading rankings from Vercel KV');
          return kvData as PlaylistRankings;
        }
      } catch (error) {
        console.warn('KV load failed, trying file storage:', error);
      }
    }

    // Try file system (local development)
    if (ensureDataDirectory() && fs.existsSync(RANKINGS_FILE)) {
      try {
        const data = fs.readFileSync(RANKINGS_FILE, 'utf8');
        const rankings = JSON.parse(data);
        console.log('Loading rankings from file');
        return rankings;
      } catch (error) {
        console.warn('File load failed, trying memory:', error);
      }
    }

    // Fallback to memory
    if (memoryRankings) {
      console.log('Loading rankings from memory');
      return memoryRankings;
    }
    
    return null;
  } catch (error) {
    console.error('Error loading rankings:', error);
    return memoryRankings;
  }
}

// Enhanced async save function for Redis/KV
export async function saveRankingsAsync(rankings: PlaylistRankings): Promise<boolean> {
  let success = false;
  
  try {
    // Always save to memory as immediate fallback
    memoryRankings = rankings;
    console.log('Saved rankings to memory');

    // Try to save to Redis Cloud first
    if (redis && redis.isOpen) {
      try {
        await redis.set(KV_KEY, JSON.stringify(rankings));
        console.log('✅ Saved rankings to Redis Cloud');
        success = true;
      } catch (error) {
        console.warn('❌ Redis save failed, trying KV:', error);
      }
    }

    // Try to save to Vercel KV if Redis failed
    if (!success && kv) {
      try {
        await kv.set(KV_KEY, rankings);
        console.log('✅ Saved rankings to Vercel KV');
        success = true;
      } catch (error) {
        console.warn('❌ KV save failed, trying file storage:', error);
      }
    }

    // Try to save to file if both Redis and KV failed
    if (!success && canWriteFiles()) {
      ensureDataDirectory();
      fs.writeFileSync(RANKINGS_FILE, JSON.stringify(rankings, null, 2));
      console.log('✅ Saved rankings to file');
      success = true;
    }

    if (!success) {
      console.log('⚠️ Using memory storage only (serverless environment)');
    }
    
    return success;
  } catch (error) {
    console.error('❌ Error saving rankings (using memory only):', error);
    return false;
  }
}

// Save rankings - synchronous version (for backward compatibility)
export function saveRankings(rankings: PlaylistRankings): void {
  try {
    // Always save to memory as immediate fallback
    memoryRankings = rankings;
    console.log('Saved rankings to memory');

    // Try to save to file if possible
    if (canWriteFiles()) {
      ensureDataDirectory();
      fs.writeFileSync(RANKINGS_FILE, JSON.stringify(rankings, null, 2));
      console.log('✅ Saved rankings to file (sync)');
    } else {
      console.log('⚠️ Using memory storage (serverless environment)');
    }
  } catch (error) {
    console.error('❌ Error saving rankings (using memory only):', error);
    // Memory save already happened above
  }
}

// Synchronous version for backward compatibility
export function loadRankingsSync(): PlaylistRankings | null {
  // This is only used in non-async contexts, return memory/file only
  try {
    if (memoryRankings) {
      return memoryRankings;
    }

    if (ensureDataDirectory() && fs.existsSync(RANKINGS_FILE)) {
      const data = fs.readFileSync(RANKINGS_FILE, 'utf8');
      return JSON.parse(data);
    }
    
    return null;
  } catch (error) {
    console.error('Error loading rankings sync:', error);
    return null;
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
): { updatedRankings: PlaylistRankings; voteRecord: VoteRecord } {
  const winnerTrack = rankings.tracks.find(t => t.id === winnerId);
  const loserTrack = rankings.tracks.find(t => t.id === loserId);

  if (!winnerTrack || !loserTrack) {
    return { 
      updatedRankings: rankings, 
      voteRecord: null as any 
    };
  }

  // Store ratings before changes
  const winnerRatingBefore = winnerTrack.eloRating;
  const loserRatingBefore = loserTrack.eloRating;

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

  const updatedRankings = {
    ...rankings,
    tracks: tracksWithHistory,
    totalVotes: rankings.totalVotes + 1,
    lastUpdated: new Date().toISOString()
  };

  // Create vote record
  const voteRecord: VoteRecord = {
    id: `vote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    winnerId,
    loserId,
    timestamp: new Date().toISOString(),
    winnerRatingBefore,
    loserRatingBefore,
    winnerRatingAfter: newWinnerRating,
    loserRatingAfter: newLoserRating
  };

  return {
    updatedRankings,
    voteRecord
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

// Log individual votes permanently
export async function logVote(voteRecord: VoteRecord): Promise<void> {
  try {
    // Add to memory
    memoryVotes.push(voteRecord);
    
    // Try to save to Redis Cloud first
    if (redis && redis.isOpen) {
      try {
        const existingVotesData = await redis.get(KV_VOTES_KEY);
        const existingVotes = existingVotesData ? JSON.parse(existingVotesData) : [];
        const updatedVotes = [...existingVotes, voteRecord];
        await redis.set(KV_VOTES_KEY, JSON.stringify(updatedVotes));
        console.log('✅ Logged vote to Redis Cloud');
      } catch (error) {
        console.warn('❌ Redis vote logging failed:', error);
      }
    }
    
    // Try to save to KV if Redis failed
    if (kv) {
      try {
        const existingVotes = await kv.get(KV_VOTES_KEY) || [];
        const updatedVotes = [...existingVotes, voteRecord];
        await kv.set(KV_VOTES_KEY, updatedVotes);
        console.log('✅ Logged vote to KV');
      } catch (error) {
        console.warn('❌ KV vote logging failed:', error);
      }
    }

    // Try to save to file
    if (canWriteFiles()) {
      try {
        ensureDataDirectory();
        let existingVotes: VoteRecord[] = [];
        
        if (fs.existsSync(VOTES_FILE)) {
          const data = fs.readFileSync(VOTES_FILE, 'utf8');
          existingVotes = JSON.parse(data);
        }
        
        existingVotes.push(voteRecord);
        fs.writeFileSync(VOTES_FILE, JSON.stringify(existingVotes, null, 2));
        console.log('✅ Logged vote to file');
      } catch (error) {
        console.warn('❌ File vote logging failed:', error);
      }
    }
  } catch (error) {
    console.error('❌ Error logging vote:', error);
  }
}

// Get vote history
export async function getVoteHistory(): Promise<VoteRecord[]> {
  try {
    // Try Redis Cloud first
    if (redis && redis.isOpen) {
      try {
        const votesData = await redis.get(KV_VOTES_KEY);
        if (votesData) {
          const votes = JSON.parse(votesData);
          if (Array.isArray(votes)) {
            console.log('Loading vote history from Redis Cloud');
            return votes;
          }
        }
      } catch (error) {
        console.warn('Redis vote history load failed:', error);
      }
    }

    // Try KV second
    if (kv) {
      try {
        const votes = await kv.get(KV_VOTES_KEY);
        if (votes && Array.isArray(votes)) {
          console.log('Loading vote history from KV');
          return votes;
        }
      } catch (error) {
        console.warn('KV vote history load failed:', error);
      }
    }

    // Try file system
    if (ensureDataDirectory() && fs.existsSync(VOTES_FILE)) {
      try {
        const data = fs.readFileSync(VOTES_FILE, 'utf8');
        const votes = JSON.parse(data);
        console.log('Loading vote history from file');
        return votes;
      } catch (error) {
        console.warn('File vote history load failed:', error);
      }
    }

    // Fallback to memory
    console.log('Loading vote history from memory');
    return memoryVotes;
  } catch (error) {
    console.error('Error loading vote history:', error);
    return [];
  }
} 