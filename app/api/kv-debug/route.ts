import { NextRequest, NextResponse } from 'next/server';

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
  
  if (redisUrl) {
    redis = Redis.createClient({
      url: redisUrl,
      socket: {
        connectTimeout: 3000
      }
    });
    redis.on('error', (err: any) => console.log('Redis Debug Error:', err));
    redis.connect().catch((err: any) => {
      console.log('Redis debug connection failed:', err);
      redis = null;
    });
  }
} catch (error) {
  console.log('Redis debug client setup failed:', error);
  redis = null;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const action = url.searchParams.get('action') || 'status';
  
  try {
    switch (action) {
      case 'status':
        return NextResponse.json({
          success: true,
          data: {
            kvAvailable: !!kv,
            redisAvailable: !!(redis && redis.isOpen),
            environment: process.env.NODE_ENV,
            hasKvCredentials: !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN),
            hasRedisUrl: !!process.env.REDIS_URL,
            kvUrl: process.env.KV_REST_API_URL ? 'configured' : 'not configured',
            redisUrl: process.env.REDIS_URL ? 'configured' : 'not configured',
            message: 
              (redis && redis.isOpen) ? 'Redis Cloud storage is available' :
              kv ? 'KV storage is available' : 
              'No persistent storage available - using fallback storage'
          }
        });
      
      case 'list-keys':
        if (!kv) {
          return NextResponse.json({
            success: false,
            error: 'KV not available'
          });
        }
        
        const keys = await kv.keys('*');
        return NextResponse.json({
          success: true,
          data: { keys }
        });
      
      case 'vote-count':
        // Try Redis first
        if (redis && redis.isOpen) {
          try {
            const votesData = await redis.get('playlist-votes');
            const votes = votesData ? JSON.parse(votesData) : [];
            return NextResponse.json({
              success: true,
              data: { 
                voteCount: Array.isArray(votes) ? votes.length : 0,
                hasVotes: !!votes,
                source: 'Redis Cloud'
              }
            });
          } catch (error) {
            console.warn('Redis vote count failed, trying KV');
          }
        }
        
        if (!kv) {
          return NextResponse.json({
            success: true,
            data: { 
              voteCount: 0, 
              message: 'No persistent storage available - using fallback storage',
              source: 'fallback'
            }
          });
        }
        
        const votes = await kv.get('playlist-votes');
        return NextResponse.json({
          success: true,
          data: { 
            voteCount: votes ? votes.length : 0,
            hasVotes: !!votes,
            source: 'Vercel KV'
          }
        });
      
      case 'rankings-status':
        if (!kv) {
          return NextResponse.json({
            success: true,
            data: { 
              message: 'KV not available - using fallback storage'
            }
          });
        }
        
        const rankings = await kv.get('playlist-rankings');
        return NextResponse.json({
          success: true,
          data: { 
            hasRankings: !!rankings,
            trackCount: rankings?.tracks?.length || 0,
            lastUpdated: rankings?.lastUpdated || null
          }
        });
      
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Available actions: status, list-keys, vote-count, rankings-status'
        });
    }
  } catch (error) {
    console.error('KV Debug error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 