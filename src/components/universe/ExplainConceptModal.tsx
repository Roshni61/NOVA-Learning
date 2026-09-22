import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { Button, Card, Badge } from '../ui';
import type { ConceptNodeData } from '../../types';

interface ExplainConceptModalProps {
  concept: ConceptNodeData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExplainConceptModal: React.FC<ExplainConceptModalProps> = ({ concept, isOpen, onClose }) => {
  const [step, setStep] = useState<'definition' | 'diagram' | 'example' | 'check'>('definition');
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  if (!isOpen || !concept) return null;

  const handleCheckAnswer = (optIndex: number) => {
    setSelectedOpt(optIndex);
    setIsCorrect(optIndex === 1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 relative border-purple-100">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="coral" className="gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Concept Visualizer
                </Badge>
                <span className="text-xs font-bold text-nova-charcoal">{concept.name}</span>
              </div>

              <div className="flex items-center gap-1">
                {(['definition', 'diagram', 'example', 'check'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStep(s)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                      step === s ? 'bg-nova-charcoal text-white' : 'bg-nova-bg text-nova-muted hover:text-nova-charcoal'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 1: Definition */}
            {step === 'definition' && (
              <div className="space-y-4 py-2">
                <h3 className="text-xl font-black text-nova-charcoal">What is {concept.name}?</h3>
                <p className="text-sm text-nova-muted leading-relaxed">
                  {concept.name} is a fundamental building block in {concept.category}. It provides O(1) average-time complexity for lookups and insertions by mapping keys through a hash function to array bucket indexes.
                </p>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-xs text-purple-900 font-semibold space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Lightbulb className="w-4 h-4 text-nova-yellow" /> Key Intuition
                  </div>
                  <p>
                    Think of it like an indexed coat check room: instead of searching through every coat sequentially (O(N)), your ticket number instantly directs you to the exact rack slot (O(1)).
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <Button variant="coral" size="md" onClick={() => setStep('diagram')}>
                    See Visual Diagram <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Interactive Diagram */}
            {step === 'diagram' && (
              <div className="space-y-4 py-2">
                <h3 className="text-lg font-black text-nova-charcoal">Visual Execution Flow</h3>
                
                {/* Render SVG / Animated Flow Diagram */}
                <div className="bg-nova-charcoal text-white p-6 rounded-2xl border border-gray-800 space-y-4 text-center">
                  <div className="flex items-center justify-around gap-2 text-xs">
                    <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 font-mono text-nova-coral">
                      Key: "name"
                    </div>
                    <ArrowRight className="w-4 h-4 text-nova-lavender animate-pulse" />
                    <div className="p-3 bg-purple-900/60 rounded-xl border border-purple-500/50 font-mono text-purple-200">
                      Hash Function: 0x8F3A
                    </div>
                    <ArrowRight className="w-4 h-4 text-nova-lavender animate-pulse" />
                    <div className="p-3 bg-emerald-950 rounded-xl border border-emerald-500/50 font-mono text-emerald-300">
                      Bucket [4]
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-slate-400 font-mono">
                    Index = hash("name") % Array_Capacity (e.g. 1013 % 8 = Bucket 4)
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="ghost" size="md" onClick={() => setStep('definition')}>
                    Back
                  </Button>
                  <Button variant="coral" size="md" onClick={() => setStep('example')}>
                    View Code Example <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Code Example */}
            {step === 'example' && (
              <div className="space-y-4 py-2">
                <h3 className="text-lg font-black text-nova-charcoal">Real Code Example</h3>

                <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 space-y-2">
                  <div className="text-slate-500">// Inserting key-value pair in Python</div>
                  <div><span className="text-purple-400">user_scores</span> = {}</div>
                  <div><span className="text-purple-400">user_scores</span>[<span className="text-emerald-300">"user"</span>] = <span className="text-amber-300">98</span>  <span className="text-slate-500"># O(1) Insert</span></div>
                  <div>print(<span className="text-purple-400">user_scores</span>.get(<span className="text-emerald-300">"user"</span>)) <span className="text-slate-500"># O(1) Lookup: 98</span></div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="ghost" size="md" onClick={() => setStep('diagram')}>
                    Back
                  </Button>
                  <Button variant="coral" size="md" onClick={() => setStep('check')}>
                    Test Understanding <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Check Understanding */}
            {step === 'check' && (
              <div className="space-y-4 py-2">
                <h3 className="text-lg font-black text-nova-charcoal">Quick Concept Check</h3>
                <p className="text-xs text-nova-muted font-medium">
                  What happens when two distinct keys produce the exact same bucket index in a HashMap?
                </p>

                <div className="space-y-2">
                  {[
                    'The previous key is automatically erased from memory.',
                    'A collision occurs, which is resolved via Chaining (linked lists) or Open Addressing.',
                    'The array size permanently shrinks to 1.',
                  ].map((opt, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCheckAnswer(idx)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer text-xs font-semibold transition-all ${
                        selectedOpt === idx
                          ? isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                            : 'border-rose-500 bg-rose-50 text-rose-950'
                          : 'border-gray-200 hover:border-gray-300 bg-white text-nova-charcoal'
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>

                {isCorrect !== null && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold ${
                      isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    {isCorrect ? 'Correct! ✓ Collision resolution keeps both entries safely accessible.' : 'Incorrect. Try again! Hashing handles collisions via chaining or open addressing.'}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <Button variant="primary" size="md" onClick={onClose}>
                    Done Learning
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
