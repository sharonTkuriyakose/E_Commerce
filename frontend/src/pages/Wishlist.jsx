import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard3D from '../components/ProductCard3D';
import { products } from '../data/products';

const Wishlist = () => {
  // Dummy wishlist state
  const [wishlistItems, setWishlistItems] = useState([
    products[1], products[4], products[7]
  ]);

  const removeItem = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="pt-24 min-h-screen container mx-auto px-6 pb-24">
      <div className="flex items-center space-x-4 mb-12 border-b border-glass-border pb-8">
        <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center border-accent-blue/50">
          <Heart size={32} className="text-accent-blue fill-accent-blue/20" />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-blue">Wishlist</span>
          </h1>
          <p className="text-gray-400 mt-2">{wishlistItems.length} items saved for later</p>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="py-20 text-center glass-panel w-full max-w-2xl mx-auto rounded-3xl">
          <Heart size={64} className="mx-auto text-gray-600 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-8">Save your favorite premium items here to buy them later.</p>
          <Link to="/products" className="btn-primary inline-block">Explore Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative h-[420px] group"
              >
                {/* Remove button overlays the card */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 left-4 z-30 w-8 h-8 rounded-full bg-dark-bg/80 border border-glass-border flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-400/50 transition-all backdrop-blur-md opacity-0 group-hover:opacity-100"
                  aria-label="Remove from Wishlist"
                >
                  <Trash2 size={16} />
                </button>
                <ProductCard3D product={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
