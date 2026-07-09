import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Compass } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    await logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-void/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-extrabold text-2xl tracking-tight text-accent" onClick={() => setIsOpen(false)}>
          <Compass className="w-8 h-8 text-accent animate-spin-slow" />
          <span className="bg-gradient-to-r from-accent to-glow bg-clip-text text-transparent">
            TripNest
          </span>
        </Link>

        {/* Mobile Toggle Menu */}
        <button 
          className="p-2 rounded-xl text-muted hover:bg-hover hover:text-light sm:hidden transition-all"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => `
              font-medium text-sm transition-all duration-200 py-1.5 px-3 rounded-lg
              ${isActive ? 'text-accent bg-accent/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'text-muted hover:text-light'}
            `}
          >
            Home
          </NavLink>
          
          {isAuthenticated && (
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => `
                font-medium text-sm transition-all duration-200 py-1.5 px-3 rounded-lg
                ${isActive ? 'text-accent bg-accent/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'text-muted hover:text-light'}
              `}
            >
              Dashboard
            </NavLink>
          )}

          <div className="w-px h-5 bg-white/10" />

          {!isAuthenticated ? (
            <>
              <Link 
                to="/login" 
                className="font-semibold text-sm text-muted hover:text-light transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn-glow-primary text-sm px-5 py-2"
              >
                Register
              </Link>
            </>
          ) : (
            <button 
              onClick={onLogoutClick} 
              className="px-5 py-2 text-sm font-semibold text-danger bg-danger/5 border border-danger/10 hover:bg-danger/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] rounded-lg active:scale-95 transition-all"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="sm:hidden border-t border-white/5 bg-void px-6 py-4 flex flex-col gap-4 shadow-lg animate-scale-in">
          <NavLink 
            to="/" 
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `
              font-semibold text-sm py-2 px-3 rounded-lg block
              ${isActive ? 'text-accent bg-accent/10' : 'text-muted'}
            `}
          >
            Home
          </NavLink>
          
          {isAuthenticated && (
            <NavLink 
              to="/dashboard" 
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                font-semibold text-sm py-2 px-3 rounded-lg block
                ${isActive ? 'text-accent bg-accent/10' : 'text-muted'}
              `}
            >
              Dashboard
            </NavLink>
          )}

          <div className="h-px bg-white/5" />

          {!isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-white/10 text-sm font-semibold hover:bg-hover text-muted hover:text-light transition-all"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/80 hover:shadow-glow transition-all block"
              >
                Register
              </Link>
            </div>
          ) : (
            <button 
              onClick={onLogoutClick} 
              className="w-full text-center py-2.5 text-sm font-semibold text-danger bg-danger/5 border border-danger/10 rounded-lg block"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
