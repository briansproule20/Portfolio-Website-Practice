import fs from 'fs';
import path from 'path';
import { EloEntity, EloDimension, EloMatch } from '@/types/elo';
import { ELO_ENTITIES } from '@/data/elo-entities';
import { processMatch } from '@/lib/elo-utils';

// Re-export ELO_ENTITIES for use in API routes
export { ELO_ENTITIES };

// Vercel KV import with fallback
export let kv: any = null;
export let redis: any = null;

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

export interface EloRankings {
  entities: EloEntity[];
  totalVotes: number;
  lastUpdated: string;
  matches: EloMatch[];
}

export interface EloVoteRecord {
  id: string;
  entity1Id: string;
  entity2Id: string;
  dimension: EloDimension;
  winner: string;
  timestamp: string;
  eloChange: number;
  entity1RatingBefore: number;
  entity1RatingAfter: number;
  entity2RatingBefore: number;
  entity2RatingAfter: number;
}

export const RANKINGS_FILE = path.join(process.cwd(), 'data', 'elo-rankings.json');
export const VOTES_FILE = path.join(process.cwd(), 'data', 'elo-votes.json');
export const KV_RANKINGS_KEY = 'elo-rankings';
export const KV_VOTES_KEY = 'elo-votes';

// In-memory fallback for development/testing
export let memoryRankings: EloRankings | null = null;
export let memoryVotes: EloVoteRecord[] = [];

// Ensure data directory exists
export function ensureDataDirectory() {
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
export function canWriteFiles(): boolean {
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
export async function loadEloRankings(): Promise<EloRankings | null> {
  try {
    // Try Redis Cloud first
    if (redis && redis.isOpen) {
      try {
        const redisData = await redis.get(KV_RANKINGS_KEY);
        if (redisData) {
          console.log('Loading ELO rankings from Redis Cloud');
          return JSON.parse(redisData);
        }
      } catch (error) {
        console.warn('Redis load failed, trying KV:', error);
      }
    }

    // Try Vercel KV second
    if (kv) {
      try {
        const kvData = await kv.get(KV_RANKINGS_KEY);
        if (kvData) {
          console.log('Loading ELO rankings from Vercel KV');
          return kvData as EloRankings;
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
        console.log('Loading ELO rankings from file');
        return rankings;
      } catch (error) {
        console.warn('File load failed, trying memory:', error);
      }
    }

    // Fallback to memory
    if (memoryRankings) {
      console.log('Loading ELO rankings from memory');
      return memoryRankings;
    }
    
    return null;
  } catch (error) {
    console.error('Error loading ELO rankings:', error);
    return memoryRankings;
  }
}

// Enhanced async save function for Redis/KV
export async function saveEloRankings(rankings: EloRankings): Promise<boolean> {
  let success = false;
  
  try {
    // Always save to memory as immediate fallback
    memoryRankings = rankings;
    console.log('Saved ELO rankings to memory');

    // Try to save to Redis Cloud first
    if (redis && redis.isOpen) {
      try {
        await redis.set(KV_RANKINGS_KEY, JSON.stringify(rankings));
        console.log('✅ Saved ELO rankings to Redis Cloud');
        success = true;
      } catch (error) {
        console.warn('❌ Redis save failed, trying KV:', error);
      }
    }

    // Try to save to Vercel KV if Redis failed
    if (!success && kv) {
      try {
        await kv.set(KV_RANKINGS_KEY, rankings);
        console.log('✅ Saved ELO rankings to Vercel KV');
        success = true;
      } catch (error) {
        console.warn('❌ KV save failed, trying file storage:', error);
      }
    }

    // Try to save to file if both Redis and KV failed
    if (!success && canWriteFiles()) {
      ensureDataDirectory();
      fs.writeFileSync(RANKINGS_FILE, JSON.stringify(rankings, null, 2));
      console.log('✅ Saved ELO rankings to file');
      success = true;
    }

    if (!success) {
      console.log('⚠️ Using memory storage only (serverless environment)');
    }
    
    return success;
  } catch (error) {
    console.error('❌ Error saving ELO rankings (using memory only):', error);
    return false;
  }
}

// Initialize rankings with default entities
export function initializeEloRankings(entities: EloEntity[]): EloRankings {
  return {
    entities: entities.map(entity => ({
      ...entity,
      eloScores: {
        fight: 1200,
        better: 1200,
        cute: 1200,
        ally: 1200
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
    })),
    totalVotes: 0,
    lastUpdated: new Date().toISOString(),
    matches: []
  };
}

// Update rankings with a new vote
export function updateEloRankings(
  rankings: EloRankings,
  entity1Id: string,
  entity2Id: string,
  dimension: EloDimension,
  winner: string
): { updatedRankings: EloRankings; voteRecord: EloVoteRecord | null } {
  const entity1 = rankings.entities.find(e => e.id === entity1Id);
  const entity2 = rankings.entities.find(e => e.id === entity2Id);
  
  if (!entity1 || !entity2) {
    return { updatedRankings: rankings, voteRecord: null };
  }

  // Process the match
  const winnerType = winner === entity1Id ? 'entity1' : 'entity2';
  const result = processMatch(entity1, entity2, dimension, winnerType);
  
  // Create vote record
  const voteRecord: EloVoteRecord = {
    id: `vote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    entity1Id,
    entity2Id,
    dimension,
    winner,
    timestamp: new Date().toISOString(),
    eloChange: result.eloChange,
    entity1RatingBefore: entity1.eloScores[dimension],
    entity1RatingAfter: result.entity1.eloScores[dimension],
    entity2RatingBefore: entity2.eloScores[dimension],
    entity2RatingAfter: result.entity2.eloScores[dimension]
  };

  // Update entities
  const updatedEntities = rankings.entities.map(entity => {
    if (entity.id === entity1Id) return result.entity1;
    if (entity.id === entity2Id) return result.entity2;
    return entity;
  });

  // Create match record
  const matchRecord: EloMatch = {
    id: voteRecord.id,
    entity1Id,
    entity2Id,
    dimension,
    winner,
    timestamp: new Date(),
    eloChange: result.eloChange
  };

  const updatedRankings: EloRankings = {
    ...rankings,
    entities: updatedEntities,
    totalVotes: rankings.totalVotes + 1,
    lastUpdated: new Date().toISOString(),
    matches: [...rankings.matches, matchRecord]
  };

  return { updatedRankings, voteRecord };
}

// Log vote to permanent storage
export async function logEloVote(voteRecord: EloVoteRecord): Promise<void> {
  try {
    // Always save to memory
    memoryVotes.push(voteRecord);

    // Try Redis Cloud first
    if (redis && redis.isOpen) {
      try {
        const existingVotes = await redis.get(KV_VOTES_KEY) || '[]';
        const votes = JSON.parse(existingVotes);
        votes.push(voteRecord);
        await redis.set(KV_VOTES_KEY, JSON.stringify(votes));
        console.log('✅ Saved ELO vote to Redis Cloud');
        return;
      } catch (error) {
        console.warn('❌ Redis vote save failed, trying KV:', error);
      }
    }

    // Try Vercel KV
    if (kv) {
      try {
        const existingVotes = await kv.get(KV_VOTES_KEY) || [];
        existingVotes.push(voteRecord);
        await kv.set(KV_VOTES_KEY, existingVotes);
        console.log('✅ Saved ELO vote to Vercel KV');
        return;
      } catch (error) {
        console.warn('❌ KV vote save failed, trying file storage:', error);
      }
    }

    // Try file system
    if (canWriteFiles()) {
      ensureDataDirectory();
      const existingVotes = fs.existsSync(VOTES_FILE) 
        ? JSON.parse(fs.readFileSync(VOTES_FILE, 'utf8'))
        : [];
      existingVotes.push(voteRecord);
      fs.writeFileSync(VOTES_FILE, JSON.stringify(existingVotes, null, 2));
      console.log('✅ Saved ELO vote to file');
      return;
    }

    console.log('⚠️ Using memory storage for ELO votes only');
  } catch (error) {
    console.error('❌ Error saving ELO vote:', error);
  }
}

// Sync entities from data file (add new ones, remove deleted ones, update existing ones)
export function syncNewEntities(rankings: EloRankings, newEntities: EloEntity[]): EloRankings {
  const existingIds = new Set(rankings.entities.map(e => e.id));
  const newEntityIds = new Set(newEntities.map(e => e.id));
  
  // Find entities to add (in data file but not in rankings)
  const newEntitiesToAdd = newEntities.filter(entity => !existingIds.has(entity.id));
  
  // Find entities to remove (in rankings but not in data file)
  const entitiesToRemove = rankings.entities.filter(entity => !newEntityIds.has(entity.id));
  
  // Find entities to update (exist in both but with different data)
  const entitiesToUpdate = newEntities.filter(newEntity => {
    const existingEntity = rankings.entities.find(e => e.id === newEntity.id);
    if (!existingEntity) return false;
    
    // Check if name, description, or imageUrl changed
    return existingEntity.name !== newEntity.name || 
           existingEntity.description !== newEntity.description ||
           existingEntity.imageUrl !== newEntity.imageUrl;
  });
  
  if (newEntitiesToAdd.length === 0 && entitiesToRemove.length === 0 && entitiesToUpdate.length === 0) {
    return rankings;
  }
  
  // Initialize new entities with default ELO scores
  const initializedNewEntities = newEntitiesToAdd.map(entity => ({
    ...entity,
    eloScores: {
      fight: 1200,
      better: 1200,
      cute: 1200,
      ally: 1200
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
  }));
  
  // Update existing entities with new data while preserving ELO scores
  const updatedExistingEntities = rankings.entities.map(existingEntity => {
    const newEntityData = newEntities.find(e => e.id === existingEntity.id);
    if (newEntityData) {
      return {
        ...existingEntity,
        name: newEntityData.name,
        description: newEntityData.description,
        imageUrl: newEntityData.imageUrl
      };
    }
    return existingEntity;
  });
  
  // Remove deleted entities, update existing ones, and add new ones
  const updatedEntities = updatedExistingEntities
    .filter(entity => newEntityIds.has(entity.id)) // Keep only entities that still exist in data file
    .concat(initializedNewEntities); // Add new entities
  
  if (newEntitiesToAdd.length > 0) {
    console.log(`🎯 Added ${newEntitiesToAdd.length} new entities: ${newEntitiesToAdd.map(e => e.name).join(', ')}`);
  }
  
  if (entitiesToRemove.length > 0) {
    console.log(`🗑️ Removed ${entitiesToRemove.length} entities: ${entitiesToRemove.map(e => e.name).join(', ')}`);
  }
  
  if (entitiesToUpdate.length > 0) {
    console.log(`🔄 Updated ${entitiesToUpdate.length} entities: ${entitiesToUpdate.map(e => e.name).join(', ')}`);
  }
  
  return {
    ...rankings,
    entities: updatedEntities,
    lastUpdated: new Date().toISOString()
  };
}

// Get vote history
export async function getEloVoteHistory(): Promise<EloVoteRecord[]> {
  try {
    // Try Redis Cloud first
    if (redis && redis.isOpen) {
      try {
        const redisData = await redis.get(KV_VOTES_KEY);
        if (redisData) {
          return JSON.parse(redisData);
        }
      } catch (error) {
        console.warn('Redis vote history failed, trying KV:', error);
      }
    }

    // Try Vercel KV
    if (kv) {
      try {
        const kvData = await kv.get(KV_VOTES_KEY);
        if (kvData) {
          return kvData as EloVoteRecord[];
        }
      } catch (error) {
        console.warn('KV vote history failed, trying file:', error);
      }
    }

    // Try file system
    if (fs.existsSync(VOTES_FILE)) {
      try {
        const data = fs.readFileSync(VOTES_FILE, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        console.warn('File vote history failed, using memory:', error);
      }
    }

    // Fallback to memory
    return memoryVotes;
  } catch (error) {
    console.error('Error loading ELO vote history:', error);
    return memoryVotes;
  }
} 