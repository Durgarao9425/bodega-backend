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
  // New items with unsupported images
  'Candle Pack Big',
  'Multipurpose Kitchen Scissors',
  'Coriander Leaves Bundles',
  'Potatoes 2kg Pack',
  'Head & Shoulders Cool Menthol',
  'Cetaphil Gentle Skin Cleanser',
  'Surf Excel Liquid Detergent 1L',
  "Kellogg's Chocos 375g",
  'Besan (Gram Flour) 1kg',
  'Moong Dal Split 1kg',
  'Figaro Olive Oil 500ml',
  'Dhara Groundnut Oil 1L',
  'Engine Mustard Oil 1L',
  '1 L',
  // Second list of items with unsupported images
  'Black Raisins 250g',
  'Dried Apricots 200g',
  'Rice Flour 1kg',
  'Safal Green Peas Frozen',
  'Honey Spread Premium',
  'Wild Stone Men\'s Face Wash',
  'Garbage Bags Large 30ct',
  'Colin Glass Cleaner',
  'Bagrry\'s Corn Flakes Box',
  'Nestle Honey Stars',
  'Indulekha Bringha Ayurvedic Oil',
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
