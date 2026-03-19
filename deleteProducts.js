require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const Product = require('./src/models/Product');

// Products the user wants permanently removed from the website
const PRODUCTS_TO_DELETE = [
  // Pooja items to remove
  'Pooja Thali Set',
  // Breakfast/cereals to remove
  "Kellogg's Corn Flakes 500g",
  'Muesli 400g',
  'Chocos 250g',
  // Oral care to remove
  'Sensodyne Repair',
  'CloseUp Red Hot',
  'Listerine Mouthwash 250ml',
  // Skincare to remove
  'Nivea Body Milk 400ml',
  'Gillette Mach 3 Razor',
  'Ponds White Beauty Cream 50g',
  // Dairy to remove
  'Farm Fresh Brown Eggs (Pack of 6)',
  // Groceries to remove
  'Chana Dal 1kg',
  'Sabhudana (Sago) 500g',
  'Sona Masoori Rice 5kg',
  'Maida (Refined Flour) 1kg',
  'Coriander Powder 200g',
  'Garam Masala 100g',
  'Rajma (Kidney Beans) 500g',
  'Sunflower Oil 1L',
  // Fruits & Veg to remove
  'Pomegranate',
  'Tomatoes',
  'Green Capsicum',
  'Fresh Potatoes',
  'Brass Diya',
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  let totalDeleted = 0;

  for (const name of PRODUCTS_TO_DELETE) {
    const result = await Product.deleteMany({ name });
    if (result.deletedCount > 0) {
      console.log(`🗑  Deleted: "${name}" (${result.deletedCount} doc(s))`);
      totalDeleted += result.deletedCount;
    } else {
      console.log(`⚠  Not found: "${name}"`);
    }
  }

  console.log(`\n✅ Done — ${totalDeleted} products deleted from database`);
  await mongoose.disconnect();
  console.log('Disconnected.');
}

run().catch(console.error);
