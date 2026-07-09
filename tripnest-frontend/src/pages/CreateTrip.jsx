import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, Users, ChevronLeft, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import useTrips from '../hooks/useTrips';
import tripService from '../services/tripService';

const CreateTrip = () => {
  const navigate = useNavigate();
  const { createTrip } = useTrips();
  const [formData, setFormData] = useState({
    destination: location.state?.destination || '',
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
    collaborators: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.budget) newErrors.budget = 'Budget amount is required';
    else if (isNaN(formData.budget) || parseFloat(formData.budget) < 0) {
      newErrors.budget = 'Budget must be a non-negative number';
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be on or after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix validation errors.');
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading('Weightless planning in progress...');

    try {
      // Pick a beautiful background image matching the destination name
      let sampleImageUrl = 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=600&auto=format&fit=crop';
      const destLower = formData.destination.toLowerCase();
      if (destLower.includes('kyoto') || destLower.includes('japan')) {
        sampleImageUrl = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop';
      } else if (destLower.includes('iceland') || destLower.includes('reykjavik')) {
        sampleImageUrl = 'https://images.unsplash.com/photo-1504829857797-ddff28127792?q=80&w=600&auto=format&fit=crop';
      } else if (destLower.includes('greece') || destLower.includes('santorini')) {
        sampleImageUrl = 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop';
      } else if (destLower.includes('paris') || destLower.includes('france')) {
        sampleImageUrl = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop';
      }

      const trip = await createTrip({
        destination: formData.destination,
        startDate: formData.startDate,
        endDate: formData.endDate,
        budget: parseFloat(formData.budget),
        description: formData.description,
        imageUrl: sampleImageUrl,
        isPublic: false
      });

      // Add collaborators if present
      if (formData.collaborators.trim()) {
        const emails = formData.collaborators.split(',');
        for (const email of emails) {
          const trimmedEmail = email.trim();
          if (trimmedEmail) {
            try {
              await tripService.addMember(trip.id, trimmedEmail);
            } catch (memberErr) {
              console.warn(`Failed to add member ${trimmedEmail}`, memberErr);
              toast.error(`Collaborator not found: ${trimmedEmail}`);
            }
          }
        }
      }

      toast.dismiss(loadingToast);
      navigate('/dashboard/trips');
    } catch (err) {
      console.error('Submit trip err', err);
      toast.dismiss(loadingToast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-scale-in">
      
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-light transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back</span>
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-8"
      >
        <div className="space-y-2 mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-light font-display">
            Create New Trip
          </h2>
          <p className="text-sm text-muted">
            Establish dates, targets, budgets, and add co-travelers to collaborate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          
          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-light" htmlFor="destination">
              Destination City / Country
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input 
                type="text" 
                id="destination"
                placeholder="Kyoto, Japan"
                value={formData.destination}
                onChange={handleChange}
                className={`w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border text-light placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200 ${errors.destination ? 'border-danger focus:ring-danger/20' : 'border-white/10'}`}
                disabled={loading}
              />
            </div>
            {errors.destination && (
              <p className="text-xs font-semibold text-danger">{errors.destination}</p>
            )}
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-light" htmlFor="startDate">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="date" 
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border text-light focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200 ${errors.startDate ? 'border-danger focus:ring-danger/20' : 'border-white/10'}`}
                  disabled={loading}
                />
              </div>
              {errors.startDate && (
                <p className="text-xs font-semibold text-danger">{errors.startDate}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-light" htmlFor="endDate">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="date" 
                  id="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border text-light focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200 ${errors.endDate ? 'border-danger focus:ring-danger/20' : 'border-white/10'}`}
                  disabled={loading}
                />
              </div>
              {errors.endDate && (
                <p className="text-xs font-semibold text-danger">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Budget & Collaborators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-light" htmlFor="budget">
                Budget Limit ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="number" 
                  id="budget"
                  placeholder="3500"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border text-light placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200 ${errors.budget ? 'border-danger focus:ring-danger/20' : 'border-white/10'}`}
                  disabled={loading}
                />
              </div>
              {errors.budget && (
                <p className="text-xs font-semibold text-danger">{errors.budget}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-light" htmlFor="collaborators">
                Invite Collaborators (Optional)
              </label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="text" 
                  id="collaborators"
                  placeholder="friend1@mail.com, friend2@mail.com"
                  value={formData.collaborators}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-light" htmlFor="description">
              Trip Description & Notes
            </label>
            <textarea 
              id="description"
              rows="4"
              placeholder="Ethereal snowboarding trip with friends..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200"
              disabled={loading}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-2 justify-end">
            <button 
              type="button" 
              onClick={() => navigate('/dashboard/trips')}
              className="btn-glow-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-glow-primary"
              disabled={loading}
            >
              Create Trip
            </button>
          </div>

        </form>
      </motion.div>

    </div>
  );
};

export default CreateTrip;
