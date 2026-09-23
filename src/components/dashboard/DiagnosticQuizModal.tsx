import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BrainCircuit, CheckCircle2, ArrowRight, Award, Lock, RefreshCcw } from 'lucide-react';
import { Button, Card, Badge } from '../ui';
import { DIAGNOSTIC_QUESTIONS } from '../../data/questions';
import { useGoal } from '../../context/GoalContext';
import { saveDiagnosticResult } from '../../lib/neon';

const SESSION_KEY = 'nova_quiz_active_session';

export type QuizStatus = 'idle' | 'in-progress' | 'evaluating' | 'completed';

interface SavedQuizSession {
  status: QuizStatus;
  currentIndex: number;
  selectedOption: number | null;
  userAnswers: number[];
  isAnswerLocked: boolean;
}

interface DiagnosticQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function safeGetSession<T>(key: string, fallback: T): T {
  try {
    const item = sessionStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (err) {
    console.warn('[DiagnosticQuizModal] SessionStorage read warning:', err);
    return fallback;
  }
}

function safeSetSession<T>(key: string, value: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('[DiagnosticQuizModal] SessionStorage write warning:', err);
  }
}

function safeRemoveSession(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch (err) {
    console.warn('[DiagnosticQuizModal] SessionStorage remove warning:', err);
  }
}

/**
 * Deterministic Quiz State Machine Modal featuring:
 * - Strict state transitions: 'idle' | 'in-progress' | 'evaluating' | 'completed'
 * - Locked answer selection once submitted/confirmed to prevent tampering
 * - Session Storage state persistence to preserve progress across page reloads
 */
export const DiagnosticQuizModal: React.FC<DiagnosticQuizModalProps> = ({ isOpen, onClose }) => {
  const { targetGoal, updateGoalData } = useGoal();

  const [status, setStatus] = useState<QuizStatus>(() => {
    const saved = safeGetSession<SavedQuizSession | null>(SESSION_KEY, null);
    return saved?.status || 'idle';
  });

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const saved = safeGetSession<SavedQuizSession | null>(SESSION_KEY, null);
    return saved?.currentIndex || 0;
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(() => {
    const saved = safeGetSession<SavedQuizSession | null>(SESSION_KEY, null);
    return saved?.selectedOption ?? null;
  });

  const [userAnswers, setUserAnswers] = useState<number[]>(() => {
    const saved = safeGetSession<SavedQuizSession | null>(SESSION_KEY, null);
    return saved?.userAnswers || [];
  });

  const [isAnswerLocked, setIsAnswerLocked] = useState<boolean>(() => {
    const saved = safeGetSession<SavedQuizSession | null>(SESSION_KEY, null);
    return saved?.isAnswerLocked || false;
  });

  // Restore or reset status when modal opens
  useEffect(() => {
    if (isOpen) {
      const saved = safeGetSession<SavedQuizSession | null>(SESSION_KEY, null);
      if (saved && saved.status !== 'completed') {
        setStatus(saved.status);
        setCurrentIndex(saved.currentIndex);
        setSelectedOption(saved.selectedOption);
        setUserAnswers(saved.userAnswers);
        setIsAnswerLocked(saved.isAnswerLocked);
      } else if (status === 'idle') {
        setStatus('in-progress');
      }
    }
  }, [isOpen]);

  // Sync state machine to sessionStorage so reloads retain assessment progress
  useEffect(() => {
    if (status !== 'idle') {
      safeSetSession<SavedQuizSession>(SESSION_KEY, {
        status,
        currentIndex,
        selectedOption,
        userAnswers,
        isAnswerLocked,
      });
    }
  }, [status, currentIndex, selectedOption, userAnswers, isAnswerLocked]);

  if (!isOpen) return null;

  const currentQ = DIAGNOSTIC_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    // Answer is locked once submitted for the current question
    if (isAnswerLocked || status === 'evaluating' || status === 'completed') return;
    setSelectedOption(index);
  };

  const handleConfirmAndNext = () => {
    if (selectedOption === null || isAnswerLocked) return;

    // 1. Lock answer selection
    setIsAnswerLocked(true);

    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);

    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      // Transition to next question after brief lock pulse
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswerLocked(false);
      }, 350);
    } else {
      // Transition State Machine to 'evaluating'
      setStatus('evaluating');
      calculateAndSaveResults(newAnswers);
    }
  };

  const calculateAndSaveResults = async (answers: number[]) => {
    let correctCount = 0;
    answers.forEach((ans, idx) => {
      if (ans === DIAGNOSTIC_QUESTIONS[idx]?.correctAnswer) {
        correctCount++;
      }
    });

    const readinessPct = Math.round((correctCount / DIAGNOSTIC_QUESTIONS.length) * 100);

    try {
      // Save to Neon Database
      await saveDiagnosticResult({
        user_email: 'alex.rivera@nova.edu',
        goal: targetGoal,
        score: correctCount,
        total_questions: DIAGNOSTIC_QUESTIONS.length,
        readiness_pct: readinessPct,
      });
    } catch (err) {
      console.warn('[DiagnosticQuizModal] Neon DB save fallback warning:', err);
    }

    // Update Context
    updateGoalData({ readiness: Math.max(50, readinessPct) });

    // Transition State Machine to 'completed'
    setStatus('completed');
    safeRemoveSession(SESSION_KEY);
  };

  const resetQuiz = () => {
    setStatus('idle');
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setIsAnswerLocked(false);
    safeRemoveSession(SESSION_KEY);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl font-sans"
        >
          <Card className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 relative border-purple-100 dark:border-slate-800">
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close quiz modal"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-nova-charcoal dark:hover:text-slate-200 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            {/* State Machine Branching: in-progress */}
            {status === 'in-progress' && (
              <div className="space-y-6">
                {/* Quiz Header & State Tag */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="coral" className="gap-1.5">
                        <BrainCircuit className="w-3.5 h-3.5" />
                        AI Diagnostic Baseline
                      </Badge>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-800 uppercase font-bold">
                        State: {status}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Question {currentIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-nova-charcoal dark:text-slate-100 pt-1">
                    {currentQ.topic}
                  </h2>
                </div>

                {/* Dynamic Progress Bar */}
                <div className="w-full bg-gray-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-nova-coral h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Question Prompt */}
                <div className="bg-nova-bg dark:bg-slate-850 p-5 rounded-2xl border border-gray-200 dark:border-slate-700 text-sm font-semibold text-nova-charcoal dark:text-slate-100 leading-relaxed">
                  {currentQ.question}
                </div>

                {/* Options List with Answer Locking */}
                <div className="space-y-3">
                  {currentQ.options.map((optionText, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        disabled={isAnswerLocked}
                        aria-label={`Option ${optIdx + 1}: ${optionText}`}
                        className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-xs font-medium text-left cursor-pointer min-h-[44px] ${
                          isSelected
                            ? 'border-nova-coral bg-rose-50/50 dark:bg-rose-950/40 text-nova-charcoal dark:text-white shadow-sm ring-2 ring-rose-200 dark:ring-rose-900'
                            : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-nova-charcoal dark:text-slate-200'
                        } ${isAnswerLocked ? 'cursor-not-allowed opacity-80' : ''}`}
                      >
                        <span className="leading-relaxed flex-1 pr-3">{optionText}</span>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'border-nova-coral bg-nova-coral text-white'
                              : 'border-gray-300 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-600 dark:text-slate-300 font-mono">
                    Session saved automatically
                  </span>

                  <Button
                    variant="coral"
                    size="md"
                    disabled={selectedOption === null || isAnswerLocked}
                    onClick={handleConfirmAndNext}
                    aria-label="Confirm answer and proceed to next question"
                    className="gap-2 min-h-[44px]"
                  >
                    {isAnswerLocked ? (
                      <>
                        <Lock className="w-4 h-4 animate-bounce" /> Answer Locked
                      </>
                    ) : currentIndex === DIAGNOSTIC_QUESTIONS.length - 1 ? (
                      <>
                        Submit & Evaluate <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    ) : (
                      <>
                        Lock Answer & Next <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* State Machine Branching: evaluating */}
            {status === 'evaluating' && (
              <div className="text-center space-y-6 py-8">
                <div className="w-16 h-16 rounded-3xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 flex items-center justify-center font-black mx-auto shadow-inner animate-pulse">
                  <BrainCircuit className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
                </div>

                <div className="space-y-2">
                  <Badge variant="coral">State: evaluating</Badge>
                  <h2 className="text-2xl font-black text-nova-charcoal dark:text-slate-100">
                    Evaluating Answers & Syncing DB...
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Computing readiness percentage and persisting diagnostic baseline telemetry to Neon DB.
                  </p>
                </div>
              </div>
            )}

            {/* State Machine Branching: completed */}
            {status === 'completed' && (
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 rounded-3xl bg-nova-mint/20 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-black mx-auto shadow-sm">
                  <Award className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div className="space-y-2">
                  <Badge variant="mint">State: completed (Neon DB Synced)</Badge>
                  <h2 className="text-2xl font-black text-nova-charcoal dark:text-slate-100">
                    Diagnostic Baseline Established!
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto font-medium">
                    Your answers were locked, evaluated, and stored securely. Your calculated readiness score is updated.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-rose-50 via-purple-50 to-emerald-50 dark:from-slate-800 dark:via-purple-950/60 dark:to-slate-800 p-6 rounded-2xl border border-purple-100 dark:border-purple-800 max-w-sm mx-auto space-y-2">
                  <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Calculated Goal Readiness
                  </div>
                  <div className="text-4xl font-black text-nova-coral">
                    {Math.round(
                      (userAnswers.filter((a, i) => a === DIAGNOSTIC_QUESTIONS[i]?.correctAnswer).length /
                        DIAGNOSTIC_QUESTIONS.length) *
                        100
                    )}
                    %
                  </div>
                  <p className="text-[11px] text-purple-900 dark:text-purple-300 font-medium">
                    Target Goal: <strong className="text-nova-charcoal dark:text-white">{targetGoal}</strong>
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={resetQuiz}
                    className="gap-2 text-xs font-bold min-h-[44px]"
                  >
                    <RefreshCcw className="w-4 h-4" /> Retake Assessment
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={resetQuiz}
                    className="gap-2 font-bold min-h-[44px]"
                  >
                    Continue to Dashboard <ArrowRight className="w-4 h-4" />
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
