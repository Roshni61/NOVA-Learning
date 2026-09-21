import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Target,
  Clock,
  BrainCircuit,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Code2,
  Cpu,
  BarChart3,
  Edit3,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';

const PRESET_GOALS = [
  {
    id: 'ai-ml',
    title: 'AI/ML Engineer',
    description: 'Master Neural Networks, LLMs, PyTorch, RAG architectures, and MLOps pipelines.',
    icon: Cpu,
    accent: 'nova-coral',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    description: 'React, TypeScript, Node.js, distributed systems, and modern cloud deployment.',
    icon: Code2,
    accent: 'nova-lavender',
  },
  {
    id: 'datascientist',
    title: 'Data Scientist',
    description: 'Statistical modeling, Python, BigQuery, predictive analytics, and machine learning.',
    icon: BarChart3,
    accent: 'nova-mint',
  },
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { targetGoal, monthsToTarget, hoursPerDay, setGoal, setTimeline } = useGoal();

  const [step, setStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>(targetGoal);
  const [customGoal, setCustomGoal] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [months, setMonths] = useState<number>(monthsToTarget);
  const [hours, setHours] = useState<number>(hoursPerDay);

  const handleSelectPreset = (title: string) => {
    setSelectedGoal(title);
    setIsCustom(false);
  };

  const handleNextStep1 = () => {
    const finalGoal = isCustom && customGoal.trim() ? customGoal.trim() : selectedGoal;
    setGoal(finalGoal);
    setStep(2);
  };

  const handleNextStep2 = () => {
    setTimeline(months, hours);
    setStep(3);
  };

  const handleFinishOnboarding = () => {
    setTimeline(months, hours);
    setGoal(selectedGoal);
    navigate('/login', { state: { fromOnboarding: true, goal: selectedGoal } });
  };

  return (
    <div className="min-h-screen bg-nova-bg flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-nova-lavender">
      <div className="w-full max-w-3xl space-y-8">
        {/* Header Progress indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-nova-charcoal flex items-center justify-center text-nova-coral font-black">
              N
            </div>
            <span className="text-xl font-black text-nova-charcoal">NOVA Goal Setup</span>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'bg-nova-coral w-12'
                    : s < step
                    ? 'bg-nova-charcoal'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Card Container */}
        <Card className="bg-white p-8 md:p-12 shadow-2xl border-gray-100 rounded-3xl min-h-[480px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {/* STEP 1: Select Goal */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <Badge variant="coral">Step 1 of 3</Badge>
                  <h2 className="text-3xl font-black text-nova-charcoal">
                    What is your target career goal?
                  </h2>
                  <p className="text-nova-muted text-sm">
                    NOVA will build an adaptive graph of prerequisites and daily missions tailored to this role.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {PRESET_GOALS.map((item) => {
                    const Icon = item.icon;
                    const isSelected = !isCustom && selectedGoal === item.title;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectPreset(item.title)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                          isSelected
                            ? 'border-nova-coral bg-rose-50/40 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-nova-bg flex items-center justify-center text-nova-charcoal">
                            <Icon className="w-5 h-5" />
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-nova-coral" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-nova-charcoal text-base">{item.title}</h3>
                          <p className="text-xs text-nova-muted mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Goal Input */}
                <div className="pt-2">
                  <div
                    onClick={() => setIsCustom(true)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                      isCustom ? 'border-nova-lavender bg-purple-50/40' : 'border-dashed border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Edit3 className="w-5 h-5 text-nova-muted" />
                    <div className="flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-nova-charcoal block">
                        Or enter a custom target goal
                      </span>
                      {isCustom ? (
                        <input
                          type="text"
                          value={customGoal}
                          onChange={(e) => setCustomGoal(e.target.value)}
                          placeholder="e.g., Senior DevOps Architect"
                          className="w-full mt-1 px-3 py-1.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nova-lavender text-sm font-semibold"
                          autoFocus
                        />
                      ) : (
                        <span className="text-xs text-nova-muted">Click to specify your exact domain...</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <Button variant="coral" size="lg" onClick={handleNextStep1}>
                    Next: Set Commitment <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Timeline & Commitment */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <Badge variant="lavender">Step 2 of 3</Badge>
                  <h2 className="text-3xl font-black text-nova-charcoal">
                    Target Timeline & Daily Commitment
                  </h2>
                  <p className="text-nova-muted text-sm">
                    Configure your pacing. NOVA will adjust the density of daily missions accordingly.
                  </p>
                </div>

                <div className="space-y-8 py-2">
                  {/* Target Months Slider */}
                  <div className="bg-nova-bg p-6 rounded-2xl border border-gray-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-nova-coral" />
                        <span className="font-bold text-nova-charcoal text-base">Target Timeline</span>
                      </div>
                      <span className="px-3 py-1 bg-nova-coral text-white font-extrabold text-sm rounded-xl">
                        {months} Months
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="w-full accent-nova-coral cursor-pointer h-2 bg-gray-200 rounded-lg"
                    />
                    <div className="flex justify-between text-xs text-nova-muted font-medium">
                      <span>1 Month (Sprint)</span>
                      <span>6 Months (Balanced)</span>
                      <span>12 Months (Deep Mastery)</span>
                    </div>
                  </div>

                  {/* Hours Per Day Selector */}
                  <div className="bg-nova-bg p-6 rounded-2xl border border-gray-200/80 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        <span className="font-bold text-nova-charcoal text-base">Daily Commitment</span>
                      </div>
                      <span className="px-3 py-1 bg-nova-lavender text-nova-charcoal font-extrabold text-sm rounded-xl">
                        {hours} Hours / Day
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 4].map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setHours(h)}
                          className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all ${
                            hours === h
                              ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm'
                              : 'border-gray-200 bg-white text-nova-charcoal hover:bg-gray-50'
                          }`}
                        >
                          {h === 4 ? '4+ Hours' : `${h} Hour${h > 1 ? 's' : ''}`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-100">
                  <Button variant="ghost" size="lg" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <Button variant="coral" size="lg" onClick={handleNextStep2}>
                    Next: AI Diagnostic <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Diagnostic Assessment Teaser */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 flex-1 flex flex-col justify-between text-center"
              >
                <div className="space-y-3 max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-nova-coral via-nova-lavender to-nova-mint p-1 mx-auto shadow-lg">
                    <div className="w-full h-full bg-nova-charcoal rounded-[22px] flex items-center justify-center">
                      <BrainCircuit className="w-8 h-8 text-nova-coral" />
                    </div>
                  </div>

                  <Badge variant="mint">Step 3 of 3 • Diagnostic Ready</Badge>
                  <h2 className="text-3xl font-black text-nova-charcoal">
                    Generate Your Baseline & Learning Twin
                  </h2>
                  <p className="text-nova-muted text-sm leading-relaxed">
                    Target: <strong className="text-nova-charcoal">{selectedGoal}</strong> • {months} Months • {hours} hrs/day.
                    NOVA will run an adaptive 5-question baseline assessment to establish your starting node state.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-rose-50 via-purple-50 to-emerald-50 p-6 rounded-3xl border border-purple-100 max-w-md mx-auto space-y-3 text-left">
                  <div className="flex items-center gap-2 font-bold text-nova-charcoal text-sm">
                    <Sparkles className="w-4 h-4 text-nova-coral" />
                    What Happens Next?
                  </div>
                  <ul className="text-xs text-nova-muted space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      Prerequisite gap detection across foundational math & coding
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      Automatic priority assignment for today's 3 daily missions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      What-If simulator active for timeline recalculation
                    </li>
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <Button variant="ghost" size="lg" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Adjust Setup
                  </Button>
                  <button
                    onClick={handleFinishOnboarding}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-nova-coral via-rose-500 to-purple-600 text-white font-bold text-base shadow-nova-soft hover:shadow-nova-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                  >
                    Launch AI Diagnostic Baseline <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};
