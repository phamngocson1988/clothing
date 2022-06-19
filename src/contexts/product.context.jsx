import { useState, createContext } from 'react';
import PRODUCTS from '../shop-data.json';

export const ProductContext = createContext({
  products: [],

});

export const ProductsProvider = ({childrent}) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };
  return (
    <ProductContext.Provider value={value}>{childrent}</ProductContext.Provider>
  )
}