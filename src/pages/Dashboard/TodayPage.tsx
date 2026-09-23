import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  Sliders,
  Flame,
  Clock,
  ArrowRight,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';

// Lazy-loaded heavy client modals and drawers
const WhatIfSimulatorModal = lazy(() => import('../../components/dashboard/WhatIfSimulatorModal'));
const DiagnosticQuizModal = lazy(() => import('../../components/dashboard/DiagnosticQuizModal'));
const TutorDrawer = lazy(() => import('../../components/tutor/TutorDrawer'));

interface Mission {
  id: string;
  conceptId?: string;
  stage: 'Learn' | 'Practice' | 'Apply' | 'Prove';
  title: string;
  description?: string;
  duration?: string;
  completed: boolean;
  accent?: 'lavender' | 'coral' | 'mint' | 'yellow';
}

export const TodayPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    targetGoal,
    readiness,
    monthsToTarget,
    streak,
    retention,
    mastery,
    speed,
    consistency,
    missions: contextMissions,
  } = useGoal();

  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  const [missions, setMissions] = useState<Mission[]>(contextMissions);

  const toggleMission = (id: string) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const completedCount = missions.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / (missions.length || 1)) * 100);

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome & Target Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-nova-soft">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="coral">Daily Prioritized Move</Badge>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-nova-charcoal dark:text-slate-100">
            Good morning, Learner 👋
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-2 font-medium">
            <span>NOVA prioritized {missions.length} key moves for today.</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="font-semibold text-nova-charcoal dark:text-slate-100">{targetGoal} Path</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="font-bold text-nova-coral">{readiness}% Readiness</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Target: {monthsToTarget} Months</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="coral"
            size="md"
            onClick={() => setIsQuizOpen(true)}
            aria-label="Open AI Diagnostic Quiz Modal"
            className="gap-2 min-h-[44px]"
          >
            <Sparkles className="w-4 h-4" />
            AI Diagnostic Quiz
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsSimulatorOpen(true)}
            aria-label="Open Simulate My Path What-If Modal"
            className="gap-2 min-h-[44px]"
          >
            <Sliders className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            Simulate My Path
          </Button>
        </div>
      </div>

      {/* Main Grid: Left Missions Stack (2/3), Right Intelligence Widgets (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Daily Mission Stack */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-nova-charcoal dark:text-slate-100">Daily Mission Stack</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Learn → Practice → Apply → Prove continuous execution cycle
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-nova-charcoal dark:text-slate-200 bg-nova-bg dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-slate-700">
              <span>Progress: {completedCount}/{missions.length} Done</span>
              <div className="w-16 bg-gray-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-nova-coral h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mission Cards Stack */}
          <div className="space-y-4">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -3, scale: 1.01 }}
              >
                <Card
                  className={`bg-white dark:bg-slate-900 p-6 border transition-all duration-300 rounded-3xl ${
                    mission.completed
                      ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/20 dark:bg-emerald-950/20 opacity-90 shadow-sm'
                      : 'border-gray-100 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl hover:shadow-purple-500/5 glow-lavender'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Interactive Checkbox with 44x44px Touch Area */}
                    <button
                      onClick={() => toggleMission(mission.id)}
                      aria-label={`Mark mission ${mission.title} as ${mission.completed ? 'incomplete' : 'completed'}`}
                      className={`w-8 h-8 min-w-[32px] rounded-lg border-2 mt-1 flex items-center justify-center transition-all cursor-pointer ${
                        mission.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-md'
                          : 'border-gray-300 dark:border-slate-600 hover:border-nova-coral bg-white dark:bg-slate-800 hover:scale-110'
                      }`}
                    >
                      {mission.completed && <CheckCircle2 className="w-4 h-4" />}
                    </button>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={mission.accent}>{mission.stage}</Badge>
                          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-nova-coral" />
                            {mission.duration}
                          </span>
                        </div>

                        {mission.completed ? (
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                            ✓ Completed
                          </span>
                        ) : (
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/mission/${mission.id}`)}
                              aria-label={`Start mission: ${mission.title}`}
                              className="text-xs font-bold gap-1.5 text-purple-700 dark:text-purple-300 hover:text-nova-coral dark:hover:text-nova-coral hover:bg-purple-50 dark:hover:bg-purple-950/60 border border-purple-100 dark:border-purple-800 shadow-sm group min-h-[44px]"
                            >
                              <span>Start Mission</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </motion.div>
                        )}
                      </div>

                      <h3
                        className={`text-base font-bold ${
                          mission.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-nova-charcoal dark:text-slate-100'
                        }`}
                      >
                        {mission.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {mission.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Intelligence & Learning Twin Widgets */}
        <div className="lg:col-span-4 space-y-6">
          {/* Learning Twin Radar / Stats Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card className="bg-white dark:bg-slate-900 p-6 border border-gray-100 dark:border-slate-800 space-y-5 shadow-nova-soft rounded-3xl">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-nova-charcoal to-slate-800 text-nova-coral font-extrabold flex items-center justify-center text-sm shadow-md">
                    LT
                  </div>
                  <div>
                    <h3 className="font-extrabold text-nova-charcoal dark:text-slate-100 text-sm flex items-center gap-1.5">
                      Learning Twin
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </h3>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">Real-time Telemetry</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-extrabold text-nova-coral bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-100 dark:border-rose-900">
                  <Flame className="w-4 h-4 fill-nova-coral animate-bounce" />
                  {streak} Days
                </div>
              </div>

              {/* Twin Progress Metrics */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-600 dark:text-slate-300">Concept Mastery</span>
                    <span className="text-nova-charcoal dark:text-slate-100">{mastery}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${mastery}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="bg-nova-mint h-full rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-600 dark:text-slate-300">Knowledge Retention</span>
                    <span className="text-nova-charcoal dark:text-slate-100">{retention}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${retention}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="bg-nova-lavender h-full rounded-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-600 dark:text-slate-300">Consistency Score</span>
                    <span className="text-nova-charcoal dark:text-slate-100">{consistency}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${consistency}%` }}
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                      className="bg-nova-coral h-full rounded-full"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-semibold text-purple-950 dark:text-purple-200 bg-purple-50/80 dark:bg-purple-950/60 backdrop-blur-sm p-3 rounded-xl border border-purple-100 dark:border-purple-800">
                  <span>Learning Pace</span>
                  <span className="font-extrabold text-purple-700 dark:text-purple-300">{speed} Speed</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* AI Next Move Recommender Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Card className="bg-gradient-to-br from-rose-50/90 via-purple-50/90 to-emerald-50/90 dark:from-slate-900 dark:via-purple-950/60 dark:to-slate-900 p-6 border border-purple-100/80 dark:border-purple-800 space-y-3 shadow-md glow-lavender relative overflow-hidden rounded-3xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-nova-coral animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-xs font-extrabold text-nova-charcoal dark:text-slate-100 uppercase tracking-wider">
                  AI Intelligence Insight
                </span>
              </div>

              <h4 className="text-sm font-bold text-nova-charcoal dark:text-slate-100">
                Why NOVA chose these missions today
              </h4>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Detected a minor gap in chain rule matrix differentiation during yesterday's exercise.
                Prioritizing computational graph practice before advancing to PyTorch Autograd.
              </p>

              <div className="pt-2 border-t border-purple-100/60 dark:border-purple-800 flex items-center justify-between text-[11px] font-bold text-purple-800 dark:text-purple-300">
                <span className="flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-nova-yellow fill-nova-yellow" />
                  Adaptive Recommendation
                </span>
              </div>
            </Card>
          </motion.div>

          {/* Quick Revision Queue (Spaced Repetition) */}
          <Card className="bg-white dark:bg-slate-900 p-6 border border-gray-100 dark:border-slate-800 space-y-4 rounded-3xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-nova-charcoal dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-nova-mint" />
                Spaced Revision Queue
              </span>
              <Badge variant="mint">2 Pending</Badge>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-nova-bg dark:bg-slate-800/60 rounded-xl border border-gray-100 dark:border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-nova-charcoal dark:text-slate-100">Matrix Multiplication Dimensions</div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Last reviewed 4 days ago</div>
                </div>
                <button
                  aria-label="Review Matrix Multiplication Dimensions concept"
                  className="px-3 py-2 bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-lg text-[10px] font-bold text-nova-charcoal dark:text-slate-200 border border-gray-200 dark:border-slate-600 min-h-[44px] min-w-[44px] cursor-pointer"
                >
                  Review (3m)
                </button>
              </div>

              <div className="p-3 bg-nova-bg dark:bg-slate-800/60 rounded-xl border border-gray-100 dark:border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-nova-charcoal dark:text-slate-100">Gradient Descent Learning Rates</div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Last reviewed 6 days ago</div>
                </div>
                <button
                  aria-label="Review Gradient Descent Learning Rates concept"
                  className="px-3 py-2 bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-lg text-[10px] font-bold text-nova-charcoal dark:text-slate-200 border border-gray-200 dark:border-slate-600 min-h-[44px] min-w-[44px] cursor-pointer"
                >
                  Review (5m)
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Lazy-loaded Modals & Drawers */}
      <Suspense fallback={null}>
        <WhatIfSimulatorModal
          isOpen={isSimulatorOpen}
          onClose={() => setIsSimulatorOpen(false)}
        />
        <DiagnosticQuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
        />
        <TutorDrawer />
      </Suspense>
    </div>
  );
};
