import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="text-center mt-10">
      <div className="inline-flex items-center gap-3">
        <div className="w-8 h-8 border-4 border-t-transparent border-indigo-500 dark:border-indigo-400 rounded-full animate-spin"></div>
        <p className="text-lg text-slate-600 dark:text-slate-400">Crafting your personalized plan...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;