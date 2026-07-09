import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

const ErrorPage = ({ message = "Something went wrong while floating through your itinerary.", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6 glass-card border-danger/20 bg-danger/5 text-center max-w-lg mx-auto mt-12">
      <div className="p-4 bg-danger/10 text-danger rounded-full shadow-md animate-bounce">
        <AlertCircle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-light font-display">Adventure Interrupted</h3>
        <p className="text-muted text-sm max-w-sm leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-danger hover:bg-danger/80 text-white rounded-xl text-xs font-bold shadow-lg transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retry Request</span>
        </button>
      )}
    </div>
  );
};

export default ErrorPage;
