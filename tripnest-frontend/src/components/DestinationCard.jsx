import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();

  // Price fallback derivation
  const price = destination.derivedPrice || 
    Math.round(2000 + (destination.rating * 1500) + ((destination.id || 1) * 850));

  const duration = destination.derivedDuration || "5 Days / 4 Nights";

  // Derive the exact Wikipedia page for Indian travel destinations
  const getWikipediaUrl = (name) => {
    let query = name;
    if (name.includes("Agra")) {
      query = "Taj Mahal";
    } else if (name.includes("Leh")) {
      query = "Ladakh";
    }
    const slug = encodeURIComponent(query.replace(/\s+/g, '_'));
    return `https://en.wikipedia.org/wiki/${slug}`;
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-2xl bg-surface/85 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between shadow-glass hover:shadow-glass-lg hover:border-accent/20 transition-all duration-300 group"
    >
      <div className="space-y-4">
        {/* Cover Image */}
        <div className="h-48 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 relative">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-semibold text-accent border border-slate-200 dark:border-slate-800 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-accent" />
            <span>{destination.country || "India"}</span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-extrabold text-base text-light truncate font-display group-hover:text-accent transition-colors" title={destination.name}>
              {destination.name}
            </h3>
            <div className="flex items-center gap-0.5 flex-shrink-0 bg-amber-500/10 px-2 py-0.5 rounded-lg text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-warning text-warning" />
              <span>{destination.rating?.toFixed(1) || "4.8"}</span>
            </div>
          </div>
          
          <span className="text-[10px] text-muted block font-semibold">{duration}</span>
          
          <p className="text-xs text-muted leading-relaxed line-clamp-3">
            {destination.description}
          </p>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-800 mt-5 pt-4">
        <div>
          <span className="text-[9px] text-muted block uppercase font-extrabold tracking-wider">Starts From</span>
          <span className="text-base font-extrabold font-mono text-accent">₹{price.toLocaleString()}</span>
        </div>
        
        <div className="flex gap-2">
          <a
            href={getWikipediaUrl(destination.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-hover/80 hover:bg-hover text-muted hover:text-light rounded-xl text-xs font-bold border border-white/5 transition-all text-center flex items-center justify-center gap-1"
            title="Read on Wikipedia"
          >
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span>Wiki</span>
          </a>
          <button
            onClick={() => navigate('/dashboard/create-trip', { state: { destination: destination.name } })}
            className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-glow active:scale-95"
          >
            Plan Trip
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
