import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Sparkles,
  AlertTriangle,
  MessageSquare,
  BookOpen,
  Zap,
} from 'lucide-react';
import { Button, Badge } from '../ui';
import type { ConceptNodeData } from '../../types';
import { useGoal } from '../../context/GoalContext';

interface ConceptInspectorDrawerProps {
  concept: ConceptNodeData | null;
  onClose: () => void;
  onExplain: () => void;
}

export const ConceptInspectorDrawer: React.FC<ConceptInspectorDrawerProps> = ({
  concept,
  onClose,
  onExplain,
}) => {
  const navigate = useNavigate();
  const { concepts, generateMissionForConcept, selectConcept } = useGoal();

  if (!concept) return null;

  const prereqNodes = concepts.filter((c) => concept.prerequisites.includes(c.id));
  const unlockNodes = concepts.filter((c) => concept.unlocks.includes(c.id));

  const handleStartPractice = () => {
    generateMissionForConcept(concept.id);
    navigate(`/mission/${concept.id}`);
  };

  const handleAskNova = () => {
    navigate('/tutor', { state: { prompt: `Why am I weak in ${concept.name}? Explain ${concept.weakPoints.join(', ')}` } });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="w-full md:w-96 bg-white/95 backdrop-blur-xl border-l border-gray-200 p-6 flex flex-col justify-between shadow-2xl z-40 overflow-y-auto max-h-screen"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">
                {concept.category}
              </span>
              <h2 className="text-xl font-black text-nova-charcoal leading-tight">
                {concept.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 text-nova-muted"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* AI Mastery & Telemetry Card */}
          <div className="bg-gradient-to-br from-rose-50/70 via-purple-50/70 to-emerald-50/70 p-5 rounded-2xl border border-purple-100 space-y-4">
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  concept.status === 'Mastered'
                    ? 'mint'
                    : concept.status === 'Knowledge Gap'
                    ? 'coral'
                    : 'lavender'
                }
              >
                {concept.status}
              </Badge>
              <span className="text-xs text-nova-muted font-medium">
                Last: {concept.lastPracticed}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <div className="text-[10px] text-nova-muted font-bold">AI Mastery</div>
                <div className="text-2xl font-black text-nova-charcoal">{concept.mastery}%</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <div className="text-[10px] text-nova-muted font-bold">Retention</div>
                <div className="text-2xl font-black text-purple-700">{concept.retention}%</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-nova-coral via-nova-lavender to-nova-mint h-full rounded-full transition-all duration-500"
                style={{ width: `${concept.mastery}%` }}
              />
            </div>
          </div>

          {/* PREREQUISITES */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-nova-charcoal uppercase tracking-wider flex items-center justify-between">
              <span>Prerequisites</span>
              <span className="text-[10px] text-nova-muted font-normal">{prereqNodes.length} Required</span>
            </h4>
            <div className="space-y-1.5">
              {prereqNodes.length > 0 ? (
                prereqNodes.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => selectConcept(p.id)}
                    className="p-2.5 bg-nova-bg hover:bg-purple-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs cursor-pointer transition-all"
                  >
                    <span className="font-bold text-nova-charcoal">{p.name}</span>
                    <span
                      className={`text-[11px] font-extrabold ${
                        p.mastery >= 80 ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {p.mastery >= 80 ? '✓' : '⚠'} {p.mastery}%
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-nova-muted italic bg-nova-bg p-2.5 rounded-xl">
                  Foundational node (No prerequisites required)
                </div>
              )}
            </div>
          </div>

          {/* NEEDS IMPROVEMENT / WEAK AREAS */}
          {concept.weakPoints.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-black text-nova-charcoal uppercase tracking-wider text-rose-700 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Needs Improvement
              </h4>
              <div className="space-y-1">
                {concept.weakPoints.map((wp, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-900 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {wp}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* UNLOCKS */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-nova-charcoal uppercase tracking-wider flex items-center justify-between">
              <span>Unlocks Downstream</span>
              <span className="text-[10px] text-nova-muted font-normal">{unlockNodes.length} Nodes</span>
            </h4>
            <div className="space-y-1.5">
              {unlockNodes.length > 0 ? (
                unlockNodes.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => selectConcept(u.id)}
                    className="p-2.5 bg-nova-bg hover:bg-purple-50 rounded-xl border border-gray-100 flex items-center justify-between text-xs cursor-pointer transition-all"
                  >
                    <span className="font-bold text-nova-charcoal">{u.name}</span>
                    <Badge variant={u.status === 'Locked' ? 'outline' : 'lavender'}>
                      {u.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-xs text-nova-muted italic bg-nova-bg p-2.5 rounded-xl">
                  Terminal node in path
                </div>
              )}
            </div>
          </div>

          {/* AI RECOMMENDATION */}
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 space-y-1">
            <span className="text-[10px] font-black uppercase text-purple-800 tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-nova-coral" /> AI Recommendation
            </span>
            <p className="text-xs text-purple-950 leading-relaxed font-medium">
              "{concept.mastery < 60 ? `Practice ${concept.weakPoints[0] || concept.name} before advancing to downstream nodes.` : `${concept.name} is well mastered! Recommend taking target practice to maintain 90%+ retention.`}"
            </p>
          </div>
        </div>

        {/* Inspector Action Buttons */}
        <div className="space-y-2 pt-6 border-t border-gray-100">
          <Button variant="coral" size="md" onClick={handleStartPractice} className="w-full justify-center">
            <Zap className="w-4 h-4 mr-1" /> START PRACTICE
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" size="sm" onClick={handleAskNova} className="justify-center">
              <MessageSquare className="w-3.5 h-3.5 mr-1" /> ASK NOVA
            </Button>
            <Button variant="secondary" size="sm" onClick={onExplain} className="justify-center">
              <BookOpen className="w-3.5 h-3.5 mr-1" /> EXPLAIN
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
