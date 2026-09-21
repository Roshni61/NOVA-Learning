import React from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Award,
  BrainCircuit,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';
import { mockUser } from '../../mock/data';

export const ProfilePage: React.FC = () => {
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

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      {/* 1. HERO HEADER */}
      <Card className="bg-gradient-to-br from-nova-charcoal via-slate-900 to-purple-950 p-8 rounded-3xl border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-nova-coral/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <img
            src={mockUser.avatarUrl}
            alt={mockUser.name}
            className="w-24 h-24 rounded-3xl object-cover border-2 border-nova-lavender shadow-xl"
          />
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <Badge variant="coral">Learning Intelligence Profile</Badge>
              <Badge variant="lavender">Target: {targetGoal}</Badge>
            </div>
            <h1 className="text-3xl font-black text-white">{mockUser.name}</h1>
            <p className="text-xs text-slate-300 font-medium">{mockUser.email}</p>
          </div>
        </div>

        {/* XP & Level Pill Badges */}
        <div className="flex items-center gap-4 relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
          <div className="text-center">
            <div className="text-[10px] text-purple-200 font-bold uppercase">Level</div>
            <div className="text-2xl font-black text-nova-yellow">{userLevel}</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-[10px] text-purple-200 font-bold uppercase">Total XP</div>
            <div className="text-2xl font-black text-white">{userXP}</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-[10px] text-purple-200 font-bold uppercase">Active Streak</div>
            <div className="text-2xl font-black text-nova-coral flex items-center gap-1">
              <Flame className="w-5 h-5 fill-nova-coral text-nova-coral" /> {streak}d
            </div>
          </div>
        </div>
      </Card>

      {/* 2. LEARNING OVERVIEW & TELEMETRY */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -3, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card className="bg-white p-5 border border-gray-100 text-center space-y-1 shadow-nova-soft hover:shadow-xl transition-all">
            <div className="text-xs font-bold text-nova-muted">Overall Mastery</div>
            <div className="text-2xl font-black text-nova-charcoal">{mastery}%</div>
            <div className="text-[10px] text-emerald-600 font-semibold">↑ 8% this week</div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -3, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card className="bg-white p-5 border border-gray-100 text-center space-y-1 shadow-nova-soft hover:shadow-xl transition-all">
            <div className="text-xs font-bold text-nova-muted">Concepts Mastered</div>
            <div className="text-2xl font-black text-emerald-600">{masteredConcepts.length} Nodes</div>
            <div className="text-[10px] text-nova-muted font-semibold">of {concepts.length} total</div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -3, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card className="bg-white p-5 border border-gray-100 text-center space-y-1 shadow-nova-soft hover:shadow-xl transition-all">
            <div className="text-xs font-bold text-nova-muted">Knowledge Gaps</div>
            <div className="text-2xl font-black text-nova-coral">{gapConcepts.length} Active</div>
            <div className="text-[10px] text-nova-coral font-semibold">Requires practice</div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -3, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Card className="bg-white p-5 border border-gray-100 text-center space-y-1 shadow-nova-soft hover:shadow-xl transition-all">
            <div className="text-xs font-bold text-nova-muted">Retention Accuracy</div>
            <div className="text-2xl font-black text-purple-700">{retention}%</div>
            <div className="text-[10px] text-purple-600 font-semibold">Top 5% learner</div>
          </Card>
        </motion.div>
      </div>

      {/* 3. SKILL RADAR & AI INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Skill Radar Bars */}
        <Card className="lg:col-span-7 bg-white p-6 border border-gray-100 space-y-4 shadow-nova-soft">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="text-sm font-black text-nova-charcoal uppercase tracking-wider flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-nova-coral" />
              Skill Domain Radar
            </h3>
            <Badge variant="lavender">Live Telemetry</Badge>
          </div>

          <div className="space-y-3">
            {skillRadar.map((sr, idx) => (
              <div key={sr.skill} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-nova-charcoal">
                  <span>{sr.skill}</span>
                  <span>{sr.mastery}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${sr.mastery}%` }}
                    transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-nova-coral via-nova-lavender to-nova-mint h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: AI Profile Insights */}
        <Card className="lg:col-span-5 bg-gradient-to-br from-rose-50/80 via-purple-50/80 to-emerald-50/80 p-6 border border-purple-100 space-y-4 shadow-md glow-lavender">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-nova-coral animate-spin" style={{ animationDuration: '6s' }} />
            <h3 className="text-xs font-black text-nova-charcoal uppercase tracking-wider">
              AI Profile Insights
            </h3>
          </div>

          <div className="space-y-3 text-xs text-nova-muted leading-relaxed">
            <div className="p-3 bg-white/90 rounded-xl border border-purple-100 space-y-1 shadow-sm">
              <span className="font-extrabold text-nova-charcoal block">Practicing Patterns</span>
              <p>NOVA noticed that your retention is 24% higher when interactive code exercises immediately follow concept readings.</p>
            </div>

            <div className="p-3 bg-white/90 rounded-xl border border-purple-100 space-y-1 shadow-sm">
              <span className="font-extrabold text-rose-900 block">Active Knowledge Gap</span>
              <p>HashMap collision accuracy (53%) is lower than Arrays (92%). Prioritize the HashMap recovery mission before System Design.</p>
            </div>

            <div className="p-3 bg-white/90 rounded-xl border border-purple-100 space-y-1 shadow-sm">
              <span className="font-extrabold text-purple-900 block">Learning Speed Momentum</span>
              <p>Your recent learning pace increased 18% over the last 7 days!</p>
            </div>
          </div>
        </Card>
      </div>

      {/* 4. ACHIEVEMENTS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-nova-charcoal uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-nova-yellow" />
            Learner Achievements
          </h3>
          <span className="text-xs font-bold text-nova-muted">
            {achievements.filter((a) => a.unlocked).length} / {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <motion.div key={ach.id} whileHover={{ y: -3, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card
                className={`p-5 border transition-all ${
                  ach.unlocked
                    ? 'bg-white border-purple-200 shadow-md glow-yellow'
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl p-2 bg-nova-bg rounded-2xl border border-gray-200 flex-shrink-0">
                    {ach.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-nova-charcoal">{ach.title}</h4>
                      {ach.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                    <p className="text-[11px] text-nova-muted leading-relaxed">{ach.description}</p>
                    {ach.unlockedAt && (
                      <span className="text-[9px] font-bold text-purple-700 block pt-1">
                        Unlocked {ach.unlockedAt}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
