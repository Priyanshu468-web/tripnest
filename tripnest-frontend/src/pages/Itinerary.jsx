import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Plus, Trash2, CheckCircle2, AlertCircle, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import tripService from '../services/tripService';

const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Try to read tripId from navigation state
  const initialTripId = location.state?.tripId || '';

  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(initialTripId);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [activeDay, setActiveDay] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newAct, setNewAct] = useState({
    name: '',
    category: 'activity',
    startTime: '',
    endTime: '',
    location: '',
    notes: '',
    cost: '0',
  });

  // Load all trips first so user can select if none in state
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

  // Load selected trip metadata and itineraries
  const loadTripItineraries = useCallback(async () => {
    if (!selectedTripId) return;
    try {
      setLoading(true);
      const tripData = await tripService.getTripById(selectedTripId);
      setSelectedTrip(tripData);

      const itineraryData = await tripService.getItineraries(selectedTripId);
      setItineraries(itineraryData);
      
      // Auto-set active day to 1 if not set or out of bounds
      if (itineraryData.length > 0) {
        const activeExists = itineraryData.some(it => it.day === activeDay);
        if (!activeExists) {
          setActiveDay(itineraryData[0].day);
        }
      }
    } catch (err) {
      console.error('Failed to load itineraries', err);
      toast.error('Failed to load schedule timeline');
    } finally {
      setLoading(false);
    }
  }, [selectedTripId, activeDay]);

  useEffect(() => {
    loadTripItineraries();
  }, [loadTripItineraries]);

  const handleTripChange = (e) => {
    setSelectedTripId(e.target.value);
    setActiveDay(1);
  };

  const handleAddActivitySubmit = async (e) => {
    e.preventDefault();
    if (!newAct.name.trim()) {
      toast.error('Activity title is required.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: newAct.name,
        category: newAct.category,
        startTime: newAct.startTime ? `${newAct.startTime}:00` : null, // format as HH:mm:ss for LocalTime
        endTime: newAct.endTime ? `${newAct.endTime}:00` : null,
        location: newAct.location,
        notes: newAct.notes,
        cost: parseFloat(newAct.cost) || 0,
        order: 0
      };

      await tripService.addActivity(selectedTripId, activeDay, payload);
      toast.success('Activity added successfully! 🌌');
      
      setNewAct({
        name: '',
        category: 'activity',
        startTime: '',
        endTime: '',
        location: '',
        notes: '',
        cost: '0',
      });
      setShowAddForm(false);
      loadTripItineraries();
    } catch (err) {
      console.error('Failed to save activity', err);
      toast.error('Failed to save activity');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (window.confirm("Remove this activity from itinerary?")) {
      try {
        setLoading(true);
        await tripService.deleteActivity(activityId);
        toast.success('Activity removed');
        loadTripItineraries();
      } catch (err) {
        console.error('Failed to delete activity', err);
        toast.error('Failed to remove activity');
      } finally {
        setLoading(false);
      }
    }
  };

  const currentItinerary = itineraries.find(it => it.day === activeDay);
  const activeDayActivities = currentItinerary?.activities || [];

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

      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-light font-display">
            {selectedTrip ? `${selectedTrip.destination} Schedule` : 'Trip Schedule'}
          </h2>
          <p className="text-sm text-muted">
            Manage your daily milestones weightlessly.
          </p>
        </div>
        {selectedTripId && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn-glow-primary flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Activity</span>
          </button>
        )}
      </div>

      {trips.length === 0 ? (
        <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 p-12 text-center max-w-md mx-auto space-y-4">
          <AlertCircle className="w-12 h-12 text-muted mx-auto" />
          <h3 className="font-bold text-light font-display text-lg">No Active Trips</h3>
          <p className="text-sm text-muted">You must plan a trip before scheduling day activities.</p>
          <button onClick={() => navigate('/dashboard/create-trip')} className="btn-glow-primary text-xs">
            Plan a Trip Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Day selector Tabs */}
          <div className="lg:col-span-3 space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {itineraries.map(it => (
              <button
                key={it.id}
                onClick={() => setActiveDay(it.day)}
                className={`
                  w-full text-left px-5 py-4 rounded-2xl font-semibold transition-all duration-200 border
                  ${activeDay === it.day 
                    ? 'bg-accent/15 border-accent text-accent shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                    : 'bg-surface/50 border-white/5 text-muted hover:text-light hover:bg-hover'}
                `}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block text-sm">Day {it.day}</span>
                    <span className="text-[10px] text-muted block mt-0.5">{new Date(it.date).toLocaleDateString()}</span>
                  </div>
                  <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${activeDay === it.day ? 'bg-accent/20 text-accent' : 'bg-void text-muted'}`}>
                    {it.activities?.length || 0} acts
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right Side: Timeline schedule list */}
          <div className="lg:col-span-9 space-y-6">
            <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6">
              
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 border-b border-white/5 pb-3 font-display text-light">
                <Calendar className="w-5 h-5 text-accent" />
                <span>Day {activeDay} Schedule</span>
              </h3>

              {loading && activeDayActivities.length === 0 ? (
                <div className="py-12 text-center text-muted animate-pulse">Synchronizing scheduling grid...</div>
              ) : activeDayActivities.length > 0 ? (
                <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                  {activeDayActivities.map((act) => (
                    <motion.div 
                      layout
                      key={act.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative flex justify-between items-start group gap-4"
                    >
                      {/* Time dot */}
                      <span className="absolute -left-[23px] top-1.5 w-4 h-4 rounded-full bg-accent border-4 border-surface shadow-glow group-hover:scale-110 transition-transform" />

                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          {act.startTime && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-accent bg-accent/5 px-2 py-0.5 rounded">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{act.startTime.substring(0, 5)}</span>
                            </span>
                          )}
                          <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded ${
                            act.category === 'transport' ? 'bg-indigo-500/10 text-indigo-400' :
                            act.category === 'lodging' ? 'bg-amber-500/10 text-amber-400' :
                            'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {act.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-light">{act.name}</h4>
                        
                        {act.location && (
                          <p className="flex items-center gap-1 text-xs text-muted">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{act.location}</span>
                          </p>
                        )}
                        {act.notes && (
                          <p className="text-xs text-muted pl-4 italic">
                            {act.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {act.cost > 0 && (
                          <span className="text-xs font-mono text-muted">${act.cost}</span>
                        )}
                        <button 
                          onClick={() => handleDeleteActivity(act.id)}
                          className="p-2 rounded-lg text-muted hover:text-danger hover:bg-danger/5 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-muted mx-auto" />
                  <h4 className="font-bold text-light font-display">Zero Activities Booked</h4>
                  <p className="text-xs text-muted max-w-xs mx-auto">No itinerary items scheduled for Day {activeDay}.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Add activity Dialog Overlay */}
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
              <h3 className="font-bold text-lg text-light mb-4 font-display">Add Activity (Day {activeDay})</h3>
              
              <form onSubmit={handleAddActivitySubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-light" htmlFor="name">Activity Title</label>
                  <input 
                    type="text" 
                    id="name"
                    placeholder="Grindelwald First Gondola ride"
                    value={newAct.name}
                    onChange={(e) => setNewAct({...newAct, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-light" htmlFor="startTime">Start Time</label>
                    <input 
                      type="time" 
                      id="startTime"
                      value={newAct.startTime}
                      onChange={(e) => setNewAct({...newAct, startTime: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-light" htmlFor="category">Type</label>
                    <select 
                      id="category"
                      value={newAct.category}
                      onChange={(e) => setNewAct({...newAct, category: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                    >
                      <option value="activity">Activity</option>
                      <option value="transport">Transport</option>
                      <option value="lodging">Lodging</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-light" htmlFor="endTime">End Time (Optional)</label>
                    <input 
                      type="time" 
                      id="endTime"
                      value={newAct.endTime}
                      onChange={(e) => setNewAct({...newAct, endTime: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-light" htmlFor="cost">Cost ($)</label>
                    <input 
                      type="number" 
                      id="cost"
                      placeholder="0"
                      value={newAct.cost}
                      onChange={(e) => setNewAct({...newAct, cost: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-light" htmlFor="location">Address Location</label>
                  <input 
                    type="text" 
                    id="location"
                    placeholder="Firstbahn Station, Grindelwald"
                    value={newAct.location}
                    onChange={(e) => setNewAct({...newAct, location: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-light" htmlFor="notes">Notes</label>
                  <textarea 
                    id="notes"
                    rows="2"
                    placeholder="Tickets can be bought online. Voucher uploaded."
                    value={newAct.notes}
                    onChange={(e) => setNewAct({...newAct, notes: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex gap-4 justify-end pt-2">
                  <button type="button" onClick={() => setShowAddForm(false)} className="btn-glow-secondary">Cancel</button>
                  <button type="submit" className="btn-glow-primary">Add Event</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Itinerary;
