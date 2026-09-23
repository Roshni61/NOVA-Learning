import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetailedCourse, type DetailedCourse, type Lesson } from '../../data/courseData';
import { useGoal } from '../../context/GoalContext';

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  // Safe fallback to GoalContext if present
  let addXP: ((xp: number) => void) | undefined;
  try {
    const goalContext = useGoal();
    addXP = goalContext?.addXP;
  } catch {
    // GoalContext is optional or mocked
  }

  const course: DetailedCourse | undefined = getDetailedCourse(courseId);

  // Track expanded accordion modules (all open by default for immediate exploration)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Active lesson currently playing in the video player
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Completed lesson tracking stored safely in localStorage
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(`nova_completed_lessons_${courseId}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Scroll to top immediately on route load and set initial active lesson
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    if (course && course.modules.length > 0) {
      // Default initial lesson to first lesson
      setActiveLesson(course.modules[0].lessons[0]);

      // Open first 2 modules by default
      const initialOpen: Record<string, boolean> = {};
      course.modules.forEach((mod, index) => {
        initialOpen[mod.id] = index < 2;
      });
      setExpandedModules(initialOpen);
    }
  }, [courseId, course]);

  // Persist completed lessons whenever changed
  useEffect(() => {
    if (courseId) {
      try {
        localStorage.setItem(`nova_completed_lessons_${courseId}`, JSON.stringify(completedLessons));
      } catch (e) {
        console.warn('Unable to persist completed lessons', e);
      }
    }
  }, [completedLessons, courseId]);

  // If invalid courseId provided, render clean fallback view
  if (!course) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/50 text-red-600 flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Course Not Found</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
          The requested course could not be located or may have been renamed.
        </p>
        <button
          onClick={() => navigate('/catalog')}
          className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 font-semibold rounded-xl transition shadow-sm cursor-pointer"
        >
          ← Return to Course Catalog
        </button>
      </main>
    );
  }

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
    // Smooth scroll to video viewport on smaller screens
    if (window.innerWidth < 1024) {
      document.getElementById('video-viewport')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleCompletion = (lessonId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedLessons((prev) => {
      const isCompleted = prev.includes(lessonId);
      if (isCompleted) {
        return prev.filter((id) => id !== lessonId);
      } else {
        // Award XP once if not previously completed
        if (addXP) {
          addXP(25);
        }
        return [...prev, lessonId];
      }
    });
  };

  const handleStartOrResume = () => {
    // Find first incomplete lesson across all modules
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        if (!completedLessons.includes(lesson.id)) {
          setActiveLesson(lesson);
          setExpandedModules((prev) => ({ ...prev, [mod.id]: true }));
          document.getElementById('video-viewport')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
    }
    // If all completed, open first lesson
    if (course.modules[0]?.lessons[0]) {
      setActiveLesson(course.modules[0].lessons[0]);
      document.getElementById('video-viewport')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const progressPercent = Math.round(
    (completedLessons.length / Math.max(1, course.totalLessons)) * 100
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors font-sans">
      {/* Top Header & Breadcrumb Navigation Bar */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/catalog'))}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white transition cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Catalog</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300">
              {course.category}
            </span>
            <span className="text-xs font-medium text-neutral-500">
              {completedLessons.length} / {course.totalLessons} Completed ({progressPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout (Infosys Springboard Model) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN (70% on Desktop / cols 1-8): Syllabus & Player    */}
          {/* ============================================================ */}
          <section className="lg:col-span-8 space-y-6">
            
            {/* Header Course Description Banner */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                <span>{course.level} Level</span>
                <span>•</span>
                <span>{course.duration}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-3">
                {course.title}
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Instructor Tag */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {course.instructor.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white">{course.instructor}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">{course.instructorRole}</div>
                </div>
              </div>
            </div>

            {/* Responsive 16:9 Video Player Viewport */}
            <div id="video-viewport" className="scroll-mt-24">
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
                <iframe
                  key={activeLesson ? activeLesson.videoId : course.defaultVideoId}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${
                    activeLesson ? activeLesson.videoId : course.defaultVideoId
                  }?autoplay=0&rel=0&modestbranding=1`}
                  title={activeLesson ? activeLesson.title : course.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Subtitle & Active Lesson Status Bar */}
              {activeLesson && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 px-2">
                  <div>
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                      {activeLesson.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Duration: {activeLesson.duration} • {activeLesson.summary || 'Core concept lecture'}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleToggleCompletion(activeLesson.id, e)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      completedLessons.includes(activeLesson.id)
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{completedLessons.includes(activeLesson.id) ? 'Completed (+25 XP)' : 'Mark as Complete'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Table of Contents Accordion Section */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
              
              {/* Telemetry Summary Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 gap-2">
                <div>
                  <h2 className="text-lg font-bold text-neutral-950 dark:text-white">Table of Contents</h2>
                  <p className="text-xs text-neutral-500">
                    {course.duration} • {course.totalModules} Modules • {course.totalLessons} Lessons
                  </p>
                </div>

                {/* Progress bar visual */}
                <div className="w-full sm:w-48">
                  <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expandable Module Accordions */}
              <div className="space-y-3">
                {course.modules.map((module, mIdx) => {
                  const isExpanded = !!expandedModules[module.id];
                  const moduleCompletedCount = module.lessons.filter((l) =>
                    completedLessons.includes(l.id)
                  ).length;

                  return (
                    <div
                      key={module.id}
                      className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden transition-colors"
                    >
                      {/* Module Header Bar */}
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left bg-neutral-50/70 dark:bg-neutral-800/40 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5 pr-4">
                          {/* Folder Icon */}
                          <div className="text-neutral-500 dark:text-neutral-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 mr-2">
                              Module {mIdx + 1}
                            </span>
                            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              {module.title}
                            </span>
                            <div className="text-xs text-neutral-500 mt-0.5">
                              {module.lessons.length} Lessons • {moduleCompletedCount}/{module.lessons.length} Completed
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          {/* Animated Chevron */}
                          <svg
                            className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* Expanded Lessons List */}
                      {isExpanded && (
                        <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60 bg-white dark:bg-neutral-900">
                          {module.lessons.map((lesson) => {
                            const isPlaying = activeLesson?.id === lesson.id;
                            const isDone = completedLessons.includes(lesson.id);

                            return (
                              <div
                                key={lesson.id}
                                onClick={() => handleLessonSelect(lesson)}
                                className={`px-5 py-3.5 flex items-center justify-between cursor-pointer transition-all ${
                                  isPlaying
                                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-blue-600'
                                    : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40 border-l-4 border-transparent'
                                }`}
                              >
                                <div className="flex items-center gap-3.5 pr-4">
                                  {/* Play Icon */}
                                  <div
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 ${
                                      isPlaying
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                                    }`}
                                  >
                                    ▶
                                  </div>
                                  <div>
                                    <div
                                      className={`text-sm font-medium ${
                                        isPlaying
                                          ? 'text-blue-600 dark:text-blue-400 font-semibold'
                                          : 'text-neutral-800 dark:text-neutral-200'
                                      }`}
                                    >
                                      {lesson.title}
                                    </div>
                                    {lesson.summary && (
                                      <div className="text-xs text-neutral-500 line-clamp-1">
                                        {lesson.summary}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 flex-shrink-0">
                                  <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                                    {lesson.duration}
                                  </span>

                                  {/* Completion Checkmark Toggle */}
                                  <button
                                    onClick={(e) => handleToggleCompletion(lesson.id, e)}
                                    title={isDone ? 'Mark Incomplete' : 'Mark Complete'}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition cursor-pointer ${
                                      isDone
                                        ? 'bg-emerald-500 border-emerald-500 text-white'
                                        : 'border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 text-transparent'
                                    }`}
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </button>
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
          </section>

          {/* ============================================================ */}
          {/* RIGHT COLUMN (30% on Desktop / cols 9-12): Sticky Sidebar   */}
          {/* ============================================================ */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Primary Action CTA Card */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-md">
              <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-1">
                {course.title}
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                {completedLessons.length > 0
                  ? `${completedLessons.length} of ${course.totalLessons} lessons finished`
                  : 'Start learning at your own pace'}
              </p>

              {/* Start / Resume Action Button */}
              <button
                onClick={handleStartOrResume}
                className="w-full py-3.5 px-6 font-bold rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white shadow-lg shadow-emerald-500/20 transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{completedLessons.length > 0 ? 'Resume Course' : 'Start Course'}</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* "At a Glance" Metadata Panel (Infosys Springboard Style) */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4">
                At a Glance
              </h4>

              <dl className="space-y-4 text-sm">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
                  <dt className="text-neutral-500 flex items-center gap-2">
                    <span className="text-neutral-400">📁</span> Type
                  </dt>
                  <dd className="font-medium text-neutral-900 dark:text-neutral-100">Course</dd>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
                  <dt className="text-neutral-500 flex items-center gap-2">
                    <span className="text-neutral-400">⏱️</span> Duration
                  </dt>
                  <dd className="font-medium text-neutral-900 dark:text-neutral-100">{course.duration}</dd>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
                  <dt className="text-neutral-500 flex items-center gap-2">
                    <span className="text-neutral-400">📊</span> Level
                  </dt>
                  <dd className="font-medium text-neutral-900 dark:text-neutral-100">{course.level}</dd>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
                  <dt className="text-neutral-500 flex items-center gap-2">
                    <span className="text-neutral-400">💳</span> Access
                  </dt>
                  <dd className="font-medium text-emerald-600 dark:text-emerald-400 font-semibold">{course.access}</dd>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
                  <dt className="text-neutral-500 flex items-center gap-2">
                    <span className="text-neutral-400">👤</span> Instructor
                  </dt>
                  <dd className="font-medium text-neutral-900 dark:text-neutral-100">{course.instructor}</dd>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800/80">
                  <dt className="text-neutral-500 flex items-center gap-2">
                    <span className="text-neutral-400">🌐</span> Language
                  </dt>
                  <dd className="font-medium text-neutral-900 dark:text-neutral-100">{course.language}</dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-neutral-500 flex items-center gap-2">
                    <span className="text-neutral-400">🏷️</span> Category
                  </dt>
                  <dd className="font-medium text-neutral-900 dark:text-neutral-100">{course.category}</dd>
                </div>
              </dl>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;
