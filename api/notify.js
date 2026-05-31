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

// Map Sanity document types to subscriber category IDs
const typeToCategory = {
  forumPost: 'forum',
  outfit: 'edit',
  product: 'shop',
  mensItem: 'hisNotHers',
  guide: 'guide',
};

const typeToSection = {
  forumPost: 'The Forum',
  outfit: 'The Edit',
  product: 'The Shop',
  mensItem: 'His Not Hers',
  guide: 'The Guide',
};

const typeToPath = {
  forumPost: '/the-forum',
  outfit: '/the-edit',
  product: '/the-shop',
  mensItem: '/his-not-hers',
  guide: '/the-guide',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook secret
  const secret = req.headers['x-webhook-secret'];
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { _type, title } = req.body;

  const category = typeToCategory[_type];
  if (!category) {
    return res.status(200).json({ message: 'Not a notifiable type' });
  }

  try {
    // Get all active subscribers who want this category
    const subscribers = await sanity.fetch(
      '*[_type == "subscriber" && active == true && $cat in categories]',
      { cat: category }
    );

    if (subscribers.length === 0) {
      return res.status(200).json({ message: 'No subscribers for this category' });
    }

    const section = typeToSection[_type] || 'Tallest Tiptoes';
    const path = typeToPath[_type] || '';
    const message = "New on " + section + ": " + (title || "Something new") + " \u2192 tallest-tiptoes.com" + path;

    // Send texts (with small delay between each to avoid rate limits)
    const results = [];
    for (const subscriber of subscribers) {
      try {
        await twilioClient.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: subscriber.phone,
        });
        results.push({ phone: subscriber.phone, status: 'sent' });
      } catch (err) {
        console.error('Failed to text ' + subscriber.phone, err.message);
        results.push({ phone: subscriber.phone, status: 'failed', error: err.message });

        // If number is invalid/unsubscribed, deactivate
        if (err.code === 21610 || err.code === 21614) {
          await sanity.patch(subscriber._id).set({ active: false }).commit();
        }
      }
    }

    return res.status(200).json({
      sent: results.filter(function (r) { return r.status === 'sent'; }).length,
      failed: results.filter(function (r) { return r.status === 'failed'; }).length,
      total: subscribers.length,
    });
  } catch (error) {
    console.error('Notify error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
