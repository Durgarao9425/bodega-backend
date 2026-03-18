const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String }
      }
    ],
    deliveryAddress: {
      fullName: String,
      mobile: String,
      addressLine1: String,
      flatNo: String,
      type: String
    },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    subTotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
