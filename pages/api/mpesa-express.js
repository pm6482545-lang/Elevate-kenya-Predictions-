import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phoneNumber, amount, resourceId } = req.body;

  // 1. Format the phone number to 2547XXXXXXXX
  let formattedPhone = phoneNumber.trim().replace(/^(?:\+254|0|^)/, '254');
  if (formattedPhone.length !== 12) {
    return res.status(400).json({ error: 'Invalid phone number format.' });
  }

  // 2. Safaricom Credentials (loaded securely from backend variables later)
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const shortCode = process.env.MPESA_SHORTCODE; // Your Pochi shortcode
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL; // e.g., https://yourdomain.com/api/callback

  try {
    // 3. Generate OAuth Access Token from Safaricom
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenResponse = await fetch(
      'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 4. Generate Security Timestamp and Password
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    // 5. Send actual STK Push Request to Safaricom
    const stkResponse = await fetch(
      'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerBuyGoodsOnline', // Correct type for Pochi
          Amount: Math.round(amount),
          PartyA: formattedPhone,
          PartyB: shortCode, 
          PhoneNumber: formattedPhone,
          CallBackURL: callbackUrl,
          AccountReference: 'Elevate Predictions',
          TransactionDesc: `Purchase Resource ID ${resourceId}`,
        }),
      }
    );

    const stkData = await stkResponse.json();

    // 6. If Safaricom accepts the request, log it in Supabase as pending
    if (stkData.ResponseCode === '0') {
      const checkoutId = stkData.CheckoutRequestID;

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          phone_number: formattedPhone,
          amount: parseFloat(amount),
          status: 'pending',
          mpesa_checkout_request_id: checkoutId
        }])
        .select().single();

      if (orderError) throw orderError;

      await supabase
        .from('order_items')
        .insert([{ order_id: order.id, resource_id: resourceId }]);

      return res.status(200).json({ success: true, message: 'PIN prompt sent to phone.' });
    } else {
      return res.status(400).json({ error: stkData.ResponseDescription || 'STK Push failed.' });
    }

  } catch (error) {
    console.error('M-Pesa Integration Error:', error);
    return res.status(500).json({ error: 'Internal system checkout error.' });
  }
}
