import { useContext, useMemo } from "react";
import { ProductContext } from '../contexts/ProductContext';
import { DeliveryContext } from '../contexts/DeliveryContext';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import CartItemCard from "./CartItemCard";
import CheckoutButton from './CheckoutButton'
import formatCurrency from "../utils/currencyFormatter";
import Loading from './Loading'

export default function ShoppingCart() {
    const { products } = useContext(ProductContext);
    const { cartItems } = useContext(ShoppingCartContext);
    const { delivery, loading } = useContext(DeliveryContext);

    const productsInCart = useMemo(() => (
      products && cartItems ? products.filter(product => cartItems.some(item => item.id === product.id)) : []
    ), [products, cartItems]);

    const subtotal = useMemo(() => (
      products && cartItems ? cartItems.reduce((subtotal, item) => {
        const product = products.find(product => product.id === item.id);
        if (product) {
          return subtotal + item.quantity * product.price;
        }
        return subtotal;
      }, 0) : 0
    ), [products, cartItems]);

    const cheapestDeliveryPrice = useMemo(() => {
      return subtotal === 0
        ? 0
        : !loading && delivery.length > 0
        ? Math.min(...delivery.map(deliveryOption => deliveryOption.price))
        : null;
    }, [subtotal, loading, delivery]);

    const checkoutDisabled = useMemo(() => subtotal === 0, [subtotal]);

    if (loading) {
      return <Loading />;
    }

    return (
        <div className="min-h-screen">
            <h1 className="text-4xl font-bold my-6 px-5">Your Cart</h1>
            <div className="my-10 px-5 bg-white flex">
                <div className="w-3/5">
                    <ul className="grid grid-cols-1 gap-4 w-full">
                    {productsInCart.map((product, id) => <CartItemCard key={id} product={product}/>)}
                    </ul>
                </div>
                <div className="w-2/5 max-h-80 bg-gray-50 rounded-lg p-10 ml-5">
                    <h2 className="text-xl font-semibold mb-6">Order Summary:</h2>
                    <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
                        <p className="">Subtotal:</p>
                        <p>{formatCurrency(subtotal)}</p>
                    </div>
                    <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
                        <p className="">Shipping estimate (cheapest option):</p>
                        <p>{formatCurrency(cheapestDeliveryPrice)}</p>
                    </div>
                    <div className="flex justify-between my-3 pb-3">
                        <p className="text-xl font-semibold">Order Total:</p>
                        <p className="text-xl font-semibold">{formatCurrency(subtotal + cheapestDeliveryPrice)}</p>
                    </div>
                    <CheckoutButton text='Checkout' checkoutDisabled={checkoutDisabled}/>
                </div>
            </div>
        </div>
    )
}
