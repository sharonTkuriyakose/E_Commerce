import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const localData = localStorage.getItem('wishlistItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error('Wishlist state restoration failed:', error);
      return [];
    }
  });

  const { userInfo } = useAuth();

  useEffect(() => {
    if (!userInfo) {
       setWishlistItems([]);
       localStorage.removeItem('wishlistItems');
    } else {
       localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, userInfo]);

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      const existItem = prev.find(x => x._id === product._id);
      if (existItem) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(x => x._id !== id));
  };

  const toggleWishlist = (product) => {
    const existItem = wishlistItems.find(x => x._id === product._id);
    if (existItem) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider value={{ 
      wishlistItems, 
      addToWishlist, 
      removeFromWishlist,
      toggleWishlist,
      isInWishlist: (id) => !!wishlistItems.find(x => x._id === id)
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
