import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();
  return (
    <footer className={`border-t border-border pt-24 pb-12 overflow-hidden shadow-2xl transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-primary'}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20 border-b border-border pb-24">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-10">
            <Link to="/" className="flex items-center gap-3 shrink-0">
               <div className={`w-12 h-12 rounded-sm flex items-center justify-center font-black text-white text-2xl uppercase tracking-tighter shadow-sm ${darkMode ? 'bg-accent' : 'bg-primary'}`} style={{ fontFamily: 'Inter' }}>T</div>
               <span className={`text-2xl font-black tracking-tighter uppercase ${darkMode ? 'text-white' : 'text-primary'}`} style={{ fontFamily: 'Inter' }}>TECH<span className="text-accent underline decoration-4 underline-offset-4 decoration-accent/20 ml-2">STORE</span></span>
            </Link>

            <div className="space-y-6">
               <p className={`text-sm font-medium leading-relaxed max-w-md ${darkMode ? 'text-slate-400' : 'text-text-muted'}`}>
                 Redefining the digital shopping experience with exclusive tech releases and premium performance hardware. Our curation is driven by innovation and excellence.
               </p>
               <div className="flex gap-4 pt-4">
                  {[Instagram, Twitter, Linkedin, Youtube].map((Icon, idx) => (
                    <button key={idx} className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${darkMode ? 'border-slate-800 text-slate-500 hover:text-accent hover:border-accent' : 'border-border text-text-muted hover:text-accent hover:border-accent'}`}>
                      <Icon size={18} strokeWidth={2} />
                    </button>
                  ))}
               </div>
            </div>
          </div>

          {/* Quick Navigations */}
          <div className="lg:col-span-3 space-y-8">
            <h3 className={`text-[11px] font-black uppercase tracking-[0.4em] ${darkMode ? 'text-white' : 'text-primary'}`}>Store Nav</h3>
            <ul className="space-y-4">
              {['Smartphones', 'Laptops', 'Audio Gear', 'Wearables', 'New Arrivals'].map((link) => (
                <li key={link}>
                  <Link to="/products" className={`text-xs font-bold hover:text-accent transition-colors flex items-center gap-2 group italic ${darkMode ? 'text-slate-400' : 'text-text-secondary'}`}>
                    <span className="w-0 group-hover:w-4 h-[1.5px] bg-accent transition-all"></span> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className={`text-xs font-black uppercase tracking-[0.3em] ${darkMode ? 'text-white' : 'text-primary'}`}>Support Hub</h3>
            <div className="space-y-4 pt-2">
               <div className={`flex items-center gap-4 text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-text-secondary'}`}>
                  <Mail size={16} className="text-accent" />
                  <span>support@techstore.com</span>
               </div>
               <div className={`flex items-center gap-4 text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-text-secondary'}`}>
                  <Phone size={16} className="text-accent" />
                  <span>+91 800-TECH-STORE</span>
               </div>
               <div className="flex items-center gap-4 text-xs font-bold text-text-secondary">
                  <MapPin size={16} className="text-accent" />
                  <span className={`${darkMode ? 'text-slate-400' : 'text-text-secondary'}`}>Global Tech HQ, Mumbai, India</span>
               </div>
            </div>

            <div className="pt-8 flex flex-col gap-4">
              <button 
                className="w-full bg-primary text-white py-4 rounded-sm text-[11px] font-black tracking-widest hover:bg-accent transition-all group flex items-center justify-center gap-4"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                ORDER NOW <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2 opacity-50 justify-center">
                 <ShieldCheck size={14} className="text-success" />
                 <span className={`text-[9px] font-black uppercase tracking-widest leading-none ${darkMode ? 'text-white' : 'text-primary'}`}>100% Encrypted Transactions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-4">
          <div className={`flex items-center gap-8 text-[10px] font-black uppercase tracking-widest opacity-80 ${darkMode ? 'text-slate-500' : 'text-text-muted'}`}>
            <span>© 2026 TECH STORE EXCLUSIVE. ALL RIGHTS RESERVED.</span>
            <div className="h-4 w-px bg-border hidden md:block"></div>
            <span className="italic italic leading-none pt-0.5">The Ultimate Retail Benchmark</span>
          </div>
          
          <div className="flex items-center gap-8 opacity-40">
             <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-3 grayscale" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.png" alt="MasterCard" className="h-5 grayscale" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal_p_logo_blank.png" alt="PayPal" className="h-4 grayscale" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
