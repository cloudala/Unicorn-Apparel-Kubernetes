/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
// import { useKeycloak } from "@react-keycloak/web";

export default function NavBar() {
  const { cartQuantity } = useContext(ShoppingCartContext);
  // const { keycloak, initialized } = useKeycloak();

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

      <div className="flex items-center">
        <NavLink to="/cart">
          <button className="flex items-center mr-4">
            <FaShoppingCart className="text-2xl" />
            {cartQuantity > 0 && (
              <div className="rounded-full bg-red-700 text-white flex items-center justify-center w-6 h-6 ml-1">
                {cartQuantity}
              </div>
            )}
          </button>
        </NavLink>
        {/* <div>
          {!keycloak.authenticated && (
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => keycloak.login()}
            >
              Login
            </button>
          )}
          {!!keycloak.authenticated && (
            <button
              type="button"
              className="text-blue-800 bg-blue-100  hover:bg-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => keycloak.logout()}
            >
              Logout ({keycloak.tokenParsed.preferred_username})
            </button>
          )}
        </div> */}
      </div>
    </header>
  );
}
