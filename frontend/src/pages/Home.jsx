import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Loader2, ShoppingCart, Zap, ShieldCheck, Globe, Play, CheckCircle2, Cpu, Smartphone, Headphones, Watch } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Hero3D from '../components/Hero3D';
import ProductCard3D from '../components/ProductCard3D';
import { categories } from '../data/products';
import { useCart } from '../context/CartContext';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/products');
        const data = await res.json();
        setFeaturedProducts(data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          {/* Animated 3D Background */}
          <Hero3D />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/40 via-transparent to-dark-bg"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pointer-events-none">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-5 space-y-8 text-left pointer-events-auto"
          >
            <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1]">
              Future <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-blue neon-glow">In Hands.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-gray-300 max-w-xl font-light">
              Experience the next generation of premium tech gadgets. Immerse yourself in our interactive 3D product previews.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap gap-6 pt-4">
              <Link to="/products" className="btn-primary hover:neon-glow inline-flex items-center">
                Explore All <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/categories" className="btn-outline">View Categories</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">Browse by Category</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Discover our wide range of premium products tailored for your lifestyle.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
              onClick={() => navigate(`/products?category=${category.id}`)}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer flex items-end p-8 perspective-1000 border border-glass-border drop-shadow-2xl"
            >
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-dark-bg/60 group-hover:bg-dark-bg/40 transition-colors duration-500 z-10"></div>
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="relative z-20 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <div className="flex items-center text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <span className="text-sm font-semibold mr-2">Shop Now</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-24 relative bg-dark-surface/50 border-y border-glass-border">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">Trending Specs</h2>
              <p className="text-gray-400 max-w-xl">Curated selection of our most sought-after electronics.</p>
            </motion.div>
            <Link to="/products" className="text-accent-blue font-semibold hover:text-white transition-colors flex items-center">
              View Entire Collection <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-accent-blue animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
              {featuredProducts.map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="h-[450px]"
                >
                  <ProductCard3D product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-24 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden glass-panel border border-accent-blue/30 lg:flex items-center p-8 lg:p-16 min-h-[400px]"
        >
          <div className="relative z-10 lg:w-1/2 space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-accent-blue/20 border border-accent-blue text-accent-blue text-xs font-bold tracking-widest uppercase mb-2">
              New Arrival
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              MacBook Pro <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">M3 Max</span>
            </h2>
            <p className="text-lg text-gray-300">
              Mind-blowing. Head-turning. Built for the most extreme workflows.
            </p>
            <Link to="/products" className="btn-primary mt-6 hover:shadow-[0_0_30px_rgba(138,43,226,0.6)] inline-block">
              Pre-order Now
            </Link>
          </div>

          <div className="relative z-10 lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <img 
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop" 
                alt="MacBook Pro M3" 
                className="w-full max-w-lg object-contain drop-shadow-2xl mix-blend-screen"
                style={{ filter: "brightness(1.2) contrast(1.1)" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-dark-surface/30 border-t border-glass-border relative overflow-hidden pb-24">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "The 3D product viewer is mind-blowing. I could see every detail of the headphones before buying. Premium experience all around.", author: "Alex J.", role: "Audio Engineer" },
              { text: "Fast shipping, impeccable packaging, and a futuristic website interface that makes shopping actually fun. Highly recommended.", author: "Sarah W.", role: "Tech Content Creator" },
              { text: "I bought the iPhone 15 Pro from here. The 3D tilt interactions on the cards felt just like I was on an Apple site. Great job.", author: "Michael T.", role: "App Developer" }
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass-panel p-8 relative"
              >
                <div className="flex items-center space-x-1 mb-6 mt-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="text-accent-blue fill-accent-blue" size={14} />)}
                </div>
                <p className="text-gray-300 mb-8 italic">"{review.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-blue to-accent-blue p-[2px]">
                    <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center font-bold text-lg">
                      {review.author[0]}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{review.author}</h4>
                    <span className="text-xs text-accent-blue">{review.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
