import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '../ui';

interface SkillItem {
  skill: string;
  mastery: number; // 0 - 100
  fullMark?: number;
}

interface InteractiveRadarProps {
  skills: SkillItem[];
}

export const InteractiveRadar: React.FC<InteractiveRadarProps> = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const numSides = skills.length;
  const radius = 110;
  const centerX = 150;
  const centerY = 150;

  // Calculate vertex points for polygon mesh
  const getCoordinates = (index: number, valPercentage: number) => {
    const angle = (Math.PI * 2 / numSides) * index - Math.PI / 2;
    const currentRadius = (radius * valPercentage) / 100;
    const x = centerX + currentRadius * Math.cos(angle);
    const y = centerY + currentRadius * Math.sin(angle);
    return { x, y };
  };

  // Generate radar polygon points string
  const radarPoints = skills
    .map((s, idx) => {
      const { x, y } = getCoordinates(idx, s.mastery);
      return `${x},${y}`;
    })
    .join(' ');

  // Generate grid concentric rings (20%, 40%, 60%, 80%, 100%)
  const gridRings = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Interactive SVG Radar Mesh */}
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <div className="absolute inset-4 rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-xl animate-pulse pointer-events-none" />

          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            {/* Concentric Grid Rings */}
            {gridRings.map((scale, ringIdx) => {
              const points = skills
                .map((_, idx) => {
                  const { x, y } = getCoordinates(idx, scale * 100);
                  return `${x},${y}`;
                })
                .join(' ');
              return (
                <polygon
                  key={ringIdx}
                  points={points}
                  fill="none"
                  stroke={ringIdx === 4 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(203, 213, 225, 0.25)'}
                  strokeWidth={ringIdx === 4 ? '1.5' : '1'}
                  strokeDasharray={ringIdx < 4 ? '3 3' : undefined}
                />
              );
            })}

            {/* Axis Lines */}
            {skills.map((_, idx) => {
              const { x, y } = getCoordinates(idx, 100);
              return (
                <line
                  key={idx}
                  x1={centerX}
                  y1={centerY}
                  x2={x}
                  y2={y}
                  stroke="rgba(203, 213, 225, 0.3)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Animated Radar Filled Polygon Mesh */}
            <motion.polygon
              points={radarPoints}
              fill="url(#radarGrad)"
              stroke="#F43F5E"
              strokeWidth="2.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
            />

            {/* Vertex Nodes & Interactive Markers */}
            {skills.map((skill, idx) => {
              const { x, y } = getCoordinates(idx, skill.mastery);
              const labelCoords = getCoordinates(idx, 118);
              const isHovered = hoveredSkill?.skill === skill.skill;

              return (
                <g key={skill.skill} className="cursor-pointer group">
                  {/* Outer pulse circle on hover */}
                  {isHovered && (
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="rgba(244, 63, 94, 0.25)"
                      className="animate-ping"
                    />
                  )}

                  {/* Vertex Point Circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? '7' : '5'}
                    fill={isHovered ? '#F43F5E' : '#8B5CF6'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    className="transition-all duration-200"
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  />

                  {/* Text Label near vertex */}
                  <text
                    x={labelCoords.x}
                    y={labelCoords.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`text-[11px] font-extrabold transition-colors ${
                      isHovered ? 'fill-nova-coral font-black' : 'fill-slate-600 dark:fill-slate-300'
                    }`}
                  >
                    {skill.skill}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Skill Telemetry & Detail Panel */}
        <div className="flex-1 w-full space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-nova-coral" />
              Live Telemetry Metrics
            </span>
            <Badge variant="mint" className="text-[10px] font-bold">
              AI Twin Synced
            </Badge>
          </div>

          <div className="space-y-3">
            {skills.map((s) => {
              const isHovered = hoveredSkill?.skill === s.skill;
              return (
                <div
                  key={s.skill}
                  onMouseEnter={() => setHoveredSkill(s)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isHovered
                      ? 'bg-nova-coral/10 dark:bg-nova-coral/20 border-nova-coral shadow-md scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between text-xs font-bold text-nova-charcoal dark:text-slate-100 mb-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      {s.skill}
                    </span>
                    <span className="text-nova-coral font-black">{s.mastery}%</span>
                  </div>

                  <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.mastery}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="bg-gradient-to-r from-nova-coral via-purple-500 to-emerald-400 h-full rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hovered Skill Tooltip Card */}
          <AnimatePresence mode="wait">
            {hoveredSkill && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="p-3 bg-slate-950 text-white rounded-xl text-xs space-y-1 shadow-lg border border-slate-800"
              >
                <div className="font-black text-nova-coral">
                  {hoveredSkill.skill} • {hoveredSkill.mastery}% Mastery
                </div>
                <p className="text-[11px] text-slate-300">
                  {hoveredSkill.mastery >= 85
                    ? 'Expert domain proficiency. Automated verification active.'
                    : hoveredSkill.mastery >= 70
                    ? 'Strong foundation. Recommend 1 practice mission to achieve Expert status.'
                    : 'Active development domain. Targeted practice suggested.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
