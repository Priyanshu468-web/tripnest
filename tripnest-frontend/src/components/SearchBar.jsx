import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ search, setSearch, placeholder = "Search destinations by name or country..." }) => {
  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-surface/50 border border-slate-200 dark:border-slate-800 text-xs text-light placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all duration-200"
      />
      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-light transition-colors"
          type="button"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
