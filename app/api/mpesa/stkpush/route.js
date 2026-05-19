import { NextResponse } from 'next/server';

// Safaricom Daraja API Endpoints (Production or Sandbox environment)
const TOKEN_URL = 'https://sandbox.safaricom.co.uk/oauth/v1/generate?grant_type=client_credentials';
const STK_PUSH_URL = 'https://sandbox.safaricom.co.uk/mpesa/stkpush/v1/processrequest';

export async function POST(request) {
  try {
    const { phone, amount, examId, subject } = await request.json();

    // 1. Pull your secure credentials from your Vercel Environment Variables
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const businessShortCode = process.env.MPESA_SHORTCODE; // e.g., Till Number or Paybill
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;    // Where Safaricom sends success/fail receipts

    // Fail early if keys are missing from environment settings
    if (!consumerKey || !consumerSecret || !businessShortCode || !passkey) {
      return NextResponse.json(
        { errorMessage: "Server is missing M-PESA API credentials configuration keys." },
        { status: 500 }
      );
    }

    // 2. FETCH ACCESS TOKEN FROM SAFARICOM
    const authCredentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    
    const tokenResponse = await fetch(TOKEN_URL, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${authCredentials}`,
      },
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Safaricom Token Error:', errorText);
      return NextResponse.json({ errorMessage: 'Failed to generate Safaricom access token.' }, { status: 500 });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 3. GENERATE THE REQUIRED SECURITY ENCRYPTION METADATA
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14); // Format: YYYYMMDDHHmmss
    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString('base64');

    // 4. PREPARE THE STK PUSH PAYLOAD
    const stkPayload = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline', // Works for both Paybills and Buy Goods Till numbers
      Amount: Math.round(amount),
      PartyA: phone, // User's phone number formatting (2547XXXXXXXX)
      PartyB: businessShortCode,
      PhoneNumber: phone,
      CallBackURL: `${callbackUrl}?examId=${examId}`, // Attach file tracker to match the payment on arrival
      AccountReference: 'ElevatePredictions',
      TransactionDesc: `Payment for ${subject} exam booklet`,
    };

    // 5. TRIGGER THE LIVE POPUP ON USER'S MOBILE DEVICE
    const stkResponse = await fetch(STK_PUSH_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkPayload),
    });

    const stkData = await stkResponse.json();

    if (stkResponse.ok) {
      // Returns ResponseCode "0" back to the frontend to signal success
      return NextResponse.json(stkData);
    } else {
      console.error('Safaricom STK Push Error:', stkData);
      return NextResponse.json({ errorMessage: stkData.errorMessage || 'STK Push rejected by Daraja.' }, { status: stkResponse.status });
    }

  } catch (error) {
    console.error('Internal M-PESA Route Error:', error);
    return NextResponse.json({ errorMessage: 'Internal server payment execution error.' }, { status: 500 });
  }
}
