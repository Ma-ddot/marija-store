import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { StoreContext, DELETE_PRODUCT } from '../context/contextStore';
import '../styles.css';

const ProductList = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
        const data = response.data;
        dispatch({ type: 'SET_PRODUCTS', payload: data.products });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  const { products } = state;

  if (!products || products.length === 0) {
    return <div className="container">No products available</div>;
  }

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`https://dummyjson.com/products/${productId}`)
      .then(() => {
        dispatch({ type: DELETE_PRODUCT, payload: productId });
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className="container">
      <h2>Product List</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <h3>{product.title}</h3>
            <p>Price: {product.price}</p>
            <img src={product.thumbnail} alt={product.title} />
            <Link to={`/product/${product.id}`} className="link-button">
              View Details
            </Link>
            <Link to={`/product/edit/${product.id}`} className="link-button">
              Edit Product
            </Link>
            <button className="link-button" onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
