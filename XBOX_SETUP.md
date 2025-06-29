# Xbox Live API Integration Setup

This guide will help you integrate your Xbox Live account with your portfolio website to display real gaming data.

## ⚠️ Important Security Notice

**Never commit your Xbox credentials to version control!** Always use environment variables and ensure `.env.local` is in your `.gitignore`.

## Step 1: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Xbox Live API Configuration
XBOX_EMAIL=your.email@example.com
XBOX_PASSWORD=your_xbox_password

# Optional: For faster authentication (not yet implemented)
XBOX_REFRESH_TOKEN=

# Enable/disable Xbox API (set to 'true' to enable)
XBOX_API_ENABLED=false
```

## Step 2: Test the Integration

1. **Set your credentials:**
   ```env
   XBOX_EMAIL=your.actual.email@example.com
   XBOX_PASSWORD=your_actual_password
   XBOX_API_ENABLED=true
   ```

2. **Restart your development server:**
   ```bash
   npm run dev
   ```

3. **Visit your gamehome page:** `http://localhost:3000/gamehome`

## Step 3: Monitor the Integration

Check your browser console and terminal for Xbox Live API status:

### Success Indicators:
- ✅ `Xbox Live authentication successful`
- ✅ `Fetched X games and Y achievements`
- Your real gamertag appears in the stats
- Your actual games show up in the gallery

### Error Indicators:
- ❌ `Xbox authentication failed`
- ❌ `Xbox API Error:`
- Red error message appears on the page
- Sample games are displayed instead

## API Endpoints

The integration creates these API endpoints:

### `GET /api/xbox`
Fetches comprehensive Xbox Live data including:
- User profile (gamertag, gamerscore, achievement count)
- Game library (last 30 games)
- Recent achievements

### `POST /api/xbox`
Supports various actions:
- `authenticate` - Manual authentication
- `getProfile` - Get user profile only
- `getGames` - Get game library only
- `getAchievements` - Get recent achievements only

## Features

### ✅ Currently Working:
- Xbox Live authentication
- Profile data (gamertag, gamerscore)
- Game library fetching
- Achievement data
- Error handling with fallback to sample data
- Achievement tickers with real data

### 🚧 Future Enhancements:
- Refresh token support for faster authentication
- Game cover art from Xbox APIs
- More detailed achievement analytics
- Caching to reduce API calls
- Rate limiting protection

## Troubleshooting

### Common Issues:

1. **"Xbox credentials not configured"**
   - Ensure `.env.local` exists and has correct variable names
   - Restart your development server after changes

2. **"Failed to authenticate with Xbox Live"**
   - Check your email/password are correct
   - Ensure your Xbox account doesn't have 2FA enabled (not currently supported)
   - Try logging into Xbox.com manually to verify credentials

3. **"Xbox API is disabled"**
   - Set `XBOX_API_ENABLED=true` in `.env.local`
   - Restart your development server

4. **Sample data still showing**
   - The app gracefully falls back to sample data when Xbox API fails
   - Check console for specific error messages
   - Ensure environment variables are set correctly

### Debug Mode:

To see detailed API logs, check:
- **Browser Console:** `F12` → Console tab
- **Terminal:** Your `npm run dev` output

## Security Best Practices

1. **Never commit `.env.local`** - It should be in `.gitignore`
2. **Use app passwords** if your account supports them
3. **Consider refresh tokens** for production deployments
4. **Monitor API usage** to avoid rate limits

## Production Deployment

For production deployments:

1. **Add environment variables to your hosting platform:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Other platforms: Check their documentation

2. **Set `XBOX_API_ENABLED=true`** in production environment

3. **Consider implementing caching** to reduce API calls

## API Rate Limits

Xbox Live APIs have rate limits. The integration includes:
- Automatic error handling
- Graceful fallback to sample data
- Console logging for monitoring

## Need Help?

If you encounter issues:

1. Check the browser console for error messages
2. Verify your `.env.local` configuration
3. Test your Xbox credentials manually at Xbox.com
4. Ensure your development server was restarted after env changes

---

**Ready to enable Xbox Live integration?** Set `XBOX_API_ENABLED=true` in your `.env.local` and restart your server! 