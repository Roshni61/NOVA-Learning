import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Network,
  GitCommit,
  MessageSquareCode,
  User as UserIcon,
  Search,
  Flame,
} from 'lucide-react';
import { Badge } from '../ui';
import { useGoal } from '../../context/GoalContext';
import { mockUser } from '../../mock/data';
import { GlobalSearchModal } from './GlobalSearchModal';

const NAV_ITEMS = [
  { path: '/today', label: 'Today', icon: Sparkles },
  { path: '/universe', label: 'My Universe', icon: Network },
  { path: '/path', label: 'Path', icon: GitCommit },
  { path: '/tutor', label: 'Tutor', icon: MessageSquareCode },
  { path: '/profile', label: 'Profile', icon: UserIcon },
];

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const { targetGoal, streak } = useGoal();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-nova-bg text-nova-charcoal flex flex-col font-sans selection:bg-nova-lavender pb-20 md:pb-0">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-gray-200/60 px-4 md:px-8 h-16 flex items-center justify-between shadow-xs">
        {/* Left: Brand Logo & Goal Badge */}
        <div className="flex items-center gap-4">
          <Link to="/today" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-nova-charcoal flex items-center justify-center text-nova-coral font-black text-sm transition-transform group-hover:scale-105">
              N
            </div>
            <span className="text-lg font-black text-nova-charcoal tracking-tight flex items-center gap-1">
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
        <nav className="hidden md:flex items-center gap-1 bg-nova-bg/90 p-1 rounded-2xl border border-gray-200/80 shadow-inner">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-nova-charcoal shadow-sm border border-gray-100'
                      : 'text-nova-muted hover:text-nova-charcoal hover:bg-white/50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Search & Profile Avatar */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div
            onClick={() => setIsSearchOpen(true)}
            className="relative hidden lg:flex items-center w-64 cursor-pointer"
          >
            <Search className="w-4 h-4 text-gray-400 absolute left-3" />
            <input
              type="text"
              readOnly
              placeholder="Search concepts, nodes, or ask AI..."
              className="w-full pl-9 pr-12 py-1.5 rounded-xl border border-gray-200 bg-nova-bg text-xs cursor-pointer focus:outline-none font-medium"
            />
            <span className="text-[9px] font-black text-nova-muted bg-white border border-gray-200 px-1.5 py-0.5 rounded absolute right-2">
              ⌘K
            </span>
          </div>

          {/* Profile Level & Avatar */}
          <Link
            to="/profile"
            className="flex items-center gap-2.5 bg-nova-bg hover:bg-purple-50 px-3 py-1.5 rounded-2xl border border-gray-200 cursor-pointer transition-all hover:scale-105"
          >
            <div className="flex items-center gap-1 text-xs font-bold text-nova-charcoal">
              <Flame className="w-4 h-4 text-nova-coral fill-nova-coral" />
              <span>Level 4</span>
              <span className="text-nova-muted text-[10px]">• {streak} Days</span>
            </div>

            <img
              src={mockUser.avatarUrl}
              alt={mockUser.name}
              className="w-7 h-7 rounded-full object-cover border border-gray-300"
            />
          </Link>
        </div>
      </header>

      {/* Main Content Area with Animated Page Transition */}
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

      {/* Mobile Navigation Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-4 py-2 flex items-center justify-around shadow-2xl">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                  isActive ? 'text-nova-coral font-bold scale-105' : 'text-nova-muted font-medium'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
      {/* Global AI Command Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};
