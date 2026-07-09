import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Compass, ArrowUpDown, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Services
import destinationService from '../services/destinationService';

// Components
import DestinationCard from '../components/DestinationCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import LoadingSpinner from '../components/LoadingSpinner';

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  // Search & Filter state
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(25000); // Max budget limit in INR
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
        
        // Enrich backend model with mock visual elements (price, package duration)
        const enriched = data.map((item, index) => {
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

  return (
    <div className="space-y-8 animate-scale-in max-w-7xl mx-auto px-4">
      
      {/* Hero Breadcrumb Header */}
      <div 
        className="relative rounded-2xl overflow-hidden py-12 px-6 text-center bg-cover bg-center border border-slate-200 dark:border-slate-800 shadow-glass-lg"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.8), rgba(15,23,42,0.95)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop')` 
        }}
      >
        <div className="relative z-10 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-display">
            Explore Destinations
          </h1>
          <div className="flex justify-center items-center gap-2 text-xs font-semibold text-white/60">
            <Link to="/dashboard" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Destinations List</span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sticky Search & Filter Sidebar */}
        <div className="lg:col-span-3 lg:sticky lg:top-24">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categoriesList={categoriesList}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            maxPrice={30000}
          />
        </div>

        {/* Destinations Grid & Sorting header */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* Sorting Header & Search input */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-surface/50 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-glass">
            <div className="flex-1">
              <SearchBar search={search} setSearch={setSearch} placeholder="Search destination catalog..." />
            </div>
            
            <div className="flex items-center gap-3 justify-between sm:justify-start">
              <span className="text-[10px] uppercase font-bold text-muted tracking-wider flex items-center gap-1.5 flex-shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-accent" />
                <span>Sort By:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-void border border-slate-200 dark:border-slate-800 text-light text-xs font-bold focus:outline-none focus:border-accent"
              >
                <option value="rating-desc">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Main Grid */}
          {loading && paginatedPlaces.length === 0 ? (
            <LoadingSpinner message="Searching travel catalog..." />
          ) : paginatedPlaces.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {paginatedPlaces.map((place) => (
                    <DestinationCard key={place.id} destination={place} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-8">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-surface text-muted hover:text-light disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-9 h-9 rounded-xl border text-xs font-mono font-bold transition-all ${currentPage === i + 1 ? 'bg-accent border-accent text-white shadow-glow' : 'bg-surface border-slate-200 dark:border-slate-800 text-muted hover:text-light'}`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-surface text-muted hover:text-light disabled:opacity-40 disabled:pointer-events-none transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-premium bg-surface/50 border border-slate-200 dark:border-slate-800 p-16 text-center max-w-md mx-auto space-y-4 shadow-glass">
              <Compass className="w-12 h-12 text-accent mx-auto animate-bounce" />
              <h3 className="font-extrabold text-light font-display text-lg">No Results Found</h3>
              <p className="text-xs text-muted">We couldn't locate any packages matching your search criteria. Try modifying your filters.</p>
            </div>
          )}

        </section>

      </div>

    </div>
  );
};

export default Destinations;
