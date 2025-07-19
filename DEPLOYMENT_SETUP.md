# Coffee Golf Dashboard - Deployment Setup

## 🔧 Environment Variables Required

Set these in your deployment platform (Vercel, Netlify, etc.):

```bash
GOOGLE_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"
```

## 📋 Google Service Account Setup

### 1. Create Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Go to "IAM & Admin" > "Service Accounts"
5. Click "Create Service Account"
6. Name it "coffee-golf-api"
7. Grant "Editor" role
8. Create and download the JSON key file

### 2. Extract Credentials
From the downloaded JSON file, extract:
- `client_email` → `GOOGLE_CLIENT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY` (keep the quotes and \n characters)

### 3. Share Google Sheet
1. Open your Coffee Golf Google Sheet
2. Click "Share" button
3. Add your service account email (from GOOGLE_CLIENT_EMAIL)
4. Give it "Editor" permissions

## 🚀 Deployment Platforms

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Go to Project Settings > Environment Variables
3. Add the two environment variables above
4. Deploy!

### Netlify
1. Connect your GitHub repo to Netlify
2. Go to Site Settings > Environment Variables
3. Add the two environment variables above
4. Deploy!

### Other Platforms
- Add the environment variables in your platform's settings
- Make sure to include the quotes around GOOGLE_PRIVATE_KEY

## 🔍 Troubleshooting

### Common Issues:
1. **500 Error**: Check environment variables are set correctly
2. **403 Error**: Make sure service account has access to the Google Sheet
3. **Module not found**: This should be fixed now - the API route is self-contained

### Testing:
- Test locally first: `npm run dev`
- Check API endpoint: `curl http://localhost:3000/api/coffee-golf`
- Verify data loads in browser: `http://localhost:3000/coffee-golf`

## 📊 Current Status
- ✅ API route working locally
- ✅ Charts rendering with immutable data
- ✅ All export functionality removed
- ✅ Performance page fixed
- ⏳ Ready for deployment with proper environment variables 