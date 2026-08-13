import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { memberService } from '../services/memberService';
<<<<<<< HEAD
import { notificationService } from '../services/notificationService';
import { MapPin, Compass, Calendar, LayoutDashboard, User, LogOut, Mail, PlusCircle, Shield, BarChart3, Bell } from 'lucide-react';
=======
import { MapPin, Compass, Calendar, LayoutDashboard, User, LogOut, Mail, PlusCircle, Shield } from 'lucide-react';
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [invitationsCount, setInvitationsCount] = useState(0);
<<<<<<< HEAD
  const [unreadNotifications, setUnreadNotifications] = useState(0);
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e

  useEffect(() => {
    if (isAuthenticated) {
      memberService.getMyInvitations()
<<<<<<< HEAD
        .then(invites => setInvitationsCount(invites ? invites.length : 0))
        .catch(err => console.error(err));

      notificationService.getUnreadCount()
        .then(data => setUnreadNotifications(data.unreadCount || 0))
=======
        .then(invites => setInvitationsCount(invites.length))
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        .catch(err => console.error(err));
    }
  }, [isAuthenticated, location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
<<<<<<< HEAD
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
=======
    <nav className="sticky top-0 z-50 glass-card border-b border-slate-800">
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
<<<<<<< HEAD
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Trip<span className="bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">Nest</span>
=======
            <div className="w-10 h-10 rounded-xl gradient-button flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Trip<span className="gradient-text">Nest</span>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
<<<<<<< HEAD
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
=======
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                isActive('/') ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/destinations"
<<<<<<< HEAD
              className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-1.5 ${
=======
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                isActive('/destinations') ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <MapPin className="w-4 h-4" />
<<<<<<< HEAD
              <span>Explore</span>
=======
              <span>Destinations</span>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/trips"
<<<<<<< HEAD
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-1.5 ${
=======
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                    isActive('/trips') ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>My Trips</span>
                </Link>

                <Link
                  to="/dashboard"
<<<<<<< HEAD
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-1.5 ${
=======
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                    isActive('/dashboard') ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
<<<<<<< HEAD

                <Link
                  to="/analytics"
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-1.5 ${
                    isActive('/analytics') ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-teal-400" />
                  <span>Analytics</span>
                </Link>

                {(user?.role === 'ADMIN' || user?.role === 'ADMINISTRATOR') && (
                  <Link
                    to="/admin"
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center space-x-1.5 ${
                      isActive('/admin') ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>Admin</span>
                  </Link>
                )}
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/trips/new"
<<<<<<< HEAD
                  className="bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Trip</span>
=======
                  className="gradient-button text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Plan Trip</span>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                </Link>

                <Link
                  to="/invitations"
<<<<<<< HEAD
                  className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors"
                  title="Invitations & Reminders"
                >
                  <Mail className="w-5 h-5" />
                  {(invitationsCount > 0 || unreadNotifications > 0) && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {invitationsCount + unreadNotifications}
=======
                  className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                  title="Trip Invitations"
                >
                  <Mail className="w-5 h-5" />
                  {invitationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                      {invitationsCount}
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                    </span>
                  )}
                </Link>

                <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
                  <Link
                    to="/profile"
<<<<<<< HEAD
                    className="flex items-center space-x-2.5 p-1.5 rounded-xl hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold text-sm shadow">
=======
                    className="flex items-center space-x-2.5 p-1.5 rounded-lg hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow">
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
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
<<<<<<< HEAD
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
=======
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
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
<<<<<<< HEAD
                  className="text-slate-300 hover:text-white px-4 py-2 text-sm font-medium hover:bg-slate-800/50 rounded-xl transition-colors"
=======
                  className="text-slate-300 hover:text-white px-4 py-2 text-sm font-medium hover:bg-slate-800/50 rounded-lg transition-colors"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
<<<<<<< HEAD
                  className="bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/20"
=======
                  className="gradient-button text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-500/20"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
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
