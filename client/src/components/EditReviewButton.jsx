export default function EditReviewButton({text, id, editReview, setEditReview }) {
    return (
        <button className="text-blue-800 bg-blue-100  hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => setEditReview(!editReview)}>{text}</button>
    )
}