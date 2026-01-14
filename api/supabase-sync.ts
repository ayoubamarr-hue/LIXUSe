import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests from Supabase Webhooks
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { type, record } = req.body;

    // Only process new orders (INSERT events)
    if (type !== 'INSERT') {
      return res.status(200).json({ message: 'Skipped: Not an INSERT event' });
    }

    // Initialize Google Auth using your Service Account credentials
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Connect to your specific Google Sheet
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);
    await doc.loadInfo();
    
    // Select the first tab (Untitled spreadsheet in your screenshot)
    const sheet = doc.sheetsByIndex[0];

    // Append the Supabase record. 
    // Important: Column names in your Sheet must match your Supabase columns exactly.
    await sheet.addRow(record);

    return res.status(200).json({ message: 'Success: Row added to Google Sheet' });

  } catch (error: any) {
    console.error('Webhook Error:', error);
    return res.status(500).json({ error: error.message });
  }
}