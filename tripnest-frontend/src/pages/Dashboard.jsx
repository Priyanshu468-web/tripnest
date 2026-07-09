import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Briefcase, Calendar, Wallet, Heart, Compass, PlusCircle, 
  User, CreditCard, ChevronRight, Activity, Clock, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

// Services & Hooks
import useAuth from '../hooks/useAuth';
import tripService from '../services/tripService';
import bookingService from '../services/bookingService';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [recentDestinations, setRecentDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // Load trips from Spring Boot
        const tripsData = await tripService.getTrips();
        setTrips(tripsData);

        // Load bookings
        const bookingsData = await bookingService.getBookings();
        setBookings(bookingsData);

        // Load wishlist count
        const savedWish = localStorage.getItem('tripnest_wishlist');
        const wishList = savedWish ? JSON.parse(savedWish) : [];
        setWishlistCount(wishList.length);

        // Load recently viewed destinations
        const savedRecent = localStorage.getItem('tripnest_recent');
        let recentList = savedRecent ? JSON.parse(savedRecent) : [];
        
        // If empty, seed some default recent ones to look beautiful
        if (recentList.length === 0) {
          recentList = [
            { id: 1, name: "Srinagar", country: "India", imageUrl: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=300&auto=format&fit=crop", rating: 4.9 },
            { id: 3, name: "Munnar", country: "India", imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=300&auto=format&fit=crop", rating: 4.8 }
          ];
          localStorage.setItem('tripnest_recent', JSON.stringify(recentList));
        }
        setRecentDestinations(recentList);

      } catch (err) {
        console.error('Failed to load dashboard statistics', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const today = new Date();
  
  // Stats derivations
  const upcomingTrips = trips.filter(t => new Date(t.startDate) > today);
  const totalBudget = trips.reduce((acc, t) => acc + (t.budget || 0), 0);

  const stats = [
    { 
      title: 'Total Bookings', 
      value: bookings.length, 
      detail: 'Reservations active', 
      icon: Briefcase, 
      color: 'text-accent bg-accent/10 border-accent/20' 
    },
    { 
      title: 'Wishlist Items', 
      value: wishlistCount, 
      detail: 'Saved destinations', 
      icon: Heart, 
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' 
    },
    { 
      title: 'Upcoming Trips', 
      value: upcomingTrips.length, 
      detail: 'Future departures', 
      icon: Calendar, 
      color: 'text-glow bg-glow/10 border-glow/20' 
    },
    { 
      title: 'Expense Budget', 
      value: `₹${totalBudget.toLocaleString()}`, 
      detail: 'Allocated in plans', 
      icon: Wallet, 
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' 
    },
  ];

  const quickActions = [
    { title: 'Plan New Trip', desc: 'Create custom itinerary', link: '/dashboard/create-trip', icon: PlusCircle, color: 'from-blue-600 to-indigo-600' },
    { title: 'Explore Destinations', desc: 'Browse available spots', link: '/dashboard/destinations', icon: Compass, color: 'from-cyan-500 to-teal-500' },
    { title: 'Manage Budgets', desc: 'Check expenses & split bills', link: '/dashboard/budget', icon: Wallet, color: 'from-emerald-500 to-green-500' },
    { title: 'Edit User Profile', desc: 'Set avatars & settings', link: '/dashboard/profile', icon: User, color: 'from-amber-500 to-orange-500' }
  ];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 bg-surface/50 border border-slate-200 dark:border-slate-800 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-surface/50 border border-slate-200 dark:border-slate-800 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-surface/50 border border-slate-200 dark:border-slate-800 rounded-2xl" />
          <div className="h-96 bg-surface/50 border border-slate-200 dark:border-slate-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  const userDisplayName = user?.name || 'Traveler';

  return (
    <div className="space-y-6 animate-scale-in">
      
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 sm:p-8 bg-gradient-to-r from-accent to-glow rounded-2xl text-white shadow-glass-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
      >
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight leading-tight">
            Welcome Back, {userDisplayName}!
          </h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl">
            Check your upcoming flight tickets, track currency splits, and organize your digital travel binder.
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard/create-trip')}
          className="px-5 py-2.5 bg-white text-accent font-bold text-xs rounded-xl shadow-md hover:bg-slate-50 transition-all flex items-center gap-1.5 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Trip Plan</span>
        </button>
      </motion.div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card border-slate-200 dark:border-slate-800 p-5 flex items-center justify-between shadow-glass"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] text-muted block uppercase font-bold tracking-wider">{stat.title}</span>
                <h3 className="text-2xl font-black font-mono text-light">{stat.value}</h3>
                <span className="text-[10px] text-muted block font-semibold">{stat.detail}</span>
              </div>
              <div className={`p-3.5 rounded-xl border ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions Panel */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-light uppercase tracking-wider font-display">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((act) => {
            const Icon = act.icon;
            return (
              <Link
                key={act.title}
                to={act.link}
                className="p-4 glass-card border-slate-200 dark:border-slate-800 hover:border-accent/20 flex gap-4 items-center shadow-glass transition-all"
              >
                <div className={`p-3 bg-gradient-to-tr ${act.color} text-white rounded-xl`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-light leading-snug">{act.title}</h4>
                  <p className="text-[10px] text-muted mt-0.5">{act.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Lower Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Upcoming Trips List */}
        <div className="lg:col-span-8 glass-card border-slate-200 dark:border-slate-800 space-y-4 shadow-glass">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-sm text-light uppercase tracking-wider font-display">Upcoming Trips</h3>
            <Link to="/dashboard/trips" className="text-xs text-accent font-bold hover:underline flex items-center gap-0.5">
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {upcomingTrips.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Clock className="w-10 h-10 text-muted mx-auto animate-pulse" />
              <div className="space-y-1">
                <p className="text-xs text-light font-bold">No upcoming trips scheduled</p>
                <p className="text-[10px] text-muted">Plan your next adventure to Munnar or Ladakh today!</p>
              </div>
              <button
                onClick={() => navigate('/dashboard/create-trip')}
                className="px-4 py-2 bg-accent/10 border border-accent/20 text-accent font-bold text-xs rounded-xl hover:bg-accent/20 transition-all"
              >
                Create Trip
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingTrips.slice(0, 3).map((trip) => (
                <div 
                  key={trip.id} 
                  className="p-4 bg-void border border-slate-200 dark:border-slate-800 hover:border-accent/10 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all"
                >
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-xs text-light tracking-wide">{trip.destination}</h4>
                    <p className="text-[10px] text-muted flex items-center gap-1.5">
                      <span>{trip.startDate} to {trip.endDate}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                      <span>Budget: ₹{trip.budget?.toLocaleString()}</span>
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-accent/10 border border-accent/20 text-accent text-[10px] font-extrabold rounded-lg w-fit">
                    {trip.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recently Viewed Destinations */}
        <div className="lg:col-span-4 glass-card border-slate-200 dark:border-slate-800 space-y-4 shadow-glass">
          <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-sm text-light uppercase tracking-wider font-display">Recently Viewed</h3>
          </div>

          <div className="space-y-4">
            {recentDestinations.slice(0, 3).map((dest) => (
              <div 
                key={dest.id}
                onClick={() => navigate(`/destinations/${dest.id}`)}
                className="flex gap-3 items-center cursor-pointer group"
              >
                <div className="w-14 h-11 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex-shrink-0">
                  <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-xs text-light truncate group-hover:text-accent transition-colors font-display">
                    {dest.name}
                  </h4>
                  <span className="text-[9px] text-muted block mt-0.5">{dest.country || 'India'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
