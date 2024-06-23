import { Link } from "react-router-dom"

export default function EditProductButton({text, id}) {
    return (
        <Link to={`/admin/${id}`}>
            <button className="text-blue-800 bg-blue-100  hover:bg-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{text}</button>
        </Link>
    )
}