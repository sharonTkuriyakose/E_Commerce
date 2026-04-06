import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { X, Check, Activity, ShieldCheck, Box, User, CreditCard, Calendar, ArrowRight, ExternalLink, Package, ShoppingBag, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [userInfo]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/orders', {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-white space-y-6">
        <div className="w-16 h-16 rounded-full border-4 border-border border-t-accent animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Indexing Archive...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-white border-t border-border">
      <div className="container mx-auto px-6 pb-24 max-w-7xl">
        {/* Professional Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <p className="text-[11px] font-black text-accent uppercase tracking-[0.5em] mb-4">Logistics Management</p>
             <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tighter uppercase leading-none">
                Order <span className="text-slate-300">Catalog</span>
             </h1>
          </motion.div>
          <div className="bg-slate-50 border border-border px-6 py-3 rounded-md flex items-center gap-3">
             <ShoppingBag size={18} className="text-accent" />
             <span className="text-[11px] font-black text-primary uppercase tracking-widest">{orders.length} ACTIVE LOGS</span>
          </div>
        </div>

        {error ? (
          <div className="p-10 rounded-sm bg-red-50 text-red-500 text-center uppercase tracking-widest text-xs font-black border border-red-100">
            DATABASE SYNC FAILURE: {error}
          </div>
        ) : (
          <div className="bg-white border border-border rounded-sm overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-border">
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Order ID</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Customer</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Date</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-right">Revenue</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-center">Status</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.map((order) => (
                    <tr 
                      key={order._id}
                      className="hover:bg-slate-50/50 transition-all group"
                    >
                      <td className="p-8">
                        <span className="text-sm font-black text-primary uppercase tracking-tighter">#{order._id.slice(-8).toUpperCase()}</span>
                      </td>
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-slate-100 border border-border flex items-center justify-center text-primary font-black text-xs">
                              {order.user ? order.user.name.charAt(0) : '?'}
                           </div>
                           <div className="flex flex-col">
                              <span className="text-sm font-black text-primary uppercase">{order.user ? order.user.name : 'Unknown'}</span>
                              <span className="text-[10px] font-bold text-text-muted">{order.user ? order.user.email : 'N/A'}</span>
                           </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <div className="flex items-center gap-2 text-text-muted">
                           <Calendar size={14} />
                           <span className="text-[11px] font-black uppercase text-nowrap">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="p-8 text-right">
                        <span className="text-lg font-black text-primary tracking-tighter">₹{order.totalPrice.toLocaleString()}</span>
                      </td>
                      <td className="p-8">
                        <div className="flex justify-center">
                           {order.isDelivered ? (
                              <div className="px-4 py-1.5 rounded-full bg-success/10 text-success border border-success/20 text-[9px] font-black uppercase tracking-widest">
                                COMPLETED
                              </div>
                           ) : (
                              <div className="px-4 py-1.5 rounded-full bg-warning/10 text-warning border border-warning/20 text-[9px] font-black uppercase tracking-widest">
                                PROCESSING
                              </div>
                           )}
                        </div>
                      </td>
                      <td className="p-8 text-right">
                         <div className="flex items-center justify-end gap-3">
                            <button 
                              onClick={() => navigate(`/admin/orders/${order._id}`)}
                              className="w-10 h-10 bg-white border border-border rounded-md flex items-center justify-center text-primary hover:border-accent hover:text-accent transition-all shadow-sm"
                            >
                               <Eye size={18} />
                            </button>
                            <button className="w-10 h-10 bg-white border border-border rounded-md flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-all shadow-sm">
                               <ExternalLink size={16} />
                            </button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
