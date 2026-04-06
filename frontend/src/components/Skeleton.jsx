import React from 'react';

const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-sm ${className}`}></div>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 space-y-6">
      <Skeleton className="w-full aspect-[3/4] mb-4" />
      <div className="space-y-3">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-between items-end pt-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-10 w-1/4" />
      </div>
    </div>
  );
};

export const BannerSkeleton = () => {
  return (
    <div className="w-full h-[600px] bg-slate-50 dark:bg-slate-900 flex flex-col justify-center px-10 space-y-10">
       <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-20 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
       </div>
       <Skeleton className="h-14 w-48" />
    </div>
  );
};

export default Skeleton;
