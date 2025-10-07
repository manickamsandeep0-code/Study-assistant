import React from 'react';
import type { Resource } from '../types';
import { LinkIcon, VideoIcon, BookTextIcon, CodeIcon, LibraryIcon } from './IconComponents';

interface ResourceListProps {
  resources: Resource[];
}

const ResourceIcon: React.FC<{ type: Resource['type'] }> = ({ type }) => {
    switch (type) {
        case 'Video':
            return <VideoIcon className="w-5 h-5 text-red-500 dark:text-red-400" />;
        case 'Article':
            return <BookTextIcon className="w-5 h-5 text-sky-500 dark:text-sky-400" />;
        case 'Interactive Tutorial':
            return <CodeIcon className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />;
        case 'Documentation':
            return <LibraryIcon className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
        case 'Book':
            return <LibraryIcon className="w-5 h-5 text-purple-500 dark:text-purple-400" />;
        default:
            return <LinkIcon className="w-5 h-5 text-slate-400" />;
    }
};

const ResourceList: React.FC<ResourceListProps> = ({ resources }) => {
  if (!resources || resources.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
        <LibraryIcon className="w-7 h-7 text-amber-500 dark:text-amber-400" />
        Recommended Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-slate-100 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <ResourceIcon type={resource.type} />
              <h3 className="text-md font-semibold text-slate-800 dark:text-slate-200 truncate">{resource.title}</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{resource.description}</p>
            <span className="text-xs mt-3 inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Visit Resource <LinkIcon className="w-3 h-3"/>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;