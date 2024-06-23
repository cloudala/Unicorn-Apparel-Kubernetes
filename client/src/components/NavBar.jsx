/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';

export default function NavBar() {
  const { cartQuantity } = useContext(ShoppingCartContext);

  return (
    <header className="py-5 flex justify-between items-center w-full bg-white shadow-lg p-3">
      <NavLink to="/">
        <h2 className="font-semibold">🦄 Unicorn Apparel</h2>
      </NavLink>

      <nav className="w-2/4">
        <ul className="flex justify-evenly space-x-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/store">Store</NavLink>
          <NavLink to="/admin">Admin Panel</NavLink>
        </ul>
      </nav>

      <div>
        <NavLink to="/cart">
          <button className="flex items-center">
            <FaShoppingCart className="text-2xl" />
            {cartQuantity > 0 && (
              <div className="rounded-full bg-red-700 text-white flex items-center justify-center w-6 h-6 ml-1">
                {cartQuantity}
              </div>
            )}
          </button>
        </NavLink>
      </div>
    </header>
  );
}