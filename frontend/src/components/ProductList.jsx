import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductList.css';

export default function ProductList({ onAddToCart, onViewProduct }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProducts();
  }, [category, sort]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/api/products`;
      const params = new URLSearchParams();

      if (category) params.append('category', category);
      if (sort) params.append('sort', sort);

      if (params.toString()) {
        url += '?' + params.toString();
      }

      const response = await axios.get(url);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to load products. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-list-container">
      <div className="filters">
        <div className="filter-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="no-products">No products found</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="description">{product.description.substring(0, 50)}...</p>
                <div className="rating">
                  ⭐ {product.rating} ({product.reviews} reviews)
                </div>
                <div className="price-stock">
                  <span className="price">${product.price}</span>
                  <span className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
                <div className="product-actions">
                  <button
                    className="btn btn-view"
                    onClick={() => onViewProduct(product)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-cart"
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
