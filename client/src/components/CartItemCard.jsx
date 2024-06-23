import {useContext} from "react";
import Available from "./Available";
import AddToCart from "./AddToCart";
import formatCurrency from '../utils/currencyFormatter'
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';

export default function CartItemCard({product}) {
    const {getItemQuantity} = useContext(ShoppingCartContext)
    const inCartCount = getItemQuantity(product.id)
    return (
        <div className="relative w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 group overflow-hidden flex justify-start items-center">
            <div className="h-64 w-64 rounded-t-lg my-5 mx-5">
                <img className="h-full w-full object-cover rounded-lg" src={product.imageUrl} alt={product.title} />
            </div>
            <div className="px-5 pb-5">
                <div>
                    <div>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</div>
                    </div>
                </div>
                <Available count={product.count}/>
                {product.count > 0 && inCartCount > 0 && <AddToCart inCartCount={inCartCount} id={product.id}/>}
            </div>
        </div>
    )
}
