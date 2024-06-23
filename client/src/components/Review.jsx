import {useState} from 'react'
import StarRating from './StarRating'
import EditReviewButton from './EditReviewButton'
import DeleteReviewButton from './DeleteReviewButton'
import EditUserReviewForm from './EditUserReviewForm'

export default function Review({ review, isAdmin, id }) {
    const [editReview, setEditReview] = useState(false)
    return (
        isAdmin ? 
        <div className='bg-gray-50 rounded-lg p-10 w-full flex justify-between'>
            {editReview ? <EditUserReviewForm review={review} id={id}/> : 
                <div>
                <StarRating value={review.rating}/>
                <h2 className='font-semibold px-2 pb-3'>{review.reviewerName}</h2>
                {review.reviewBody && <p className='bg-white w-full p-2 rounded-lg'>{review.reviewBody}</p>}
                </div>
            }
            <div className='flex items-center gap-3'>
                <EditReviewButton text={editReview ? "View Review" : "Edit Review"} id={review.id} editReview={editReview} setEditReview={setEditReview}/>
                <DeleteReviewButton text="Delete Review" id={id} reviewId={review.reviewId}/>
            </div>
        </div> :
        <div className='bg-gray-50 rounded-lg p-10 w-full'>
            <StarRating value={review.rating}/>
            <h2 className='font-semibold px-2 pb-3'>{review.reviewerName}</h2>
            {review.reviewBody && <p className='bg-white w-full p-2 rounded-lg'>{review.reviewBody}</p>}
        </div>
    )
}