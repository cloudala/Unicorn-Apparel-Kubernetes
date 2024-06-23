import Review from './Review'

export default function ReviewList({ reviews, isAdmin, id }) {
    return (
        <div className='flex flex-col gap-5 w-full'>
            <h2 className='font-semibold text-xl'>Reviews:</h2>
            {reviews.map((review, index) => <Review key={index} review={review} isAdmin={isAdmin} id={id}/>)}
        </div>
    )
}