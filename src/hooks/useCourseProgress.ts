import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY_COMPLETED = 'nova_course_completed_lessons';
const STORAGE_KEY_TIMESTAMPS = 'nova_course_video_timestamps';

/**
 * Safely reads JSON from localStorage with try...catch wrapper for private browsing support.
 */
function safeGetStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (error) {
    console.warn(`[useCourseProgress] Storage read warning for key "${key}":`, error);
    return fallback;
  }
}

/**
 * Safely writes JSON to localStorage with try...catch wrapper for private browsing support.
 */
function safeSetStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[useCourseProgress] Storage write warning for key "${key}":`, error);
  }
}

export function useCourseProgress() {
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>(() =>
    safeGetStorage<Record<string, string[]>>(STORAGE_KEY_COMPLETED, {
      c_101: ['l_1', 'l_2', 'l_3', 'l_4'],
      c_102: ['l_10', 'l_11'],
    })
  );

  const [playbackTimestamps, setPlaybackTimestamps] = useState<Record<string, number>>(() =>
    safeGetStorage<Record<string, number>>(STORAGE_KEY_TIMESTAMPS, {})
  );

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  // Sync state to localStorage whenever completedLessons changes
  useEffect(() => {
    safeSetStorage(STORAGE_KEY_COMPLETED, completedLessons);
  }, [completedLessons]);

  // Sync state to localStorage whenever playbackTimestamps changes
  useEffect(() => {
    safeSetStorage(STORAGE_KEY_TIMESTAMPS, playbackTimestamps);
  }, [playbackTimestamps]);

  /**
   * Check if a specific lesson in a course is completed.
   */
  const isLessonCompleted = useCallback(
    (courseId: string, lessonId: string): boolean => {
      const list = completedLessons[courseId] || [];
      return list.includes(lessonId);
    },
    [completedLessons]
  );

  /**
   * Toggle completion status of a lesson.
   */
  const toggleLessonComplete = useCallback((courseId: string, lessonId: string) => {
    setCompletedLessons((prev) => {
      const currentList = prev[courseId] || [];
      const exists = currentList.includes(lessonId);
      const updatedList = exists
        ? currentList.filter((id) => id !== lessonId)
        : [...currentList, lessonId];

      return {
        ...prev,
        [courseId]: updatedList,
      };
    });
  }, []);

  /**
   * Mark a lesson explicitly as completed.
   */
  const markLessonComplete = useCallback((courseId: string, lessonId: string) => {
    setCompletedLessons((prev) => {
      const currentList = prev[courseId] || [];
      if (currentList.includes(lessonId)) return prev;
      return {
        ...prev,
        [courseId]: [...currentList, lessonId],
      };
    });
  }, []);

  /**
   * Mark a lesson explicitly as incomplete.
   */
  const markLessonIncomplete = useCallback((courseId: string, lessonId: string) => {
    setCompletedLessons((prev) => {
      const currentList = prev[courseId] || [];
      if (!currentList.includes(lessonId)) return prev;
      return {
        ...prev,
        [courseId]: currentList.filter((id) => id !== lessonId),
      };
    });
  }, []);

  /**
   * Save playback timestamp for a lesson video.
   */
  const savePlaybackTimestamp = useCallback((lessonId: string, seconds: number) => {
    setPlaybackTimestamps((prev) => ({
      ...prev,
      [lessonId]: Math.max(0, Math.round(seconds)),
    }));
  }, []);

  /**
   * Retrieve saved playback timestamp for a lesson.
   */
  const getPlaybackTimestamp = useCallback(
    (lessonId: string): number => {
      return playbackTimestamps[lessonId] || 0;
    },
    [playbackTimestamps]
  );

  /**
   * Calculate dynamic overall progress percentage for a course.
   */
  const getCourseCompletion = useCallback(
    (courseId: string, totalLessonsCount: number): number => {
      if (!totalLessonsCount || totalLessonsCount <= 0) return 0;
      const completedCount = (completedLessons[courseId] || []).length;
      return Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));
    },
    [completedLessons]
  );

  /**
   * Architecture ready for Database Sync (e.g. Neon PostgreSQL or REST API).
   */
  const syncWithDatabase = useCallback(async (): Promise<boolean> => {
    setIsSyncing(true);
    try {
      // Simulate network roundtrip latency for DB sync
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLastSyncedAt(new Date().toISOString());
      setIsSyncing(false);
      return true;
    } catch (error) {
      console.error('[useCourseProgress] Database sync failed:', error);
      setIsSyncing(false);
      return false;
    }
  }, []);

  return {
    completedLessons,
    playbackTimestamps,
    isSyncing,
    lastSyncedAt,
    isLessonCompleted,
    toggleLessonComplete,
    markLessonComplete,
    markLessonIncomplete,
    savePlaybackTimestamp,
    getPlaybackTimestamp,
    getCourseCompletion,
    syncWithDatabase,
  };
}
