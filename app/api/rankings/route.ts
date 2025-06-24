import { NextRequest, NextResponse } from 'next/server';
import { 
  loadRankingsSync, 
  saveRankings, 
  initializeRankings, 
  updateRankings,
  getRankedTracks,
  syncNewTracks
} from '@/lib/rankings-server';

// Configuration
const PLAYLIST_ID = '1kwqfRYqQfcUCGP5WHKkbB';

// User ID to name mapping
const USER_MAPPING: { [key: string]: string } = {
  '313xxnswdojfc37pzlwq4j6dagsu': 'alex',
  'k94e8briq5y1iiiaqqa4j59sb': 'brian',
  'tanohunt': 'tanohunt',
  'mattsmith1225': 'mattsmith1225',
  'rileymurray03': 'rileymurray03',
  'kyleighdoyle': 'kyleighdoyle',
  'caseymurray9': 'caseymurray9'
};

async function getSpotifyToken() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Failed to get Spotify token: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function fetchPlaylistFromSpotify(playlistId: string) {
  const token = await getSpotifyToken();
  
  // Get playlist info
  const playlistResponse = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!playlistResponse.ok) {
    throw new Error(`Failed to fetch playlist: ${playlistResponse.status}`);
  }

  const playlistData = await playlistResponse.json();

  // Get playlist tracks with user info
  const tracksResponse = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(added_by.display_name,added_by.id,track(id,name,artists,album,preview_url,external_urls,duration_ms))`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!tracksResponse.ok) {
    throw new Error(`Failed to fetch tracks: ${tracksResponse.status}`);
  }

  const tracksData = await tracksResponse.json();

  // Process tracks with user info
  const tracks = tracksData.items
    .filter((item: any) => item.track && item.track.id)
    .map((item: any) => {
      const track = item.track;
      const addedByUser = item.added_by?.display_name || item.added_by?.id || 'Unknown';
      const mappedUser = USER_MAPPING[addedByUser] || addedByUser;
      
      return {
        id: track.id,
        name: track.name,
        artist: track.artists[0]?.name || 'Unknown Artist',
        album: track.album?.name || 'Unknown Album',
        preview_url: track.preview_url,
        external_urls: track.external_urls,
        image_url: track.album?.images?.[0]?.url || '',
        duration_ms: track.duration_ms,
        addedBy: mappedUser
      };
    });

  return {
    id: playlistData.id,
    name: playlistData.name,
    tracks
  };
}

export async function GET() {
  try {
    console.log('🎵 Loading rankings...');
    
    // Load existing rankings
    let rankings = loadRankingsSync();
    
    // If no rankings exist, fetch from Spotify and initialize
    if (!rankings) {
      console.log('🎵 No rankings found, initializing from Spotify...');
      const playlistData = await fetchPlaylistFromSpotify(PLAYLIST_ID);
      rankings = initializeRankings(playlistData);
      saveRankings(rankings);
      console.log(`🎵 Initialized rankings with ${rankings.tracks.length} tracks`);
    } else {
      // Check for new tracks from Spotify
      console.log('🎵 Checking for new tracks...');
      const playlistData = await fetchPlaylistFromSpotify(PLAYLIST_ID);
      const updatedRankings = syncNewTracks(rankings, playlistData);
      
      if (updatedRankings.tracks.length > rankings.tracks.length) {
        rankings = updatedRankings;
        saveRankings(rankings);
        console.log(`🎵 Added ${updatedRankings.tracks.length - rankings.tracks.length} new tracks`);
      }
    }

    return NextResponse.json({
      success: true,
      data: rankings
    });

  } catch (error) {
    console.error('Error in rankings GET:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { winnerId, loserId } = await request.json();
    
    if (!winnerId || !loserId || winnerId === loserId) {
      return NextResponse.json(
        { success: false, error: 'Invalid vote data' },
        { status: 400 }
      );
    }

    // Load current rankings
    let rankings = loadRankingsSync();
    
    if (!rankings) {
      return NextResponse.json(
        { success: false, error: 'Rankings not initialized' },
        { status: 500 }
      );
    }

    // Update rankings with the vote
    const updatedRankings = updateRankings(rankings, winnerId, loserId);
    
    // Save updated rankings
    saveRankings(updatedRankings);
    
    console.log(`🎵 Vote recorded: ${winnerId} beat ${loserId}`);
    
    return NextResponse.json({
      success: true,
      data: updatedRankings
    });

  } catch (error) {
    console.error('Error in rankings POST:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 