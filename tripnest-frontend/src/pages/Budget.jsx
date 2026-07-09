import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wallet, PiggyBank, ArrowDownRight, ArrowUpRight, TrendingUp, AlertTriangle, ChevronLeft, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useBudget from '../hooks/useBudget';
import tripService from '../services/tripService';

const Budget = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialTripId = location.state?.tripId || '';

  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(initialTripId);
  const [selectedTrip, setSelectedTrip] = useState(null);
  
  const { budget, loading, updateBudget } = useBudget(selectedTripId);
  
  const [isEditing, setIsEditing] = useState(false);
  const [newAllocation, setNewAllocation] = useState('');

  useEffect(() => {
    const fetchTripsList = async () => {
      try {
        const data = await tripService.getTrips();
        setTrips(data);
        if (data.length > 0 && !selectedTripId) {
          setSelectedTripId(data[0].id);
        }
      } catch (err) {
        console.error('Failed to load trips list', err);
      }
    };
    fetchTripsList();
  }, [selectedTripId]);

  useEffect(() => {
    const fetchTripInfo = async () => {
      if (!selectedTripId) return;
      try {
        const data = await tripService.getTripById(selectedTripId);
        setSelectedTrip(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTripInfo();
  }, [selectedTripId]);

  const handleTripChange = (e) => {
    setSelectedTripId(e.target.value);
  };

  const handleUpdateAllocation = async (e) => {
    e.preventDefault();
    const parsed = parseFloat(newAllocation);
    if (isNaN(parsed) || parsed < 0) {
      return;
    }
    await updateBudget(parsed);
    setIsEditing(false);
  };

  const categories = budget?.byCategory ? Object.entries(budget.byCategory).map(([name, spent]) => {
    // Map backend categories to colors
    let color = 'bg-accent';
    if (name.toLowerCase().includes('lodging') || name.toLowerCase().includes('hotel')) color = 'bg-indigo-500';
    if (name.toLowerCase().includes('flight') || name.toLowerCase().includes('transit')) color = 'bg-glow';
    if (name.toLowerCase().includes('food') || name.toLowerCase().includes('dining')) color = 'bg-emerald-500';
    if (name.toLowerCase().includes('shopping') || name.toLowerCase().includes('leisure')) color = 'bg-amber-500';

    return {
      name,
      spent,
      color
    };
  }) : [];

  const spent = budget?.spent || 0;
  const allocated = budget?.allocated || 0;
  const remaining = budget?.remaining || 0;
  const pctUsed = budget?.pctUsed || 0;

  // Warning thresholds
  let warningColor = 'border-emerald-500';
  let warningText = 'Your expenditure is currently within safe limits.';
  if (pctUsed > 80 && pctUsed <= 100) {
    warningColor = 'border-amber-500';
    warningText = `Budget Warning: You have consumed ${pctUsed}% of the allocated trip funds. Minimize leisure and dining costs.`;
  } else if (pctUsed > 100) {
    warningColor = 'border-danger';
    warningText = `Budget Alert: Overdraft of ${pctUsed}%! You have exceeded the trip allocation limit by $${Math.abs(remaining).toLocaleString()}.`;
  }

  return (
    <div className="space-y-6 animate-scale-in">
      
      {/* Back button and Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <button 
          onClick={() => navigate('/dashboard/trips')}
          className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-light transition-colors self-start"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Trips</span>
        </button>

        {trips.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted">Select Trip:</span>
            <select
              value={selectedTripId}
              onChange={handleTripChange}
              className="px-3 py-1.5 rounded-lg bg-surface/80 border border-white/10 text-light text-sm focus:outline-none focus:border-accent"
            >
              {trips.map(t => (
                <option key={t.id} value={t.id}>{t.destination}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-light font-display">
          {selectedTrip ? `${selectedTrip.destination} Budget` : 'Trip Budget'}
        </h2>
        <p className="text-sm text-muted">
          Track travel funding allocations and prevent spending overruns.
        </p>
      </div>

      {trips.length === 0 ? (
        <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 p-12 text-center max-w-md mx-auto space-y-4">
          <Wallet className="w-12 h-12 text-muted mx-auto" />
          <h3 className="font-bold text-light font-display text-lg">No Active Trips</h3>
          <p className="text-sm text-muted">Plan a trip to view budget tracking charts.</p>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-accent/10 rounded-xl text-accent shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                  <PiggyBank className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-muted font-bold uppercase tracking-wider">Total Allocation</span>
                  <h3 className="text-2xl font-extrabold text-light font-mono">${allocated.toLocaleString()}</h3>
                </div>
              </div>
              <button 
                onClick={() => {
                  setNewAllocation(allocated);
                  setIsEditing(true);
                }}
                className="p-2 bg-hover/50 hover:bg-hover hover:text-accent rounded-lg transition-colors border border-white/5"
                title="Edit Allocation"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6 flex items-center gap-4"
            >
              <div className={`p-3.5 ${pctUsed > 100 ? 'bg-danger/10 text-danger' : 'bg-accent/10 text-accent'} rounded-xl`}>
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-muted font-bold uppercase tracking-wider">Amount Spent</span>
                <h3 className="text-2xl font-extrabold text-light font-mono">${spent.toLocaleString()}</h3>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6 flex items-center gap-4"
            >
              <div className={`p-3.5 ${remaining < 0 ? 'bg-danger/10 text-danger' : 'bg-emerald-500/10 text-emerald-400'} rounded-xl`}>
                <ArrowDownRight className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-muted font-bold uppercase tracking-wider">Funds Remaining</span>
                <h3 className="text-2xl font-extrabold text-light font-mono">${remaining.toLocaleString()}</h3>
              </div>
            </motion.div>
          </section>

          {/* Details breakdown and progress limits */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Progress chart representation */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6">
                <h3 className="font-bold text-base mb-6 flex items-center gap-2 border-b border-white/5 pb-3 font-display text-light">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span>Expenditure by Category</span>
                </h3>

                {categories.length > 0 ? (
                  <div className="space-y-6">
                    {categories.map((cat, idx) => {
                      const pct = allocated > 0 ? ((cat.spent / allocated) * 100).toFixed(0) : 0;
                      return (
                        <div key={cat.name} className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-light">{cat.name}</span>
                            <span className="text-muted font-mono">
                              ${cat.spent.toLocaleString()} / ${allocated.toLocaleString()} ({pct}%)
                            </span>
                          </div>
                          <div className="w-full h-3 bg-void/50 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min(pct, 100)}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.1 }}
                              className={`h-full rounded-full ${cat.color} shadow-glow`} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted text-sm">No expenses logged for this trip yet.</div>
                )}
              </div>
            </div>

            {/* Advisory Tips Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className={`rounded-2xl bg-surface/80 backdrop-blur-lg border-l-4 ${warningColor} border border-white/5 shadow-glass p-6`}>
                <div className="flex gap-3">
                  <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-bold text-sm text-light font-display">Budget Advisory</h4>
                    <p className="text-xs text-muted leading-relaxed">
                      {warningText} Track your ledger transactions to maintain weightless stability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

      {/* Edit Budget Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-void/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-surface/90 border border-white/10 p-6 rounded-2xl shadow-glass-lg z-10"
            >
              <h3 className="font-bold text-lg text-light mb-4 font-display">Edit Trip Allocation</h3>
              
              <form onSubmit={handleUpdateAllocation} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-light" htmlFor="newAllocation">Allocated Budget ($)</label>
                  <input 
                    type="number" 
                    id="newAllocation"
                    value={newAllocation}
                    onChange={(e) => setNewAllocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                <div className="flex gap-4 justify-end pt-2">
                  <button type="button" onClick={() => setIsEditing(false)} className="btn-glow-secondary">Cancel</button>
                  <button type="submit" className="btn-glow-primary">Save Changes</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Budget;
