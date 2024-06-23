import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dropdown from './Dropdown';
import ErrorMessage from './ErrorMessage';
import useFetch from '../hooks/useFetch'

export default function SortFilterProducts({ onSubmit }) {
  const { data, loading, error} = useFetch('http://localhost:4000/api/categories')
  const categories = loading || error
  ? [{ value: "", userValue: "All Categories" }]
  : [{ value: "", userValue: "All Categories" }].concat(
      data.map((category) => ({ value: category.name, userValue: category.name }))
  );
  
  const sortOptions = [
    { value: "", userValue: "Default" },
    { value: "priceLowToHigh", userValue: "Price (Lowest to Highest)" },
    { value: "priceHighToLow", userValue: "Price (Highest to Lowest)" },
    { value: "ratingLowToHigh", userValue: "Rating (Lowest to Highest)" },
    { value: "ratingHighToLow", userValue: "Rating (Highest to Lowest)" },
    { value: "dateNewestFirst", userValue: "Date Added (Newest First)" },
    { value: "dateOldestFirst", userValue: "Date Added (Oldest First)" },
  ];

  const formik = useFormik({
    initialValues: {
      minPrice: '',
      maxPrice: '',
      category: '',
      sortBy: '',
    },
    validationSchema: Yup.object().shape({
      minPrice: Yup.number()
      .typeError('Must be a number')
      .min(0, 'Price can\'t be negative'),
      maxPrice: Yup.number()
      .typeError('Must be a number')
      .min(0, 'Price can\'t be negative')
      .when('minPrice', {
        is: minPrice => minPrice,
        then: (schema) => schema.min(Yup.ref('minPrice'), 'Max price must be greater than or equal to min price'),
      }),
    }),
    onSubmit: values => {
      onSubmit(values)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mt-10 flex bg-white mx-20 px-1 gap-3 justify-between items-start">
      <div className="flex gap-3">
        <div>
          <p className="block text-sm font-medium text-gray-700">Filter by category</p>
          <div className="flex flex-col">
            <Dropdown
              options={categories}
              value={formik.values.category}
              onChange={value => formik.setFieldValue('category', value)}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <p className="block text-sm font-medium text-gray-700">Filter by price</p>
          <div className="flex gap-2 align-center">
            <div className="flex flex-col">
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                placeholder="Minimum price (PLN)"
                className="border border-gray-300 rounded-md p-2"
                value={formik.values.minPrice}
                onChange={formik.handleChange}
              />
              {formik.errors.minPrice && <ErrorMessage message={formik.errors.minPrice} />}
            </div>
            <div className="flex flex-col">
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="Maximum price (PLN)"
                className="border border-gray-300 rounded-md p-2"
                value={formik.values.maxPrice}
                onChange={formik.handleChange}
              />
              {formik.errors.maxPrice && <ErrorMessage message={formik.errors.maxPrice} />}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-end">
        <div className="cursor-pointer">
          <p className="block text-sm font-medium text-gray-700">Sort by</p>
          <div className="flex flex-col">
            <Dropdown
              options={sortOptions}
              value={formik.values.sortBy}
              onChange={value => formik.setFieldValue('sortBy', value)}
            />
          </div>
        </div>
        <button type="reset" onClick={formik.handleReset} className="text-blue-800 bg-blue-100 hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Reset
        </button>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center h-10">
          Apply
        </button>
      </div>
    </form>
  );
}
