import React from 'react';

interface ProgressBarProps {
  progress: number; // percentage from 0 to 100
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, size = 'md' }) => {
  const height = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  }[size];

  return (
    <div className={`w-full bg-gray-200 rounded-full dark:bg-gray-700 ${height}`}>
      <div
        className="bg-blue-500 rounded-full dark:bg-blue-400 transition-all duration-300 ease-in-out"
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%`, height: '100%' }}
      />
    </div>
  );
};

export default ProgressBar;
