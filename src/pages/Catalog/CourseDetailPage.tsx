import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Folder,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  CheckCircle,
  Info,
  User,
  Globe,
  Tag,
  Award,
  ShieldCheck,
  Zap,
  X,
} from 'lucide-react';
import { getDetailedCourse, type CourseLesson, type CourseModule } from '../../data/courseData';
import { useCourseProgress } from '../../hooks/useCourseProgress';
import { useGoal } from '../../context/GoalContext';
import { Badge, Card, Button } from '../../components/ui';

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const course = getDetailedCourse(courseId || '');
  const { isLessonCompleted, toggleLessonComplete, getCourseCompletion } = useCourseProgress();
  const { addXP } = useGoal();

  // Active module expansion state (default module 0 open)
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    mod_101_1: true,
    mod_102_1: true,
    mod_103_1: true,
  });

  // Active playing lesson state
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null);
  const [activeModuleTitle, setActiveModuleTitle] = useState<string>('');
  const [activeLessonInfoModal, setActiveLessonInfoModal] = useState<CourseLesson | null>(null);

  const videoPlayerRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  // Body Scroll Lock & Escape Key Listener when Info Modal is active
  useEffect(() => {
    if (activeLessonInfoModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLessonInfoModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeLessonInfoModal]);

  // Idempotency Guard for XP Awarding
  const handleToggleComplete = (cId: string, lesId: string) => {
    const wasCompleted = isLessonCompleted(cId, lesId);
    toggleLessonComplete(cId, lesId);

    // Idempotency Guard: Only award +25 XP if lesson was NOT completed previously!
    if (!wasCompleted) {
      addXP(25);
    }
  };

  if (!course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 mb-4">
          <Info className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-nova-charcoal dark:text-slate-100 mb-2">
          Course Not Found
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
          The requested course with ID "{courseId}" could not be found or has been moved.
        </p>
        <Button onClick={() => navigate('/catalog')} variant="primary" size="md">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course Catalog
        </Button>
      </div>
    );
  }

  const completionPercentage = getCourseCompletion(course.id, course.totalLessons);

  const toggleModule = (modId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const handleStartResume = () => {
    // Find first uncompleted lesson, or fall back to lesson 1
    let targetLesson: CourseLesson | null = null;
    let targetModTitle = '';

    for (const mod of course.modules) {
      for (const les of mod.lessons) {
        if (!isLessonCompleted(course.id, les.id)) {
          targetLesson = les;
          targetModTitle = mod.title;
          break;
        }
      }
      if (targetLesson) break;
    }

    if (!targetLesson && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      targetLesson = course.modules[0].lessons[0];
      targetModTitle = course.modules[0].title;
    }

    if (targetLesson) {
      setActiveLesson(targetLesson);
      setActiveModuleTitle(targetModTitle);

      // Ensure module containing target lesson is expanded
      const modId = course.modules.find((m) => m.lessons.some((l) => l.id === targetLesson?.id))?.id;
      if (modId) {
        setOpenModules((prev) => ({ ...prev, [modId]: true }));
      }

      // Smooth scroll to player
      setTimeout(() => {
        videoPlayerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleSelectLesson = (mod: CourseModule, les: CourseLesson) => {
    setActiveLesson(les);
    setActiveModuleTitle(mod.title);

    setTimeout(() => {
      videoPlayerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/catalog'))}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:border-nova-coral hover:text-nova-coral transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          <Badge variant="lavender" className="text-xs font-bold">
            {course.category}
          </Badge>
          <Badge variant="coral" className="text-xs font-bold">
            {course.level}
          </Badge>
        </div>
      </div>

      {/* Embedded Active Video Player Viewport (Appears when activeLesson is selected) */}
      <div ref={videoPlayerRef}>
        <AnimatePresence mode="wait">
          {activeLesson && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl space-y-4 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between text-white border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs text-nova-coral font-extrabold uppercase tracking-wider">
                    Now Playing • {activeModuleTitle}
                  </span>
                  <h3 className="text-lg font-black text-white">{activeLesson.title}</h3>
                </div>
                <button
                  onClick={() => setActiveLesson(null)}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
                  aria-label="Close Video Player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player HTML5 */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative border border-slate-800">
                <video
                  src={activeLesson.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Player Footer & Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Clock className="w-4 h-4 text-nova-coral" />
                    Duration: {activeLesson.duration}
                  </span>

                  {activeLesson.missionId && (
                    <Link
                      to={`/mission/${activeLesson.missionId}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-bold hover:bg-purple-600 hover:text-white transition"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Launch Lab Mission
                    </Link>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleToggleComplete(course.id, activeLesson.id)}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                      isLessonCompleted(course.id, activeLesson.id)
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                        : 'bg-nova-coral text-white hover:bg-nova-coral/90'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {isLessonCompleted(course.id, activeLesson.id) ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Two-Column Layout (Infosys Springboard Model) */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* ============================================================ */}
        {/* LEFT / CENTER MAIN CONTENT AREA (~70% Width) */}
        {/* ============================================================ */}
        <div className="w-full lg:w-[70%] space-y-8">
          {/* Header Description Banner */}
          <Card className="bg-gradient-to-br from-white via-gray-50/50 to-purple-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-gray-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-black text-nova-charcoal dark:text-slate-100 leading-tight">
                {course.title}
              </h1>

              {/* Author / Instructor Badge */}
              <div className="flex items-center gap-3 pt-1">
                {course.instructorAvatar ? (
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-10 h-10 rounded-full object-cover border-2 border-nova-coral/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-nova-coral/10 text-nova-coral flex items-center justify-center font-bold">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-black text-nova-charcoal dark:text-slate-200">
                    {course.instructor}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {course.instructorRole || 'Lead Instructor'}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium border-t border-gray-100 dark:border-slate-800/80 pt-4">
              {course.longDescription}
            </p>
          </Card>

          {/* Table of Contents Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-nova-charcoal dark:text-slate-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-nova-coral" />
                Course Table of Contents
              </h2>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {completionPercentage}% Completed
              </span>
            </div>

            {/* Summary Bar */}
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  {course.duration}
                </span>
                <span className="text-gray-300 dark:text-slate-700">•</span>
                <span className="flex items-center gap-1.5">
                  <Folder className="w-4 h-4 text-nova-coral" />
                  {course.totalModules} Modules
                </span>
                <span className="text-gray-300 dark:text-slate-700">•</span>
                <span className="flex items-center gap-1.5">
                  <PlayCircle className="w-4 h-4 text-emerald-500" />
                  {course.totalLessons} Lessons
                </span>
              </div>

              {/* Mini Progress Bar */}
              <div className="w-full sm:w-48 bg-gray-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-nova-coral to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Expandable Accordion Modules */}
            <div className="space-y-4">
              {course.modules.map((module, idx) => {
                const isOpen = !!openModules[module.id];
                const completedInModule = module.lessons.filter((l) =>
                  isLessonCompleted(course.id, l.id)
                ).length;

                return (
                  <div
                    key={module.id}
                    className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all shadow-sm hover:border-gray-300 dark:hover:border-slate-700"
                  >
                    {/* Module Header */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-gray-50/80 dark:hover:bg-slate-800/50 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 pr-4">
                        <div className="w-10 h-10 rounded-xl bg-nova-coral/10 text-nova-coral flex items-center justify-center flex-shrink-0 font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm sm:text-base font-extrabold text-nova-charcoal dark:text-slate-100 truncate">
                              {module.title}
                            </h3>
                            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                              {module.duration}
                            </span>
                          </div>
                          {module.description && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {module.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 hidden sm:inline-block">
                          {completedInModule}/{module.lessons.length} Done
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </button>

                    {/* Module Lessons Child List (Expanded View) */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-gray-100 dark:border-slate-800/80 bg-gray-50/40 dark:bg-slate-950/40 divide-y divide-gray-100 dark:divide-slate-800/60"
                        >
                          <div className="px-5 py-2 text-[11px] font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex justify-between">
                            <span>Sub-lessons • {module.lessons.length} Videos</span>
                            <span>Duration</span>
                          </div>

                          {module.lessons.map((lesson) => {
                            const isCompleted = isLessonCompleted(course.id, lesson.id);
                            const isActive = activeLesson?.id === lesson.id;

                            return (
                              <div
                                key={lesson.id}
                                onClick={() => handleSelectLesson(module, lesson)}
                                className={`p-3.5 sm:px-5 flex items-center justify-between gap-3 transition cursor-pointer group ${
                                  isActive
                                    ? 'bg-nova-coral/10 dark:bg-nova-coral/20 border-l-4 border-nova-coral'
                                    : 'hover:bg-white dark:hover:bg-slate-800/60'
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <div
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition ${
                                      isCompleted
                                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                        : isActive
                                        ? 'bg-nova-coral text-white'
                                        : 'bg-gray-100 dark:bg-slate-800 text-slate-500 group-hover:bg-nova-coral group-hover:text-white'
                                    }`}
                                  >
                                    {isCompleted ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : (
                                      <PlayCircle className="w-4 h-4" />
                                    )}
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <h4
                                      className={`text-xs sm:text-sm font-bold truncate transition ${
                                        isActive
                                          ? 'text-nova-coral font-extrabold'
                                          : 'text-nova-charcoal dark:text-slate-200 group-hover:text-nova-coral'
                                      }`}
                                    >
                                      {lesson.title}
                                    </h4>
                                    {lesson.missionId && (
                                      <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold inline-flex items-center gap-1 mt-0.5">
                                        <Zap className="w-3 h-3" /> Includes Interactive Lab
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-2 py-0.5 rounded-md">
                                    {lesson.duration}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveLessonInfoModal(lesson);
                                    }}
                                    className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-800 transition"
                                    aria-label="Lesson Info"
                                  >
                                    <Info className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STICKY RIGHT SIDEBAR (~30% Width) */}
        {/* ============================================================ */}
        <div className="w-full lg:w-[30%] lg:sticky lg:top-24 space-y-6">
          {/* Action CTA Card */}
          <Card className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 rounded-3xl shadow-lg space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Enrollment & Syllabus
              </span>
              <h3 className="text-base font-black text-nova-charcoal dark:text-slate-100">
                {course.title}
              </h3>
            </div>

            {/* Course Progress Summary */}
            <div className="bg-gray-50 dark:bg-slate-800/60 rounded-2xl p-4 space-y-2 border border-gray-100 dark:border-slate-800">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-300">Course Progress</span>
                <span className="text-nova-coral font-black">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-nova-coral to-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Main Action Start / Resume Button */}
            <button
              onClick={handleStartResume}
              className="w-full py-3.5 rounded-2xl bg-nova-coral hover:bg-nova-coral/90 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-nova-coral/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <PlayCircle className="w-5 h-5" />
              <span>{completionPercentage > 0 ? 'Resume Course' : 'Start Course'}</span>
            </button>
          </Card>

          {/* "At a Glance" Metadata Panel */}
          <Card className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-gray-100 dark:border-slate-800 pb-3">
              At a Glance
            </h3>

            <div className="space-y-3 text-xs font-medium">
              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Folder className="w-4 h-4 text-nova-coral" />
                  Type
                </span>
                <span className="font-extrabold text-nova-charcoal dark:text-slate-200">
                  Course
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Duration
                </span>
                <span className="font-extrabold text-nova-charcoal dark:text-slate-200">
                  {course.duration}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Award className="w-4 h-4 text-amber-500" />
                  Level
                </span>
                <span className="font-extrabold text-nova-charcoal dark:text-slate-200">
                  {course.level}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Access
                </span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                  {course.access}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <User className="w-4 h-4 text-blue-500" />
                  Instructor
                </span>
                <span className="font-extrabold text-nova-charcoal dark:text-slate-200">
                  {course.instructor}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Globe className="w-4 h-4 text-indigo-500" />
                  Language
                </span>
                <span className="font-extrabold text-nova-charcoal dark:text-slate-200">
                  {course.language}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Tag className="w-4 h-4 text-rose-500" />
                  Category
                </span>
                <span className="font-extrabold text-nova-charcoal dark:text-slate-200">
                  {course.category}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Lesson Info Modal */}
      <AnimatePresence>
        {activeLessonInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-black text-nova-charcoal dark:text-slate-100">
                  Lesson Details
                </h3>
                <button
                  onClick={() => setActiveLessonInfoModal(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-nova-charcoal dark:text-slate-100">
                  {activeLessonInfoModal.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Estimated duration: {activeLessonInfoModal.duration}. Includes video lecture and practice exercises.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => {
                    const mod = course.modules.find((m) =>
                      m.lessons.some((l) => l.id === activeLessonInfoModal.id)
                    );
                    if (mod) handleSelectLesson(mod, activeLessonInfoModal);
                    setActiveLessonInfoModal(null);
                  }}
                  variant="primary"
                  size="sm"
                >
                  <PlayCircle className="w-4 h-4 mr-1.5" />
                  Play Lesson
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
