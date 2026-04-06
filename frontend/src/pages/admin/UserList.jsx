import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, User, Trash2, Edit, Check, X, Search, Activity, Users, Zap, ShieldAlert } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useAuth();
  const { darkMode } = useTheme();

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
      <div className={`min-h-screen pt-32 flex flex-col items-center justify-center space-y-6 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white'}`}>
        <div className="w-16 h-16 rounded-full border-4 border-border border-t-accent animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Querying Personnel HUB...</p>
      </div>
    );
  }

  return (
    <div className={`pt-32 min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-primary border-t border-border'}`}>
      <div className="container mx-auto px-6 pb-24 max-w-7xl">
        {/* Professional Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
             <p className="text-[11px] font-black text-accent uppercase tracking-[0.5em] mb-4">Tactical Permissions HUB</p>
             <h1 className={`text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none ${darkMode ? 'text-white' : 'text-primary'}`}>
                Personnel <span className="text-slate-300">Matrix</span>
             </h1>
          </motion.div>
          <div className={`border border-border px-6 py-3 rounded-md flex items-center gap-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50'}`}>
             <Users size={18} className="text-accent" />
             <span className={`text-[11px] font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-primary'}`}>{users.length} REGISTERED OPERATORS</span>
          </div>
        </div>

        {error ? (
          <div className="p-10 rounded-sm bg-red-50 text-red-500 text-center uppercase tracking-widest text-xs font-black border border-red-100">
            PERSONNEL SYNC FAILURE: {error}
          </div>
        ) : (
          <div className={`border border-border rounded-sm overflow-hidden shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white text-primary'}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b border-border ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <th className={`p-8 text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${darkMode ? 'text-slate-400' : 'text-text-muted'}`}>ID Hash</th>
                    <th className={`p-8 text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${darkMode ? 'text-slate-400' : 'text-text-muted'}`}>Operator Profile</th>
                    <th className={`p-8 text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${darkMode ? 'text-slate-400' : 'text-text-muted'}`}>Clearance Protocol</th>
                    <th className={`p-8 text-[10px] font-black uppercase tracking-[0.3em] transition-colors text-right ${darkMode ? 'text-slate-400' : 'text-text-muted'}`}>Acquisitions</th>
                    <th className={`p-8 text-[10px] font-black uppercase tracking-[0.3em] transition-colors text-right ${darkMode ? 'text-slate-400' : 'text-text-muted'}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr 
                      key={user._id}
                      className={`transition-all group ${darkMode ? 'hover:bg-slate-800 text-white' : 'hover:bg-slate-50/50 text-primary'}`}
                    >
                      <td className="p-8">
                         <span className={`text-[11px] font-black italic transition-all ${darkMode ? 'text-white' : 'text-primary'}`}>#{user._id.slice(-8).toUpperCase()}</span>
                      </td>
                      <td className="p-8">
                         <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-full border flex items-center justify-center text-sm font-black transition-all ${user.isAdmin ? 'bg-accent/10 border-accent/30 text-accent' : `${darkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-50 border-border text-text-muted'}`}`}>
                               {user.name.charAt(0)}
                            </div>
                             <div className="flex flex-col">
                                <span className={`text-sm font-black uppercase transition-colors ${darkMode ? 'text-white' : 'text-primary'}`}>{user.name}</span>
                                <span className={`text-[10px] font-bold transition-colors ${darkMode ? 'text-slate-500' : 'text-text-muted'}`}>{user.email}</span>
                             </div>
                         </div>
                      </td>
                      <td className="p-8">
                         {user.isAdmin ? (
                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-sm bg-accent text-white text-[9px] font-black uppercase tracking-widest shadow-md shadow-accent/20">
                               <ShieldCheck size={14} /> MASTER ADMIN
                            </div>
                         ) : (
                            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-sm border text-[9px] font-black uppercase tracking-widest ${darkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-text-muted border-border'}`}>
                               <User size={14} /> STANDARD OPERATOR
                            </div>
                         )}
                      </td>
                      <td className="p-8 text-right">
                         <span className={`text-sm font-black tracking-tighter uppercase ${darkMode ? 'text-white' : 'text-primary'}`}>Verified Unit</span>
                      </td>
                      <td className="p-8 text-right">
                        <div className="flex items-center justify-end gap-3 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                            {!user.isAdmin && (
                              <button
                                onClick={() => deleteHandler(user._id)}
                                className={`w-10 h-10 flex items-center justify-center rounded-md border font-bold transition-all shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:border-danger hover:text-white' : 'bg-white border-border text-text-muted hover:border-danger hover:text-danger'}`}
                              >
                                 <Trash2 size={18} />
                              </button>
                            )}
                            <button className={`w-10 h-10 border border-border rounded-md flex items-center justify-center transition-all shadow-sm ${darkMode ? 'bg-slate-800 text-slate-400 hover:border-white hover:text-white' : 'bg-white text-text-muted hover:border-primary hover:text-primary'}`}>
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
