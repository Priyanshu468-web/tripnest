import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PackageCard = ({ pkg, destinationId }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/booking/${destinationId}?pkgId=${pkg.id}&price=${pkg.price}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-premium bg-surface/90 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-glass hover:shadow-glass-lg hover:border-accent/30 transition-all duration-300 relative overflow-hidden"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h3 className="font-extrabold text-lg text-light font-display">
              {pkg.name}
            </h3>
            <div className="flex items-center gap-4 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>{pkg.duration}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-glow" />
                <span>Max 8 Guests</span>
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted leading-relaxed">
          {pkg.description}
        </p>

        {/* Highlights bullets */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] text-light font-extrabold uppercase tracking-wider block">Package Highlights</span>
          <ul className="space-y-1.5">
            {pkg.highlights.slice(0, 3).map((hl, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted">
                <div className="p-0.5 bg-emerald-500/10 text-emerald-500 rounded-full mt-0.5">
                  <Check className="w-3 h-3" />
                </div>
                <span className="leading-tight">{hl}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-800 mt-6 pt-4">
        <div>
          <span className="text-[9px] text-muted block uppercase font-extrabold tracking-wider">Per Person</span>
          <span className="text-xl font-black font-mono text-accent">₹{pkg.price.toLocaleString()}</span>
        </div>
        <button
          onClick={handleBookClick}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent to-glow text-white font-bold text-xs rounded-xl shadow-md hover:shadow-glow transition-all active:scale-95"
        >
          <span>Book Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};

export default PackageCard;
