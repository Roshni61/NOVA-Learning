import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  X,
  Clock,
  Sparkles,
  Check,
} from 'lucide-react';
import { Badge } from '../ui';
import { useCourseProgress } from '../../hooks';

export interface LessonItem {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked?: boolean;
  videoUrl?: string;
  type?: 'video' | 'quiz' | 'exercise';
}

export interface CurriculumModule {
  id: string;
  title: string;
  lessons: LessonItem[];
}

interface CurriculumDrawerProps {
  courseId?: string;
  modules: CurriculumModule[];
  activeLessonId: string;
  onSelectLesson: (lesson: LessonItem) => void;
  contentRef?: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Accessible Collapsible Curriculum Drawer for mobile (<768px) and desktop sidebar.
 * Touch targets >= 44x44px, explicit aria-labels, auto-closes drawer on mobile and
 * scrolls content viewport into view smoothly, with centralized useCourseProgress sync.
 */
export const CurriculumDrawer: React.FC<CurriculumDrawerProps> = ({
  courseId = 'c_101',
  modules,
  activeLessonId,
  onSelectLesson,
  contentRef,
  isOpen,
  onClose,
}) => {
  const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({});
  const { isLessonCompleted, toggleLessonComplete, getCourseCompletion } = useCourseProgress();

  const toggleModule = (modId: string) => {
    setCollapsedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleLessonClicked = (lesson: LessonItem) => {
    if (lesson.locked) return;
    onSelectLesson(lesson);
    // 1. Close mobile drawer on selection
    onClose();
    // 2. Smoothly scroll content/video viewport into view
    if (contentRef && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  // Compute completed count considering hook persistence
  const completedCount = modules.reduce(
    (acc, m) =>
      acc +
      m.lessons.filter((l) => l.completed || isLessonCompleted(courseId, l.id)).length,
    0
  );

  const dynamicProgressPct = getCourseCompletion(courseId, totalLessons) || Math.round((completedCount / (totalLessons || 1)) * 100);

  const drawerContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 text-nova-charcoal dark:text-slate-100 font-sans">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-slate-800 bg-nova-bg dark:bg-slate-950 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="lavender" className="gap-1 text-[10px]">
              <BookOpen className="w-3 h-3" /> Course Syllabus
            </Badge>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              {completedCount}/{totalLessons} Lessons
            </span>
          </div>
          <h2 className="text-base font-black text-nova-charcoal dark:text-slate-100">
            Curriculum & Lessons
          </h2>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          aria-label="Close syllabus drawer"
          className="p-3 rounded-2xl hover:bg-gray-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center md:hidden cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="p-4 bg-purple-50/70 dark:bg-purple-950/40 border-b border-purple-100 dark:border-purple-900/60 space-y-1.5">
        <div className="flex justify-between text-xs font-bold text-purple-950 dark:text-purple-200">
          <span>Course Completion</span>
          <span>{dynamicProgressPct}%</span>
        </div>
        <div className="w-full bg-purple-200/80 dark:bg-purple-900/80 h-2 rounded-full overflow-hidden">
          <div
            className="bg-nova-coral h-full rounded-full transition-all duration-500"
            style={{ width: `${dynamicProgressPct}%` }}
          />
        </div>
      </div>

      {/* Modules & Lesson List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {modules.map((mod, modIdx) => {
          const isCollapsed = !!collapsedModules[mod.id];
          const modCompleted = mod.lessons.every(
            (l) => l.completed || isLessonCompleted(courseId, l.id)
          );

          return (
            <div
              key={mod.id}
              className="border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs"
            >
              {/* Module Header Toggle Button */}
              <button
                onClick={() => toggleModule(mod.id)}
                aria-label={`Toggle module: ${mod.title}`}
                className="w-full p-4 text-left bg-nova-bg dark:bg-slate-850 flex items-center justify-between transition-all min-h-[44px] hover:bg-purple-50/50 dark:hover:bg-slate-800 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                      modCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300'
                    }`}
                  >
                    {modIdx + 1}
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-nova-charcoal dark:text-slate-100">
                      {mod.title}
                    </h3>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold">
                      {mod.lessons.length} lessons
                    </span>
                  </div>
                </div>

                <div className="p-2 text-slate-500 dark:text-slate-400">
                  {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </div>
              </button>

              {/* Lesson Items */}
              {!isCollapsed && (
                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    const isDone = lesson.completed || isLessonCompleted(courseId, lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        className={`w-full p-3.5 flex items-center justify-between transition-all min-h-[44px] ${
                          isActive
                            ? 'bg-purple-50 dark:bg-purple-950/60 border-l-4 border-nova-coral dark:border-nova-coral'
                            : lesson.locked
                            ? 'opacity-50 bg-gray-50 dark:bg-slate-900/40'
                            : 'hover:bg-gray-50 dark:hover:bg-slate-800/80'
                        }`}
                      >
                        <button
                          onClick={() => handleLessonClicked(lesson)}
                          disabled={lesson.locked}
                          aria-label={`Select lesson: ${lesson.title}. ${
                            isDone ? 'Completed' : lesson.locked ? 'Locked' : 'Available'
                          }`}
                          className="flex-1 text-left flex items-center gap-3 cursor-pointer"
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          ) : lesson.locked ? (
                            <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          ) : isActive ? (
                            <Sparkles className="w-4 h-4 text-nova-coral animate-pulse flex-shrink-0" />
                          ) : (
                            <PlayCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                          )}

                          <div className="space-y-0.5">
                            <div
                              className={`text-xs ${
                                isActive
                                  ? 'font-black text-nova-coral dark:text-nova-coral'
                                  : 'font-semibold text-nova-charcoal dark:text-slate-200'
                              }`}
                            >
                              {lesson.title}
                            </div>
                            <div className="text-[10px] text-slate-600 dark:text-slate-300 font-semibold flex items-center gap-1">
                              <Clock className="w-3 h-3 text-nova-coral" />
                              {lesson.duration}
                            </div>
                          </div>
                        </button>

                        <div className="flex items-center gap-2">
                          {/* Toggle Completion Checkbox */}
                          {!lesson.locked && (
                            <button
                              onClick={() => toggleLessonComplete(courseId, lesson.id)}
                              aria-label={`Toggle completion for ${lesson.title}`}
                              className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                                isDone
                                  ? 'bg-emerald-500 border-emerald-500 text-white'
                                  : 'border-gray-300 dark:border-slate-600 hover:border-nova-coral bg-white dark:bg-slate-800'
                              }`}
                            >
                              {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>
                          )}

                          {isActive && (
                            <span className="text-[10px] font-black uppercase tracking-wider text-nova-coral bg-rose-50 dark:bg-rose-950/80 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Slide-Over Sheet (<768px) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-over Drawer Sheet */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-sm"
              >
                {drawerContent}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Sidebar (>= 768px) */}
      <div className="hidden md:block w-full h-full rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 shadow-sm">
        {drawerContent}
      </div>
    </>
  );
};
