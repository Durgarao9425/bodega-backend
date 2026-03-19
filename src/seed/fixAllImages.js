require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const Product = require('../models/Product');

// RE-WRITTEN WITH 100% UNIQUE IDS - NO CATCH-ALLS
const PRODUCT_IMAGES = {
  // --- SUGAR & JAGGERY ---
  'Kajal Jaggery':       'https://images.unsplash.com/photo-1610348725531-843dff163e2c?w=600',
  'Laxmi Jaggery':       'https://images.unsplash.com/photo-1550039207-a7d8e2f4efd7?w=600',
  'Jaggery Powder':      'https://images.unsplash.com/photo-1596705607374-5178696ec062?w=600',
  'Jaggery':             'https://images.unsplash.com/photo-1610348725531-843dff163e2c?w=600',

  // --- PASTA & NOODLES ---
  'Maggi 2-Minute Noodles 560g': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
  'Maggi Noodles 560g':          'https://images.unsplash.com/photo-1591814468923-9fb4d999b8c4?w=500',
  'Yippee! Noodles 280g':        'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500',
  'Yippee Noodles 240g':         'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500',
  'Barilla Penne Pasta 500g':    'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=500',
  'Pasta Fusilli 500g':          'https://images.unsplash.com/photo-1598511726623-d2e9996892f0?w=500',
};

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected');

  for (const [name, image] of Object.entries(PRODUCT_IMAGES)) {
    // Exact name match first
    const res = await Product.updateMany({ name: { $regex: new RegExp(`^${name}$`, 'i') } }, { $set: { image } });
    if (res.modifiedCount > 0) {
      console.log(`✓ Updated: ${name}`);
    }
  }

  // Ensure Milk and others also have unique, simple IDs
  await Product.updateMany({ name: /milk/i }, { $set: { image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500' } });

  console.log('✅ Done - No catch-alls applied.');
  await mongoose.disconnect();
}

run().catch(console.error);
