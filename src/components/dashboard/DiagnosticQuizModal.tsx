import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BrainCircuit, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { Button, Card, Badge } from '../ui';
import { DIAGNOSTIC_QUESTIONS } from '../../data/questions';
import { useGoal } from '../../context/GoalContext';
import { saveDiagnosticResult } from '../../lib/neon';

interface DiagnosticQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiagnosticQuizModal: React.FC<DiagnosticQuizModalProps> = ({ isOpen, onClose }) => {
  const { targetGoal, updateGoalData } = useGoal();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = DIAGNOSTIC_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Finished all 5 questions
      calculateAndSaveResults(newAnswers);
    }
  };

  const calculateAndSaveResults = async (answers: number[]) => {
    setIsSaving(true);
    let correctCount = 0;
    answers.forEach((ans, idx) => {
      if (ans === DIAGNOSTIC_QUESTIONS[idx].correctAnswer) {
        correctCount++;
      }
    });

    const readinessPct = Math.round((correctCount / DIAGNOSTIC_QUESTIONS.length) * 100);

    // Save to Neon Database
    await saveDiagnosticResult({
      user_email: 'alex.rivera@nova.edu',
      goal: targetGoal,
      score: correctCount,
      total_questions: DIAGNOSTIC_QUESTIONS.length,
      readiness_pct: readinessPct,
    });

    // Update Context
    updateGoalData({ readiness: Math.max(50, readinessPct) });
    setIsSaving(false);
    setIsSubmitted(true);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers([]);
    setIsSubmitted(false);
    onClose();
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
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-nova-charcoal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div className="space-y-6">
                {/* Quiz Header */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge variant="coral" className="gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5" />
                      AI Diagnostic Baseline
                    </Badge>
                    <span className="text-xs font-bold text-nova-muted">
                      Question {currentIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-nova-charcoal pt-1">
                    {currentQ.topic}
                  </h2>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-nova-coral h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>

                {/* Question Prompt */}
                <div className="bg-nova-bg p-5 rounded-2xl border border-gray-200 text-sm font-semibold text-nova-charcoal leading-relaxed">
                  {currentQ.question}
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((optionText, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between text-xs font-medium ${
                          isSelected
                            ? 'border-nova-coral bg-rose-50/50 text-nova-charcoal shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 bg-white text-nova-charcoal'
                        }`}
                      >
                        <span className="leading-relaxed">{optionText}</span>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected
                              ? 'border-nova-coral bg-nova-coral text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Action */}
                <div className="flex justify-end pt-2">
                  <Button
                    variant="coral"
                    size="md"
                    disabled={selectedOption === null || isSaving}
                    onClick={handleNext}
                  >
                    {isSaving
                      ? 'Saving to Neon DB...'
                      : currentIndex === DIAGNOSTIC_QUESTIONS.length - 1
                      ? 'Complete Assessment'
                      : 'Next Question'}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            ) : (
              /* Submission Result Display */
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 rounded-3xl bg-nova-mint/20 text-emerald-800 flex items-center justify-center font-black mx-auto shadow-sm">
                  <Award className="w-8 h-8 text-emerald-600" />
                </div>

                <div className="space-y-2">
                  <Badge variant="mint">Neon DB Synced</Badge>
                  <h2 className="text-2xl font-black text-nova-charcoal">
                    Diagnostic Baseline Established!
                  </h2>
                  <p className="text-xs text-nova-muted max-w-md mx-auto">
                    Your answers were evaluated and synced to the Neon project database. Your initial readiness score is updated.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-rose-50 via-purple-50 to-emerald-50 p-6 rounded-2xl border border-purple-100 max-w-sm mx-auto space-y-2">
                  <div className="text-xs font-bold text-nova-muted uppercase tracking-wider">
                    Calculated Readiness
                  </div>
                  <div className="text-4xl font-black text-nova-coral">
                    {Math.round(
                      (userAnswers.filter((a, i) => a === DIAGNOSTIC_QUESTIONS[i].correctAnswer)
                        .length /
                        DIAGNOSTIC_QUESTIONS.length) *
                        100
                    )}
                    %
                  </div>
                  <p className="text-[11px] text-purple-900 font-medium">
                    Target Goal: <strong className="text-nova-charcoal">{targetGoal}</strong>
                  </p>
                </div>

                <Button variant="primary" size="md" onClick={resetQuiz} className="mx-auto">
                  Continue to Daily Feed
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
