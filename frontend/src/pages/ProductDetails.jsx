import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, useTexture, Plane, ContactShadows } from '@react-three/drei';
import { ShieldCheck, Truck, RotateCcw, Star, ShoppingBag, Heart, ChevronRight, Loader2, ArrowRight, Zap, Info, Minus, Plus, Bookmark, Share2, Package, Send, History } from 'lucide-react';
import * as THREE from 'three';
import ProductCard3D from '../components/ProductCard3D';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  
  // Review State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5001/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);

        // Recently Viewed Logic
        const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        const filteredViewed = viewed.filter(p => p._id !== data._id);
        const newViewed = [data, ...filteredViewed].slice(0, 4);
        localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));
        setRecentlyViewed(newViewed.filter(p => p._id !== data._id));

        // Fetch Related Products
        const allRes = await fetch('http://localhost:5001/api/products');
        const allData = await allRes.json();
        const related = allData.filter(p => p.category === data.category && p._id !== data._id).slice(0, 4);
        setRelatedProducts(related);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);
    try {
      const res = await fetch(`http://localhost:5001/api/products/${id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment, name: reviewerName })
      });
      if (res.ok) {
        alert('Review submitted successfully!');
        setComment('');
        setReviewerName('');
        // Refresh product
        const refreshRes = await fetch(`http://localhost:5001/api/products/${id}`);
        const refreshData = await refreshRes.json();
        setProduct(refreshData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <Loader2 className="w-12 h-12 text-accent animate-spin" />
      <p className="text-xs font-black uppercase tracking-widest text-text-muted">Syncing catalog...</p>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <Info size={48} className="text-danger mb-6 opacity-20" />
      <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 italic text-primary">Item Missing</h2>
      <Link to="/products" className="btn-primary !px-12 !py-4">Back To Store</Link>
    </div>
  );

  return (
    <div className="pt-32 min-h-screen bg-white">
      <div className="container mx-auto px-6 mb-12">
        <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-text-muted">
          <Link to="/" className="text-primary hover:text-accent">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="text-primary hover:text-accent font-black">Electronic Ecosystem</Link>
          <ChevronRight size={14} />
          <span className="text-accent">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-start pb-24">
        <div className="lg:col-span-7 aspect-square bg-slate-50 border border-border rounded-lg relative overflow-hidden flex items-center justify-center p-16">
           <motion.img 
             layoutId={`img-${product._id}`}
             src={product.image} 
             alt={product.name} 
             className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl" 
           />
           <div className="absolute top-8 left-8 flex flex-col gap-3">
              <span className="px-4 py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-full">New Gen · 2026</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-full shadow-sm text-[9px] font-black uppercase text-success tracking-widest">
                <CheckCircle size={10} /> Certified Authentic
              </div>
           </div>
        </div>

        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-6 border-b border-border pb-12">
             <div className="space-y-2">
                <p className="text-accent text-[10px] font-black uppercase tracking-[0.5em]">{product.category}</p>
                <h1 className="text-4xl sm:text-5xl font-black text-primary uppercase tracking-tighter leading-none">{product.name}</h1>
             </div>
             
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 px-4 py-1.5 bg-success/5 text-success border border-success/10 rounded-sm font-black text-sm">
                   <span>{product.rating.toFixed(1)}</span>
                   <Star size={14} className="fill-success" />
                </div>
                <div className="h-6 w-px bg-border"></div>
                <span className="text-xs font-black text-text-muted uppercase tracking-widest">{product.numReviews} Verified Reviews</span>
             </div>

             <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-primary tracking-tighter">₹{(product.price * 0.8).toLocaleString()}</span>
                <span className="text-lg text-text-muted line-through font-bold decoration-danger/30 decoration-2">₹{product.price.toLocaleString()}</span>
                <span className="px-3 py-1 bg-warning text-white text-[10px] font-black uppercase tracking-widest rounded-sm">20% OFF</span>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => { addToCart(product); navigate('/cart'); }}
              className="grow bg-primary text-white py-6 rounded-sm text-xs font-black uppercase tracking-[0.3em] hover:bg-black transition-all flex items-center justify-center gap-4 group"
            >
              INITIATE PURCHASE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white border-2 border-primary text-primary px-10 py-6 rounded-sm text-xs font-black uppercase tracking-[0.3em] hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Heart size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pb-10 border-b border-border">
             <div className="p-5 border border-border rounded-sm flex items-start gap-4">
                <Truck className="text-accent" size={20} />
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary">EXPRESS SHIP</p>
                   <p className="text-[9px] text-text-muted font-bold font-medium leading-none">Delivered by Tomorrow</p>
                </div>
             </div>
             <div className="p-5 border border-border rounded-sm flex items-start gap-4">
                <ShieldCheck className="text-success" size={20} />
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary">WARRENTY PRO</p>
                   <p className="text-[9px] text-text-muted font-bold font-medium leading-none">2 Year Full Coverage</p>
                </div>
             </div>
          </div>

          <div className="space-y-8">
             <div className="flex gap-10 border-b border-border">
                {['Description', 'Specifications', 'Reviews'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} className={`pb-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab.toLowerCase() ? 'text-primary' : 'text-text-muted hover:text-primary'}`}>
                     {tab}
                     {activeTab === tab.toLowerCase() && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 w-full h-[3px] bg-accent" />}
                  </button>
                ))}
             </div>
             
             <div className="min-h-[200px] text-sm text-text-secondary leading-relaxed font-medium">
                <AnimatePresence mode="wait">
                  {activeTab === 'description' && (
                    <motion.div key="desc" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 1, x: 10 }}>
                       <p className="text-lg font-bold text-primary mb-6 italic">Engineering The Future.</p>
                       {product.description}
                    </motion.div>
                  )}
                  {activeTab === 'specifications' && (
                    <motion.div key="specs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                       {product.specs && Object.entries(product.specs).map(([k, v]) => (
                         <div key={k} className="flex justify-between border-b border-border py-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">{k}</span>
                            <span className="text-xs font-black text-primary uppercase">{v}</span>
                         </div>
                       ))}
                    </motion.div>
                  )}
                  {activeTab === 'reviews' && (
                    <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
                       <div className="space-y-6">
                          {product.reviews && product.reviews.length > 0 ? product.reviews.map((r, i) => (
                             <div key={i} className="p-6 bg-slate-50 border border-border rounded-sm space-y-3">
                                <div className="flex justify-between items-center">
                                   <p className="text-xs font-black uppercase tracking-widest text-primary">{r.name}</p>
                                   <div className="flex text-success"><Star size={10} className="fill-success" /> {r.rating}</div>
                                </div>
                                <p className="text-xs text-text-secondary leading-loose italic">"{r.comment}"</p>
                                <p className="text-[9px] text-text-muted font-bold uppercase">{new Date(r.createdAt).toLocaleDateString()}</p>
                             </div>
                          )) : <p className="text-xs text-text-muted font-black uppercase opacity-50 text-center py-10">No reviews yet. Be the first to upgrade the legacy.</p>}
                       </div>

                       <div className="pt-10 border-t border-dashed border-border space-y-6">
                          <h4 className="text-xs font-black text-primary uppercase tracking-[0.4em]">Post New Experience</h4>
                          <form onSubmit={submitReviewHandler} className="space-y-4">
                             <input value={reviewerName} onChange={e => setReviewerName(e.target.value)} placeholder="IDENTIFY YOURSELF" className="w-full bg-white border border-border px-6 py-4 text-[11px] font-black tracking-widest focus:border-accent outline-none" required />
                             <select value={rating} onChange={e => setRating(e.target.value)} className="w-full bg-white border border-border px-6 py-4 text-[11px] font-black tracking-widest focus:border-accent outline-none">
                                {[5,4,3,2,1].map(v => <option key={v} value={v}>{v} STAR RATING</option>)}
                             </select>
                             <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="LOG YOUR FEEDBACK" className="w-full h-32 bg-white border border-border px-6 py-4 text-[11px] font-black tracking-widest focus:border-accent outline-none resize-none" required />
                             <button disabled={submittingReview} className="w-full bg-accent text-white py-5 text-[11px] font-black tracking-widest hover:bg-primary transition-all disabled:opacity-50 flex items-center justify-center gap-4 uppercase">
                                {submittingReview ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />} SUBMIT INTEL
                             </button>
                          </form>
                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>

       {/* Recently Viewed Feature - Pure Luxury UX */}
       {recentlyViewed.length > 0 && (
          <div className="container mx-auto px-6 py-24 bg-bg-alt/30 border-y border-border">
            <div className="flex items-center gap-4 mb-12">
               <History size={20} className="text-accent" />
               <h2 className="text-xs font-black text-primary uppercase tracking-[0.5em]">Session History <span className="text-slate-300 ml-4 hidden sm:inline">Recently Analyzed Products</span></h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {recentlyViewed.map(p => (
                 <motion.div key={p._id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="h-[450px]">
                    <ProductCard3D product={p} />
                 </motion.div>
               ))}
            </div>
          </div>
       )}

       {/* Related Products Section */}
       {relatedProducts.length > 0 && (
         <div className="container mx-auto px-6 py-24">
            <div className="flex flex-col mb-12">
               <p className="text-accent text-[10px] font-black uppercase tracking-[0.4em] mb-4">Recommendations</p>
               <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Synchronized <span className="text-slate-300 italic">Ecosystem</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {relatedProducts.map((p, idx) => (
                 <motion.div key={p._id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="h-[480px]">
                    <ProductCard3D product={p} />
                 </motion.div>
               ))}
            </div>
         </div>
       )}

       <div className="bg-primary py-24">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
             <div className="space-y-6">
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-tight italic">Join The Elite <br/> High-Tech Circle.</h3>
                <p className="text-sm text-white/50 font-medium max-w-sm">Early access to limited drops and exclusive member-only pricing.</p>
             </div>
             <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                   <input type="email" placeholder="ENTER SYSTEM EMAIL" className="flex-grow bg-white/5 border border-white/10 px-8 py-5 text-[11px] font-black tracking-widest uppercase text-white focus:outline-none focus:border-accent" />
                   <button className="bg-accent text-white px-10 py-5 text-[11px] font-black tracking-widest hover:bg-white hover:text-black transition-all uppercase">SUBSCRIBE</button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

// Internal components
const CheckCircle = ({ size }) => <Circle size={size} className="text-success" />;
const Circle = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

export default ProductDetails;
