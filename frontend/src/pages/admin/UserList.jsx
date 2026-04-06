import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Trash2, Check, X, Shield, User, Mail, Calendar, Hash, Activity, ShieldCheck, UserCheck } from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, [userInfo]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/users', {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this operator node?')) {
      try {
        const res = await fetch(`http://localhost:5001/api/users/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        if (!res.ok) throw new Error('Failed to delete user');
        fetchUsers();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-dark-bg space-y-6">
        <div className="w-16 h-16 rounded-2xl border-2 border-accent-blue/10 border-t-accent-blue animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-blue">Scanning Authorized Nodes...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-dark-bg selection:bg-accent-blue/30 overflow-x-hidden">
      <div className="container mx-auto px-6 pb-24">
        {/* Cinematic Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 space-y-4"
        >
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-blue opacity-70">Personnel Registry</div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
            Authorized <span className="text-glow text-accent-blue">Entities</span>
          </h1>
          <p className="text-gray-500 max-w-xl font-medium italic">Database of all authenticated operators within the store ecosystem.</p>
        </motion.div>

        {error ? (
          <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 text-red-500 text-center uppercase tracking-widest text-xs font-black">
            Registry Sync Failure: {error}
          </div>
        ) : (
          <div className="rounded-[3rem] bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.03]">
                    <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Node ID</th>
                    <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Identity</th>
                    <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">Virtual Bridge (Email)</th>
                    <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 text-center">Auth Level</th>
                    <th className="p-8 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 text-right font-sans">Active Protocols</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {users.map((user, i) => (
                      <motion.tr 
                        key={user._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-white/[0.04] transition-all group"
                      >
                        <td className="p-8">
                           <div className="flex items-center gap-3">
                              <Hash size={12} className="text-gray-600" />
                              <span className="text-xs font-mono font-black text-gray-500 uppercase group-hover:text-glow group-hover:text-accent-blue transition-all">
                                {user._id.substring(user._id.length - 8)}
                              </span>
                           </div>
                        </td>
                        <td className="p-8">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xs font-black border transition-all duration-500 ${user.isAdmin ? 'bg-accent-blue/20 border-accent-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]' : 'bg-white/5 border-white/10 group-hover:bg-white/10'}`}>
                              {user.name.charAt(0)}
                            </div>
                            <div>
                               <div className="text-sm font-black text-white uppercase italic tracking-tighter">{user.name}</div>
                               <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-0.5">Status: Authorized</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-8">
                           <div className="flex items-center gap-3">
                              <Mail size={14} className="text-gray-600" />
                              <a href={`mailto:${user.email}`} className="text-xs font-black text-gray-400 hover:text-accent-blue transition-colors uppercase tracking-widest italic">{user.email}</a>
                           </div>
                        </td>
                        <td className="p-8">
                           <div className="flex justify-center">
                             {user.isAdmin ? (
                               <div className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-accent-blue/10 text-accent-blue border border-accent-blue/20 text-[9px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.15)] group-hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] transition-all">
                                 <ShieldCheck size={14} strokeWidth={3} /> System Admin
                               </div>
                             ) : (
                               <div className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/5 text-gray-500 border border-white/5 text-[9px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all">
                                 <User size={14} strokeWidth={3} /> Standard Node
                               </div>
                             )}
                           </div>
                        </td>
                        <td className="p-8 text-right">
                          <div className="flex items-center justify-end gap-4 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                             {!user.isAdmin && (
                                <button
                                  onClick={() => deleteHandler(user._id)}
                                  className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all shadow-inner"
                                >
                                  <Trash2 size={18} />
                                </button>
                             )}
                             <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-gray-500 group-hover:text-accent-blue transition-all">
                                <Activity size={18} />
                             </div>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Intelligence Module Footer */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <Shield size={20} className="text-gray-500" />
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">Operator Registry encrypted with RSA-4096. Access logged at Timestamp: {new Date().toISOString()}</p>
           </div>
           <div className="text-[8px] font-black uppercase tracking-[0.5em] text-gray-700">RDX-AUTH-SERVICES // V1.2.0</div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
