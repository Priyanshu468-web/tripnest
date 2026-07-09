import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  PlusCircle, 
  Calendar, 
  Wallet, 
  CreditCard, 
  FileText, 
  User, 
  LogOut, 
  Search, 
  Bell, 
  Menu, 
  X,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Trips', path: '/dashboard/trips', icon: Briefcase },
    { name: 'Create Trip', path: '/dashboard/create-trip', icon: PlusCircle },
    { name: 'Itinerary', path: '/dashboard/itinerary', icon: Calendar },
    { name: 'Destinations', path: '/dashboard/destinations', icon: Compass },
    { name: 'Budget', path: '/dashboard/budget', icon: Wallet },
    { name: 'Expenses', path: '/dashboard/expenses', icon: CreditCard },
    { name: 'Documents', path: '/dashboard/documents', icon: FileText },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  const mockNotifications = [
    { id: 1, text: "Swiss Alps Adventure budget was updated.", time: "2 hrs ago" },
    { id: 2, text: "Flight departure LX14 schedule confirmed.", time: "5 hrs ago" },
    { id: 3, text: "Kyoto accommodation booking voucher uploaded.", time: "1 day ago" }
  ];

  const currentRouteName = navItems.find(item => item.path === location.pathname)?.name || 'Dashboard';
  const userDisplayName = user?.name || 'Traveler';
  const userRole = user?.role || 'USER';

  return (
    <div className="min-h-screen flex bg-void text-light font-sans antialiased overflow-x-hidden">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-void/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col w-72 bg-surface/85 backdrop-blur-lg border-r border-white/5 transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-accent rounded-xl text-white shadow-glow">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.8 19.2L16 11l3.5-3.5a2.12 2.12 0 0 0-3-3L13 8 4.8 6.2a1 1 0 0 0-1.2.7L3 8.3a1 1 0 0 0 .7 1.2L11 12.5l-3.5 3.5-3-.5-1.5 1.5 3 1.5 1.5 3 1.5-1.5-.5-3 3.5-3.5 3 7.3a1 1 0 0 0 1.2.7l1.4-.4a1 1 0 0 0 .7-1.2z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-accent to-glow bg-clip-text text-transparent">
              TripNest
            </span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-muted hover:bg-hover hover:text-light lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/dashboard'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-accent/15 text-accent shadow-[0_0_15px_rgba(99,102,241,0.15)] border-l-2 border-accent' 
                    : 'text-muted hover:text-light hover:bg-hover/40'}
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer User Info & Logout */}
        <div className="p-4 border-t border-white/5 bg-surface/50">
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent to-glow text-white font-bold flex items-center justify-center shadow-glass">
              {userDisplayName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-semibold text-sm truncate text-light">{userDisplayName}</h4>
              <p className="text-xs text-muted truncate">{userRole}</p>
            </div>
          </div>
          <button 
            onClick={handleLogoutClick}
            className="flex items-center justify-center gap-2.5 w-full px-4 py-3 font-semibold text-danger bg-danger/5 border border-danger/10 hover:bg-danger/10 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-void/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-muted hover:bg-hover hover:text-light lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="hidden sm:block text-lg font-bold text-light">
              {currentRouteName}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input 
                type="text" 
                placeholder="Search trip plan..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface/50 backdrop-blur-glass border border-white/10 rounded-xl text-sm text-light placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-200"
              />
            </div>

            {/* Notifications Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-xl text-muted hover:bg-hover hover:text-light border border-white/5 transition-all duration-200"
                aria-label="Notifications"
              >
                <div className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border border-void" />
                </div>
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 z-50 rounded-xl p-4 overflow-hidden bg-surface/90 backdrop-blur-md border border-white/10 shadow-glass-lg"
                    >
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                        <h4 className="font-bold text-sm text-light">Notifications</h4>
                        <span className="text-xs text-accent font-semibold cursor-pointer">Clear all</span>
                      </div>
                      <div className="space-y-3">
                        {mockNotifications.map(n => (
                          <div key={n.id} className="text-xs pb-2 border-b border-white/5 last:border-0">
                            <p className="text-light leading-normal">{n.text}</p>
                            <span className="text-[10px] text-muted block mt-1">{n.time}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-6 bg-white/10" />

            {/* Profile Avatar Trigger */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-glow text-white font-bold flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/dashboard/profile')}>
              {userDisplayName.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-6 overflow-y-auto bg-void">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
