import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Loader2, ShoppingCart, ShieldCheck, Truck, RotateCcw, Headphones, ChevronLeft, ChevronRight, Zap, CheckCircle2, Globe } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ProductCard3D from '../components/ProductCard3D';
import { categories } from '../data/products';
import { useCart } from '../context/CartContext';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 34, s: 56 });

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/products');
        const data = await res.json();
        setFeaturedProducts(data.slice(0, 8));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setLoading(false);
      }
    };
    fetchFeatured();

    // Timer for Flash Sale
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col bg-white overflow-x-hidden pt-24">
      {/* ========== HERO SECTION - Myntra Style Big Banner ========== */}
      <section id="hero-banner" className="relative lg:min-h-[850px] w-full overflow-hidden bg-bg-alt flex items-center py-20 lg:py-0">
        <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="max-w-2xl text-center lg:text-left space-y-10">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-block px-5 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.3em]"
            >
               Quantum Era Tech Store
            </motion.div>
            
             <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[100px] font-black text-primary uppercase tracking-tighter leading-[0.85]"
             >
               THE FUTURE <br/>
               <span className="text-accent italic">UNLOCKED.</span> <br/>
               <span className="text-text-muted">70% OFF.</span>
             </motion.h1>
 
             <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base lg:text-xl text-text-secondary font-medium max-w-lg leading-relaxed mx-auto lg:mx-0 opacity-80"
             >
               Precision engineering meets legendary performance. Upgrade your digital arsenal with our flagship collection.
             </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6"
            >
              <Link to="/products" className="btn-primary px-12! py-5!">Shop Collection</Link>
              <Link to="/categories" className="btn-outline px-12! py-5!">Categories</Link>
            </motion.div>
          </div>

          <div className="w-full lg:flex-1 relative p-4 lg:p-0">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 w-full max-w-5xl rounded-[40px] sm:rounded-[80px] overflow-hidden border border-primary/5 shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative z-10">
                {[
                  { title: 'iPhone Pro', search: 'iPhone 15 Pro', label: 'Tech Series', src: '/images/products/iphone.png', delay: 0.1 },
                  { title: 'Premium Audio', search: 'Sony WH-1000XM5', label: 'Sony Gear', src: '/images/products/headphones.png', delay: 0.2 },
                  { title: 'Ultra Watch', search: 'Apple Watch Ultra 2', label: 'Wearable Pro', src: '/images/products/watch.png', delay: 0.3 },
                  { title: 'Macbook M3', search: 'MacBook Pro M3 Max', label: 'Pro Computing', src: '/images/products/macbook.png', delay: 0.4 }
                ].map((product, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: product.delay }}
                    className="relative group bg-black flex flex-col items-center justify-between min-h-[350px] sm:min-h-[450px] lg:min-h-[500px] border-[0.5px] border-white/5 hover:bg-[#080808] transition-all duration-700"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="w-full px-10 pt-10 text-center flex-none z-10 transition-transform duration-500 group-hover:-translate-y-2">
                       <p className="text-accent text-[9px] font-black uppercase tracking-[0.5em] mb-3">{product.label}</p>
                       <h3 className="text-white text-[16px] sm:text-[22px] lg:text-[28px] font-black uppercase tracking-tighter leading-none">{product.title}</h3>
                    </div>
                    <div className="relative w-full grow flex items-center justify-center p-8 sm:p-12 overflow-visible">
                       <img src={product.src} alt={product.title} className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_40px_80px_rgba(255,63,108,0.35)] group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 bg-black/40 backdrop-blur-sm">
                       <button className="px-10 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.3em] rounded-sm" onClick={() => navigate(`/products?search=${product.search}`)}>ORDER NOW</button>
                    </div>
                    <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-accent/30 transition-colors"></div>
                  </motion.div>
                ))}
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-[1200px] h-full lg:h-[1200px] bg-accent/20 rounded-full blur-[300px] -z-0 opacity-30"></div>
          </div>
        </div>
      </section>

      {/* ========== FLASH SALE COUNTDOWN - Functional Feature ========== */}
      <div className="bg-primary py-4 px-6 overflow-hidden">
         <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
               <Zap className="text-accent fill-accent animate-pulse" size={20} />
               <span className="text-white text-xs font-black uppercase tracking-[0.3em]">Flash Sale Ending In:</span>
            </div>
            <div className="flex items-center gap-6">
               {[
                 { v: timeLeft.h, l: 'Hours' },
                 { v: timeLeft.m, l: 'Mins' },
                 { v: timeLeft.s, l: 'Secs' }
               ].map((t, i) => (
                 <div key={i} className="flex items-center gap-3">
                    <span className="text-white text-2xl font-black tracking-tighter w-10 text-center">{t.v.toString().padStart(2, '0')}</span>
                    <span className="text-[9px] text-accent font-bold uppercase tracking-widest">{t.l}</span>
                 </div>
               ))}
            </div>
            <Link to="/products?category=gaming" className="px-6 py-2 bg-accent text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all">Shop Flash Deals</Link>
         </div>
      </div>
 
       {/* ========== CATEGORY WHEEL ========== */}
       <section id="categories-wheel" className="py-24 bg-white border-b border-border shadow-sm">
         <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-20 lg:gap-24">
               {categories.map((cat, i) => (
                 <motion.div key={cat.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} onClick={() => navigate(`/products?category=${cat.id}`)} className="flex flex-col items-center gap-8 cursor-pointer group">
                    <div className="w-24 h-24 sm:w-32 lg:w-44 h-24 sm:h-32 lg:h-44 rounded-full border border-border p-2 group-hover:border-accent group-hover:ring-8 group-hover:ring-accent/10 transition-all duration-500 relative bg-white shadow-md overflow-hidden">
                       <img src={cat.image} className="w-full h-full rounded-full object-cover group-hover:scale-105" alt={cat.name} />
                    </div>
                    <span className="text-[13px] font-black uppercase tracking-[0.3em] text-text-muted group-hover:text-primary transition-all">{cat.name}</span>
                 </motion.div>
               ))}
            </div>
         </div>
       </section>

      {/* ========== CURATED SELECTION ========== */}
      <section id="featured" className="py-24 border-t border-border bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center space-y-4">
            <h2 className="section-heading">Featured Collection</h2>
            <p className="section-subtext">Premium electronics handpicked by our experts for your modern lifestyle.</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 text-accent animate-spin" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {featuredProducts.map((product, idx) => (
                <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="h-[480px]">
                  <ProductCard3D product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-20">
             <Link to="/products" className="btn-outline border-2 !px-12 !py-4 text-xs">Explore All Products <ArrowRight size={16} strokeWidth={2.5} /></Link>
          </div>
        </div>
      </section>

      {/* ========== BRAND MARQUEE - Professional Retail Feature ========== */}
      <section className="py-20 bg-white border-y border-border overflow-hidden">
         <div className="container mx-auto px-6 mb-12 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-text-muted">Trusted Global Partners</h3>
            <div className="h-px grow mx-12 bg-border hidden sm:block"></div>
            <Globe size={18} className="text-text-muted opacity-30" />
         </div>
         <div className="flex gap-16 whitespace-nowrap animate-marquee px-6">
            {['Apple', 'Samsung', 'Sony', 'Dell', 'Bose', 'Logitech', 'Asus', 'HP', 'Razer', 'Canon', 'Nikon', 'Microsoft'].map((brand, i) => (
              <span key={i} className="text-4xl md:text-5xl font-black text-primary/5 uppercase tracking-tighter hover:text-accent/20 transition-colors cursor-default select-none">{brand}</span>
            ))}
            {['Apple', 'Samsung', 'Sony', 'Dell', 'Bose', 'Logitech', 'Asus', 'HP', 'Razer', 'Canon', 'Nikon', 'Microsoft'].map((brand, i) => (
              <span key={i+100} className="text-4xl md:text-5xl font-black text-primary/5 uppercase tracking-tighter hover:text-accent/20 transition-colors cursor-default select-none">{brand}</span>
            ))}
         </div>
      </section>

      {/* ========== PROMO BANNER 2 ========== */}
      <section id="promo-2" className="py-16 container mx-auto px-6">
         <Link to="/products?category=audio" className="block relative h-[400px] w-full rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-primary opacity-90"></div>
            <div className="absolute inset-0 z-0 opacity-60">
               <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Audio" />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-10 space-y-6">
               <span className="text-accent font-black tracking-widest uppercase">Premium Sound</span>
               <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter max-w-2xl leading-none">The Ultimate Audio Experience With Bose & Sony</h3>
               <div className="btn-primary bg-white text-primary uppercase tracking-widest text-[11px] font-bold">Shop The Range</div>
            </div>
         </Link>
      </section>

      {/* ========== TRUST SIGNALS ========== */}
      <section id="trust" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: Truck, title: 'Express Delivery', desc: 'Ships within 24 hours of ordering' },
              { icon: ShieldCheck, title: 'Authentic 100%', desc: 'Verified tech from global brands' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day hassle-free exchange' },
              { icon: Headphones, title: 'Direct Support', desc: 'Expert tech support via call/chat' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="flex flex-col items-center text-center space-y-4 p-8 rounded-2xl hover:bg-slate-50 transition-all">
                <div className="w-16 h-16 rounded-full bg-slate-50 border border-border flex items-center justify-center text-accent shadow-sm">
                  <item.icon size={28} strokeWidth={2.5} />
                </div>
                <h3 className="text-sm font-black text-primary uppercase tracking-widest">{item.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER SECTION - Added Feature ========== */}
      <section className="bg-bg-alt border-y border-border py-24">
         <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-accent"></div>
                  <span className="text-[10px] font-black text-accent uppercase tracking-[0.5em]">Membership Protocol</span>
               </div>
               <h2 className="text-4xl font-black text-primary uppercase tracking-tighter leading-tight">Join The Elite <br/> Tech Circle.</h2>
               <p className="text-sm text-text-muted font-medium max-w-sm leading-relaxed">Early access to limited drops, high-tech insights, and exclusive member-only pricing delivered weekly.</p>
            </div>
            <div className="flex flex-col gap-4">
               <div className="flex gap-2">
                  <input type="email" placeholder="ENTER YOUR EMAIL ADDRESS" className="flex-grow bg-white border border-border px-6 py-5 text-[11px] font-black tracking-widest focus:outline-none focus:border-accent" />
                  <button className="bg-primary text-white px-10 py-5 text-[11px] font-black tracking-widest hover:bg-accent transition-all">SUBSCRIBE</button>
               </div>
               <div className="flex items-center gap-3 px-2">
                  <CheckCircle2 size={12} className="text-success" />
                  <span className="text-[9px] text-text-muted font-bold uppercase tracking-widest">No spam. Only high-end flagship updates.</span>
               </div>
            </div>
         </div>
      </section>

      {/* ========== FINAL QUOTE ========== */}
      <section id="quote" className="py-24 bg-white">
         <div className="container mx-auto px-6 text-center max-w-4xl space-y-8">
            <Star size={40} className="text-accent mx-auto fill-accent opacity-20" />
            <h2 className="text-3xl md:text-4xl font-black text-primary tracking-tighter italic uppercase leading-none opacity-80 italic">"Technology is best when it brings people together. We bring the best tech to your door."</h2>
            <div className="h-1 w-20 bg-accent mx-auto"></div>
            <p className="text-xs font-black uppercase tracking-widest text-text-muted">TECH STORE REDEFINED EXPERIENCE</p>
         </div>
       </section>
    </div>
  );
};

export default Home;
