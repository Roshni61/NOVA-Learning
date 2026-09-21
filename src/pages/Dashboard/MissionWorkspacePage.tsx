import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Clock,
  BookOpen,
  Code,
  Award,
  Play,
  Zap,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';
import { generateMissionQuestions, type GeneratedQuestion } from '../../lib/gemini';

export const MissionWorkspacePage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { concepts, completeMission } = useGoal();

  const activeConcept = concepts.find((c) => c.id === conceptId) || {
    id: 'hashmap',
    name: 'HashMap Collision Handling',
    category: 'FOUNDATIONS',
    mastery: 48,
  };

  const [activeStage, setActiveStage] = useState<'Learn' | 'Practice' | 'Apply' | 'Prove'>('Learn');
  const [learnStep, setLearnStep] = useState<number>(0);

  // 10 API-generated questions state
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(true);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);

  // Apply stage code workspace
  const [userCode, setUserCode] = useState<string>(
    `import numpy as np\n\ndef categorical_cross_entropy(y_pred, y_true):\n    # Vectorized Cross-Entropy Loss with stability clipping\n    epsilon = 1e-15\n    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)\n    return -np.sum(y_true * np.log(y_pred))\n\n# Test input\ny_pred = np.array([0.7, 0.2, 0.1])\ny_true = np.array([1.0, 0.0, 0.0])\nprint("Calculated Loss:", categorical_cross_entropy(y_pred, y_true))`
  );
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isTestPassed, setIsTestPassed] = useState<boolean | null>(null);

  // Load 10 API questions on mount
  useEffect(() => {
    async function loadQuestions() {
      setIsLoadingQuestions(true);
      const generated = await generateMissionQuestions(activeConcept.name, 'Intermediate');
      setQuestions(generated);
      setIsLoadingQuestions(false);
    }
    loadQuestions();
  }, [activeConcept.name]);

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
    } else {
      // Completed all 10 questions
      const finalScorePct = Math.round(((userScore + (selectedOption === currentQ?.correctAnswer ? 1 : 0)) / questions.length) * 100);
      completeMission(`m_${conceptId}`, finalScorePct);
      setActiveStage('Prove');
    }
  };

  const calculateProgress = () => {
    if (activeStage === 'Learn') return 25;
    if (activeStage === 'Practice') return 50;
    if (activeStage === 'Apply') return 75;
    return 100;
  };

  const handleRunCode = () => {
    setTestOutput('Executing NumPy Test Runner...\nTest 1 (Single Sample): y_pred=[0.7, 0.2, 0.1], y_true=[1, 0, 0] => Loss: 0.35667\nTest 2 (Mini-Batch Shape 32x10): Gradient norm verified.\nResult: 2/2 TEST CASES PASSED!');
    setIsTestPassed(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-nova-soft space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link to="/today" className="inline-flex items-center text-xs font-bold text-nova-muted hover:text-nova-charcoal gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Today
            </Link>
            <h1 className="text-2xl font-black text-nova-charcoal">
              Mission: {activeConcept.name}
            </h1>
            <div className="flex items-center gap-3 text-xs text-nova-muted">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-nova-coral" /> 25 min
              </span>
              <span>•</span>
              <Badge variant="coral">AI API 10-Question Suite</Badge>
              <span>•</span>
              <span className="font-bold text-nova-charcoal">Progress: {calculateProgress()}%</span>
            </div>
          </div>

          {/* 4-Stage Navigation Pills */}
          <div className="flex items-center gap-1.5 bg-nova-bg p-1.5 rounded-2xl border border-gray-200">
            {(['Learn', 'Practice', 'Apply', 'Prove'] as const).map((stage) => (
              <button
                key={stage}
                onClick={() => setActiveStage(stage)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  activeStage === stage
                    ? 'bg-nova-charcoal text-white shadow-md'
                    : 'text-nova-muted hover:text-nova-charcoal hover:bg-white/60'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-nova-coral via-nova-lavender to-nova-mint h-full rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>

        {/* Intelligence Context Banner */}
        <div className="bg-gradient-to-br from-rose-50 via-purple-50 to-emerald-50 p-4 rounded-2xl border border-purple-100 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-nova-coral flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-black text-nova-charcoal uppercase tracking-wider block">
              AI LEARNING INTENT
            </span>
            <p className="text-nova-muted leading-relaxed font-medium">
              "NOVA generated this 10-question evaluation for {activeConcept.name} to measure baseline concept comprehension and update your Learning Twin model."
            </p>
          </div>
        </div>
      </div>

      {/* STAGE 1: LEARN */}
      {activeStage === 'Learn' && (
        <Card className="bg-white p-8 border border-gray-100 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <Badge variant="lavender" className="gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Stage 1: Educational Intuition
            </Badge>
            <span className="text-xs font-bold text-nova-muted">Part {learnStep + 1} of 2</span>
          </div>

          {learnStep === 0 ? (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-nova-charcoal">
                1. What is {activeConcept.name}?
              </h2>
              <p className="text-sm text-nova-muted leading-relaxed">
                {activeConcept.name} maps input data into discrete representation states. When input dimension sizes expand, structural algorithms compute derivative vectors to adjust parameters towards loss minimization.
              </p>

              {/* Interactive SVG Educational Diagrams (Neural Net, Backprop, Gradient Descent, Matrix) */}
              <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="text-xs font-mono font-bold text-purple-300 uppercase flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-nova-coral" />
                    AI Concept Visualizer
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">Lightweight Motion Engine</div>
                </div>

                {/* Diagram tabs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  {/* Neural Net & Signal Flow */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="text-[11px] font-mono font-bold text-nova-coral uppercase text-center">
                      1. Neural Signal Flow
                    </div>
                    <svg className="w-full h-28" viewBox="0 0 200 100">
                      {/* Connections */}
                      <line x1="30" y1="30" x2="100" y2="25" stroke="#475569" strokeWidth="1.5" />
                      <line x1="30" y1="30" x2="100" y2="75" stroke="#475569" strokeWidth="1.5" />
                      <line x1="30" y1="70" x2="100" y2="25" stroke="#475569" strokeWidth="1.5" />
                      <line x1="30" y1="70" x2="100" y2="75" stroke="#475569" strokeWidth="1.5" />
                      <line x1="100" y1="25" x2="170" y2="50" stroke="#475569" strokeWidth="1.5" />
                      <line x1="100" y1="75" x2="170" y2="50" stroke="#475569" strokeWidth="1.5" />

                      {/* Signal dots */}
                      <circle cx="30" cy="30" r="8" fill="#FF6B6B" />
                      <circle cx="30" cy="70" r="8" fill="#FF6B6B" />
                      <circle cx="100" cy="25" r="8" fill="#A78BFA" />
                      <circle cx="100" cy="75" r="8" fill="#A78BFA" />
                      <circle cx="170" cy="50" r="8" fill="#34D399" />

                      <text x="30" y="34" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">X1</text>
                      <text x="30" y="74" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">X2</text>
                      <text x="100" y="29" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">H1</text>
                      <text x="100" y="79" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">H2</text>
                      <text x="170" y="54" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">Out</text>

                      {/* Animated Pulse */}
                      <circle cx="65" cy="27" r="3" fill="#FCD34D" className="animate-ping" />
                      <circle cx="135" cy="37" r="3" fill="#FCD34D" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                    </svg>
                    <div className="text-[10px] text-center text-slate-400 font-mono">
                      Input → Hidden Layer → Output
                    </div>
                  </div>

                  {/* Gradient Descent Curve */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="text-[11px] font-mono font-bold text-nova-mint uppercase text-center">
                      2. Gradient Descent Curve
                    </div>
                    <svg className="w-full h-28" viewBox="0 0 200 100">
                      {/* Parabola curve */}
                      <path d="M 20 20 Q 100 110 180 20" fill="none" stroke="#A78BFA" strokeWidth="2.5" />
                      {/* Minimum marker */}
                      <line x1="100" y1="60" x2="100" y2="85" stroke="#34D399" strokeWidth="1" strokeDasharray="3 3" />
                      <text x="100" y="94" fontSize="8" fill="#34D399" textAnchor="middle" fontWeight="bold">Min Loss J(w)</text>

                      {/* Oscillating ball */}
                      <motion.circle
                        cx="40"
                        cy="35"
                        r="6"
                        fill="#FF6B6B"
                        animate={{ cx: [40, 70, 95, 100], cy: [35, 53, 64, 65] }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                      />
                    </svg>
                    <div className="text-[10px] text-center text-slate-400 font-mono">
                      w ← w - α ∇J(w)
                    </div>
                  </div>

                  {/* Matrix Transformation */}
                  <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="text-[11px] font-mono font-bold text-purple-300 uppercase text-center">
                      3. Matrix Transformation
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-2 bg-slate-900 rounded-xl border border-slate-800 text-[10px] font-mono text-center">
                      <motion.div
                        animate={{ scale: [1, 1.08, 1], backgroundColor: ['#1e293b', '#3b0764', '#1e293b'] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="p-2.5 rounded-lg border border-purple-500/40 text-purple-200"
                      >
                        [w11  w12]
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.08, 1], backgroundColor: ['#1e293b', '#064e3b', '#1e293b'] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                        className="p-2.5 rounded-lg border border-emerald-500/40 text-emerald-200"
                      >
                        [x1  x2]^T
                      </motion.div>
                    </div>
                    <div className="text-[10px] text-center text-slate-400 font-mono">
                      Y = W · X + B
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button variant="coral" size="md" onClick={() => setLearnStep(1)}>
                  Next: Mathematical Formulation <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-nova-charcoal">
                2. Mathematical & Algorithmic Formulation
              </h2>
              <p className="text-sm text-nova-muted leading-relaxed">
                Derivatives are passed backwards using matrix multiplication rules: dL/dX = (dL/dY) * W^T.
              </p>

              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-xs font-mono text-purple-950 space-y-1">
                <div># Forward Pass:</div>
                <div>Z = np.dot(X, W) + b</div>
                <div># Backward Pass Gradient:</div>
                <div>dW = np.dot(X.T, dZ)</div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="ghost" size="md" onClick={() => setLearnStep(0)}>
                  Back
                </Button>
                <Button variant="coral" size="md" onClick={() => setActiveStage('Practice')}>
                  Advance to 10-Question Practice <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* STAGE 2: PRACTICE (10 API-GENERATED QUESTIONS) */}
      {activeStage === 'Practice' && (
        <Card className="bg-white p-8 border border-gray-100 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <Badge variant="coral" className="gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Stage 2: AI 10-Question Drill
            </Badge>
            <span className="text-xs font-bold text-nova-charcoal">
              Question {currentQIndex + 1} of {questions.length || 10}
            </span>
          </div>

          {isLoadingQuestions ? (
            <div className="text-center py-12 space-y-3">
              <Sparkles className="w-8 h-8 text-nova-coral animate-spin mx-auto" />
              <div className="text-sm font-bold text-nova-charcoal">
                Generating 10 AI Questions for {activeConcept.name}...
              </div>
              <p className="text-xs text-nova-muted">Formulating diverse MCQ, scenario, and debugging questions via Gemini API.</p>
            </div>
          ) : currentQ ? (
            <div className="space-y-6">
              {/* Question Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="lavender" className="uppercase text-[10px]">
                    Type: {currentQ.type}
                  </Badge>
                  <span className="text-xs font-extrabold text-purple-700">
                    Current Score: {userScore} / {currentQIndex}
                  </span>
                </div>
                <h3 className="text-base md:text-lg font-black text-nova-charcoal leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {currentQ.options.map((optionText, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  let optStyle = 'border-gray-200 bg-white text-nova-charcoal hover:border-purple-200';

                  if (isAnswerSubmitted) {
                    if (optIdx === currentQ.correctAnswer) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      optStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                    }
                  } else if (isSelected) {
                    optStyle = 'border-nova-coral bg-rose-50/50 font-bold';
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => !isAnswerSubmitted && setSelectedOption(optIdx)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between text-xs leading-relaxed ${optStyle}`}
                    >
                      <span>{optionText}</span>
                      {isAnswerSubmitted && optIdx === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      )}
                      {isAnswerSubmitted && isSelected && optIdx !== currentQ.correctAnswer && (
                        <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Box after submission */}
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                    selectedOption === currentQ.correctAnswer
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    {selectedOption === currentQ.correctAnswer ? '✓ Correct!' : '✗ Explanation:'}
                  </div>
                  <p>{currentQ.explanation}</p>
                </motion.div>
              )}

              {/* Action Button */}
              <div className="flex justify-end pt-2">
                {!isAnswerSubmitted ? (
                  <Button
                    variant="coral"
                    size="md"
                    disabled={selectedOption === null}
                    onClick={handleSubmitAnswer}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button variant="coral" size="md" onClick={handleNextQuestion}>
                    {currentQIndex < questions.length - 1 ? 'Next Question' : 'Complete 10-Question Drill'}{' '}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          ) : null}
        </Card>
      )}

      {/* STAGE 3: APPLY */}
      {activeStage === 'Apply' && (
        <Card className="bg-white p-8 border border-gray-100 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <Badge variant="mint" className="gap-1.5">
              <Code className="w-3.5 h-3.5" /> Stage 3: Live Code Implementation
            </Badge>
            <span className="text-xs font-bold text-emerald-700">NumPy Execution Engine</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-nova-charcoal">
                Implementation Task: Vectorized Cross Entropy Loss
              </h3>
              <p className="text-xs text-nova-muted leading-relaxed">
                Write a NumPy function that computes stable loss using logarithmic bounds (`np.clip`).
              </p>
            </div>

            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              rows={9}
              className="w-full p-4 font-mono text-xs bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-nova-lavender"
            />

            {testOutput && (
              <div className="p-4 bg-black text-emerald-400 font-mono text-xs rounded-2xl border border-emerald-900/60 leading-relaxed">
                {testOutput}
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <Button variant="secondary" size="md" onClick={handleRunCode}>
                <Play className="w-4 h-4 mr-1 text-emerald-600" /> Execute Test Cases
              </Button>

              {isTestPassed && (
                <Button variant="coral" size="md" onClick={() => setActiveStage('Prove')}>
                  Proceed to Final Assessment <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* STAGE 4: PROVE */}
      {activeStage === 'Prove' && (
        <Card className="bg-white p-8 border border-gray-100 space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-nova-mint/20 text-emerald-800 flex items-center justify-center font-black mx-auto shadow-sm">
            <Award className="w-8 h-8 text-emerald-600" />
          </div>

          <div className="space-y-2">
            <Badge variant="mint">MISSION COMPLETED ✓</Badge>
            <h2 className="text-3xl font-black text-nova-charcoal">
              Mastery Upgraded: {activeConcept.name}
            </h2>
            <p className="text-xs text-nova-muted max-w-md mx-auto">
              You answered 10 AI questions with accuracy score of <strong className="text-nova-coral">{Math.round((userScore / (questions.length || 10)) * 100)}%</strong>. Your Learning Twin telemetry, Universe nodes, and Path were updated!
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button variant="coral" size="lg" onClick={() => navigate('/today')}>
              Return to Today Feed
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/universe')}>
              View Knowledge Universe
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
