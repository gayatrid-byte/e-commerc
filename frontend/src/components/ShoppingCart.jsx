import React, { useState, useEffect } from 'react';
import '../styles/ShoppingCart.css';

export default function ShoppingCart({ items, onRemoveItem, onUpdateQuantity, onCheckout, onContinueShopping }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!email || !phone || !address || !city || !state || !zip) {
      alert('Please fill in all shipping details');
      return;
    }

    setIsCheckingOut(true);

    const checkoutData = {
      items: items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: parseFloat(calculateTotal()),
      email,
      phone,
      address,
      city,
      state,
      zip
    };

    onCheckout(checkoutData);
    setIsCheckingOut(false);
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to get started!</p>
        <button className="btn btn-continue" onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="shopping-cart-container">
      <div className="cart-items">
        <h2>Shopping Cart ({items.length} items)</h2>
        <div className="items-list">
          {items.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="item-info">
                <h4>{item.productName}</h4>
                <p>${item.price}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => onUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="btn btn-remove"
                onClick={() => onRemoveItem(item._id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${calculateTotal()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${calculateTotal()}</span>
          </div>
        </div>
      </div>

      <div className="checkout-form">
        <h2>Checkout</h2>
        <form onSubmit={handleCheckout}>
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>State *</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>ZIP Code *</label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-checkout"
            disabled={isCheckingOut}
          >
            {isCheckingOut ? 'Processing...' : 'Complete Purchase'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </form>
      </div>
    </div>
  );
}
