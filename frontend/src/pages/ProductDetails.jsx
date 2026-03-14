import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Box, Cylinder, useTexture, Plane } from '@react-three/drei';
import { ShieldCheck, Truck, RotateCcw, Star, ShoppingCart, Heart, ChevronRight, Loader2 } from 'lucide-react';
import ProductCard3D from '../components/ProductCard3D';

const ProductModel = ({ imageUrl }) => {
  const meshRef = useRef();
  const texture = useTexture(imageUrl);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
      meshRef.current.rotation.x = Math.cos(state.clock.getElapsedTime()) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        <Plane args={[3, 3]}>
          <meshStandardMaterial 
            map={texture} 
            transparent={true} 
            alphaTest={0.1}
            side={2}
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
  const [activeTab, setActiveTab] = useState('specs');
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5001/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        
        // Fetch related products (all products for now, filtered by category)
        const relRes = await fetch('http://localhost:5001/api/products');
        const allProducts = await relRes.json();
        setRelatedProducts(allProducts.filter(p => p.category === data.category && p._id !== data._id).slice(0, 3));
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <Loader2 className="w-12 h-12 text-accent-blue animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg text-white">
        <h2 className="text-2xl font-bold mb-4">Error: {error || 'Product not found'}</h2>
        <Link to="/products" className="btn-primary">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-dark-bg">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 mb-8 text-sm text-gray-400 flex items-center">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={14} className="mx-2" />
        <Link to="/products" className="hover:text-white transition-colors">Products</Link>
        <ChevronRight size={14} className="mx-2" />
        <span className="text-white truncate">{product.name}</span>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: 3D Viewer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-[600px] overflow-hidden lg:sticky lg:top-28 flex flex-col"
        >
          <div className="absolute top-4 left-4 z-10 glass-panel px-3 py-1 rounded-full text-xs font-mono border-accent-blue">
            Interactive 3D View
          </div>
          
          <div className="flex-grow w-full relative cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#aa3bff" />
              <Environment preset="city" />
              <ProductModel imageUrl={product.image} />
              <OrbitControls enableZoom={true} />
            </Canvas>
          </div>

          <div className="h-24 bg-dark-surface/80 border-t border-glass-border flex items-center px-4 space-x-4 overflow-x-auto">
            <div className="w-16 h-16 rounded-lg glass-panel border-accent-blue p-1 flex items-center justify-center shrink-0">
              <span className="text-xs text-center text-accent-blue font-mono font-bold">3D</span>
            </div>
            <div className="w-16 h-16 rounded-lg border border-glass-border p-1 bg-white flex items-center justify-center shrink-0 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
              <img src={product.image} className="max-h-full object-contain" alt="Gallery 1" />
            </div>
          </div>
        </motion.div>

        {/* Right: Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <div className="text-sm font-bold text-accent-blue mb-2 uppercase tracking-wider">{product.category}</div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight text-white">{product.name}</h1>
            
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex text-accent-blue">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} className={i <= Math.floor(product.rating) ? 'fill-accent-blue' : 'text-gray-600'} />)}
              </div>
              <span className="font-bold text-white">{product.rating}</span>
              <span className="text-gray-500 text-sm hover:underline cursor-pointer">(124 Reviews)</span>
            </div>

            <div className="text-4xl font-light text-white font-mono">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-white font-mono">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed border-l-2 border-accent-blue pl-4">
            {product.description}
          </p>

          <div className="flex space-x-4 pt-4">
            <button onClick={handleAddToCart} className="flex-1 btn-outline text-lg flex justify-center items-center">
              <ShoppingCart size={20} className="mr-2" /> Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 btn-primary text-lg flex justify-center items-center shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Buy Now
            </button>
            <button className="w-14 h-14 shrink-0 rounded-full glass-panel border border-glass-border flex items-center justify-center text-white hover:text-accent-blue hover:border-accent-blue/50 transition-colors">
              <Heart size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-y border-glass-border">
            <div className="flex flex-col items-center text-center p-4 glass-panel rounded-xl">
              <Truck size={24} className="text-accent-blue mb-2" />
              <span className="font-bold text-sm">Free Shipping</span>
              <span className="text-xs text-gray-400 mt-1">On orders over $50</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 glass-panel rounded-xl">
              <ShieldCheck size={24} className="text-accent-blue mb-2" />
              <span className="font-bold text-sm">1 Year Warranty</span>
              <span className="text-xs text-gray-400 mt-1">Premium coverage</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 glass-panel rounded-xl">
              <RotateCcw size={24} className="text-gray-300 mb-2" />
              <span className="font-bold text-sm">30 Day Return</span>
              <span className="text-xs text-gray-400 mt-1">No questions asked</span>
            </div>
          </div>

          <div>
            <div className="flex border-b border-glass-border mb-6">
              <button 
                onClick={() => setActiveTab('description')}
                className={`pb-4 px-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'description' ? 'border-accent-blue text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                Features
              </button>
              <button 
                onClick={() => setActiveTab('specs')}
                className={`pb-4 px-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'specs' ? 'border-accent-blue text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                Specifications
              </button>
            </div>
            
            <div className="min-h-[200px] text-gray-300">
              <AnimatePresence mode="wait">
                {activeTab === 'description' ? (
                  <motion.div key="desc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <p className="mb-4">Designed with the modern user in mind, this product seamlessly integrates state-of-the-art technology with luxurious aesthetics. Its premium materials ensure durability while maintaining a lightweight profile.</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Next-generation performance architecture</li>
                      <li>Immersive visual and auditory experience</li>
                      <li>All-day battery life with fast charging capabilities</li>
                      <li>Environmentally conscious packaging and materials</li>
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div key="specs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="bg-white/5 rounded-xl border border-glass-border overflow-hidden">
                      {product.specs && Object.entries(product.specs).map(([key, value], idx) => (
                        <div key={key} className={`flex ${idx % 2 === 0 ? 'bg-black/20' : ''} p-4`}>
                          <span className="w-1/3 font-semibold text-white capitalize">{key}</span>
                          <span className="w-2/3 text-gray-400">{value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-6 py-24 border-t border-glass-border mt-16">
          <h2 className="text-3xl font-bold mb-10">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <div key={p._id} className="h-[400px]">
                <ProductCard3D product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
