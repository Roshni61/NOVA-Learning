import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { ConceptNodeData } from '../../types';

export const ConceptNodeComponent: React.FC<{ data: ConceptNodeData & { selected?: boolean } }> = ({ data }) => {
  const { name, mastery, status, category, selected } = data;

  const isMastered = status === 'Mastered';
  const isDeveloping = status === 'Developing';
  const isNeedsPractice = status === 'Needs Practice';
  const isKnowledgeGap = status === 'Knowledge Gap';
  const isLocked = status === 'Locked';

  let borderStyle = 'border-gray-200 bg-white text-nova-charcoal';
  let badgeStyle = 'bg-gray-100 text-gray-700';

  if (isMastered) {
    borderStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 shadow-lg shadow-emerald-500/10';
    badgeStyle = 'bg-emerald-500 text-white font-bold';
  } else if (isDeveloping) {
    borderStyle = 'border-amber-400 bg-amber-50/90 text-amber-950 shadow-md shadow-amber-500/10';
    badgeStyle = 'bg-amber-400 text-amber-950 font-bold';
  } else if (isNeedsPractice) {
    borderStyle = 'border-rose-400 bg-rose-50/90 text-rose-950 shadow-md shadow-rose-500/10';
    badgeStyle = 'bg-rose-400 text-white font-bold';
  } else if (isKnowledgeGap) {
    borderStyle = 'border-rose-600 bg-rose-100/90 text-rose-950 shadow-xl shadow-rose-500/30 ring-2 ring-rose-500/40 animate-pulse';
    badgeStyle = 'bg-rose-600 text-white font-black';
  } else if (isLocked) {
    borderStyle = 'border-gray-200 bg-gray-100/70 text-gray-400 opacity-60';
    badgeStyle = 'bg-gray-200 text-gray-500';
  }

  return (
    <div
      className={`relative px-4 py-3 rounded-2xl border-2 transition-all duration-300 min-w-[170px] ${borderStyle} ${
        selected ? 'ring-4 ring-nova-coral ring-offset-2 scale-105 shadow-2xl z-30' : ''
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-2.5 h-2.5 bg-nova-charcoal" />

      {/* Category Pill */}
      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider mb-1 opacity-75">
        <span>{category}</span>
        {isMastered && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
        {isKnowledgeGap && <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-bounce" />}
        {isLocked && <Lock className="w-3 h-3 text-gray-400" />}
      </div>

      {/* Concept Name */}
      <h4 className="text-xs font-bold leading-tight mb-2 tracking-tight">
        {name}
      </h4>

      {/* Mastery & Badge */}
      <div className="flex items-center justify-between pt-1 border-t border-black/10">
        <span className="text-[10px] font-medium opacity-80">Mastery</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${badgeStyle}`}>
          {mastery}%
        </span>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-2.5 h-2.5 bg-nova-coral" />
    </div>
  );
};
