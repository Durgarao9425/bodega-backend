require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const Product = require('./src/models/Product');

// Sugar & salt products to ADD to Groceries category
const SUGAR_SALT_PRODUCTS = [
  { name: 'Sugar', price: 45, originalPrice: 50, unit: '1kg', category: 'Groceries', subcategory: 'Sugar & salt', stock: 100, image: 'https://images.unsplash.com/photo-1584807907519-6cb0ea45f7c7?auto=format&fit=crop&w=400&h=400&q=80', description: 'Pure white refined sugar, perfect for daily use.' },
  { name: 'Kajal Jaggery', price: 60, originalPrice: 70, unit: '500g', category: 'Groceries', subcategory: 'Sugar & salt', stock: 80, image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=400&h=400&q=80', description: 'Natural Kajal brand jaggery.' },
  { name: 'Laxmi Jaggery', price: 55, originalPrice: 65, unit: '500g', category: 'Groceries', subcategory: 'Sugar & salt', stock: 80, image: 'https://images.unsplash.com/photo-1550039207-a7d8e2f4efd7?auto=format&fit=crop&w=400&h=400&q=80', description: 'Premium Laxmi brand jaggery.' },
  { name: 'Jaggery Powder', price: 65, originalPrice: 75, unit: '500g', category: 'Groceries', subcategory: 'Sugar & salt', stock: 70, image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=400&h=400&q=80', description: 'Fine jaggery powder, ideal for sweets and beverages.' },
  { name: 'Salt', price: 20, originalPrice: 25, unit: '1kg', category: 'Groceries', subcategory: 'Sugar & salt', stock: 200, image: 'https://images.unsplash.com/photo-1579958732684-b3f6d2ed33e3?auto=format&fit=crop&w=400&h=400&q=80', description: 'Iodised refined salt for cooking.' },
];

// Fix Pooja items subcategory inconsistency (Pooja Items vs Pooja items)
async function fixPoojaSubcategory() {
  const r = await Product.updateMany(
    { subcategory: 'Pooja Items' },
    { $set: { subcategory: 'Pooja items' } }
  );
  console.log(`✓ Normalized "Pooja Items" → "Pooja items": ${r.modifiedCount} products`);
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected');

  // 1. Fix Pooja subcategory capitalisation
  await fixPoojaSubcategory();

  // 2. Add Sugar & salt products (skip if already exist to avoid duplicates)
  for (const p of SUGAR_SALT_PRODUCTS) {
    const exists = await Product.findOne({ name: p.name, category: 'Groceries', subcategory: 'Sugar & salt' });
    if (!exists) {
      await Product.create(p);
      console.log(`✓ Added: ${p.name}`);
    } else {
      console.log(`- Already exists: ${p.name}`);
    }
  }

  console.log('\n✅ Done');
  await mongoose.disconnect();
}

run().catch(console.error);
