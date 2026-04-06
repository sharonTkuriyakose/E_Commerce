import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Zap, Lock, ChevronRight, ShieldCheck, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, prices } = useCart();
  const { addToWishlist } = useWishlist();
  const { darkMode } = useTheme();
  
  // High-reliability price extraction to prevent white-screen crashes
  const subtotal = prices?.itemsPrice || 0;
  const tax = prices?.taxPrice || 0;
  const total = prices?.totalPrice || 0;

  const handleMoveToWishlist = (item) => {
    if (!item) return;
    addToWishlist(item);
    removeFromCart(item._id);
  };

  return (
    <div className={`pt-32 min-h-screen overflow-x-hidden transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-primary'}`}>
      <div className="container mx-auto px-6 pb-24 max-w-6xl">
        {/* Breadcrumb - Clean Retail Path */}
        <div className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest mb-8 ${darkMode ? 'text-slate-500' : 'text-text-muted'}`}>
           <Link to="/" className={`hover:text-accent transition-colors ${darkMode ? 'text-slate-300' : 'text-primary'}`}>Home</Link>
           <ChevronRight size={12} strokeWidth={3} />
           <span className="text-accent">Shopping Bag</span>
        </div>

        {(!cartItems || cartItems.length === 0) ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`py-32 flex flex-col items-center justify-center text-center rounded-sm border border-border mt-10 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}
          >
             <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center mb-10 opacity-30 ${darkMode ? 'border-slate-800 bg-slate-800 text-slate-500' : 'border-border bg-white text-text-muted'}`}>
              <ShoppingBag size={48} strokeWidth={1.5} />
            </div>
            <h2 className={`text-3xl font-black uppercase tracking-tighter mb-4 italic leading-none ${darkMode ? 'text-white' : 'text-primary'}`}>Your Bag Is Empty</h2>
            <p className={`max-w-sm mb-12 text-sm font-medium leading-relaxed ${darkMode ? 'text-slate-400' : 'text-text-muted'}`}>Looks like you haven't added any premium tech to your collection yet. Start shopping to explore latest flagships.</p>
            <Link to="/products" className="btn-primary !px-12 !py-4 shadow-xl shadow-accent/20">
              EXPLORE OUR COLLECTION <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Bag Items list */}
            <div className="lg:col-span-7 space-y-10" id="bag-items">
              <div className={`flex items-center justify-between pb-6 border-b border-border`}>
                 <h1 className={`text-2xl font-black uppercase tracking-tighter leading-none ${darkMode ? 'text-white' : 'text-primary'}`} style={{ fontFamily: 'Inter' }}>
                   My Bag <span className={`ml-2 border-l pl-3 tracking-widest text-[16px] lowercase ${darkMode ? 'text-slate-500 border-slate-800' : 'text-text-muted border-border'}`}>{cartItems.length} items</span>
                 </h1>
                 <Link to="/products" className="text-[11px] font-black text-accent uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Continue Shopping</Link>
              </div>

              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col sm:flex-row gap-8 pb-10 border-b border-border relative group"
                  >
                    {/* Item Image */}
                    <div className={`w-32 h-44 border border-border rounded-sm p-4 shrink-0 overflow-hidden relative ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                      <img 
                        src={item.image || '/images/placeholder.png'} 
                        alt={item.name} 
                        className={`w-full h-full object-contain transition-transform ${darkMode ? 'mix-blend-lighten' : 'mix-blend-multiply'} group-hover:scale-110`} 
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-grow space-y-4">
                      <div className="space-y-1">
                        <Link to={`/product/${item._id}`} className={`text-lg font-black uppercase tracking-tighter transition-colors block leading-tight ${darkMode ? 'text-white hover:text-accent' : 'text-primary hover:text-accent'}`}>{item.name}</Link>
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{item.category} · Premium Edition</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 pt-2">
                        {/* Quantity UI */}
                        <div className={`flex items-center border border-border rounded-sm p-1.5 gap-2 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                           <button 
                             onClick={() => item.quantity > 1 ? updateQuantity(item._id, item.quantity - 1) : removeFromCart(item._id)}
                             className={`w-8 h-8 flex items-center justify-center transition-all rounded-sm border border-transparent ${darkMode ? 'text-white hover:bg-slate-700 hover:border-slate-600' : 'text-primary hover:bg-white hover:border-border'}`}
                           >
                              <Minus size={14} strokeWidth={3} />
                           </button>
                           <span className={`w-8 text-center text-xs font-black tracking-tighter ${darkMode ? 'text-white' : 'text-primary'}`}>{item.quantity}</span>
                           <button 
                             onClick={() => updateQuantity(item._id, item.quantity + 1)}
                             className={`w-8 h-8 flex items-center justify-center transition-all rounded-sm border border-transparent ${darkMode ? 'text-white hover:bg-slate-700 hover:border-slate-600' : 'text-primary hover:bg-white hover:border-border'}`}
                           >
                              <Plus size={14} strokeWidth={3} />
                           </button>
                        </div>

                        <div className="flex items-center gap-3">
                           <span className={`text-lg font-black tracking-tighter ${darkMode ? 'text-white' : 'text-primary'}`}>₹{( (item.price || 0) * item.quantity).toLocaleString()}</span>
                           <span className={`text-xs line-through font-bold ${darkMode ? 'text-slate-500' : 'text-text-muted'}`}>₹{((item.price || 0) * 1.25 * item.quantity).toLocaleString()}</span>
                           <span className="text-xs text-warning font-black uppercase tracking-widest">(25% OFF)</span>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center gap-8">
                         <button 
                           onClick={() => removeFromCart(item._id)}
                           className="text-[10px] font-black text-danger uppercase tracking-widest flex items-center gap-2 hover:underline"
                         >
                            <Trash2 size={12} strokeWidth={3} /> Remove
                         </button>
                         <button 
                             onClick={() => handleMoveToWishlist(item)}
                             className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-accent transition-colors ${darkMode ? 'text-slate-300' : 'text-primary'}`}
                           >
                              <Heart size={12} strokeWidth={3} /> Move To Wishlist
                           </button>
                      </div>
                    </div>

                    <div className={`absolute top-0 right-0 py-1 px-3 border border-border rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
                       <span className="text-[9px] font-black uppercase tracking-widest text-success flex items-center gap-1.5">
                          <ShieldCheck size={10} strokeWidth={3} /> Verified Tech Item
                       </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Sidebar Summary Area */}
            <div className="lg:col-span-5 sticky top-32" id="bag-summary">
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className={`p-10 border border-border rounded-sm relative ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50'}`}
               >
                  <h2 className={`text-sm font-black uppercase tracking-[0.3em] mb-10 border-b border-border pb-6 ${darkMode ? 'text-white' : 'text-primary'}`}>Payment Summary</h2>
                  
                  <div className="space-y-6 mb-10">
                    <div className={`flex justify-between items-center text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-text-secondary'}`}>
                       <span>Bag Total</span>
                       <span className={`${darkMode ? 'text-white' : 'text-primary'} tracking-tighter font-black`}>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className={`flex justify-between items-center text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-text-secondary'}`}>
                       <span>Tax (18% GST)</span>
                       <span className={`${darkMode ? 'text-white' : 'text-primary'} tracking-tighter font-black`}>₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-success uppercase tracking-widest">
                       <span>Shipping Fee</span>
                       <span className="font-black">FREE</span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 overflow-hidden">
                       <div className="flex flex-col">
                          <span className={`text-[10px] font-black uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-text-muted'}`}>Grand Total</span>
                          <span className={`font-black uppercase tracking-widest text-[9px] underline underline-offset-4 decoration-accent ${darkMode ? 'text-white' : 'text-primary'}`}>Secure Transaction Active</span>
                       </div>
                       <p className={`text-3xl sm:text-4xl font-black tracking-tighter leading-none ${darkMode ? 'text-white' : 'text-primary'}`} style={{ fontFamily: 'Inter' }}>
                          <span className="text-sm text-accent underline decoration-4 underline-offset-4 decoration-accent/20">₹</span>{total.toLocaleString()}
                       </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full btn-primary !rounded-sm !py-5 !text-[13px] !tracking-[0.3em] shadow-xl shadow-accent/20 group uppercase"
                  >
                    Order Now <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="mt-12 flex flex-col gap-6 pt-10 border-t border-border">
                      <div className="flex items-center gap-4">
                        <Lock size={20} className={darkMode ? 'text-slate-500' : 'text-text-muted'} />
                        <div className="flex flex-col">
                           <span className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-primary'}`}>100% SECURE PAYMENTS</span>
                           <span className={`text-[9px] font-medium italic ${darkMode ? 'text-slate-500' : 'text-text-muted'}`}>Industry standard SSL encryption</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <Zap size={20} className={darkMode ? 'text-slate-500' : 'text-text-muted'} />
                        <div className="flex flex-col">
                           <span className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-primary'}`}>EXPRESS DELIVERY</span>
                           <span className={`text-[9px] font-medium italic ${darkMode ? 'text-slate-500' : 'text-text-muted'}`}>Flagship priority shipping channel</span>
                        </div>
                     </div>
                  </div>
               </motion.div>
               
               <div className="mt-8 px-4 flex items-center justify-center gap-8 opacity-40 grayscale translate-y-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-3" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.png" alt="MasterCard" className="h-5" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal_p_logo_blank.png" alt="PayPal" className="h-4" />
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
