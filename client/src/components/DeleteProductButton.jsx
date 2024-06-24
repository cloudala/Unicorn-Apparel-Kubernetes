import {toast, Bounce} from 'react-toastify'

export default function DeleteProductButton({text, id}) {
    const apiUrl = import.meta.env.VITE_API_URL;
    async function deleteProductApiCall() {
        try {
          const response = await fetch(`${apiUrl}/products/${id}`, {
            method: 'DELETE'
          });
      
          if (!response.ok) {
            toast.error('🦄 Error deleting product!', {
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
      
          toast.success('🦄 Product deleted successfully!', {
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
      
        } catch (error) {
          console.error('Error deleting product:', error);
      
          toast.error('🦄 Error deleting product!', {
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
        <button className="text-white bg-red-700  hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => deleteProductApiCall()}>{text}</button>
    )
}