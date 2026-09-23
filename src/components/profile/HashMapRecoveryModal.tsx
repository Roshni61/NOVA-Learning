import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, XCircle, Award, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useGoal } from '../../context/GoalContext';
import { Button, Badge } from '../ui';

interface HashMapRecoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'In an open addressing HashMap with linear probing, what happens when a collision occurs at index i?',
    options: [
      'A linked list node is appended to index i.',
      'The algorithm probes sequential indices (i + 1) % table_size until an empty slot is found.',
      'The hash table size is immediately doubled.',
      'The key-value pair is discarded and a key error is raised.',
    ],
    correctOption: 1,
    explanation: 'Linear probing searches sequentially ((i + k) % table_size) until an unoccupied slot is located.',
  },
  {
    id: 2,
    question: 'What is the primary purpose of monitoring the Load Factor (α = N / K) in a HashMap?',
    options: [
      'To calculate CPU thread allocation during key lookup.',
      'To trigger rehashing before O(1) lookup performance degrades due to high collision frequency.',
      'To compress key strings into 64-bit integer values.',
      'To sort entries in natural ascending order.',
    ],
    correctOption: 1,
    explanation: 'When the load factor exceeds a threshold (typically 0.75), rehashing to a larger array keeps collision rates low and maintains O(1) average performance.',
  },
];

export const HashMapRecoveryModal: React.FC<HashMapRecoveryModalProps> = ({ isOpen, onClose }) => {
  const { concepts, updateConceptMastery, addXP } = useGoal();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const hashmapConcept = concepts.find((c) => c.id === 'hashmap');
  const isAlreadyMastered = hashmapConcept?.status === 'Mastered';

  // Body Scroll Lock & Escape key listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIdx]: optionIdx,
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOption) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setIsSubmitted(true);

    // Idempotency Guard: Only update mastery & award +50 XP if not already mastered!
    if (correctCount >= 1 && !isAlreadyMastered) {
      updateConceptMastery('hashmap', 85, true);
      addXP(50);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 font-sans space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-nova-coral/10 text-nova-coral flex items-center justify-center font-bold">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="coral" className="text-[10px] font-bold">
                    Knowledge Gap Drill
                  </Badge>
                  {isAlreadyMastered && (
                    <Badge variant="mint" className="text-[10px] font-bold">
                      Already Mastered
                    </Badge>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-black text-nova-charcoal dark:text-slate-100">
                  HashMap Collision Recovery Mission
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close recovery mission modal"
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSubmitted ? (
            /* Active Quiz Step View */
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400">
                <span>Question {currentStep + 1} of {QUIZ_QUESTIONS.length}</span>
                <span>Topic: Open Addressing & Load Factor</span>
              </div>

              <div className="p-4 bg-nova-bg dark:bg-slate-800/60 rounded-2xl border border-gray-200 dark:border-slate-700">
                <h4 className="text-sm font-bold text-nova-charcoal dark:text-slate-100 leading-relaxed">
                  {QUIZ_QUESTIONS[currentStep].question}
                </h4>
              </div>

              <div className="space-y-3">
                {QUIZ_QUESTIONS[currentStep].options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentStep] === optIdx;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(currentStep, optIdx)}
                      className={`p-3.5 rounded-2xl border text-xs font-semibold cursor-pointer transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-nova-coral/10 dark:bg-nova-coral/20 border-nova-coral text-nova-coral font-bold'
                          : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-nova-coral bg-nova-coral' : 'border-gray-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="font-bold text-xs"
                >
                  Previous
                </Button>

                {currentStep < QUIZ_QUESTIONS.length - 1 ? (
                  <Button
                    variant="coral"
                    size="sm"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    disabled={selectedAnswers[currentStep] === undefined}
                    className="font-bold text-xs gap-1.5"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    variant="coral"
                    size="sm"
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
                    className="font-bold text-xs gap-1.5"
                  >
                    <Award className="w-4 h-4" />
                    <span>Submit Recovery Drill</span>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 mx-auto flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-black text-nova-charcoal dark:text-slate-100">
                  {score === QUIZ_QUESTIONS.length ? 'HashMap Gap Mastered!' : 'Drill Completed'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  You scored {score} of {QUIZ_QUESTIONS.length} correctly.{' '}
                  {!isAlreadyMastered && score >= 1
                    ? 'HashMap collision handling updated to Mastered (+50 XP awarded!).'
                    : 'Concept already mastered. Progress stored.'}
                </p>
              </div>

              {/* Explanations */}
              <div className="space-y-3 text-left max-h-48 overflow-y-auto p-3 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-slate-700 text-xs">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const isCorrect = selectedAnswers[idx] === q.correctOption;
                  return (
                    <div key={q.id} className="space-y-1">
                      <div className="flex items-center gap-2 font-bold">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500" />
                        )}
                        <span className="text-nova-charcoal dark:text-slate-200">
                          Q{idx + 1}: {q.explanation}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <Button variant="ghost" size="sm" onClick={handleReset} className="font-bold text-xs">
                  Retake Drill
                </Button>
                <Button variant="coral" size="sm" onClick={onClose} className="font-bold text-xs">
                  Return to Profile
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
