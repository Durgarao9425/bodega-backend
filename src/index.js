// Load environment variables from .env file
require('dotenv').config();

// Workaround for 'querySrv ECONNREFUSED' MongoDB Atlas connection error
const dns = require('dns');
const Product = require('./models/Product');
const seedData = require('./seed/seedProducts').products;
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
  console.log('✅ DNS servers set for MongoDB connection');
} catch (e) {
  console.warn('⚠️ Could not set DNS servers, proceeding with default.');
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express app
const app = express();

// Set port early so we can log it if needed
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====

// Support local development and standard Render settings
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:3000',
  'https://bodega-frontend-phi.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      // In case of any origin mismatch during production/dev transitions,
      // allow this origin but log it for debugging
      console.warn(`Allowed origin through fallback: ${origin}`);
      callback(null, true);
    }
  },
  credentials: true,
}));

// Parse incoming JSON request bodies
app.use(express.json());

// Import our route files
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');

// ===== ROUTES =====
// Root route (for quick testing)
app.get('/', (req, res) => {
  res.send('Bodega Clone API - Server is working! Please use /api/health for health check.');
});

// Mount our routes at specific paths
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);

// Health check route - useful to test if server is running
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Bodega API is running!', 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'not set'
  });
});

// ===== CONNECT TO MONGODB =====
console.log('⏳ Attempting to connect to MongoDB...');

if (!process.env.MONGO_URI) {
  console.error('❌ CRITICAL ERROR: MONGO_URI is not defined in environment variables.');
  console.error('Available keys:', Object.keys(process.env).join(', '));
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    // AUTO-SEED: Check if products exist, seed if not (for demo purposes)
    try {
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('🌱 Database empty. Seeding products...');
        await Product.insertMany(seedData);
        console.log(`✅ Seeded ${seedData.length} products!`);
      } else {
        console.log(`📡 Products already online: ${count}`);
      }
    } catch (err) {
      console.warn('⚠️ Auto-seed failed:', err.message);
    }

    // Start the server only after DB connection is successful
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 Access via http://localhost:${PORT} or your Render URL`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed!');
    console.error('Error details:', error.message);
    process.exit(1); // Exit if DB connection fails
  });

