import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const CardSkeleton = () => (
    <div className="glass-card animate-pulse space-y-4">
      {/* Image Stub */}
      <div className="h-48 w-full rounded-xl bg-slate-300 dark:bg-slate-700/50" />
      {/* Title & Rating */}
      <div className="space-y-2">
        <div className="h-4 w-2/3 rounded bg-slate-300 dark:bg-slate-700/50" />
        <div className="h-3 w-1/3 rounded bg-slate-300 dark:bg-slate-700/50" />
      </div>
      {/* Description */}
      <div className="space-y-1.5 pt-2">
        <div className="h-3 w-full rounded bg-slate-300 dark:bg-slate-700/50" />
        <div className="h-3 w-5/6 rounded bg-slate-300 dark:bg-slate-700/50" />
      </div>
      {/* Footer / Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="h-5 w-1/4 rounded bg-slate-300 dark:bg-slate-700/50" />
        <div className="h-8 w-1/3 rounded bg-slate-300 dark:bg-slate-700/50" />
      </div>
    </div>
  );

  const DetailsSkeleton = () => (
    <div className="animate-pulse space-y-6">
      {/* Large Hero stub */}
      <div className="h-96 w-full rounded-2xl bg-slate-300 dark:bg-slate-700/50" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 w-1/2 rounded bg-slate-300 dark:bg-slate-700/50" />
          <div className="h-4 w-1/4 rounded bg-slate-300 dark:bg-slate-700/50" />
          <div className="space-y-2 pt-4">
            <div className="h-3 w-full rounded bg-slate-300 dark:bg-slate-700/50" />
            <div className="h-3 w-full rounded bg-slate-300 dark:bg-slate-700/50" />
            <div className="h-3 w-4/5 rounded bg-slate-300 dark:bg-slate-700/50" />
          </div>
        </div>
        <div className="h-64 rounded-2xl bg-slate-300 dark:bg-slate-700/50" />
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="flex gap-4 p-4 bg-slate-100 dark:bg-slate-800/40 rounded-xl">
          <div className="w-16 h-16 rounded-lg bg-slate-300 dark:bg-slate-700/50 flex-shrink-0" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 w-1/3 rounded bg-slate-300 dark:bg-slate-700/50" />
            <div className="h-3 w-2/3 rounded bg-slate-300 dark:bg-slate-700/50" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={type === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'w-full'}>
      {type === 'card' && [...Array(count)].map((_, i) => <CardSkeleton key={i} />)}
      {type === 'details' && <DetailsSkeleton />}
      {type === 'list' && <ListSkeleton />}
    </div>
  );
};

export default SkeletonLoader;
