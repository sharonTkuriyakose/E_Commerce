import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Search, User, Menu, X, Settings, LogOut, LayoutDashboard, ChevronDown, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 1);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setKeyword(transcript);
      navigate(`/products?search=${transcript}`);
    };

    recognition.start();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?search=${keyword}`);
      setKeyword('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Electronic Store', path: '/products' },
    { name: 'Featured Products', path: '/products?category=featured' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all bg-white ${isScrolled ? 'shadow-sticky h-20' : 'h-24'}`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-accent flex items-center justify-center font-black text-white text-base sm:text-xl uppercase tracking-tighter" style={{ fontFamily: 'Inter' }}>T</div>
          <span className="text-lg sm:text-2xl font-black tracking-tighter text-primary uppercase" style={{ fontFamily: 'Inter' }}>TECH<span className="text-accent underline decoration-4 underline-offset-4 uppercase ml-1 sm:ml-2">STORE</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 ml-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[12px] font-bold uppercase tracking-widest py-1 border-b-2 transition-all ${
                location.pathname === link.path ? 'border-accent text-primary' : 'border-transparent text-primary hover:border-accent'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Global Search with Voice */}
        <div className="grow max-w-2xl mx-12 hidden md:block">
          <form onSubmit={submitHandler} className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              <Search size={18} strokeWidth={2.5} />
            </div>
            <input 
              type="text" 
              placeholder="Search for products, brands and more"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-bg-alt border-0 rounded-md pl-12 pr-12 py-3 text-sm focus:bg-white focus:ring-1 focus:ring-border outline-none transition-all placeholder:text-text-muted font-medium"
            />
            <button 
              type="button" 
              onClick={startVoiceSearch}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all ${isListening ? 'text-accent animate-pulse' : 'text-text-muted hover:text-primary'}`}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden lg:flex items-center gap-6 border-r border-border pr-6 mr-1">
            {/* User Account */}
            <div className="relative group">
               <button className="flex flex-col items-center gap-1 group">
                 <User size={20} className="text-primary group-hover:text-accent transition-colors" />
                 <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary group-hover:text-primary">Profile</span>
               </button>
               
               <div className="absolute right-[-20px] top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white shadow-2xl border border-border rounded-sm w-64 p-5 space-y-4">
                     {userInfo ? (
                        <>
                           <div className="pb-3 border-b border-border">
                              <p className="text-sm font-bold text-primary truncate">Hello, {userInfo.name}</p>
                              <p className="text-[10px] text-text-muted truncate">{userInfo.email}</p>
                           </div>
                           <div className="flex flex-col gap-3">
                              <Link to="/profile" className="text-xs font-bold text-text-secondary hover:text-accent transition-colors">Orders</Link>
                              <Link to="/wishlist" className="text-xs font-bold text-text-secondary hover:text-accent transition-colors">Wishlist</Link>
                              {userInfo.isAdmin && <Link to="/admin/dashboard" className="text-xs font-bold text-accent">Admin Dashboard</Link>}
                              <button onClick={handleLogout} className="text-xs font-bold text-danger text-left uppercase tracking-widest mt-1">End Session</button>
                           </div>
                        </>
                     ) : (
                        <div className="space-y-4">
                           <p className="text-sm font-bold text-primary leading-tight font-black uppercase tracking-tight">Premium Retail Member</p>
                           <Link to="/login" className="block w-full py-2.5 text-center text-accent border border-border font-bold text-xs uppercase hover:bg-slate-50 transition-colors">Login / Signup</Link>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="flex flex-col items-center gap-1 group relative">
              <div className="relative">
                <Heart size={20} className="text-primary group-hover:text-accent transition-colors" />
                {wishlistItems && wishlistItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[7px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary group-hover:text-primary">Wishlist</span>
            </Link>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="flex flex-col items-center gap-1 group relative pb-1">
             <div className="relative">
                <ShoppingCart size={22} className="text-primary group-hover:text-accent transition-colors" />
                {cartItems.length > 0 && (
                   <span className="absolute -top-2 -right-2 bg-accent text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                   </span>
                )}
             </div>
             <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary group-hover:text-primary">Bag</span>
          </Link>

          <button className="lg:hidden text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-white z-200 lg:hidden p-8"
          >
             <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-black uppercase">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
             </div>
             <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black uppercase tracking-tighter border-b pb-4 border-border">{link.name}</Link>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
