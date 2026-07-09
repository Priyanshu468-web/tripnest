import React from 'react';
import { Star, User } from 'lucide-react';

const ReviewCard = ({ review }) => {
  return (
    <div className="p-5 rounded-premium bg-surface/70 border border-slate-200 dark:border-slate-800 shadow-glass space-y-4">
      {/* Reviewer Meta */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-black">
            {review.authorName ? review.authorName.split(' ').map(n => n[0]).join('').toUpperCase() : <User className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-light font-display">{review.authorName}</h4>
            <span className="text-[10px] text-muted block">Travel Date: {review.travelDate || "Recent"}</span>
          </div>
        </div>
        
        {/* Rating Stars */}
        <div className="flex items-center gap-0.5 bg-amber-500/10 px-2 py-0.5 rounded-lg text-amber-600 dark:text-amber-400 font-bold text-xs">
          <Star className="w-3.5 h-3.5 fill-warning text-warning" />
          <span>{review.rating?.toFixed(1) || "5.0"}</span>
        </div>
      </div>

      {/* Review Content */}
      <p className="text-xs text-muted leading-relaxed italic">
        "{review.comment}"
      </p>
    </div>
  );
};

export default ReviewCard;
