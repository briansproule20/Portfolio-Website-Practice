import { NextResponse } from 'next/server';

// Vercel KV import with fallback
let kv: any = null;
try {
  kv = require('@vercel/kv').kv;
} catch (error) {
  console.log('Vercel KV not available');
}

export async function GET() {
  const deploymentInfo = {
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    kvAvailable: !!kv,
    envVarsPresent: {
      KV_REST_API_URL: !!process.env.KV_REST_API_URL,
      KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
      VERCEL: !!process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV || 'not-set'
    }
  };

  // Test KV connection if available
  let kvTest = null;
  if (kv && process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      // Test write
      await kv.set('deployment-test', { timestamp: deploymentInfo.timestamp, test: 'success' });
      
      // Test read
      const testData = await kv.get('deployment-test');
      
      // Test delete
      await kv.del('deployment-test');
      
      kvTest = {
        status: 'success',
        writeRead: 'ok',
        testData: testData
      };
    } catch (error) {
      kvTest = {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  } else {
    kvTest = {
      status: 'not-configured',
      reason: 'Missing KV credentials or KV not available'
    };
  }

  return NextResponse.json({
    success: true,
    deployment: deploymentInfo,
    kvTest: kvTest,
    message: kvTest.status === 'success' 
      ? '✅ KV is working perfectly in deployment!' 
      : kvTest.status === 'not-configured'
      ? '⚠️ KV not configured (using fallback storage)'
      : '❌ KV configuration error'
  });
} 