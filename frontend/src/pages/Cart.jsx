import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, prices } = useCart();
  const { itemsPrice: subtotal, taxPrice: tax, totalPrice: total } = prices;

  return (
    <div className="pt-24 min-h-screen container mx-auto px-6 pb-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-12">
        Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-blue">Cart</span>
      </h1>

      {cartItems.length === 0 ? (
        <div className="py-20 text-center glass-panel w-full max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn-primary inline-block">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, height: 0, marginTop: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel p-4 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-blue to-accent-blue opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="w-32 h-32 bg-white/5 rounded-xl flex items-center justify-center p-2 shrink-0">
                    <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                  </div>
                  
                  <div className="flex-grow flex flex-col text-center sm:text-left">
                    <div className="text-xs font-bold text-accent-blue mb-1 uppercase tracking-wider">{item.category}</div>
                    <Link to={`/product/${item._id}`} className="text-xl font-bold hover:text-accent-blue transition-colors">{item.name}</Link>
                    <div className="text-xl font-light text-gray-300 mt-2 font-mono">₹{item.price.toLocaleString()}</div>
                  </div>

                  <div className="flex flex-col items-center gap-4 sm:items-end">
                    <div className="flex items-center bg-dark-bg border border-glass-border rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:text-accent-blue transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold px-1">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:text-accent-blue transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-500 hover:text-red-400 text-sm flex items-center transition-colors"
                    >
                      <Trash2 size={16} className="mr-1" /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-8 sticky top-28 before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent-blue/5 before:to-accent-blue/5 before:-z-10 before:rounded-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-white pb-4 border-b border-glass-border">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-gray-300 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-accent-blue uppercase text-sm font-sans font-bold pt-1">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-glass-border pt-6 mb-8">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black text-white font-mono">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              <Link to="/checkout" className="w-full btn-primary py-4 text-lg flex items-center justify-center group mb-4">
                Checkout <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex items-center justify-center text-xs text-gray-500">
                <ShieldCheck size={14} className="mr-1 text-accent-blue" />
                Secure Checkout Powered by Stripe
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
