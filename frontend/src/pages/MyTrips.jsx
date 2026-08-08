import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tripService } from '../services/tripService';
import { MapPin, Calendar, Users, PlusCircle, Search, Trash2, Edit3, ArrowRight, DollarSign } from 'lucide-react';
import { Modal } from '../components/Modal';

export const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTripId, setDeleteTripId] = useState(null);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const data = await tripService.getMyTrips();
      setTrips(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTripId) return;
    try {
      await tripService.deleteTrip(deleteTripId);
      setTrips(trips.filter(t => t.id !== deleteTripId));
      setDeleteTripId(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete trip');
    }
  };

  const filteredTrips = trips.filter(t =>
    t.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">My Trips</h1>
          <p className="text-slate-400 text-sm mt-1">Manage and organize all your upcoming and past adventures.</p>
        </div>
        <Link
          to="/trips/new"
          className="gradient-button text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center space-x-2 shadow-lg shadow-indigo-500/25 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Trip</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center space-x-3">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search trips by destination..."
          className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Trips Grid */}
      {loading ? (
        <div className="glass-card p-12 text-center text-slate-400 text-sm">
          Loading your trip plans...
        </div>
      ) : filteredTrips.length === 0 ? (
        <div className="glass-card p-12 text-center border border-dashed border-slate-800 space-y-4">
          <MapPin className="w-12 h-12 text-slate-600 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white">No Trips Found</h3>
            <p className="text-xs text-slate-400 mt-1">Start by creating your first trip itinerary.</p>
          </div>
          <Link
            to="/trips/new"
            className="gradient-button text-white px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Trip</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div key={trip.id} className="glass-card p-6 rounded-2xl border border-slate-800 glass-card-hover flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                    trip.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    trip.status === 'ONGOING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                    trip.status === 'CANCELLED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                    'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                  }`}>
                    {trip.status}
                  </span>

                  <div className="flex items-center space-x-1">
                    <Link
                      to={`/trips/${trip.id}/edit`}
                      className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                      title="Edit Trip"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteTripId(trip.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="truncate">{trip.destination}</span>
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {trip.description || 'No description provided for this trip.'}
                </p>

                <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Dates</span>
                    </span>
                    <span className="font-semibold text-slate-200">{trip.startDate} - {trip.endDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center space-x-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>Travelers</span>
                    </span>
                    <span className="font-semibold text-slate-200">{trip.travelers} Persons</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center space-x-1.5">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Budget</span>
                    </span>
                    <span className="font-bold text-indigo-400">₹{(trip.budget || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link
                to={`/trips/${trip.id}`}
                className="w-full py-3 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 text-indigo-300 hover:text-white rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center space-x-2"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTripId}
        onClose={() => setDeleteTripId(null)}
        title="Confirm Delete Trip"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-300">
            Are you sure you want to delete this trip? All associated itinerary activities, expenses, and group member records will be permanently removed.
          </p>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setDeleteTripId(null)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-rose-600/20"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
