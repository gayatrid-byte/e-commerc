import React from 'react';
import '../styles/ProductDetails.css';

export default function ProductDetails({ product, onAddToCart, onClose }) {
  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <div className="product-details">
          <div className="details-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="details-info">
            <h1>{product.name}</h1>

            <div className="rating">
              <span className="stars">⭐ {product.rating}</span>
              <span className="reviews">({product.reviews} reviews)</span>
            </div>

            <div className="category">
              <span className="category-badge">{product.category}</span>
            </div>

            <div className="price-section">
              <span className="price">${product.price}</span>
              <span className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="features">
              <h3>Features</h3>
              <ul>
                <li>High Quality Product</li>
                <li>Fast Shipping Available</li>
                <li>30-Day Money Back Guarantee</li>
                <li>Free Returns</li>
              </ul>
            </div>

            <div className="actions">
              <button
                className="btn btn-add-to-cart"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-cancel"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
