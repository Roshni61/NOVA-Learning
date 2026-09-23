import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui';

interface MotionMetricsCardProps {
  label: string;
  value: string | number;
  change: string;
  status?: 'gap' | 'top' | 'normal' | 'mastery';
  icon?: React.ReactNode;
}

export const MotionMetricsCard: React.FC<MotionMetricsCardProps> = ({
  label,
  value,
  change,
  status = 'normal',
  icon,
}) => {
  // Determine color theme based on metric status
  const getTheme = () => {
    switch (status) {
      case 'gap':
        return {
          text: 'text-nova-coral',
          subtext: 'text-nova-coral font-bold',
          badge: 'bg-rose-50 dark:bg-rose-950/40 text-nova-coral border-rose-200 dark:border-rose-900',
          pathColor: '#F43F5E',
          pathData: 'M0 25 Q 15 35, 30 15 T 60 28 T 90 10 T 120 20',
        };
      case 'top':
        return {
          text: 'text-purple-600 dark:text-purple-300',
          subtext: 'text-purple-600 dark:text-purple-400 font-bold',
          badge: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-900',
          pathColor: '#8B5CF6',
          pathData: 'M0 28 Q 20 10, 40 22 T 80 8 T 120 4',
        };
      case 'mastery':
        return {
          text: 'text-emerald-600 dark:text-emerald-400',
          subtext: 'text-emerald-600 dark:text-emerald-400 font-bold',
          badge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
          pathColor: '#10B981',
          pathData: 'M0 30 Q 30 20, 60 12 T 90 6 T 120 2',
        };
      default:
        return {
          text: 'text-nova-charcoal dark:text-slate-100',
          subtext: 'text-slate-500 dark:text-slate-400 font-semibold',
          badge: 'bg-gray-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-gray-200 dark:border-slate-700',
          pathColor: '#6366F1',
          pathData: 'M0 22 Q 25 15, 50 25 T 100 12 T 120 18',
        };
    }
  };

  const theme = getTheme();

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className="bg-white dark:bg-slate-900 p-5 border border-gray-100 dark:border-slate-800 space-y-3 rounded-3xl shadow-nova-soft hover:shadow-xl dark:shadow-slate-950/50 transition-all relative overflow-hidden group">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500" />

        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {label}
          </span>
          {icon && (
            <div className={`p-2 rounded-xl border text-xs ${theme.badge}`}>
              {icon}
            </div>
          )}
        </div>

        <div className="space-y-0.5">
          <div className={`text-2xl sm:text-3xl font-black ${theme.text}`}>
            {value}
          </div>
          <div className={`text-[11px] ${theme.subtext}`}>{change}</div>
        </div>

        {/* Animated Sparkline SVG */}
        <div className="pt-2">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 120 35">
            <defs>
              <linearGradient id={`grad-${status}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={theme.pathColor} stopOpacity="0.4" />
                <stop offset="100%" stopColor={theme.pathColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Sparkline Area */}
            <motion.path
              d={`${theme.pathData} L 120 35 L 0 35 Z`}
              fill={`url(#grad-${status})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />

            {/* Sparkline Stroke */}
            <motion.path
              d={theme.pathData}
              fill="none"
              stroke={theme.pathColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </Card>
    </motion.div>
  );
};
