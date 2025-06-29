import { NextRequest, NextResponse } from 'next/server';
import { xboxAPI } from '../../../lib/xbox-api';

export async function GET(request: NextRequest) {
  try {
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
    
    // Return structured error response
    return NextResponse.json(
      {
        error: 'Failed to fetch Xbox Live data from OpenXBL',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
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