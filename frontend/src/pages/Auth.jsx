import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github, Twitter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = ({ isLogin = true }) => {
  const [isSignIn, setIsSignIn] = useState(isLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden px-6">
      {/* Background elements */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-accent-blue/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-accent-blue/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full max-w-md p-8 md:p-10 relative z-10 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:-z-10 before:rounded-2xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-glass-border mb-6">
            <Lock size={28} className="text-accent-blue" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignIn ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-400 text-sm">
            {isSignIn 
              ? "Enter your details to access your premium account." 
              : "Sign up to start your immersive tech journey."}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <AnimatePresence mode="popLayout">
            {!isSignIn && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-500" />
                </div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-dark-bg/50 border border-glass-border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all font-mono text-sm"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-500" />
            </div>
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-bg/50 border border-glass-border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all font-mono text-sm"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input 
              type="password" 
              placeholder="Password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-bg/50 border border-glass-border rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue focus:shadow-[0_0_10px_rgba(138,43,226,0.2)] transition-all font-mono text-sm"
            />
          </div>

          {isSignIn && (
            <div className="flex justify-end">
              <a href="#" className="text-xs text-accent-blue hover:underline">Forgot password?</a>
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full btn-primary py-3 rounded-xl mt-4 flex justify-center items-center group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : (isSignIn ? "Sign In" : "Sign Up")}
            {!loading && <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 flex items-center">
          <div className="flex-grow h-px bg-glass-border"></div>
          <span className="px-4 text-xs text-gray-500 uppercase">Or continue with</span>
          <div className="flex-grow h-px bg-glass-border"></div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center p-3 rounded-xl bg-white/5 border border-glass-border hover:bg-white/10 transition-colors">
            <Github size={20} className="mr-2" /> GitHub
          </button>
          <button className="flex items-center justify-center p-3 rounded-xl bg-white/5 border border-glass-border hover:bg-white/10 transition-colors text-[#1DA1F2]">
            <Twitter size={20} className="mr-2" /> Twitter
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button onClick={toggleMode} className="text-white hover:text-accent-blue font-bold transition-colors">
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
