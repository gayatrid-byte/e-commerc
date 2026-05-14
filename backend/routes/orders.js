const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Get all orders
router.get('/', orderController.getAllOrders);

// Get order by ID
router.get('/:id', orderController.getOrderById);

// Get orders by email
router.get('/email/:email', orderController.getOrdersByEmail);

// Create order
router.post('/', orderController.createOrder);

// Checkout cart and create order
router.post('/checkout', orderController.checkoutCart);

// Update order status
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;
