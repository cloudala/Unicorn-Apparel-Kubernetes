import { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useLocalStorage("shoppingCart", [])
    const [isOpen, setIsOpen] = useState(false)

    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id) {
        setCartItems(prevCartItems => {
            if (!prevCartItems.find(item => item.id === id)) {
                return [...prevCartItems, {id, quantity: 1}]
            } else {
                return prevCartItems.map(item => {
                   return item.id === id ? {...item, quantity: item.quantity + 1} : item
                })
            }
        })
    }

    function decreaseCartQuantity(id) {
        setCartItems(prevCartItems => {
            if (prevCartItems.find(item => item.id === id)?.quantity === 1) {
                return prevCartItems.filter(item => item.id !== id)
            } else {
                return prevCartItems.map(item => {
                   return item.id === id ? {...item, quantity: item.quantity - 1} : item
                })
            }
        })
    }

    function removeFromCart(id) {
        setCartItems(prevCartItems => {
            return prevCartItems.filter(item => item.id !== id)
        })
    }

    function closeCart() {
        setCartItems([]);
    }

    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0)

    function openCart() {
        setIsOpen(true)
    }

    function clearCart() {
        setCartItems(prevCartItems => []);
    }

    return (
    <ShoppingCartContext.Provider value={{cartItems, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartQuantity, openCart, clearCart}}>
        {children}
    </ShoppingCartContext.Provider>
    );
};
