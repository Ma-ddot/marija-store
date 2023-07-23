import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext, ADD_PRODUCT } from '../context/contextStore';
import '../styles.css';

const AddProduct = () => {
  const { dispatch } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault(); 

    
    dispatch({ type: ADD_PRODUCT, payload: formData });
  };

  return (
    <div className="container add-product">
      <h2>Add Product</h2>
      <form className="form-container" onSubmit={handleAddProduct}>
        {Object.keys(formData).map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}
        <button type="submit" className="link-button">
          Add Product
        </button>
      </form>
      <Link to="/" className="link-button">
        Go back
      </Link>
    </div>
  );
};

export default AddProduct;
