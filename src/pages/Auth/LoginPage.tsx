import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Lock, Mail, Flame, CheckCircle2, User } from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { targetGoal } = useGoal();

  const isFromOnboarding = (location.state as any)?.fromOnboarding;
  const [isSignUp, setIsSignUp] = useState<boolean>(Boolean(isFromOnboarding));
  const [email, setEmail] = useState('alex.rivera@nova.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Alex Rivera');
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [resetSent, setResetSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to Dashboard
    navigate('/today');
  };

  return (
    <div className="min-h-screen bg-nova-bg flex items-center justify-center p-4 md:p-8 font-sans selection:bg-nova-lavender">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Login / Sign Up Form */}
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white p-8 md:p-10 shadow-2xl border-gray-100 rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-nova-charcoal flex items-center justify-center text-nova-coral font-extrabold text-base">
                  N
                </div>
                <span className="text-xl font-black text-nova-charcoal tracking-tight">NOVA</span>
              </Link>
              <Badge variant="lavender">{isSignUp ? 'Create Account' : 'Welcome Back'}</Badge>
            </div>

            {/* Banner if coming from Onboarding */}
            {isFromOnboarding && (
              <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-xs text-purple-900 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Goal set to <strong>{targetGoal}</strong>! Create your account to save your learning path.</span>
              </div>
            )}

            <div className="space-y-1">
              <h1 className="text-2xl font-black text-nova-charcoal">
                {isSignUp ? 'Create Your NOVA Account' : 'Sign in to NOVA'}
              </h1>
              <p className="text-sm text-nova-muted">
                {isSignUp ? 'Unlock continuous AI learning intelligence & dynamic maps.' : 'Continue your AI-powered learning journey.'}
              </p>
            </div>

            {/* Auth Toggle Tabs */}
            <div className="grid grid-cols-2 p-1 bg-nova-bg rounded-2xl border border-gray-200">
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  !isSignUp ? 'bg-white text-nova-charcoal shadow-sm' : 'text-nova-muted hover:text-nova-charcoal'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  isSignUp ? 'bg-white text-nova-charcoal shadow-sm' : 'text-nova-muted hover:text-nova-charcoal'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Social Login */}
            <button
              type="button"
              onClick={() => navigate('/today')}
              className="w-full py-3 px-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-nova-charcoal font-semibold text-sm flex items-center justify-center gap-3 transition-all shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-xs text-nova-muted uppercase tracking-wider font-semibold absolute">
                or email
              </span>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-nova-charcoal uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nova-lavender text-sm font-medium"
                      placeholder="Alex Rivera"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-nova-charcoal uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nova-lavender text-sm font-medium"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-nova-charcoal uppercase tracking-wider">
                    Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs font-bold text-nova-coral hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-nova-lavender text-sm font-medium"
                  />
                </div>
              </div>

              <Button variant="coral" size="lg" className="w-full justify-center">
                {isSignUp ? 'Create Account & Continue' : 'Sign In to Dashboard'} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>

            <div className="text-center text-xs text-nova-muted">
              {isSignUp ? (
                <span>Already have an account? <button onClick={() => setIsSignUp(false)} className="font-bold text-nova-coral hover:underline">Sign In</button></span>
              ) : (
                <span>Need to setup a goal first? <Link to="/onboarding" className="font-bold text-nova-coral hover:underline">Goal Setup</Link></span>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Right Side: Live Learning Twin Preview */}
        <motion.div
          className="lg:col-span-6 hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-nova-charcoal via-slate-900 to-purple-950 text-white shadow-2xl overflow-hidden border border-slate-800">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-nova-coral/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-nova-lavender/20 rounded-full blur-3xl" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-nova-coral" />
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Live Telemetry Preview
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Active Learner Twin
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black leading-tight text-white">
                  Continuous AI Learning OS
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your twin maps every concept node, tracks knowledge decay, and recalculates daily priorities.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-nova-coral text-white font-bold flex items-center justify-center text-sm shadow-md">
                      LT
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{name}'s Learning Twin</h4>
                      <p className="text-[11px] text-purple-200">Goal: {targetGoal}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-nova-yellow flex items-center gap-1 justify-end">
                      <Flame className="w-4 h-4 fill-nova-yellow" /> 12-Day Streak
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-slate-400">Mastery</div>
                    <div className="text-base font-extrabold text-nova-mint">72%</div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-slate-400">Speed</div>
                    <div className="text-base font-extrabold text-purple-300">1.2x</div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <div className="text-[10px] text-slate-400">Readiness</div>
                    <div className="text-base font-extrabold text-nova-coral">68%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <Card className="bg-white p-6 max-w-md w-full rounded-3xl space-y-4">
            <h3 className="text-lg font-black text-nova-charcoal">Reset Your Password</h3>
            <p className="text-xs text-nova-muted">Enter your email address to receive a secure reset link.</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium"
            />
            {resetSent ? (
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold text-center">
                Password reset link sent to {email}!
              </div>
            ) : (
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setShowForgotModal(false)}>Cancel</Button>
                <Button variant="coral" size="sm" onClick={() => setResetSent(true)}>Send Reset Link</Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};
