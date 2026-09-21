import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BrainCircuit,
  Zap,
  Network,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { useGoal } from '../../context/GoalContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { concepts, selectConcept } = useGoal();
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open trigger handled in parent or here
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedConcepts = concepts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden"
        >
          {/* Search Header Input */}
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <Search className="w-5 h-5 text-nova-coral" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="NOVA Command Center (Type concept, prompt, or action...)"
              className="flex-1 text-sm font-semibold text-nova-charcoal focus:outline-none"
              autoFocus
            />
            <span className="text-[10px] font-bold text-nova-muted bg-gray-100 px-2 py-1 rounded-lg">
              ESC
            </span>
          </div>

          {/* Quick Actions & Search Results */}
          <div className="p-4 max-h-96 overflow-y-auto space-y-4">
            {query.trim() === '' ? (
              <div className="space-y-3">
                <div className="text-[10px] font-black uppercase text-nova-muted tracking-wider">
                  Quick System Commands
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div
                    onClick={() => {
                      onClose();
                      navigate('/universe');
                    }}
                    className="p-3 bg-nova-bg hover:bg-purple-50 rounded-xl border border-gray-200 cursor-pointer flex items-center gap-2 font-bold text-nova-charcoal"
                  >
                    <Network className="w-4 h-4 text-purple-600" /> Open Universe Graph
                  </div>

                  <div
                    onClick={() => {
                      onClose();
                      navigate('/mission/hashmap');
                    }}
                    className="p-3 bg-nova-bg hover:bg-purple-50 rounded-xl border border-gray-200 cursor-pointer flex items-center gap-2 font-bold text-nova-charcoal"
                  >
                    <Zap className="w-4 h-4 text-nova-coral" /> Practice Weak Area (HashMap)
                  </div>

                  <div
                    onClick={() => {
                      onClose();
                      navigate('/tutor');
                    }}
                    className="p-3 bg-nova-bg hover:bg-purple-50 rounded-xl border border-gray-200 cursor-pointer flex items-center gap-2 font-bold text-nova-charcoal"
                  >
                    <BrainCircuit className="w-4 h-4 text-emerald-600" /> Ask AI Tutor
                  </div>

                  <div
                    onClick={() => {
                      onClose();
                      navigate('/path');
                    }}
                    className="p-3 bg-nova-bg hover:bg-purple-50 rounded-xl border border-gray-200 cursor-pointer flex items-center gap-2 font-bold text-nova-charcoal"
                  >
                    <BookOpen className="w-4 h-4 text-amber-600" /> View Adaptive Path
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase text-nova-muted tracking-wider">
                  Matching Concepts ({matchedConcepts.length})
                </div>

                {matchedConcepts.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      selectConcept(c.id);
                      onClose();
                      navigate('/universe');
                    }}
                    className="p-3 rounded-xl border border-gray-100 bg-nova-bg hover:bg-purple-50 flex items-center justify-between text-xs cursor-pointer"
                  >
                    <div>
                      <span className="font-extrabold text-nova-charcoal block">{c.name}</span>
                      <span className="text-[10px] text-nova-muted">{c.category} • {c.mastery}% Mastery</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
