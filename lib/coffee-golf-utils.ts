import { GoogleAuth } from 'google-auth-library';

export interface CoffeeGolfStats {
  player: string;
  totalRounds: number;
  averageScore: number;
  bestScore: number;
  worstScore: number;
  wins: number;
  top3Finishes: number;
  lastUpdated: string;
}

export const COFFEE_GOLF_CONFIG = {
  SPREADSHEET_ID: '1c9P1VYCyp3OfeubvXwhf0jU46gb1ZIcnoyRPIRnLCqs',
  SHEET_NAME: 'Stats', // Update this to match your actual sheet name
  SERVICE_ACCOUNT_EMAIL: 'coffeego123@coffeego-466421.iam.gserviceaccount.com',
  SERVICE_ACCOUNT_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
};

export function parseSpreadsheetData(values: any[][]): CoffeeGolfStats[] {
  if (!values || values.length < 2) {
    return [];
  }

  const headers = values[0];
  const rows = values.slice(1);

  // Log headers for debugging
  console.log('Spreadsheet headers:', headers);

  return rows
    .map((row, index) => {
      // Skip empty rows
      if (!row || row.length === 0 || !row[0]) {
        return null;
      }

      try {
        return {
          player: row[0] || 'Unknown Player',
          totalRounds: parseInt(row[1]) || 0,
          averageScore: parseFloat(row[2]) || 0,
          bestScore: parseInt(row[3]) || 0,
          worstScore: parseInt(row[4]) || 0,
          wins: parseInt(row[5]) || 0,
          top3Finishes: parseInt(row[6]) || 0,
          lastUpdated: row[7] || new Date().toISOString().split('T')[0]
        };
      } catch (error) {
        console.error(`Error parsing row ${index + 2}:`, error, row);
        return null;
      }
    })
    .filter((stat): stat is CoffeeGolfStats => stat !== null);
}

export async function getGoogleSheetsData(): Promise<any> {
  if (!COFFEE_GOLF_CONFIG.SERVICE_ACCOUNT_KEY) {
    throw new Error('Google Service Account key not configured');
  }

  const auth = new GoogleAuth({
    credentials: JSON.parse(COFFEE_GOLF_CONFIG.SERVICE_ACCOUNT_KEY),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${COFFEE_GOLF_CONFIG.SPREADSHEET_ID}/values/${COFFEE_GOLF_CONFIG.SHEET_NAME}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken.token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function validateStats(stats: CoffeeGolfStats[]): CoffeeGolfStats[] {
  return stats.filter(stat => {
    // Basic validation
    return (
      stat.player &&
      stat.player !== 'Unknown Player' &&
      stat.totalRounds >= 0 &&
      stat.averageScore >= 0 &&
      stat.bestScore >= 0 &&
      stat.worstScore >= 0 &&
      stat.wins >= 0 &&
      stat.top3Finishes >= 0
    );
  });
} 