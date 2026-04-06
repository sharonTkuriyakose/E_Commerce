import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Eye, EyeOff, ShieldCheck, Zap, ChevronLeft, Star } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = ({ isLogin = true }) => {
  const [isSignIn, setIsSignIn] = useState(isLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let res;
    if (isSignIn) {
      res = await login(email, password);
    } else {
      res = await register(name, email, password);
    }

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  const toggleMode = () => setIsSignIn(!isSignIn);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 bg-slate-50" id="auth-page">
      {/* Background patterns - subtle retail circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
         <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] border-[60px] border-accent rounded-full"></div>
         <div className="absolute bottom-[-5%] left-[-5%] w-[300px] h-[300px] border-[40px] border-primary rounded-full"></div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 items-center relative z-10 bg-white shadow-2xl rounded-sm overflow-hidden border border-border">
        {/* Left: Branding & Visuals (Clean White Side) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex flex-col h-full lg:col-span-6 bg-slate-50 p-12 space-y-12 border-r border-border relative overflow-hidden"
        >
          <div className="absolute inset-0 z-0 opacity-10">
             <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover grayscale" alt="Tech" />
          </div>

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 group mb-12">
               <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center font-black text-white text-lg uppercase tracking-tighter shadow-sm" style={{ fontFamily: 'Inter' }}>R</div>
               <span className="text-xl font-black tracking-tighter text-primary uppercase" style={{ fontFamily: 'Inter' }}>TECH<span className="text-accent underline decoration-2 underline-offset-4 uppercase ml-2">STORE</span></span>
            </Link>

            <div className="space-y-6 pt-10">
               <h2 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-tighter leading-tight" style={{ fontFamily: 'Inter' }}>
                 Your Gateway To <br/> 
                 <span className="text-accent italic underline decoration-4 underline-offset-8 decoration-accent/20">The Flagship.</span>
               </h2>
               <p className="text-sm text-text-secondary font-medium leading-relaxed max-w-sm">
                 Join the most exclusive tech community. Gain access to limited drops, expert reviews, and 24/7 technical assistance.
               </p>
            </div>

            <div className="pt-20 space-y-4">
               {[
                 { icon: ShieldCheck, text: "100% Genuine Electronics Guaranteed" },
                 { icon: Zap, text: "Early Access To New Tech Launches" },
                 { icon: Star, text: "Priority Support For Members" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-accent shadow-sm">
                       <item.icon size={16} strokeWidth={3} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-primary">{item.text}</span>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Auth Form (Pure White) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full lg:col-span-6 p-8 md:p-12"
        >
           <div className="mb-10 text-center lg:text-left">
              <h1 className="text-3xl font-black text-primary tracking-tighter uppercase mb-2 leading-none" style={{ fontFamily: 'Inter' }}>
                {isSignIn ? "Login / Signup" : "Create Account"}
              </h1>
              <p className="text-xs font-black text-text-muted uppercase tracking-[0.2em]">
                {isSignIn ? "Access your premium tech dashboard" : "Join the flagship lifestyle today"}
              </p>
           </div>

           {error && (
             <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               className="mb-8 p-4 bg-danger/10 border border-danger/20 rounded-md text-danger text-[11px] font-black uppercase tracking-widest text-center"
             >
               {error}
             </motion.div>
           )}

           <form className="space-y-6" onSubmit={handleSubmit}>
              <AnimatePresence mode="popLayout">
                {!isSignIn && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <div className="relative">
                      <input 
                        type="text" required placeholder="Full Name" 
                        value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-0 border-b-2 border-border/80 px-0 py-3 text-sm font-bold focus:outline-none focus:border-accent transition-all placeholder:text-text-muted placeholder:font-black placeholder:uppercase placeholder:tracking-widest"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <input 
                  type="email" required placeholder="Email Address" 
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-border/80 px-0 py-3 text-sm font-bold focus:outline-none focus:border-accent transition-all placeholder:text-text-muted placeholder:font-black placeholder:uppercase placeholder:tracking-widest"
                />
              </div>

              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} required placeholder="Password" 
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-border/80 px-0 py-3 text-sm font-bold focus:outline-none focus:border-accent transition-all placeholder:text-text-muted placeholder:font-black placeholder:uppercase placeholder:tracking-widest"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors pr-2">
                   {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {isSignIn && (
                 <div className="text-right">
                    <button type="button" className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline">Forgot Password?</button>
                 </div>
              )}

              <button 
                disabled={loading}
                className="w-full btn-primary !rounded-sm !py-4 mt-6 group disabled:opacity-50 !text-xs !tracking-[0.2em] shadow-xl shadow-accent/20"
                id="auth-submit"
              >
                {loading ? "AUTHENTICATING..." : (isSignIn ? "CONTINUE TO STORE" : "CREATE MY ACCOUNT")}
              </button>
           </form>

           <div className="mt-12 text-center space-y-4">
              <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.2em]">
                {isSignIn ? "Don't have an account?" : "Already a member?"}
                <button onClick={toggleMode} className="ml-3 text-accent hover:underline decoration-2 underline-offset-4 transition-all">
                   {isSignIn ? "CREATE FREE ACCOUNT" : "LOGIN TO DASHBOARD"}
                </button>
              </p>
              
              <div className="h-px w-20 bg-border mx-auto"></div>
              
              <p className="text-[9px] text-text-muted font-bold leading-relaxed max-w-xs mx-auto">
                By continuing, you agree to TECH STORE's <span className="text-primary hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Notice</span>.
              </p>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
