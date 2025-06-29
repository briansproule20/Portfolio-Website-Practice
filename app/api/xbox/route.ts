import { NextRequest, NextResponse } from 'next/server';
import { xboxAPI } from '../../../lib/xbox-api';

// Simple in-memory cache (in production, use Redis or similar)
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  try {
    // Check cache first
    const cacheKey = 'xbox-data';
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('📦 Returning cached Xbox data');
      return NextResponse.json(cached.data);
    }

    // Check if Xbox API is enabled
    if (process.env.XBOX_API_ENABLED !== 'true') {
      return NextResponse.json(
        { error: 'Xbox API is disabled' },
        { status: 503 }
      );
    }

    // Check if OpenXBL API key is configured
    if (!process.env.OPENXBL_API_KEY) {
      console.error('OpenXBL API key not configured');
      return NextResponse.json(
        { error: 'OpenXBL API key not configured' },
        { status: 500 }
      );
    }

    console.log('🎮 Fetching Xbox data from OpenXBL...');
    
    // Get optional XUID parameter for specific user data
    const { searchParams } = new URL(request.url);
    const xuid = searchParams.get('xuid') || undefined;
    
    // Get comprehensive game data from OpenXBL
    const data = await xboxAPI.getGamehomeData(xuid);
    
    console.log(`✅ Fetched ${data.games.length} games and ${data.recentAchievements.length} achievements`);
    
    // Cache the successful response
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return NextResponse.json({
      success: true,
      profile: data.profile,
      games: data.games,
      recentAchievements: data.recentAchievements,
      timestamp: new Date().toISOString(),
      source: 'OpenXBL',
    });

  } catch (error) {
    console.error('OpenXBL API Error:', error);
    
    // Check if it's a rate limit error
    if (error instanceof Error && error.message.includes('Rate limit exceeded')) {
      // Return cached data if available, even if expired
      const cacheKey = 'xbox-data';
      const cached = cache.get(cacheKey);
      if (cached) {
        console.log('📦 Returning expired cached data due to rate limit');
        return NextResponse.json({
          ...cached.data,
          _cached: true,
          _rateLimited: true
        });
      }
      
      // Return error response for rate limiting
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again in a few minutes.',
          _rateLimited: true 
        },
        { status: 429 }
      );
    }

    // For other errors, return the error
    return NextResponse.json(
      { error: 'Failed to fetch Xbox data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, xuid, gamertag, limit } = body;

    switch (action) {
      case 'getProfile':
        const profile = await xboxAPI.getProfile(xuid);
        return NextResponse.json({ success: true, profile });

      case 'getGames':
        const games = await xboxAPI.getGames(xuid);
        return NextResponse.json({ success: true, games });

      case 'getAchievements':
        const achievements = await xboxAPI.getRecentAchievements(limit || 20, xuid);
        return NextResponse.json({ success: true, achievements });

      case 'searchUser':
        if (!gamertag) {
          return NextResponse.json(
            { error: 'Gamertag required for search' },
            { status: 400 }
          );
        }
        const searchResults = await xboxAPI.searchUser(gamertag);
        return NextResponse.json({ success: true, users: searchResults });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions: getProfile, getGames, getAchievements, searchUser' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('OpenXBL API POST Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to process OpenXBL request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 