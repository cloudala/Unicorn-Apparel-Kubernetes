import { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch'
export const DeliveryContext = createContext();

export const DeliveryProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { data, loading, error } = useFetch(
        `${apiUrl}/delivery`
    );
      
    const [delivery, setDelivery] = useState([]);
  
    useEffect(() => {
    if (!loading && !error) {
        setDelivery(data.delivery);
    }
    }, [loading, error, data]);
    return (
    <DeliveryContext.Provider
        value={{
            delivery, 
            setDelivery,
            loading,
            error
        }}
    >
        {children}
    </DeliveryContext.Provider>
    );
};
