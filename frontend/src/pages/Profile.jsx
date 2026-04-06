import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Calendar, Activity, Check, ArrowRight, Package, User, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/orders/myorders', {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch your log history');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
       fetchMyOrders();
    }
  }, [userInfo]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-white space-y-6">
        <div className="w-16 h-16 rounded-2xl border-2 border-accent/10 border-t-accent animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Accessing Secure Archives...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-white selection:bg-accent/30 overflow-x-hidden border-t border-border">
      <div className="container mx-auto px-6 pb-24 max-w-6xl">
        {/* User Intelligence Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="lg:col-span-2 space-y-8"
           >
             <div>
               <div className="text-[11px] font-black uppercase tracking-[0.5em] text-accent opacity-70 italic mb-4">Personnel Intelligence</div>
               <h1 className="text-6xl md:text-8xl font-black text-primary tracking-tighter uppercase italic leading-none">
                 User <span className="text-accent underline decoration-8 underline-offset-8">Profile</span>
               </h1>
               <div className="flex flex-wrap items-center gap-6 mt-10">
                  <div className="px-6 py-3 rounded-md bg-slate-50 border border-border flex items-center gap-3">
                    <User size={18} className="text-accent" />
                    <span className="text-sm font-black text-primary uppercase tracking-widest">{userInfo.name}</span>
                  </div>
                  <div className="px-6 py-3 rounded-md bg-slate-50 border border-border flex items-center gap-3">
                    <Activity size={18} className="text-accent" />
                    <span className="text-sm font-black text-primary uppercase tracking-widest">Active Operator</span>
                  </div>
               </div>
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="bg-slate-50 p-10 border border-border rounded-sm flex flex-col justify-center"
           >
              <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mb-4 italic">Total Acquisitions</div>
              <div className="text-7xl font-black text-primary tracking-tighter italic leading-none">{orders.length}</div>
              <p className="text-xs text-text-muted font-medium italic mt-6 opacity-80 leading-relaxed">Global acquisitions across all tech sectors.</p>
           </motion.div>
        </div>

        {/* Orders Archive */}
        <div className="space-y-12 pt-10 border-t border-border">
           <div className="flex items-center justify-between px-3">
              <h2 className="text-3xl font-black text-primary uppercase italic tracking-tighter leading-none">Acquisition <span className="text-accent underline decoration-4 underline-offset-8">Logs</span></h2>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">Historical Log Data</div>
           </div>

           {error ? (
             <div className="p-10 rounded-sm bg-red-500/5 border border-red-500/20 text-red-500 text-center uppercase tracking-[0.3em] text-[10px] font-black italic">
               SECURE ARCHIVE ACCESS DENIED: {error}
             </div>
           ) : orders.length === 0 ? (
             <div className="group relative p-20 rounded-sm bg-slate-50 border border-border flex flex-col items-center justify-center space-y-10 overflow-hidden">
                <ShoppingBag size={80} className="text-primary/5 group-hover:text-accent/20 transition-all duration-700 transform group-hover:rotate-12" />
                <div className="text-center space-y-4">
                   <h3 className="text-2xl font-black text-primary uppercase italic tracking-tighter opacity-30">Log Database Empty</h3>
                   <p className="text-xs text-text-muted font-medium italic tracking-widest max-w-xs leading-relaxed mx-auto">No payload transfers have been authorized for this operator yet. Initialize a tech acquisition to generate logs.</p>
                </div>
                <Link to="/products" className="btn-primary px-16! py-6! rounded-sm! tracking-[0.3em]! shadow-2xl shadow-accent/20">START ACQUISITION</Link>
             </div>
           ) : (
             <div className="grid grid-cols-1 gap-10">
                {orders.map((order, i) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative rounded-sm bg-white border border-border hover:border-accent transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 overflow-hidden"
                  >
                     <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="grow space-y-8">
                           <div className="flex items-center gap-10">
                              <div className="w-20 h-20 bg-slate-50 border border-border flex items-center justify-center group-hover:bg-accent/10 transition-all duration-500 rounded-sm">
                                <Package size={32} className="text-primary opacity-40 group-hover:text-accent" />
                              </div>
                              <div className="space-y-2">
                                 <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] italic mb-1">Payload Hash</div>
                                 <div className="text-2xl font-black text-primary italic tracking-tighter transition-all uppercase underline decoration-accent/10">#{order._id.substring(order._id.length - 12)}</div>
                              </div>
                           </div>
                           
                           <div className="flex flex-wrap gap-4">
                              {order.orderItems.map((item, idx) => (
                                <div key={idx} className="bg-slate-50 border border-border px-5 py-3 flex items-center gap-4 group-hover:border-accent/40 transition-colors rounded-sm">
                                  <div className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-[10px] font-black shrink-0">x{item.quantity}</div>
                                  <span className="text-[12px] font-black text-primary uppercase italic truncate max-w-[250px]">{item.name}</span>
                                </div>
                              ))}
                           </div>

                           <div className="flex items-center gap-8 pt-4">
                              <div className="flex items-center gap-3 text-text-muted bg-slate-50 px-4 py-2 rounded-sm border border-transparent group-hover:border-border">
                                 <Calendar size={14} className="opacity-60" />
                                 <span className="text-[10px] font-black uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                              </div>
                              <div className="text-[12px] font-black text-primary uppercase tracking-[0.3em] italic border-b-2 border-accent">₹{order.totalPrice.toLocaleString()}</div>
                           </div>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-10 min-w-[200px]">
                           <div className="flex flex-col items-center md:items-end">
                              <div className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em] mb-4 italic">Authorization Status</div>
                              {order.isDelivered ? (
                                <div className="flex items-center gap-3 px-8 py-3 rounded-sm bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-emerald-500/20">
                                  COMPLETED
                                </div>
                              ) : (
                                <div className="flex items-center gap-3 px-8 py-3 rounded-sm bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-black uppercase tracking-[0.4em] italic shadow-lg shadow-amber-500/5">
                                  IN TRANSIT
                                </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
