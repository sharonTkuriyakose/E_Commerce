import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { X, Check, Activity, ShieldCheck, Box, User, CreditCard, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useAuth();

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

  const deliverHandler = async (id) => {
    if (window.confirm('Mark this order as delivered?')) {
      try {
        const res = await fetch(`http://localhost:5001/api/orders/${id}/deliver`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        if (!res.ok) throw new Error('Failed to update order');
        fetchOrders();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-dark-bg space-y-6">
        <div className="w-16 h-16 rounded-2xl border-2 border-accent-blue/10 border-t-accent-blue animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-blue">Indexing Archive...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-dark-bg selection:bg-accent/30 overflow-x-hidden">
      <div className="container mx-auto px-6 pb-24">
        {/* Cinematic Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 space-y-6"
        >
          <div className="text-[11px] font-black uppercase tracking-[0.5em] text-accent opacity-70 italic">Logistics Matrix</div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-none">
            Mission <span className="text-glow text-accent">Logs</span>
          </h1>
          <p className="text-dark-muted max-w-xl font-medium italic text-xl opacity-60">Historical record of all cross-nexus payload transfers.</p>
        </motion.div>

        {error ? (
          <div className="p-10 rounded-[3rem] bg-red-500/5 border border-red-500/20 text-red-500 text-center uppercase tracking-[0.3em] text-xs font-black backdrop-blur-xl">
            DATABASE SYNC FAILURE: {error}
          </div>
        ) : (
          <div className="rounded-[4rem] bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.6)]">
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/4">
                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-dark-muted">Log Hash</th>
                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-dark-muted">Operator</th>
                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-dark-muted">Chronology</th>
                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-dark-muted">Payload Matrix</th>
                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-dark-muted">Total Value</th>
                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-dark-muted text-center">Status</th>
                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-dark-muted text-right">Protocol</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {orders.map((order, i) => (
                      <motion.tr 
                        key={order._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-white/5 transition-all group cursor-pointer"
                        onClick={() => window.location.href = `/admin/orders/${order._id}`}
                      >
                        <td className="p-10">
                          <div className="flex items-center gap-4">
                             <ShieldCheck size={18} className="text-accent opacity-50" />
                             <span className="text-base font-mono font-black text-accent uppercase group-hover:text-glow group-hover:scale-105 transition-all">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                          </div>
                        </td>
                        <td className="p-10">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-lg font-black group-hover:bg-accent/30 transition-all shadow-[0_0_20px_rgba(255,63,108,0.1)]">
                              {order.user ? order.user.name.charAt(0) : '?'}
                            </div>
                            <div className="flex flex-col">
                              <div className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-glow transition-all">{order.user ? order.user.name : 'Unknown Operator'}</div>
                              <div className="text-[11px] font-black text-dark-muted uppercase tracking-[0.2em]">{order.user ? order.user.email : 'No Data Link'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-10">
                          <div className="flex items-center gap-3 text-dark-muted group-hover:text-white transition-colors">
                             <Calendar size={18} className="opacity-50" />
                             <span className="text-[12px] font-black uppercase tracking-[0.2em]">{order.createdAt && new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                          </div>
                        </td>
                        <td className="p-10 min-w-[350px]">
                          <div className="flex flex-col gap-5">
                            {order.orderItems && order.orderItems.slice(0, 2).map((item, index) => (
                              <div key={index} className="flex items-center gap-5 bg-white/2 p-4 rounded-[1.8rem] border border-white/10 group-hover:border-accent/40 transition-all shadow-2xl">
                                <div className="w-14 h-14 bg-black rounded-2xl p-2 border border-white/10 flex items-center justify-center overflow-hidden">
                                  <img src={item.image} alt={item.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-[1.3] transition-all duration-1000" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[12px] font-black text-white uppercase tracking-tighter line-clamp-1 italic">{item.name}</span>
                                  <span className="text-[11px] font-black text-dark-muted uppercase tracking-[0.2em]">UNIT_COUNT: 0{item.quantity}</span>
                                </div>
                              </div>
                            ))}
                            {order.orderItems.length > 2 && (
                               <div className="pl-8 text-[11px] font-black text-accent uppercase tracking-[0.3em] italic animate-pulse">+{order.orderItems.length - 2} ADDTL_CARGO_DETECTED</div>
                            )}
                          </div>
                        </td>
                        <td className="p-10">
                          <div className="text-3xl font-black text-white italic tracking-tighter group-hover:text-glow transition-all">₹{order.totalPrice.toLocaleString()}</div>
                          <div className="text-[11px] font-black text-dark-muted uppercase tracking-[0.3em]">NET_PAYLOAD_VAL</div>
                        </td>
                        <td className="p-10 text-center">
                          <div className="flex justify-center">
                            {order.isDelivered ? (
                              <div className="flex items-center gap-4 px-8 py-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                                <Check size={16} strokeWidth={4} /> Delivered
                              </div>
                            ) : (
                              <div className="flex items-center gap-4 px-8 py-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-black uppercase tracking-[0.3em] italic animate-pulse">
                                <Activity size={16} strokeWidth={4} /> In Transit
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-10 text-right">
                          <div className="flex items-center justify-end gap-4 translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700">
                             <div className="text-[11px] font-black text-white uppercase tracking-[0.4em] italic">Open Log</div>
                             <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center shadow-[0_10px_30px_rgba(255,63,108,0.3)]">
                                <ArrowRight size={22} />
                             </div>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
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
