const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

// ===========================================================
// GET /api/products
// Get all products with optional filtering
// Query params: ?category=Fruits&search=apple
// ===========================================================
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;

    // Build the filter object
    let filter = { isActive: true };

    // If category is provided, filter by it (case-insensitive)
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    // If search term is provided, search in name and description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Fetch products from database
    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Products fetched successfully',
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('Get Products Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ===========================================================
// GET /api/products/categories
// Get all unique category names
// ===========================================================
router.get('/categories', async (req, res) => {
  try {
    // Get distinct category values from all active products
    const categories = await Product.distinct('category', { isActive: true });

    res.status(200).json({
      message: 'Categories fetched successfully',
      categories,
    });
  } catch (error) {
    console.error('Get Categories Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ===========================================================
// GET /api/products/:id
// Get a single product by its ID
// ===========================================================
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product fetched successfully',
      product,
    });
  } catch (error) {
    console.error('Get Product Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
