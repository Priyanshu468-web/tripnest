import React from 'react';
import { Compass, Heart, Globe, Shield, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 mt-20 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg gradient-button flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Trip<span className="gradient-text">Nest</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Your ultimate travel planning & itinerary management companion. Design trips, track expenses, and collaborate with group travelers effortlessly.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/destinations" className="hover:text-indigo-400 transition">Destinations</a></li>
              <li><a href="/trips" className="hover:text-indigo-400 transition">Trip Planner</a></li>
              <li><a href="/dashboard" className="hover:text-indigo-400 transition">Expense Dashboard</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Features</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5"><Globe className="w-3.5 h-3.5 text-indigo-400" /><span>Day-wise Itineraries</span></li>
              <li className="flex items-center space-x-1.5"><Shield className="w-3.5 h-3.5 text-emerald-400" /><span>Budget & Expenses</span></li>
              <li className="flex items-center space-x-1.5"><Mail className="w-3.5 h-3.5 text-purple-400" /><span>Group Collaboration</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">TripNest App</h4>
            <p className="text-xs text-slate-400 mb-3">Milestones 1, 2 & 3 fully active and responsive.</p>
            <div className="text-xs px-3 py-2 rounded-lg bg-indigo-950/50 border border-indigo-500/20 text-indigo-300">
              ✓ Spring Boot + React Architecture
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} TripNest. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for passionate travelers</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
