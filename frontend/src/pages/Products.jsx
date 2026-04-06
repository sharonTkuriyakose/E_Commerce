import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Loader2, SlidersHorizontal, Sliders, ChevronRight } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard3D from '../components/ProductCard3D';
import { categories } from '../data/products';
import { ProductSkeleton } from '../components/Skeleton';
import { useTheme } from '../context/ThemeContext';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState(5000);
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('latest');
  const { darkMode } = useTheme();

  useEffect(() => { if (searchParam) setSearchQuery(searchParam); }, [searchParam]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5001/api/products');
        const data = await res.json();
        setAllProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = allProducts;
    if (activeCategory !== 'all') result = result.filter(p => p.category === activeCategory);
    result = result.filter(p => p.price <= priceRange);
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Sort
    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    
    setFilteredProducts(result);
  }, [activeCategory, priceRange, searchQuery, allProducts, sortBy]);

  return (
     <div className={`pt-32 min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white'}`}>
      <div className="container mx-auto px-6 pb-24 max-w-7xl">
        {/* Breadcrumb - Essential for retail */}
        <div id="breadcrumb" className={`flex items-center gap-2 text-[12px] font-black uppercase tracking-[.2em] mb-6 ${darkMode ? 'text-slate-500' : 'text-text-muted'}`}>
           <Link to="/" className="hover:text-accent transition-colors">Home</Link>
           <ChevronRight size={14} strokeWidth={2.5} />
           <span className="text-accent underline decoration-4 underline-offset-4">Store</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 pt-6">
          {/* Myntra style professional sidebar filters */}
           <aside className="lg:w-[260px] lg:sticky lg:top-32 h-fit space-y-10 shrink-0">
            <div className={`pb-4 border-b flex items-center justify-between ${darkMode ? 'border-slate-800' : 'border-border'}`}>
               <h2 className="text-lg font-black uppercase tracking-tighter">Filters</h2>
               <Sliders size={18} className="text-accent" />
            </div>

            {/* Categories */}
            <div className="pt-4">
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-5 ${darkMode ? 'text-slate-500' : 'text-primary'}`}>Categories</p>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveCategory('all')}
                  className="flex items-center gap-3 w-full group"
                >
                  <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-all ${activeCategory === 'all' ? 'border-accent bg-accent' : (darkMode ? 'border-slate-800' : 'border-border')}`}>
                    {activeCategory === 'all' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeCategory === 'all' ? 'text-accent' : (darkMode ? 'text-slate-400 group-hover:text-white' : 'text-text-secondary group-hover:text-primary')}`}>All</span>
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="flex items-center gap-3 w-full group"
                  >
                    <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-all ${activeCategory === cat.id ? 'border-accent bg-accent' : (darkMode ? 'border-slate-800' : 'border-border')}`}>
                      {activeCategory === cat.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeCategory === cat.id ? 'text-accent' : (darkMode ? 'text-slate-400 group-hover:text-white' : 'text-text-secondary group-hover:text-primary')}`}>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-5 ${darkMode ? 'text-slate-500' : 'text-primary'}`}>Price Range</p>
              <div className="px-1 space-y-4">
                <input 
                   type="range" min="0" max="5000" step="100" 
                   value={priceRange} 
                   onChange={(e) => setPriceRange(Number(e.target.value))}
                   className="w-full accent-accent h-1 bg-border dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <div className={`flex justify-between items-center px-4 py-2 rounded-sm border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-bg-alt border-border/5'}`}>
                   <span className="text-[10px] font-black text-text-muted">₹0</span>
                   <span className={`text-sm font-black tracking-tighter ${darkMode ? 'text-white' : 'text-primary'}`}>₹{priceRange.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-5 ${darkMode ? 'text-slate-500' : 'text-primary'}`}>Fabricators</p>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                {['Sony', 'Bose', 'Apple', 'Sennheiser', 'Samsung', 'Beats', 'LG'].map(brand => (
                  <div key={brand} className="flex items-center gap-3 group cursor-pointer">
                    <div className={`w-4 h-4 border-2 rounded-sm transition-all group-hover:border-accent ${darkMode ? 'border-slate-800' : 'border-border'}`}></div>
                    <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${darkMode ? 'text-slate-400 group-hover:text-white' : 'text-text-secondary group-hover:text-primary'}`}>{brand}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { setActiveCategory('all'); setPriceRange(5000); setSearchQuery(''); setSortBy('latest'); }}
              className={`w-full py-3 mt-6 border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${darkMode ? 'border-slate-800 text-slate-400 hover:bg-slate-900' : 'border-border text-primary hover:bg-slate-50'}`}
            >
              Clear All Filters
            </button>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 space-y-8">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-border gap-4">
              <div className="flex items-center gap-3">
                 <h3 className="text-lg font-black text-primary uppercase tracking-tighter">Results</h3>
                 <span className="text-xs text-text-muted font-medium italic">({filteredProducts.length} items found)</span>
              </div>
              
              <div className="flex items-center gap-3 border border-border px-4 py-2 hover:bg-slate-50 cursor-pointer">
                <span className="text-[10px] font-bold uppercase text-text-secondary">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-0 text-[10px] font-black uppercase tracking-widest text-primary focus:outline-none appearance-none cursor-pointer pr-4"
                >
                  <option value="latest">What's New</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
                <ChevronDown size={14} className="text-text-muted" />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-12">
                   {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredProducts.length > 0 ? (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-12"
                  >
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-[480px]"
                      >
                        <ProductCard3D product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="py-40 flex flex-col items-center justify-center text-center px-6">
                    <div className="w-20 h-20 bg-slate-50 border border-border rounded-full flex items-center justify-center mb-8">
                       <Search size={32} className="text-text-muted" />
                    </div>
                    <h3 className="text-2xl font-black text-primary uppercase tracking-tighter mb-4">No results for your search</h3>
                    <p className="text-text-muted text-sm max-w-sm mb-10 leading-relaxed">Check for any spelling mistakes or try using more general terms.</p>
                    <button 
                      onClick={() => {setActiveCategory('all'); setPriceRange(5000); setSearchQuery('');}} 
                      className="btn-primary !px-12 !py-4 text-[11px] font-black tracking-widest"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
