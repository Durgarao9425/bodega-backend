const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');

// All cart routes require the user to be logged in
// authMiddleware checks the JWT token

// ===========================================================
// GET /api/cart
// Get the current user's cart
// ===========================================================
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Find cart for this user, and populate product details
    let cart = await Cart.findOne({ user: req.userId }).populate('items.product');

    // If no cart exists yet, return empty cart
    if (!cart) {
      return res.status(200).json({
        message: 'Cart is empty',
        cart: { items: [], totalPrice: 0 },
      });
    }

    res.status(200).json({
      message: 'Cart fetched successfully',
      cart,
    });
  } catch (error) {
    console.error('Get Cart Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ===========================================================
// POST /api/cart/add
// Add a product to the cart (or increase quantity if exists)
// Body: { productId, quantity }
// ===========================================================
router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find or create cart for this user
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      // Create a new cart for this user
      cart = new Cart({
        user: req.userId,
        items: [],
      });
    }

    // Check if this product is already in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Product already in cart → just increase the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // New product → add it to the cart
      cart.items.push({
        product: productId,
        quantity,
        price: product.price, // store current price
      });
    }

    await cart.save();

    // Return updated cart with product details
    cart = await Cart.findById(cart._id).populate('items.product');

    res.status(200).json({
      message: 'Product added to cart',
      cart,
    });
  } catch (error) {
    console.error('Add to Cart Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ===========================================================
// PUT /api/cart/update
// Update quantity of an item in the cart
// Body: { productId, quantity }
// ===========================================================
router.put('/update', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    // Find the user's cart
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      // If quantity becomes 0 or less, remove the item
      cart.items.splice(itemIndex, 1);
    } else {
      // Update the quantity
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    // Return updated cart with product details
    cart = await Cart.findById(cart._id).populate('items.product');

    res.status(200).json({
      message: 'Cart updated successfully',
      cart,
    });
  } catch (error) {
    console.error('Update Cart Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ===========================================================
// DELETE /api/cart/remove/:productId
// Remove an item completely from the cart
// ===========================================================
router.delete('/remove/:productId', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the user's cart
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the item we want to remove
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    // Return updated cart with product details
    cart = await Cart.findById(cart._id).populate('items.product');

    res.status(200).json({
      message: 'Item removed from cart',
      cart,
    });
  } catch (error) {
    console.error('Remove from Cart Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ===========================================================
// DELETE /api/cart/clear
// Clear all items from the cart
// ===========================================================
router.delete('/clear', authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.userId });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({
      message: 'Cart cleared successfully',
      cart: { items: [], totalPrice: 0 },
    });
  } catch (error) {
    console.error('Clear Cart Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
