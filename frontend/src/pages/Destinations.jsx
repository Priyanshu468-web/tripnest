import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { destinationService } from '../services/destinationService';
import { MapPin, Search, Star, ArrowRight, Compass, Sparkles } from 'lucide-react';

export const Destinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    destinationService.getAllDestinations()
      .then(data => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    try {
      const results = await destinationService.searchDestinations(query);
      setDestinations(results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Explore World-Class <span className="gradient-text">Destinations</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Discover top-rated travel hotspots around the globe and start building your custom itinerary.
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-2xl mx-auto glass-card p-3 rounded-2xl border border-slate-800 flex items-center space-x-3 shadow-lg">
        <Search className="w-5 h-5 text-indigo-400 ml-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by destination name or country (e.g. Paris, Japan)..."
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Destinations Grid */}
      {loading ? (
        <div className="glass-card p-12 text-center text-slate-400 text-sm max-w-xl mx-auto">
          Loading destinations...
        </div>
      ) : destinations.length === 0 ? (
        <div className="glass-card p-12 text-center border border-dashed border-slate-800 max-w-xl mx-auto">
          <Compass className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-300 font-bold">No destinations match your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="glass-card rounded-2xl overflow-hidden glass-card-hover border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full text-xs font-bold text-amber-400 flex items-center space-x-1 border border-amber-400/30">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{dest.rating || '4.8'}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.country}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{dest.name}</h3>
                  <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mb-4">
                    {dest.description}
                  </p>

                  {dest.attractions && (
                    <div className="text-[11px] text-slate-400 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 mb-4">
                      <strong className="text-slate-300 block mb-1">Key Attractions:</strong>
                      <span className="line-clamp-2">{dest.attractions}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <Link
                  to={`/destinations/${dest.id}`}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold text-center block transition-colors"
                >
                  View Details & Attractions
                </Link>

                <button
                  onClick={() => navigate(`/trips/new?destination=${encodeURIComponent(dest.name)}`)}
                  className="w-full gradient-button text-white py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Plan Trip to {dest.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
