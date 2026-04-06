import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, User, Trash2, Edit, Check, X, Search, Activity, Users, Zap, ShieldAlert } from 'lucide-react';

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
      if (!res.ok) throw new Error('Failed to fetch personnel data');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Terminate this user account?')) {
      try {
        const res = await fetch(`http://localhost:5001/api/users/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        if (!res.ok) throw new Error('Failed to deactivate personnel');
        fetchUsers();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-white space-y-6">
        <div className="w-16 h-16 rounded-full border-4 border-border border-t-accent animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Querying Personnel HUB...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-white border-t border-border">
      <div className="container mx-auto px-6 pb-24 max-w-7xl">
        {/* Professional Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <p className="text-[11px] font-black text-accent uppercase tracking-[0.5em] mb-4">Tactical Permissions HUB</p>
             <h1 className="text-4xl md:text-7xl font-black text-primary tracking-tighter uppercase leading-none">
                Personnel <span className="text-slate-300">Matrix</span>
             </h1>
          </motion.div>
          <div className="bg-slate-50 border border-border px-6 py-3 rounded-md flex items-center gap-3">
             <Users size={18} className="text-accent" />
             <span className="text-[11px] font-black text-primary uppercase tracking-widest">{users.length} REGISTERED OPERATORS</span>
          </div>
        </div>

        {error ? (
          <div className="p-10 rounded-sm bg-red-50 text-red-500 text-center uppercase tracking-widest text-xs font-black border border-red-100">
            PERSONNEL SYNC FAILURE: {error}
          </div>
        ) : (
          <div className="bg-white border border-border rounded-sm overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-border">
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">ID Hash</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Operator Profile</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">Clearance Protocol</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-right">Acquisitions</th>
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr 
                      key={user._id}
                      className="hover:bg-slate-50/50 transition-all group"
                    >
                      <td className="p-8">
                         <span className="text-[11px] font-black text-primary italic transition-all">#{user._id.slice(-8).toUpperCase()}</span>
                      </td>
                      <td className="p-8">
                         <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-full border border-border flex items-center justify-center text-sm font-black transition-all ${user.isAdmin ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-slate-50 text-text-muted'}`}>
                               {user.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                               <span className="text-sm font-black text-primary uppercase">{user.name}</span>
                               <span className="text-[10px] font-bold text-text-muted">{user.email}</span>
                            </div>
                         </div>
                      </td>
                      <td className="p-8">
                         {user.isAdmin ? (
                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-sm bg-accent text-white text-[9px] font-black uppercase tracking-widest shadow-md shadow-accent/20">
                               <ShieldCheck size={14} /> MASTER ADMIN
                            </div>
                         ) : (
                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-sm bg-slate-100 text-text-muted border border-border text-[9px] font-black uppercase tracking-widest">
                               <User size={14} /> STANDARD OPERATOR
                            </div>
                         )}
                      </td>
                      <td className="p-8 text-right">
                         <span className="text-sm font-black text-primary tracking-tighter uppercase">Verified Unit</span>
                      </td>
                      <td className="p-8 text-right">
                        <div className="flex items-center justify-end gap-3 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                            {!user.isAdmin && (
                              <button
                                onClick={() => deleteHandler(user._id)}
                                className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-border text-text-muted hover:border-danger hover:text-danger transition-all shadow-sm"
                              >
                                 <Trash2 size={18} />
                              </button>
                            )}
                            <button className="w-10 h-10 bg-white border border-border rounded-md flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-all shadow-sm">
                               <Edit size={16} />
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
