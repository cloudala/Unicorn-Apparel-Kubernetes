import { useContext, useRef, useLayoutEffect } from 'react';
import ErrorMessage from './ErrorMessage';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom'
import { OrderDataContext } from '../contexts/OrderDataContext'
import { DeliveryContext } from '../contexts/DeliveryContext';
import formatCurrency from '../utils/currencyFormatter';
import * as Yup from 'yup';

export default function CheckoutForm() {
  const firstInputRef = useRef(null);
  const { delivery, loading, error } = useContext(DeliveryContext)
  const { setOrderData } = useContext(OrderDataContext)
  const navigate = useNavigate()
  const inputStyles = 'w-full p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300'
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      phoneNumber: '',
      street: '',
      postalCode: '',
      city: '',
      delivery: '',
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, 'Name has a minimal length of 1!')
        .max(20, 'Name has a max length of 20')
        .required('Required'),
      surname: Yup.string()
        .min(1, 'Surname has a minimal length of 1!')
        .max(20, 'Surname has a max length of 20')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phoneNumber: Yup.string()
      .matches(/^(\+48)?[0-9]{9}$/, 'Invalid phone number! Must be a valid Polish phone number.')
      .required('Required'),
      street: Yup.string().required('Street is required'),
      postalCode: Yup.string()
        .matches(/^\d{2}-\d{3}$/, 'Invalid postal code')
        .required('Postal code is required'),
      city: Yup.string().required('City is required'),
      delivery: Yup.string()
        .required('Delivery is required'),
      terms: Yup.boolean().oneOf(
        [true],
        'You must agree to the terms of service'
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      setOrderData(values)
      console.log(values);
      resetForm();
      navigate("/cart/checkout/order")
    },
  });

  useLayoutEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []); 

  return (
    <div className='min-h-screen flex flex-col items-center justify-center my-5'>
      <form
        action=''
        onSubmit={formik.handleSubmit}
        className='bg-gray-50 rounded-lg p-10 mx-auto w-1/2'
      >
        <h1 className='text-3xl font-bold mb-5'>Checkout</h1>
        <h1 className='text-xl font-semibold'>Your Data</h1>
        <div className='flex gap-3 mb-5'>
            <div className='w-1/2'>
                <input
                type='text'
                id='name'
                placeholder='Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyles}
                ref={firstInputRef}
                />
                {formik.touched.name && formik.errors.name ? (
                <ErrorMessage message={formik.errors.name} />
                ) : (
                <></>
                )}
            </div>
            <div className='w-1/2'>
                <input
                type='text'
                id='surname'
                placeholder='Surname'
                value={formik.values.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyles}
                />
                {formik.touched.surname && formik.errors.surname ? (
                <ErrorMessage message={formik.errors.surname} />
                ) : (
                <></>
                )}
            </div>
        </div>
        <div className='flex gap-3 mb-5'>
            <div className='w-1/2'>
                <input
                type='text'
                id='email'
                placeholder='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyles}
                />
                {formik.touched.email && formik.errors.email ? (
                <ErrorMessage message={formik.errors.email} />
                ) : (
                <></>
                )}
            </div>
            <div className='w-1/2'>
                <input
                type='phoneNumber'
                id='phoneNumber'
                placeholder='Phone number'
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyles}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <ErrorMessage message={formik.errors.phoneNumber} />
                ) : (
                <></>
                )}
            </div>
        </div>
        <h1 className='text-xl font-semibold'>Your Address</h1>
        <div className='flex gap-3 mb-5'>
            <div className='w-1/2'>
                <input
                type='text'
                id='street'
                placeholder='Street'
                value={formik.values.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyles}
                />
                {formik.touched.street && formik.errors.street ? (
                <ErrorMessage message={formik.errors.street} />
                ) : (
                <></>
                )}
            </div>
            <div className='w-1/2'>
                <input
                type='text'
                id='postalCode'
                placeholder='Postal Code (e.g., 00-000)'
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={inputStyles}
                />
                {formik.touched.postalCode && formik.errors.postalCode ? (
                <ErrorMessage message={formik.errors.postalCode} />
                ) : (
                <></>
                )}
            </div>
        </div>
        <input
          type='text'
          id='city'
          placeholder='City'
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={inputStyles}
        />
        {formik.touched.city && formik.errors.city ? (
          <ErrorMessage message={formik.errors.city} />
        ) : (
          <></>
        )}
        <h2 htmlFor='delivery' className='text-xl font-semibold mt-5'>Choose Delivery Option: </h2>
        <div>
          {!loading && delivery ? delivery.map((delivery, index) => {
            return (
              <div key={index} className="bg-white flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                type='radio'
                id={delivery.type}
                value={delivery.type}
                name='delivery'
                checked={formik.values.delivery === delivery.type}
                onChange={formik.handleChange}
                className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />{' '}
                <label htmlFor={delivery.type} className="cursor-pointer w-full py-4 ms-2 text-sm font-medium text-gray-900">{delivery.type} {formatCurrency(delivery.price)}</label>
            </div>
            )
          }) : <div className="bg-white flex items-center ps-4 border border-gray-200 rounded py-4 ms-2 text-sm font-medium text-gray-900">Loading ...</div>}
          {formik.touched.delivery && formik.errors.delivery ? (
              <ErrorMessage message={formik.errors.delivery} />
              ) : (
              <></>
          )}
        </div>
        <div className="bg-white mt-10 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
            <input
                type='checkbox'
                id='terms'
                name='terms'
                defaultChecked={formik.values.terms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor='terms' className="cursor-pointer w-full py-4 ms-2 text-sm font-medium text-gray-900">
                I agree to the terms of service
            </label>
        </div>
        {formik.touched.terms && formik.errors.terms ? (
        <ErrorMessage message={formik.errors.terms} />
        ) : (
        <></>
        )}
        <br />
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
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
