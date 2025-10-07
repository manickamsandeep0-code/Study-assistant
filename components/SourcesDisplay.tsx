import React from 'react';
import type { Source } from '../types';
import { GlobeIcon, LinkIcon } from './IconComponents';

interface SourcesDisplayProps {
  sources: Source[];
}

const SourcesDisplay: React.FC<SourcesDisplayProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
        <GlobeIcon className="w-7 h-7 text-green-500 dark:text-green-400" />
        Sourced from the Web
      </h2>
      <div className="space-y-3">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-700 transition-colors duration-200 group"
            title={source.uri}
          >
            <LinkIcon className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-200 group-hover:text-indigo-500 dark:group-hover:text-indigo-400">{source.title}</p>
              <p className="text-xs text-slate-500 truncate">{source.uri}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SourcesDisplay;