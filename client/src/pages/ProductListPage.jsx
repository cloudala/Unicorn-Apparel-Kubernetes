import { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';

export default function ProductListPage() {
  const { products, loading, error } = useContext(ProductContext);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : !error ? (
        <ProductList products={products}/>
      ) : (
        <p>Error fetching data</p>
      )}
    </>
  );
}