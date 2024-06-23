import {useContext} from 'react'
import {ProductContext} from '../contexts/ProductContext'
import NewProductForm from '../components/NewProductForm'
import AdminProductCard from '../components/AdminProductCard'

export default function AdminPage() {
    const { products }= useContext(ProductContext)
    return (
        <div className="w-2/3 mx-auto">
            <h1 className="text-2xl font-bold mt-6 mb-3">Add New Product</h1>
            <NewProductForm/>
            <h1 className="text-2xl font-bold mt-6 mb-3">Manage Existing Products</h1>
            <div className='flex flex-col gap-3'>
                {products.map((product, id) => <AdminProductCard key={id} product={product}/>)}
            </div>
        </div>
    )
}