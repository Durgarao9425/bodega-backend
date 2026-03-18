// Load environment variables from .env file
require('dotenv').config();

// Workaround for 'querySrv ECONNREFUSED' MongoDB Atlas connection error
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import our route files
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const userRoutes = require('./routes/user'); // New: Import user routes

// Create an Express app
const app = express();

// ===== MIDDLEWARE =====

// Enable CORS so our React frontend (port 5173) can talk to our backend (port 5000)
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

// Parse incoming JSON request bodies
app.use(express.json());

const orderRoutes = require('./routes/order');

// ===== ROUTES =====
// Mount our routes at specific paths
app.use('/api/auth', authRoutes);        // /api/auth/send-otp, /api/auth/verify-otp
app.use('/api/products', productRoutes); // /api/products, /api/products/:id
app.use('/api/cart', cartRoutes);        // /api/cart, /api/cart/add, etc.
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);

// Health check route - useful to test if server is running
app.get('/api/health', (req, res) => {
  res.json({ message: 'Bodega API is running!', status: 'OK' });
});

// ===== CONNECT TO MONGODB =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    // Start the server only after DB connection is successful
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit if DB connection fails
  });
