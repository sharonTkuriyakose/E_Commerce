import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error('Cart state restoration failed:', error);
      return [];
    }
  });

  const { userInfo } = useAuth();

  useEffect(() => {
    if (!userInfo) {
       setCartItems([]);
       localStorage.removeItem('cartItems');
    } else {
       localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, userInfo]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existItem = prev.find(x => x._id === product._id);
      if (existItem) {
        return prev.map(x => x._id === existItem._id ? { ...x, quantity: x.quantity + quantity } : x);
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(x => x._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prev => prev.map(x => x._id === id ? { ...x, quantity } : x));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      prices: { itemsPrice, shippingPrice, taxPrice, totalPrice }
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
