import React, { useState } from 'react';
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
import { WhatIfSimulatorModal } from '../../components/dashboard/WhatIfSimulatorModal';
import { DiagnosticQuizModal } from '../../components/dashboard/DiagnosticQuizModal';
import { TutorDrawer } from '../../components/tutor/TutorDrawer';

interface Mission {
  id: string;
  conceptId?: string;
  stage: 'Learn' | 'Practice' | 'Apply' | 'Prove';
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  accent: 'lavender' | 'coral' | 'mint' | 'yellow';
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
  } = useGoal();

  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 'm1',
      stage: 'Learn',
      title: 'Backpropagation & Computational Graphs',
      description: 'Master forward pass graph construction and chain rule derivative propagation.',
      duration: '25 mins',
      completed: false,
      accent: 'lavender',
    },
    {
      id: 'm2',
      stage: 'Practice',
      title: 'Matrix Calculus for Gradient Descent',
      description: 'Interactive drill calculating Jacobian matrix shapes for linear layers.',
      duration: '15 mins',
      completed: false,
      accent: 'coral',
    },
    {
      id: 'm3',
      stage: 'Apply',
      title: 'Implement Loss Function in NumPy',
      description: 'Write a vectorized Categorical Cross-Entropy loss module from scratch.',
      duration: '30 mins',
      completed: false,
      accent: 'mint',
    },
    {
      id: 'm4',
      stage: 'Prove',
      title: 'Benchmark Assessment (5 Questions)',
      description: 'Verify readiness baseline for Neural Network Foundational Node.',
      duration: '10 mins',
      completed: false,
      accent: 'yellow',
    },
  ]);

  const toggleMission = (id: string) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const completedCount = missions.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / missions.length) * 100);

  return (
    <div className="space-y-8">
      {/* Welcome & Target Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-nova-soft">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="coral">Daily Prioritized Move</Badge>
            <span className="text-xs font-semibold text-nova-muted">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-nova-charcoal">
            Good morning, Roshni 👋
          </h1>

          <p className="text-sm text-nova-muted flex flex-wrap items-center gap-2">
            <span>NOVA prioritized {missions.length} key moves for today.</span>
            <span className="text-gray-300">•</span>
            <span className="font-semibold text-nova-charcoal">{targetGoal} Path</span>
            <span className="text-gray-300">•</span>
            <span className="font-bold text-nova-coral">{readiness}% Readiness</span>
            <span className="text-gray-300">•</span>
            <span>Target: {monthsToTarget} Months</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="coral"
            size="md"
            onClick={() => setIsQuizOpen(true)}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            AI Diagnostic Quiz
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsSimulatorOpen(true)}
            className="gap-2"
          >
            <Sliders className="w-4 h-4 text-purple-600" />
            Simulate My Path
          </Button>
        </div>
      </div>

      {/* Main Grid: Left Missions Stack (2/3), Right Intelligence Widgets (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Daily Mission Stack */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-nova-charcoal">Daily Mission Stack</h2>
              <p className="text-xs text-nova-muted">
                Learn → Practice → Apply → Prove continuous execution cycle
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-nova-charcoal bg-nova-bg px-3 py-1.5 rounded-xl border border-gray-200">
              <span>Progress: {completedCount}/{missions.length} Done</span>
              <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden">
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
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  className={`bg-white p-6 border transition-all ${
                    mission.completed
                      ? 'border-emerald-200 bg-emerald-50/20 opacity-80'
                      : 'border-gray-100 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Interactive Checkbox */}
                    <button
                      onClick={() => toggleMission(mission.id)}
                      className={`w-6 h-6 rounded-lg border-2 mt-1 flex items-center justify-center transition-all ${
                        mission.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-gray-300 hover:border-nova-coral bg-white'
                      }`}
                    >
                      {mission.completed && <CheckCircle2 className="w-4 h-4" />}
                    </button>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={mission.accent}>{mission.stage}</Badge>
                          <span className="text-xs text-nova-muted font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {mission.duration}
                          </span>
                        </div>

                        {mission.completed ? (
                          <span className="text-xs font-bold text-emerald-600">Completed</span>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/mission/${mission.conceptId || 'hashmap'}`)}
                            className="text-xs font-bold gap-1 text-purple-700 hover:text-nova-coral"
                          >
                            Start Mission <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>

                      <h3
                        className={`text-base font-bold ${
                          mission.completed ? 'line-through text-nova-muted' : 'text-nova-charcoal'
                        }`}
                      >
                        {mission.title}
                      </h3>

                      <p className="text-xs text-nova-muted leading-relaxed">
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
          <Card className="bg-white p-6 border border-gray-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-nova-charcoal text-nova-coral font-bold flex items-center justify-center text-sm">
                  LT
                </div>
                <div>
                  <h3 className="font-extrabold text-nova-charcoal text-sm">Learning Twin</h3>
                  <p className="text-[11px] text-nova-muted">Real-time Telemetry</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs font-extrabold text-nova-coral">
                <Flame className="w-4 h-4 fill-nova-coral" />
                {streak} Days
              </div>
            </div>

            {/* Twin Progress Metrics */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-nova-muted">Concept Mastery</span>
                  <span className="text-nova-charcoal">{mastery}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-nova-mint h-full rounded-full w-[78%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-nova-muted">Knowledge Retention</span>
                  <span className="text-nova-charcoal">{retention}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-nova-lavender h-full rounded-full w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-nova-muted">Consistency Score</span>
                  <span className="text-nova-charcoal">{consistency}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-nova-coral h-full rounded-full w-[92%]" />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-semibold text-purple-900 bg-purple-50 p-3 rounded-xl border border-purple-100">
                <span>Learning Pace</span>
                <span className="font-extrabold text-purple-700">{speed} Speed</span>
              </div>
            </div>
          </Card>

          {/* AI Next Move Recommender Card */}
          <Card className="bg-gradient-to-br from-rose-50/80 via-purple-50/80 to-emerald-50/80 p-6 border border-purple-100 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-nova-coral" />
              <span className="text-xs font-extrabold text-nova-charcoal uppercase tracking-wider">
                AI Intelligence Insight
              </span>
            </div>

            <h4 className="text-sm font-bold text-nova-charcoal">
              Why NOVA chose these missions today
            </h4>

            <p className="text-xs text-nova-muted leading-relaxed">
              Detected a minor gap in chain rule matrix differentiation during yesterday's exercise.
              Prioritizing computational graph practice before advancing to PyTorch Autograd.
            </p>

            <div className="pt-2 border-t border-purple-100/60 flex items-center justify-between text-[11px] font-bold text-purple-800">
              <span className="flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-nova-yellow fill-nova-yellow" />
                Adaptive Recommendation
              </span>
            </div>
          </Card>

          {/* Quick Revision Queue (Spaced Repetition) */}
          <Card className="bg-white p-6 border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-nova-charcoal uppercase tracking-wider flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-nova-mint" />
                Spaced Revision Queue
              </span>
              <Badge variant="mint">2 Pending</Badge>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-nova-bg rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-nova-charcoal">Matrix Multiplication Dimensions</div>
                  <div className="text-[10px] text-nova-muted">Last reviewed 4 days ago</div>
                </div>
                <button className="px-2.5 py-1 bg-white hover:bg-gray-100 rounded-lg text-[10px] font-bold text-nova-charcoal border border-gray-200">
                  Review (3m)
                </button>
              </div>

              <div className="p-3 bg-nova-bg rounded-xl border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-nova-charcoal">Gradient Descent Learning Rates</div>
                  <div className="text-[10px] text-nova-muted">Last reviewed 6 days ago</div>
                </div>
                <button className="px-2.5 py-1 bg-white hover:bg-gray-100 rounded-lg text-[10px] font-bold text-nova-charcoal border border-gray-200">
                  Review (5m)
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Simulator Modal */}
      <WhatIfSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />

      {/* Diagnostic Baseline Quiz Modal */}
      <DiagnosticQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      {/* Floating AI Tutor Launcher */}
      <TutorDrawer />
    </div>
  );
};
