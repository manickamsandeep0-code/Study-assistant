import React from 'react';
import type { HistoryItem } from '../types';
import ProgressBar from './ProgressBar';

interface ChatHistoryProps {
  history: HistoryItem[];
  selectedPlanId: string | null;
  onSelectPlan: (id: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ history, selectedPlanId, onSelectPlan }) => {
  const calculateProgress = (studyPlan: any[]) => {
    if (!studyPlan || studyPlan.length === 0) return 0;
    
    const nonBreakItems = studyPlan.filter(item => !item.isBreak);
    if (nonBreakItems.length === 0) return 0;
    
    const completedItems = nonBreakItems.filter(item => item.completed);
    return Math.round((completedItems.length / nonBreakItems.length) * 100);
  };

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Chat History
        </h2>
        <div className="space-y-2">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectPlan(item.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedPlanId === item.id
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                {item.goal}
              </div>
              <div className="mt-2 mb-1">
                <ProgressBar
                  progress={calculateProgress(item.response.studyPlan)}
                  size="sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.timestamp).toLocaleDateString()}
                </div>
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {`${calculateProgress(item.response.studyPlan)}%`}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;