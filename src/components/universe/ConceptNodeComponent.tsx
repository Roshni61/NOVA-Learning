import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ConceptNodeData } from '../../types';

export const ConceptNodeComponent: React.FC<{ data: ConceptNodeData & { selected?: boolean } }> = ({ data }) => {
  const { name, mastery, status, category, selected } = data;

  const isMastered = status === 'Mastered';
  const isDeveloping = status === 'Developing';
  const isNeedsPractice = status === 'Needs Practice';
  const isKnowledgeGap = status === 'Knowledge Gap';
  const isLocked = status === 'Locked';

  let borderStyle = 'border-gray-200 bg-white/90 text-nova-charcoal backdrop-blur-md';
  let badgeStyle = 'bg-gray-100 text-gray-700';
  let glowStyle = 'hover:shadow-lg hover:shadow-purple-500/10';

  if (isMastered) {
    borderStyle = 'border-emerald-400/90 bg-emerald-50/90 text-emerald-950 backdrop-blur-md';
    badgeStyle = 'bg-emerald-500 text-white font-bold';
    glowStyle = 'shadow-md shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/25 glow-mint';
  } else if (isDeveloping) {
    borderStyle = 'border-amber-400/90 bg-amber-50/90 text-amber-950 backdrop-blur-md';
    badgeStyle = 'bg-amber-400 text-amber-950 font-bold';
    glowStyle = 'shadow-md shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/25 glow-yellow';
  } else if (isNeedsPractice) {
    borderStyle = 'border-rose-400/90 bg-rose-50/90 text-rose-950 backdrop-blur-md';
    badgeStyle = 'bg-rose-400 text-white font-bold';
    glowStyle = 'shadow-md shadow-rose-500/10 hover:shadow-xl hover:shadow-rose-500/25 glow-coral';
  } else if (isKnowledgeGap) {
    borderStyle = 'border-rose-600 bg-rose-100/95 text-rose-950 backdrop-blur-md ring-2 ring-rose-500/40';
    badgeStyle = 'bg-rose-600 text-white font-black';
    glowStyle = 'shadow-xl shadow-rose-500/30 animate-pulse-glow glow-coral';
  } else if (isLocked) {
    borderStyle = 'border-gray-200 bg-gray-100/70 text-gray-400 opacity-60';
    badgeStyle = 'bg-gray-200 text-gray-500';
    glowStyle = '';
  }

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative px-4 py-3 rounded-2xl border-2 transition-all duration-300 min-w-[170px] ${borderStyle} ${glowStyle} ${
        selected ? 'ring-4 ring-nova-coral ring-offset-2 scale-105 shadow-2xl z-30 glow-coral' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-2.5 h-2.5 !bg-purple-600 border-2 border-white shadow-sm" />

      {/* Category Pill */}
      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider mb-1 opacity-80">
        <span className="truncate max-w-[100px]">{category}</span>
        {isMastered && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
        {isKnowledgeGap && <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-bounce" />}
        {isLocked && <Lock className="w-3 h-3 text-gray-400" />}
      </div>

      {/* Concept Name */}
      <h4 className="text-xs font-bold leading-tight mb-2 tracking-tight">
        {name}
      </h4>

      {/* Mastery Bar & Badge */}
      <div className="space-y-1 pt-1 border-t border-black/10">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium opacity-80">Mastery</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${badgeStyle}`}>
            {mastery}%
          </span>
        </div>
        <div className="w-full bg-black/10 h-1 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${mastery}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              isMastered ? 'bg-emerald-500' : isKnowledgeGap ? 'bg-rose-600' : 'bg-nova-coral'
            }`}
          />
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-2.5 h-2.5 !bg-nova-coral border-2 border-white shadow-sm" />
    </motion.div>
  );
};

