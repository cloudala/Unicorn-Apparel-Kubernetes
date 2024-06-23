import {useContext} from 'react';
import { OrderDataContext } from '../contexts/OrderDataContext'
import { DeliveryContext } from '../contexts/DeliveryContext';
import formatCurrency from '../utils/currencyFormatter';

export default function OrderDataSummary({ subtotal }) {
  const { orderData } = useContext(OrderDataContext)
  const { delivery, loading, error } = useContext(DeliveryContext)
  const deliveryPrice = !loading && delivery && delivery.find(delivery => delivery.type === orderData["delivery"]).price
  return (
    <div className="max-h-fit">
        <h2 className="text-xl font-semibold mb-6">Order Summary:</h2>
        <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
            <p className="">Subtotal:</p>
            <p>{formatCurrency(subtotal)}</p>
        </div>
        <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
            <p className="">Shipping with <span className='font-bold'>{orderData.delivery}</span>:</p>
            <p>{formatCurrency(deliveryPrice)}</p>
        </div>
        <div className="flex justify-between my-3">
            <p className="text-xl font-semibold">Order Total:</p>
            <p className="text-xl font-semibold">{formatCurrency(subtotal + deliveryPrice)}</p>
        </div>
        <div className='border-b border-gray-300 my-10'></div>
        <h2 className="text-xl font-semibold mb-6">Your Personal Data:</h2>
        <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
            <p className="">Name:</p>
            <p>{orderData.name}</p>
        </div>
        <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
            <p className="">Surname:</p>
            <p>{orderData.surname}</p>
        </div>
        <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
            <p className="">Email:</p>
            <p>{orderData.email}</p>
        </div>
        <div className="flex justify-between my-3 pb-3">
            <p className="">Phone number:</p>
            <p>{orderData.phoneNumber}</p>
        </div>
        <div className='border-b border-gray-300 my-10'></div>
        <h2 className="text-xl font-semibold mb-6">Your Address:</h2>
        <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
            <p className="">Street:</p>
            <p>{orderData.street}</p>
        </div>
        <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
            <p className="">Postal code:</p>
            <p>{orderData.postalCode}</p>
        </div>
        <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
            <p className="">City:</p>
            <p>{orderData.city}</p>
        </div>
    </div>
  );
}