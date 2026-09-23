import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitCommit,
  CheckCircle2,
  ArrowRight,
  Clock,
  Lock,
  Target,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';

export const PathPage: React.FC = () => {
  const navigate = useNavigate();
  const { targetGoal, monthsToTarget, pathMilestones, concepts, missions } = useGoal();
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>('deep-learning');

  const selectedMilestone = pathMilestones.find((m) => m.milestoneId === selectedMilestoneId) || pathMilestones[0];

  const completedMilestonesCount = pathMilestones.filter((m) => m.status === 'Completed').length;
  const overallRoadmapProgress = Math.round((completedMilestonesCount / (pathMilestones.length || 1)) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-nova-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Badge variant="coral" className="gap-1.5">
            <GitCommit className="w-3.5 h-3.5" />
            Connected Learning Progression Path
          </Badge>
          <h1 className="text-2xl md:text-3xl font-black text-nova-charcoal dark:text-slate-100">
            {targetGoal} Long-Term Roadmap
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
            Milestones dynamically update and unlock based on real mission completions and concept mastery ({monthsToTarget} Months Target).
          </p>
        </div>

        <div className="bg-nova-bg dark:bg-slate-800/60 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 text-center flex items-center gap-4">
          <div>
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">Roadmap Unlocked</div>
            <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
              {completedMilestonesCount}/{pathMilestones.length} Completed
            </div>
          </div>
          <div className="w-px h-8 bg-gray-300 dark:bg-slate-700" />
          <div>
            <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">Overall Progress</div>
            <div className="text-base font-black text-purple-700 dark:text-purple-300">{overallRoadmapProgress}%</div>
          </div>
        </div>
      </div>

      {/* Main Container: Roadmap Timeline & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Vertical Roadmap Timeline */}
        <div className="lg:col-span-7 relative pl-6 md:pl-10 space-y-8 border-l-2 border-dashed border-purple-300/80 dark:border-purple-800">
          {pathMilestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'Completed';
            const isActive = milestone.status === 'Active';
            const isLocked = milestone.status === 'Locked';
            const isSelected = selectedMilestoneId === milestone.milestoneId;

            return (
              <motion.div
                key={milestone.milestoneId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="relative"
              >
                {/* Connector Arrow/Bullet Node */}
                <div
                  className={`absolute -left-[31px] md:-left-[47px] top-6 w-7 h-7 rounded-full border-4 flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'border-emerald-500 bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                      : isActive
                      ? 'border-nova-coral bg-white dark:bg-slate-900 text-nova-coral ring-4 ring-rose-100 dark:ring-rose-950 glow-lavender animate-pulse'
                      : 'border-gray-300 dark:border-slate-700 bg-gray-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {isActive && <Target className="w-3.5 h-3.5" />}
                  {isLocked && <Lock className="w-3 h-3 text-slate-400 dark:text-slate-500" />}
                </div>

                {/* Milestone Card */}
                <Card
                  onClick={() => setSelectedMilestoneId(milestone.milestoneId)}
                  className={`bg-white dark:bg-slate-900 p-6 border-2 cursor-pointer transition-all space-y-4 rounded-3xl ${
                    isSelected
                      ? 'border-purple-400 dark:border-purple-600 shadow-xl glow-lavender ring-2 ring-purple-100 dark:ring-purple-950'
                      : isCompleted
                      ? 'border-emerald-100 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20 hover:border-emerald-300 dark:hover:border-emerald-700'
                      : isActive
                      ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20 hover:border-nova-coral'
                      : 'border-gray-100 dark:border-slate-800 hover:border-gray-200 dark:hover:border-slate-700 opacity-90'
                  }`}
                >
                  {/* Top Bar: Category & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-2.5 py-1 rounded-full border border-purple-200 dark:border-purple-800">
                        {milestone.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400">
                        ID: {milestone.milestoneId}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-nova-coral" /> {milestone.estimatedDuration}
                      </span>
                      <Badge
                        variant={
                          isCompleted ? 'mint' : isActive ? 'coral' : 'outline'
                        }
                      >
                        {isCompleted ? '✓ Completed' : isActive ? '⚡ Active' : '🔒 Locked'}
                      </Badge>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-nova-charcoal dark:text-slate-100 flex items-center justify-between">
                      <span>{milestone.title}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {milestone.reason}
                    </p>
                  </div>

                  {/* Dynamic Real Progress Bar & Mastery */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        Mastery: {milestone.currentMastery}% / {milestone.masteryRequirement}% Target
                      </span>
                      <span className={isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-nova-coral'}>
                        {milestone.progress}% Progress
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${milestone.progress}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.05 }}
                        className={`h-full rounded-full ${
                          isCompleted
                            ? 'bg-emerald-500'
                            : isActive
                            ? 'bg-gradient-to-r from-nova-coral to-nova-lavender'
                            : 'bg-gray-300 dark:bg-slate-700'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Bottom Bar: Concepts, Unlock Conditions & Start Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-slate-800">
                    <div className="text-xs text-slate-600 dark:text-slate-300 font-medium space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-nova-charcoal dark:text-slate-200">Concepts:</span>
                        {milestone.concepts.map((cId) => (
                          <span key={cId} className="bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-200 dark:border-slate-700">
                            {cId}
                          </span>
                        ))}
                      </div>
                      {isLocked && milestone.unlockConditions.length > 0 && (
                        <div className="text-[11px] text-amber-700 dark:text-amber-300 font-medium flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                          <span>{milestone.unlockConditions[0]}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      {!isLocked ? (
                        <Button
                          variant={isCompleted ? 'secondary' : 'coral'}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            const primaryMissionId = milestone.missions[0] || 'backpropagation-computational-graphs';
                            navigate(`/mission/${primaryMissionId}`);
                          }}
                          aria-label={`${isCompleted ? 'Review' : 'Start'} milestone: ${milestone.title}`}
                          className="gap-1 font-bold text-xs shadow-sm w-full sm:w-auto min-h-[44px]"
                        >
                          {isCompleted ? 'Review Milestone' : 'Start Milestone Mission'}{' '}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      ) : (
                        <button
                          disabled
                          aria-label={`Milestone ${milestone.title} is locked`}
                          className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-xs font-bold flex items-center gap-1.5 cursor-not-allowed w-full sm:w-auto justify-center border border-gray-200 dark:border-slate-700 min-h-[44px]"
                        >
                          <Lock className="w-3.5 h-3.5" /> Locked Milestone
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Milestone Inspector Drawer / Detailed Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-6 space-y-6">
            <AnimatePresence mode="wait">
              {selectedMilestone && (
                <motion.div
                  key={selectedMilestone.milestoneId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white dark:bg-slate-900 p-6 border-2 border-purple-200 dark:border-purple-800 shadow-nova-soft space-y-6 rounded-3xl">
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="coral" className="text-[10px]">
                            {selectedMilestone.category}
                          </Badge>
                          <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 font-bold">
                            {selectedMilestone.milestoneId}
                          </span>
                        </div>
                        <h2 className="text-xl font-black text-nova-charcoal dark:text-slate-100">
                          {selectedMilestone.title}
                        </h2>
                      </div>
                      <Badge
                        variant={
                          selectedMilestone.status === 'Completed'
                            ? 'mint'
                            : selectedMilestone.status === 'Active'
                            ? 'coral'
                            : 'outline'
                        }
                      >
                        {selectedMilestone.status}
                      </Badge>
                    </div>

                    {/* Milestone Mastery & Requirement Telemetry */}
                    <div className="bg-purple-50/70 dark:bg-purple-950/50 p-4 rounded-2xl border border-purple-100 dark:border-purple-800 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-purple-950 dark:text-purple-200">
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4 text-purple-700 dark:text-purple-400" /> Milestone Mastery Level
                        </span>
                        <span>{selectedMilestone.currentMastery}% / {selectedMilestone.masteryRequirement}% Target</span>
                      </div>
                      <div className="w-full bg-purple-200/60 dark:bg-purple-900/60 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            selectedMilestone.currentMastery >= selectedMilestone.masteryRequirement
                              ? 'bg-emerald-500'
                              : 'bg-purple-600 dark:bg-purple-400'
                          }`}
                          style={{ width: `${Math.min(100, selectedMilestone.currentMastery)}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-purple-900 dark:text-purple-300 leading-relaxed font-medium">
                        {selectedMilestone.currentMastery >= selectedMilestone.masteryRequirement
                          ? `✓ Mastery requirement (${selectedMilestone.masteryRequirement}%) achieved! Next milestone unlocked.`
                          : `Requires ${selectedMilestone.masteryRequirement - selectedMilestone.currentMastery}% more mastery in concept nodes to complete milestone.`}
                      </p>
                    </div>

                    {/* Included Concepts Breakdown */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-nova-charcoal dark:text-slate-100 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-nova-coral" /> Included Concept Nodes ({selectedMilestone.concepts.length})
                      </h4>
                      <div className="space-y-2">
                        {selectedMilestone.concepts.map((cId) => {
                          const conceptObj = concepts.find((c) => c.id === cId);
                          return (
                            <div key={cId} className="p-3 bg-nova-bg dark:bg-slate-800/60 rounded-xl border border-gray-200 dark:border-slate-700 space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-nova-charcoal dark:text-slate-100">{conceptObj?.name || cId}</span>
                                <span className="font-extrabold text-purple-700 dark:text-purple-300">{conceptObj?.mastery || 50}% Mastery</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-purple-600 dark:bg-purple-400 h-full rounded-full"
                                  style={{ width: `${conceptObj?.mastery || 50}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Associated Missions */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-nova-charcoal dark:text-slate-100 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Milestone Missions ({selectedMilestone.missions.length})
                      </h4>
                      <div className="space-y-2">
                        {selectedMilestone.missions.map((mId) => {
                          const foundMission = missions.find((m) => m.id === mId || m.conceptId === mId);
                          return (
                            <div key={mId} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center justify-between text-xs">
                              <div>
                                <div className="font-bold text-nova-charcoal dark:text-slate-100">{foundMission?.title || mId}</div>
                                <div className="text-[10px] text-slate-600 dark:text-slate-400">Stage: {foundMission?.stage || 'Learn'}</div>
                              </div>
                              <Badge variant={foundMission?.completed ? 'mint' : 'outline'} className="text-[10px]">
                                {foundMission?.completed ? '✓ Completed' : 'Pending'}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Prerequisites & Unlock Conditions */}
                    <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-slate-800 text-xs">
                      <div className="flex justify-between text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">Prerequisite Milestones:</span>
                        <span className="font-bold text-nova-charcoal dark:text-slate-100">
                          {selectedMilestone.prerequisites.length > 0 ? selectedMilestone.prerequisites.join(', ') : 'None (Foundational)'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="font-semibold text-slate-600 dark:text-slate-300 block">Unlock Conditions:</span>
                        {selectedMilestone.unlockConditions.map((cond, i) => (
                          <div key={i} className="text-[11px] font-medium text-purple-950 dark:text-purple-200 bg-purple-50 dark:bg-purple-950/60 p-2 rounded-lg border border-purple-100 dark:border-purple-800 flex items-center gap-1.5">
                            <ShieldAlert className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                            <span>{cond}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {selectedMilestone.status !== 'Locked' ? (
                        <Button
                          variant="coral"
                          size="md"
                          onClick={() => {
                            const targetMissionId = selectedMilestone.missions[0] || 'backpropagation-computational-graphs';
                            navigate(`/mission/${targetMissionId}`);
                          }}
                          aria-label={`Execute ${selectedMilestone.title} mission`}
                          className="w-full gap-2 font-bold text-xs min-h-[44px]"
                        >
                          <span>Execute {selectedMilestone.title} Mission</span>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button variant="secondary" size="md" disabled aria-label="Milestone locked" className="w-full text-xs font-bold cursor-not-allowed min-h-[44px]">
                          Locked - Satisfy Prerequisite Mastery First
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathPage;
