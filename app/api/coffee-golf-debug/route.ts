import { NextResponse } from 'next/server';
import { COFFEE_GOLF_CONFIG, getGoogleSheetsData } from '../../../lib/coffee-golf-utils';

export async function GET() {
  try {
    // Check configuration
    const config = {
      spreadsheetId: COFFEE_GOLF_CONFIG.SPREADSHEET_ID,
      sheetName: COFFEE_GOLF_CONFIG.SHEET_NAME,
      hasServiceAccountKey: !!COFFEE_GOLF_CONFIG.SERVICE_ACCOUNT_KEY,
      serviceAccountEmail: COFFEE_GOLF_CONFIG.SERVICE_ACCOUNT_EMAIL
    };

    if (!COFFEE_GOLF_CONFIG.SERVICE_ACCOUNT_KEY) {
      return NextResponse.json({
        error: 'Google Service Account key not configured',
        config
      });
    }

    // Fetch raw data from Google Sheets using service account
    const data = await getGoogleSheetsData();
    
    return NextResponse.json({
      success: true,
      config,
      rawData: data,
      rowCount: data.values?.length || 0,
      headers: data.values?.[0] || [],
      sampleRows: data.values?.slice(1, 3) || [] // First 2 data rows for debugging
    });

  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      error: 'Debug failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      config: {
        spreadsheetId: COFFEE_GOLF_CONFIG.SPREADSHEET_ID,
        sheetName: COFFEE_GOLF_CONFIG.SHEET_NAME,
        hasServiceAccountKey: !!COFFEE_GOLF_CONFIG.SERVICE_ACCOUNT_KEY
      }
    });
  }
} 