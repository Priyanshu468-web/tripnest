import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Calendar, Wallet, Users, ChevronRight, Map } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-void py-16 sm:py-24">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-glow/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Copywriting */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 sm:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent font-semibold text-xs rounded-full">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Next-Gen Smart Itinerary Planner</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-light leading-tight font-display">
            Plan Your Journeys <br />
            <span className="bg-gradient-to-r from-accent to-glow bg-clip-text text-transparent">
              Without the Gravity
            </span>
          </h1>

          <p className="text-muted text-base sm:text-lg max-w-xl leading-relaxed">
            Create travel itineraries, track multi-currency budgets, log local expenses, and coordinate trip details in one weightless, beautifully integrated dashboard. Built for solo and group travelers.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link 
              to="/register" 
              className="group btn-glow-primary inline-flex items-center justify-center gap-2.5 text-center py-4"
            >
              <span>Get Started Free</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link 
              to="/login" 
              className="btn-glow-secondary inline-flex items-center justify-center text-center py-4"
            >
              Sign In to Account
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Mock UI Visual Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 relative w-full max-w-md mx-auto"
        >
          {/* Card Frame */}
          <div className="rounded-2xl bg-surface/85 backdrop-blur-lg border border-white/5 shadow-glass-lg relative z-10 p-6 space-y-6">
            
            {/* Mock Header Controls */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-danger/50" />
                <span className="w-3 h-3 rounded-full bg-warning/50" />
                <span className="w-3 h-3 rounded-full bg-success/50" />
              </div>
              <span className="text-[10px] font-mono text-muted">swiss-alps-2026</span>
            </div>

            {/* Mock Body */}
            <div className="space-y-6">
              
              {/* Card Meta */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-light font-display">Swiss Alps Adventure 🏔️</h3>
                  <p className="text-xs text-muted">Jul 18 - Jul 25, 2026</p>
                </div>
                <span className="badge-glow-success">Planning</span>
              </div>

              {/* Progress Line */}
              <div className="space-y-4 relative pl-5 before:content-[''] before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                <div className="relative">
                  <span className="absolute -left-[19px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-4 border-surface" />
                  <h4 className="text-xs font-bold text-light">Zurich Airport Connection</h4>
                  <p className="text-[10px] text-muted">Flight LX14 • Arrived 10:15 AM</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[19px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent border-4 border-surface shadow-glow" />
                  <h4 className="text-xs font-bold text-light">Interlaken Express Train</h4>
                  <p className="text-[10px] text-muted">Departing Platform 4 • 11:30 AM</p>
                </div>
                <div className="relative">
                  <span className="absolute -left-[19px] top-1.5 w-3.5 h-3.5 rounded-full bg-white/10 border-4 border-surface" />
                  <h4 className="text-xs font-bold text-muted">Hotel Grindelwald Check-in</h4>
                  <p className="text-[10px] text-muted">Deluxe Double Suite</p>
                </div>
              </div>

              {/* Budget & Flight Status Widgets */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-void/50 border border-white/5 rounded-xl space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Expenses</span>
                  <p className="text-xs font-bold text-light font-mono">$3,420 / $4,500</p>
                  <div className="w-full h-1.5 bg-void/80 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full shadow-glow" style={{ width: '76%' }} />
                  </div>
                </div>

                <div className="p-3 bg-void/50 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Flight LX14</span>
                  <p className="text-xs font-bold text-emerald-400">On Time</p>
                  <span className="text-[9px] text-muted block">Gate E24 • Terminal 2</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature cards Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-24 sm:mt-32">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-light font-display">
            Tailored For Smart Travel
          </h2>
          <p className="text-muted text-sm">
            Everything you need for clean, stress-free adventure planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 bg-surface/50 border border-white/5 shadow-glass rounded-2xl space-y-4 hover:border-accent/15 duration-200 transition-colors"
          >
            <div className="p-3.5 bg-accent/10 rounded-xl text-accent w-fit shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-light font-display">Itinerary Builder</h3>
            <p className="text-sm text-muted leading-relaxed">
              Design comprehensive daily travel routines. Attach locations, timetables, and notes to stay on schedule.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 bg-surface/50 border border-white/5 shadow-glass rounded-2xl space-y-4 hover:border-accent/15 duration-200 transition-colors"
          >
            <div className="p-3.5 bg-glow/10 rounded-xl text-glow w-fit shadow-[0_0_15px_rgba(167,139,250,0.1)]">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-light font-display">Budget Log</h3>
            <p className="text-sm text-muted leading-relaxed">
              Log trip expenses. Configure categories like lodging, transport, and dining, and view limits via dynamic progress indicators.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 bg-surface/50 border border-white/5 shadow-glass rounded-2xl space-y-4 hover:border-accent/15 duration-200 transition-colors"
          >
            <div className="p-3.5 bg-indigo-500/10 rounded-xl text-indigo-400 w-fit shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-light font-display">Cooperative Sync</h3>
            <p className="text-sm text-muted leading-relaxed">
              Add travel buddies to trips. Instantly coordinate flights, split dinner bills, and settle debts divisions.
            </p>
          </motion.div>

        </div>
      </div>

    </div>
  );
};

export default Home;
