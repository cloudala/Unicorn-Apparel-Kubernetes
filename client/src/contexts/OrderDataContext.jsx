import { createContext, useState } from 'react';
export const OrderDataContext = createContext();

export const OrderDataProvider = ({ children }) => {
    const [orderData, setOrderData] = useState([]);

    return (
    <OrderDataContext.Provider
        value={{
        orderData,
        setOrderData
        }}
    >
        {children}
    </OrderDataContext.Provider>
    );
};
