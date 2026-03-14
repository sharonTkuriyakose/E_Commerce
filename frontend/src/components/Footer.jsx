import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-glass-border bg-dark-surface/50 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent-blue/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tighter">
              RDX<span className="text-accent-blue">Store</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the future of electronics shopping. Premium gadgets, immersive 3D previews, and seamless transactions.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:text-accent-blue hover:border-accent-blue/50 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:text-accent-blue hover:border-accent-blue/50 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:text-accent-blue hover:border-accent-blue/50 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:text-gray-300 over:border-gray-300 transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/products" className="hover:text-accent-blue transition-colors">All Products</Link></li>
              <li><Link to="/products?category=smartphones" className="hover:text-accent-blue transition-colors">Smartphones</Link></li>
              <li><Link to="/products?category=laptops" className="hover:text-accent-blue transition-colors">Laptops</Link></li>
              <li><Link to="/products?category=audio" className="hover:text-accent-blue transition-colors">Audio & Headphones</Link></li>
              <li><Link to="/products?category=wearables" className="hover:text-accent-blue transition-colors">Wearables</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/faq" className="hover:text-accent-blue transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-accent-blue transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/track" className="hover:text-accent-blue transition-colors">Track Order</Link></li>
              <li><Link to="/contact" className="hover:text-accent-blue transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive tech deals and drops.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-dark-bg border border-glass-border rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-accent-blue text-sm"
              />
              <button className="bg-gradient-to-r from-accent-blue to-accent-blue px-4 py-2 rounded-r-lg font-medium text-white hover:opacity-90 transition-opacity whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-glass-border text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} TechStore. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
