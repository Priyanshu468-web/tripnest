import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService';
import { Shield, Users, MapPin, Compass, DollarSign, Activity, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await adminService.getAdminDashboard();
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load admin statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-rose-500/30 p-6 rounded-2xl max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Access Restricted</h3>
          <p className="text-slate-300 text-sm mb-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                SYSTEM ADMIN
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Shield className="w-8 h-8 text-indigo-400" />
              Platform Admin Dashboard
            </h1>
            <p className="mt-1 text-slate-400">
              Overview of global platform users, trip volume, revenue metrics, and system log stream
            </p>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Platform Users</p>
                <h3 className="text-3xl font-extrabold text-white mt-1">{stats?.totalUsers || 0}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              {stats?.userAnalytics?.travelers || 0} Travelers, {stats?.userAnalytics?.admins || 0} Admins
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Trips Created</p>
                <h3 className="text-3xl font-extrabold text-teal-400 mt-1">{stats?.totalTrips || 0}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              {stats?.tripAnalytics?.completed || 0} Completed, {stats?.tripAnalytics?.planning || 0} Planning
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Destinations Catalog</p>
                <h3 className="text-3xl font-extrabold text-amber-400 mt-1">{stats?.totalDestinations || 0}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Curated travel guides & weather locations
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Est. Monthly Revenue</p>
                <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">
                  ${stats?.revenueAnalytics?.monthlyRevenue?.toLocaleString() || '12,450'}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 truncate">
              {stats?.revenueAnalytics?.status}
            </p>
          </div>
        </div>

        {/* Grid 2: Revenue Placeholder & System Log Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Revenue Analytics Card */}
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Revenue & Monetization Section
              </h3>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-semibold">
                ACTIVE DEMO
              </span>
            </div>
            <p className="text-slate-300 text-sm">
              Integrated projection for platform subscriptions, group premium upgrades, and affiliate booking commissions.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-400">Annual Run-Rate</p>
                <p className="text-xl font-bold text-emerald-400 mt-1">
                  ${stats?.revenueAnalytics?.annualRevenue?.toLocaleString() || '149,400'}
                </p>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-400">Active Commissions</p>
                <p className="text-xl font-bold text-white mt-1">8.5% Avg Margin</p>
              </div>
            </div>
          </div>

          {/* Activity Stream */}
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              Live Platform System Activity
            </h3>
            <div className="space-y-4">
              {stats?.recentActivities?.map((act, idx) => (
                <div key={idx} className="flex items-start justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-sm text-slate-200">{act.event}</span>
                  <span className="text-xs text-slate-500 font-mono shrink-0 ml-3">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
