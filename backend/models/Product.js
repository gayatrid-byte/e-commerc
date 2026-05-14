const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300'
    },
    category: {
      type: String,
      enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'],
      default: 'Electronics'
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    reviews: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
