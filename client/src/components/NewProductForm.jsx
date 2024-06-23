import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, Bounce } from 'react-toastify';

export default function NewProductForm() {
  const formik = useFormik({
    initialValues: {
      title: '',
      imageUrl: '',
      category: '',
      price: '',
      count: '',
      shortDescription: '',
      longDescription: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      imageUrl: Yup.string().url('Invalid URL format').required('Image URL is required'),
      category: Yup.string().required('Category is required'),
      price: Yup.number().required('Price is required').positive('Price must be a positive number'),
      count: Yup.number().required('Count is required').integer('Count must be an integer').min(0, 'Count must be at least 0'),
      shortDescription: Yup.string().required('Short Description is required'),
      longDescription: Yup.string().required('Long Description is required')
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:4000/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          toast.error('🦄 Error adding product!', {
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

        toast.success('🦄 Product added successfully!', {
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

        formik.resetForm();
      } catch (error) {
        toast.error('🦄 Error adding product!', {
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
  });

  return (
    <form onSubmit={formik.handleSubmit} className="bg-gray-50 rounded-lg p-10 mx-auto w-full">

      <div className="mb-4">
        <input
          type="text"
          id="title"
          name="title"
          placeholder='Title'
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
        />
        {formik.touched.title && formik.errors.title && <div className="text-red-500">{formik.errors.title}</div>}
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          placeholder='Image URL'
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
        />
        {formik.touched.imageUrl && formik.errors.imageUrl && <div className="text-red-500">{formik.errors.imageUrl}</div>}
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="category"
          name="category"
          placeholder='Category'
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
        />
        {formik.touched.category && formik.errors.category && <div className="text-red-500">{formik.errors.category}</div>}
      </div>

      <div className="mb-4">
        <input
          type="number"
          id="price"
          name="price"
          placeholder='Price'
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
        />
        {formik.touched.price && formik.errors.price && <div className="text-red-500">{formik.errors.price}</div>}
      </div>

      <div className="mb-4">
        <input
          type="number"
          id="count"
          name="count"
          placeholder='Count'
          value={formik.values.count}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
        />
        {formik.touched.count && formik.errors.count && <div className="text-red-500">{formik.errors.count}</div>}
      </div>

      <div className="mb-4">
        <input
          type="text"
          id="shortDescription"
          name="shortDescription"
          placeholder='Short Description'
          value={formik.values.shortDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
        />
        {formik.touched.shortDescription && formik.errors.shortDescription && <div className="text-red-500">{formik.errors.shortDescription}</div>}
      </div>

      <div className="mb-4">
        <textarea
          id="longDescription"
          name="longDescription"
          placeholder='Long Description'
          value={formik.values.longDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
        ></textarea>
        {formik.touched.longDescription && formik.errors.longDescription && <div className="text-red-500">{formik.errors.longDescription}</div>}
      </div>

      <div className='flex justify-end gap-2'>
          <button
            type='button'
            onClick={formik.handleReset}
            className='w-32 text-blue-800 bg-blue-100  hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Reset
          </button>
          <button
            type='submit'
            className='w-32 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Add Product
          </button>
        </div>
    </form>
  );
}
