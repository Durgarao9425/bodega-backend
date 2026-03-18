const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ----- Helper: Generate a 6-digit OTP -----
function generateOTP() {
  // Math.random() gives 0.0 to 0.999...
  // Multiply by 900000 and add 100000 → range 100000 to 999999
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ----- Helper: Create JWT Token -----
function createToken(userId) {
  return jwt.sign(
    { userId }, // payload (data inside the token)
    process.env.JWT_SECRET, // secret key from .env
    { expiresIn: '7d' } // token expires in 7 days
  );
}

// ===========================================================
// POST /api/auth/send-otp
// Step 1: User enters phone number → we generate & store OTP
// ===========================================================
router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    // Basic validation
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Generate OTP
    const otp = generateOTP();

    // OTP expires in 5 minutes
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    // Find existing user by phone OR create a new user
    let user = await User.findOne({ phone });

    if (user) {
      // Existing user → just update their OTP
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    } else {
      // New user → create account
      user = new User({ phone, otp, otpExpiry });
      await user.save();
    }

    // In real app, we would send SMS here.
    // We simulate by returning OTP in response (for demo only)
    console.log(`📱 OTP for ${phone}: ${otp}`); // visible in backend terminal

    res.status(200).json({
      message: 'OTP sent successfully',
      // Return OTP only in development mode (for testing)
      otp: process.env.NODE_ENV === 'development' ? otp : undefined,
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ===========================================================
// POST /api/auth/verify-otp
// Step 2: User enters OTP → we verify and return JWT token
// ===========================================================
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Basic validation
    if (!phone || !otp) {
      return res.status(400).json({ message: 'Phone and OTP are required' });
    }

    // Find the user
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please request OTP first.' });
    }

    // Check if OTP is correct
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    // Check if OTP has expired
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // OTP is valid → clear it from DB (one-time use)
    user.otp = null;
    user.otpExpiry = null;
    user.isVerified = true;
    await user.save();

    // Create JWT token for this user
    const token = createToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        phone: user.phone,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;
