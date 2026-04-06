import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Package, ShoppingBag, DollarSign, Check, Activity, ShieldCheck, Zap, ArrowRight, TrendingUp, Calendar, Search, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${userInfo.token}` };
        
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          fetch('http://localhost:5001/api/users', { headers }),
          fetch('http://localhost:5001/api/products'),
          fetch('http://localhost:5001/api/orders', { headers })
        ]);

        if (usersRes.ok && productsRes.ok && ordersRes.ok) {
          setUsers(await usersRes.json());
          setProducts(await productsRes.json());
          setOrders(await ordersRes.json());
        }
      } catch (error) {
        console.error("Dashboard synchronization failure", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userInfo]);

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  const recentOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);

  const stats = [
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50', trend: 'Financial Summary', link: '/admin/orders' },
    { title: 'Personnel Count', value: users.length, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: 'Total Global Users', link: '/admin/users' },
    { title: 'Asset Inventory', value: products.length, icon: Package, color: 'text-violet-600', bg: 'bg-violet-50', trend: 'Active SKUs', link: '/admin/products' },
    { title: 'Order Protocol', value: orders.length, icon: ShoppingBag, color: 'text-rose-600', bg: 'bg-rose-50', trend: 'Acquisitions', link: '/admin/orders' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-white space-y-6">
        <div className="w-16 h-16 rounded-full border-4 border-slate-100 border-t-primary animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Synchronizing Logs...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-white selection:bg-primary/10 overflow-x-hidden">
      <div className="container mx-auto px-6 pb-24 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 border-b border-slate-100 pb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <p className="text-[11px] font-black text-rose-500 uppercase tracking-[0.5em] mb-4">Management Intelligence</p>
             <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tighter uppercase leading-none">
                Admin <span className="text-slate-300">Dashboard</span>
             </h1>
             <p className="text-slate-400 mt-6 text-lg font-medium">Verified Session: {userInfo.name} // Global Administrator Protocol Active.</p>
          </motion.div>
          
          <div className="flex items-center gap-4">
             <div className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-md flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-primary uppercase tracking-widest text-nowrap">System Active</span>
             </div>
             <Link to="/admin/products/new" className="btn-primary py-4! px-8! rounded-md! text-[11px]! tracking-[0.2em]! font-black">
                <Zap size={16} /> NEW ASSET +
             </Link>
          </div>
        </div>

        {/* Global Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(stat.link)}
              className="bg-slate-50 p-8 border border-slate-200 rounded-sm group hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1"
            >
               <div className="flex items-center justify-between mb-8">
                  <div className={`w-14 h-14 rounded-md ${stat.bg} flex items-center justify-center ${stat.color} group-hover:bg-primary group-hover:text-white transition-colors`}>
                    <stat.icon size={26} strokeWidth={2.5} />
                  </div>
                  <TrendingUp size={20} className="text-slate-300" />
               </div>
               <div className="space-y-1">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{stat.title}</h3>
                  <div className="text-4xl font-black text-primary tracking-tighter">{stat.value}</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pt-2">{stat.trend}</div>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Action Center Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Recent Acquisitions Table */}
          <div className="lg:col-span-2 space-y-10">
             <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tighter">Acquisition <span className="text-rose-500">Logs</span></h2>
                <Link to="/admin/orders" className="text-[10px] font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.3em]">View Global Archive</Link>
             </div>

             <div className="space-y-6">
                {recentOrders.length === 0 ? (
                  <div className="p-12 text-center bg-slate-50 border border-dashed border-slate-300 text-slate-400 text-xs font-black uppercase tracking-widest">Zero active logs detected.</div>
                ) : (
                  recentOrders.map((order) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                      className="bg-white border border-slate-100 hover:border-primary p-8 transition-all group flex flex-col md:flex-row items-center gap-8 cursor-pointer relative"
                    >
                       <div className="shrink-0 flex flex-col items-center">
                          <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-primary font-black group-hover:bg-rose-500 group-hover:text-white transition-all transform group-hover:rotate-12 uppercase">
                             {order.user?.name.charAt(0) || '?'}
                          </div>
                       </div>
                       
                       <div className="grow space-y-4 text-center md:text-left">
                          <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                             <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">HASH: #{order._id.slice(-8).toUpperCase()}</span>
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">// Verify: {order.user?.name.toUpperCase() || 'EXTERNAL'}</span>
                          </div>
                          
                          {/* Products breakdown */}
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                             {order.orderItems.map((item, idx) => (
                               <div key={idx} className="bg-slate-50 border border-slate-200 px-3 py-1.5 flex items-center gap-2 group-hover:border-rose-200 transition-colors rounded-sm">
                                  <span className="text-[10px] font-black text-primary uppercase truncate max-w-[150px]">{item.name}</span>
                                  <span className="text-[9px] font-bold text-rose-500">x{item.quantity}</span>
                               </div>
                             ))}
                          </div>
                       </div>

                       <div className="shrink-0 flex flex-col items-center md:items-end gap-3">
                          <div className="text-2xl font-black text-primary tracking-tighter underline underline-offset-4 decoration-rose-500/20">₹{order.totalPrice.toLocaleString()}</div>
                          <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${order.isDelivered ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100 animate-pulse'}`}>
                             {order.isDelivered ? 'COMPLETED' : 'IN PROCESSING'}
                          </div>
                       </div>
                    </motion.div>
                  ))
                )}
             </div>
          </div>

          {/* Side Module: System Status */}
          <div className="space-y-12">
             <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tighter pb-6 border-b border-slate-100">Status <span className="text-slate-300">Hub</span></h2>
                
                <div className="bg-slate-900 p-8 rounded-sm text-white space-y-10 shadow-2xl">
                   <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <Activity size={20} className="text-rose-500" />
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Network Link</span>
                         </div>
                         <span className="text-[9px] font-black text-emerald-400">SECURE</span>
                      </div>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <ShieldCheck size={20} className="text-rose-500" />
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Auth Core</span>
                         </div>
                         <span className="text-[9px] font-black text-slate-400">V3.1.2</span>
                      </div>
                   </div>

                   <div className="pt-8 border-t border-white/10 space-y-4">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Quick Protocol Links</p>
                      <div className="grid grid-cols-1 gap-3">
                         <Link to="/admin/orders" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-rose-500/50 transition-all text-[10px] font-black uppercase tracking-widest group">
                            Global Logs <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                         </Link>
                         <Link to="/admin/products" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-rose-500/50 transition-all text-[10px] font-black uppercase tracking-widest group">
                            Asset Matrix <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                         </Link>
                         <Link to="/admin/users" className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-rose-500/50 transition-all text-[10px] font-black uppercase tracking-widest group">
                            Personnel HUB <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                         </Link>
                      </div>
                   </div>
                </div>
             </div>

             {/* Tactical Support Module */}
             <div className="bg-rose-500 p-8 rounded-sm text-white shadow-xl shadow-rose-500/20 group hover:scale-[1.02] transition-transform duration-500">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Direct Contact</h3>
                <p className="text-sm font-medium leading-relaxed opacity-90 mb-8">Execute a help request for immediate tactical assistance within the admin matrix.</p>
                <button className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] group-hover:gap-6 transition-all">
                   OPEN TICKET <ArrowRight size={16} />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
