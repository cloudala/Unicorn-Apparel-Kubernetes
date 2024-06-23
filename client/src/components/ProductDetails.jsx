import { useContext, useState } from "react";
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import StarRating from "./StarRating";
import AddToCart from "./AddToCart";
import currencyFormatter from '../utils/currencyFormatter'
import UserReviewForm from "./UserReviewForm";
import Available from "./Available";
import DeliveryOptions from "./DeliveryOptions";
import ReviewListComponent from "./ReviewListComponent";

export default function ProductDetails({ product }) {
    const { getItemQuantity } = useContext(ShoppingCartContext)
    const inCartCount = getItemQuantity(product.id)

    // State to manage the visibility of the review form
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showReviewList, setShowReviewList] = useState(false);

    const toggleReviewForm = () => {
        setShowReviewForm(!showReviewForm);
    };

    const toggleReviewList = () => {
        setShowReviewList(!showReviewList);
    };

    return (
        <>
            <div className="flex my-5 gap-10 justify-around mx-auto w-5/6">
                <div className="w-1/2 rounded-t-lg">
                    <img className="h-full w-full object-cover rounded-lg" src={product.imageUrl} alt={product.title} />
                </div>
                <div className="w-1/2 flex flex-col">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">{product.title}</div>
                    <StarRating value={product.averageRating}/>
                    <div className="w-3/4 py-2">{product.longDescription}</div>
                    <h1 className="text-2xl font-semibold text-gray-900 my-3">{currencyFormatter(product.price)}</h1>
                    <Available count={product.count} />
                    <DeliveryOptions/>
                    <div className="w-1/2">
                        {product.count > 0 ? <AddToCart id={product.id} inCartCount={inCartCount} /> : <></>}
                    </div>
                    <div className="mt-10 flex gap-2">
                        <button
                            onClick={toggleReviewList}
                            className='w-fit text-blue-800 bg-blue-100  hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                        >
                             {showReviewList ? 'Hide Reviews' : 'View Reviews'}
                        </button>
                        <button
                            onClick={toggleReviewForm}
                            className='w-fit text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                        >
                            {showReviewForm ? 'Hide Review Form' : 'Add Review'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex mt-10 w-5/6 mx-auto gap-5">
                {showReviewList && <ReviewListComponent id={product.id}/>}
                {showReviewForm && (
                <div className="w-1/2 ml-auto">
                    <h2 className="font-semibold text-xl mb-5">Leave a Review:</h2>
                    <UserReviewForm productId={product.id}/>
                </div>
                )}
            </div>
        </>
    )
}
