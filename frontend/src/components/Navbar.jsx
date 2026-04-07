import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, Search, User, Menu, X, Settings, LogOut, LayoutDashboard, ChevronDown, Moon, Sun, LayoutPanelLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { useCompare } from '../context/CompareContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { darkMode, toggleTheme } = useTheme();
  const { compareItems } = useCompare();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/products');
        const data = await res.json();
        setAllProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching products search suggestions:', err);
        setAllProducts([]);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (keyword.trim() && Array.isArray(allProducts)) {
      try {
        const searchLow = keyword.toLowerCase();
        const filtered = allProducts.filter(p => {
          if (!p) return false;
          return (p.name?.toLowerCase().includes(searchLow)) ||
                 (p.category?.toLowerCase().includes(searchLow)) ||
                 (p.brand?.toLowerCase().includes(searchLow));
        }).slice(0, 8);
        setSuggestions(filtered);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Search error:', err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [keyword, allProducts]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };



  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?search=${keyword}`);
      setKeyword('');
      setShowSuggestions(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Electronic Store', path: '/products' },
    { name: 'Featured Products', path: '/products?category=featured' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'shadow-sticky h-20' : 'h-24'} ${darkMode ? 'bg-slate-950 border-b border-slate-900' : 'bg-white border-b border-border'}`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-accent flex items-center justify-center font-black text-white text-base sm:text-xl uppercase tracking-tighter" style={{ fontFamily: 'Inter' }}>T</div>
          <span className={`text-lg sm:text-2xl font-black tracking-tighter uppercase ${darkMode ? 'text-white' : 'text-primary'}`} style={{ fontFamily: 'Inter' }}>TECH<span className="text-accent underline decoration-4 underline-offset-4 uppercase ml-1 sm:ml-2">STORE</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 ml-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[12px] font-bold uppercase tracking-widest py-1 border-b-2 transition-all ${
                location.pathname === link.path 
                  ? 'border-accent text-accent' 
                  : `border-transparent hover:border-accent ${darkMode ? 'text-slate-300 hover:text-white' : 'text-primary hover:text-primary'}`
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Global Search - Enhanced Layout */}
        <div className="flex-1 max-w-2xl mx-12 hidden md:block min-w-[300px]">
          <form ref={searchRef} onSubmit={submitHandler} className="relative w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              <Search size={18} strokeWidth={2.5} />
            </div>
            <input 
              type="text" 
              placeholder="Search for premium tech products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={() => keyword.trim() && setShowSuggestions(true)}
              className={`w-full border-0 rounded-md pl-12 pr-6 py-3 text-sm focus:ring-1 outline-none transition-all placeholder:text-text-muted font-medium ${darkMode ? 'bg-slate-900 focus:bg-slate-800 text-white focus:ring-slate-700' : 'bg-bg-alt focus:bg-white focus:ring-border'}`}
            />
            
            <AnimatePresence>
              {showSuggestions && Array.isArray(suggestions) && suggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute left-0 right-0 top-full mt-2 rounded-sm shadow-2xl border z-[110] overflow-hidden backdrop-blur-xl ${darkMode ? 'bg-slate-950/95 border-slate-800 shadow-black/80' : 'bg-white/95 border-border shadow-gray-200'}`}
                >
                  <div className={`px-4 py-2 border-b text-[9px] font-black uppercase tracking-widest ${darkMode ? 'border-slate-800 text-slate-500' : 'border-border text-text-muted'}`}>
                    Found in collection
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                    {suggestions.map((p) => {
                      if (!p || !p._id) return null;
                      return (
                        <button
                          key={p._id}
                          type="button"
                          onClick={() => {
                            navigate(`/product/${p._id}`);
                            setShowSuggestions(false);
                            setKeyword('');
                          }}
                          className={`w-full flex items-center gap-4 px-4 py-4 text-left transition-colors border-b last:border-0 ${darkMode ? 'hover:bg-slate-900 border-slate-900/50' : 'hover:bg-slate-50 border-border/50'}`}
                        >
                          <div className="w-12 h-12 bg-white rounded-sm overflow-hidden p-1 shrink-0 shadow-sm">
                            <img src={p.image || '/images/sample.jpg'} alt={p.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-black truncate uppercase tracking-tight ${darkMode ? 'text-white' : 'text-primary'}`}>{p.name || 'Product'}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-accent text-[11px] font-black">₹{typeof p.price === 'number' ? p.price.toLocaleString() : '0'}</span>
                              <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm ${darkMode ? 'bg-slate-900 text-slate-500' : 'bg-bg-alt text-text-muted'}`}>{p.category}</span>
                            </div>
                          </div>
                          <ChevronRight size={14} className={darkMode ? 'text-slate-700' : 'text-slate-300'} />
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="submit"
                    className={`w-full py-3.5 text-center text-[10px] font-black uppercase tracking-widest transition-all ${darkMode ? 'bg-slate-900 text-accent hover:bg-black' : 'bg-bg-alt text-accent hover:bg-white'}`}
                  >
                    Explore results for "{keyword}"
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden lg:flex items-center gap-6 border-r border-border pr-6 mr-1">
            {/* User Account */}
            <div className="relative group">
                <button className="flex flex-col items-center gap-1 group">
                  <User size={20} className={`${darkMode ? 'text-slate-300 group-hover:text-accent' : 'text-primary group-hover:text-accent'} transition-colors`} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider transition-all ${darkMode ? 'text-slate-500 group-hover:text-white' : 'text-text-secondary group-hover:text-primary'}`}>Profile</span>
                </button>
               
               <div className={`absolute right-[-20px] top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50`}>
                  <div className={`shadow-2xl border border-border rounded-sm w-64 p-5 space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
                     {userInfo ? (
                        <>
                           <div className={`pb-3 border-b ${darkMode ? 'border-slate-800' : 'border-border'}`}>
                              <p className={`text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-primary'}`}>Hello, {userInfo.name}</p>
                              <p className={`text-[10px] truncate ${darkMode ? 'text-slate-500' : 'text-text-muted'}`}>{userInfo.email}</p>
                           </div>
                           <div className="flex flex-col gap-3">
                              <Link to="/profile" className={`text-xs font-bold hover:text-accent transition-colors ${darkMode ? 'text-slate-300' : 'text-text-secondary'}`}>Orders</Link>
                              <Link to="/wishlist" className={`text-xs font-bold hover:text-accent transition-colors ${darkMode ? 'text-slate-300' : 'text-text-secondary'}`}>Wishlist</Link>
                              {userInfo.isAdmin && <Link to="/admin/dashboard" className="text-xs font-bold text-accent">Admin Dashboard</Link>}
                              <button onClick={handleLogout} className="text-xs font-bold text-danger text-left uppercase tracking-widest mt-1">End Session</button>
                           </div>
                        </>
                     ) : (
                        <div className="space-y-4">
                           <p className={`text-sm font-bold leading-tight font-black uppercase tracking-tight ${darkMode ? 'text-white' : 'text-primary'}`}>Premium Retail Member</p>
                           <Link to="/login" className={`block w-full py-2.5 text-center font-bold text-xs uppercase border border-border transition-colors ${darkMode ? 'text-accent hover:bg-slate-800' : 'text-accent hover:bg-slate-50'}`}>Login / Signup</Link>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="flex flex-col items-center gap-1 group relative">
               <div className="relative">
                 <Heart size={20} className={`${darkMode ? 'text-slate-300 group-hover:text-accent' : 'text-primary group-hover:text-accent'} transition-colors`} />
                 {wishlistItems && wishlistItems.length > 0 && (
                   <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
                     {wishlistItems.length}
                   </span>
                 )}
               </div>
               <span className={`text-[10px] font-bold uppercase tracking-wider transition-all ${darkMode ? 'text-slate-500 group-hover:text-white' : 'text-text-secondary group-hover:text-primary'}`}>Wishlist</span>
            </Link>

            {/* Compare Hub - Advanced Feature */}
            <Link to="/compare" className="flex flex-col items-center gap-1 group relative">
               <div className="relative">
                 <LayoutPanelLeft size={20} className={`${darkMode ? 'text-slate-300 group-hover:text-accent' : 'text-primary group-hover:text-accent'} transition-colors`} />
                 {compareItems && compareItems.length > 0 && (
                   <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
                     {compareItems.length}
                   </span>
                 )}
               </div>
               <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${darkMode ? 'text-slate-500 group-hover:text-white' : 'text-text-secondary group-hover:text-primary'}`}>Compare</span>
            </Link>

            {/* Theme Toggle - Advanced Feature */}
            <button onClick={toggleTheme} className="flex flex-col items-center gap-1 group relative">
              <div className="relative">
                {darkMode ? (
                  <Sun size={20} className="text-accent hover:scale-110 transition-transform" />
                ) : (
                  <Moon size={20} className="text-primary hover:text-accent hover:scale-110 transition-transform" />
                )}
              </div>
               <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${darkMode ? 'text-slate-500 group-hover:text-white' : 'text-text-secondary group-hover:text-primary'}`}>Theme</span>
            </button>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="flex flex-col items-center gap-1 group relative pb-1">
             <div className="relative">
                <ShoppingCart size={22} className={`${darkMode ? 'text-slate-300 text-glow' : 'text-primary'} group-hover:text-accent transition-colors`} />
                {cartItems.length > 0 && (
                   <span className="absolute -top-2 -right-2 bg-accent text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                   </span>
                )}
             </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${darkMode ? 'text-slate-500 group-hover:text-white' : 'text-text-secondary group-hover:text-primary'}`}>Bag</span>
           </Link>

          <button className={`lg:hidden ${darkMode ? 'text-white' : 'text-primary'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`fixed inset-0 bg-black/60 backdrop-blur-xl z-200 lg:hidden overflow-y-auto no-scrollbar ${darkMode ? 'bg-slate-950 text-white' : 'bg-white'}`}
          id="mobile-menu"
        >
             <div className="flex items-center justify-between mb-12 p-8">
                <span className="text-xl font-black uppercase">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
             </div>
             <div className="flex flex-col gap-6 px-8">
                {navLinks.map((link) => (
                   <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={`text-2xl font-black uppercase tracking-tighter border-b pb-4 ${darkMode ? 'border-slate-800' : 'border-border'}`}>{link.name}</Link>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
