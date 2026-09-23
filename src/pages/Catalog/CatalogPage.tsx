import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  XCircle,
  RotateCcw,
  BookOpen,
  SlidersHorizontal,
  SearchX,
  RefreshCw,
} from 'lucide-react';
import { Button, Badge } from '../../components/ui';
import { CourseCard } from '../../components/lms';
import { mockCourses } from '../../mock/data';
import { useDebounce, useCourseProgress } from '../../hooks';
import type { Course } from '../../types';

const CATEGORIES = ['All', 'Engineering', 'Design', 'Artificial Intelligence', 'Foundations'];

export const CatalogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'lessons' | 'title'>('rating');

  // Debounce search input by 300ms to avoid expensive recalculations on every single keypress
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { getCourseCompletion, syncWithDatabase, isSyncing, lastSyncedAt } = useCourseProgress();

  // Filter courses deterministically based on debounced search and selected category
  const filteredCourses = useMemo(() => {
    return mockCourses
      .filter((course) => {
        const matchesCategory =
          selectedCategory === 'All' ||
          course.category.toLowerCase() === selectedCategory.toLowerCase();

        const query = debouncedSearchTerm.trim().toLowerCase();
        const matchesQuery =
          query === '' ||
          course.title.toLowerCase().includes(query) ||
          (course.description || '').toLowerCase().includes(query) ||
          (course.instructor || '').toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query);

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'lessons') return b.lessonsCount - a.lessonsCount;
        return a.title.localeCompare(b.title);
      });
  }, [debouncedSearchTerm, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  const isFiltered = searchTerm.trim() !== '' || selectedCategory !== 'All';

  return (
    <div className="space-y-8 font-sans max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-nova-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="coral" className="gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              NOVA Learning Catalog
            </Badge>
            {lastSyncedAt && (
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                Synced {new Date(lastSyncedAt).toLocaleTimeString()}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-nova-charcoal dark:text-slate-100">
            Explore Course Curriculum & Tracks
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium max-w-2xl">
            Adaptive, module-driven learning courses synced with your personal Learning Twin roadmap.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => syncWithDatabase()}
            disabled={isSyncing}
            aria-label="Sync course progress to database"
            className="text-xs font-bold gap-1.5 border border-gray-200 dark:border-slate-700 min-h-[44px]"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-purple-600 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing DB...' : 'Sync Cloud State'}
          </Button>
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* 300ms Debounced Search Bar Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses by title, instructor, or keywords... (300ms debounced)"
              aria-label="Search courses by title, instructor, or keywords"
              className="w-full pl-11 pr-10 py-3 bg-nova-bg dark:bg-slate-850 rounded-2xl border border-gray-200 dark:border-slate-700 text-xs font-semibold text-nova-charcoal dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-nova-coral min-h-[44px]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                aria-label="Clear search query input"
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'lessons' | 'title')}
              aria-label="Sort courses by criteria"
              className="bg-nova-bg dark:bg-slate-800 text-xs font-bold text-nova-charcoal dark:text-slate-100 py-2 px-3 rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none cursor-pointer min-h-[44px]"
            >
              <option value="rating">Top Rated</option>
              <option value="lessons">Lesson Count</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-label={`Filter catalog by category: ${cat}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-nova-coral to-rose-500 text-white shadow-md glow-coral scale-105'
                    : 'bg-nova-bg dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              aria-label="Reset catalog search and category filters"
              className="ml-auto text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 min-h-[44px] cursor-pointer px-2"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 px-2">
        <span>
          Showing {filteredCourses.length} of {mockCourses.length} courses
          {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </span>
      </div>

      {/* Course Grid OR Empty State */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course: Course) => {
            // Read dynamic calculated progress from useCourseProgress hook
            const dynamicProgress = getCourseCompletion(course.id, course.lessonsCount);
            const courseWithLiveProgress: Course = {
              ...course,
              progress: dynamicProgress > 0 ? dynamicProgress : course.progress,
            };

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CourseCard course={courseWithLiveProgress} />
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Dedicated "No matching courses found" Graphic & Action */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-slate-900 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-6 max-w-xl mx-auto shadow-sm my-8"
        >
          {/* Visual Illustration Icon Stack */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-nova-coral/15 dark:bg-rose-950/40 rounded-3xl animate-pulse" />
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/60 text-nova-coral rounded-2xl flex items-center justify-center shadow-md relative z-10">
              <SearchX className="w-8 h-8" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-black text-nova-charcoal dark:text-slate-100">
              No matching courses found
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-md mx-auto">
              We couldn't find any courses matching{' '}
              <strong className="text-nova-charcoal dark:text-slate-200">
                "{debouncedSearchTerm || selectedCategory}"
              </strong>
              . Try adjusting your search query or reset category filters.
            </p>
          </div>

          <div className="pt-2">
            <Button
              variant="coral"
              size="md"
              onClick={handleResetFilters}
              aria-label="Reset all search filters and category selections"
              className="gap-2 font-bold text-xs mx-auto shadow-nova-soft min-h-[44px]"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Filters
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CatalogPage;
