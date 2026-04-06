import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, useTexture, Plane, ContactShadows } from '@react-three/drei';
import { ShieldCheck, Truck, RotateCcw, Star, ShoppingBag, Heart, ChevronRight, Loader2, ArrowRight, Zap, Info, Minus, Plus, Bookmark, Share2 } from 'lucide-react';
import * as THREE from 'three';

const ProductModel = ({ imageUrl }) => {
  const meshRef = useRef();
  let texture = null;
  try { texture = useTexture(imageUrl); } catch(e) {}
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  if (!texture) return null;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        <Plane args={[3.5, 3.5]}>
          <meshStandardMaterial 
            map={texture} 
            transparent={true} 
            alphaTest={0.1}
            side={THREE.DoubleSide}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </Plane>
      </group>
    </Float>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5001/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <Loader2 className="w-12 h-12 text-accent animate-spin" />
      <p className="text-xs font-black uppercase tracking-widest text-text-muted">Loading Experience...</p>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-primary p-6 text-center">
      <Info size={48} className="text-danger mb-6 opacity-20" />
      <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Product Not Found</h2>
      <p className="text-text-muted mb-10 max-w-sm text-sm font-medium leading-relaxed">The item you're looking for have been moved or removed from our catalog.</p>
      <Link to="/products" className="btn-primary !px-12 !py-4">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="pt-32 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-text-muted">
          <Link to="/" className="text-primary hover:text-accent transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="text-primary hover:text-accent transition-colors">Electronics</Link>
          <ChevronRight size={14} />
          <span className="text-accent">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start pb-24">
        {/* Gallery Section - Using Standard Professional Imagery */}
        <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-32 aspect-square md:aspect-auto h-[500px] md:h-[650px] bg-white border border-border rounded-lg relative overflow-hidden flex items-center justify-center p-12">
           <motion.img 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6 }}
             src={product.image} 
             alt={product.name} 
             className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-transform duration-700 hover:scale-105" 
           />
           
           <div className="absolute top-6 left-6 z-10 flex flex-col gap-4">
              <div className="px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-sm shadow-xl">Official Flagship Item</div>
           </div>

           <div className="absolute bottom-6 left-6 right-6 flex items-center justify-center z-10">
              <div className="flex gap-3">
                 {[1,2,3,4].map(idx => <div key={idx} className={`w-2 h-2 rounded-full border border-border transition-all ${idx === 1 ? 'bg-accent border-accent scale-125' : 'bg-slate-200 hover:bg-border'}`}></div>)}
              </div>
           </div>
        </div>

        {/* Product Details Section */}
        <div className="lg:col-span-5 space-y-8 py-2">
          <div className="space-y-4 border-b border-border pb-10">
            <h1 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter leading-none" style={{ fontFamily: 'Inter' }}>
              {product.name}
            </h1>
            <p className="text-xl text-text-muted font-black tracking-widest leading-none">Premium Tech Excellence</p>
            
            <div className="flex items-center gap-4 pt-2">
               <div className="flex items-center gap-1.5 px-3 py-1 border border-border rounded-sm font-black text-xs">
                  <span>{product.rating}</span>
                  <Star size={12} className="fill-success text-success" />
                  <span className="text-text-muted border-l border-border pl-2 border-slate-300 ml-1">1.2K Ratings</span>
               </div>
               <div className="h-4 w-px bg-border"></div>
               <button className="text-xs font-black text-accent uppercase tracking-widest hover:underline">Write A Review</button>
            </div>
          </div>

          <div className="space-y-2 border-b border-border pb-10">
            <div className="flex items-center gap-4">
               <span className="text-3xl font-black text-primary" style={{ fontFamily: 'Inter' }}>₹{Math.floor(product.price * 0.8).toLocaleString()}</span>
               <div className="flex flex-col">
                  <span className="text-sm text-text-muted line-through font-bold tracking-tighter">MRP ₹{product.price.toLocaleString()}</span>
                  <span className="text-xs text-warning font-black uppercase tracking-widest">(20% Discount applied)</span>
               </div>
            </div>
            <p className="text-[10px] text-success font-black uppercase tracking-widest">Includes all taxes and duties</p>
          </div>

          {/* Color/Size dummy info for retail-feel */}
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-xs font-black text-primary uppercase tracking-widest">Select Model / Color</span>
                <span className="text-xs font-black text-accent uppercase tracking-widest cursor-pointer">Size Guide</span>
             </div>
             <div className="flex gap-4">
                {['Titanium Silver', 'Phantom Black', 'Summit White'].map((c, i) => (
                  <div key={i} className={`w-12 h-12 rounded-full border-2 p-1 cursor-pointer transition-all ${i === 0 ? 'border-accent' : 'border-transparent hover:border-border'}`}>
                     <div className={`w-full h-full rounded-full border border-border ${i === 0 ? 'bg-slate-300' : i === 1 ? 'bg-black' : 'bg-white'}`}></div>
                  </div>
                ))}
             </div>
          </div>

          {/* Action Buttons - Myntra Pure Layout */}
          <div className="flex flex-col sm:flex-row gap-5 pt-8">
            <button 
              onClick={() => {
                addToCart(product, quantity);
                navigate('/cart');
              }}
              className="flex-[2] btn-primary !rounded-sm !py-5 !text-[13px] !tracking-widest group shadow-2xl shadow-accent/20"
              id="atb-btn"
            >
              ORDER NOW <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              className="flex-1 btn-outline !rounded-sm !py-5 !text-[12px] !border-2 !border-primary group"
              id="wishlist-btn"
            >
              <Heart size={18} strokeWidth={2.5} className="group-hover:fill-primary transition-all" /> Wishlist
            </button>
          </div>

          {/* Delivery Info */}
          <div className="pt-10 space-y-6">
             <div className="flex items-center gap-4">
                <Truck className="text-primary" size={24} />
                <div className="flex flex-col">
                   <span className="text-xs font-black text-primary uppercase tracking-widest">Delivery in 2-3 Days</span>
                   <span className="text-[10px] text-text-muted font-medium">Standard shipping charges apply at checkout</span>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <RotateCcw className="text-primary" size={24} />
                <div className="flex flex-col">
                   <span className="text-xs font-black text-primary uppercase tracking-widest">Easy 30 day returns</span>
                   <span className="text-[10px] text-text-muted font-medium">100% money back guarantee on authentic returns</span>
                </div>
             </div>
          </div>

          {/* Product Info Tabs */}
          <div className="pt-12 border-t border-border space-y-8">
             <div className="flex gap-8 border-b border-border">
                {['Description', 'Specifications', 'Brand Story'].map(tab => (
                  <button 
                     key={tab} 
                     onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
                     className={`pb-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab.toLowerCase().replace(' ', '') ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
                  >
                     {tab}
                     {activeTab === tab.toLowerCase().replace(' ', '') && <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />}
                  </button>
                ))}
             </div>
             
             <div className="min-h-[150px] text-sm text-text-secondary leading-relaxed font-medium">
                <AnimatePresence mode="wait">
                  {activeTab === 'description' && (
                    <motion.p key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                       {product.description || "Crafted for the ultimate user experience. This product combines precision engineering with cutting-edge electronics to deliver performance that exceeds all industry benchmarks."}
                    </motion.p>
                  )}
                  {activeTab === 'specifications' && (
                    <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-3">
                       {product.specs && Object.entries(product.specs).map(([k, v]) => (
                         <div key={k} className="flex border-b border-border pb-2">
                            <span className="w-1/3 text-[10px] font-black uppercase tracking-widest text-text-muted">{k}</span>
                            <span className="w-2/3 text-xs font-bold text-primary">{v}</span>
                         </div>
                       ))}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
