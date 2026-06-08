import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Initialize state synchronously from localStorage to prevent hydration flashes
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('fol_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from local storage", error);
            return [];
        }
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Sync to local storage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('fol_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (plant) => {
        setCartItems(prev => {
            const exists = prev.find(item => item.id === plant.id);
            if (exists) return prev; // Prevent duplicates based on plant.id
            return [...prev, plant];
        });
        // Optionally open the cart right away for a premium responsive feel
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => setCartItems([]);

    const toggleCart = () => setIsCartOpen(prev => !prev);
    const closeCart = () => setIsCartOpen(false);
    const openCart = () => setIsCartOpen(true);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            isCartOpen,
            toggleCart,
            closeCart,
            openCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
