import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../context/contextStore';
import '../styles.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { state } = useContext(StoreContext);

  
  if (state.products === null) {
    return <div className="container">Loading...</div>;
  }

 
  const product = state.products.find((product) => product.id === parseInt(id));

  
  if (!product) {
    return <div className="container">Product not found</div>;
  }

  return (
    <div className="container product-details">
      <h2>{product.title}</h2>
      <p>Price: {product.price}</p>
      <img src={product.image} alt={product.title} />
      <p>Description: {product.description}</p>
      <p>Discount: {product.discountPercentage}%</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      
      <div>
        <h3>Images:</h3>
        {product.images.map((img, index) => (
          <img key={index} src={img} alt={`Img ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
