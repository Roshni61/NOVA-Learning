import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Award,
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';
import { mockUser } from '../../mock/data';
import {
  AIMindscapeHero,
  MotionMetricsCard,
  InteractiveRadar,
  HashMapRecoveryModal,
  AnimatedFlameIcon,
  AnimatedPlanetIcon,
  AnimatedGemIcon,
  AnimatedShieldIcon,
} from '../../components/profile';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const ProfilePage: React.FC = () => {
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState<boolean>(false);
  const {
    targetGoal,
    streak,
    retention,
    mastery,
    userXP,
    userLevel,
    concepts,
    achievements,
    skillRadar,
  } = useGoal();

  const masteredConcepts = concepts.filter((c) => c.status === 'Mastered');
  const gapConcepts = concepts.filter((c) => c.status === 'Knowledge Gap' || c.status === 'Needs Practice');
  const hashmapConcept = concepts.find((c) => c.id === 'hashmap');
  const hashmapMastery = hashmapConcept?.mastery ?? 53;
  const isHashmapMastered = hashmapConcept?.status === 'Mastered';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 max-w-6xl mx-auto pb-12 font-sans"
    >
      {/* 1. CREATIVE HERO: Immersive AI Mindscape Background */}
      <motion.div variants={itemVariants}>
        <AIMindscapeHero
          user={mockUser}
          targetGoal={targetGoal}
          userLevel={userLevel}
          userXP={userXP}
          streak={streak}
        />
      </motion.div>

      {/* 2. MOTION METRICS: Refactored with animated micro-charts & status themes */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <MotionMetricsCard
            label="Overall Mastery"
            value={`${mastery}%`}
            change="↑ 8% this week"
            status="mastery"
            icon={<BrainCircuit className="w-4 h-4 text-emerald-500" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <MotionMetricsCard
            label="Concepts Mastered"
            value={`${masteredConcepts.length} Nodes`}
            change={`of ${concepts.length} total`}
            status="normal"
            icon={<CheckCircle2 className="w-4 h-4 text-indigo-500" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <MotionMetricsCard
            label="Knowledge Gaps"
            value={`${gapConcepts.length} Active`}
            change="Requires practice"
            status="gap"
            icon={<Flame className="w-4 h-4 text-nova-coral" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <MotionMetricsCard
            label="Retention Accuracy"
            value={`${retention}%`}
            change="Top 5% learner"
            status="top"
            icon={<Sparkles className="w-4 h-4 text-purple-500" />}
          />
        </motion.div>
      </section>

      {/* 3. INTERACTIVE SKILL DATA & DYNAMIC INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Interactive Mesh Radar Visualization */}
        <motion.div variants={itemVariants} className="lg:col-span-7">
          <Card className="bg-white dark:bg-slate-900 p-6 border border-gray-100 dark:border-slate-800 space-y-6 shadow-nova-soft rounded-3xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800">
              <h3 className="text-sm font-black text-nova-charcoal dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-nova-coral" />
                Skill Domain Radar
              </h3>
              <Badge variant="lavender" className="text-xs font-bold">
                Live Telemetry Mesh
              </Badge>
            </div>

            <InteractiveRadar skills={skillRadar} />
          </Card>
        </motion.div>

        {/* Dynamic AI Profile Insights with text fade-in */}
        <motion.div variants={itemVariants} className="lg:col-span-5">
          <Card className="bg-gradient-to-br from-rose-50/90 via-purple-50/80 to-emerald-50/80 dark:from-slate-900 dark:via-purple-950/60 dark:to-slate-900 p-6 border border-purple-100 dark:border-purple-800 space-y-5 shadow-md glow-lavender rounded-3xl">
            <div className="flex items-center gap-2 border-b border-purple-100/80 dark:border-purple-800/80 pb-3">
              <Sparkles className="w-4 h-4 text-nova-coral animate-spin" style={{ animationDuration: '6s' }} />
              <h3 className="text-xs font-black text-nova-charcoal dark:text-slate-100 uppercase tracking-wider">
                AI Profile Insights
              </h3>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="p-3.5 bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-purple-100 dark:border-purple-800 space-y-1 shadow-sm"
              >
                <div className="flex items-center gap-2 text-xs font-black text-nova-charcoal dark:text-slate-100">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Practicing Pattern</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  NOVA noticed your retention is 24% higher when interactive code exercises immediately follow concept readings.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="p-3.5 bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-rose-100 dark:border-rose-900/50 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-black text-nova-coral">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Active Knowledge Gap</span>
                  </div>
                  {isHashmapMastered && (
                    <Badge variant="mint" className="text-[10px] font-bold">
                      Mastered
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  HashMap collision accuracy ({hashmapMastery}%) is lower than Arrays (92%). Prioritize the HashMap recovery mission.
                </p>

                <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                  <div className="w-full bg-rose-100 dark:bg-rose-950/60 h-2.5 rounded-full overflow-hidden flex-1">
                    <div
                      className="bg-gradient-to-r from-nova-coral to-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${hashmapMastery}%` }}
                    />
                  </div>
                  <button
                    onClick={() => setIsRecoveryModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-nova-coral hover:bg-nova-coral/90 text-white text-[11px] font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-105 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{isHashmapMastered ? 'Retake Drill' : 'Launch Recovery Mission'}</span>
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="p-3.5 bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-purple-100 dark:border-purple-800 space-y-1 shadow-sm"
              >
                <div className="flex items-center gap-2 text-xs font-black text-purple-700 dark:text-purple-300">
                  <Zap className="w-3.5 h-3.5 text-purple-500" />
                  <span>Speed & Retention Momentum</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  Your weekly retention score place you in the top 5% of active platform learners.
                </p>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* 4. CREATIVE ACHIEVEMENTS: Standard Icons -> Micro-Animations */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-nova-charcoal dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-nova-yellow" />
            Learner Achievements
          </h3>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {achievements.filter((a) => a.unlocked).length} / {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => {
            // Pick micro-animation component based on achievement ID or title
            const renderAnimatedIcon = () => {
              if (ach.id.includes('streak') || ach.title.toLowerCase().includes('continuous')) {
                return <AnimatedFlameIcon />;
              }
              if (ach.id.includes('gap') || ach.title.toLowerCase().includes('gap')) {
                return <AnimatedShieldIcon />;
              }
              if (ach.id.includes('titan') || ach.title.toLowerCase().includes('titan')) {
                return <AnimatedGemIcon />;
              }
              return <AnimatedPlanetIcon />;
            };

            return (
              <motion.div
                key={ach.id}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card
                  className={`p-5 border transition-all rounded-3xl relative overflow-hidden ${
                    ach.unlocked
                      ? 'bg-white dark:bg-slate-900 border-purple-200 dark:border-purple-800 shadow-md glow-yellow'
                      : 'bg-gray-50 dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-1 rounded-2xl bg-nova-bg dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex-shrink-0">
                      {renderAnimatedIcon()}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-black text-nova-charcoal dark:text-slate-100 truncate">
                          {ach.title}
                        </h4>
                        {ach.unlocked && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-300 leading-relaxed font-medium">
                        {ach.description}
                      </p>
                      {ach.unlockedAt && (
                        <span className="text-[9px] font-extrabold text-purple-600 dark:text-purple-400 block pt-1">
                          Unlocked {ach.unlockedAt}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* HashMap Recovery Mission Quiz Modal */}
      <HashMapRecoveryModal
        isOpen={isRecoveryModalOpen}
        onClose={() => setIsRecoveryModalOpen(false)}
      />
    </motion.div>
  );
};

export default ProfilePage;
