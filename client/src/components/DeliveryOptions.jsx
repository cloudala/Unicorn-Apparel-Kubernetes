import { useContext } from 'react'
import { DeliveryContext } from '../contexts/DeliveryContext';
import currencyFormatter from '../utils/currencyFormatter'
import { FaTruck } from 'react-icons/fa';
import Loading from './Loading';

export default function DeliveryOptions() {
    const { delivery, loading, error } = useContext(DeliveryContext)
    return (
        <>
          {loading ? (
            <Loading/>
          ) : !error ? (
            <div>
                <h2 className="font-semibold text-l">Delivery Options:</h2>
                {delivery.map((delivery, index) => {
                    return <div key={index} className="flex items-center text-1xl font-semibold text-gray-900 dark:text-white"><FaTruck className="mr-2"/>{delivery.type}: {currencyFormatter(delivery.price)}</div>
                })}
            </div>
          ) : (
            <p>Error fetching data</p>
          )}
        </>
    )
}