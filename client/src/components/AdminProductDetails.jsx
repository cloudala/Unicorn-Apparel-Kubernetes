import { useState } from "react";
import StarRating from "./StarRating";
import currencyFormatter from '../utils/currencyFormatter'
import Available from "./Available";
import DeliveryOptions from "./DeliveryOptions";
import ReviewListComponent from "./ReviewListComponent";
import EditProductForm from "./EditProductForm";
import DeleteProductButton from "./DeleteProductButton";

export default function ProductDetails({ product }) {
    const isAdmin = true

    // State to manage the visibility of the review form
    const [showEditProductForm, setShowEditProductForm] = useState(false);
    const [showReviewList, setShowReviewList] = useState(false);

    const toggleEditProductForm = () => {
        setShowEditProductForm(!showEditProductForm);
    };

    const toggleReviewList = () => {
        setShowReviewList(!showReviewList);
    };

    return (
        <>
            <div className="flex my-5 gap-10 justify-around mx-auto w-5/6">
                <span className={showEditProductForm ? "w-1/2 flex gap-10 justify-around" : "w-full flex gap-10 justify-around"}>
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
                    <div className={showEditProductForm ? "mt-10 flex gap-2 flex-col" : "mt-10 flex gap-2"}>
                        <button
                            onClick={toggleEditProductForm}
                            className='w-38 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                        >
                            {showEditProductForm ? 'View Product' : 'Edit Product'}
                        </button>
                        <DeleteProductButton text="Delete Product" id={product.id}/>
                        <button
                            onClick={toggleReviewList}
                            className='w-38 text-blue-800 bg-blue-100  hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                        >
                             {showReviewList ? 'Hide Reviews' : 'Moderate Reviews'}
                        </button>
                        </div>
                    </div>
                    </span>
                {/* </div> */}
                {showEditProductForm && (
                <div className="w-1/2 ml-auto">
                    <h2 className="text-2xl font-bold">Edit Product:</h2>
                    <EditProductForm productId={product.id} product={product}/>
                </div>
                )}
            </div>
            <div className="flex mt-10 gap-5 justify-center">
                {showReviewList && <ReviewListComponent id={product.id} isAdmin={isAdmin}/>}
            </div>
        </>
    )
}