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
    <div className="min-h-screen bg-nova-bg text-nova-charcoal flex flex-col font-sans overflow-x-hidden selection:bg-nova-lavender">
      {/* Minimalist Header */}
      <header className="sticky top-0 z-50 bg-nova-bg/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-nova-coral via-nova-lavender to-nova-mint p-[2px] shadow-sm transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-nova-charcoal rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-nova-coral" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-nova-charcoal flex items-center gap-1.5">
                NOVA
                <span className="w-2 h-2 rounded-full bg-nova-coral inline-block"></span>
              </span>
              <span className="text-[10px] font-semibold text-nova-muted uppercase tracking-widest">
                Learning Intelligence
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-nova-muted">
            <a href="#features" className="hover:text-nova-charcoal transition-colors">
              Features
            </a>
            <a href="#methodology" className="hover:text-nova-charcoal transition-colors">
              Methodology
            </a>
            <a href="#universe" className="hover:text-nova-charcoal transition-colors">
              Knowledge Universe
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="md">
                Sign In
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button variant="coral" size="md">
                Get Started <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-6 max-w-7xl mx-auto w-full">
        {/* Ambient background blur blobs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-nova-lavender/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-nova-coral/15 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 self-start">
              <Badge variant="lavender" className="px-3.5 py-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                Next-Gen Continuous AI Learning Platform
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-6xl font-black text-nova-charcoal tracking-tight leading-[1.15]">
              Your goal. Your knowledge.{' '}
              <span className="bg-gradient-to-r from-nova-coral via-purple-600 to-nova-lavender bg-clip-text text-transparent">
                Your next move.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-nova-muted leading-relaxed font-normal max-w-2xl">
              Shift away from static LMS videos and rigid linear paths. NOVA creates an adaptive,
              living <strong className="text-nova-charcoal font-semibold">Learning Twin</strong> that diagnoses gaps, predicts target timelines, and delivers personalized daily execution cycles.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Link to="/onboarding">
                <button className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-nova-coral via-rose-500 to-purple-600 text-white font-semibold text-base shadow-nova-soft hover:shadow-nova-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Explore Knowledge Universe
                </Button>
              </Link>
            </div>

            {/* Social proof badges */}
            <div className="pt-6 border-t border-gray-200/60 flex items-center gap-6 text-xs text-nova-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Animated Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <Card className="bg-white/90 backdrop-blur-xl border border-white/80 p-6 md:p-8 rounded-3xl shadow-2xl space-y-6">
                {/* Header inside Card */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-nova-lavender to-purple-300 flex items-center justify-center text-nova-charcoal font-bold text-lg shadow-inner">
                      LT
                    </div>
                    <div>
                      <h3 className="font-bold text-nova-charcoal text-base">Learning Twin</h3>
                      <p className="text-xs text-nova-muted">Live Student Intelligence</p>
                    </div>
                  </div>
                  <Badge variant="mint" className="animate-pulse">
                    Active Goal: AI/ML Engineer
                  </Badge>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-nova-bg p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 text-xs font-medium text-nova-muted mb-1">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      Retention Rate
                    </div>
                    <div className="text-2xl font-black text-nova-charcoal">94%</div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-nova-mint h-full rounded-full w-[94%]" />
                    </div>
                  </div>

                  <div className="bg-nova-bg p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 text-xs font-medium text-nova-muted mb-1">
                      <Flame className="w-4 h-4 text-nova-coral" />
                      Active Streak
                    </div>
                    <div className="text-2xl font-black text-nova-charcoal">12 Days</div>
                    <p className="text-[11px] text-emerald-600 font-medium mt-1">Top 5% Learner</p>
                  </div>
                </div>

                {/* Current Mission Preview */}
                <div className="bg-gradient-to-br from-purple-50 via-white to-rose-50 p-4 rounded-2xl border border-purple-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-purple-900 flex items-center gap-1.5">
                      <BrainCircuit className="w-4 h-4 text-purple-600" />
                      Next Priority Node
                    </span>
                    <span className="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                      25 min
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-nova-charcoal">
                    Backpropagation & Computational Graphs
                  </h4>
                  <p className="text-xs text-nova-muted">
                    Prerequisite for Deep Learning Architecture mastery.
                  </p>
                </div>

                {/* Interactive Action Preview */}
                <Link to="/today" className="block">
                  <Button variant="primary" size="md" className="w-full justify-between group">
                    <span>Launch Today's Feed</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Decorative Floating Pill Badges */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-4 -left-4 z-20 hidden sm:block"
            >
              <div className="bg-nova-charcoal text-white px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-xl flex items-center gap-2 border border-gray-700">
                <Award className="w-4 h-4 text-nova-yellow" />
                <span>Goal Readiness: 68%</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section (4 Pillars) */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-gray-200/50">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="lavender">Architected for Continuous Growth</Badge>
          <h2 className="text-3xl md:text-5xl font-black text-nova-charcoal tracking-tight">
            The Four Pillars of NOVA Intelligence
          </h2>
          <p className="text-nova-muted text-base md:text-lg">
            Re-engineered from the ground up to replace static courses with real-time feedback loops.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Pillar 1 */}
          <Card className="bg-white p-7 flex flex-col justify-between space-y-6 hover:shadow-2xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-nova-coral/15 flex items-center justify-center text-nova-coral">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nova-charcoal">
                Goal & Diagnostic Engine
              </h3>
              <p className="text-sm text-nova-muted leading-relaxed">
                Adaptive baseline assessments pinpoints exact concept gaps instead of starting from scratch.
              </p>
            </div>
            <div className="text-xs font-semibold text-nova-coral flex items-center gap-1">
              Adaptive Baseline <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

          {/* Pillar 2 */}
          <Card className="bg-white p-7 flex flex-col justify-between space-y-6 hover:shadow-2xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-nova-lavender/25 flex items-center justify-center text-purple-700">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nova-charcoal">
                Knowledge Universe
              </h3>
              <p className="text-sm text-nova-muted leading-relaxed">
                Interactive graph network mapping dependencies, prerequisites, and live mastery states.
              </p>
            </div>
            <div className="text-xs font-semibold text-purple-700 flex items-center gap-1">
              Prerequisite Mapping <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

          {/* Pillar 3 */}
          <Card className="bg-white p-7 flex flex-col justify-between space-y-6 hover:shadow-2xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-nova-mint/25 flex items-center justify-center text-emerald-700">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nova-charcoal">
                5-Stage Execution Cycle
              </h3>
              <p className="text-sm text-nova-muted leading-relaxed">
                Learn → Practice → Apply → Prove → Master cycle ensures deep retention over superficial watching.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              Deep Mastery Loop <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>

          {/* Pillar 4 */}
          <Card className="bg-white p-7 flex flex-col justify-between space-y-6 hover:shadow-2xl">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-nova-yellow/40 flex items-center justify-center text-amber-800">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-nova-charcoal">
                AI Tutor & Simulator
              </h3>
              <p className="text-sm text-nova-muted leading-relaxed">
                Contextual tutor drawer and real-time What-If scenario planner for schedule adjustments.
              </p>
            </div>
            <div className="text-xs font-semibold text-amber-800 flex items-center gap-1">
              Interactive Simulator <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-nova-muted">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-nova-charcoal flex items-center justify-center text-nova-coral font-bold text-sm">
              N
            </div>
            <span className="font-extrabold text-nova-charcoal text-lg tracking-tight">NOVA</span>
            <span>© {new Date().getFullYear()} NOVA Learning Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link to="/onboarding" className="hover:text-nova-charcoal transition-colors">
              Onboarding
            </Link>
            <Link to="/login" className="hover:text-nova-charcoal transition-colors">
              Sign In
            </Link>
            <Link to="/today" className="hover:text-nova-charcoal transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
