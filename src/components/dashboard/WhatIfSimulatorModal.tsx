import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, Calendar, Clock, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';
import { Button, Card, Badge } from '../ui';
import { useGoal } from '../../context/GoalContext';

interface WhatIfSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatIfSimulatorModal: React.FC<WhatIfSimulatorModalProps> = ({ isOpen, onClose }) => {
  const { targetGoal, monthsToTarget, hoursPerDay, setTimeline, updateGoalData } = useGoal();

  const [simHours, setSimHours] = useState<number>(hoursPerDay);
  const [simMonths, setSimMonths] = useState<number>(monthsToTarget);

  if (!isOpen) return null;

  // Calculation estimates
  const baseReadinessPace = 10; // % per month at 2h/day
  const calculatedReadiness = Math.min(98, Math.round((simHours / 2) * simMonths * baseReadinessPace));
  const isHighPaceWarning = simHours > 3 && simMonths < 4;

  const handleApply = () => {
    setTimeline(simMonths, simHours);
    updateGoalData({ readiness: Math.min(95, Math.max(50, calculatedReadiness)) });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-xl"
        >
          <Card className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 relative border-purple-100">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-nova-charcoal transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="space-y-1">
              <Badge variant="coral" className="gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                What-If Scenario Planner
              </Badge>
              <h2 className="text-2xl font-black text-nova-charcoal">
                Simulate Your Learning Velocity
              </h2>
              <p className="text-xs text-nova-muted">
                Adjust daily commitment or timeline targets to simulate readiness for{' '}
                <strong className="text-nova-charcoal font-bold">{targetGoal}</strong>.
              </p>
            </div>

            {/* Sliders Container */}
            <div className="space-y-6 bg-nova-bg p-5 rounded-2xl border border-gray-200">
              {/* Slider 1: Study Time */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-bold text-nova-charcoal">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-nova-coral" />
                    Daily Commitment
                  </span>
                  <span className="px-3 py-1 bg-nova-coral text-white text-xs font-black rounded-lg">
                    {simHours} hrs / day
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6"
                  step="0.5"
                  value={simHours}
                  onChange={(e) => setSimHours(Number(e.target.value))}
                  className="w-full accent-nova-coral cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-nova-muted">
                  <span>0.5h (Casual)</span>
                  <span>2.5h (Optimal)</span>
                  <span>6.0h (Intensive)</span>
                </div>
              </div>

              {/* Slider 2: Target Months */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-sm font-bold text-nova-charcoal">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    Target Deadline
                  </span>
                  <span className="px-3 py-1 bg-nova-lavender text-nova-charcoal text-xs font-black rounded-lg">
                    {simMonths} Months
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={simMonths}
                  onChange={(e) => setSimMonths(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-nova-muted">
                  <span>1 Mo (Sprint)</span>
                  <span>6 Mo (Recommended)</span>
                  <span>12 Mo (Paced)</span>
                </div>
              </div>
            </div>

            {/* Dynamic Calculation Live Result */}
            <div className="bg-gradient-to-br from-rose-50 via-purple-50 to-emerald-50 p-5 rounded-2xl border border-purple-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-nova-charcoal uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-nova-coral" />
                  Simulated Outcome
                </span>
                <span className="text-xs font-black text-purple-900 bg-purple-100 px-2.5 py-1 rounded-full">
                  Pace Index: {(simHours * 0.8).toFixed(1)}x
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
                  <div className="text-[11px] text-nova-muted">Est. Goal Readiness</div>
                  <div className="text-xl font-black text-nova-coral">{calculatedReadiness}%</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
                  <div className="text-[11px] text-nova-muted">Daily Mission Workload</div>
                  <div className="text-xl font-black text-purple-700">
                    {Math.round(simHours * 1.5)} Tasks
                  </div>
                </div>
              </div>

              {isHighPaceWarning && (
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-100/80 p-2.5 rounded-xl border border-amber-200">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600" />
                  <span>High intensity pace detected. Ensure sufficient rest to avoid burn-out.</span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" size="md" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="coral" size="md" onClick={handleApply}>
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Apply Strategy
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WhatIfSimulatorModal;
