import React from 'react';
import { Star, SlidersHorizontal, IndianRupee } from 'lucide-react';

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  categoriesList = [],
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  maxPrice = 30000
}) => {
  return (
    <div className="glass-card space-y-6">
      {/* Title */}
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <SlidersHorizontal className="w-4 h-4 text-accent" />
        <h4 className="font-extrabold text-sm text-light font-display">Filters</h4>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <span className="text-[10px] text-light font-extrabold uppercase tracking-wider block">Category</span>
        <div className="flex flex-wrap gap-1.5">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedCategory === cat
                  ? 'bg-accent/15 border-accent text-accent shadow-[0_0_10px_rgba(37,99,235,0.1)]'
                  : 'bg-void border-slate-200 dark:border-slate-800 text-muted hover:text-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Max Budget Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-light font-extrabold uppercase tracking-wider">Max Budget</span>
          <span className="text-xs font-bold text-accent font-mono">₹{priceRange.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="2000"
          max={maxPrice}
          step="500"
          value={priceRange}
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
          className="w-full accent-accent bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-muted font-mono">
          <span>₹2K</span>
          <span>₹{Math.round(maxPrice / 1000)}K</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <span className="text-[10px] text-light font-extrabold uppercase tracking-wider block">Min Rating</span>
        <div className="grid grid-cols-5 gap-1">
          {[0, 3, 4, 4.5, 4.8].map((rate) => (
            <button
              key={rate}
              onClick={() => setMinRating(rate)}
              className={`py-1.5 rounded-lg text-[10px] font-extrabold border transition-all ${
                minRating === rate
                  ? 'bg-accent border-accent text-white shadow-md'
                  : 'bg-void border-slate-200 dark:border-slate-800 text-muted hover:text-light'
              }`}
            >
              {rate === 0 ? 'All' : `${rate}★`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
