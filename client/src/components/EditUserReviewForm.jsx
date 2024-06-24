import { useFormik } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from './ErrorMessage';
import Rating from '@mui/material/Rating';
import { toast, Bounce } from 'react-toastify';

export default function EditUserReviewForm({ review, id }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const inputStyles = 'w-full p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300'
  const formik = useFormik({
    initialValues: {
      rating: review.rating,
      name: review.reviewerName,
      reviewBody: review.reviewBody,
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating must be at most 5')
        .required('Rating is required'),
      name: Yup.string()
        .min(1, 'Name has a minimal length of 1!')
        .max(20, 'Name has a max length of 20')
    }),
    onSubmit: async (values, { resetForm }) => {
      const { rating, name, reviewBody } = values;
      const reviewerName = name ? name : 'Anonymous';
      const updatedReview = { rating, reviewerName, reviewBody };
      
      try {
        const response = await fetch(`${apiUrl}/products/${id}/reviews/${review.reviewId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedReview),
        });

        if (!response.ok) {
          toast.error('🦄 Error updating review!', {
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
          toast.success('🦄 Review updated successfully!', {
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
        toast.error('🦄 Error updating review!', {
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
    },
  });

  return (
    <form action="" onSubmit={formik.handleSubmit} className='bg-gray-50 rounded-lg w-fit pt-2'>
      <Rating
        name="rating"
        value={formik.values.rating}
        onChange={(event, newValue) => {
          formik.setFieldValue('rating', newValue);
        }}
      />
      {formik.touched.rating && formik.errors.rating ? (
        <ErrorMessage message={formik.errors.rating} />
      ) : (
        <></>
      )}
      <br/>
      <input
        type="text"
        id="name"
        placeholder="Name (leave blank if you want to be Anonymous)"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={inputStyles}
      />
      {formik.touched.name && formik.errors.name ? (
        <ErrorMessage message={formik.errors.name} />
      ) : (
        <></>
      )}
      <br />
      <br />
      <textarea
        name="reviewBody"
        id="reviewBody"
        cols="100"
        rows="5"
        placeholder="Give your opinion about the product ..."
        value={formik.values.reviewBody}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={inputStyles}
      ></textarea>
      <br />
      <div className='flex justify-end gap-2'>
          <button
            type='button'
            onClick={formik.handleReset}
            className='w-36 text-blue-800 bg-blue-100  hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Reset
          </button>
          <button
            type='submit'
            className='w-36 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Update Review
          </button>
        </div>
    </form>
  );
}