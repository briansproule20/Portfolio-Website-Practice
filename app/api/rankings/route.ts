import { NextRequest, NextResponse } from 'next/server';
import { 
  loadRankings, 
  saveRankings, 
  initializeRankings, 
  updateRankings,
  getRankedTracks,
  syncNewTracks
} from '@/lib/rankings-server';

// Your specific playlist ID - change this to your desired playlist
const PLAYLIST_ID = '1kwqfRYqQfcUCGP5WHKkbB'; // Replace with your playlist ID

// User ID mapping for known contributors
const USER_ID_MAPPING: { [key: string]: string } = {
  '313xxnswdojfc37pzlwq4j6dagsu': 'alex',
  'k94e8briq5y1iiiaqqa4j59sb': 'brian',
  // Add more mappings as needed
};

// Helper function to map user IDs to readable names
function mapUserName(spotifyUserId: string | null): string {
  if (!spotifyUserId) return 'Unknown';
  return USER_ID_MAPPING[spotifyUserId] || spotifyUserId;
}

// Helper function to fetch current playlist data from Spotify
async function fetchSpotifyPlaylistData() {
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!tokenResponse.ok) {
    console.error('Token response error:', await tokenResponse.text());
    throw new Error('Failed to get Spotify access token');
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // First get basic playlist info
  const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!playlistResponse.ok) {
    throw new Error('Failed to fetch playlist from Spotify');
  }

  const playlistData = await playlistResponse.json();

  // Then get detailed track items with added_by information
  const tracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?fields=items(added_by.display_name,added_by.id,track(id,name,artists,album,preview_url,external_urls,duration_ms))`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!tracksResponse.ok) {
    throw new Error('Failed to fetch playlist tracks from Spotify');
  }

  const tracksData = await tracksResponse.json();
  
  // Transform the data
  return {
    id: playlistData.id,
    name: playlistData.name,
    description: playlistData.description,
    tracks: tracksData.items.map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(', '),
      album: item.track.album.name,
      preview_url: item.track.preview_url,
      external_urls: item.track.external_urls,
      image_url: item.track.album.images[0]?.url,
      duration_ms: item.track.duration_ms,
      addedBy: mapUserName(item.added_by?.display_name || item.added_by?.id),
    }))
  };
}

// GET - Load current rankings
export async function GET() {
  try {
    let rankings = loadRankings();
    
    // Always fetch current playlist data to check for new songs
    const spotifyPlaylistData = await fetchSpotifyPlaylistData();
    
    // If no rankings exist, initialize with the playlist
    if (!rankings) {
      rankings = initializeRankings(spotifyPlaylistData);
      saveRankings(rankings);
    } else {
      // Check for new tracks and sync them
      const updatedRankings = syncNewTracks(rankings, spotifyPlaylistData);
      if (updatedRankings !== rankings) {
        rankings = updatedRankings;
        saveRankings(rankings);
      }
    }

    return NextResponse.json({
      success: true,
      rankings,
      rankedTracks: getRankedTracks(rankings)
    });
  } catch (error) {
    console.error('Error loading rankings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load rankings' },
      { status: 500 }
    );
  }
}

// POST - Submit a vote
export async function POST(request: NextRequest) {
  try {
    const { winnerId, loserId } = await request.json();
    
    if (!winnerId || !loserId) {
      return NextResponse.json(
        { success: false, error: 'Winner and loser IDs are required' },
        { status: 400 }
      );
    }

    let rankings = loadRankings();
    if (!rankings) {
      return NextResponse.json(
        { success: false, error: 'No rankings found. Please refresh to initialize.' },
        { status: 404 }
      );
    }

    // Update rankings with the vote
    rankings = updateRankings(rankings, winnerId, loserId);
    saveRankings(rankings);

    return NextResponse.json({
      success: true,
      rankings,
      rankedTracks: getRankedTracks(rankings)
    });
  } catch (error) {
    console.error('Error processing vote:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process vote' },
      { status: 500 }
    );
  }
} 