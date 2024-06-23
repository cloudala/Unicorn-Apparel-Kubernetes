import AddToCartButton from "./AddToCartButton"
import DecreaseCartQuantityButton from "./DecreaseCartQuantityButton"
import RemoveFromCartButton from "./RemoveFromCartButton"

export default function AddToCart({inCartCount, id}) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-center my-3">
                <DecreaseCartQuantityButton text='-' id={id}/>
                <p className="mx-3"><span className="font-bold">{inCartCount}</span> in cart</p>
                <AddToCartButton text='+' id={id}/>
            </div>
            <RemoveFromCartButton text='Remove from cart' id={id}/>
        </div>
    )
}