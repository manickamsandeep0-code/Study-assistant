import React from 'react';
import type { StudyDay } from '../types';
import { BookOpenIcon, CoffeeIcon, CalendarDaysIcon, CheckCircleIcon } from './IconComponents';

interface StudyPlanDisplayProps {
  plan: StudyDay[];
  onToggleCompletion: (index: number) => void;
}

const StudyPlanDisplay: React.FC<StudyPlanDisplayProps> = ({ plan, onToggleCompletion }) => {
  if (!plan || plan.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
        <CalendarDaysIcon className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
        Your Personalized Study Plan
      </h2>
      <div className="relative border-l-2 border-slate-300 dark:border-slate-600 ml-4 pl-8 space-y-8">
        {plan.map((item, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[3.2rem] top-1 h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center">
              {item.isBreak ? (
                <CoffeeIcon className="w-5 h-5 text-teal-500 dark:text-teal-400" />
              ) : item.completed ? (
                <CheckCircleIcon className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              ) : (
                <BookOpenIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              )}
            </div>
            <div className={`p-4 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors duration-200 ${item.completed ? 'bg-slate-100/50 dark:bg-slate-800/50' : 'bg-slate-100 dark:bg-slate-800'}`}>
              <div className="flex justify-between items-start gap-4">
                  <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Day {item.day} &bull; {item.duration}</p>
                      <h3 className={`text-lg font-semibold mt-1 ${
                          item.isBreak ? 'text-teal-500 dark:text-teal-400' : 'text-slate-800 dark:text-slate-100'
                        } ${
                          item.completed ? 'line-through text-slate-500 dark:text-slate-400' : ''
                        }`}>
                          {item.topic}
                      </h3>
                  </div>
                  {!item.isBreak && (
                    <div className="flex items-center flex-shrink-0 pt-1">
                       <input
                          type="checkbox"
                          checked={!!item.completed}
                          onChange={() => onToggleCompletion(index)}
                          className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 border-slate-400 dark:border-slate-500 text-indigo-500 focus:ring-indigo-600 cursor-pointer"
                          aria-label={`Mark '${item.topic}' as complete`}
                       />
                    </div>
                  )}
              </div>
              <p className={`mt-2 text-slate-600 dark:text-slate-300 transition-colors duration-200 ${item.completed ? 'text-slate-400 dark:text-slate-500' : ''}`}>{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyPlanDisplay;