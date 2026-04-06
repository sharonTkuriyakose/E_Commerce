import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const ProductCard3D = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  // Keeping subtle 3D but standard retail look
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const discountedPrice = product.price * 0.8; // Example discount calculation for UI

  return (
    <Link to={`/product/${product._id || product.id}`} className="block h-full group relative overflow-visible perspective-1000">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="product-card-ui h-full flex flex-col p-0 relative shadow-3d-hover transition-all duration-300"
      >
        {/* Product Image - Light Gray background for contrast */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-50">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Wishlist Button - Top Right */}
          <button 
            className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 shadow-sm border border-border flex items-center justify-center transition-all scale-100 group-hover:scale-100 duration-200 z-20 ${isInWishlist(product._id) ? 'text-accent' : 'text-primary'}`}
            onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                toggleWishlist(product); 
            }}
          >
            <Heart 
                size={16} 
                strokeWidth={2.5} 
                className={`${isInWishlist(product._id) ? 'fill-accent text-accent' : 'hover:text-accent'}`} 
            />
          </button>

          {/* Rating Badge */}
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-sm bg-white/90 shadow-sm text-primary font-bold text-[10px] border border-border">
            <span>{product.rating}</span>
            <Star size={10} className="fill-success text-success" />
            <span className="text-text-muted border-l border-border pl-1.5">{product.numReviews || 12} reviews</span>
          </div>

          {/* ADD TO BAG - Myntra style action */}
          <div className="absolute bottom-4 right-4 left-4 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button 
                 onClick={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     addToCart(product);
                     navigate('/cart');
                 }}
                 className="w-full bg-white border border-border py-2.5 rounded-sm shadow-xl flex items-center justify-center gap-3 text-[11px] font-black uppercase text-primary hover:bg-slate-50"
             >
                 ORDER NOW
              </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 pt-5 space-y-1.5">
          <h3 className="text-sm font-bold text-primary tracking-tight leading-tight group-hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-text-muted line-clamp-1">Premium Series · {product.category || 'Gear'}</p>
          
          <div className="flex items-center gap-2 pt-1">
            <span className="text-sm font-bold text-primary">₹{Math.floor(discountedPrice).toLocaleString()}</span>
            <span className="text-[11px] text-text-muted line-through">₹{product.price.toLocaleString()}</span>
            <span className="text-[11px] text-warning font-bold">(20% OFF)</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard3D;
