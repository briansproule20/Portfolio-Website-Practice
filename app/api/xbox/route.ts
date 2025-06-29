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

    // Get credentials from environment
    const email = process.env.XBOX_EMAIL;
    const password = process.env.XBOX_PASSWORD;

    if (!email || !password) {
      console.error('Xbox credentials not configured');
      return NextResponse.json(
        { error: 'Xbox credentials not configured' },
        { status: 500 }
      );
    }

    console.log('🎮 Authenticating with Xbox Live...');
    
    // Authenticate with Xbox Live
    await xboxAPI.authenticate(email, password);
    
    console.log('✅ Xbox Live authentication successful');
    console.log('🎮 Fetching Xbox data...');
    
    // Get comprehensive game data
    const data = await xboxAPI.getGamehomeData();
    
    console.log(`✅ Fetched ${data.games.length} games and ${data.recentAchievements.length} achievements`);
    
    return NextResponse.json({
      success: true,
      profile: data.profile,
      games: data.games,
      recentAchievements: data.recentAchievements,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Xbox API Error:', error);
    
    // Return structured error response
    return NextResponse.json(
      {
        error: 'Failed to fetch Xbox Live data',
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
    const { action } = body;

    switch (action) {
      case 'authenticate':
        const { email, password } = body;
        
        if (!email || !password) {
          return NextResponse.json(
            { error: 'Email and password required' },
            { status: 400 }
          );
        }

        await xboxAPI.authenticate(email, password);
        
        return NextResponse.json({
          success: true,
          message: 'Authentication successful',
        });

      case 'getProfile':
        const profile = await xboxAPI.getProfile();
        return NextResponse.json({ success: true, profile });

      case 'getGames':
        const games = await xboxAPI.getGames();
        return NextResponse.json({ success: true, games });

      case 'getAchievements':
        const limit = body.limit || 20;
        const achievements = await xboxAPI.getRecentAchievements(limit);
        return NextResponse.json({ success: true, achievements });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Xbox API POST Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to process Xbox Live request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 