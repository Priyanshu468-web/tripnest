import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, MapPin, Star, Search, Plus, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import destinationService from '../services/destinationService';

const Destinations = () => {
  const navigate = useNavigate();
  
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(15000); // Max budget limit in INR
  const [minRating, setMinRating] = useState(0);
  
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('rating-desc'); // rating-desc, price-asc, price-desc

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Retrieve destinations on mount/search query
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const data = await destinationService.searchDestinations(search);
        
        // Enrich backend model with mock visual elements (price, package duration) for high-fidelity GoFly layouts
        const enriched = data.map((item, index) => {
          // Derive price based on rating or ID to keep it deterministic
          const priceVal = 2000 + (item.rating * 1500) + ((item.id || index) * 850);
          const durationDays = 3 + ((item.id || index) % 4);
          const durationNights = durationDays - 1;
          
          return {
            ...item,
            derivedPrice: Math.round(priceVal),
            derivedDuration: `${durationDays} Days / ${durationNights} Nights`,
            category: item.tags ? item.tags.split(',')[0].trim() : 'General'
          };
        });

        setPlaces(enriched);
        setCurrentPage(1); // Reset page on query edit
      } catch (err) {
        console.error('Failed to load destinations', err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchDestinations();
    }, 250);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Collect unique categories present in the database to build filter sidebar lists
  const categoriesList = useMemo(() => {
    const list = new Set(['All']);
    places.forEach(p => {
      if (p.category) list.add(p.category);
    });
    return Array.from(list);
  }, [places]);

  // Filter and sort places in-memory
  const filteredAndSortedPlaces = useMemo(() => {
    return places
      .filter(place => {
        // Category Filter
        const categoryMatch = selectedCategory === 'All' || place.category === selectedCategory;
        // Price Filter
        const priceMatch = place.derivedPrice <= priceRange;
        // Rating Filter
        const ratingMatch = place.rating >= minRating;
        
        return categoryMatch && priceMatch && ratingMatch;
      })
      .sort((a, b) => {
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        if (sortBy === 'price-asc') return a.derivedPrice - b.derivedPrice;
        if (sortBy === 'price-desc') return b.derivedPrice - a.derivedPrice;
        return 0;
      });
  }, [places, selectedCategory, priceRange, minRating, sortBy]);

  // Calculate paginated slice
  const paginatedPlaces = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPlaces.slice(start, start + itemsPerPage);
  }, [filteredAndSortedPlaces, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedPlaces.length / itemsPerPage);

  const handlePlanTripToSpot = (destinationName) => {
    navigate('/dashboard/create-trip', { state: { destination: destinationName } });
  };

  return (
    <div className="space-y-8 animate-scale-in">
      
      {/* 🚀 GoFly EgensLab Style Hero Breadcrumb Header */}
      <div 
        className="relative rounded-3xl overflow-hidden py-16 px-8 text-center bg-cover bg-center border border-white/5 shadow-glass-lg"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(13,17,23,0.75), rgba(13,17,23,0.9)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop')` 
        }}
      >
        <div className="relative z-10 space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-light font-display">
            Explore Destinations
          </h1>
          <div className="flex justify-center items-center gap-2 text-xs font-semibold text-muted">
            <Link to="/dashboard" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <span className="text-light">Destinations List</span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 🛠️ Sticky Search & Filter Sidebar */}
        <aside className="lg:col-span-3 rounded-2xl bg-surface/85 backdrop-blur-md border border-white/5 p-6 space-y-6 lg:sticky lg:top-6 shadow-glass">
          
          <div className="flex items-center gap-2 border-b border-white/5 pb-3">
            <SlidersHorizontal className="w-4 h-4 text-accent" />
            <h3 className="font-bold text-sm text-light font-display">Filters Options</h3>
          </div>

          {/* Search Keyword */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-light">Search Keyword</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input 
                type="text" 
                placeholder="Find packages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-void/50 border border-white/10 text-xs text-light placeholder-muted focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-light">Categories</label>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {categoriesList.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedCategory === cat ? 'bg-accent/15 text-accent border border-accent/25' : 'text-muted hover:text-light hover:bg-hover/50 border border-transparent'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Filter */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <label className="text-light">Max Package Price</label>
              <span className="text-accent font-mono">₹{priceRange.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="2000" 
              max="25000" 
              step="500" 
              value={priceRange} 
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full accent-accent bg-void h-1 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted font-mono">
              <span>₹2,000</span>
              <span>₹25,000</span>
            </div>
          </div>

          {/* Star Rating Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-light">Minimum Rating</label>
            <div className="flex items-center gap-1.5">
              {[0, 3, 4, 4.5, 4.8].map(stars => (
                <button
                  key={stars}
                  onClick={() => setMinRating(stars)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${minRating === stars ? 'bg-accent text-white border-accent' : 'bg-void/50 border-white/5 text-muted hover:text-light'}`}
                >
                  {stars === 0 ? 'All' : `${stars}★`}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* 🗺️ Destinations Grid & Sorting header */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* Sorting Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface/50 border border-white/5 rounded-2xl p-4 shadow-glass">
            <span className="text-xs text-muted">
              Showing <strong className="text-light">{filteredAndSortedPlaces.length}</strong> travel destinations
            </span>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-bold text-muted tracking-wider flex items-center gap-1">
                <ArrowUpDown className="w-3 h-3 text-accent" />
                <span>Sort By:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-void border border-white/10 text-light text-xs focus:outline-none focus:border-accent"
              >
                <option value="rating-desc">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Main Grid */}
          {loading && paginatedPlaces.length === 0 ? (
            <div className="text-center py-24 text-muted animate-pulse">Syncing travel package tables...</div>
          ) : paginatedPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedPlaces.map((place, idx) => (
                  <motion.div
                    layout
                    key={place.id || place.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="rounded-2xl bg-surface/85 backdrop-blur-lg border border-white/5 shadow-glass overflow-hidden flex flex-col justify-between hover:border-accent/20 transition-all duration-300 hover:scale-105 group"
                  >
                    <div>
                      {/* Image & Badges */}
                      <div className="relative h-44 overflow-hidden bg-void/50 border-b border-white/5">
                        <img 
                          src={place.imageUrl} 
                          alt={place.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                        />
                        <span className="absolute top-4 left-4 text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-1 bg-surface/90 text-light border border-white/5 rounded-lg">
                          {place.category}
                        </span>
                        <span className="absolute bottom-4 right-4 text-[10px] font-bold px-2 py-0.5 bg-accent text-white rounded">
                          {place.derivedDuration}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-base text-light font-display truncate pr-2 group-hover:text-accent transition-colors">
                            {place.name}
                          </h3>
                          <span className="flex items-center gap-1 text-xs font-bold text-warning font-mono bg-warning/5 px-2 py-0.5 rounded border border-warning/10">
                            <Star className="w-3.5 h-3.5 fill-warning" />
                            <span>{place.rating.toFixed(1)}</span>
                          </span>
                        </div>
                        
                        <p className="text-xs text-muted leading-relaxed line-clamp-3 h-12">
                          {place.description}
                        </p>
                      </div>
                    </div>

                    {/* Booking prices and triggers */}
                    <div className="p-5 border-t border-white/5 flex items-center justify-between mt-auto bg-void/20">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-muted block tracking-widest">Starts From</span>
                        <span className="text-sm font-extrabold font-mono text-accent">₹{place.derivedPrice.toLocaleString()}</span>
                      </div>
                      <button 
                        onClick={() => handlePlanTripToSpot(place.name)}
                        className="btn-glow-primary text-xs py-2 px-4 flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Plan Trip</span>
                      </button>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="rounded-2xl bg-surface/80 border border-white/5 p-16 text-center max-w-md mx-auto space-y-4 shadow-glass">
              <Compass className="w-12 h-12 text-muted mx-auto animate-pulse" />
              <h3 className="font-bold text-light font-display text-lg">No Places Located</h3>
              <p className="text-sm text-muted">We couldn't locate any packages matching your search criteria.</p>
            </div>
          )}

          {/* 🏷️ GoFly Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2.5 rounded-lg border border-white/5 bg-surface/50 text-muted hover:text-light disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-lg border text-xs font-mono font-bold transition-all ${currentPage === i + 1 ? 'bg-accent border-accent text-white shadow-glow' : 'bg-surface/50 border-white/5 text-muted hover:text-light'}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-lg border border-white/5 bg-surface/50 text-muted hover:text-light disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </section>

      </div>

    </div>
  );
};

export default Destinations;
