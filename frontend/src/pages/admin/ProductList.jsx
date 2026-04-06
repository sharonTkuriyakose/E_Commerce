import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Edit, Plus, Box, Zap, Search, Filter, ArrowRight, ExternalLink, Archive, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`http://localhost:5001/api/products/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        if (!res.ok) throw new Error('Failed to delete product');
        fetchProducts();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const createProductHandler = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${userInfo.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      if (!res.ok) throw new Error('Failed to create product');
      const data = await res.json();
      navigate(`/admin/product/${data._id}/edit`);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-dark-bg space-y-6">
        <div className="w-16 h-16 rounded-2xl border-2 border-accent-blue/10 border-t-accent-blue animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-blue">Querying Inventory...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-dark-bg selection:bg-accent-blue/30 overflow-x-hidden">
      <div className="container mx-auto px-6 pb-24">
        {/* Cinematic Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="space-y-4">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-blue opacity-70">Inventory Control</div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
              Hardware <span className="text-glow text-accent-blue">Matrix</span>
            </h1>
            <p className="text-gray-500 max-w-xl font-medium italic">Complete registry of all deployable technological assets.</p>
          </div>
          
          <button 
            onClick={createProductHandler}
            className="btn-primary !px-8 !py-4 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] group shadow-[0_0_25px_rgba(0,240,255,0.2)] hover:shadow-[0_0_40px_rgba(0,240,255,0.4)]"
          >
            <Plus size={18} /> New Component
          </button>
        </motion.div>

        {error ? (
          <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-red-500 text-center uppercase tracking-widest text-xs font-black">
            Sync Failure: {error}
          </div>
        ) : (
          <div className="rounded-[3rem] bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.03]">
                    <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Node Identifier</th>
                    <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Deployment Unit</th>
                    <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Class</th>
                    <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Fabricator</th>
                    <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Credit Value</th>
                    <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 text-right font-sans">Active Protocols</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {products.map((product, i) => (
                      <motion.tr 
                        key={product._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-white/[0.04] transition-all group"
                      >
                        <td className="p-8">
                           <span className="text-xs font-mono font-black text-accent-blue uppercase group-hover:text-glow opacity-50 group-hover:opacity-100 transition-all italic">#{product._id.substring(product._id.length - 8)}</span>
                        </td>
                        <td className="p-8">
                          <div className="flex items-center gap-5">
                            <div className="relative group/thumb">
                               <div className="absolute inset-0 bg-accent-blue/20 blur-xl opacity-0 group-hover/thumb:opacity-100 transition-opacity"></div>
                               <div className="w-14 h-14 rounded-2xl bg-dark-bg border border-white/5 p-2 flex items-center justify-center relative z-10">
                                 <img src={product.image} alt={product.name} className="w-full h-full object-contain grayscale group-hover/thumb:grayscale-0 transition-all duration-500" />
                               </div>
                            </div>
                            <div>
                               <div className="text-sm font-black text-white uppercase italic tracking-tighter group-hover:text-accent-blue transition-colors">{product.name}</div>
                               <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-1">Status: Online</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-8">
                           <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 inline-block">
                              {product.category}
                           </div>
                        </td>
                        <td className="p-8">
                           <span className="text-xs font-black text-white uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{product.brand}</span>
                        </td>
                        <td className="p-8">
                            <div className="text-2xl font-black text-white italic tracking-tighter">₹{product.price.toLocaleString()}</div>
                        </td>
                        <td className="p-8 text-right">
                          <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                             <Link
                                to={`/admin/product/${product._id}/edit`}
                                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-gray-500 hover:text-white hover:border-accent-blue/30 hover:bg-accent-blue/10 transition-all"
                              >
                                <Edit size={18} />
                              </Link>
                              <button
                                onClick={() => deleteHandler(product._id)}
                                className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                              <Link to={`/product/${product._id}`} target="_blank" className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-gray-500 hover:text-accent-blue transition-all">
                                 <ExternalLink size={18} />
                              </Link>
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

export default ProductList;
