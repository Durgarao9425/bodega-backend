const mongoose = require('mongoose');

// Product Schema - stores all product information
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    // Original price before discount
    originalPrice: {
      type: Number,
      default: null,
    },
    // Category the product belongs to (e.g., Fruits, Dairy, Beverages)
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    // Available stock quantity
    stock: {
      type: Number,
      default: 100,
    },
    unit: {
      type: String,
      default: 'piece', // e.g., kg, litre, piece, pack
    },
    // Is this product currently active/visible
    isActive: {
      type: Boolean,
      default: true,
    },
    // Tags for search and filtering
    tags: [String],
    rating: {
      type: Number,
      default: 4.0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
