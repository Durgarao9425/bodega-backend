const mongoose = require('mongoose');

// Cart Item schema (sub-document inside Cart)
const cartItemSchema = new mongoose.Schema({
  // Reference to the product
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  // How many of this product
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  // Price at the time it was added to cart
  price: {
    type: Number,
    required: true,
  },
});

// Cart Schema - one cart per user
const cartSchema = new mongoose.Schema(
  {
    // Which user does this cart belong to
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // one cart per user
    },
    // Array of items in the cart
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

// Virtual field to calculate total price automatically
cartSchema.virtual('totalPrice').get(function () {
  return this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

// Include virtuals when converting to JSON
cartSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Cart', cartSchema);
