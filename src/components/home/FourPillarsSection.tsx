import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiagnosticQuizModal } from '../dashboard/DiagnosticQuizModal';
import WhatIfSimulatorModal from '../dashboard/WhatIfSimulatorModal';

export interface PillarCard {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  description: string;
  buttonLabel: string;
  actionType: 'navigate' | 'modal';
  target: string;
}

export const pillars: PillarCard[] = [
  {
    id: 'diagnostic',
    icon: '🎯',
    iconBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-500',
    title: 'Goal & Diagnostic Engine',
    description: 'Adaptive baseline assessments pinpoints exact concept gaps instead of starting from scratch.',
    buttonLabel: 'Adaptive Baseline →',
    actionType: 'navigate',
    target: '/today?action=diagnostic' // opens diagnostic assessment
  },
  {
    id: 'universe',
    icon: '🕸️',
    iconBg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
    title: 'Knowledge Universe',
    description: 'Interactive graph network mapping dependencies, prerequisites, and live mastery states.',
    buttonLabel: 'Prerequisite Mapping →',
    actionType: 'navigate',
    target: '/universe' // maps to 'My Universe' nav view
  },
  {
    id: 'mastery',
    icon: '📚',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    title: '5-Stage Execution Cycle',
    description: 'Learn → Practice → Apply → Prove → Master cycle ensures deep retention over superficial watching.',
    buttonLabel: 'Deep Mastery Loop →',
    actionType: 'navigate',
    target: '/today' // navigates directly to the Daily Mission Stack
  },
  {
    id: 'simulator',
    icon: '🧠',
    iconBg: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
    title: 'AI Tutor & Simulator',
    description: 'Contextual tutor drawer and real-time What-If scenario planner for schedule adjustments.',
    buttonLabel: 'Interactive Simulator →',
    actionType: 'navigate',
    target: '/today?action=simulate' // opens Simulate My Path modal
  }
];

export const FourPillarsSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<'diagnostic' | 'simulator' | null>(null);

  const handlePillarClick = (pillar: PillarCard) => {
    if (pillar.id === 'diagnostic' && pillar.actionType === 'modal') {
      setActiveModal('diagnostic');
    } else if (pillar.id === 'simulator' && pillar.actionType === 'modal') {
      setActiveModal('simulator');
    } else {
      navigate(pillar.target);
    }
  };

  return (
    <section id="features" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          The Four Pillars of NOVA Intelligence
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300 text-base max-w-2xl mx-auto">
          Re-engineered from the ground up to replace static courses with real-time feedback loops.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="flex flex-col justify-between p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div>
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl mb-6 ${pillar.iconBg}`}>
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <button
              onClick={() => handlePillarClick(pillar)}
              aria-label={`Open ${pillar.title}: ${pillar.buttonLabel}`}
              className="mt-8 flex items-center text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors group text-left cursor-pointer min-h-[44px]"
            >
              <span className="group-hover:translate-x-0.5 transition-transform">{pillar.buttonLabel}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Modals for Homepage triggers */}
      <DiagnosticQuizModal
        isOpen={activeModal === 'diagnostic'}
        onClose={() => setActiveModal(null)}
      />
      <WhatIfSimulatorModal
        isOpen={activeModal === 'simulator'}
        onClose={() => setActiveModal(null)}
      />
    </section>
  );
};

export default FourPillarsSection;
