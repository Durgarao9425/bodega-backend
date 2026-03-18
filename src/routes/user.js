const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/user/me
// @desc    Get user profile & wishlist
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-otp -otpExpiry');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile (Name, email)
// @access  Private
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    await user.save();

    res.json({ message: 'Profile updated', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/user/wishlist
// @desc    Toggle item in wishlist
// @access  Private
router.post('/wishlist', authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);
    
    const index = user.wishlist.indexOf(productId);
    if (index > -1) {
      user.wishlist.splice(index, 1); // remove
    } else {
      user.wishlist.push(productId); // add
    }

    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/user/address
// @desc    Add a new address
// @access  Private
router.post('/address', authMiddleware, async (req, res) => {
  try {
    const { fullName, mobile, addressLine1, flatNo, type } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.addresses.push({ fullName, mobile, addressLine1, flatNo, type: type || 'Home' });
    await user.save();
    res.json({ addresses: user.addresses });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/user/addresses
// @desc    Get user addresses
// @access  Private
router.get('/addresses', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ addresses: user ? user.addresses : [] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
