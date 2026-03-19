require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const Product = require('./src/models/Product');

const ADDITIONAL_PRODUCTS = [
  // Households - Soaps & body wash
  { name: 'Dove Beauty Bar 100g', price: 65, unit: '100g', category: 'Households', subcategory: 'Soaps & body wash', stock: 100, image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=400&h=400&q=80', description: 'Moisturizing beauty bar soap.' },
  { name: 'Dettol Soap Original 75g', price: 40, unit: '75g', category: 'Households', subcategory: 'Soaps & body wash', stock: 150, image: 'https://images.unsplash.com/photo-158d928424268-ac5637243292?auto=format&fit=crop&w=400&h=400&q=80', description: 'Antiseptic germ protection soap.' },
  // Households - Pasta & noodles
  { name: 'Yippee Noodles 240g', price: 45, unit: '240g', category: 'Households', subcategory: 'Pasta & noodles', stock: 110, image: 'https://images.unsplash.com/photo-1612845347250-9833cb9e2a63?auto=format&fit=crop&w=400&h=400&q=80', description: 'Instant masala noodles.' },
  // Testing cat - Other Items
  { name: 'Spare Charger', price: 299, unit: '1 Unit', category: 'Testing cat', subcategory: 'Other Items', stock: 30, image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&h=400&q=80', description: 'Universal fast charger.' },
  // Groceries - Sugar & salt (More jaggery variants)
  { name: 'Sugar (Sulfur Free)', price: 50, unit: '1kg', category: 'Groceries', subcategory: 'Sugar & salt', stock: 90, image: 'https://images.unsplash.com/photo-1584807907519-6cb0ea45f7c7?auto=format&fit=crop&w=400&h=400&q=80', description: 'Superior quality sulfur-free sugar.' },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected');

  for (const p of ADDITIONAL_PRODUCTS) {
    const exists = await Product.findOne({ name: p.name, category: p.category, subcategory: p.subcategory });
    if (!exists) {
      await Product.create(p);
      console.log(`✓ Added: ${p.name} to ${p.subcategory}`);
    } else {
      console.log(`- Already exists: ${p.name}`);
    }
  }

  // Final subcategory rename to "Other Items" for any remaining Testing cat products
  const testCatRes = await Product.updateMany(
    { category: 'Testing cat', subcategory: { $in: ['', null, 'Testing cat'] } },
    { $set: { subcategory: 'Other Items' } }
  );
  console.log(`✓ Normalized "Testing cat" subcategories: ${testCatRes.modifiedCount} updated`);

  console.log('\n✅ Done');
  await mongoose.disconnect();
}

run().catch(console.error);
