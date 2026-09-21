import React from 'react';
import { GitCommit } from 'lucide-react';
import { Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';

export const PathPage: React.FC = () => {
  const { targetGoal, monthsToTarget } = useGoal();

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-nova-soft space-y-2">
        <Badge variant="coral" className="gap-1.5">
          <GitCommit className="w-3.5 h-3.5" />
          Milestone Progression Path
        </Badge>
        <h1 className="text-2xl md:text-3xl font-black text-nova-charcoal">
          {targetGoal} Roadmap
        </h1>
        <p className="text-sm text-nova-muted">
          Milestone timeline targeted for completion within {monthsToTarget} months.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="bg-white p-6 border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-nova-coral text-white font-bold flex items-center justify-center text-xs">
                M1
              </span>
              <h3 className="text-base font-bold text-nova-charcoal">Foundational Math & Linear Algebra</h3>
            </div>
            <Badge variant="mint">Completed</Badge>
          </div>
          <p className="text-xs text-nova-muted">Vectors, Matrix operations, Eigenvalues, and Basic Derivative Calculus.</p>
        </Card>

        <Card className="bg-white p-6 border border-gray-100 space-y-4 border-l-4 border-l-nova-coral">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-nova-charcoal text-nova-coral font-bold flex items-center justify-center text-xs">
                M2
              </span>
              <h3 className="text-base font-bold text-nova-charcoal">Neural Network Architectures (Active)</h3>
            </div>
            <Badge variant="coral">68% In Progress</Badge>
          </div>
          <p className="text-xs text-nova-muted">Computational Graphs, Backpropagation, Optimization Algorithms, and Loss Functions.</p>
        </Card>

        <Card className="bg-white p-6 border border-gray-100 space-y-4 opacity-75">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs">
                M3
              </span>
              <h3 className="text-base font-bold text-nova-charcoal">Deep Learning & LLM Systems</h3>
            </div>
            <Badge variant="outline">Upcoming</Badge>
          </div>
          <p className="text-xs text-nova-muted">Transformers, Attention Mechanisms, Fine-tuning, and RAG Deployment.</p>
        </Card>
      </div>
    </div>
  );
};
