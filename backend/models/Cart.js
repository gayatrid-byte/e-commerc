const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      unique: true,
      required: true
    },
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        addedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    totalItems: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true, expiresIn: 2592000 } // 30 days expiration
);

module.exports = mongoose.model('Cart', CartSchema);
