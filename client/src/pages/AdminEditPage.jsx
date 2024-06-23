import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import AdminProductDetails from '../components/AdminProductDetails';
import Loading from '../components/Loading';

export default function AdminEditPage() {
  const { id } = useParams()
  const { data, loading, error } = useFetch(
    `http://localhost:4000/api/products/${id}`
  );

  return (
    <>
      {loading ? (
        <Loading/>
      ) : !error ? (
        <AdminProductDetails product={data.product}/>
      ) : (
        <p>Error fetching data</p>
      )}
    </>
  );
}