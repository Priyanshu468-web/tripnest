import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Calendar, 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  MapPin, 
  Activity, 
  Plus, 
  ArrowRight,
  Compass,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import tripService from '../services/tripService';

const Dashboard = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await tripService.getTrips();
        setTrips(data);
      } catch (err) {
        console.error('Failed to load dashboard trips', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  // Calculate dynamic stats
  const totalTrips = trips.length;
  
  const today = new Date();
  const upcomingTrips = trips.filter(t => new Date(t.startDate) > today).length;

  const totalBudget = trips.reduce((acc, t) => acc + (t.budget || 0), 0);

  // Quick stats metadata
  const stats = [
    { title: 'Total Trips', value: totalTrips, detail: 'Planned & Completed', icon: Briefcase, color: 'text-accent bg-accent/10 shadow-[0_0_15px_rgba(99,102,241,0.1)]' },
    { title: 'Upcoming Trips', value: upcomingTrips, detail: 'Future departures', icon: Calendar, color: 'text-glow bg-glow/10 shadow-[0_0_15px_rgba(167,139,250,0.1)]' },
    { title: 'Travel Budget', value: `$${totalBudget.toLocaleString()}`, detail: 'Total Allocation', icon: Wallet, color: 'text-indigo-400 bg-indigo-500/10' },
    { title: 'System Status', value: 'Live', detail: 'Weightless floating sync', icon: CreditCard, color: 'text-emerald-400 bg-emerald-500/10' },
  ];

  const recentActivities = [
    { id: 1, action: 'Synchronized Swiss Alps travel timeline', time: 'Just now', category: 'Itinerary' },
    { id: 2, action: 'Seeded recommended travel spots feed', time: 'Recently', category: 'Destinations' },
    { id: 3, action: 'Connected to local Spring Boot API', time: 'Active', category: 'System' }
  ];

  const popularDestinations = [
    { name: 'Kyoto, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=300&auto=format&fit=crop', rating: '4.9' },
    { name: 'Reykjavik, Iceland', image: 'https://images.unsplash.com/photo-1504829857797-ddff28127792?q=80&w=300&auto=format&fit=crop', rating: '4.8' }
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="h-28 bg-surface/50 border border-white/5 rounded-2xl" />
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-surface/50 border border-white/5 rounded-2xl" />
          ))}
        </div>
        {/* Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-surface/50 border border-white/5 rounded-2xl" />
          <div className="h-96 bg-surface/50 border border-white/5 rounded-2xl" />
        </div>
      </div>
    );
  }

  // Get the most upcoming/recent trip to showcase in banner
  const activeTrip = trips.length > 0 ? trips[0] : null;

  return (
    <div className="space-y-6 animate-scale-in">
      
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 sm:p-8 bg-gradient-to-r from-accent to-glow rounded-2xl text-white shadow-glass-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
      >
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Welcome Back, {user?.name || 'Traveler'}! 👋
          </h1>
          <p className="text-white/80 text-sm max-w-md">
            Ready to plan your next escape? Experience travel mapping without gravity.
          </p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/create-trip')}
          className="flex items-center gap-2 px-5 py-3 bg-white text-accent hover:text-glow font-bold rounded-xl shadow-md hover:scale-[1.02] active:scale-95 transition-all text-sm duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Trip</span>
        </button>
      </motion.div>

      {/* Grid Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass hover:shadow-glass-lg hover:scale-105 hover:-translate-y-1 transition-all duration-200 p-6"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-muted">{stat.title}</span>
                  <h3 className="text-3xl font-extrabold text-light font-display">{stat.value}</h3>
                  <p className="text-xs text-muted">{stat.detail}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Main Core Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Progress, Destinations & Quick actions */}
        <section className="lg:col-span-8 space-y-6">
          
          {/* Quick Actions Shortcuts */}
          <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6">
            <h3 className="font-bold text-light mb-4 flex items-center gap-2 font-display">
              <Activity className="w-5 h-5 text-accent" />
              <span>Quick Shortcuts</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button 
                onClick={() => navigate('/dashboard/create-trip')}
                className="p-4 bg-void/50 hover:bg-accent/10 hover:text-accent rounded-2xl transition-all border border-white/5 text-center space-y-2 group duration-200 hover:scale-105"
              >
                <Briefcase className="w-6 h-6 mx-auto text-accent" />
                <span className="block text-xs font-semibold">New Trip</span>
              </button>
              <button 
                onClick={() => {
                  if (activeTrip) {
                    navigate('/dashboard/expenses', { state: { tripId: activeTrip.id } });
                  } else {
                    navigate('/dashboard/trips');
                  }
                }}
                className="p-4 bg-void/50 hover:bg-accent/10 hover:text-accent rounded-2xl transition-all border border-white/5 text-center space-y-2 group duration-200 hover:scale-105"
              >
                <CreditCard className="w-6 h-6 mx-auto text-glow" />
                <span className="block text-xs font-semibold">Log Cost</span>
              </button>
              <button 
                onClick={() => navigate('/dashboard/documents')}
                className="p-4 bg-void/50 hover:bg-accent/10 hover:text-accent rounded-2xl transition-all border border-white/5 text-center space-y-2 group duration-200 hover:scale-105"
              >
                <FileText className="w-6 h-6 mx-auto text-indigo-400" />
                <span className="block text-xs font-semibold">Upload PDF</span>
              </button>
              <button 
                onClick={() => navigate('/dashboard/destinations')}
                className="p-4 bg-void/50 hover:bg-accent/10 hover:text-accent rounded-2xl transition-all border border-white/5 text-center space-y-2 group duration-200 hover:scale-105"
              >
                <Compass className="w-6 h-6 mx-auto text-emerald-400" />
                <span className="block text-xs font-semibold">Explore Spot</span>
              </button>
            </div>
          </div>

          {/* Travel Progress Card */}
          <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-light flex items-center gap-2 font-display">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span>Next Trip Details</span>
              </h3>
              <button 
                onClick={() => navigate('/dashboard/trips')}
                className="text-xs font-bold text-accent flex items-center gap-1 hover:underline"
              >
                <span>View All Trips</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {activeTrip ? (
              <div className="p-4 bg-void/30 rounded-2xl border border-white/5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-light">{activeTrip.destination} 🌍</h4>
                    <p className="text-xs text-muted">
                      {new Date(activeTrip.startDate).toLocaleDateString()} - {new Date(activeTrip.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="badge-glow-warning">{activeTrip.status}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/5 text-xs">
                  <div>
                    <span className="text-muted">Budget Limit</span>
                    <p className="font-bold text-light mt-0.5">${activeTrip.budget?.toLocaleString() || '0'}</p>
                  </div>
                  <div>
                    <span className="text-muted">Co-travelers</span>
                    <p className="font-bold text-light mt-0.5">{activeTrip.members?.length || 1} Members</p>
                  </div>
                  <div>
                    <span className="text-muted">Visibility</span>
                    <p className="font-bold text-light mt-0.5">{activeTrip.isPublic ? 'Public Link' : 'Collaborators'}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate('/dashboard/itinerary', { state: { tripId: activeTrip.id } })}
                    className="btn-glow-primary text-xs w-full py-2.5"
                  >
                    Manage Daily Timeline
                  </button>
                  <button 
                    onClick={() => navigate('/dashboard/budget', { state: { tripId: activeTrip.id } })}
                    className="btn-glow-secondary text-xs w-full py-2.5"
                  >
                    View Expenses & Settlements
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 bg-void/30 rounded-2xl border border-white/5 space-y-4">
                <p className="text-sm text-muted">You do not have any active or upcoming trips planned.</p>
                <button 
                  onClick={() => navigate('/dashboard/create-trip')}
                  className="btn-glow-primary text-xs"
                >
                  Create Your First Trip Now
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* Right Column: Activities, popular spots */}
        <section className="lg:col-span-4 space-y-6">
          
          {/* Recent Activity Log */}
          <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6">
            <h3 className="font-bold text-light mb-4 flex items-center gap-2 font-display">
              <Activity className="w-5 h-5 text-accent" />
              <span>Recent Activity</span>
            </h3>
            <div className="space-y-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex gap-3 text-xs leading-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-light font-semibold">{act.action}</p>
                    <span className="text-[10px] text-muted block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular spots suggestions */}
          <div className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6">
            <h3 className="font-bold text-light mb-4 flex items-center gap-2 font-display">
              <Compass className="w-5 h-5 text-accent" />
              <span>Popular Spots</span>
            </h3>
            <div className="space-y-4">
              {popularDestinations.map((dest) => (
                <div key={dest.name} className="flex items-center gap-3.5 group cursor-pointer" onClick={() => navigate('/dashboard/destinations')}>
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/5">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-bold text-xs truncate text-light group-hover:text-accent transition-colors">{dest.name}</h4>
                    <span className="text-[10px] text-muted">Rating ★ {dest.rating}</span>
                  </div>
                  <MapPin className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
                </div>
              ))}
            </div>
          </div>

        </section>

      </div>

    </div>
  );
};

export default Dashboard;
