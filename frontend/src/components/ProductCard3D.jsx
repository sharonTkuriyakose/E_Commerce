import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard3D = ({ product }) => {
  const cardRef = useRef(null);
  
  // Motion values for capturing mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt effect
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Map mouse position to rotation values (tilt effect)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Handle mouse move over card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Generate fake rating array
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star 
        key={idx} 
        size={14} 
        className={idx < Math.floor(rating) ? "text-accent-blue fill-accent-blue" : "text-gray-600"} 
      />
    ));
  };

  return (
    <Link to={`/product/${product._id || product.id}`} className="block perspective-1000 z-10 w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.2 }}
        className="relative group h-full glass-panel border border-glass-border/40 p-5 flex flex-col hover:border-accent-blue/50 transition-colors duration-300 before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-accent-blue/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:rounded-2xl"
      >
        {/* Wishlist Icon */}
        <button 
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-dark-bg/60 border border-glass-border flex items-center justify-center text-gray-400 hover:text-accent-blue hover:border-accent-blue/50 transition-all backdrop-blur-md"
          onClick={(e) => {
            e.preventDefault();
            // Wishlist logic
          }}
        >
          <Heart size={16} />
        </button>

        {/* Product Image with pop-out depth */}
        <div 
          className="relative w-full h-48 mb-6 flex items-center justify-center translate-z-10"
          style={{ transform: "translateZ(30px)" }}
        >
          {/* subtle glow behind image */}
          <div className="absolute inset-0 bg-accent-blue/10 blur-xl rounded-full scale-75 group-hover:bg-accent-blue/20 transition-colors duration-500"></div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="relative z-10 max-h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="flex-grow flex flex-col" style={{ transform: "translateZ(20px)" }}>
          <div className="text-xs font-medium text-accent-blue mb-1 truncate">{product.category.toUpperCase()}</div>
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-accent-blue transition-colors">{product.name}</h3>
          
          <div className="flex items-center space-x-1 mb-4">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-400 ml-2">({(Math.random() * 200 + 50).toFixed(0)})</span>
          </div>

          <div className="mt-auto flex items-end justify-between">
            <div className="text-2xl font-black text-white">
              <span className="text-sm align-top text-gray-400 mr-1">₹</span>
              {product.price.toLocaleString()}
            </div>
            
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-glass-border text-white hover:bg-accent-blue hover:border-accent-blue hover:text-dark-bg transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              onClick={(e) => {
                e.preventDefault();
                // Add to cart
              }}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard3D;
