import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Edit, Plus, Box, Zap, Search, Filter, ArrowRight, ExternalLink, Archive, Activity, Package } from 'lucide-react';
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
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-white space-y-6">
        <div className="w-16 h-16 rounded-full border-4 border-border border-t-accent animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Querying Inventory...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-white border-t border-border">
      <div className="container mx-auto px-6 pb-24 max-w-7xl">
        {/* Professional Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <p className="text-[11px] font-black text-accent uppercase tracking-[0.5em] mb-4">Inventory Control</p>
             <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tighter uppercase leading-none">
                Hardware <span className="text-slate-300">Registry</span>
             </h1>
          </motion.div>
          
          <div className="flex items-center gap-4">
             <div className="bg-slate-50 border border-border px-6 py-3 rounded-md flex items-center gap-3">
                <Package size={18} className="text-accent" />
                <span className="text-[11px] font-black text-primary uppercase tracking-widest">{products.length} ACTIVE SKUs</span>
             </div>
             <button 
                onClick={createProductHandler}
                className="btn-primary !px-8 !py-4 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] group !rounded-md"
              >
                <Plus size={18} /> NEW ASSET +
              </button>
          </div>
        </div>

        {error ? (
          <div className="p-10 rounded-sm bg-red-50 text-red-500 text-center uppercase tracking-widest text-xs font-black border border-red-100">
            SYNC FAILURE: {error}
          </div>
        ) : (
          <div className="bg-white border border-border rounded-sm overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-border">
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">ID Hash</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Product Unit</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Classification</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Stock Level</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-right">Credit Prop</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((product, i) => (
                    <tr 
                      key={product._id}
                      className="hover:bg-slate-50/50 transition-all group"
                    >
                      <td className="p-8">
                         <span className="text-[11px] font-black text-primary italic transition-all">#{product._id.slice(-8).toUpperCase()}</span>
                      </td>
                      <td className="p-8 min-w-[300px]">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-16 bg-slate-50 border border-border rounded-sm p-2 flex items-center justify-center shrink-0">
                             <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply transition-all group-hover:scale-110" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-sm font-black text-primary uppercase line-clamp-1">{product.name}</span>
                             <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{product.brand}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                         <div className="px-3 py-1 rounded-sm bg-slate-100 text-[9px] font-black uppercase tracking-widest text-primary inline-block">
                            {product.category}
                         </div>
                      </td>
                      <td className="p-8">
                         <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-[9px] font-black uppercase">
                               <span className={product.countInStock < 10 ? 'text-danger' : 'text-success'}>
                                  {product.countInStock < 10 ? 'CRITICAL LOW' : 'OPTIMAL'}
                               </span>
                               <span className="text-primary">{product.countInStock} UNITS</span>
                            </div>
                            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                               <div 
                                 className={`h-full transition-all ${product.countInStock < 10 ? 'bg-danger' : 'bg-success'}`} 
                                 style={{ width: `${Math.min(100, product.countInStock * 2)}%` }}
                               ></div>
                            </div>
                         </div>
                      </td>
                      <td className="p-8 text-right">
                         <span className="text-lg font-black text-primary tracking-tighter">₹{product.price.toLocaleString()}</span>
                      </td>
                      <td className="p-8 text-right">
                        <div className="flex items-center justify-end gap-3 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                           <Link
                              to={`/admin/product/${product._id}/edit`}
                              className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-border text-primary hover:border-accent hover:text-accent transition-all shadow-sm"
                            >
                               <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => deleteHandler(product._id)}
                              className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-border text-text-muted hover:border-danger hover:text-danger transition-all shadow-sm"
                            >
                               <Trash2 size={18} />
                            </button>
                            <Link to={`/product/${product._id}`} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-border text-text-muted hover:border-primary hover:text-primary shadow-sm">
                               <ExternalLink size={18} />
                            </Link>
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

export default ProductList;
