import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Loader2, SlidersHorizontal, Sliders, ChevronRight } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard3D from '../components/ProductCard3D';
import { categories } from '../data/products';

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
    <div className="pt-32 min-h-screen bg-white">
      <div className="container mx-auto px-6 pb-24">
        {/* Breadcrumb - Essential for retail */}
        <div id="breadcrumb" className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-text-muted mb-6">
           <Link to="/" className="text-primary hover:text-accent transition-colors">Home</Link>
           <ChevronRight size={14} strokeWidth={2.5} />
           <span className="text-accent">Electronic Store</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 pt-6">
          {/* Myntra style professional sidebar filters */}
          <aside className="lg:w-[260px] lg:sticky lg:top-32 h-fit space-y-10 shrink-0">
            <div className="pb-4 border-b border-border flex items-center justify-between">
               <h2 className="text-lg font-bold text-primary uppercase tracking-tighter">Filters</h2>
               <Sliders size={18} className="text-primary" />
            </div>

            {/* Categories */}
            <div>
              <p className="text-xs font-black text-primary uppercase tracking-widest mb-5">Categories</p>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveCategory('all')}
                  className="flex items-center gap-3 w-full group"
                >
                  <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-all ${activeCategory === 'all' ? 'border-accent bg-accent' : 'border-border'}`}>
                    {activeCategory === 'all' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                  <span className={`text-[12px] font-bold uppercase tracking-widest transition-colors ${activeCategory === 'all' ? 'text-accent' : 'text-text-secondary group-hover:text-primary'}`}>All</span>
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="flex items-center gap-3 w-full group"
                  >
                    <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-all ${activeCategory === cat.id ? 'border-accent bg-accent' : 'border-border'}`}>
                      {activeCategory === cat.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={`text-[12px] font-bold uppercase tracking-widest transition-colors ${activeCategory === cat.id ? 'text-accent' : 'text-text-secondary group-hover:text-primary'}`}>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price section */}
            <div className="pt-4">
              <p className="text-xs font-black text-primary uppercase tracking-widest mb-5">Price Range</p>
              <div className="px-1 space-y-4">
                <input 
                   type="range" min="0" max="5000" step="100" 
                   value={priceRange} 
                   onChange={(e) => setPriceRange(Number(e.target.value))}
                   className="w-full accent-accent h-1 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between items-center bg-bg-alt px-4 py-2 rounded-sm">
                   <span className="text-[10px] font-black text-text-muted">₹0</span>
                   <span className="text-sm font-black text-primary tracking-tighter">₹{priceRange.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Brands dummy section for UI */}
            <div className="pt-4">
              <p className="text-xs font-black text-primary uppercase tracking-widest mb-5">Brands</p>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                {['Sony', 'Bose', 'Apple', 'Sennheiser', 'Samsung', 'Beats', 'LG'].map(brand => (
                  <div key={brand} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-4 h-4 border-2 border-border rounded-sm group-hover:border-accent"></div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-text-secondary group-hover:text-primary transition-colors">{brand}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => { setActiveCategory('all'); setPriceRange(5000); setSearchQuery(''); setSortBy('latest'); }}
              className="w-full py-3 mt-6 border border-border text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:bg-slate-50 transition-all font-bold"
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
              <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
                <p className="text-xs font-black uppercase tracking-widest text-text-muted">Loading Electronics...</p>
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
