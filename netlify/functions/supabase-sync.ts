import { Handler } from '@netlify/functions';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const handler: Handler = async (event) => {
  // 1. Validate Request Method
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ message: 'Method Not Allowed' }) 
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');

    // 2. Filter for INSERT events only
    // Supabase webhooks send: { type: 'INSERT', table: '...', record: { ... } }
    if (payload.type !== 'INSERT') {
      return { 
        statusCode: 200, 
        body: JSON.stringify({ message: 'Skipped: Not an INSERT event' }) 
      };
    }

    const newRecord = payload.record;

    // 3. Initialize Google Auth
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      throw new Error('Missing Google Configuration in Environment Variables');
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      // Netlify env vars often escape newlines, so we replace literal \n with actual newlines
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // 4. Load the Document
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // 5. Select the first sheet (tab)
    const sheet = doc.sheetsByIndex[0];

    // 6. Append the Row
    // The keys in 'newRecord' must match the Header Row in your Google Sheet exactly.
    await sheet.addRow(newRecord);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success: Row added to Google Sheet' }),
    };

  } catch (error: any) {
    console.error('Webhook Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to sync data', 
        details: error.message 
      }),
    };
  }
};