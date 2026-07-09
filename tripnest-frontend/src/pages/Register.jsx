import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const loadingToast = toast.loading('Registering your account...');

    try {
      await register(name, email, password);
      toast.dismiss(loadingToast);
      toast.success('Registration successful! Welcome to TripNest. 🌌');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.dismiss(loadingToast);
      
      let errorMsg = 'Failed to register your account.';
      if (error.response && error.response.data) {
        errorMsg = error.response.data.message || error.response.data || errorMsg;
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-void px-6 py-12 relative overflow-hidden">
      
      {/* Background Glow Ethereal Effects */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-accent/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-glow/5 blur-[80px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md z-10 animate-scale-in"
      >
        <div className="rounded-2xl bg-surface/80 backdrop-blur-lg shadow-glass border border-white/5 p-8">
          
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-light font-display">
              Create Account
            </h2>
            <p className="text-sm text-muted">
              Join TripNest and start planning trips weightlessly
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-light" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border text-light placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200 ${errors.name ? 'border-danger focus:ring-danger/20' : 'border-white/10'}`}
                  disabled={loading}
                />
              </div>
              {errors.name && (
                <p className="text-xs font-semibold text-danger">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-light" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border text-light placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200 ${errors.email ? 'border-danger focus:ring-danger/20' : 'border-white/10'}`}
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-semibold text-danger">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-light" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="password"
                  id="password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border text-light placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200 ${errors.password ? 'border-danger focus:ring-danger/20' : 'border-white/10'}`}
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <p className="text-xs font-semibold text-danger">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-light" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-11 pr-4 py-2.5 rounded-lg bg-surface/50 backdrop-blur-md border text-light placeholder-muted focus:border-accent focus:ring-2 focus:ring-accent/30 transition-all duration-200 ${errors.confirmPassword ? 'border-danger focus:ring-danger/20' : 'border-white/10'}`}
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs font-semibold text-danger">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-glow-primary w-full flex items-center justify-center gap-2 py-3.5 mt-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <span>Register</span>
              )}
            </button>

          </form>

          {/* Account Footer Links */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center text-sm">
            <p className="text-muted">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-accent hover:text-glow transition-colors hover:underline">
                Log in here
              </Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Register;
