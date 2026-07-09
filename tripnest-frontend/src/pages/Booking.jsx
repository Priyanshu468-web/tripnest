import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, Users, CreditCard, ShieldCheck, 
  MapPin, Loader2, CheckCircle2, ShoppingBag, Receipt 
} from 'lucide-react';
import toast from 'react-hot-toast';

// Services
import destinationService from '../services/destinationService';
import bookingService from '../services/bookingService';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorPage from '../components/ErrorPage';

const Booking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form parameters
  const initGuests = parseInt(searchParams.get('guests')) || 1;
  const initPrice = parseFloat(searchParams.get('price')) || 9500;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guestsCount, setGuestsCount] = useState(initGuests);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  
  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchDest = async () => {
      try {
        setLoading(true);
        const data = await destinationService.getDestinationById(id);
        setDestination(data);
      } catch (err) {
        console.error("Failed to load booking destination detail", err);
        setError("Could not resolve booking destination metadata.");
      } finally {
        setLoading(false);
      }
    };
    fetchDest();

    // Populate user credentials if they exist
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      setName(userObj.name || '');
      setEmail(userObj.email || '');
    }
  }, [id]);

  const validateForm = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Traveler name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = "Please input a valid email";
    if (!phone.trim() || phone.length < 10) errs.phone = "Provide a valid 10-digit mobile number";
    if (!startDate) errs.startDate = "Select departure date";
    if (!endDate) errs.endDate = "Select return date";
    if (new Date(startDate) > new Date(endDate)) errs.endDate = "Return date must be after departure";
    
    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all traveler details correctly.");
      return;
    }

    setIsSubmitting(true);
    const payingToast = toast.loading("Securely processing deposit payment...");

    const totalPrice = Math.round(initPrice * guestsCount * 1.05);

    try {
      const result = await bookingService.createBooking({
        destinationId: id,
        destinationName: destination.name,
        travelerName: name,
        travelerEmail: email,
        travelerPhone: phone,
        startDate,
        endDate,
        guestsCount,
        totalPrice,
        paymentMethod
      });

      toast.dismiss(payingToast);
      toast.success("Payment succeeded! Booking registered. 🎉");
      
      setConfirmedBooking(result);
      setShowConfirmModal(true);
    } catch (err) {
      toast.dismiss(payingToast);
      toast.error("Transaction declined. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner message="Loading checkout terminal..." /></div>;
  if (error) return <div className="max-w-4xl mx-auto pt-12"><ErrorPage message={error} onRetry={() => window.location.reload()} /></div>;
  if (!destination) return null;

  // Real-time bill calculations
  const subtotal = initPrice * guestsCount;
  const taxes = Math.round(subtotal * 0.05);
  const totalBill = subtotal + taxes;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative space-y-8 animate-scale-in bg-void text-light">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-muted hover:text-light hover:bg-hover px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Modify Selection</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Travelers & Payment Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card space-y-6">
            
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h2 className="text-xl font-bold tracking-tight text-light font-display">Traveler Information</h2>
              <p className="text-xs text-muted">Complete primary traveler records for travel insurance</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-6" noValidate>
              
              {/* Form Input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted uppercase">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl bg-void border text-xs text-light focus:outline-none focus:border-accent ${validationErrors.name ? 'border-danger' : 'border-slate-200 dark:border-slate-800'}`}
                    placeholder="e.g. John Doe"
                  />
                  {validationErrors.name && <span className="text-[10px] font-bold text-danger">{validationErrors.name}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted uppercase">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl bg-void border text-xs text-light focus:outline-none focus:border-accent ${validationErrors.email ? 'border-danger' : 'border-slate-200 dark:border-slate-800'}`}
                    placeholder="e.g. john@example.com"
                  />
                  {validationErrors.email && <span className="text-[10px] font-bold text-danger">{validationErrors.email}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted uppercase">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl bg-void border text-xs text-light focus:outline-none focus:border-accent ${validationErrors.phone ? 'border-danger' : 'border-slate-200 dark:border-slate-800'}`}
                    placeholder="e.g. 9876543210"
                  />
                  {validationErrors.phone && <span className="text-[10px] font-bold text-danger">{validationErrors.phone}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted uppercase">Total Travelers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(parseInt(e.target.value))}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-void border border-slate-200 dark:border-slate-800 text-xs text-light focus:outline-none focus:border-accent"
                    >
                      {[...Array(8)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} Person{i > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dates grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted uppercase">Departure Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-void border text-xs text-light focus:outline-none focus:border-accent ${validationErrors.startDate ? 'border-danger' : 'border-slate-200 dark:border-slate-800'}`}
                    />
                  </div>
                  {validationErrors.startDate && <span className="text-[10px] font-bold text-danger">{validationErrors.startDate}</span>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted uppercase">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-void border text-xs text-light focus:outline-none focus:border-accent ${validationErrors.endDate ? 'border-danger' : 'border-slate-200 dark:border-slate-800'}`}
                    />
                  </div>
                  {validationErrors.endDate && <span className="text-[10px] font-bold text-danger">{validationErrors.endDate}</span>}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-muted uppercase block">Select Payment Method</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Credit Card', 'UPI / NetBanking', 'Pay at Resort'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-4 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                        paymentMethod === method
                          ? 'border-accent bg-accent/5 text-accent'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-hover text-muted'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>{method}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirm submit btn */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-accent to-glow text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-glow transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Authorizing Transaction...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Pay & Confirm Reservation (₹{totalBill.toLocaleString()})</span>
                  </>
                )}
              </button>

            </form>

          </div>
        </div>

        {/* Right Side: Booking Summary & Price calculations */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Summary Card */}
          <div className="glass-card space-y-5">
            <div className="flex gap-4 items-center">
              <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-800 flex-shrink-0">
                <img src={destination.imageUrl} alt={destination.name} className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <span className="flex items-center gap-1 text-[10px] text-accent font-bold uppercase tracking-wider">
                  <MapPin className="w-3 h-3" />
                  <span>{destination.country}</span>
                </span>
                <h3 className="font-extrabold text-base text-light truncate font-display">{destination.name}</h3>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3">
              <div className="flex gap-2 items-center text-xs text-muted">
                <ShoppingBag className="w-4 h-4 text-accent" />
                <span>Base Rate: <b>₹{initPrice.toLocaleString()}</b> / Person</span>
              </div>
              <div className="flex gap-2 items-center text-xs text-muted">
                <Users className="w-4 h-4 text-glow" />
                <span>Travelers: <b>{guestsCount} Person{guestsCount > 1 ? 's' : ''}</b></span>
              </div>
            </div>
          </div>

          {/* Pricing calculations details */}
          <div className="glass-card space-y-4 bg-surface/50">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Receipt className="w-4 h-4 text-accent" />
              <h4 className="font-extrabold text-xs text-light uppercase tracking-wider font-display">Payment Summary</h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-muted">
                <span>Room charges & Guided Tour</span>
                <span className="font-mono text-light font-semibold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>GST & Tourism Taxes (5%)</span>
                <span className="font-mono text-light font-semibold">₹{taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-3 text-sm font-black text-light">
                <span>Total Bill (INR)</span>
                <span className="font-mono text-accent">₹{totalBill.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Confirmation Dialog Overlay */}
      <AnimatePresence>
        {showConfirmModal && confirmedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-premium shadow-glass-lg text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full animate-pulse">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-light font-display">Booking Confirmed!</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Your ticket details and booking voucher code <b>#TNEST-{confirmedBooking.id}</b> have been registered.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl space-y-2 text-left text-xs text-muted border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="font-bold text-light">{confirmedBooking.destinationName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Departure:</span>
                  <span className="font-bold text-light">{confirmedBooking.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Travelers:</span>
                  <span className="font-bold text-light">{confirmedBooking.guestsCount} Guest(s)</span>
                </div>
                <div className="flex justify-between">
                  <span>Paid Amount:</span>
                  <span className="font-bold text-accent font-mono">₹{confirmedBooking.totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  navigate('/dashboard');
                }}
                className="w-full py-3 bg-accent hover:bg-accent/90 text-white font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-widest"
              >
                Go to Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Booking;
