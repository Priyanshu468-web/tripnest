import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Compass } from 'lucide-react';

const Hero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/dashboard/destinations?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-6 bg-void">
      {/* Dynamic Animated Background elements */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent/15 dark:bg-accent/10 blur-[100px] pointer-events-none animate-pulse duration-[6s]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-glow/15 dark:bg-glow/10 blur-[120px] pointer-events-none animate-pulse duration-[8s]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        
        {/* Left Side: Call to Action */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent font-semibold text-xs rounded-full"
          >
            <Compass className="w-4 h-4 animate-spin-slow text-accent" />
            <span>Discover your dream gateway weightlessly</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-display text-light"
          >
            Explore The World,<br />
            <span className="bg-gradient-to-r from-accent to-glow bg-clip-text text-transparent">
              One Trip at a Time
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Design travel itineraries, secure packages, manage costs, and book Indian getaways on a high-performance, light/dark responsive dashboard.
          </motion.p>

          {/* Floating Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="p-3 bg-white/70 dark:bg-slate-900/75 backdrop-blur-lg border border-slate-200 dark:border-slate-800 shadow-glass rounded-2xl max-w-3xl flex flex-col md:flex-row items-center gap-3 w-full"
          >
            <div className="flex items-center gap-2 px-3 py-2 flex-1 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 w-full">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
              <input
                type="text"
                placeholder="Where would you like to go?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-light placeholder-muted focus:outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 flex-1 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 w-full hidden sm:flex">
              <Calendar className="w-5 h-5 text-glow flex-shrink-0" />
              <span className="text-xs text-muted">Select Travel Date</span>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-accent to-glow text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-glow active:scale-95 flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </motion.form>
        </div>

        {/* Right Side: Graphic Visual / Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative hidden lg:flex items-center justify-center min-h-[400px]"
        >
          {/* Main Visual Image Card */}
          <div className="w-[320px] h-[400px] rounded-premium overflow-hidden border border-slate-200 dark:border-slate-800 shadow-glass-lg relative group">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop"
              alt="Beautiful Beach Resort"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[8s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-[10px] text-accent font-bold uppercase tracking-wider">Featured Tour</span>
              <h3 className="text-white font-black text-xl leading-tight">Explore Coastal Goa beaches</h3>
            </div>
          </div>

          {/* Floating Small Info Badge 1 */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 left-[-40px] p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-glass flex items-center gap-3"
          >
            <div className="p-2 bg-accent/10 rounded-xl text-accent">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-muted block">Active Explorers</span>
              <span className="text-xs font-bold text-light font-mono">12,450+ Daily</span>
            </div>
          </motion.div>

          {/* Floating Small Info Badge 2 */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-10 right-[-30px] p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-glass flex items-center gap-3"
          >
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-muted block">Trip Rating</span>
              <span className="text-xs font-bold text-light font-mono">4.9 ★ Superb</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
