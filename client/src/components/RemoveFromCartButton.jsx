import {useContext} from "react"
import { ShoppingCartContext } from "../contexts/ShoppingCartContext"

export default function RemoveFromCartButton({text, id}) {
    const {removeFromCart} = useContext(ShoppingCartContext)
    return (
        <button onClick={() => removeFromCart(id)} className="text-white bg-red-700  hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{text}</button>
    )
}