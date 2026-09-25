import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Network,
  BrainCircuit,
  Target,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  TrendingUp,
  Flame,
  Award,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-nova-bg dark:bg-slate-950 text-nova-charcoal dark:text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-nova-lavender">
      {/* Minimalist Header */}
      <header className="sticky top-0 z-50 bg-nova-bg/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" aria-label="NOVA Home" className="flex items-center gap-3 group min-h-[44px]">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-nova-coral via-nova-lavender to-nova-mint p-[2px] shadow-sm transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-nova-charcoal rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-nova-coral" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-nova-charcoal dark:text-slate-100 flex items-center gap-1.5">
                NOVA
                <span className="w-2 h-2 rounded-full bg-nova-coral inline-block"></span>
              </span>
              <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                Learning Intelligence
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-nova-charcoal dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#methodology" className="hover:text-nova-charcoal dark:hover:text-white transition-colors">
              Methodology
            </a>
            <a href="#universe" className="hover:text-nova-charcoal dark:hover:text-white transition-colors">
              Knowledge Universe
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="md" aria-label="Sign in" className="min-h-[44px]">
                Sign In
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button variant="coral" size="md" aria-label="Get started with NOVA onboarding" className="min-h-[44px] gap-1.5">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-6 max-w-7xl mx-auto w-full overflow-hidden">
        {/* Ambient AI Background Lights & Particle Atmosphere */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-nova-lavender/25 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-glow" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-nova-coral/20 rounded-full blur-3xl -z-10 pointer-events-none animate-float-slow" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-purple-500/10 via-nova-coral/10 to-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Floating Neural Particles Canvas SVG overlay */}
        <svg className="absolute inset-0 w-full h-full -z-10 opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15%" cy="25%" r="3" fill="#FF6B6B" className="animate-ping" style={{ animationDuration: '4s' }} />
          <circle cx="85%" cy="30%" r="4" fill="#A78BFA" className="animate-ping" style={{ animationDuration: '6s' }} />
          <circle cx="50%" cy="15%" r="2" fill="#34D399" className="animate-ping" style={{ animationDuration: '5s' }} />
          <line x1="15%" y1="25%" x2="50%" y2="15%" stroke="#A78BFA" strokeWidth="1" strokeDasharray="4 4" className="neural-line" />
          <line x1="50%" y1="15%" x2="85%" y2="30%" stroke="#FF6B6B" strokeWidth="1" strokeDasharray="4 4" className="neural-line" />
        </svg>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6 text-left"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 self-start">
              <Badge variant="lavender" className="px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-purple-200 dark:border-purple-800">
                <Sparkles className="w-3.5 h-3.5 text-purple-700 dark:text-purple-300 animate-spin" style={{ animationDuration: '8s' }} />
                Next-Gen Continuous AI Learning Platform
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-6xl font-black text-nova-charcoal dark:text-slate-100 tracking-tight leading-[1.15]">
              Your goal. Your knowledge.{' '}
              <span className="bg-gradient-to-r from-nova-coral via-purple-600 to-nova-lavender bg-clip-text text-transparent">
                Your next move.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
              Shift away from static LMS videos and rigid linear paths. NOVA creates an adaptive,
              living <strong className="text-nova-charcoal dark:text-white font-semibold">Learning Twin</strong> that diagnoses gaps, predicts target timelines, and delivers personalized daily execution cycles.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(255, 107, 107, 0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Start your continuous learning journey"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-nova-coral via-rose-500 to-purple-600 text-white font-semibold text-base shadow-nova-soft transition-all flex items-center justify-center gap-3 cursor-pointer min-h-[44px]"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="secondary" size="lg" aria-label="Explore knowledge universe" className="w-full sm:w-auto border-gray-300 dark:border-slate-700 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 min-h-[44px]">
                    Explore Knowledge Universe
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Social proof badges */}
            <div className="pt-6 border-t border-gray-200/60 dark:border-slate-800 flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Adaptive Diagnostic Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-nova-coral" />
                <span>Real-time What-If Simulation</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Animated Learning Twin Preview Card */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Animated Floating Card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/80 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6 glow-lavender">
                {/* Header inside Card */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nova-lavender to-purple-300 flex items-center justify-center text-nova-charcoal font-bold text-lg shadow-inner">
                      LT
                    </div>
                    <div>
                      <h3 className="font-bold text-nova-charcoal dark:text-slate-100 text-base flex items-center gap-1.5">
                        Learning Twin
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Live Student Intelligence</p>
                    </div>
                  </div>
                  <Badge variant="mint" className="animate-pulse">
                    Active Goal: AI/ML Engineer
                  </Badge>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-nova-bg dark:bg-slate-800/60 p-4 rounded-2xl border border-gray-100/80 dark:border-slate-700 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      Retention Rate
                    </div>
                    <div className="text-2xl font-black text-nova-charcoal dark:text-slate-100">94%</div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '94%' }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className="bg-nova-mint h-full rounded-full"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-nova-bg dark:bg-slate-800/60 p-4 rounded-2xl border border-gray-100/80 dark:border-slate-700 shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      <Flame className="w-4 h-4 text-nova-coral animate-bounce" />
                      Active Streak
                    </div>
                    <div className="text-2xl font-black text-nova-charcoal dark:text-slate-100">12 Days</div>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">Top 5% Learner</p>
                  </motion.div>
                </div>

                {/* Current Mission Preview */}
                <div className="bg-gradient-to-br from-purple-50 via-white to-rose-50 dark:from-slate-800 dark:via-purple-950/60 dark:to-slate-800 p-4 rounded-2xl border border-purple-100 dark:border-purple-800 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                      <BrainCircuit className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      Next Priority Node
                    </span>
                    <span className="text-xs font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-2 py-0.5 rounded-full">
                      25 min
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-nova-charcoal dark:text-slate-100">
                    Backpropagation & Computational Graphs
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Prerequisite for Deep Learning Architecture mastery.
                  </p>
                </div>

                {/* Interactive Action Preview */}
                <Link to="/today" className="block">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="primary" size="md" aria-label="Launch Today's feed" className="w-full justify-between group min-h-[44px]">
                      <span>Launch Today's Feed</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
              </Card>
            </motion.div>

            {/* Decorative Floating Pill Badges */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-4 -left-4 z-20 hidden sm:block"
            >
              <div className="bg-nova-charcoal text-white px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-xl flex items-center gap-2 border border-gray-700 glow-yellow">
                <Award className="w-4 h-4 text-nova-yellow" />
                <span>Goal Readiness: 68%</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section (4 Pillars) */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-gray-200/50 dark:border-slate-800">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="lavender">Architected for Continuous Growth</Badge>
          <h2 className="text-3xl md:text-5xl font-black text-nova-charcoal dark:text-slate-100 tracking-tight">
            The Four Pillars of NOVA Intelligence
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg">
            Re-engineered from the ground up to replace static courses with real-time feedback loops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Pillar 1 */}
          <Card className="bg-white dark:bg-slate-900 p-7 flex flex-col justify-between space-y-6 hover:shadow-2xl border border-gray-100 dark:border-slate-800 rounded-3xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-nova-coral/15 flex items-center justify-center text-nova-coral">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nova-charcoal dark:text-slate-100">
                Goal & Diagnostic Engine
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Adaptive baseline assessments pinpoints exact concept gaps instead of starting from scratch.
              </p>
            </div>
            <div className="text-xs font-semibold text-nova-coral flex items-center gap-1">
              Adaptive Baseline <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

          {/* Pillar 2 */}
          <Card className="bg-white dark:bg-slate-900 p-7 flex flex-col justify-between space-y-6 hover:shadow-2xl border border-gray-100 dark:border-slate-800 rounded-3xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-nova-lavender/25 flex items-center justify-center text-purple-700 dark:text-purple-300">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nova-charcoal dark:text-slate-100">
                Knowledge Universe
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Interactive graph network mapping dependencies, prerequisites, and live mastery states.
              </p>
            </div>
            <div className="text-xs font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1">
              Prerequisite Mapping <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

          {/* Pillar 3 */}
          <Card className="bg-white dark:bg-slate-900 p-7 flex flex-col justify-between space-y-6 hover:shadow-2xl border border-gray-100 dark:border-slate-800 rounded-3xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-nova-mint/25 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nova-charcoal dark:text-slate-100">
                5-Stage Execution Cycle
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Learn → Practice → Apply → Prove → Master cycle ensures deep retention over superficial watching.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              Deep Mastery Loop <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

          {/* Pillar 4 */}
          <Card className="bg-white dark:bg-slate-900 p-7 flex flex-col justify-between space-y-6 hover:shadow-2xl border border-gray-100 dark:border-slate-800 rounded-3xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-nova-yellow/40 flex items-center justify-center text-amber-800 dark:text-amber-300">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nova-charcoal dark:text-slate-100">
                AI Tutor & Simulator
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Contextual tutor drawer and real-time What-If scenario planner for schedule adjustments.
              </p>
            </div>
            <div className="text-xs font-semibold text-amber-800 dark:text-amber-400 flex items-center gap-1">
              Interactive Simulator <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-nova-charcoal flex items-center justify-center text-nova-coral font-bold text-sm">
              N
            </div>
            <span className="font-extrabold text-nova-charcoal dark:text-slate-100 text-lg tracking-tight">NOVA</span>
            <span>© {new Date().getFullYear()} NOVA Learning Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link to="/onboarding" className="hover:text-nova-charcoal dark:hover:text-white transition-colors">
              Onboarding
            </Link>
            <Link to="/login" className="hover:text-nova-charcoal dark:hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/today" className="hover:text-nova-charcoal dark:hover:text-white transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
