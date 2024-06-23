import {useContext} from "react"
import { ShoppingCartContext } from "../contexts/ShoppingCartContext"

export default function DecreaseCartQuantityButton({text, id}) {
    const {decreaseCartQuantity} = useContext(ShoppingCartContext)
    return (
        <button onClick={() => decreaseCartQuantity(id)} className="text-blue-800 bg-blue-100  hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{text}</button>
    )
}