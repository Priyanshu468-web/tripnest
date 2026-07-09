import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, MapPin, Star, Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import destinationService from '../services/destinationService';

const Destinations = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const data = await destinationService.searchDestinations(search);
        setPlaces(data);
      } catch (err) {
        console.error('Failed to query destinations', err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search input queries
    const delayDebounceFn = setTimeout(() => {
      fetchDestinations();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handlePlanTripToSpot = (destinationName) => {
    // Navigate to create-trip and pass destination as state
    navigate('/dashboard/create-trip', { state: { destination: destinationName } });
  };

  return (
    <div className="space-y-6 animate-scale-in">
      
      {/* Title Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-light font-display">
            Explore Destinations
          </h2>
          <p className="text-sm text-muted">
            Discover popular getaways to add to your bucket list.
          </p>
        </div>

        {/* Search */}
        <div className="relative flex-shrink-0 w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search spot or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200"
          />
        </div>
      </div>

      {/* Grid of locations */}
      {loading && places.length === 0 ? (
        <div className="text-center py-12 text-muted animate-pulse">Retrieving recommended travel grid...</div>
      ) : places.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {places.map((place, idx) => (
            <motion.div
              key={place.id || place.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass hover:shadow-glass-lg hover:scale-105 hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-void/50 border-b border-white/5">
                <img 
                  src={place.imageUrl} 
                  alt={place.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" 
                />
                {place.tags && (
                  <span className="absolute top-4 left-4 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 bg-surface/90 text-light rounded-lg shadow-sm border border-white/5">
                    {place.tags.split(',')[0]}
                  </span>
                )}
                {place.rating && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold px-2.5 py-1 bg-accent text-white rounded-lg shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>{place.rating}</span>
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col space-y-3">
                <h3 className="font-bold text-base text-light flex items-center gap-1.5 font-display group-hover:text-accent transition-colors">
                  <MapPin className="w-4.5 h-4.5 text-accent" />
                  <span>{place.name}, {place.country}</span>
                </h3>
                <p className="text-xs text-muted leading-relaxed flex-1">
                  {place.description}
                </p>
                <button 
                  onClick={() => handlePlanTripToSpot(`${place.name}, ${place.country}`)}
                  className="w-full btn-glow-primary flex items-center justify-center gap-2 py-2.5 text-xs font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Plan Trip to this Spot</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 p-12 text-center max-w-md mx-auto space-y-4">
          <Compass className="w-12 h-12 text-muted mx-auto animate-pulse" />
          <h3 className="font-bold text-light font-display text-lg">No Spot Located</h3>
          <p className="text-sm text-muted">We couldn't find any location match for "{search}".</p>
        </div>
      )}

    </div>
  );
};

export default Destinations;
