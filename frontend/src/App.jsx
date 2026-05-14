import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import OrderSuccess from './components/OrderSuccess';
import ProductDetails from './components/ProductDetails';
import axios from 'axios';
import './App.css';

export default function App() {
  const [page, setPage] = useState('products');
  const [cartItems, setCartItems] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [order, setOrder] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Initialize session ID
  useEffect(() => {
    const id = 'session-' + Date.now();
    setSessionId(id);
    loadCart(id);
  }, []);

  // Load cart from backend
  const loadCart = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/cart/${id}`);
      setCartItems(response.data.data.items || []);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  // Add product to cart
  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(`${API_URL}/api/cart/${sessionId}/add`, {
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity: 1
      });
      setCartItems(response.data.data.items);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axios.delete(`${API_URL}/api/cart/${sessionId}/remove/${itemId}`);
      setCartItems(response.data.data.items);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  };

  // Update cart item quantity
  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      const response = await axios.put(`${API_URL}/api/cart/${sessionId}/update/${itemId}`, {
        quantity
      });
      setCartItems(response.data.data.items);
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  // Checkout
  const handleCheckout = async (checkoutData) => {
    try {
      const response = await axios.post(`${API_URL}/api/orders/checkout`, checkoutData);
      if (response.data.success) {
        setOrder(response.data.data);
        setCartItems([]);
        setPage('order-success');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  // View product details
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>🛍️ E-Commerce Store</h1>
          </div>
          <nav className="nav">
            <button
              className={`nav-btn ${page === 'products' ? 'active' : ''}`}
              onClick={() => setPage('products')}
            >
              Products
            </button>
            <button
              className={`nav-btn ${page === 'cart' ? 'active' : ''}`}
              onClick={() => setPage('cart')}
            >
              Cart ({cartItems.length})
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {page === 'products' && (
          <ProductList
            onAddToCart={handleAddToCart}
            onViewProduct={handleViewProduct}
          />
        )}

        {page === 'cart' && (
          <ShoppingCart
            items={cartItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={handleCheckout}
            onContinueShopping={() => setPage('products')}
          />
        )}

        {page === 'order-success' && order && (
          <OrderSuccess
            order={order}
            onContinueShopping={() => {
              setPage('products');
              setOrder(null);
            }}
          />
        )}
      </main>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <footer className="footer">
        <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
