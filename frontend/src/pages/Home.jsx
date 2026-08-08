import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { destinationService } from '../services/destinationService';
import { Compass, Calendar, DollarSign, Users, MapPin, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    destinationService.getAllDestinations()
      .then(data => {
        setDestinations(data.slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-8 animate-bounce">
          <SparklesIcon className="w-4 h-4 text-indigo-400" />
          <span>Next-Gen Travel Planning Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Plan Perfect Trips, <br />
          <span className="gradient-text">Manage Budgets & Share Memories</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
          TripNest connects day-wise itinerary creation, live expense tracking, and group collaboration into one seamless platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto gradient-button text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-indigo-500/25 flex items-center justify-center space-x-2 group hover:scale-105 transition-all"
          >
            <span>Start Planning Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/destinations"
            className="w-full sm:w-auto glass-card text-slate-200 hover:text-white px-8 py-4 rounded-xl font-semibold text-base border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center space-x-2"
          >
            <Compass className="w-5 h-5 text-indigo-400" />
            <span>Explore Destinations</span>
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Everything You Need for Effortless Journeys
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            Designed for solo adventurers, families, and group travel organizers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl glass-card-hover border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Day-Wise Itinerary Planning</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Organize daily activities chronologically with sightseeing, dining, accommodation, and transportation categories.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl glass-card-hover border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Live Budget & Expenses</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Track category-wise expenses, monitor remaining budgets, and calculate real-time utilization metrics with visual dashboards.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl glass-card-hover border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Group Collaboration</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Invite companions, assign roles (Group Admin, Member), and co-manage trip itineraries and shared expenses easily.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Featured Top Destinations</h2>
            <p className="text-slate-400 text-sm">Hand-picked locations to spark your next travel story.</p>
          </div>
          <Link to="/destinations" className="mt-4 md:mt-0 text-indigo-400 hover:text-indigo-300 font-semibold text-sm flex items-center space-x-1">
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map(dest => (
            <div key={dest.id} className="glass-card rounded-2xl overflow-hidden glass-card-hover border border-slate-800 flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full text-xs font-bold text-amber-400 flex items-center space-x-1 border border-amber-400/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{dest.rating}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.country}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{dest.name}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">{dest.description}</p>
                </div>
                <Link
                  to={`/destinations/${dest.id}`}
                  className="w-full py-2.5 bg-slate-800 hover:bg-indigo-600/30 hover:border-indigo-500/50 border border-slate-700 text-white rounded-xl text-xs font-semibold transition-all text-center"
                >
                  Explore Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-10 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-slate-900/60 text-center relative overflow-hidden">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to embark on your next trip?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8">
            Create your account today and experience stress-free travel planning with TripNest.
          </p>
          <Link
            to="/register"
            className="gradient-button text-white px-8 py-3.5 rounded-xl font-bold text-sm inline-flex items-center space-x-2 shadow-lg shadow-indigo-500/20"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

const SparklesIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
