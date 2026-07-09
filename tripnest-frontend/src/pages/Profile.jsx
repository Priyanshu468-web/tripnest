import React, { useState, useEffect } from 'react';
import { User, Mail, Save, Globe, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: 'USER',
    avatarUrl: ''
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatarUrl: '',
    language: 'English',
    emailNotifications: true
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/user/profile');
        setProfile(response.data);
        
        setFormData(prev => ({
          ...prev,
          name: response.data.name || '',
          email: response.data.email || '',
          avatarUrl: response.data.avatarUrl || ''
        }));
      } catch (err) {
        console.error('Profile fetch failed', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Name and email are required fields.');
      return;
    }

    setSaving(true);
    const saveToast = toast.loading('Saving profile updates...');

    try {
      const response = await api.patch('/api/user/profile', {
        name: formData.name,
        avatarUrl: formData.avatarUrl
      });

      const updatedUser = response.data;
      setProfile(updatedUser);
      
      // Sync auth context user state
      if (user) {
        const syncUser = { ...user, name: updatedUser.name, avatarUrl: updatedUser.avatarUrl };
        localStorage.setItem('user', JSON.stringify(syncUser));
        // If AuthContext exposed setUser, we could call it. Since it's saved in localstorage, on reload it's fine.
      }
      
      toast.dismiss(saveToast);
      toast.success('Profile details updated successfully! 🌌');
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.dismiss(saveToast);
      toast.error('Failed to save profile changes.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse max-w-3xl mx-auto">
        <div className="h-44 bg-surface/50 border border-white/5 rounded-2xl" />
        <div className="h-96 bg-surface/50 border border-white/5 rounded-2xl" />
      </div>
    );
  }

  const avatarInitials = profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'TR';

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-scale-in">
      
      {/* Profile Header Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-6 flex flex-col sm:flex-row items-center gap-6"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-accent to-glow text-white font-extrabold text-3xl flex items-center justify-center shadow-glass">
          {avatarInitials}
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-xl font-bold text-light font-display">{profile.name}</h2>
          <p className="text-sm text-muted">{profile.email}</p>
          <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-accent/20 text-accent`}>
            {profile.role} Account
          </span>
        </div>
      </motion.div>

      {/* Main Settings Form */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl bg-surface/80 backdrop-blur-lg border border-white/5 shadow-glass p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          
          <h3 className="font-bold text-light border-b border-white/5 pb-3 flex items-center gap-2 font-display">
            <User className="w-5 h-5 text-accent" />
            <span>Personal Information</span>
          </h3>

          {/* Form inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-light" htmlFor="name">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted" />
                <input 
                  type="text" 
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                  disabled={saving}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-light" htmlFor="email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted" />
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent opacity-60"
                  disabled={true} // Email is immutable login credential
                />
              </div>
            </div>
          </div>

          <h3 className="font-bold text-light border-b border-white/5 pb-3 pt-2 flex items-center gap-2 font-display">
            <Globe className="w-5 h-5 text-accent" />
            <span>Preferences</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-light" htmlFor="language">Language</label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted" />
                <select 
                  id="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border border-white/10 text-light focus:outline-none focus:border-accent"
                >
                  <option>English</option>
                  <option>Deutsch</option>
                  <option>Français</option>
                  <option>Español</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input 
                type="checkbox" 
                id="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleInputChange}
                className="w-4 h-4 rounded bg-surface border-white/10 text-accent focus:ring-accent focus:ring-offset-void"
              />
              <label className="text-xs font-semibold text-light flex items-center gap-1.5 cursor-pointer" htmlFor="emailNotifications">
                <Bell className="w-4 h-4 text-muted" />
                <span>Receive email notifications for trip updates</span>
              </label>
            </div>
          </div>

          {/* Action button */}
          <div className="flex justify-end pt-4 border-t border-white/5">
            <button 
              type="submit" 
              className="btn-glow-primary flex items-center justify-center gap-2"
              disabled={saving}
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>

        </form>
      </motion.div>

    </div>
  );
};

export default Profile;
