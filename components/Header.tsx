import React, { useEffect, useRef, useState } from 'react';
import { GraduationCapIcon, MenuIcon, XIcon, LogOutIcon, SunIcon, MoonIcon } from './IconComponents';
import type { UserProfile } from '../types';

// Extend window type to include google object from GSI script
declare global {
  interface Window {
    google?: any;
  }
}

interface HeaderProps {
    isHistoryVisible: boolean;
    onToggleHistory: () => void;
    user: UserProfile | null;
    onLoginSuccess: (response: any) => void;
    onLogout: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isHistoryVisible, onToggleHistory, user, onLoginSuccess, onLogout, theme, onToggleTheme }) => {
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;


  useEffect(() => {
    // If user is logged in, the ref is not attached, or client ID is missing, do nothing.
    if (user || !googleButtonRef.current || !GOOGLE_CLIENT_ID) return;

    // Check if the Google Identity Services script has loaded.
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: onLoginSuccess,
      });
      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        { 
            theme: theme === 'dark' ? 'filled_black' : 'outline', 
            size: 'medium', 
            text: 'continue_with', 
            shape: 'pill'
        }
      );
      // Optional: display one-tap login prompt
      // window.google.accounts.id.prompt(); 
    }
  }, [user, onLoginSuccess, GOOGLE_CLIENT_ID, theme]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700/50 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <GraduationCapIcon className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
              Schedule GPT 2.0
            </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <SunIcon className="w-5 h-5 text-amber-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Auth Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(prev => !prev)} className="flex items-center gap-2 rounded-full p-1 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors">
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg py-1 z-30">
                  <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            GOOGLE_CLIENT_ID && <div ref={googleButtonRef} style={{ display: 'inline-block' }}></div>
          )}
          {/* History Toggle for Mobile */}
          <button
              onClick={onToggleHistory}
              className="md:hidden p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle history panel"
          >
              {isHistoryVisible ? <XIcon className="w-6 h-6"/> : <MenuIcon className="w-6 h-6"/>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;