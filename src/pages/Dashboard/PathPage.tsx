import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GitCommit,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Clock,
  Zap,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';

const ROADMAP_MODULES = [
  {
    id: 'mod_1',
    missionId: 'python-data-structures',
    stage: 'FOUNDATIONS',
    title: 'Python & Data Structures Mastery',
    estimatedTime: '2 weeks',
    status: 'Completed',
    progress: 100,
    conceptCount: 5,
    unlockedProjects: ['CLI Data Pipeline'],
    reason: 'Prerequisite foundation for all machine learning algorithms.',
  },
  {
    id: 'mod_2',
    missionId: 'linear-algebra-calculus',
    stage: 'MATHEMATICS',
    title: 'Linear Algebra & Multivariate Calculus',
    estimatedTime: '3 weeks',
    status: 'Active',
    progress: 75,
    conceptCount: 4,
    unlockedProjects: ['NumPy Neural Net Engine'],
    reason: 'Essential for matrix gradient descent and backpropagation.',
  },
  {
    id: 'mod_recovery_hashmap',
    missionId: 'hashmap-hashing',
    stage: 'AI ADAPTIVE RECOVERY',
    title: 'HashMap & Collision Handling Intensive',
    estimatedTime: '3 hours',
    status: 'Recommended',
    progress: 48,
    isRecovery: true,
    conceptCount: 1,
    unlockedProjects: ['LRU Cache & System Design'],
    reason: 'AI inserted this recovery module because HashMap accuracy (53%) is below the required 70% threshold for System Design.',
  },
  {
    id: 'mod_3',
    missionId: 'supervised-learning',
    stage: 'MACHINE LEARNING',
    title: 'Supervised Learning & Model Evaluation',
    estimatedTime: '4 weeks',
    status: 'Active',
    progress: 60,
    conceptCount: 6,
    unlockedProjects: ['Predictive Analytics Dashboard'],
    reason: 'Core ML modeling techniques and feature engineering.',
  },
  {
    id: 'mod_4',
    missionId: 'transformers',
    stage: 'DEEP LEARNING',
    title: 'Neural Networks & Transformer Architectures',
    estimatedTime: '5 weeks',
    status: 'Recommended',
    progress: 30,
    conceptCount: 5,
    unlockedProjects: ['PyTorch Transformer Engine'],
    reason: 'Foundation for modern Generative AI and LLMs.',
  },
  {
    id: 'mod_5',
    missionId: 'rag',
    stage: 'AI SYSTEMS',
    title: 'Retrieval Augmented Generation (RAG) & Agents',
    estimatedTime: '4 weeks',
    status: 'Locked',
    progress: 0,
    conceptCount: 4,
    unlockedProjects: ['Enterprise Autonomous RAG Agent'],
    reason: 'Advanced production AI engineering deployment.',
  },
];

export const PathPage: React.FC = () => {
  const navigate = useNavigate();
  const { targetGoal, monthsToTarget } = useGoal();
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>('mod_recovery_hashmap');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-nova-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Badge variant="coral" className="gap-1.5">
            <GitCommit className="w-3.5 h-3.5" />
            Adaptive Roadmap Intelligence
          </Badge>
          <h1 className="text-2xl md:text-3xl font-black text-nova-charcoal">
            {targetGoal} Learning Path
          </h1>
          <p className="text-sm text-nova-muted font-medium">
            Dynamic timeline continuously adjusted by your Learning Twin telemetry.
          </p>
        </div>

        <div className="bg-nova-bg p-4 rounded-2xl border border-gray-200 text-center flex items-center gap-4">
          <div>
            <div className="text-[10px] font-bold text-nova-muted">Target Timeline</div>
            <div className="text-base font-black text-nova-charcoal">{monthsToTarget} Months</div>
          </div>
          <div className="w-px h-8 bg-gray-300" />
          <div>
            <div className="text-[10px] font-bold text-nova-muted">Path Mode</div>
            <div className="text-xs font-black text-purple-700">Adaptive AI</div>
          </div>
        </div>
      </div>

      {/* Vertical Timeline Roadmap */}
      <div className="relative pl-6 md:pl-10 space-y-8 border-l-2 border-dashed border-purple-300/80">
        {ROADMAP_MODULES.map((mod, idx) => {
          const isCompleted = mod.status === 'Completed';
          const isActive = mod.status === 'Active';
          const isLocked = mod.status === 'Locked';
          const isSelected = selectedModuleId === mod.id;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ x: 3 }}
              className="relative"
            >
              {/* Timeline Bullet Node */}
              <div
                className={`absolute -left-[31px] md:-left-[47px] top-6 w-7 h-7 rounded-full border-4 flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                    : mod.isRecovery
                    ? 'border-rose-500 bg-rose-500 text-white animate-pulse ring-4 ring-rose-200 glow-coral'
                    : isActive
                    ? 'border-nova-coral bg-white text-nova-coral ring-4 ring-rose-100 glow-lavender'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                {mod.isRecovery && <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />}
              </div>

              {/* Module Card */}
              <Card
                onClick={() => setSelectedModuleId(mod.id)}
                className={`bg-white p-6 border-2 cursor-pointer transition-all space-y-4 rounded-3xl ${
                  mod.isRecovery
                    ? 'border-rose-300 bg-rose-50/50 shadow-xl glow-coral'
                    : isSelected
                    ? 'border-purple-300 shadow-2xl glow-lavender'
                    : 'border-gray-100 hover:border-purple-200 hover:shadow-lg'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200">
                      {mod.stage}
                    </span>
                    {mod.isRecovery && (
                      <Badge variant="coral" className="gap-1 text-[10px] animate-pulse">
                        <Zap className="w-3 h-3 text-white" /> AI Inserted Recovery
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-nova-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-nova-coral" /> {mod.estimatedTime}
                    </span>
                    <Badge
                      variant={
                        isCompleted
                          ? 'mint'
                          : mod.isRecovery
                          ? 'coral'
                          : isActive
                          ? 'lavender'
                          : 'outline'
                      }
                    >
                      {mod.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-nova-charcoal">{mod.title}</h3>
                  <p className="text-xs text-nova-muted leading-relaxed">{mod.reason}</p>
                </div>

                {/* Animated Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-nova-muted">
                    <span>Milestone Progress</span>
                    <span>{mod.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${mod.progress}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full rounded-full ${
                        isCompleted
                          ? 'bg-emerald-500'
                          : mod.isRecovery
                          ? 'bg-rose-500'
                          : 'bg-gradient-to-r from-nova-coral to-nova-lavender'
                      }`}
                    />
                  </div>
                </div>

                {/* Progress Bar & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-xs text-nova-muted font-medium flex-1">
                    <span>{mod.conceptCount} Concepts</span>
                    <span>•</span>
                    <span>Unlocks: {mod.unlockedProjects.join(', ')}</span>
                  </div>

                  {!isLocked && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant={mod.isRecovery ? 'coral' : 'primary'}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/mission/${mod.missionId}`);
                        }}
                        className="gap-1 font-bold text-xs shadow-md"
                      >
                        Start Milestone <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
