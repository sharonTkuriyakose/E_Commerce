import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Check, Search, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductCard3D from '../components/ProductCard3D';
import { categories } from '../data/products'; // Keep categories static for filter UI

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState(5000);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products from API
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

  // Filter application
  useEffect(() => {
    let result = allProducts;
    
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    
    result = result.filter(p => p.price <= priceRange);
    
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    setFilteredProducts(result);
  }, [activeCategory, priceRange, searchQuery, allProducts]);

  return (
    <div className="pt-24 min-h-screen container mx-auto px-6 pb-24">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 border-b border-glass-border pb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          All <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-blue">Products</span>
        </h1>
        <p className="text-gray-400">Discover our premium selection of tech gadgets and accessories.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* Sidebar Filters */}
        <motion.aside 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/4 lg:sticky lg:top-28 h-fit glass-panel p-6 space-y-8"
        >
          <div className="flex items-center space-x-2 text-lg font-bold border-b border-glass-border pb-4">
            <Filter size={20} className="text-accent-blue" />
            <span>Filters</span>
          </div>

          {/* Search */}
          <div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-dark-bg border border-glass-border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-accent-blue transition-colors text-sm"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Category</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setActiveCategory('all')}
                  className={`flex justify-between w-full text-left text-sm transition-colors ${activeCategory === 'all' ? 'text-accent-blue font-semibold' : 'text-gray-400 hover:text-white'}`}
                >
                  All Categories
                  {activeCategory === 'all' && <Check size={16} />}
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex justify-between w-full text-left text-sm transition-colors ${activeCategory === cat.id ? 'text-accent-blue font-semibold' : 'text-gray-400 hover:text-white'}`}
                  >
                    {cat.name}
                    {activeCategory === cat.id && <Check size={16} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Price Range</h3>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-accent-blue h-1 bg-dark-bg rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400 font-mono">
              <span>₹0</span>
              <span className="text-white">₹{priceRange}</span>
            </div>
          </div>
        </motion.aside>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          {/* Active filters display */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-400">Showing {filteredProducts.length} results</span>
            {activeCategory !== 'all' && (
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs flex items-center border border-glass-border">
                {categories.find(c => c.id === activeCategory)?.name}
                <button onClick={() => setActiveCategory('all')} className="ml-2 hover:text-red-400">&times;</button>
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-accent-blue animate-spin mb-4" />
              <p className="text-gray-500 font-mono">Loading premium tech...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-10">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="h-[420px]"
                  >
                    <ProductCard3D product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500">
                  <p className="text-xl mb-2">No products found.</p>
                  <button onClick={() => {setActiveCategory('all'); setPriceRange(5000); setSearchQuery('');}} className="text-accent-blue hover:underline">Clear all filters</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
