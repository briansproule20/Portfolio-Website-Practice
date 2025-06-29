# OpenXBL API Integration Setup

This guide will help you integrate OpenXBL API with your portfolio website to display real Xbox gaming data.

## ⚠️ Important Security Notice

**Never commit your API keys to version control!** Always use environment variables and ensure `.env.local` is in your `.gitignore`.

## Step 1: Get Your OpenXBL API Key

1. **Visit https://xbl.io/**
2. **Sign up for a free account** using your Xbox Live credentials
3. **Get your API key** from your profile dashboard
4. **Copy your API key** - you'll need it for the next step

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# OpenXBL API Configuration
OPENXBL_API_KEY=your_api_key_here

# Enable/disable Xbox API (set to 'true' to enable)
XBOX_API_ENABLED=true

# Optional: Specify a different user's XUID to display their data
XBOX_TARGET_XUID=
```

## Step 3: Test the Integration

1. **Set your API key:**
   ```env
   OPENXBL_API_KEY=1a85c542-8f2a-4569-8fad-0eaf1cbedd6d
   XBOX_API_ENABLED=true
   ```

2. **Restart your development server:**
   ```bash
   npm run dev
   ```

3. **Visit your gamehome page:** `http://localhost:3000/gamehome`

## Step 4: Monitor the Integration

Check your browser console and terminal for OpenXBL API status:

### Success Indicators:
- ✅ `OpenXBL request successful`
- ✅ `Fetched X games and Y achievements`
- Your real gamertag appears in the stats
- Your actual games show up in the gallery

### Error Indicators:
- ❌ `OpenXBL API key not configured`
- ❌ `OpenXBL API request failed`
- Red error message appears on the page
- Sample games are displayed instead

## API Endpoints

The integration creates these API endpoints:

### `GET /api/xbox`
Fetches comprehensive Xbox Live data including:
- User profile (gamertag, gamerscore, achievement count, profile picture)
- Game library (recent games with play time and achievements)
- Recent achievements with rarity information

**Optional Parameters:**
- `?xuid=123456789` - Get data for a specific user (requires their XUID)

### `POST /api/xbox`
Supports various actions:

#### Get Profile Only
```json
{
  "action": "getProfile",
  "xuid": "optional_user_xuid"
}
```

#### Get Games Only
```json
{
  "action": "getGames",
  "xuid": "optional_user_xuid"  
}
```

#### Get Achievements Only
```json
{
  "action": "getAchievements",
  "limit": 20,
  "xuid": "optional_user_xuid"
}
```

#### Search for Users
```json
{
  "action": "searchUser",
  "gamertag": "username_to_search"
}
```

## Features

### ✅ Currently Working:
- OpenXBL API integration (no Xbox credentials needed!)
- Profile data (gamertag, gamerscore, profile picture, bio)
- Game library fetching with play time
- Achievement data with rarity levels
- Error handling with fallback to sample data
- Achievement tickers with real data
- User search functionality
- Support for viewing other users' data

### 🚧 Future Enhancements:
- Game clips and screenshots integration
- Friends list integration
- Game Pass library integration
- Achievement analytics and progress tracking
- Rate limiting optimization

## OpenXBL Benefits

### Why OpenXBL is Better:
1. **No Xbox Credentials Required** - Just an API key
2. **More Reliable** - Professional API service
3. **Better Rate Limits** - 150 requests/hour (upgradeable)
4. **Additional Features** - Friends, clips, search, etc.
5. **Better Documentation** - Clear API reference
6. **No Security Risk** - No storing sensitive credentials

## Troubleshooting

### Common Issues:

1. **"OpenXBL API key not configured"**
   - Ensure `.env.local` exists with `OPENXBL_API_KEY`
   - Restart your development server after changes

2. **"OpenXBL API request failed"**
   - Check your API key is correct
   - Verify you're signed into Xbox Live on https://xbl.io/
   - Check rate limits (150 requests/hour on free tier)

3. **"Xbox API is disabled"**
   - Set `XBOX_API_ENABLED=true` in `.env.local`
   - Restart your development server

4. **Sample data still showing**
   - The app gracefully falls back to sample data when API fails
   - Check console for specific error messages
   - Ensure environment variables are set correctly

### Debug Mode:

To see detailed API logs, check:
- **Browser Console:** `F12` → Console tab
- **Terminal:** Your `npm run dev` output

Look for:
- 🔗 `Making OpenXBL request to: /endpoint`
- ✅ `OpenXBL request successful for: /endpoint`

## Production Deployment

For production deployments:

1. **Add environment variables to your hosting platform:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Other platforms: Check their documentation

2. **Set the following variables:**
   ```env
   OPENXBL_API_KEY=your_api_key_here
   XBOX_API_ENABLED=true
   ```

3. **Consider upgrading your OpenXBL plan** for higher rate limits in production

## API Rate Limits

OpenXBL API rate limits:
- **Free Tier:** 150 requests/hour
- **Paid Tiers:** Higher limits available
- Automatic error handling and fallback included
- Rate limit information in response headers

## Advanced Usage

### View Another User's Data
You can display another user's Xbox data by:

1. **Get their XUID** using the search endpoint
2. **Use XUID parameter** in API calls
3. **Set XBOX_TARGET_XUID** environment variable for default user

### Search Users
```javascript
// Search for users by gamertag
const response = await fetch('/api/xbox', {
  method: 'POST',
  body: JSON.stringify({
    action: 'searchUser',
    gamertag: 'some_gamertag'
  })
});
```

## Need Help?

If you encounter issues:

1. Check the browser console for error messages
2. Verify your `.env.local` configuration
3. Test your API key at https://xbl.io/console
4. Check OpenXBL documentation at https://xbl.io/docs
5. Ensure your development server was restarted after env changes

---

**Ready to go!** Your OpenXBL integration is now configured with API key: `1a85c542-8f2a-4569-8fad-0eaf1cbedd6d`

Visit your gamehome page to see your real Xbox data in action! 🎮 