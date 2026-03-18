const mongoose = require('mongoose');

// User Schema - stores user info with phone number login
const userSchema = new mongoose.Schema(
  {
    // Phone number is the primary identifier (like bodegaa.in)
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    // OTP for simulated verification
    otp: {
      type: String,
      default: null,
    },
    // OTP expiry time (5 minutes)
    otpExpiry: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    addresses: [{
      fullName: { type: String, required: true },
      mobile: { type: String, required: true },
      addressLine1: { type: String, required: true },
      flatNo: { type: String, required: true },
      type: { type: String, default: 'Home' }
    }]
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('User', userSchema);
