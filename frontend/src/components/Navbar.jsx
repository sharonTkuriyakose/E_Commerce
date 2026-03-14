import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userInfo, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-glass-border/50 rounded-none bg-dark-surface/70">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          RDX<span className="text-accent-blue neon-glow">Store</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link>
          <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</Link>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Animated Search Bar */}
          <div className="relative flex items-center">
            <motion.div
              initial={false}
              animate={{ width: isSearchExpanded ? 240 : 40 }}
              className="flex items-center bg-white/5 rounded-full border border-glass-border overflow-hidden"
            >
              <button 
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full pr-4"
                style={{ display: isSearchExpanded ? 'block' : 'none' }}
              />
            </motion.div>
          </div>

          <Link to="/wishlist" className="text-gray-400 hover:text-accent-blue transition-colors relative">
            <Heart size={22} />
            <span className="absolute -top-1 -right-2 bg-accent-blue text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </Link>
          
          <Link to="/cart" className="text-gray-400 hover:text-accent-blue transition-colors relative">
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-accent-blue text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>
          
          {userInfo ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-full bg-accent-blue/20 border border-accent-blue/50 flex items-center justify-center text-accent-blue font-bold text-xs">
                  {userInfo.name.charAt(0).toUpperCase()}
                </div>
              </button>
              
              <div className="absolute right-0 top-full pt-4 hidden group-hover:block w-48">
                <div className="glass-panel p-2 border border-glass-border">
                  <div className="px-4 py-2 text-xs text-gray-400 border-b border-glass-border mb-1 truncate">
                    {userInfo.email}
                  </div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-red-400 rounded-lg transition-colors">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
              <User size={22} />
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-panel rounded-none border-t border-glass-border/50 bg-dark-bg/95 overflow-hidden"
          >
            <div className="p-6 flex flex-col space-y-4 text-center">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-300 hover:text-white">Home</Link>
              <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-lg text-gray-300 hover:text-white">Products</Link>
              <div className="h-px bg-glass-border w-full"></div>
              <div className="flex justify-center space-x-8 pt-2">
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-accent-blue"><Heart size={24} /></Link>
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-accent-blue"><ShoppingCart size={24} /></Link>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white"><User size={24} /></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
