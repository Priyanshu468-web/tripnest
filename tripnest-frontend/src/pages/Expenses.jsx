import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, DollarSign, Plus, Trash2, Calendar, Tag, AlertCircle, ChevronLeft, ArrowRight, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import useExpenses from '../hooks/useExpenses';
import tripService from '../services/tripService';

const Expenses = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialTripId = location.state?.tripId || '';

  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(initialTripId);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const { expenses, settlements, loading, addExpense, deleteExpense } = useExpenses(selectedTripId);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newExp, setNewExp] = useState({
    description: '',
    category: 'Food & Dining',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    splitUserIds: [] // list of user IDs included in split
  });

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
    const fetchTripDetails = async () => {
      if (!selectedTripId) return;
      try {
        const data = await tripService.getTripById(selectedTripId);
        setSelectedTrip(data);
        
        // Default split selection to all members of the trip
        if (data && data.members) {
          setNewExp(prev => ({
            ...prev,
            splitUserIds: data.members.map(m => m.user.id)
          }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchTripDetails();
  }, [selectedTripId]);

  const handleTripChange = (e) => {
    setSelectedTripId(e.target.value);
  };

  const handleCheckboxChange = (userId) => {
    setNewExp(prev => {
      const alreadySelected = prev.splitUserIds.includes(userId);
      let updated = [];
      if (alreadySelected) {
        updated = prev.splitUserIds.filter(id => id !== userId);
      } else {
        updated = [...prev.splitUserIds, userId];
      }
      return {
        ...prev,
        splitUserIds: updated
      };
    });
  };

  const handleAddExpenseSubmit = async (e) => {
    e.preventDefault();
    if (!newExp.description.trim()) {
      toast.error('Description is required.');
      return;
    }
    const val = parseFloat(newExp.amount);
    if (isNaN(val) || val <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }
    if (newExp.splitUserIds.length === 0) {
      toast.error('At least one member must be selected for the split.');
      return;
    }

    try {
      await addExpense({
        amount: val,
        category: newExp.category,
        description: newExp.description,
        date: newExp.date,
        splitUserIds: newExp.splitUserIds
      });
      setShowAddForm(false);
      setNewExp(prev => ({
        ...prev,
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await deleteExpense(id);
    }
  };

  const totalSpent = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-light font-display">
            {selectedTrip ? `${selectedTrip.destination} Expenses` : 'Trip Expenses'}
          </h2>
          <p className="text-sm text-muted">
            Track daily costs and keep travel spending inside safety limits.
          </p>
        </div>
        {selectedTripId && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-glow-primary flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Log Expense</span>
          </button>
        )}
      </div>

      {trips.length === 0 ? (
        <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 p-12 text-center max-w-md mx-auto space-y-4">
          <AlertCircle className="w-12 h-12 text-muted mx-auto" />
          <h3 className="font-bold text-light font-display text-lg">No Active Trips</h3>
          <p className="text-sm text-muted">Plan a trip before tracking expense ledgers.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List of Expenses */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6 flex items-center gap-4 max-w-sm border-l-4 border-emerald-500">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-muted font-bold uppercase tracking-wider">Total logged expenses</span>
                <h3 className="text-2xl font-extrabold text-light font-mono">${totalSpent.toLocaleString()}</h3>
              </div>
            </div>

            {/* Table log list */}
            <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-void/50 border-b border-white/5 text-muted font-bold uppercase tracking-wider text-[10px]">
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Paid By</th>
                      <th className="px-6 py-4 text-right">Amount</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading && expenses.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-muted animate-pulse">Syncing expense records...</td>
                      </tr>
                    ) : expenses.length > 0 ? (
                      expenses.map((item) => (
                        <tr 
                          key={item.id}
                          className="hover:bg-hover/30 text-light transition-colors"
                        >
                          <td className="px-6 py-4 font-semibold text-muted whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-muted" />
                              <span>{new Date(item.date).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-bold text-light">
                            <div>{item.description}</div>
                            {item.splits && (
                              <div className="text-[10px] text-muted font-normal mt-0.5">
                                Split: {item.splits.map(s => s.userName).join(', ')}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              <Tag className="w-3.5 h-3.5 text-accent" />
                              <span>{item.category}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-muted font-semibold">{item.paidBy?.name}</td>
                          <td className="px-6 py-4 text-right font-bold font-mono text-accent">${item.amount}</td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-danger/5 transition-all"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-muted">No expenses logged. Tap "Log Expense" to log your first split transaction!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Debts Settlement Widget */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6">
              <h3 className="font-bold text-base mb-4 flex items-center gap-2 border-b border-white/5 pb-3 font-display text-light">
                <UserCheck className="w-5 h-5 text-accent" />
                <span>Balances Settlement</span>
              </h3>

              {settlements.length > 0 ? (
                <div className="space-y-4">
                  {settlements.map((settle, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-void/50 rounded-xl border border-white/5 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="font-semibold text-light truncate" title={settle.from.name}>{settle.from.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-danger flex-shrink-0" />
                        <span className="font-semibold text-light truncate" title={settle.to.name}>{settle.to.name}</span>
                      </div>
                      <span className="font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg flex-shrink-0">
                        ${settle.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted text-xs">
                  All debts settled! No transfers needed. 🙌
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Log expense Dialog Form overlay */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-void/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(false)}
              className="absolute inset-0"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-surface/90 border border-white/10 p-6 rounded-2xl shadow-glass-lg z-10"
            >
              <h3 className="font-bold text-lg text-light mb-4 font-display">Log Trip Expense</h3>
              
              <form onSubmit={handleAddExpenseSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-light" htmlFor="description">Expense Description</label>
                  <input 
                    type="text" 
                    id="description"
                    placeholder="Train Ticket, Lunch bill, Souvenir, etc."
                    value={newExp.description}
                    onChange={(e) => setNewExp({...newExp, description: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-light" htmlFor="amount">Cost ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                      <input 
                        type="number" 
                        id="amount"
                        placeholder="80"
                        value={newExp.amount}
                        onChange={(e) => setNewExp({...newExp, amount: e.target.value})}
                        className="w-full pl-8 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-light" htmlFor="category">Category</label>
                    <select 
                      id="category"
                      value={newExp.category}
                      onChange={(e) => setNewExp({...newExp, category: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                    >
                      <option value="Flights & Transit">Flights & Transit</option>
                      <option value="Lodging & Hotels">Lodging & Hotels</option>
                      <option value="Food & Dining">Food & Dining</option>
                      <option value="Shopping & Leisure">Shopping & Leisure</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-light" htmlFor="date">Transaction Date</label>
                  <input 
                    type="date" 
                    id="date"
                    value={newExp.date}
                    onChange={(e) => setNewExp({...newExp, date: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                {/* Split list check list */}
                {selectedTrip && selectedTrip.members && (
                  <div className="space-y-2 border-t border-white/5 pt-3">
                    <label className="text-xs font-semibold text-light block mb-1">Split Expenses Among:</label>
                    <div className="max-h-32 overflow-y-auto space-y-2 pr-1">
                      {selectedTrip.members.map(member => (
                        <label key={member.user.id} className="flex items-center gap-2 text-xs text-light cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={newExp.splitUserIds.includes(member.user.id)}
                            onChange={() => handleCheckboxChange(member.user.id)}
                            className="w-4.5 h-4.5 rounded bg-surface border-white/10 text-accent focus:ring-accent"
                          />
                          <span>{member.user.name} ({member.user.email})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 justify-end pt-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="btn-glow-secondary">Cancel</button>
                  <button type="submit" className="btn-glow-primary">Log Expense</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Expenses;
