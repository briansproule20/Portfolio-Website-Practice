import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { playlistId } = await request.json();
    
    if (!playlistId) {
      return NextResponse.json({ error: 'Playlist ID is required' }, { status: 400 });
    }

    // Get Spotify access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Spotify access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch playlist data
    const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!playlistResponse.ok) {
      throw new Error('Failed to fetch playlist from Spotify');
    }

    const playlistData = await playlistResponse.json();
    
    // Transform the data
    const tracks = playlistData.tracks.items.map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artist: item.track.artists.map((artist: any) => artist.name).join(', '),
      album: item.track.album.name,
      preview_url: item.track.preview_url,
      external_urls: item.track.external_urls,
      image_url: item.track.album.images[0]?.url,
      duration_ms: item.track.duration_ms,
      eloRating: 1500, // Starting Elo rating
      wins: 0,
      losses: 0,
    }));

    const playlist = {
      id: playlistData.id,
      name: playlistData.name,
      description: playlistData.description,
      tracks,
    };

    return NextResponse.json(playlist);
  } catch (error) {
    console.error('Error fetching Spotify playlist:', error);
    return NextResponse.json(
      { error: 'Failed to fetch playlist' },
      { status: 500 }
    );
  }
} 