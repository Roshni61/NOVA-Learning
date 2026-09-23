import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';
import { useLearnerBrain } from '../../context/LearnerBrainContext';

interface NextActionPillProps {
  onTriggerAction?: () => void;
}

export const NextActionPill: React.FC<NextActionPillProps> = ({ onTriggerAction }) => {
  const navigate = useNavigate();
  const { getConceptsAtRisk } = useLearnerBrain();

  const atRiskConcepts = getConceptsAtRisk();
  const primaryRisk = atRiskConcepts[0];

  const actionText = primaryRisk
    ? `${primaryRisk.name} Collision Recovery`
    : 'HashMap Collision Recovery';
  const durationText = '12 min';

  const handleClick = () => {
    if (onTriggerAction) {
      onTriggerAction();
    } else {
      // Navigate to profile or mission workspace
      navigate('/profile');
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Next best action: ${actionText}`}
      className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-emerald-500/10 border border-nova-coral/40 dark:border-nova-coral/50 text-nova-coral hover:bg-nova-coral hover:text-white transition-all duration-300 shadow-sm cursor-pointer min-h-[44px]"
    >
      {/* Animated Pulse Badge */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nova-coral opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-nova-coral" />
      </span>

      <Zap className="w-3.5 h-3.5 fill-current flex-shrink-0" />

      <div className="flex items-center gap-1 text-xs font-black tracking-tight">
        <span className="opacity-90">Next Action:</span>
        <span className="underline decoration-nova-coral/50 underline-offset-2 group-hover:no-underline">
          {actionText}
        </span>
        <span className="text-[10px] opacity-75 font-mono">({durationText})</span>
      </div>

      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 flex-shrink-0" />
    </button>
  );
};
