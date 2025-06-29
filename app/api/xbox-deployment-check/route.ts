import { NextResponse } from 'next/server';

export async function GET() {
  const xboxConfig = {
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    envVarsPresent: {
      OPENXBL_API_KEY: !!process.env.OPENXBL_API_KEY,
      XBOX_API_ENABLED: process.env.XBOX_API_ENABLED,
      VERCEL: !!process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV || 'not-set'
    },
    apiKeyLength: process.env.OPENXBL_API_KEY ? process.env.OPENXBL_API_KEY.length : 0,
    apiKeyPreview: process.env.OPENXBL_API_KEY ? 
      `${process.env.OPENXBL_API_KEY.substring(0, 8)}...${process.env.OPENXBL_API_KEY.substring(process.env.OPENXBL_API_KEY.length - 4)}` : 
      'not-set'
  };

  // Test OpenXBL API connection if configured
  let apiTest = null;
  if (process.env.OPENXBL_API_KEY && process.env.XBOX_API_ENABLED === 'true') {
    try {
      const response = await fetch('https://xbl.io/api/v2/account', {
        headers: {
          'X-Authorization': process.env.OPENXBL_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        apiTest = {
          status: 'success',
          responseStatus: response.status,
          hasProfileData: !!data.profileUsers,
          profileCount: data.profileUsers?.length || 0
        };
      } else {
        const errorText = await response.text();
        apiTest = {
          status: 'error',
          responseStatus: response.status,
          error: errorText.substring(0, 200) // Limit error text length
        };
      }
    } catch (error) {
      apiTest = {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  } else {
    apiTest = {
      status: 'not-configured',
      reason: !process.env.OPENXBL_API_KEY ? 'Missing OPENXBL_API_KEY' : 
              process.env.XBOX_API_ENABLED !== 'true' ? 'XBOX_API_ENABLED not set to true' : 
              'Unknown configuration issue'
    };
  }

  return NextResponse.json({
    success: true,
    xboxConfig,
    apiTest,
    message: apiTest.status === 'success' 
      ? '✅ Xbox API is working perfectly in deployment!' 
      : apiTest.status === 'not-configured'
      ? '⚠️ Xbox API not configured properly'
      : '❌ Xbox API configuration error'
  });
} 