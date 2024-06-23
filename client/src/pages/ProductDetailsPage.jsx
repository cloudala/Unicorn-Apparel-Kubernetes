import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ProductDetails from '../components/ProductDetails';
import Loading from '../components/Loading';

export default function ProductDetailsPage() {
  const { id } = useParams()
  const { data, loading, error } = useFetch(
    `http://localhost:4000/api/products/${id}`
  );

  return (
    <>
      {loading ? (
        <Loading/>
      ) : !error ? (
        <ProductDetails product={data.product}/>
      ) : (
        <p>Error fetching data</p>
      )}
    </>
  );
}