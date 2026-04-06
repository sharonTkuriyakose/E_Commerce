import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Package, ShoppingBag, DollarSign, Check, Activity, ShieldCheck, Zap, ArrowRight, TrendingUp, Calendar, Search, ExternalLink, AlertTriangle, PieChart, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

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
  const lowStockProducts = products.filter(p => p.countInStock < 5);

  const stats = [
    { title: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-50', trend: 'Financial Summary', link: '/admin/orders' },
    { title: 'Personnel Count', value: users.length, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: 'Total Global Users', link: '/admin/users' },
    { title: 'Asset Inventory', value: products.length, icon: Package, color: 'text-violet-600', bg: 'bg-violet-50', trend: 'Active SKUs', link: '/admin/products' },
    { title: 'Order Protocol', value: orders.length, icon: ShoppingBag, color: 'text-rose-600', bg: 'bg-rose-50', trend: 'Acquisitions', link: '/admin/orders' },
  ];

  // Chart Data Constructions
  const lineData = {
    labels: orders.slice(-7).map(o => new Date(o.createdAt).toLocaleDateString()),
    datasets: [{
      label: 'Acquisition Revenue',
      data: orders.slice(-7).map(o => o.totalPrice),
      borderColor: '#ff3f6c',
      backgroundColor: 'rgba(255, 63, 108, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(categoryCounts),
    datasets: [{
      data: Object.values(categoryCounts),
      backgroundColor: ['#282c3f', '#ff3f6c', '#03a9f4', '#ff905a', '#03a685'],
      borderWidth: 0
    }]
  };

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
             <div className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-md flex items-center gap-3 text-nowrap">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">System Active</span>
             </div>
             <Link to="/admin/products/new" className="btn-primary py-4! px-8! rounded-md! text-[11px]! tracking-[0.2em]! font-black">
                <Zap size={16} /> NEW ASSET +
             </Link>
          </div>
        </div>

        {/* Global Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(stat.link)}
              className="bg-slate-50 p-8 border border-slate-200 rounded-sm group hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-lg"
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
               </div>
            </motion.div>
          ))}
        </div>

        {/* ADVANCED ANALYTICS MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
           <div className="lg:col-span-8 bg-slate-50 border border-slate-200 p-10 rounded-sm">
              <div className="flex items-center justify-between mb-10">
                 <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary">Tactical Revenue Stream</h2>
                 <BarChart3 size={18} className="text-rose-500" />
              </div>
              <div className="h-[300px]">
                 <Line data={lineData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { grid: { display: false } } } }} />
              </div>
           </div>
           <div className="lg:col-span-4 bg-slate-50 border border-slate-200 p-10 rounded-sm flex flex-col">
              <div className="flex items-center justify-between mb-10">
                 <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary">Sector Distribution</h2>
                 <PieChart size={18} className="text-rose-500" />
              </div>
              <div className="h-[250px] flex items-center justify-center">
                 <Doughnut data={doughnutData} options={{ cutout: '70%', plugins: { legend: { position: 'bottom', labels: { boxWidth: 8, font: { size: 9, weight: 'bold' } } } } }} />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Recent Acquisitions Table */}
          <div className="lg:col-span-2 space-y-10">
             <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tighter">Acquisition <span className="text-rose-500">Logs</span></h2>
                <Link to="/admin/orders" className="text-[10px] font-black text-slate-400 hover:text-primary transition-colors uppercase tracking-[0.3em]">View Global Archive</Link>
             </div>

             <div className="space-y-6">
                {recentOrders.map((order) => (
                  <motion.div
                    key={order._id}
                    className="bg-white border border-slate-100 hover:border-primary p-8 transition-all group flex flex-col md:flex-row items-center gap-8 cursor-pointer relative"
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                  >
                     <div className="shrink-0 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-primary font-black group-hover:bg-rose-500 group-hover:text-white transition-all transform group-hover:rotate-12 uppercase">
                           {order.user?.name.charAt(0) || '?'}
                        </div>
                     </div>
                     
                     <div className="grow space-y-4 text-center md:text-left">
                        <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                           <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">HASH: #{order._id.slice(-8).toUpperCase()}</span>
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">// Operator: {order.user?.name.toUpperCase() || 'EXTERNAL'}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                           {order.orderItems.map((item, idx) => (
                             <div key={idx} className="bg-slate-50 border border-slate-200 px-3 py-1.5 flex items-center gap-2 rounded-sm">
                                <span className="text-[10px] font-black text-primary uppercase truncate max-w-[150px]">{item.name}</span>
                                <span className="text-[9px] font-bold text-rose-500">x{item.quantity}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                     <div className="shrink-0 flex flex-col items-center md:items-end gap-3 text-right">
                        <div className="text-2xl font-black text-primary tracking-tighter">₹{order.totalPrice.toLocaleString()}</div>
                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${order.isDelivered ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100 animate-pulse'}`}>
                           {order.isDelivered ? 'COMPLETED' : 'IN PROCESSING'}
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>

          <div className="space-y-12">
             {/* CRITICAL INVENTORY MONITOR - Advanced Feature */}
             <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-black text-primary uppercase tracking-tighter pb-6 border-b border-slate-100 font-bold">Asset <span className="text-slate-300 font-bold">Alerts</span></h2>
                <div className="bg-slate-900 p-8 rounded-sm text-white space-y-8 shadow-2xl">
                   <div className="flex items-center justify-between">
                       <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500">Inventory Criticality</h3>
                       <AlertTriangle size={16} className="text-rose-500 animate-bounce" />
                   </div>
                   
                   <div className="space-y-5 max-h-[300px] overflow-y-auto no-scrollbar">
                      {lowStockProducts.length > 0 ? lowStockProducts.map(p => (
                         <div key={p._id} className="flex flex-col border-b border-white/5 pb-4">
                            <span className="text-xs font-black uppercase truncate">{p.name}</span>
                            <div className="flex justify-between items-center mt-2">
                               <span className="text-[9px] font-bold text-slate-400">STOCK LEVEL</span>
                               <span className="text-[10px] font-black text-rose-500">{p.countInStock} UNITS LEFT</span>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 mt-2 rounded-full overflow-hidden">
                               <div className="bg-rose-500 h-full w-[20%] transition-all"></div>
                            </div>
                         </div>
                      )) : (
                        <p className="text-[9px] text-slate-500 font-bold uppercase py-10 text-center uppercase tracking-widest">Global inventory levels within safe parameters.</p>
                      )}
                   </div>

                   <Link to="/admin/products" className="block text-center py-4 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 transition-colors">
                      RESTOCK ASSETS
                   </Link>
                </div>
             </div>

             <div className="bg-primary p-8 rounded-sm text-white shadow-xl shadow-primary/20 group hover:scale-[1.02] transition-transform duration-500">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic">Tac Support</h3>
                <p className="text-sm font-medium leading-relaxed opacity-60 mb-8">Execute a help request for immediate tactical assistance within the admin matrix.</p>
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
