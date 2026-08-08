import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tripService } from '../services/tripService';
import { MapPin, Calendar, Users, DollarSign, FileText, Save, ArrowLeft, Loader2 } from 'lucide-react';

export const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: 0,
    description: '',
    status: 'PLANNING',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    tripService.getTripById(id)
      .then(trip => {
        setFormData({
          destination: trip.destination || '',
          startDate: trip.startDate || '',
          endDate: trip.endDate || '',
          travelers: trip.travelers || 1,
          budget: trip.budget || 0,
          description: trip.description || '',
          status: trip.status || 'PLANNING',
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load trip details');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await tripService.updateTrip(id, formData);
      navigate(`/trips/${id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to update trip.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm max-w-2xl mx-auto my-12">
        Loading trip data...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Edit Trip Details</h1>
          <p className="text-slate-400 text-sm mt-1">
            Update destination, travel window, budget, or status for trip #{id}.
          </p>
        </div>

        {error && (
          <div className="p-4 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Destination *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                name="destination"
                required
                value={formData.destination}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Start Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="date"
                  name="startDate"
                  required
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                End Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="date"
                  name="endDate"
                  required
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Travelers *
              </label>
              <div className="relative">
                <Users className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="number"
                  name="travelers"
                  min={1}
                  required
                  value={formData.travelers}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Budget (₹) *
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="number"
                  name="budget"
                  min={0}
                  step={500}
                  required
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="PLANNING">PLANNING</option>
                <option value="ONGOING">ONGOING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full gradient-button text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Trip Updates</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
