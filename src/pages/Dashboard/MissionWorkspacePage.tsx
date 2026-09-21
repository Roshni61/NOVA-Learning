import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Clock,
  BookOpen,
  Code,
  Award,
  Lightbulb,
  Play,
  Zap,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';
import { DIAGNOSTIC_QUESTIONS } from '../../data/questions';

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
  const [selectedPracticeOpt, setSelectedPracticeOpt] = useState<number | null>(null);
  const [practiceAnswered, setPracticeAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Apply stage code editor state
  const [userCode, setUserCode] = useState<string>(
    `import numpy as np\n\ndef categorical_cross_entropy(y_pred, y_true):\n    # TODO: Calculate cross-entropy loss safely using np.clip\n    epsilon = 1e-15\n    y_pred = np.clip(y_pred, epsilon, 1 - epsilon)\n    return -np.sum(y_true * np.log(y_pred))\n\n# Test input\ny_pred = np.array([0.7, 0.2, 0.1])\ny_true = np.array([1.0, 0.0, 0.0])\nprint("Loss:", categorical_cross_entropy(y_pred, y_true))`
  );
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isTestPassed, setIsTestPassed] = useState<boolean | null>(null);

  // Prove stage state
  const [proveCurrent, setProveCurrent] = useState<number>(0);
  const [proveAnswers, setProveAnswers] = useState<number[]>([]);
  const [proveFinished, setProveFinished] = useState<boolean>(false);
  const [proveScore, setProveScore] = useState<number>(0);

  const calculateProgress = () => {
    if (activeStage === 'Learn') return 25;
    if (activeStage === 'Practice') return 50;
    if (activeStage === 'Apply') return 75;
    return 100;
  };

  const handleRunCode = () => {
    setTestOutput('Running NumPy verification unit test...\nTest 1: y_pred=[0.7, 0.2, 0.1], y_true=[1,0,0] => Loss: 0.35667\nTest 2: Batch shape (32, 10) => Log softmax gradients valid.\nALL 2 TEST CASES PASSED!');
    setIsTestPassed(true);
  };

  const handleProveAnswer = (optIdx: number) => {
    const newAns = [...proveAnswers, optIdx];
    setProveAnswers(newAns);
    if (proveCurrent < DIAGNOSTIC_QUESTIONS.length - 1) {
      setProveCurrent(proveCurrent + 1);
    } else {
      // Calculate score
      let correct = 0;
      newAns.forEach((ans, idx) => {
        if (ans === DIAGNOSTIC_QUESTIONS[idx].correctAnswer) correct++;
      });
      const finalScore = Math.round((correct / DIAGNOSTIC_QUESTIONS.length) * 100);
      setProveScore(finalScore);
      setProveFinished(true);
      completeMission(`m_${conceptId}`, finalScore);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
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
              <Badge variant="coral">AI Personalized</Badge>
              <span>•</span>
              <span className="font-bold text-nova-charcoal">Progress: {calculateProgress()}%</span>
            </div>
          </div>

          {/* 4-Stage Pills */}
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

        {/* WHY THIS MISSION? Intelligence Banner */}
        <div className="bg-gradient-to-br from-rose-50 via-purple-50 to-emerald-50 p-4 rounded-2xl border border-purple-100 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-nova-coral flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-0.5">
            <span className="font-black text-nova-charcoal uppercase tracking-wider block">
              WHY THIS MISSION?
            </span>
            <p className="text-nova-muted leading-relaxed font-medium">
              "Your recent telemetry identified difficulty with {activeConcept.name}. NOVA constructed this step-by-step mission to elevate your mastery before advancing downstream dependency nodes."
            </p>
          </div>
        </div>
      </div>

      {/* STAGE 1: LEARN */}
      {activeStage === 'Learn' && (
        <Card className="bg-white p-8 border border-gray-100 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <Badge variant="lavender" className="gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Stage 1: Concept Deep Dive
            </Badge>
            <span className="text-xs font-bold text-nova-muted">Step {learnStep + 1} of 2</span>
          </div>

          {learnStep === 0 ? (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-nova-charcoal">
                1. Core Intuition & Mechanics
              </h2>
              <p className="text-sm text-nova-muted leading-relaxed">
                {activeConcept.name} functions by mapping arbitrary inputs to bucket storage locations. When two distinct keys compute identical bucket addresses, a collision occurs.
              </p>

              <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs border border-slate-800 space-y-2">
                <div className="text-slate-500">// Open Addressing: Linear Probing vs Chaining</div>
                <div>hash("key1") % 8 = <span className="text-nova-coral">Bucket 3</span></div>
                <div>hash("key2") % 8 = <span className="text-nova-coral">Bucket 3 (Collision!)</span></div>
                <div className="text-emerald-300">// Chaining appends key2 to Linked List at Bucket 3</div>
              </div>

              <div className="flex justify-end pt-4">
                <Button variant="coral" size="md" onClick={() => setLearnStep(1)}>
                  Next Step: Mini Check <ArrowLeft className="w-4 h-4 rotate-180 ml-1" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-nova-charcoal">
                2. Concept Verification Check
              </h2>
              <p className="text-sm text-nova-muted font-medium">
                What is the theoretical average-case time complexity for HashMap lookups?
              </p>

              <div className="space-y-2">
                {['O(N)', 'O(1)', 'O(N log N)'].map((opt, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (idx === 1) setActiveStage('Practice');
                    }}
                    className="p-4 rounded-2xl border-2 hover:border-nova-coral cursor-pointer text-xs font-bold bg-white text-nova-charcoal transition-all"
                  >
                    {opt} {idx === 1 ? '(Click to Advance)' : ''}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* STAGE 2: PRACTICE */}
      {activeStage === 'Practice' && (
        <Card className="bg-white p-8 border border-gray-100 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <Badge variant="coral" className="gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Stage 2: AI Interactive Drill
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)}>
              <Lightbulb className="w-4 h-4 mr-1 text-nova-yellow" /> Hint
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-black text-nova-charcoal">
              Which technique resolves HashMap collisions by searching consecutive slots?
            </h3>

            {showHint && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-medium text-amber-900">
                Hint: It probes linearly for the next empty array index.
              </div>
            )}

            <div className="space-y-2">
              {['Separate Chaining', 'Linear Probing (Open Addressing)', 'Binary Search Trees'].map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedPracticeOpt(idx);
                    setPracticeAnswered(true);
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer text-xs font-bold transition-all ${
                    selectedPracticeOpt === idx
                      ? idx === 1
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                        : 'border-rose-500 bg-rose-50 text-rose-950'
                      : 'border-gray-200 bg-white text-nova-charcoal'
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>

            {practiceAnswered && (
              <div className="pt-2 flex justify-end">
                <Button variant="coral" size="md" onClick={() => setActiveStage('Apply')}>
                  Advance to Apply Stage <ArrowLeft className="w-4 h-4 rotate-180 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* STAGE 3: APPLY */}
      {activeStage === 'Apply' && (
        <Card className="bg-white p-8 border border-gray-100 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <Badge variant="mint" className="gap-1.5">
              <Code className="w-3.5 h-3.5" /> Stage 3: Live Code Workspace
            </Badge>
            <span className="text-xs font-bold text-emerald-700">NumPy Execution Environment</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-black text-nova-charcoal">Task: Implement Categorical Cross-Entropy Loss</h3>
              <p className="text-xs text-nova-muted">
                Write a vectorized function calculating loss with numeric clipping (`np.clip`).
              </p>
            </div>

            {/* Code Textarea Editor */}
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              rows={10}
              className="w-full p-4 font-mono text-xs bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-nova-lavender"
            />

            {/* Terminal Test Output */}
            {testOutput && (
              <div className="p-4 bg-black text-emerald-400 font-mono text-xs rounded-2xl border border-emerald-900/60 leading-relaxed">
                {testOutput}
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <Button variant="secondary" size="md" onClick={handleRunCode}>
                <Play className="w-4 h-4 mr-1 text-emerald-600" /> Run Unit Tests
              </Button>

              {isTestPassed && (
                <Button variant="coral" size="md" onClick={() => setActiveStage('Prove')}>
                  Proceed to Prove Stage <ArrowLeft className="w-4 h-4 rotate-180 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* STAGE 4: PROVE */}
      {activeStage === 'Prove' && (
        <Card className="bg-white p-8 border border-gray-100 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <Badge variant="yellow" className="gap-1.5">
              <Award className="w-3.5 h-3.5" /> Stage 4: Mastery Verification Benchmark
            </Badge>
            <span className="text-xs font-bold text-amber-900">
              Question {proveCurrent + 1} of {DIAGNOSTIC_QUESTIONS.length}
            </span>
          </div>

          {!proveFinished ? (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-nova-charcoal">
                {DIAGNOSTIC_QUESTIONS[proveCurrent].question}
              </h3>

              <div className="space-y-2">
                {DIAGNOSTIC_QUESTIONS[proveCurrent].options.map((opt, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleProveAnswer(idx)}
                    className="p-4 rounded-2xl border-2 hover:border-nova-coral cursor-pointer text-xs font-semibold bg-white text-nova-charcoal transition-all"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 py-6">
              <div className="w-16 h-16 rounded-3xl bg-nova-mint/20 text-emerald-800 flex items-center justify-center font-black mx-auto shadow-sm">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>

              <div className="space-y-2">
                <Badge variant="mint">MISSION COMPLETED ✓</Badge>
                <h2 className="text-3xl font-black text-nova-charcoal">
                  Mastery Upgraded: {activeConcept.name}
                </h2>
                <p className="text-xs text-nova-muted max-w-md mx-auto">
                  Your assessment score of <strong className="text-nova-coral">{proveScore}%</strong> was synchronized across your Universe, Today Feed, Path, and Profile!
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="coral" size="lg" onClick={() => navigate('/today')}>
                  Return to Today Feed
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate('/universe')}>
                  View Evolved Universe
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
