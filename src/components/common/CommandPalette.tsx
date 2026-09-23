import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Compass,
  User,
  Zap,
  Bot,
  MapPin,
  ArrowRight,
  Command,
  X,
} from 'lucide-react';
import { DETAILED_COURSES } from '../../data/courseData';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Course' | 'Lesson' | 'Navigation' | 'Mission';
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Construct items list from courses, lessons, and pages
  const items: CommandItem[] = React.useMemo(() => {
    const list: CommandItem[] = [
      // Navigation
      {
        id: 'nav-catalog',
        title: 'Explore Course Catalog',
        subtitle: 'Browse all active learning tracks',
        category: 'Navigation',
        icon: <BookOpen className="w-4 h-4 text-nova-coral" />,
        action: () => navigate('/catalog'),
      },
      {
        id: 'nav-universe',
        title: 'Concept Universe Map',
        subtitle: 'Interactive 2D learning graph',
        category: 'Navigation',
        icon: <Compass className="w-4 h-4 text-purple-500" />,
        action: () => navigate('/universe'),
      },
      {
        id: 'nav-path',
        title: 'My Learning Path',
        subtitle: 'Personalized curriculum milestone progress',
        category: 'Navigation',
        icon: <MapPin className="w-4 h-4 text-emerald-500" />,
        action: () => navigate('/path'),
      },
      {
        id: 'nav-tutor',
        title: 'NOVA AI Learning Assistant',
        subtitle: 'Interactive tutor chat & practice session',
        category: 'Navigation',
        icon: <Bot className="w-4 h-4 text-amber-500" />,
        action: () => navigate('/tutor'),
      },
      {
        id: 'nav-profile',
        title: 'Learner Intelligence Profile',
        subtitle: 'Skill radar, XP metrics & achievements',
        category: 'Navigation',
        icon: <User className="w-4 h-4 text-indigo-500" />,
        action: () => navigate('/profile'),
      },
    ];

    // Add Detailed Courses
    Object.values(DETAILED_COURSES).forEach((course) => {
      list.push({
        id: `course-${course.id}`,
        title: course.title,
        subtitle: `${course.category} • ${course.duration} • By ${course.instructor}`,
        category: 'Course',
        icon: <BookOpen className="w-4 h-4 text-nova-coral" />,
        action: () => navigate(`/course/${course.id}`),
      });

      // Add Lessons inside course
      course.modules.forEach((mod) => {
        mod.lessons.forEach((les) => {
          list.push({
            id: `lesson-${les.id}`,
            title: les.title,
            subtitle: `In ${course.title} → ${mod.title} (${les.duration})`,
            category: 'Lesson',
            icon: <Zap className="w-4 h-4 text-emerald-500" />,
            action: () => {
              if (les.missionId) {
                navigate(`/mission/${les.missionId}`);
              } else {
                navigate(`/course/${course.id}`);
              }
            },
          });
        });
      });
    });

    return list;
  }, [navigate]);

  // Filter items based on query
  const filteredItems = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8); // top suggestions

    return items
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [items, query]);

  // Handle keyboard navigation inside search modal
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [filteredItems, selectedIndex, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md">
          {/* Backdrop click closes modal */}
          <div className="fixed inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative z-10 font-sans"
            onKeyDown={handleKeyDown}
          >
            {/* Command Input Bar Header */}
            <div className="relative border-b border-gray-100 dark:border-slate-800 p-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 ml-1" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search courses, lessons, skills, or navigate (⌘K)..."
                className="w-full bg-transparent text-sm sm:text-base font-bold text-nova-charcoal dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                  <Command className="w-3 h-3" /> K
                </span>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
                  aria-label="Close Command Palette"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Command Items List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-1 divide-y divide-gray-100 dark:divide-slate-800/60">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition ${
                        isSelected
                          ? 'bg-nova-coral/10 dark:bg-nova-coral/20 border-l-4 border-nova-coral'
                          : 'hover:bg-gray-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4
                            className={`text-xs sm:text-sm font-bold truncate ${
                              isSelected
                                ? 'text-nova-coral font-extrabold'
                                : 'text-nova-charcoal dark:text-slate-200'
                            }`}
                          >
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-md uppercase">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-4 h-4 text-nova-coral" />}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-slate-600 dark:text-slate-400">
                  No matching results for "{query}". Try searching for "React", "Design", or "AI".
                </div>
              )}
            </div>

            {/* Keyboard Controls Footer */}
            <div className="border-t border-gray-100 dark:border-slate-800 p-3 bg-gray-50 dark:bg-slate-900/80 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between items-center px-4 font-medium">
              <span className="flex items-center gap-3">
                <span><kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-slate-700">↑</kbd> <kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-slate-700">↓</kbd> Navigate</span>
                <span><kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-slate-700">↵</kbd> Select</span>
              </span>
              <span><kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-slate-700">ESC</kbd> Close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
