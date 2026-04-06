import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);

  const addToCompare = (product) => {
    if (compareItems.find((x) => x._id === product._id)) return;
    if (compareItems.length >= 4) {
      alert("Maximum 4 products can be compared simultaneously for optimal precision.");
      return;
    }
    setCompareItems([...compareItems, product]);
  };

  const removeFromCompare = (productId) => {
    setCompareItems(compareItems.filter((x) => x._id !== productId));
  };

  const clearCompare = () => setCompareItems([]);

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
