import { createClient } from '@sanity/client';
import twilio from 'twilio';

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone, categories } = req.body;

  if (!phone || !categories || categories.length === 0) {
    return res.status(400).json({ error: 'Phone and at least one category required' });
  }

  try {
    // Check if subscriber already exists
    const existing = await sanity.fetch(
      '*[_type == "subscriber" && phone == $phone][0]',
      { phone }
    );

    if (existing) {
      // Update their categories
      await sanity.patch(existing._id).set({ categories }).commit();
    } else {
      // Create new subscriber
      await sanity.create({
        _type: 'subscriber',
        phone,
        categories,
        subscribedAt: new Date().toISOString(),
        active: true,
      });
    }

    // Send welcome text
    const categoryNames = {
      forum: 'The Forum',
      edit: 'The Edit',
      shop: 'The Shop',
      hisNotHers: 'His Not Hers',
      guide: 'The Guide',
    };

    const selectedNames = categories.map(function (c) {
      return categoryNames[c] || c;
    }).join(', ');

    await twilioClient.messages.create({
      body: "Welcome to Tallest Tiptoes! You'll get texts when there's something new in: " + selectedNames + ". Reply STOP to unsubscribe.",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
