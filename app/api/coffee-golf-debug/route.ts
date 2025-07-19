import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables without exposing sensitive data
    const envCheck = {
      hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL_GOLF,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY_GOLF,
      clientEmailLength: process.env.GOOGLE_CLIENT_EMAIL_GOLF?.length || 0,
      privateKeyLength: process.env.GOOGLE_PRIVATE_KEY_GOLF?.length || 0,
      clientEmailStart: process.env.GOOGLE_CLIENT_EMAIL_GOLF?.substring(0, 10) || 'not set',
      privateKeyStart: process.env.GOOGLE_PRIVATE_KEY_GOLF?.substring(0, 20) || 'not set',
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('GOOGLE')).sort()
    };

    return NextResponse.json({
      message: 'Coffee Golf Debug Info',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      envCheck
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Debug endpoint failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 