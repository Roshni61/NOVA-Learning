import React from 'react';
import { motion } from 'framer-motion';
import { Network, CheckCircle2, Lock } from 'lucide-react';
import { Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';

const KNOWLEDGE_NODES = [
  { id: 'n1', title: 'Linear Algebra & Matrices', state: 'Mastered', progress: 100, level: 'Foundational' },
  { id: 'n2', title: 'Multivariate Calculus', state: 'Mastered', progress: 100, level: 'Foundational' },
  { id: 'n3', title: 'Computational Graphs & Backprop', state: 'Active Priority', progress: 65, level: 'Core' },
  { id: 'n4', title: 'PyTorch Autograd & Tensors', state: 'Unlocked', progress: 20, level: 'Core' },
  { id: 'n5', title: 'Convolutional Neural Networks', state: 'Locked', progress: 0, level: 'Advanced' },
  { id: 'n6', title: 'Transformers & Self-Attention', state: 'Locked', progress: 0, level: 'Advanced' },
];

export const UniversePage: React.FC = () => {
  const { targetGoal } = useGoal();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-nova-soft">
        <div className="space-y-2">
          <Badge variant="lavender" className="gap-1.5">
            <Network className="w-3.5 h-3.5" />
            Knowledge Universe Graph
          </Badge>
          <h1 className="text-2xl md:text-3xl font-black text-nova-charcoal">
            {targetGoal} Concept Dependency Map
          </h1>
          <p className="text-sm text-nova-muted">
            Explore live nodes, prerequisite chains, and concept mastery states.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {KNOWLEDGE_NODES.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
          >
            <Card className="bg-white p-6 border border-gray-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-nova-muted uppercase tracking-wider">
                  {node.level} Node
                </span>
                <Badge
                  variant={
                    node.state === 'Mastered'
                      ? 'mint'
                      : node.state === 'Active Priority'
                      ? 'coral'
                      : node.state === 'Unlocked'
                      ? 'lavender'
                      : 'outline'
                  }
                >
                  {node.state === 'Mastered' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                  {node.state === 'Locked' && <Lock className="w-3 h-3 mr-1" />}
                  {node.state}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-nova-charcoal">{node.title}</h3>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-nova-muted">
                  <span>Mastery Level</span>
                  <span>{node.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      node.state === 'Mastered'
                        ? 'bg-nova-mint'
                        : node.state === 'Active Priority'
                        ? 'bg-nova-coral'
                        : 'bg-nova-lavender'
                    }`}
                    style={{ width: `${node.progress}%` }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
