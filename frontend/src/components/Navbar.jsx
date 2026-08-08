import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { memberService } from '../services/memberService';
import { MapPin, Compass, Calendar, LayoutDashboard, User, LogOut, Mail, PlusCircle, Shield } from 'lucide-react';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [invitationsCount, setInvitationsCount] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      memberService.getMyInvitations()
        .then(invites => setInvitationsCount(invites.length))
        .catch(err => console.error(err));
    }
  }, [isAuthenticated, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl gradient-button flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Trip<span className="gradient-text">Nest</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/destinations"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                isActive('/destinations') ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Destinations</span>
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/trips"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    isActive('/trips') ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>My Trips</span>
                </Link>

                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                    isActive('/dashboard') ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/trips/new"
                  className="gradient-button text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Plan Trip</span>
                </Link>

                <Link
                  to="/invitations"
                  className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                  title="Trip Invitations"
                >
                  <Mail className="w-5 h-5" />
                  {invitationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                      {invitationsCount}
                    </span>
                  )}
                </Link>

                <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="hidden lg:block text-left">
                      <div className="text-xs font-semibold text-white leading-tight">{user?.name}</div>
                      <div className="text-[10px] text-indigo-400 font-medium flex items-center space-x-1">
                        <Shield className="w-2.5 h-2.5" />
                        <span>{user?.role || 'TRAVELER'}</span>
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white px-4 py-2 text-sm font-medium hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="gradient-button text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
