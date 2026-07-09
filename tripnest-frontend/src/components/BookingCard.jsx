import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Star, ArrowRight, ShieldCheck } from 'lucide-react';

const BookingCard = ({ destination }) => {
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const price = destination.derivedPrice || 9500;

  const handleProceed = () => {
    navigate(`/booking/${destination.id}?guests=${guests}&price=${price}`);
  };

  return (
    <div className="sticky top-24 rounded-premium p-6 bg-surface/90 border border-slate-200 dark:border-slate-800 shadow-glass-lg space-y-6">
      
      {/* Header Info */}
      <div className="flex justify-between items-baseline pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-[10px] text-muted block uppercase font-black">Starting At</span>
          <span className="text-2xl font-black font-display text-accent">₹{price.toLocaleString()}</span>
          <span className="text-[10px] text-muted font-semibold"> / traveler</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-lg">
          <Star className="w-3.5 h-3.5 fill-warning text-warning" />
          <span>{destination.rating || "4.8"}</span>
        </div>
      </div>

      {/* Date & Guests Selection */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-light block uppercase tracking-wider">Number of Guests</label>
          <div className="relative">
            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted" />
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-void border border-slate-200 dark:border-slate-800 text-xs text-light font-semibold focus:outline-none focus:border-accent"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} Traveler{i > 0 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pricing Breakdowns */}
      <div className="space-y-2 pt-2 text-xs">
        <div className="flex justify-between text-muted">
          <span>Base Price (₹{price.toLocaleString()} × {guests})</span>
          <span className="font-mono text-light font-semibold">₹{(price * guests).toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Local Taxes & Fees (5%)</span>
          <span className="font-mono text-light font-semibold">₹{Math.round(price * guests * 0.05).toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t border-slate-200 dark:border-slate-800 pt-3 text-sm font-extrabold text-light">
          <span>Estimated Total</span>
          <span className="font-mono text-accent">₹{Math.round(price * guests * 1.05).toLocaleString()}</span>
        </div>
      </div>

      {/* Call to Action Button */}
      <button
        onClick={handleProceed}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-accent to-glow text-white font-bold text-sm rounded-xl shadow-md hover:shadow-glow transition-all active:scale-95"
      >
        <span>Proceed to Booking</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Safe Guarantee */}
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted text-center pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Secure Booking & Instant Confirmation</span>
      </div>

    </div>
  );
};

export default BookingCard;
