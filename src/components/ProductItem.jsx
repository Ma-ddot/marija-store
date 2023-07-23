import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { StoreContext, DELETE_PRODUCT } from '../context/contextStore';

const ProductItem = ({ product }) => {
  const { dispatch } = useContext(StoreContext);
  const history = useHistory();

  const handleDelete = (id) => {
    
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.id);
        dispatch({ type: DELETE_PRODUCT, payload: id });
      });
  };

  return (
    <div className="product-item">
      <h2>{product.title}</h2>
      <p>Price: {product.price}</p>
      <img src={product.image} alt={product.title} />
      <Link to={`/product/${product.id}`}>View Details</Link>
      <button onClick={() => history.goBack()}>Go back</button>
      <button onClick={() => handleDelete(product.id)}>Delete</button>
    </div>
  );
};

export default ProductItem;
