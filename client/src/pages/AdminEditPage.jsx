import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import AdminProductDetails from '../components/AdminProductDetails';
import Loading from '../components/Loading';

export default function AdminEditPage() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams()
  const { data, loading, error } = useFetch(
    `${apiUrl}/products/${id}`
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