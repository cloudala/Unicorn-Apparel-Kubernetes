/* eslint-disable no-unused-vars */
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ShoppingCart from './components/ShoppingCart'
import Footer from './components/Footer';
import CheckoutForm from './components/CheckoutForm';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductListPage from './pages/ProductListPage';
import OrderItemList from './components/OrderItemList';
import AdminPage from './pages/AdminPage'
import SortFilterPage from './pages/SortFilterPage'
import AdminEditPage from './pages/AdminEditPage'
import PrivateRoute from './utils/PrivateRoute'
import AdminRoute from "./utils/AdminRoute";

export default function App() {
  return (
    <>
      <NavBar/>
        <Routes>
          <Route path='/' element={<ProductListPage/>}/>
          <Route path='/store' element={<SortFilterPage/>}/>
          <Route path='/admin' element={<AdminRoute><AdminPage/></AdminRoute>}/>
          <Route path='/admin/:id' element={<AdminRoute><AdminEditPage/></AdminRoute>}/>
          <Route path='/products/:id' element={<ProductDetailsPage/>}/>
          <Route path='/cart' element={<PrivateRoute><ShoppingCart/></PrivateRoute>}/>
          <Route path='/cart/checkout' element={<PrivateRoute><CheckoutForm/></PrivateRoute>}/>
          <Route path='/cart/checkout/order' element={<PrivateRoute><OrderItemList/></PrivateRoute>}/>
        </Routes>
      <Footer/>
    </>
  )
}