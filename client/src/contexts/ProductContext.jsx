import { createContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { data, loading, error } = useFetch(
      'http://localhost:4000/api/products'
    );
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
      if (!loading && !error) {
        setProducts(data.products);
      }
    }, [loading, error, data]);

    return (
    <ProductContext.Provider
        value={{
        products,
        setProducts,
        loading,
        error
        }}
    >
        {children}
    </ProductContext.Provider>
    );
};
