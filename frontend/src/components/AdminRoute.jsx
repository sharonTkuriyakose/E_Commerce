import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminRoute = ({ children }) => {
  const { userInfo, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg space-y-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-[2.5rem] border-2 border-white/5 border-t-accent-blue animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <ShieldCheck className="w-8 h-8 text-accent-blue animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-blue">Verifying Admin Privileges</p>
           <div className="flex justify-center gap-1">
              {[0, 1, 2].map(i => (
                 <motion.div 
                   key={i}
                   animate={{ opacity: [0.3, 1, 0.3] }}
                   transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                   className="w-1 h-1 rounded-full bg-accent-blue"
                 />
              ))}
           </div>
        </div>
      </div>
    );
  }

  if (userInfo && userInfo.isAdmin) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default AdminRoute;
