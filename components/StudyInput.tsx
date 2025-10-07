import React, { useState } from 'react';
import { WandSparklesIcon } from './IconComponents';

interface StudyInputProps {
  onGenerate: (goal: string) => void;
  isLoading: boolean;
}

const StudyInput: React.FC<StudyInputProps> = ({ onGenerate, isLoading }) => {
  const [goal, setGoal] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim() && !isLoading) {
      onGenerate(goal);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <form onSubmit={handleSubmit}>
        <label htmlFor="study-goal" className="block text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
          What's your learning objective?
        </label>
        <textarea
          id="study-goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., 'Master React Hooks in one week' or 'Prepare for my Calculus II final in 10 days'"
          className="w-full h-28 p-3 bg-slate-50 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-none placeholder-slate-400 dark:placeholder-slate-500 text-slate-800 dark:text-slate-200"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !goal.trim()}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-indigo-700 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition duration-200"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              <span>Generating Plan...</span>
            </>
          ) : (
            <>
              <WandSparklesIcon className="w-5 h-5" />
              <span>Create My Plan</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StudyInput;