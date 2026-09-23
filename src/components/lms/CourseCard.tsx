import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Star, ArrowRight } from 'lucide-react';
import { Card, Badge, CourseCardSkeleton } from '../ui';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  isLoading?: boolean;
  onSelect?: (courseId: string) => void;
}

/**
 * Course Card component with aspect-video thumbnail, skeleton loading state,
 * 44x44px touch targets, and WCAG AA high-contrast dark mode support.
 */
export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isLoading = false,
  onSelect,
}) => {
  if (isLoading) {
    return <CourseCardSkeleton />;
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 space-y-4 rounded-3xl shadow-nova-soft hover:shadow-xl dark:shadow-slate-950/50 transition-all">
        {/* Aspect Ratio Thumbnail Container (CLS Prevention) */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden relative bg-slate-900 border border-gray-100 dark:border-slate-800">
          <img
            src={course.thumbnail}
            alt={course.title}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="lavender" className="text-[10px] font-bold shadow-sm">
              {course.category}
            </Badge>
          </div>
        </div>

        {/* Header & Instructor */}
        <div className="space-y-1.5">
          <h3 className="text-base font-extrabold text-nova-charcoal dark:text-slate-100 leading-snug line-clamp-1">
            {course.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* Stats Row: Lessons, Duration & Rating */}
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-medium pt-1">
          <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
            <BookOpen className="w-3.5 h-3.5 text-nova-coral" />
            {course.lessonsCount} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {course.rating}
          </span>
        </div>

        {/* Progress Bar (if enrolled) */}
        {course.progress !== undefined && (
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-slate-600 dark:text-slate-300">Progress</span>
              <span className="text-nova-coral font-extrabold">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-nova-coral to-nova-lavender h-full rounded-full transition-all duration-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer Row */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            By {course.instructor}
          </span>

          <button
            onClick={() => onSelect && onSelect(course.id)}
            aria-label={`View course details for ${course.title}`}
            className="px-4 py-2.5 rounded-xl bg-nova-charcoal dark:bg-slate-100 text-white dark:text-nova-charcoal text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 min-h-[44px] cursor-pointer"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Card>
    </motion.div>
  );
};
