import React from 'react';

const LoadingSpinner = ({ message = "Loading the adventure..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4 transition-all duration-300">
      <div className="relative w-12 h-12">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
        {/* Inner Pulsing Core */}
        <div className="absolute inset-2.5 rounded-full bg-glow/30 animate-ping" />
      </div>
      <span className="text-muted text-sm font-semibold animate-pulse tracking-wide">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
