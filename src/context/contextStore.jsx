import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case UPDATE_PRODUCT:
      const updatedProducts = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      return { ...state, products: updatedProducts };
    case DELETE_PRODUCT:
      const filteredProducts = state.products.filter((product) => product.id !== action.payload);
      return { ...state, products: filteredProducts };
    default:
      return state;
  }
};

const initialState = {
  products: null, 
};

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const data = response.data;
        dispatch({ type: SET_PRODUCTS, payload: data.products });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export { StoreContext, StoreProvider, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT };
