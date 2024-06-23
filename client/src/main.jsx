import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductProvider } from './contexts/ProductContext';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import { OrderDataProvider } from './contexts/OrderDataContext';
import { DeliveryProvider } from './contexts/DeliveryContext';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <DeliveryProvider>
          <ShoppingCartProvider>
            <OrderDataProvider>
              <ScrollToTop/>
              <App />
               <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={{ type: 'Bounce' }}
              />
            </OrderDataProvider>
          </ShoppingCartProvider>
        </DeliveryProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);