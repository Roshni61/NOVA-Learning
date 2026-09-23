import React from 'react';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Base pulsing shimmer Skeleton component.
 * Supports light & dark mode high-contrast WCAG AA shimmer.
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className = '', style }) => {
  return (
    <div
      style={style}
      className={`animate-pulse bg-slate-200 dark:bg-slate-700/80 rounded-xl ${className}`}
      aria-hidden="true"
    />
  );
};

/**
 * Skeleton loader for Course Cards to prevent Cumulative Layout Shift (CLS).
 */
export const CourseCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 space-y-4 shadow-sm animate-pulse">
      {/* Thumbnail Aspect Ratio Placeholder */}
      <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl" />

      {/* Header & Category Badge */}
      <div className="flex items-center justify-between">
        <Skeleton className="w-20 h-5 rounded-full" />
        <Skeleton className="w-16 h-4" />
      </div>

      {/* Title & Description */}
      <div className="space-y-2">
        <Skeleton className="w-3/4 h-6" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </div>

      {/* Progress & Lessons Count */}
      <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-slate-800">
        <div className="flex justify-between">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-12 h-4" />
        </div>
        <Skeleton className="w-full h-2 rounded-full" />
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <Skeleton className="w-7 h-7 rounded-full" />
          <Skeleton className="w-24 h-4" />
        </div>
        <Skeleton className="w-20 h-8 rounded-xl" />
      </div>
    </div>
  );
};

/**
 * Skeleton loader for Instructor Bio cards to prevent CLS.
 */
export const InstructorBioSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 space-y-4 shadow-sm animate-pulse">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-2xl flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="w-36 h-5" />
          <Skeleton className="w-48 h-4" />
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-4/5 h-4" />
      </div>
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100 dark:border-slate-800">
        <Skeleton className="w-full h-12 rounded-xl" />
        <Skeleton className="w-full h-12 rounded-xl" />
        <Skeleton className="w-full h-12 rounded-xl" />
      </div>
    </div>
  );
};

/**
 * Skeleton loader for Lesson / Curriculum Sidebars to prevent CLS.
 */
export const LessonSidebarSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 space-y-4 shadow-sm animate-pulse">
      <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-800">
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-16 h-5 rounded-full" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Skeleton className="w-8 h-8 rounded-xl flex-shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="w-3/4 h-4" />
                <Skeleton className="w-1/2 h-3" />
              </div>
            </div>
            <Skeleton className="w-12 h-4 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton loader for responsive aspect-video player.
 */
export const VideoPlayerSkeleton: React.FC = () => {
  return (
    <div className="w-full aspect-video bg-slate-900 rounded-3xl overflow-hidden relative border border-slate-800 flex items-center justify-center animate-pulse">
      <Skeleton className="w-16 h-16 rounded-full bg-slate-800" />
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <Skeleton className="w-32 h-4 bg-slate-800" />
        <Skeleton className="w-24 h-4 bg-slate-800" />
      </div>
    </div>
  );
};

/**
 * Skeleton loader for full page route transitions in Suspense.
 */
export const PageSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6 font-sans animate-pulse">
      <div className="h-24 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 flex items-center justify-between">
        <Skeleton className="w-64 h-8" />
        <Skeleton className="w-32 h-10 rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
      </div>
    </div>
  );
};

