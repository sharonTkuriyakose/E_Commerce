import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, CheckCircle2, ChevronRight, Lock, Wallet, Smartphone, Banknote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { cartItems, prices, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setError('');
    setLoading(true);

    const orderData = {
      orderItems: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        product: item._id
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice: prices.itemsPrice,
      taxPrice: prices.taxPrice,
      shippingPrice: prices.shippingPrice,
      totalPrice: prices.totalPrice
    };

    try {
      const res = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        clearCart();
        setStep(3);
      } else {
        const data = await res.json();
        setError(data.message || 'Order failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen container mx-auto px-6 pb-24">
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-16 mt-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/5 rounded-full -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-accent-blue to-accent-blue rounded-full -z-10 transition-all duration-500"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          ></div>
          
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-accent-blue text-dark-bg neon-glow' : 'glass-panel text-gray-500'}`}>1</div>
            <span className={`text-xs mt-2 font-medium ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>Shipping</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-accent-blue text-dark-bg shadow-[0_0_15px_rgba(0,240,255,0.5)]' : 'glass-panel text-gray-500'}`}>2</div>
            <span className={`text-xs mt-2 font-medium ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>Payment</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-dark-bg shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'glass-panel text-gray-500'}`}>3</div>
            <span className={`text-xs mt-2 font-medium ${step >= 3 ? 'text-white' : 'text-gray-500'}`}>Confirmation</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="shipping"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-panel p-8"
              >
                <div className="flex items-center mb-8 border-b border-glass-border pb-4">
                  <Truck className="text-accent-blue mr-3" size={28} />
                  <h2 className="text-2xl font-bold">Shipping Information</h2>
                </div>

                <form className="space-y-6" onSubmit={handleOrderSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                       <input type="text" readOnly value={userInfo?.name || ''} className="w-full bg-dark-bg/30 border border-glass-border rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
                    <input 
                      type="text" 
                      required 
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                      className="w-full bg-dark-bg border border-glass-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent-blue" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                      <input 
                        type="text" 
                        required 
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                        className="w-full bg-dark-bg border border-glass-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent-blue" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">ZIP Code</label>
                      <input 
                        type="text" 
                        required 
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                        className="w-full bg-dark-bg border border-glass-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent-blue" 
                      />
                    </div>
                  </div>

                  <button type="submit" className="w-full btn-primary py-4 mt-8 flex justify-center items-center group">
                    Continue to Payment <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass-panel p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="flex items-center mb-8 border-b border-glass-border pb-4">
                  <Wallet className="text-accent-blue mr-3" size={28} />
                  <h2 className="text-2xl font-bold">Payment Method</h2>
                </div>

                <div className="mb-8 p-4 bg-dark-bg border border-accent-blue/30 rounded-xl flex items-start space-x-4">
                  <Lock className="text-accent-blue mt-1 shrink-0" size={20} />
                  <p className="text-sm text-gray-300">
                    Your payment information is encrypted and secure. We use industry-standard security protocols.
                  </p>
                </div>

                {/* Payment Options Selector */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <button 
                    type="button" 
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${paymentMethod === 'card' ? 'border-accent-blue bg-accent-blue/10 text-white' : 'border-glass-border text-gray-400 hover:border-gray-500'}`}
                  >
                    <CreditCard size={24} className={`mb-2 ${paymentMethod === 'card' ? 'text-accent-blue' : ''}`} />
                    <span className="text-sm font-bold">Credit/Debit Card</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${paymentMethod === 'upi' ? 'border-accent-blue bg-accent-blue/10 text-white' : 'border-glass-border text-gray-400 hover:border-gray-500'}`}
                  >
                    <Smartphone size={24} className={`mb-2 ${paymentMethod === 'upi' ? 'text-accent-blue' : ''}`} />
                    <span className="text-sm font-bold">UPI / Apps</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${paymentMethod === 'cod' ? 'border-accent-blue bg-accent-blue/10 text-white' : 'border-glass-border text-gray-400 hover:border-gray-500'}`}
                  >
                    <Banknote size={24} className={`mb-2 ${paymentMethod === 'cod' ? 'text-accent-blue' : ''}`} />
                    <span className="text-sm font-bold">Cash on Delivery</span>
                  </button>
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleOrderSubmit}>
                  
                  {/* Credit Card Form */}
                  {paymentMethod === 'card' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Card Number</label>
                        <input type="text" required placeholder="0000 0000 0000 0000" className="w-full bg-dark-bg border border-glass-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent-blue font-mono" />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="col-span-1 md:col-span-2">
                          <label className="block text-sm font-medium text-gray-400 mb-2">Name on Card</label>
                          <input type="text" required className="w-full bg-dark-bg border border-glass-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent-blue" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Expiry</label>
                          <input type="text" required placeholder="12/26" className="w-full bg-dark-bg border border-glass-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent-blue font-mono" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">CVC</label>
                          <input type="password" required placeholder="123" className="w-full bg-dark-bg border border-glass-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent-blue font-mono" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* UPI Form */}
                  {paymentMethod === 'upi' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
                      <div className="text-center p-6 border border-glass-border border-dashed rounded-xl bg-dark-bg/50">
                        <div className="w-40 h-40 bg-white p-2 mx-auto mb-4 rounded-lg shadow-lg">
                          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=ecommerce@upi&am=${prices.totalPrice}&cu=INR`} alt="UPI QR Code" className="w-full h-full" />
                        </div>
                        <p className="text-sm tracking-wide text-gray-300">Scan QR Code using Google Pay, PhonePe, Paytm, or any UPI App</p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="border-t border-glass-border flex-grow"></div>
                        <span className="text-gray-500 font-bold uppercase text-xs">OR ENTER UPI ID</span>
                        <div className="border-t border-glass-border flex-grow"></div>
                      </div>

                      <div>
                        <input type="text" placeholder="example@upi" className="w-full bg-dark-bg border border-glass-border rounded-lg px-4 py-3 focus:outline-none focus:border-accent-blue" />
                        <p className="text-xs text-gray-500 mt-2">We will send a payment request to this UPI ID.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Cash on Delivery Form */}
                  {paymentMethod === 'cod' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
                       <div className="p-6 border border-accent-blue/30 rounded-xl bg-accent-blue/5">
                        <p className="text-gray-300 text-center text-lg font-medium">
                          You have selected Cash on Delivery. 
                        </p>
                        <p className="text-center text-sm text-gray-400 mt-2">
                          Please keep the exact amount ready at the time of delivery. A verification code will be sent to your phone.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex space-x-4 mt-8 pt-6 border-t border-glass-border">
                    <button type="button" onClick={() => setStep(1)} className="btn-outline w-1/3 py-4">Back</button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-2/3 btn-primary py-4 flex justify-center items-center group disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : (paymentMethod === 'cod' ? 'Confirm Order' : `Pay ₹${prices.totalPrice.toLocaleString()}`)} 
                      {!loading && <CheckCircle2 className="ml-2 group-hover:scale-110 transition-transform" />}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel p-12 text-center relative overflow-hidden flex flex-col items-center"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1),transparent_70%)] pointer-events-none"></div>
                
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, 0] }}
                  transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent-blue to-green-400 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,240,255,0.5)]"
                >
                  <CheckCircle2 size={48} className="text-dark-bg" />
                </motion.div>

                <h2 className="text-4xl font-bold mb-4">Order Confirmed!</h2>
                <p className="text-xl text-gray-300 mb-2">
                  {paymentMethod === 'cod' ? 'Your order will be shipped soon.' : 'Thank you for your premium purchase.'}
                </p>
                <p className="text-gray-500 mb-8 font-mono border border-glass-border px-4 py-2 rounded-lg inline-block">Order #ORN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>

                <Link to="/" className="btn-primary inline-flex items-center px-8 py-3">
                  Return to Home
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Concise Order Summary Sidebar */}
        {step < 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-panel p-6 sticky top-28 bg-dark-bg/80">
              <h3 className="text-xl font-bold mb-6 border-b border-glass-border pb-4">In Your Bag</h3>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex space-x-4">
                    <div className="w-16 h-16 bg-white/5 rounded-lg p-1 shrink-0">
                      <img src={item.image} className="w-full h-full object-contain" alt={item.name} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm line-clamp-1">{item.name}</h4>
                      <span className="text-xs text-gray-400 font-mono text-accent-blue">x{item.quantity}</span>
                      <div className="font-mono text-sm mt-1">₹{item.price}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-glass-border mb-4"></div>

              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-glass-border/50">
                <span className="font-bold">Total Pay</span>
                <span className="text-2xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-white">₹{prices.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
