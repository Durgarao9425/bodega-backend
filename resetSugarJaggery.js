require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const Product = require('./src/models/Product');

// REPLACING BLOCKED PIXABAY URLS WITH WORKING UNSPLASH EQUIVALENTS
const REMOVED_PRODUCTS = [
  'Sulfur Free Sugar',
  'Laxmi Premium Jaggery',
  'Fine Jaggery Powder',
  'Maggi Noodles 560g',        // Requested for removal
  'Kajal Jaggery Block',        // Old name
  'Pure White Sugar',           // Requested for removal
  'Sugar',                      // New name requested for removal
  'Bourbon',                    // Requested for removal
  'Parle-G 800g'                // Requested for removal
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected');

  // CLEANUP: Delete any sugar/jaggery items by name and any with "Sugar & Jaggery" subcategory
  const namesToClear = [...REMOVED_PRODUCTS];
  await Product.deleteMany({
    $or: [
      { name: { $in: namesToClear } },
      { subcategory: 'Sugar & Jaggery' }
    ]
  });
  console.log(`🗑 Wiped all sugar and jaggery related products.`);

  console.log('✅ Done');
  await mongoose.disconnect();
}

run().catch(console.error);
