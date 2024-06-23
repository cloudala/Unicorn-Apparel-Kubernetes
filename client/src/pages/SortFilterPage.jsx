import { useReducer, useEffect, useContext } from 'react';
import useFetch from '../hooks/useFetch';
import SortFilterProducts from '../components/SortFIlterProducts';
import ProductList from '../components/ProductList'
import Loading from '../components/Loading';
import { ProductContext } from '../contexts/ProductContext';
import { useNavigate, useLocation } from 'react-router-dom';

// Define your reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_API':
      return { ...state, api: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, filterProducts: action.payload };
    default:
      return state;
  }
};

export default function SortFilterPage() {
  const {products, loading: loadingProducts, error: errorProducts} = useContext(ProductContext)
  // Initialize state using useReducer
  const [state, dispatch] = useReducer(reducer, { api: 'http://localhost:4000/api/products', filterProducts: loadingProducts || errorProducts ? [] : products });
  const navigate = useNavigate()
  const location = useLocation()

  // Destructure state
  const { api, filterProducts} = state;

  // Use the useFetch hook with the current API endpoint
  const { data } = useFetch(api);

  useEffect(() => {
    // Check if there are query parameters in the URL when the component mounts
    if (location.search) {
      // Update the URL without query parameters
      navigate(location.pathname);
    }
  }, []);

  useEffect(() => {
    if (data && data.products) {
      dispatch({ type: 'SET_PRODUCTS', payload: data.products });
    }
  }, [data]);

  const handleFormSubmit = (values) => {
    const { category, minPrice, maxPrice, sortBy } = values
    const queryParamsArray = [
      ['category', category],
      ['minPrice', minPrice],
      ['maxPrice', maxPrice],
      ['sortBy', sortBy],
    ].filter(([key, value]) => value !== undefined && value !== null && value !== "");
    
    const displayQueryParams = new URLSearchParams();
    
    queryParamsArray.map(([key, value]) => displayQueryParams.append(key, value));
    navigate(`?${displayQueryParams.toString().replace(/,/g, '=')}`);
    
    const apiUrl = `http://localhost:4000/api/products${queryParamsArray.length > 0 ? `?${queryParamsArray.join('&').replace(/,/g, '=')}` : ''}`;
    dispatch({ type: 'SET_API', payload: apiUrl});
  };

  return (
    <div>
      <SortFilterProducts onSubmit={handleFormSubmit}/>
      {loadingProducts ? (
        <Loading/>
      ) : !errorProducts ? (
        <div>
        <ProductList products={filterProducts}/>
        </div>
      ) : (
        <p>Error fetching data</p>
      )}
    </div>
  );
}