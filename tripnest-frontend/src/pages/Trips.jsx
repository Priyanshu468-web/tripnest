import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Wallet, ArrowUpRight, Search, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import useTrips from '../hooks/useTrips';

const Trips = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { trips, loading, deleteTrip } = useTrips();

  const filteredTrips = trips.filter(trip => 
    trip.destination.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this trip?")) {
      await deleteTrip(id);
    }
  };

  if (loading && trips.length === 0) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-10 w-64 bg-surface/50 border border-white/5 rounded-xl" />
          <div className="h-10 w-32 bg-surface/50 border border-white/5 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-96 bg-surface/50 border border-white/5 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-scale-in">
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200"
          />
        </div>

        <button 
          onClick={() => navigate('/dashboard/create-trip')}
          className="btn-glow-primary flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Plan New Trip</span>
        </button>
      </div>

      {/* Trips list grid */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTrips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate('/dashboard/itinerary', { state: { tripId: trip.id } })}
              className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass hover:shadow-glass-lg hover:scale-105 hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col group cursor-pointer"
            >
              {/* Image banner */}
              <div className="relative h-48 overflow-hidden bg-void/50 border-b border-white/5">
                <img 
                  src={trip.imageUrl || 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=600&auto=format&fit=crop'} 
                  alt={trip.destination} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <span className="absolute top-4 right-4 badge-glow-warning bg-surface/90 backdrop-blur-md border border-white/5">
                  {trip.status}
                </span>
                
                <button 
                  onClick={(e) => handleDelete(e, trip.id)}
                  className="absolute bottom-4 right-4 p-2 bg-danger/10 hover:bg-danger/25 border border-danger/20 text-danger rounded-xl hover:scale-105 transition-all active:scale-95"
                  title="Delete Trip"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Body details */}
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-light font-display group-hover:text-accent transition-colors">{trip.destination}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-muted line-clamp-2">
                  {trip.description || "No description provided."}
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-white/5">
                  <div>
                    <span className="text-muted block mb-0.5">Budget Limit</span>
                    <span className="font-bold text-light font-mono">${trip.budget?.toLocaleString() || '0'}</span>
                  </div>
                  <div>
                    <span className="text-muted block mb-0.5">Visibility</span>
                    <span className="font-bold text-light">{trip.isPublic ? 'Public Share' : 'Private'}</span>
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-4 mt-auto border-t border-white/5 flex justify-between items-center">
                  {/* Co-travelers */}
                  <div className="flex -space-x-2">
                    {trip.members?.map((member, i) => (
                      <span 
                        key={member.id} 
                        className="w-7 h-7 rounded-full bg-gradient-to-tr from-accent to-glow text-[10px] text-white font-bold border-2 border-void flex items-center justify-center shadow-glass"
                        style={{ zIndex: 10 - i }}
                        title={member.user?.name}
                      >
                        {member.user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'TR'}
                      </span>
                    ))}
                  </div>

                  <div 
                    className="flex items-center gap-1 text-xs font-bold text-accent hover:text-glow transition-colors"
                  >
                    <span>Timeline Dashboard</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 p-12 text-center max-w-md mx-auto space-y-4 mt-8">
          <Briefcase className="w-12 h-12 text-muted mx-auto" />
          <h3 className="font-bold text-light font-display text-lg">No Trips Found</h3>
          <p className="text-sm text-muted">Plan your next escape and float through it weightlessly.</p>
          <button 
            onClick={() => navigate('/dashboard/create-trip')}
            className="btn-glow-primary text-xs"
          >
            Create Your First Trip Now
          </button>
        </div>
      )}

    </div>
  );
};

export default Trips;
