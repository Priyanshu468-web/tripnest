import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuth from './hooks/useAuth';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Trips from './pages/Trips';
import CreateTrip from './pages/CreateTrip';
import Itinerary from './pages/Itinerary';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import Booking from './pages/Booking';
import Budget from './pages/Budget';
import Expenses from './pages/Expenses';
import Documents from './pages/Documents';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-void gap-4 transition-colors duration-300">
        <svg className="w-12 h-12 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-muted font-semibold text-sm animate-pulse">Floating into TripNest...</span>
      </div>
    );
  }

  return (
    <Router>
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: 'rgba(28, 33, 40, 0.9)',
            color: '#E5E7EB',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            backdropFilter: 'blur(8px)',
            padding: '12px 16px'
          },
          success: {
            iconTheme: {
              primary: '#6366F1',
              secondary: '#E5E7EB'
            }
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#E5E7EB'
            }
          }
        }} 
      />

      <div className="flex flex-col min-h-screen bg-void text-light">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <>
                <Navbar />
                <Home />
              </>
            } 
          />

          <Route 
            path="/destinations/:id" 
            element={
              <>
                <Navbar />
                <DestinationDetails />
              </>
            } 
          />
          
          <Route 
            path="/booking/:id" 
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Booking />
                </>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <>
                  <Navbar />
                  <Login />
                </>
              )
            } 
          />
          
          <Route 
            path="/register" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <>
                  <Navbar />
                  <Register />
                </>
              )
            } 
          />

          {/* Protected Dashboard Route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="trips" element={<Trips />} />
            <Route path="create-trip" element={<CreateTrip />} />
            <Route path="itinerary" element={<Itinerary />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="budget" element={<Budget />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="documents" element={<Documents />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
