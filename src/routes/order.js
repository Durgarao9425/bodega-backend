const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/order/create
// @desc    Create a new order & clear cart (cart cleared on frontend typically)
// @access  Private
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { items, deliveryAddress, subTotal, deliveryFee, totalAmount, paymentMethod } = req.body;
    
    const newOrder = new Order({
      user: req.user.id,
      items,
      deliveryAddress,
      subTotal,
      deliveryFee,
      totalAmount,
      paymentMethod
    });

    await newOrder.save();
    
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// @route   GET /api/order/my-orders
// @desc    Get logged in user orders
// @access  Private
router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
