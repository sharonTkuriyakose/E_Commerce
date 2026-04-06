import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Package, User, CreditCard, Truck, Calendar, ShieldCheck, Activity, Check, ExternalLink, Hash, Info } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const { userInfo } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch transmission logs');
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, userInfo]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-dark-bg space-y-6">
        <div className="w-16 h-16 rounded-2xl border-2 border-accent-blue/10 border-t-accent-blue animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-blue">Decrypting Payload Data...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-dark-bg p-6">
        <div className="glass-panel p-12 rounded-[3.5rem] border border-red-500/20 text-center space-y-6 max-w-2xl">
           <Activity size={48} className="text-red-500 mx-auto" />
           <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Sync Error</h2>
           <p className="text-gray-500 font-medium">{error || 'Transmission not found in global registry.'}</p>
           <Link to="/admin/orders" className="btn-primary !px-10 !py-4 inline-block">Return to Logs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-dark-bg selection:bg-accent-blue/30 overflow-x-hidden">
      <div className="container mx-auto px-6 pb-24 max-w-6xl">
        {/* Cinematic Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 space-y-4"
        >
          <Link to="/admin/orders" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors group mb-4">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Archive Index
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-blue opacity-70">Transmission Details</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
              Payload <span className="text-glow text-accent-blue">Report</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Hash size={16} className="text-accent-blue" />
                <span className="text-sm font-mono font-black text-white uppercase tracking-tighter">{order._id.substring(order._id.length - 12).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Side */}
          <div className="lg:col-span-2 space-y-10">
            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className={`glass-panel p-8 rounded-[2.5rem] border transition-all duration-500 ${order.isPaid ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-amber-500/20 bg-amber-500/5'}`}>
                  <div className="flex items-center justify-between mb-6">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${order.isPaid ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        <CreditCard size={20} />
                     </div>
                     <span className={`text-[10px] font-black uppercase tracking-widest ${order.isPaid ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {order.isPaid ? 'Credits Transferred' : 'Payment Required'}
                     </span>
                  </div>
                  <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2">Financial Protocol</h3>
                  <p className="text-[11px] font-medium text-gray-500 italic">
                     {order.isPaid ? `Finalized at: ${new Date(order.paidAt).toLocaleString()}` : 'Awaiting credit verification from neural node.'}
                  </p>
               </div>

               <div className={`glass-panel p-8 rounded-[2.5rem] border transition-all duration-500 ${order.isDelivered ? 'border-accent-blue/20 bg-accent-blue/5' : 'border-gray-500/10 bg-white/2'}`}>
                  <div className="flex items-center justify-between mb-6">
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${order.isDelivered ? 'bg-accent-blue/20 text-accent-blue' : 'bg-white/5 text-gray-500'}`}>
                        <Truck size={20} />
                     </div>
                     <span className={`text-[10px] font-black uppercase tracking-widest ${order.isDelivered ? 'text-accent-blue' : 'text-gray-500'}`}>
                        {order.isDelivered ? 'Payload Deployed' : 'In Transit'}
                     </span>
                  </div>
                  <h3 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2">Logistics Pipeline</h3>
                  <p className="text-[11px] font-medium text-gray-500 italic">
                     {order.isDelivered ? `Delivered at: ${new Date(order.deliveredAt).toLocaleString()}` : 'Cross-nexus transfer in progress.'}
                  </p>
               </div>
            </div>

            {/* Payload Breakdown */}
            <div className="glass-panel p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-accent-blue shadow-[0_0_20px_rgba(0,240,255,0.4)]"></div>
               <div className="flex items-center gap-4 mb-10">
                  <Package size={24} className="text-white opacity-50" />
                  <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Hardware manifest</h2>
               </div>

               <div className="space-y-6">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between group p-4 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-dark-bg border border-white/5 p-3 flex items-center justify-center relative overflow-hidden">
                             <div className="absolute inset-0 bg-accent-blue/10 filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             <img src={item.image} alt={item.name} className="w-full h-full object-contain relative z-10 filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                          </div>
                          <div className="space-y-1">
                             <Link to={`/product/${item.product}`} className="text-lg font-black text-white italic uppercase tracking-tighter hover:text-accent-blue transition-colors">{item.name}</Link>
                             <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                Qty: {item.quantity} <span className="w-1 h-1 rounded-full bg-gray-700"></span> Unit Price: ₹{item.price.toLocaleString()}
                             </div>
                          </div>
                       </div>
                       <div className="text-xl font-black text-white italic tracking-tighter">
                          ₹{(item.quantity * item.price).toLocaleString()}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar Modules */}
          <div className="space-y-10">
             {/* Operator Profile */}
             <div className="glass-panel p-8 rounded-[3rem] border border-white/5 space-y-8">
                <div className="flex items-center gap-3">
                   <User size={18} className="text-gray-500" />
                   <h2 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Operator Identity</h2>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue text-lg font-black">
                      {order.user ? order.user.name.charAt(0) : '?'}
                   </div>
                   <div>
                      <div className="text-lg font-black text-white uppercase italic tracking-tighter">{order.user ? order.user.name : 'Unknown Operator'}</div>
                      <a href={`mailto:${order.user?.email}`} className="text-[10px] font-medium text-gray-500 hover:text-accent-blue transition-colors">{order.user?.email}</a>
                   </div>
                </div>
                
                <div className="pt-6 border-t border-white/5 space-y-4">
                   <div className="flex items-center gap-3">
                      <Truck size={14} className="text-gray-600" />
                      <h4 className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Deployment Destination</h4>
                   </div>
                   <p className="text-xs font-medium text-gray-500 leading-relaxed italic">
                      {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                      {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                   </p>
                </div>
             </div>

             {/* Financial Breakdown */}
             <div className="glass-panel p-8 rounded-[3rem] border border-white/5 space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent-blue/[0.03] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-3 relative z-10">
                   <Activity size={18} className="text-gray-500" />
                   <h2 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Credit Analysis</h2>
                </div>
                
                <div className="space-y-4 relative z-10">
                   <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-500">
                      <span>Baseline Items</span>
                      <span className="text-white">₹{order.itemsPrice.toLocaleString()}</span>
                   </div>
                   <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-500">
                      <span>Logistics Fee</span>
                      <span className="text-white">₹{order.shippingPrice.toLocaleString()}</span>
                   </div>
                   <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-500">
                      <span>System Tax</span>
                      <span className="text-white">₹{order.taxPrice.toLocaleString()}</span>
                   </div>
                   <div className="h-[1px] bg-white/5 my-6"></div>
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-blue">Total Credits</span>
                      <span className="text-4xl font-black text-white italic tracking-tighter text-glow-blue">₹{order.totalPrice.toLocaleString()}</span>
                   </div>
                </div>

                <div className="pt-10 relative z-10">
                   <button className="w-full py-4 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-accent-blue hover:text-white transition-all shadow-xl">
                      <ExternalLink size={14} /> Print Audit Log
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* Audit Disclaimer Footer */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
           <div className="flex items-center gap-4">
              <ShieldCheck size={20} className="text-gray-500" />
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">This transmission report is immutable. Cryptographically signed by Nexus-Core-Alpha-7.</p>
           </div>
           <div className="text-[8px] font-black uppercase tracking-[0.5em] text-gray-700">RDX-ORDER-ENVOY // V4.1.2</div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
