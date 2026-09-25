import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Network,
  GitCommit,
  MessageSquareCode,
  User as UserIcon,
  Search,
  Flame,
  Sun,
  Moon,
  BookOpen,
  LogOut,
} from 'lucide-react';
import { Badge } from '../ui';
import { useGoal } from '../../context/GoalContext';
import { useAuth } from '../../context/AuthContext';
import { mockUser } from '../../mock/data';
import { CommandPalette } from '../common/CommandPalette';

const NAV_ITEMS = [
  { path: '/today', label: 'Today', icon: Sparkles },
  { path: '/catalog', label: 'Catalog', icon: BookOpen },
  { path: '/universe', label: 'My Universe', icon: Network },
  { path: '/path', label: 'Path', icon: GitCommit },
  { path: '/tutor', label: 'Tutor', icon: MessageSquareCode },
  { path: '/profile', label: 'Profile', icon: UserIcon },
];

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { targetGoal, theme, toggleTheme, userXP, userLevel } = useGoal();
  const { user, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Global Keyboard Shortcut: Cmd/Ctrl + K with Chromium e.preventDefault()
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); // Prevents Chrome/Edge URL omnibar focus!
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Body Scroll Lock when Command Palette is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  return (
    <div className="min-h-screen bg-nova-bg dark:bg-slate-950 text-nova-charcoal dark:text-slate-100 flex flex-col font-sans selection:bg-nova-lavender pb-20 md:pb-0 transition-colors duration-300">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 px-4 md:px-8 h-16 flex items-center justify-between shadow-xs">
        {/* Left: Brand Logo & Goal Badge */}
        <div className="flex items-center gap-4">
          <Link
            to="/today"
            aria-label="NOVA Learning Home"
            className="flex items-center gap-2 group min-h-[44px] min-w-[44px] cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-nova-charcoal dark:bg-slate-100 text-nova-coral dark:text-slate-900 flex items-center justify-center font-black text-sm transition-transform group-hover:scale-105">
              N
            </div>
            <span className="text-lg font-black text-nova-charcoal dark:text-slate-100 tracking-tight flex items-center gap-1">
              NOVA
              <span className="w-2 h-2 rounded-full bg-nova-coral inline-block" />
            </span>
          </Link>

          <div className="hidden sm:block">
            <Badge variant="lavender" className="text-xs font-semibold py-1 px-3">
              Goal: {targetGoal}
            </Badge>
          </div>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1 bg-nova-bg/90 dark:bg-slate-800/80 p-1 rounded-2xl border border-gray-200/80 dark:border-slate-700 shadow-inner"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                aria-label={`Navigate to ${item.label}`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 min-h-[44px] ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-nova-charcoal dark:text-white shadow-sm border border-gray-100 dark:border-slate-800'
                      : 'text-slate-600 dark:text-slate-300 hover:text-nova-charcoal dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Search, Theme Toggle & Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search modal (Command K)"
            className="relative hidden lg:flex items-center w-60 h-10 px-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-nova-bg dark:bg-slate-800 text-xs cursor-pointer focus:outline-none text-left font-medium min-h-[44px]"
          >
            <Search className="w-4 h-4 text-gray-400 dark:text-slate-400 mr-2 flex-shrink-0" />
            <span className="text-slate-500 dark:text-slate-300 truncate">Search concepts, nodes, or AI...</span>
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 px-1.5 py-0.5 rounded ml-auto">
              ⌘K
            </span>
          </button>

          {/* Theme Toggle Button (WCAG AA Accessible 44x44px Target) */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode theme' : 'Switch to dark mode theme'}
            className="w-11 h-11 rounded-2xl bg-nova-bg dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all hover:scale-105 min-h-[44px] min-w-[44px] cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600" />
            )}
          </button>

          {/* Profile Level & Avatar */}
          <Link
            to="/profile"
            aria-label="View user profile"
            className="flex items-center gap-2.5 bg-nova-bg dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-slate-700 px-3 py-1.5 rounded-2xl border border-gray-200 dark:border-slate-700 cursor-pointer transition-all hover:scale-105 min-h-[44px]"
          >
            <div className="flex items-center gap-1 text-xs font-bold text-nova-charcoal dark:text-slate-100">
              <Flame className="w-4 h-4 text-nova-coral fill-nova-coral" />
              <span className="hidden sm:inline">Lvl {userLevel}</span>
              <span className="text-slate-500 dark:text-slate-300 text-[10px]">• {userXP} XP</span>
            </div>

            <img
              src={user?.avatarUrl || mockUser.avatarUrl}
              alt={`Avatar of ${user?.name || mockUser.name}`}
              loading="lazy"
              decoding="async"
              className="w-7 h-7 rounded-full object-cover border border-gray-300 dark:border-slate-600"
            />
          </Link>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            aria-label="Sign out of your account"
            title="Sign Out"
            className="w-11 h-11 rounded-2xl bg-nova-bg dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/50 border border-gray-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 flex items-center justify-center transition-all hover:scale-105 min-h-[44px] min-w-[44px] cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Navigation Bottom Bar (<768px) with 44x44px Touch Targets */}
      <nav
        aria-label="Mobile bottom navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-slate-800 px-4 py-1.5 flex items-center justify-around shadow-2xl"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              aria-label={`Navigate to ${item.label}`}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px] px-3 rounded-xl transition-all ${
                  isActive
                    ? 'text-nova-coral font-bold scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:text-nova-charcoal font-medium'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Command Palette Modal (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};


