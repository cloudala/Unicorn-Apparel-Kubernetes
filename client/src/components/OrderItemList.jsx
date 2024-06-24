import {useContext} from "react";
import { ProductContext } from '../contexts/ProductContext';
import { OrderDataContext } from '../contexts/OrderDataContext';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import OrderItemCard from './OrderItemCard'
import Loading from './Loading'
import OrderButton from './OrderButton'
import OrderDataSummary from "./OrderDataSummary";
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

export default function OrderItemList() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const { products } = useContext(ProductContext);
    const { cartItems, clearCart } = useContext(ShoppingCartContext)
    const {orderData} = useContext(OrderDataContext)
    const orderedProducts = cartItems.map(cartItem => {
        const productInCart = products.find(product => product.id === cartItem.id);
        const productQuantity = cartItem.quantity
        return {
        ...productInCart, quantity: productQuantity
        };
      });

    const subtotal = cartItems.reduce((subtotal, item) => {
        const productPrice = products.find(product => product.id === item.id).price
        return subtotal + item.quantity*productPrice
    }, 0)
    
    async function handleButtonClick() {
        const orderedProductsBody = orderedProducts.map(product => {
            return {id: product.id, quantity: product.quantity}
            }
        )
        const orderBody = {...orderData, products: orderedProductsBody}
        try {
            const response = await fetch(`${apiUrl}/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderBody),
            });

            if (!response.ok) {
                toast.error('🦄 Error sending order! Please try again!', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                });
            } else {
                toast.success('🦄 Order Accepted!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch {
            toast.error('🦄 Error sending order! Please try again!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            clearCart()
            navigate("/")
        }
    }
    return (
        <div className="min-h-screen">
            <h1 className="text-4xl font-bold mt-6 px-5">Your Order Summary</h1>
            <div className="px-5 bg-white flex">
            <div className="w-3/5">
                <h1 className="text-2xl font-semibold my-6">Products Ordered:</h1>
                <div className="flex flex-col gap-3">{orderedProducts.every(orderedProduct => orderedProduct.title) ? orderedProducts.map((product, id) => <OrderItemCard key={id} product={product}/>) : <Loading/>}</div>
            </div>
            <div className="w-2/5 max-h-fit bg-gray-50 rounded-lg p-10 ml-5 mt-20">
                <OrderDataSummary subtotal={subtotal}/>
                <div className="flex justify-end mt-6">
                    <OrderButton text="Confirm Order" onClick={handleButtonClick}/>
                </div>
            </div>
        </div>
        </div>
    )
}