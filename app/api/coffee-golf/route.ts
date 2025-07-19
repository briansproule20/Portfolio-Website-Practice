import { google } from 'googleapis';
import { NextResponse, NextRequest } from 'next/server';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const SHEET_ID = '1c9P1VYCyp3OfeubvXwhf0jU46gb1ZIcnoyRPIRnLCqs';
const DAILY_RANGE = 'A1:Z1000'; // Daily scores range (including headers) - expanded to catch more columns

export async function GET(req: NextRequest) {
  try {
    // Check if credentials are available
    if (!process.env.GOOGLE_CLIENT_EMAIL_GOLF || !process.env.GOOGLE_PRIVATE_KEY_GOLF) {
      console.error('Missing Google credentials:', {
        hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL_GOLF,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY_GOLF
      });
      return NextResponse.json({ 
        error: 'Missing Google credentials',
        stats: [],
        dailyData: []
      });
    }

    console.log('Attempting to authenticate with Google...');
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL_GOLF,
        private_key: process.env.GOOGLE_PRIVATE_KEY_GOLF?.replace(/\\n/g, '\n'),
      },
      scopes: SCOPES,
    });

    console.log('Fetching data from Google Sheets...');
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Fetch daily data
    const dailyResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: DAILY_RANGE,
    });

    const dailyRows = dailyResponse.data.values || [];
    
    console.log('Raw daily rows from sheet:', dailyRows.slice(0, 3)); // Log first 3 rows to see structure

    // Process daily data
    const dailyData = [];
    const today = new Date();
    
    // Helper function to parse date string (M/D/YY format)
    const parseDate = (dateStr: string) => {
      const [month, day, year] = dateStr.split('/').map(Number);
      return new Date(2000 + year, month - 1, day);
    };
    
    if (dailyRows.length > 1) {
      const headers = dailyRows[0];
      const dataRows = dailyRows.slice(1);
      
      // Define metadata columns to exclude
      const metadataColumns = ['Winning Score', 'Winner(s)', 'Daily Ptcpt Ct.', 'Daily Avg'];
      
      for (const row of dataRows) {
        if (row && row.length >= 1 && row[0]) {
          const rowDate = row[0];
          
          // Only include data up to today
          try {
            const parsedRowDate = parseDate(rowDate);
            if (parsedRowDate > today) {
              continue;
            }
          } catch (error) {
            // If date parsing fails, skip this row
            continue;
          }
          
          const dayData = { date: row[0] };
          
          // Add player scores (starting from column B), excluding metadata columns
          for (let i = 1; i < Math.min(headers.length, row.length); i++) {
            const playerName = headers[i] || `Player${i}`;
            
            // Skip metadata columns
            if (metadataColumns.includes(playerName)) {
              continue;
            }
            
            const score = row[i];
            (dayData as any)[playerName] = score === 'DNF' ? null : (parseInt(score) || null);
          }
          
          dailyData.push(dayData);
        }
      }
    }

    // Filter out metadata columns and only include actual player columns
    const playerColumns = dailyRows.length > 0 ? dailyRows[0].slice(1).filter((col: string) => {
      const metadataColumns = ['Winning Score', 'Winner(s)', 'Daily Ptcpt Ct.', 'Daily Avg'];
      return !metadataColumns.includes(col);
    }) : [];

    return NextResponse.json({ 
      stats: [], // Stats will be calculated on the client side
      dailyData,
      players: playerColumns // Only actual player names
    });
  } catch (error) {
    console.error('Detailed error in coffee golf API:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      credentials: {
        hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL_GOLF,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY_GOLF
      }
    });
    
    return NextResponse.json({ 
      error: 'Failed to fetch coffee golf stats',
      stats: [],
      dailyData: []
    });
  }
}
