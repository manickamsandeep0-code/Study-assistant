import React from 'react';
import type { HistoryItem, StudyDay } from '../types';
import { HistoryIcon, TrashIcon } from './IconComponents';

interface HistorySidebarProps {
  history: HistoryItem[];
  selectedPlanId: string | null;
  onSelectPlan: (id: string) => void;
  onClearHistory: () => void;
  isVisible: boolean;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, selectedPlanId, onSelectPlan, onClearHistory, isVisible }) => {
    
    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    const calculateProgress = (studyPlan: StudyDay[]) => {
        const studyTasks = studyPlan.filter(day => !day.isBreak);
        const totalTasks = studyTasks.length;
        const completedTasks = studyTasks.filter(day => day.completed).length;
        return { completed: completedTasks, total: totalTasks };
    };

  return (
    <aside className={`absolute md:relative z-10 w-full md:w-64 lg:w-72 bg-slate-100/80 dark:bg-slate-950/80 md:bg-slate-100/60 dark:md:bg-slate-950/60 backdrop-blur-md border-r border-slate-200 dark:border-slate-800 flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <HistoryIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Study History</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {history.length > 0 ? (
          <nav className="p-2 space-y-1">
            {history.map((item) => {
              const { completed, total } = calculateProgress(item.response.studyPlan);
              const progressPercentage = total > 0 ? (completed / total) * 100 : 0;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectPlan(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-150 ${
                    selectedPlanId === item.id
                      ? 'bg-indigo-500 text-white dark:bg-indigo-600/50'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/70 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <p className="text-sm font-medium truncate">{item.goal}</p>
                  
                  {total > 0 && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="w-full bg-slate-300/70 dark:bg-slate-700 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            selectedPlanId === item.id ? 'bg-white' : 'bg-emerald-500 dark:bg-emerald-400'
                          }`}
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-mono flex-shrink-0 ${
                          selectedPlanId === item.id ? 'text-indigo-100 dark:text-indigo-200' : 'text-slate-500'
                      }`}>
                          {completed}/{total}
                      </span>
                    </div>
                  )}

                  <p className={`text-xs mt-1 ${ selectedPlanId === item.id ? 'text-indigo-100 dark:text-indigo-200' : 'text-slate-500'}`}>{formatDate(item.timestamp.toString())}</p>
                </button>
              )
            })}
          </nav>
        ) : (
          <div className="p-4 text-center text-slate-500 text-sm">
            <p>Your generated study plans will appear here.</p>
          </div>
        )}
      </div>
      {history.length > 0 && (
          <div className="p-2 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={onClearHistory}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-500 dark:text-slate-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-600 dark:hover:text-red-300 transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
              <span>Clear History</span>
            </button>
          </div>
      )}
    </aside>
  );
};

export default HistorySidebar;