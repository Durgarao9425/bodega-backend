require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// Workaround for MongoDB Atlas DNS resolution
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

// All images use Unsplash (verified working, no CORS issues)
const products = [
  // ─── Households → Detergents & Cleaning ───
  {
    name: "Surf Excel Liquid Detergent 1L",
    description: "Premium liquid detergent for front load washing machines. Removes tough stains easily.",
    price: 320,
    originalPrice: 400,
    category: "Households",
    subcategory: "Detergents & Cleaning",
    unit: "1 Litre",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 50,
    rating: 4.8,
    reviews: 124
  },
  {
    name: "Ariel Matic Liquid Detergent",
    description: "Ariel matic liquid detergent for front loaders. Superior clean in cold water.",
    price: 150,
    originalPrice: 190,
    category: "Households",
    subcategory: "Detergents & Cleaning",
    unit: "500ml",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 80,
    rating: 4.6,
    reviews: 210
  },
  {
    name: "Lizol Floor Cleaner Citrus",
    description: "Citrus fragrance floor cleaner, kills 99.9% germs. Fresh scent all day.",
    price: 220,
    originalPrice: 250,
    category: "Households",
    subcategory: "Detergents & Cleaning",
    unit: "2 Litres",
    image: "https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 200,
    rating: 4.8,
    reviews: 320
  },
  {
    name: "Vim Dishwash Liquid Lemon",
    description: "Tough on grease, gentle on hands. Cuts through grease in seconds.",
    price: 89,
    originalPrice: 110,
    category: "Households",
    subcategory: "Detergents & Cleaning",
    unit: "750ml",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 150,
    rating: 4.5,
    reviews: 180
  },
  {
    name: "Harpic Toilet Cleaner",
    description: "Powerful toilet bowl cleaner that removes stains and kills germs under the rim.",
    price: 95,
    originalPrice: 120,
    category: "Households",
    subcategory: "Detergents & Cleaning",
    unit: "500ml",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 120,
    rating: 4.7,
    reviews: 290
  },

  // ─── Households → Facewash & skincare ───
  {
    name: "Himalaya Neem Facewash 200ml",
    description: "Natural neem and turmeric for clear, pimple-free skin. Prevents outbreaks.",
    price: 180,
    originalPrice: 210,
    category: "Households",
    subcategory: "Facewash & skincare",
    unit: "200ml",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&h=400",
    stock: 120,
    rating: 4.6,
    reviews: 500
  },
  {
    name: "Cetaphil Gentle Skin Cleanser",
    description: "Hydrating and soothing skin cleanser for all skin types. Soap-free formula.",
    price: 350,
    originalPrice: 420,
    category: "Households",
    subcategory: "Facewash & skincare",
    unit: "125ml",
    image: "https://images.unsplash.com/photo-1610444583849-01f2eab91de6?q=80&w=400&h=400",
    stock: 60,
    rating: 4.8,
    reviews: 800
  },

  // ─── Households → Hair care ───
  {
    name: "Tresemme Keratin Smooth Shampoo",
    description: "Professional keratin smooth shampoo for shiny, frizz-free hair.",
    price: 240,
    originalPrice: 300,
    category: "Households",
    subcategory: "Hair care",
    unit: "580ml",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&h=400",
    stock: 90,
    rating: 4.7,
    reviews: 350
  },

  // ─── Households → Breakfast & cereals ───
  {
    name: "Kellogg's Corn Flakes Original",
    description: "Iron-rich healthy breakfast with 8 essential vitamins.",
    price: 180,
    originalPrice: 200,
    category: "Households",
    subcategory: "Breakfast & cereals",
    unit: "875g",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=400&h=400",
    stock: 100,
    rating: 4.5,
    reviews: 430
  },

  // ─── Dairy & Eggs ───
  {
    name: "Amul Taaza Toned Milk 1L",
    description: "Fresh pasteurized toned milk, rich in calcium.",
    price: 72,
    originalPrice: 76,
    category: "Dairy & Eggs",
    subcategory: "Milk",
    unit: "1 Litre",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 100,
    rating: 4.9,
    reviews: 810
  },
  {
    name: "Amul Butter 100g",
    description: "Rich and creamy butter made from fresh milk.",
    price: 58,
    originalPrice: 60,
    category: "Dairy & Eggs",
    subcategory: "Butter & Cheese",
    unit: "100g",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 250,
    rating: 4.8,
    reviews: 500
  },
  {
    name: "Farm Fresh Brown Eggs (Pack of 6)",
    description: "Healthy and organic brown eggs rich in protein.",
    price: 85,
    originalPrice: 100,
    category: "Dairy & Eggs",
    subcategory: "Eggs",
    unit: "6 Eggs",
    image: "https://images.unsplash.com/photo-1506976773555-b38a08c5c7db?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 50,
    rating: 4.6,
    reviews: 120
  },

  // ─── Beverages ───
  {
    name: "Coca-Cola Original 750ml",
    description: "Refreshing cold drink to accompany your meals.",
    price: 40,
    originalPrice: 45,
    category: "Beverages",
    subcategory: "Cold Drinks",
    unit: "750ml",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 100,
    rating: 4.5,
    reviews: 800
  },
  {
    name: "Tropicana 100% Orange Juice 1L",
    description: "Natural orange juice with no added sugar.",
    price: 110,
    originalPrice: 130,
    category: "Beverages",
    subcategory: "Juices",
    unit: "1 Litre",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 80,
    rating: 4.7,
    reviews: 320
  },

  // ─── Groceries → Rice, Poha & Sabhudana ───
  {
    name: "Basmati Rice 5kg",
    description: "Extra long grain aged basmati rice from premium farms in Punjab.",
    price: 650,
    originalPrice: 850,
    category: "Groceries",
    subcategory: "Rice, Poha & Sabhudana",
    unit: "5 kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 80,
    rating: 4.7,
    reviews: 430
  },
  {
    name: "Poha Thin 500g",
    description: "Thin flattened rice, perfect for breakfast poha.",
    price: 45,
    originalPrice: 55,
    category: "Groceries",
    subcategory: "Rice, Poha & Sabhudana",
    unit: "500g",
    image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 200,
    rating: 4.4,
    reviews: 115
  },

  // ─── Groceries → Aata, maida, besan & sooji ───
  {
    name: "Aashirvaad Whole Wheat Atta 5kg",
    description: "Premium chakki fresh atta made from finest wheat grains.",
    price: 210,
    originalPrice: 240,
    category: "Groceries",
    subcategory: "Aata, maida, besan & sooji",
    unit: "5 kg",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 120,
    rating: 4.8,
    reviews: 900
  },
  {
    name: "Besan (Chickpea Flour) 1kg",
    description: "Pure gram flour for making pakoras, besan chilla and more.",
    price: 85,
    originalPrice: 100,
    category: "Groceries",
    subcategory: "Aata, maida, besan & sooji",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 150,
    rating: 4.5,
    reviews: 230
  },

  {
    name: "Chana Dal 1kg",
    description: "Split bengal gram dal, ideal for dal recipes and snacks.",
    price: 95,
    originalPrice: 115,
    category: "Groceries",
    subcategory: "Dals, Pulses & Grains",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 180,
    rating: 4.6,
    reviews: 310
  },

  // ─── Groceries → Masala & Spices ───
  {
    name: "MDH Kitchen King Masala",
    description: "Blend of premium spices for all sabzi preparations.",
    price: 55,
    originalPrice: 70,
    category: "Groceries",
    subcategory: "Masala & Spices",
    unit: "100g",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 400,
    rating: 4.8,
    reviews: 650
  },
  {
    name: "Everest Garam Masala 100g",
    description: "Aromatic whole spice blend for biryanis, curries and gravies.",
    price: 48,
    originalPrice: 60,
    category: "Groceries",
    subcategory: "Masala & Spices",
    unit: "100g",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 350,
    rating: 4.7,
    reviews: 490
  },

  // ─── Groceries → Oil & Ghee ───
  {
    name: "Fortune Sunflower Oil 1L",
    description: "Light and healthy refined sunflower oil with natural vitamins.",
    price: 145,
    originalPrice: 160,
    category: "Groceries",
    subcategory: "Oil & Ghee",
    unit: "1 Litre",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 250,
    rating: 4.6,
    reviews: 340
  },
  {
    name: "Amul Pure Ghee 500ml",
    description: "100% pure cow ghee with traditional taste and aroma.",
    price: 340,
    originalPrice: 390,
    category: "Groceries",
    subcategory: "Oil & Ghee",
    unit: "500ml",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 100,
    rating: 4.9,
    reviews: 720
  },

  // ─── Fruits & Vegetables → Vegetables ───
  {
    name: "Fresh Tomatoes 1kg",
    description: "Farm fresh red tomatoes, rich in lycopene and antioxidants.",
    price: 45,
    originalPrice: 60,
    category: "Fruits & Vegetables",
    subcategory: "Vegetables",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 100,
    rating: 4.5,
    reviews: 120
  },
  {
    name: "Fresh Onions 1kg",
    description: "Crispy fresh red onions from Nashik farms.",
    price: 35,
    originalPrice: 50,
    category: "Fruits & Vegetables",
    subcategory: "Vegetables",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 200,
    rating: 4.4,
    reviews: 95
  },
  {
    name: "Green Capsicum 250g",
    description: "Crunchy and fresh green bell peppers rich in Vitamin C.",
    price: 30,
    originalPrice: 40,
    category: "Fruits & Vegetables",
    subcategory: "Vegetables",
    unit: "250g",
    image: "https://images.unsplash.com/photo-1509622905150-fa66d3906e09?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 80,
    rating: 4.3,
    reviews: 55
  },

  // ─── Fruits & Vegetables → Fresh Fruits ───
  {
    name: "Washington Red Apples 1kg",
    description: "Premium sweet and crunchy red apples imported from Washington.",
    price: 240,
    originalPrice: 280,
    category: "Fruits & Vegetables",
    subcategory: "Fresh Fruits",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 50,
    rating: 4.8,
    reviews: 85
  },
  {
    name: "Bananas 1 Dozen",
    description: "Fresh ripe yellow bananas, rich in potassium and natural energy.",
    price: 60,
    originalPrice: 80,
    category: "Fruits & Vegetables",
    subcategory: "Fruits",
    unit: "12 pieces",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 120,
    rating: 4.6,
    reviews: 145
  },
  {
    name: "Sweet Oranges 1kg",
    description: "Juicy Nagpur oranges packed with Vitamin C.",
    price: 95,
    originalPrice: 120,
    category: "Fruits & Vegetables",
    subcategory: "Fruits",
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 80,
    rating: 4.7,
    reviews: 110
  },

  // ─── Dry Fruits ───
  {
    name: "Premium Almonds 500g",
    description: "Crunchy Californian almonds, rich in protein, fiber and healthy fats.",
    price: 450,
    originalPrice: 600,
    category: "Dry Fruits",
    subcategory: "Premium Nuts",
    unit: "500g",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 45,
    rating: 4.9,
    reviews: 200
  },
  {
    name: "Cashews W240 250g",
    description: "Jumbo size whole cashews, creamy and delicious.",
    price: 280,
    originalPrice: 350,
    category: "Dry Fruits",
    subcategory: "Premium Nuts",
    unit: "250g",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 60,
    rating: 4.8,
    reviews: 175
  },
  {
    name: "Premium Walnuts 250g",
    description: "Brain-shaped walnuts rich in Omega-3 and antioxidants.",
    price: 320,
    originalPrice: 400,
    category: "Dry Fruits",
    subcategory: "Premium Nuts",
    unit: "250g",
    image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 40,
    rating: 4.7,
    reviews: 130
  },

  // ─── Testing cat → Other Items ───
  {
    name: "Multipurpose Kitchen Scissors",
    description: "Stainless steel sharp scissors for kitchen and household use.",
    price: 120,
    originalPrice: 150,
    category: "Testing cat",
    subcategory: "Other Items",
    unit: "1 piece",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400&h=400",
    stock: 20,
    rating: 4.5,
    reviews: 15
  },
];

async function seedProducts() {
  try {
    const uri = process.env.MONGO_URI;
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri || 'mongodb://localhost:27017/bodega_clone');
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🧹 Cleared existing products');

    const inserted = await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${inserted.length} products!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

module.exports = { products, seedProducts };
