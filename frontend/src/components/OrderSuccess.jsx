import React from 'react';
import '../styles/OrderSuccess.css';

export default function OrderSuccess({ order, onContinueShopping }) {
  return (
    <div className="order-success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase</p>

        <div className="order-details">
          <div className="detail-row">
            <span>Order ID:</span>
            <span className="order-id">{order.orderId}</span>
          </div>
          <div className="detail-row">
            <span>Total Amount:</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
          <div className="detail-row">
            <span>Status:</span>
            <span className="status">{order.status}</span>
          </div>
          <div className="detail-row">
            <span>Payment Status:</span>
            <span className="payment-status">{order.paymentStatus}</span>
          </div>
        </div>

        <div className="shipping-info">
          <h3>Shipping Address</h3>
          <p>
            {order.shippingAddress.street}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
            {order.shippingAddress.country}
          </p>
        </div>

        <div className="items-summary">
          <h3>Items ({order.items.length})</h3>
          {order.items.map((item, index) => (
            <div key={index} className="item-summary">
              <span>{item.productName} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <p className="confirmation-email">
          A confirmation email has been sent to {order.customerEmail}
        </p>

        <button
          className="btn btn-continue-shopping"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
