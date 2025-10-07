import React from 'react';
import { HeartPulseIcon } from './IconComponents';

interface WellnessTipsProps {
  tips: string[];
}

const WellnessTips: React.FC<WellnessTipsProps> = ({ tips }) => {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
        <HeartPulseIcon className="w-7 h-7 text-pink-500 dark:text-pink-400" />
        Wellness Corner
      </h2>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="text-pink-500 dark:text-pink-400 mt-1">&#x2713;</span>
            <p className="text-slate-700 dark:text-slate-300">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WellnessTips;