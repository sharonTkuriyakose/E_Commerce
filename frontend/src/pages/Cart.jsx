import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Zap, Lock, ChevronRight, ShieldCheck, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, prices } = useCart();
  const { addToWishlist } = useWishlist();
  
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
    <div className="pt-32 min-h-screen bg-white overflow-x-hidden">
      <div className="container mx-auto px-6 pb-24 max-w-6xl">
        {/* Breadcrumb - Clean Retail Path */}
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-text-muted mb-8">
           <Link to="/" className="text-primary hover:text-accent transition-colors">Home</Link>
           <ChevronRight size={12} strokeWidth={3} />
           <span className="text-accent">Shopping Bag</span>
        </div>

        {(!cartItems || cartItems.length === 0) ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-32 flex flex-col items-center justify-center text-center bg-slate-50 rounded-sm border border-border mt-10"
          >
            <div className="w-24 h-24 rounded-full bg-white border-2 border-border flex items-center justify-center mb-10 text-text-muted opacity-30">
              <ShoppingBag size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-black text-primary uppercase tracking-tighter mb-4 italic leading-none">Your Bag Is Empty</h2>
            <p className="text-text-muted max-w-sm mb-12 text-sm font-medium leading-relaxed">Looks like you haven't added any premium tech to your collection yet. Start shopping to explore latest flagships.</p>
            <Link to="/products" className="btn-primary !px-12 !py-4 shadow-xl shadow-accent/20">
              EXPLORE OUR COLLECTION <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Bag Items list */}
            <div className="lg:col-span-7 space-y-10" id="bag-items">
              <div className="flex items-center justify-between pb-6 border-b border-border">
                 <h1 className="text-2xl font-black text-primary uppercase tracking-tighter leading-none" style={{ fontFamily: 'Inter' }}>
                   My Bag <span className="text-text-muted ml-2 border-l border-border pl-3 tracking-widest text-[16px] lowercase">{cartItems.length} items</span>
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
                    <div className="w-32 h-44 bg-slate-50 border border-border rounded-sm p-4 shrink-0 overflow-hidden relative">
                      <img 
                        src={item.image || '/images/placeholder.png'} 
                        alt={item.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" 
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-grow space-y-4">
                      <div className="space-y-1">
                        <Link to={`/product/${item._id}`} className="text-lg font-black text-primary uppercase tracking-tighter hover:text-accent transition-colors block leading-tight">{item.name}</Link>
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">{item.category} · Premium Edition</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 pt-2">
                        {/* Quantity UI */}
                        <div className="flex items-center border border-border rounded-sm p-1.5 gap-2 bg-slate-50">
                           <button 
                             onClick={() => item.quantity > 1 ? updateQuantity(item._id, item.quantity - 1) : removeFromCart(item._id)}
                             className="w-8 h-8 flex items-center justify-center text-primary hover:bg-white transition-all rounded-sm border border-transparent hover:border-border"
                           >
                              <Minus size={14} strokeWidth={3} />
                           </button>
                           <span className="w-8 text-center text-xs font-black text-primary tracking-tighter">{item.quantity}</span>
                           <button 
                             onClick={() => updateQuantity(item._id, item.quantity + 1)}
                             className="w-8 h-8 flex items-center justify-center text-primary hover:bg-white transition-all rounded-sm border border-transparent hover:border-border"
                           >
                              <Plus size={14} strokeWidth={3} />
                           </button>
                        </div>

                        <div className="flex items-center gap-3">
                           <span className="text-lg font-black text-primary tracking-tighter">₹{( (item.price || 0) * item.quantity).toLocaleString()}</span>
                           <span className="text-xs text-text-muted line-through font-bold">₹{((item.price || 0) * 1.25 * item.quantity).toLocaleString()}</span>
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
                             className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:text-accent transition-colors"
                           >
                              <Heart size={12} strokeWidth={3} /> Move To Wishlist
                           </button>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 py-1 px-3 bg-white border border-border rounded-sm shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
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
                 className="p-10 border border-border bg-slate-50 rounded-sm relative"
               >
                  <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-10 border-b border-border pb-6">Payment Summary</h2>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-center text-xs font-bold text-text-secondary uppercase tracking-widest">
                       <span>Bag Total</span>
                       <span className="text-primary tracking-tighter font-black">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-text-secondary uppercase tracking-widest">
                       <span>Tax (18% GST)</span>
                       <span className="text-primary tracking-tighter font-black">₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold text-success uppercase tracking-widest">
                       <span>Shipping Fee</span>
                       <span className="font-black">FREE</span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 overflow-hidden">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Grand Total</span>
                          <span className="text-primary font-black uppercase tracking-widest text-[9px] underline underline-offset-4 decoration-accent">Secure Transaction Active</span>
                       </div>
                       <p className="text-3xl sm:text-4xl font-black text-primary tracking-tighter leading-none" style={{ fontFamily: 'Inter' }}>
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
                        <Lock size={20} className="text-text-muted" />
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-primary uppercase tracking-widest">100% SECURE PAYMENTS</span>
                           <span className="text-[9px] text-text-muted font-medium italic">Industry standard SSL encryption</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        <Zap size={20} className="text-text-muted" />
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-primary uppercase tracking-widest">EXPRESS DELIVERY</span>
                           <span className="text-[9px] text-text-muted font-medium italic">Flagship priority shipping channel</span>
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
