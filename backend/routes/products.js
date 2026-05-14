const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products with filtering and sorting
router.get('/', productController.getAllProducts);

// Get product categories
router.get('/categories', productController.getCategories);

// Get single product
router.get('/:id', productController.getProductById);

// Create product (Admin)
router.post('/', productController.createProduct);

// Update product (Admin)
router.put('/:id', productController.updateProduct);

// Delete product (Admin)
router.delete('/:id', productController.deleteProduct);

module.exports = router;
