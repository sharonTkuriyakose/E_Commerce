import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Calendar, Activity, Check, ArrowRight, Package, User, ShoppingBag, Truck, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useAuth();
  const { darkMode } = useTheme();

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
      <div className={`min-h-screen pt-32 flex flex-col items-center justify-center space-y-6 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white'}`}>
        <div className="w-16 h-16 rounded-2xl border-2 border-accent/10 border-t-accent animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Accessing Secure Archives...</p>
      </div>
    );
  }

  return (
    <div className={`pt-32 min-h-screen selection:bg-accent/30 overflow-x-hidden border-t border-border transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-primary'}`}>
      <div className="container mx-auto px-6 pb-24 max-w-6xl">
        {/* User Intelligence Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="lg:col-span-2 space-y-8"
           >
             <div>
               <div className="text-[11px] font-black uppercase tracking-[0.5em] text-accent opacity-70 mb-4">Personnel Intelligence</div>
               <h1 className="text-6xl md:text-8xl font-black text-primary tracking-tighter uppercase leading-none">
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
             className={`p-10 border border-border rounded-sm flex flex-col justify-center ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50'}`}
           >
              <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mb-4">Total Acquisitions</div>
              <div className="text-7xl font-black text-primary tracking-tighter leading-none">{orders.length}</div>
              <p className="text-xs text-text-muted font-medium mt-6 opacity-80 leading-relaxed">Global acquisitions across all tech sectors.</p>
           </motion.div>
        </div>

        {/* Orders Archive */}
        <div className="space-y-12 pt-10 border-t border-border">
           <div className="flex items-center justify-between px-3">
              <h2 className="text-3xl font-black text-primary uppercase tracking-tighter leading-none">Acquisition <span className="text-accent underline decoration-4 underline-offset-8">Logs</span></h2>
              <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em]">Historical Log Data</div>
           </div>

           {error ? (
             <div className="p-10 rounded-sm bg-red-500/5 border border-red-500/20 text-red-500 text-center uppercase tracking-[0.3em] text-[10px] font-black">
               SECURE ARCHIVE ACCESS DENIED: {error}
             </div>
           ) : orders.length === 0 ? (
             <div className={`group relative p-20 rounded-sm border border-border flex flex-col items-center justify-center space-y-10 overflow-hidden ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                <ShoppingBag size={80} className="text-primary/5 group-hover:text-accent/20 transition-all duration-700 transform group-hover:rotate-12" />
                <div className="text-center space-y-4">
                   <h3 className="text-2xl font-black text-primary uppercase tracking-tighter opacity-30">Log Database Empty</h3>
                   <p className="text-xs text-text-muted font-medium tracking-widest max-w-xs leading-relaxed mx-auto">No payload transfers have been authorized for this operator yet. Initialize a tech acquisition to generate logs.</p>
                </div>
                <Link to="/products" className="btn-primary px-16! py-6! rounded-sm! tracking-[0.3em]! shadow-2xl shadow-accent/20">START ACQUISITION</Link>
             </div>
           ) : (
             <div className="grid grid-cols-1 gap-12">
                {orders.map((order, i) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`group relative rounded-sm border border-border hover:border-accent transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 ${darkMode ? 'bg-slate-900 text-white' : 'bg-white text-primary'}`}
                  >
                     <div className="p-8 md:p-12 flex flex-col gap-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-border">
                           <div className="flex items-center gap-8">
                              <div className={`w-16 h-16 border border-border flex items-center justify-center group-hover:bg-accent/10 transition-all duration-500 rounded-sm ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                <Package size={28} className="text-primary opacity-40 group-hover:text-accent" />
                              </div>
                              <div className="space-y-1">
                                 <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mb-1">Payload Hash</div>
                                 <div className="text-xl font-black text-primary tracking-tighter uppercase underline decoration-accent/10">#{order._id.substring(order._id.length - 12)}</div>
                              </div>
                           </div>
                           
                           <div className="flex items-center gap-10">
                              <div className="text-center">
                                 <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em] mb-1">Acquired On</p>
                                 <p className="text-xs font-black text-primary uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em] mb-1">Total Value</p>
                                 <p className="text-[18px] font-black text-accent uppercase tracking-tighter leading-none">₹{order.totalPrice.toLocaleString()}</p>
                              </div>
                           </div>
                        </div>

                        {/* ADVANCED TRACKING TIMELINE - Premium Feature */}
                        <div className="space-y-6">
                           <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-8">Acquisition Timeline</h4>
                           <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                              {/* Connector Line */}
                              <div className="absolute top-4 left-4 md:left-0 md:top-1/2 w-0.5 h-full md:w-full md:h-0.5 bg-slate-100 -z-10">
                                 <div className={`h-full md:h-full bg-success transition-all duration-1000 ${order.isDelivered ? 'w-full' : 'w-2/3'}`}></div>
                              </div>

                              {[
                                { label: 'ORDER PLACED', icon: CheckCircle2, status: 'completed', time: '10:30 AM' },
                                { label: 'PROCESSING', icon: Clock, status: 'completed', time: '11:45 AM' },
                                { label: 'IN TRANSIT', icon: Truck, status: order.isDelivered ? 'completed' : 'active', time: order.isDelivered ? '02:00 PM' : 'PENDING' },
                                { label: 'DELIVERED', icon: ShieldCheck, status: order.isDelivered ? 'completed' : 'upcoming', time: order.isDelivered ? 'ARRIVED' : 'EST. 2 DAYS' }
                              ].map((step, idx) => (
                                <div key={idx} className="flex md:flex-col items-center gap-6 md:gap-4 relative z-10">
                                   <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${darkMode ? 'bg-slate-900' : 'bg-white'} ${
                                     step.status === 'completed' ? 'border-success text-success shadow-lg shadow-success/20 scale-110' : 
                                     step.status === 'active' ? 'border-accent text-accent animate-pulse' : 'border-slate-200 text-slate-300'
                                   }`}>
                                      <step.icon size={18} strokeWidth={2.5} />
                                   </div>
                                   <div className="flex flex-col md:items-center text-left md:text-center space-y-1">
                                      <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${step.status === 'upcoming' ? 'text-slate-300' : 'text-primary'}`}>{step.label}</span>
                                      <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">{step.time}</span>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>

                        <div className="pt-10 border-t border-border mt-4">
                           <div className="flex flex-wrap gap-4">
                              {order.orderItems.map((item, idx) => (
                                <div key={idx} className={`border border-border px-6 py-4 flex items-center gap-6 rounded-sm ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                                   <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-[11px] font-black shrink-0">x{item.quantity}</div>
                                   <span className="text-[13px] font-black text-primary uppercase truncate max-w-[300px]">{item.name}</span>
                                </div>
                              ))}
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
