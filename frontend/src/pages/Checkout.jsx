import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, CheckCircle2, Lock, Wallet, Smartphone, Banknote, ShieldCheck, ArrowLeft, ArrowRight, Package, Info, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const { userInfo } = useAuth();
  const { cartItems, prices, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    name: '', address: '', pincode: '', city: '', contact: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [createdOrder, setCreatedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, name: 'Shipping Address', icon: Truck },
    { id: 2, name: 'Payment Gateway', icon: CreditCard },
    { id: 3, name: 'Order Confirmation', icon: CheckCircle2 }
  ];

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = userInfo?.token;

      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        shippingAddress: {
          address: shippingData.address,
          city: shippingData.city,
          postalCode: shippingData.pincode,
          country: 'India'
        },
        paymentMethod: paymentMethod,
        itemsPrice: prices.itemsPrice,
        taxPrice: prices.taxPrice,
        shippingPrice: prices.shippingPrice,
        totalPrice: prices.totalPrice
      };

      const res = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();
      if (res.ok) {
        setCreatedOrder(data);
        clearCart();
        setStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(data.message || 'Order failed');
      }
    } catch (err) {
      console.error('Order error:', err);
      alert('Network error - check if backend is running');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-white">
      <div className="container mx-auto px-6 pb-24 max-w-6xl">
        {/* Step Progress - Minimal Retail style */}
        <div className="flex items-center justify-center gap-4 mb-20">
          {steps.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-3 relative">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= s.id ? 'bg-primary border-primary text-white' : 'bg-transparent border-border text-text-muted'}`}>
                  <s.icon size={20} strokeWidth={2.5} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest absolute -bottom-8 whitespace-nowrap ${step >= s.id ? 'text-primary' : 'text-text-muted'}`}>{s.name}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-1 w-20 md:w-40 rounded-full bg-border relative overflow-hidden mb-8`}>
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: step > s.id ? '100%' : '0%' }}
                     className="absolute inset-0 bg-primary"
                   />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start pt-10">
          {/* Main Checkout Area */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                   <div className="flex items-center justify-between pb-6 border-b border-border">
                      <h2 className="text-3xl font-black text-primary uppercase tracking-tighter italic">Delivery Details</h2>
                      <p className="text-[10px] text-text-muted font-bold tracking-widest">STEP 01/03</p>
                   </div>

                   <form onSubmit={handleShippingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="md:col-span-2 space-y-2">
                       <label className="text-xs font-black text-primary uppercase tracking-widest">Full Name</label>
                       <input 
                         required type="text" placeholder="John Doe" 
                         className="input-field" 
                         value={shippingData.name} onChange={(e) => setShippingData({...shippingData, name: e.target.value})}
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-black text-primary uppercase tracking-widest">Contact Number</label>
                       <input 
                         required type="tel" placeholder="+91 00000 00000" 
                         className="input-field"
                         value={shippingData.contact} onChange={(e) => setShippingData({...shippingData, contact: e.target.value})}
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-black text-primary uppercase tracking-widest">Pincode</label>
                       <input 
                         required type="text" placeholder="000 000" 
                         className="input-field"
                         value={shippingData.pincode} onChange={(e) => setShippingData({...shippingData, pincode: e.target.value})}
                       />
                     </div>
                     <div className="md:col-span-2 space-y-2">
                       <label className="text-xs font-black text-primary uppercase tracking-widest">Flat, House no., Building, Company, Apartment</label>
                       <textarea 
                         required placeholder="Enter full address" rows="3" 
                         className="input-field !h-32 resize-none"
                         value={shippingData.address} onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                       ></textarea>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-primary uppercase tracking-widest">Town / City</label>
                        <input 
                          required type="text" placeholder="Bengaluru" 
                          className="input-field"
                          value={shippingData.city} onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                        />
                     </div>
                     
                     <div className="md:col-span-2 pt-10">
                        <button type="submit" className="w-full btn-primary !rounded-sm !py-5 !tracking-[0.3em] shadow-xl shadow-accent/20 group">
                           PROCEED TO PAYMENT <ArrowRight size={20} className="group-hover:translate-x-1" />
                        </button>
                     </div>
                   </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
                   <div className="flex items-center justify-between pb-6 border-b border-border">
                      <h2 className="text-3xl font-black text-primary uppercase tracking-tighter italic">Secure Payment</h2>
                      <p className="text-[10px] text-text-muted font-bold tracking-widest">STEP 02/03</p>
                   </div>

                   <div className="grid grid-cols-1 gap-6">
                      {[
                        { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                        { id: 'upi', name: 'UPI (Popular choice)', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
                        { id: 'net', name: 'Net Banking', icon: Banknote, desc: 'All major Indian banks' },
                        { id: 'cod', name: 'Cash on Delivery', icon: Truck, desc: 'Pay when your item arrives' }
                      ].map(method => (
                        <div 
                          key={method.id} 
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-6 border-2 rounded-sm cursor-pointer transition-all flex items-center justify-between group ${paymentMethod === method.id ? 'border-accent bg-accent/5' : 'border-border hover:bg-slate-50'}`}
                        >
                           <div className="flex items-center gap-6">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${paymentMethod === method.id ? 'bg-accent text-white' : 'bg-slate-50 text-primary'}`}>
                                 <method.icon size={22} strokeWidth={2.5} />
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-sm font-black text-primary uppercase tracking-widest">{method.name}</span>
                                 <span className="text-[10px] font-bold text-text-muted">{method.desc}</span>
                              </div>
                           </div>
                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === method.id ? 'border-accent bg-accent' : 'border-border'}`}>
                             {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="pt-10 flex flex-col sm:flex-row gap-6">
                      <button onClick={() => setStep(1)} className="flex-1 btn-outline !rounded-sm !py-5 !tracking-[0.2em] font-black uppercase text-[11px] flex gap-2">
                         <ArrowLeft size={16} /> GO BACK
                      </button>
                      <button 
                        onClick={handlePaymentSubmit} 
                        disabled={loading}
                        className="flex-[2] btn-primary !rounded-sm !py-5 !tracking-[0.3em] font-black text-[12px] group italic shadow-xl shadow-accent/20 disabled:opacity-50"
                      >
                         {loading ? 'PROCESSING...' : 'CONFIRM & PAY NOW'} <ArrowRight size={20} className="group-hover:translate-x-1" />
                      </button>
                   </div>
                </motion.div>
              )}

              {step === 3 && createdOrder && (
                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-10">
                   <div className="w-24 h-24 rounded-full bg-success text-white flex items-center justify-center mb-10 shadow-xl shadow-success/20">
                      <CheckCircle2 size={48} strokeWidth={3} />
                   </div>
                   <h2 className="text-4xl font-black text-primary uppercase tracking-tighter mb-4 italic leading-none">Order Successful!</h2>
                   <p className="text-text-muted max-w-sm mb-12 text-sm font-medium leading-relaxed">Thank you for your retail trust. Your transaction ID <span className="font-bold text-accent">#{createdOrder._id.slice(-8).toUpperCase()}</span> has been confirmed.</p>
                   
                   {/* Real Order Detail Card */}
                   <div className="w-full bg-slate-50 border border-border p-8 rounded-sm mb-12 text-left space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-border">
                         <span className="text-[10px] font-black text-primary uppercase tracking-widest">Order Summary</span>
                         <span className="text-[10px] font-black text-success uppercase tracking-widest">Total: ₹{createdOrder.totalPrice.toLocaleString()}</span>
                      </div>
                      
                      <div className="space-y-4">
                        {createdOrder.orderItems.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <img src={item.image} className="w-10 h-10 object-contain p-1 bg-white border border-border" alt={item.name} />
                              <div className="flex flex-col">
                                <span className="text-[11px] font-black text-primary uppercase tracking-tighter truncate max-w-[150px]">{item.name}</span>
                                <span className="text-[9px] font-bold text-text-muted">QTY: {item.quantity}</span>
                              </div>
                            </div>
                            <span className="text-xs font-black text-primary tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-border space-y-3">
                         <div className="flex justify-between items-center text-[9px] text-text-muted font-bold uppercase tracking-widest">
                            <span>Expected Delivery</span>
                            <span className="text-primary italic">Within 24-48 Hours</span>
                         </div>
                         <div className="flex justify-between items-center text-[9px] text-text-muted font-bold uppercase tracking-widest">
                            <span>Ship To</span>
                            <span className="text-primary italic">{createdOrder.shippingAddress.city}</span>
                         </div>
                      </div>
                   </div>

                   <Link to="/" className="btn-primary !px-16 !py-5 !tracking-[0.3em] !text-[12px] shadow-xl shadow-accent/20">
                      RETURN TO HOME <ArrowRight size={20} className="ml-2" />
                   </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Checkout Order Summary Area */}
          <div className="lg:col-span-5 sticky top-32">
             <div className="p-10 border border-border bg-slate-50 rounded-sm">
                <div className="flex justify-between items-end mb-8 border-b border-border pb-6">
                   <h2 className="text-[11px] font-black text-primary uppercase tracking-[0.3em]">Order Summary</h2>
                   <span className="text-[10px] text-text-muted font-black border border-border px-2 py-0.5">{cartItems.length} ITEMS</span>
                </div>

                <div className="space-y-6 max-h-[350px] overflow-y-auto no-scrollbar pr-2 mb-10">
                   {cartItems.map((item) => (
                     <div key={item._id} className="flex gap-4 items-center">
                        <div className="w-12 h-16 bg-white border border-border rounded-sm p-2 shrink-0">
                           <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-grow flex flex-col">
                           <span className="text-xs font-black text-primary uppercase tracking-tighter truncate max-w-[200px]">{item.name}</span>
                           <span className="text-[10px] font-bold text-text-muted">QTY: {item.quantity} · Flagship Model</span>
                        </div>
                        <span className="text-sm font-black text-primary tracking-tighter">₹{(item.price * item.quantity).toLocaleString()}</span>
                     </div>
                   ))}
                </div>

                <div className="space-y-4 pt-10 border-t border-border">
                   <div className="flex justify-between items-center text-[10px] font-black text-text-muted uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span className="text-primary">₹{prices.itemsPrice.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black text-text-muted uppercase tracking-widest">
                      <span>GST (18%)</span>
                      <span className="text-primary">₹{prices.taxPrice.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black text-success uppercase tracking-widest">
                      <span>Shipping</span>
                      <span className="rotate-3 italic border border-success px-2 font-black">LEGENDARY FREE</span>
                   </div>
                   <div className="flex justify-between items-center pt-8 border-t border-border mt-4">
                      <span className="text-xs font-black text-primary uppercase tracking-[0.2em] italic underline decoration-4 decoration-accent/20">Grand Total</span>
                      <span className="text-3xl font-black text-primary tracking-tighter leading-none" style={{ fontFamily: 'Inter' }}>₹{prices.totalPrice.toLocaleString()}</span>
                   </div>
                </div>

                <div className="mt-12 flex flex-col gap-5 pt-10 border-t border-border">
                   <div className="flex items-center gap-4 bg-white/50 p-4 border border-border rounded-sm">
                      <ShieldCheck size={20} className="text-accent" />
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-primary uppercase tracking-widest">Official Tech Retailer</span>
                         <span className="text-[9px] text-text-muted font-medium italic">Verified by Global Electronic Hub</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 border border-border p-4 rounded-sm">
                      <Lock size={20} className="text-text-muted" />
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-primary uppercase tracking-widest">PCI-DSS COMPLIANT</span>
                         <span className="text-[9px] text-text-muted font-medium italic">Encryption Level 256-bit active</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
