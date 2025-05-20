import { google } from 'googleapis';
import { NextResponse, NextRequest } from 'next/server';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const SHEET_ID = '1c6zdCUsDR_oMYe1ZJBxDujmSjtYXUMRKROyUkr72z0Q';
const RANGE = 'A2:L1000'; // Adjust range as needed

export async function GET(req: NextRequest) {
  try {
    // Check if credentials are available
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google credentials:', {
        hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY
      });
      return NextResponse.json({ 
        error: 'Missing Google credentials',
        books: [
          {
            title: "The Midnight Library",
            author: "Matt Haig",
            description: "A fascinating exploration of life's infinite possibilities and the choices that shape our existence."
          },
          {
            title: "Project Hail Mary",
            author: "Andy Weir",
            description: "An interstellar adventure that combines scientific accuracy with heartwarming friendship."
          },
          {
            title: "Klara and the Sun",
            author: "Kazuo Ishiguro",
            description: "A beautiful meditation on artificial intelligence, love, and what it means to be human."
          }
        ]
      });
    }

    // Check for 'all=true' query param
    const url = req.url || '';
    const showAll = url.includes('all=true');

    console.log('Attempting to authenticate with Google...');
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: SCOPES,
    });

    console.log('Fetching data from Google Sheets...');
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values || [];
    console.log('Raw rows from sheet:', rows.slice(0, 3)); // Log first 3 rows to see structure
    
    // Title is in column 2 (index 1), Author in column 3 (index 2)
    const validRows = rows.filter(row => {
      const isValid = row && row.length >= 3 && row[1] && row[2];
      if (!isValid) {
        console.log('Invalid row:', row);
      }
      return isValid;
    });
    
    console.log('Valid rows found:', validRows.length);
    console.log('First valid row:', validRows[0]);
    
    let books;
    if (showAll) {
      books = validRows.map(row => ({
        title: row[1] || '',
        author: row[2] || '',
        pages: row[11] || '',
        year: row[4] || '',
        rating: row[5] || '',
        description: row[4] || '', // Comments column (adjust if needed)
      }));
    } else {
      const lastThreeBooks = validRows.slice(-3).reverse(); // Get last 3 and reverse for chronological order
      books = lastThreeBooks.map(row => ({
        title: row[1] || '',
        author: row[2] || '',
        pages: row[11] || '',
        year: row[4] || '',
        rating: row[5] || '',
        description: row[4] || '', // Comments column (adjust if needed)
      }));
    }

    return NextResponse.json({ books });
  } catch (error) {
    console.error('Detailed error in reading API:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      credentials: {
        hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY
      }
    });
    
    // Return fallback data in case of error
    return NextResponse.json({ 
      error: 'Failed to fetch reading data',
      books: [
        {
          title: "The Midnight Library",
          author: "Matt Haig",
          description: "A fascinating exploration of life's infinite possibilities and the choices that shape our existence."
        },
        {
          title: "Project Hail Mary",
          author: "Andy Weir",
          description: "An interstellar adventure that combines scientific accuracy with heartwarming friendship."
        },
        {
          title: "Klara and the Sun",
          author: "Kazuo Ishiguro",
          description: "A beautiful meditation on artificial intelligence, love, and what it means to be human."
        }
      ]
    });
  }
} 