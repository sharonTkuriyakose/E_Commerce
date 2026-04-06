import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Heart, Star, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard3D from '../components/ProductCard3D';

import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { darkMode } = useTheme();

  return (
    <div className={`pt-32 min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-primary'}`}>
      <div className="container mx-auto px-6 pb-24">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-text-muted mb-8">
           <Link to="/" className="text-primary hover:text-accent transition-colors">Home</Link>
           <ChevronRight size={12} strokeWidth={3} />
           <span className="text-accent">Wishlist</span>
        </div>

        <div className="flex items-center justify-between pb-8 border-b border-border">
           <h1 className="text-3xl font-black text-primary uppercase tracking-tighter leading-none" style={{ fontFamily: 'Inter' }}>
             My Wishlist <span className="text-text-muted ml-3 border-l border-border pl-4 tracking-widest text-lg font-bold">{wishlistItems.length} ITEMS</span>
           </h1>
        </div>

        {wishlistItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-40 text-center"
          >
             <div className={`w-24 h-24 rounded-full border border-border flex items-center justify-center mb-10 text-text-muted opacity-30 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
               <Heart size={48} strokeWidth={1.5} />
             </div>
             <h2 className="text-3xl font-black text-primary uppercase tracking-tighter mb-4 italic leading-none">Your Wishlist is Empty</h2>
             <p className="text-text-muted max-w-sm mb-12 text-sm font-medium leading-relaxed">Save your favorite premium electronics to your wishlist and we'll track their price drops for you.</p>
             <Link to="/products" className="btn-primary !px-12 !py-4 shadow-xl shadow-accent/20">
               START SHOPPING NOW <ArrowRight size={18} strokeWidth={2.5} />
             </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 pt-10">
            {wishlistItems.map((product) => (
              <motion.div 
                key={product._id} 
                layout 
                className="h-[480px] relative group"
              >
                <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={() => removeFromWishlist(product._id)}
                     className={`w-10 h-10 rounded-full border border-border flex items-center justify-center text-danger shadow-lg ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-slate-50'}`}
                   >
                      <X size={20} strokeWidth={3} />
                   </button>
                </div>
                <ProductCard3D product={product} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-24 pt-12 border-t border-border">
           <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-10">Recently Viewed By You</h3>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all cursor-pointer">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="aspect-[3/4] bg-slate-50 border border-border rounded-sm"></div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
