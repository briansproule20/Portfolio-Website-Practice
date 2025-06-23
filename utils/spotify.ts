export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  image_url?: string;
  duration_ms: number;
  eloRating?: number;
  wins?: number;
  losses?: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  tracks: SpotifyTrack[];
}

// Function to extract playlist ID from Spotify URL
export function extractPlaylistId(url: string): string | null {
  const regex = /playlist\/([a-zA-Z0-9]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Function to get Spotify access token (client credentials flow for public data)
export async function getSpotifyAccessToken(): Promise<string | null> {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`)}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    return null;
  }
}

// Function to fetch playlist data from Spotify
export async function fetchSpotifyPlaylist(playlistId: string): Promise<SpotifyPlaylist | null> {
  try {
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) {
      throw new Error('Failed to get access token');
    }

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlist');
    }

    const data = await response.json();
    
    const tracks: SpotifyTrack[] = data.tracks.items.map((item: any) => ({
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

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      tracks,
    };
  } catch (error) {
    console.error('Error fetching Spotify playlist:', error);
    return null;
  }
}

// Elo rating calculation
export function calculateElo(winnerRating: number, loserRating: number, kFactor: number = 32): { newWinnerRating: number; newLoserRating: number } {
  const expectedWinner = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
  const expectedLoser = 1 / (1 + Math.pow(10, (winnerRating - loserRating) / 400));
  
  const newWinnerRating = Math.round(winnerRating + kFactor * (1 - expectedWinner));
  const newLoserRating = Math.round(loserRating + kFactor * (0 - expectedLoser));
  
  return { newWinnerRating, newLoserRating };
} 