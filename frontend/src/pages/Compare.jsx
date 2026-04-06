import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCompare } from '../context/CompareContext';
import { X, ShoppingCart, Zap, Star, ShieldCheck, Cpu, HardDrive, Smartphone, Battery, Monitor } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Compare = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  const specs = [
    { label: 'Category', key: 'category', icon: Zap },
    { label: 'Brand', key: 'brand', icon: ShieldCheck },
    { label: 'Price', key: 'price', icon: CreditCard, format: (v) => `₹${v.toLocaleString()}` },
    { label: 'Rating', key: 'rating', icon: Star, format: (v) => `${v} / 5.0` },
    { label: 'Availability', key: 'countInStock', icon: Package, format: (v) => v > 0 ? 'In Stock' : 'Out of Stock' },
  ];

  // Common Tech Specs (Simulated for high-end feel)
  const techSpecs = [
    { label: 'Processor', icon: Cpu, value: 'Octa-Core Flagship Gen 3' },
    { label: 'Display', icon: Monitor, value: '8K Ultra-Retina OLED' },
    { label: 'Memory', icon: HardDrive, value: '16GB LPDDR5X RAM' },
    { label: 'Battery', icon: Battery, value: 'Extreme Performance Li-Ion' },
  ];

  if (compareItems.length === 0) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center bg-white dark:bg-slate-950 px-6">
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto border border-border dark:border-slate-800">
               <Smartphone size={40} className="text-slate-300 dark:text-slate-700" />
            </div>
            <div className="space-y-4">
               <h1 className="text-4xl md:text-6xl font-black text-primary dark:text-white uppercase tracking-tighter">Comparison <span className="text-slate-300 dark:text-slate-700">Empty</span></h1>
               <p className="text-slate-400 dark:text-slate-500 max-w-sm mx-auto font-medium">Add products from the catalog to initialize side-by-side technical analysis.</p>
            </div>
            <Link to="/products" className="btn-primary inline-flex py-4! px-10! rounded-md!">LAUNCH CATALOG</Link>
         </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-40 min-h-screen bg-white dark:bg-slate-950 pb-24 border-t border-border dark:border-slate-900 transition-colors duration-500">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <p className="text-[11px] font-black text-accent uppercase tracking-[0.5em] mb-4">Technical Analysis Hub</p>
              <h1 className="text-4xl md:text-7xl font-black text-primary dark:text-white tracking-tighter uppercase leading-none">
                 Side-by-Side <span className="text-slate-200 dark:text-slate-800">Compare</span>
              </h1>
           </motion.div>
           <button onClick={clearCompare} className="text-[10px] font-black text-slate-400 hover:text-danger tracking-[0.2em] uppercase border-b border-dashed border-slate-200 dark:border-slate-800 pb-1 transition-all">TERMINATE ALL SESSIONS</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 bg-slate-50 dark:bg-slate-900/50 border border-border dark:border-slate-800 rounded-sm overflow-hidden">
           {compareItems.map((item, idx) => (
             <motion.div 
               key={item._id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className={`p-8 bg-white dark:bg-slate-900 relative group flex flex-col ${idx !== compareItems.length - 1 ? 'lg:border-r border-border dark:border-slate-800' : ''}`}
             >
                <button 
                  onClick={() => removeFromCompare(item._id)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-danger hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                   <X size={14} />
                </button>

                <div className="aspect-[3/4] bg-slate-50 dark:bg-slate-950 rounded-sm p-6 mb-10 overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-lighten group-hover:scale-110 transition-transform duration-700" />
                </div>

                <div className="space-y-2 mb-10 text-center md:text-left">
                   <h3 className="text-sm font-black text-primary dark:text-white uppercase line-clamp-2 tracking-tight h-10">{item.name}</h3>
                   <div className="text-2xl font-black text-primary dark:text-white tracking-tighter">₹{item.price.toLocaleString()}</div>
                </div>

                <div className="space-y-8 grow">
                   {/* Standard Attributes */}
                   <div className="space-y-4">
                      {specs.map((spec, sIdx) => (
                        <div key={sIdx} className="border-b border-slate-50 dark:border-slate-800/50 pb-3 flex flex-col gap-1">
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <spec.icon size={10} /> {spec.label}
                           </span>
                           <span className="text-xs font-black text-primary dark:text-slate-200 uppercase truncate">
                              {spec.format ? spec.format(item[spec.key]) : item[spec.key]}
                           </span>
                        </div>
                      ))}
                   </div>

                   {/* Tech Specs Block */}
                   <div className="space-y-4 pt-4 border-t-2 border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] font-black text-accent uppercase tracking-widest italic">Technical DNA</div>
                      {techSpecs.map((tech, tIdx) => (
                        <div key={tIdx} className="flex flex-col gap-1">
                           <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1.5">
                              <tech.icon size={10} className="text-slate-300 dark:text-slate-700" /> {tech.label}
                           </span>
                           <span className="text-[10px] font-black text-primary dark:text-slate-300 uppercase leading-tight">{tech.value}</span>
                        </div>
                      ))}
                   </div>
                </div>

                <button 
                  onClick={() => { addToCart(item, 1); alert(`${item.name} synchronized to acquisitions folder.`); }}
                  className="mt-12 w-full py-4 bg-primary dark:bg-white text-white dark:text-primary text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-accent dark:hover:bg-slate-200 transition-all rounded-sm"
                >
                   <ShoppingCart size={16} /> ADD TO ASSETS
                </button>
             </motion.div>
           ))}

           {/* Empty slots to fill up to 4 columns on LG screens */}
           {[...Array(Math.max(0, 4 - compareItems.length))].map((_, i) => (
              <div key={i} className="hidden lg:flex items-center justify-center p-8 bg-slate-50/30 dark:bg-slate-900/20 border-r border-border dark:border-slate-800 last:border-r-0">
                 <div className="flex flex-col items-center gap-4 text-slate-200 dark:text-slate-800/50">
                    <Plus size={30} strokeWidth={1} />
                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">Slot Available</span>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const CreditCard = ({ size, className }) => <Cpu size={size} className={className} />;
const Package = ({ size, className }) => <HardDrive size={size} className={className} />;
const Plus = ({ size, strokeWidth, className }) => <X size={size} strokeWidth={strokeWidth} className={`rotate-45 ${className}`} />;

export default Compare;
