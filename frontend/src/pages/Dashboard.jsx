import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tripService } from '../services/tripService';
import { memberService } from '../services/memberService';
import { Calendar, DollarSign, PieChart, Users, PlusCircle, ArrowRight, MapPin, Compass, Shield, Clock } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userTrips, userInvites] = await Promise.all([
          tripService.getMyTrips(),
          memberService.getMyInvitations()
        ]);
        setTrips(userTrips);
        setInvitations(userInvites);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalBudgetSum = trips.reduce((acc, t) => acc + (t.budget || 0), 0);
  const totalSpentSum = trips.reduce((acc, t) => acc + (t.totalSpent || 0), 0);
  const totalRemainingSum = totalBudgetSum - totalSpentSum;
  const overallUtilization = totalBudgetSum > 0 ? (totalSpentSum / totalBudgetSum) * 100 : 0;

  return (
    <div className="space-y-10 pb-12">
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/60 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400 mb-2">
            <Shield className="w-4 h-4" />
            <span>Role: {user?.role || 'TRAVELER'}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="gradient-text">{user?.name}</span>!
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Here is your live travel overview, active trip itineraries, and budget analytics.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <Link
            to="/trips/new"
            className="gradient-button text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center space-x-2 shadow-lg shadow-indigo-500/25 hover:scale-105 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Plan New Trip</span>
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Trips</div>
            <div className="text-2xl font-bold text-white">{trips.length}</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Budget Managed</div>
            <div className="text-2xl font-bold text-white">₹{totalBudgetSum.toLocaleString()}</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Expenses</div>
            <div className="text-2xl font-bold text-emerald-400">₹{totalSpentSum.toLocaleString()}</div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Pending Invites</div>
            <div className="text-2xl font-bold text-purple-400">{invitations.length}</div>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent / Active Trips */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              <span>Your Active & Planned Trips</span>
            </h2>
            <Link to="/trips" className="text-xs font-semibold text-indigo-400 hover:underline flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="glass-card p-8 rounded-2xl text-center text-slate-400 text-sm">
              Loading your trips...
            </div>
          ) : trips.length === 0 ? (
            <div className="glass-card p-10 rounded-2xl text-center border border-dashed border-slate-800 space-y-4">
              <Compass className="w-12 h-12 text-slate-600 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-white">No Trips Found</h3>
                <p className="text-xs text-slate-400 mt-1">You haven't created or joined any trips yet.</p>
              </div>
              <Link
                to="/trips/new"
                className="gradient-button text-white px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create Your First Trip</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trips.slice(0, 4).map(trip => (
                <div key={trip.id} className="glass-card p-6 rounded-2xl border border-slate-800 glass-card-hover flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                        trip.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        trip.status === 'ONGOING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        trip.status === 'CANCELLED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                        'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                      }`}>
                        {trip.status}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center space-x-1">
                        <Users className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{trip.travelers} Travelers</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span className="truncate">{trip.destination}</span>
                    </h3>

                    <div className="text-xs text-slate-400 flex items-center space-x-1.5 mb-4">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{trip.startDate} to {trip.endDate}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 mb-6">
                      <div className="flex justify-between text-[11px] font-medium">
                        <span className="text-slate-400">Budget Spent</span>
                        <span className="text-indigo-300 font-bold">
                          ₹{(trip.totalSpent || 0).toLocaleString()} / ₹{(trip.budget || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                          style={{ width: `${Math.min(trip.budgetUtilization || 0, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/trips/${trip.id}`}
                    className="w-full py-2.5 bg-slate-800 hover:bg-indigo-600/30 hover:border-indigo-500/50 border border-slate-700 text-white rounded-xl text-xs font-semibold text-center transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>View Itinerary & Expenses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Quick Info & Pending Invites */}
        <div className="space-y-6">
          {/* Pending Invitations Card */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-400" />
                <span>Pending Invitations</span>
              </h3>
              <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                {invitations.length}
              </span>
            </div>

            {invitations.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No pending invitations right now.</p>
            ) : (
              <div className="space-y-3">
                {invitations.slice(0, 3).map(inv => (
                  <div key={inv.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{inv.tripDestination}</div>
                      <div className="text-[10px] text-slate-400">Role: {inv.role}</div>
                    </div>
                    <Link
                      to="/invitations"
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold"
                    >
                      Respond
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Platform Actions */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white mb-2">Quick Navigation</h3>

            <Link
              to="/destinations"
              className="w-full p-3 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center space-x-3 transition-colors"
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Explore Destinations</span>
            </Link>

            <Link
              to="/profile"
              className="w-full p-3 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 hover:text-white flex items-center space-x-3 transition-colors"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>User Profile Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
