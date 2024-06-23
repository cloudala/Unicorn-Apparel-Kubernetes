import { useContext } from "react";
import StarRating from "./StarRating";
import AddToCartButton from "./AddToCartButton";
import SecondaryButton from './SecondaryButton';
import DisabledPrimaryButton from "./DisabledPrimaryButton";
import Available from "./Available";
import AddToCart from "./AddToCart";
import { FaTruck } from 'react-icons/fa';
import formatCurrency from '../utils/currencyFormatter'
import { DeliveryContext } from '../contexts/DeliveryContext';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import { Link } from 'react-router-dom'
import Loading from './Loading'

export default function ProductCard({product}) {
    const { delivery, loading } = useContext(DeliveryContext)
    const cheapestDeliveryPrice = !loading && delivery.length > 0 ? Math.min(...delivery.map(deliveryOption => deliveryOption.price)) : null;
    const {getItemQuantity} = useContext(ShoppingCartContext)
    const inCartCount = getItemQuantity(product.id)
    return (
        <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 group overflow-hidden">
            <div className="h-64 w-64 rounded-t-lg mx-auto my-5">
                <img className="h-full w-full object-cover rounded-lg" src={product.imageUrl} alt={product.title} />
            </div>
            <div className="px-5 pb-5">
                <div className="flex justify-between">
                    <div>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                        <StarRating value={product.averageRating}/>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</div>
                        <div className="flex items-center text-1xl font-semibold text-gray-900 dark:text-white"><FaTruck className="mr-2"/>{!loading && cheapestDeliveryPrice ? `from ${formatCurrency(cheapestDeliveryPrice)}` : <Loading/>}</div>
                    </div>
                </div>
                <Available count={product.count}/>
                <p className="pb-5">{product.shortDescription}</p>
                {/* Maybe change opacity to display:none */}
                <div className="flex items-baseline justify-around opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/products/${product.id}`}><SecondaryButton text='Show Details'/></Link>
                {product.count > 0 ? (
                    inCartCount > 0 ? (
                    /* If both conditions are true, render a different component */
                   <AddToCart inCartCount={inCartCount} id={product.id}/>
                    ) : (
                        <AddToCartButton text='Add to cart' id={product.id}/>
                    )
                    ) : (
                        <DisabledPrimaryButton text='Add to cart'/>
                    )}
                </div>
            </div>
        </div>
    )
}
