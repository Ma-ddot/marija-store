import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StoreContext, UPDATE_PRODUCT } from '../context/contextStore';
import '../styles.css';

const EditProduct = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { id } = useParams();
  const product = state.products.find((item) => item.id === parseInt(id));

  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    image: product.image,
    description: product.description,
  });

  const handleEditProduct = () => {
    const updatedProductData = {
      id: product.id,
      title: formData.title,
      price: formData.price,
      image: formData.image,
      description: formData.description,
    };

    dispatch({ type: UPDATE_PRODUCT, payload: updatedProductData });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container edit-product">
      <h2>Edit Product</h2>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        
        <button type="button" onClick={handleEditProduct} className="link-button">
          Save Changes
        </button>
        <Link to="/" className="link-button">
          Go back
        </Link>
      </form>
    </div>
  );
};

export default EditProduct;
