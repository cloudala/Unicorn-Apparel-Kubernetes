import {toast, Bounce} from 'react-toastify'

export default function DeleteReviewButton({text, id, reviewId}) {
    async function deleteReviewApiCall() {
        try {
          const response = await fetch(`http://localhost:4000/api/products/${id}/reviews/${reviewId}`, {
            method: 'DELETE'
          });
      
          if (!response.ok) {
            toast.error('🦄 Error deleting review!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          } else {
            toast.success('🦄 Review deleted successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
          } 
        } catch (error) {
          toast.error('🦄 Error deleting review!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }      

    return (
        <button onClick={deleteReviewApiCall} className="text-white bg-red-700  hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{text}</button>
    )
}