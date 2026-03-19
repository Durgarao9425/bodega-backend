// Load environment variables from .env file
require('dotenv').config();

// Workaround for 'querySrv ECONNREFUSED' MongoDB Atlas connection error
const dns = require('dns');
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
  origin: allowedOrigins.length > 0 ? allowedOrigins : '*', // Fallback to all for debugging if none provided
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
  .then(() => {
    console.log('✅ Connected to MongoDB');
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

