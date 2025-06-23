# Spotify Integration Setup

To use the Tunes page with Spotify playlist import and ranking, you'll need to set up Spotify API credentials.

## 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the app details:
   - **App Name**: Your Portfolio Tunes
   - **App Description**: Personal portfolio music ranking app
   - **Website**: Your portfolio URL
   - **Redirect URI**: Not needed for this implementation
5. Click "Create"

## 2. Get Your Credentials

1. In your new app dashboard, you'll see:
   - **Client ID** (public)
   - **Client Secret** (keep private!)

## 3. Add to Environment Variables

Add these to your `.env.local` file:

```bash
# Spotify API Credentials
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

## 4. How It Works

- **Import**: Paste any public Spotify playlist URL
- **Ranking**: Songs are presented in pairs - click your favorite
- **Elo System**: Each vote adjusts song ratings using the Elo algorithm
- **Results**: View final rankings based on your preferences

## 5. Supported Playlist URLs

The app supports these Spotify URL formats:
- `https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd`
- `https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd?si=...`

Make sure the playlist is **public** for the import to work!

## Features

- ✅ Hot-or-not style song battles
- ✅ Elo rating system for accurate rankings
- ✅ Album artwork display
- ✅ 30-second preview playback (when available)
- ✅ Win/loss tracking
- ✅ Responsive design
- ✅ Smooth animations 