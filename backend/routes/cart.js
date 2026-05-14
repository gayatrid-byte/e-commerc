const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get cart
router.get('/:sessionId', cartController.getCart);

// Add item to cart
router.post('/:sessionId/add', cartController.addToCart);

// Remove item from cart
router.delete('/:sessionId/remove/:itemId', cartController.removeFromCart);

// Update cart item quantity
router.put('/:sessionId/update/:itemId', cartController.updateCartItem);

// Clear cart
router.delete('/:sessionId/clear', cartController.clearCart);

module.exports = router;
