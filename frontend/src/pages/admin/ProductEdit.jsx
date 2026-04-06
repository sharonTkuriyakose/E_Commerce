import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Save, Box, Zap, Layers, CreditCard, Info, Image as ImageIcon, Briefcase, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/products/${id}`);
      if (!res.ok) throw new Error('Failed to fetch product data link');
      const data = await res.json();
      setName(data.name);
      setPrice(data.price);
      setImage(data.image);
      setBrand(data.brand);
      setCategory(data.category);
      setCountInStock(data.countInStock);
      setDescription(data.description);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5001/api/products/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify({
          name, price, image, brand, category, countInStock, description
        })
      });
      if (!res.ok) throw new Error('Failed to synchronize changes with host');
      navigate('/admin/products');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-dark-bg space-y-6">
        <div className="w-16 h-16 rounded-2xl border-2 border-accent-blue/10 border-t-accent-blue animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-blue">Deciphering Data Buffer...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-dark-bg selection:bg-accent-blue/30 overflow-x-hidden">
      <div className="container mx-auto px-6 pb-24 max-w-4xl">
        {/* Navigation & Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="space-y-4">
            <Link to="/admin/products" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors group mb-2">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Matrix
            </Link>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-blue opacity-70">Configuration Module</div>
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
              Modify <span className="text-glow text-accent-blue">Unit</span>
            </h1>
            <p className="text-gray-500 max-w-xl font-medium italic">Adjusting parameters for Node: <span className="text-accent-blue">{id.substring(id.length - 8).toUpperCase()}</span></p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center p-3">
                <img src={image} alt="prev" className="w-full h-full object-contain grayscale opacity-50" />
             </div>
             <div className="px-5 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                <Activity size={12} className="animate-pulse" /> Live Sink Active
             </div>
          </div>
        </motion.div>

        {error ? (
          <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-red-500 text-center uppercase tracking-widest text-xs font-black">
            Buffer Error: {error}
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Core Information */}
              <div className="glass-panel p-10 border border-white/5 space-y-8 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-accent-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.3)]"></div>
                 <div className="flex items-center gap-3 mb-2">
                    <Info size={18} className="text-accent-blue" />
                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Base Identity</h2>
                 </div>
                 
                 <div className="space-y-6">
                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Unit Designation</label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm font-black text-white placeholder-gray-700 focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.05] transition-all tracking-tight uppercase italic" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Fabricator Brand</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm font-black text-white focus:outline-none focus:border-accent-blue/50 transition-all uppercase tracking-widest" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Asset Class</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm font-black text-white focus:outline-none focus:border-accent-blue/50 transition-all uppercase tracking-widest" />
                      </div>
                    </div>
                 </div>
              </div>

              {/* Technical Parameters */}
              <div className="glass-panel p-10 border border-white/5 space-y-8">
                 <div className="flex items-center gap-3 mb-2">
                    <Zap size={18} className="text-amber-400" />
                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Market Parameters</h2>
                 </div>

                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Credit Value (₹)</label>
                        <div className="relative">
                           <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-xl font-black text-white focus:outline-none focus:border-accent-blue/50 transition-all italic tracking-tighter" />
                           <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-black text-gray-600 uppercase">INR</div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Inventory Nodes</label>
                        <input type="number" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-xl font-black text-white focus:outline-none focus:border-accent-blue/50 transition-all italic tracking-tighter" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Visual Endpoint (Image Link)</label>
                      <div className="flex gap-4">
                         <div className="flex-1 relative">
                            <ImageIcon size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600" />
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-[10px] font-mono text-gray-400 focus:outline-none focus:border-accent-blue/50 transition-all truncate" />
                         </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Description Extended Module */}
            <div className="glass-panel p-10 border border-white/5 space-y-6">
               <div className="flex items-center gap-3 mb-2">
                  <Briefcase size={18} className="text-purple-400" />
                  <h2 className="text-sm font-black text-white uppercase tracking-widest">Asset Specifications</h2>
               </div>
               <div>
                  <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Detailed Manifest</label>
                  <textarea rows={6} value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-8 py-6 text-sm font-medium text-gray-300 focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.05] transition-all resize-none shadow-inner" placeholder="Enter full unit capability data..." />
               </div>
            </div>

            {/* Finalize Action */}
            <div className="flex items-center justify-between pt-10">
               <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-accent-blue shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 italic">Protocol Ready for Uplink</div>
               </div>
               
               <button 
                type="submit" 
                className="btn-primary !px-12 !py-5 flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] group shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:shadow-[0_0_50px_rgba(0,240,255,0.4)]"
               >
                <Save size={18} /> Synchronize Matrix
               </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEdit;
