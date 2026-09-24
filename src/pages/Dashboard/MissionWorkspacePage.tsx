import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Clock,
  BookOpen,
  Code,
  Play,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Target,
  Lock,
  ListVideo,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';
import { generateMissionQuestions, type GeneratedQuestion } from '../../lib/gemini';
import { getMissionDetail } from '../../data/missionRegistry';
import { LessonMediaViewer, CurriculumDrawer, type CurriculumModule, type LessonItem } from '../../components/lms';


const DEMO_CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'm_foundations',
    title: 'Module 1: Mathematical & Algorithmic Intuition',
    lessons: [
      { id: 'backpropagation-computational-graphs', title: '1. Computational Graph & Reverse Sweep', duration: '12:45', completed: true, type: 'video' },
      { id: 'matrix-calculus-gradient-descent', title: '2. Jacobian Matrices & Weight Gradients', duration: '15:20', completed: false, type: 'exercise' },
      { id: 'numpy-loss-function', title: '3. Vectorized Categorical Cross Entropy', duration: '20:15', completed: false, type: 'video' },
    ],
  },
  {
    id: 'm_advanced',
    title: 'Module 2: Autograd & Deep Learning Architectures',
    lessons: [
      { id: 'transformers', title: '4. Scaled Dot-Product Self-Attention', duration: '25:00', completed: false, type: 'video' },
      { id: 'rag', title: '5. Vector Similarity Search & RAG Engines', duration: '30:10', completed: false, type: 'exercise' },
    ],
  },
];

export const MissionWorkspacePage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { completeMission } = useGoal();
  const contentRef = useRef<HTMLDivElement>(null);

  // Dynamically resolve mission data based on route identifier
  const missionData = getMissionDetail(conceptId);

  const [activeStage, setActiveStage] = useState<'Learn' | 'Practice' | 'Apply' | 'Prove'>('Learn');
  const [learnStep, setLearnStep] = useState<number>(0);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState<boolean>(false);

  // Practice Stage State
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(true);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Apply Stage State
  const [userCode, setUserCode] = useState<string>(missionData.applyContent.initialCode);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isTestPassed, setIsTestPassed] = useState<boolean | null>(null);

  // Stage Completion Locks
  const [isPracticeUnlocked, setIsPracticeUnlocked] = useState<boolean>(false);
  const [isApplyUnlocked, setIsApplyUnlocked] = useState<boolean>(false);
  const [isProveUnlocked, setIsProveUnlocked] = useState<boolean>(false);

  // Synchronize state when route conceptId changes
  useEffect(() => {
    setUserCode(missionData.applyContent.initialCode);
    setTestOutput(null);
    setIsTestPassed(null);
    setActiveStage('Learn');
    setLearnStep(0);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserScore(0);
    setShowHint(false);
    setIsPracticeUnlocked(false);
    setIsApplyUnlocked(false);
    setIsProveUnlocked(false);
  }, [conceptId, missionData.id]);

  // Load API questions dynamically
  useEffect(() => {
    async function loadQuestions() {
      setIsLoadingQuestions(true);
      const generated = await generateMissionQuestions({
        missionId: missionData.id,
        title: missionData.title,
        concept: missionData.conceptName,
        subConcept: missionData.category,
        learningObjective: missionData.learningObjective,
        difficulty: missionData.difficulty,
        learnerMastery: 78,
        previousPerformance: 'Chain rule derivatives & collision resolution',
      });
      setQuestions(generated);
      setIsLoadingQuestions(false);
    }
    loadQuestions();
  }, [
    missionData.id,
    missionData.title,
    missionData.conceptName,
    missionData.category,
    missionData.learningObjective,
    missionData.difficulty,
  ]);

  const currentQ = questions[currentQIndex] || null;

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQ) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswer;
    if (isCorrect) setUserScore((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setIsApplyUnlocked(true);
      setActiveStage('Apply');
    }
  };

  const calculateProgress = () => {
    if (activeStage === 'Learn') return 25;
    if (activeStage === 'Practice') return 50;
    if (activeStage === 'Apply') return 75;
    return 100;
  };

  const handleRunCode = () => {
    setTestOutput(missionData.applyContent.expectedOutput);
    setIsTestPassed(true);
    setIsProveUnlocked(true);
  };

  const handleFinalizeProve = () => {
    const finalScorePct = Math.round(
      ((userScore + (selectedOption === currentQ?.correctAnswer ? 1 : 0)) / (questions.length || 10)) * 100
    );
    completeMission(missionData.id, finalScorePct);
  };

  const handleSelectLesson = (lesson: LessonItem) => {
    navigate(`/mission/${lesson.id}`);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 font-sans">
      {/* Top Header Bar */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-nova-soft space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link
              to="/today"
              aria-label="Return to Today dashboard"
              className="inline-flex items-center text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-nova-charcoal dark:hover:text-white gap-1 min-h-[44px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Today
            </Link>
            <h1 className="text-2xl font-black text-nova-charcoal dark:text-slate-100">
              Mission: {missionData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-nova-coral" /> {missionData.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-nova-charcoal dark:text-slate-200">
                <Target className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> {missionData.conceptName}
              </span>
              <span>•</span>
              <Badge variant="coral" className="text-[10px]">
                {missionData.difficulty}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Curriculum Drawer Trigger Button (<768px) with 44x44px Touch Target */}
            <button
              onClick={() => setIsCurriculumOpen(true)}
              aria-label="Toggle curriculum syllabus drawer"
              className="md:hidden px-4 py-2.5 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 text-xs font-bold flex items-center gap-2 border border-purple-200 dark:border-purple-800 min-h-[44px] min-w-[44px] cursor-pointer"
            >
              <ListVideo className="w-4 h-4 text-purple-600" />
              <span>Syllabus</span>
            </button>

            <div className="w-full md:w-60 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-300">Mission Progress</span>
                <span className="text-nova-coral">{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '25%' }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="bg-gradient-to-r from-nova-coral via-nova-lavender to-nova-mint h-full rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stage Navigation Tabs with 44x44px Touch Targets */}
        <div className="flex items-center gap-2 border-t border-gray-100 dark:border-slate-800 pt-4 overflow-x-auto">
          {(['Learn', 'Practice', 'Apply', 'Prove'] as const).map((stage) => {
            const isUnlocked =
              stage === 'Learn' ||
              (stage === 'Practice' && isPracticeUnlocked) ||
              (stage === 'Apply' && isApplyUnlocked) ||
              (stage === 'Prove' && isProveUnlocked);

            return (
              <button
                key={stage}
                disabled={!isUnlocked}
                onClick={() => setActiveStage(stage)}
                aria-label={`Switch to ${stage} stage (${
                  stage === 'Learn' ? '25%' : stage === 'Practice' ? '50%' : stage === 'Apply' ? '75%' : '100%'
                } progress). ${isUnlocked ? 'Unlocked' : 'Locked'}`}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap min-h-[44px] ${
                  activeStage === stage
                    ? 'bg-nova-charcoal dark:bg-slate-100 text-white dark:text-nova-charcoal shadow-md'
                    : isUnlocked
                    ? 'bg-nova-bg dark:bg-slate-800 text-nova-charcoal dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer'
                    : 'bg-gray-100 dark:bg-slate-900/60 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'
                }`}
              >
                {!isUnlocked && <Lock className="w-3 h-3" />}
                {stage === 'Learn' && '1. Learn (25%)'}
                {stage === 'Practice' && '2. Practice (50%)'}
                {stage === 'Apply' && '3. Apply (75%)'}
                {stage === 'Prove' && '4. Prove (100%)'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Content Viewport (7/12) & Right Desktop Curriculum Drawer (5/12) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Main Content Viewport (Scrolled into view automatically on lesson selection) */}
        <div ref={contentRef} className="md:col-span-7 space-y-6 scroll-mt-24">
          {/* STAGE 1: LEARN (Conceptual Understanding & Video Player) */}
          {activeStage === 'Learn' && (
            <Card className="bg-white dark:bg-slate-900 p-6 md:p-8 border border-gray-100 dark:border-slate-800 space-y-6 rounded-3xl shadow-nova-soft">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Badge variant="mint" className="gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Stage 1: Learn (25% Progress)
                  </Badge>
                </div>
                <span className="text-xs font-bold text-nova-charcoal dark:text-slate-100">Step {learnStep + 1} of 2</span>
              </div>

              {/* Responsive Video & Interactive Media Viewer Component */}
              <LessonMediaViewer
                lessonId={missionData.id}
                title={missionData.title}
                onEnded={() => setLearnStep(1)}
              />


              {learnStep === 0 ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-black text-nova-charcoal dark:text-slate-100">
                      {missionData.learnContent.part1Title}
                    </h2>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {missionData.learnContent.part1Text}
                    </p>
                  </div>

                  <div className="bg-purple-50/80 dark:bg-purple-950/50 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/60 space-y-1.5 text-xs text-purple-950 dark:text-purple-200">
                    <span className="font-extrabold uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      Intuition & Core Principle
                    </span>
                    <p className="leading-relaxed font-medium">
                      {missionData.learningObjective}
                    </p>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      variant="coral"
                      size="md"
                      onClick={() => setLearnStep(1)}
                      aria-label="Advance to formulation and code example"
                      className="min-h-[44px] gap-2"
                    >
                      <span>Next: Formulation & Code Example</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-black text-nova-charcoal dark:text-slate-100">
                      {missionData.learnContent.part2Title}
                    </h2>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {missionData.learnContent.part2Text}
                    </p>
                  </div>

                  {missionData.learnContent.codeSnippet && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-nova-charcoal dark:text-slate-200 uppercase tracking-wider">
                        Code Formulation Snippet:
                      </span>
                      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs font-mono text-purple-300 space-y-1 overflow-x-auto">
                        <pre>{missionData.learnContent.codeSnippet}</pre>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-slate-800">
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() => setLearnStep(0)}
                      aria-label="Go back to step 1"
                      className="min-h-[44px]"
                    >
                      Back
                    </Button>
                    <Button
                      variant="coral"
                      size="md"
                      onClick={() => {
                        setIsPracticeUnlocked(true);
                        setActiveStage('Practice');
                      }}
                      aria-label="Complete Learn stage and unlock Practice"
                      className="min-h-[44px] gap-2"
                    >
                      <span>Complete Learn & Unlock Practice (50%)</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* STAGE 2: PRACTICE */}
          {activeStage === 'Practice' && (
            <Card className="bg-white dark:bg-slate-900 p-6 md:p-8 border border-gray-100 dark:border-slate-800 space-y-6 rounded-3xl shadow-nova-soft">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Badge variant="coral" className="gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> Stage 2: Practice (50% Progress)
                  </Badge>
                </div>
                <span className="text-xs font-bold text-nova-charcoal dark:text-slate-100">
                  Question {currentQIndex + 1} of {questions.length || 10}
                </span>
              </div>

              {isLoadingQuestions ? (
                <div className="text-center py-12 space-y-3">
                  <Sparkles className="w-8 h-8 text-nova-coral animate-spin mx-auto" />
                  <div className="text-sm font-bold text-nova-charcoal dark:text-slate-100">
                    Formulating 10 Mission-Aware AI Drill Questions for "{missionData.title}"...
                  </div>
                </div>
              ) : currentQ ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="lavender" className="uppercase text-[10px]">
                          Concept: {currentQ.concept}
                        </Badge>
                      </div>
                      <span className="text-xs font-extrabold text-purple-700 dark:text-purple-400">
                        Score: {userScore} / {currentQIndex}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-black text-nova-charcoal dark:text-slate-100 leading-relaxed">
                      {currentQ.question}
                    </h3>
                  </div>

                  <div>
                    {!showHint ? (
                      <button
                        onClick={() => setShowHint(true)}
                        aria-label="Reveal guided hint"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-300 hover:text-nova-coral bg-purple-50 dark:bg-purple-950/60 px-3 py-2 rounded-xl border border-purple-100 dark:border-purple-800 transition-all min-h-[44px] cursor-pointer"
                      >
                        <HelpCircle className="w-4 h-4 text-purple-600" /> Reveal Guided Hint
                      </button>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 bg-amber-50 dark:bg-amber-950/60 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 font-medium">
                        <span className="font-bold block text-amber-900 dark:text-amber-300 mb-0.5">💡 Guided Hint:</span>
                        Pay attention to local gradient derivatives and matrix shape alignment.
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {currentQ.options.map((optionText, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      let optStyle = 'border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-nova-charcoal dark:text-slate-100 hover:border-purple-200';

                      if (isAnswerSubmitted) {
                        if (optIdx === currentQ.correctAnswer) {
                          optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-bold shadow-sm';
                        } else if (isSelected) {
                          optStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-950 dark:text-rose-200';
                        }
                      } else if (isSelected) {
                        optStyle = 'border-nova-coral bg-rose-50/50 dark:bg-rose-950/40 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswerSubmitted}
                          onClick={() => setSelectedOption(optIdx)}
                          aria-label={`Select option ${optIdx + 1}: ${optionText}`}
                          className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-xs leading-relaxed text-left min-h-[44px] cursor-pointer ${optStyle}`}
                        >
                          <span>{optionText}</span>
                          {isAnswerSubmitted && optIdx === currentQ.correctAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          )}
                          {isAnswerSubmitted && isSelected && optIdx !== currentQ.correctAnswer && (
                            <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswerSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                        selectedOption === currentQ.correctAnswer
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                          : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {selectedOption === currentQ.correctAnswer ? '✓ Correct Answer!' : '✗ Explanation:'}
                      </div>
                      <p>{currentQ.explanation}</p>
                    </motion.div>
                  )}

                  <div className="flex justify-end pt-2">
                    {!isAnswerSubmitted ? (
                      <Button
                        variant="coral"
                        size="md"
                        disabled={selectedOption === null}
                        onClick={handleSubmitAnswer}
                        aria-label="Submit practice answer and check feedback"
                        className="min-h-[44px]"
                      >
                        Submit Answer & Check Feedback
                      </Button>
                    ) : (
                      <Button
                        variant="coral"
                        size="md"
                        onClick={handleNextQuestion}
                        aria-label="Advance to next question or stage"
                        className="min-h-[44px] gap-2"
                      >
                        <span>{currentQIndex < questions.length - 1 ? 'Next Question' : 'Complete Practice & Unlock Apply (75%)'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ) : null}
            </Card>
          )}

          {/* STAGE 3: APPLY */}
          {activeStage === 'Apply' && (
            <Card className="bg-white dark:bg-slate-900 p-6 md:p-8 border border-gray-100 dark:border-slate-800 space-y-6 rounded-3xl shadow-nova-soft">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Badge variant="mint" className="gap-1.5">
                    <Code className="w-3.5 h-3.5" /> Stage 3: Apply (75% Progress)
                  </Badge>
                </div>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">NumPy Execution Engine</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-nova-charcoal dark:text-slate-100">
                    {missionData.applyContent.taskTitle}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {missionData.applyContent.taskDescription}
                  </p>
                </div>

                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={9}
                  aria-label="Code editor for implementation task"
                  className="w-full p-4 font-mono text-xs bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-nova-lavender"
                />

                {testOutput && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-black text-emerald-400 font-mono text-xs rounded-2xl border border-emerald-900/60 leading-relaxed whitespace-pre-line">
                    {testOutput}
                  </motion.div>
                )}

                <div className="flex justify-between items-center pt-2 flex-wrap gap-3">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleRunCode}
                    aria-label="Execute unit test runner"
                    className="min-h-[44px] gap-2"
                  >
                    <Play className="w-4 h-4 text-emerald-600" /> Execute Unit Test Runner
                  </Button>

                  {isTestPassed && (
                    <Button
                      variant="coral"
                      size="md"
                      onClick={() => { setIsProveUnlocked(true); setActiveStage('Prove'); }}
                      aria-label="Pass unit tests and unlock Prove stage"
                      className="min-h-[44px] gap-2"
                    >
                      <span>Pass Tests & Unlock Prove (100%)</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* STAGE 4: PROVE */}
          {activeStage === 'Prove' && (
            <Card className="bg-white dark:bg-slate-900 p-8 border border-gray-100 dark:border-slate-800 space-y-6 text-center rounded-3xl shadow-nova-soft">
              <div className="w-16 h-16 rounded-3xl bg-nova-mint/20 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-black mx-auto shadow-sm">
                <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div className="space-y-2">
                <Badge variant="mint">STAGE 4: INDEPENDENT MASTERY PROVEN (100% PROGRESS)</Badge>
                <h2 className="text-2xl md:text-3xl font-black text-nova-charcoal dark:text-slate-100">
                  Independent Mastery Verified: {missionData.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed font-medium">
                  You completed all 4 stages (Learn → Practice → Apply → Prove) for <strong className="text-nova-charcoal dark:text-white">{missionData.title}</strong> with 100% test pass accuracy.
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-4 flex-wrap">
                <Button
                  variant="coral"
                  size="lg"
                  onClick={() => {
                    handleFinalizeProve();
                    navigate('/today');
                  }}
                  aria-label="Update Learning Twin and return to Today"
                  className="min-h-[44px]"
                >
                  Update Learning Twin & Return to Today
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Desktop Curriculum Drawer (5/12) & Mobile Slide-Over Sheet */}
        <div className="md:col-span-5">
          <div className="sticky top-20">
            <CurriculumDrawer
              modules={DEMO_CURRICULUM_MODULES}
              activeLessonId={conceptId || 'backpropagation-computational-graphs'}
              onSelectLesson={handleSelectLesson}
              contentRef={contentRef}
              isOpen={isCurriculumOpen}
              onClose={() => setIsCurriculumOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
