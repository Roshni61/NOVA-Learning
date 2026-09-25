import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  Flame,
  CheckCircle2,
  User,
  AlertCircle,
  Zap,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';
import { useGoal } from '../../context/GoalContext';
import { useAuth } from '../../context/AuthContext';

interface LoginPageProps {
  initialMode?: 'login' | 'signup';
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { targetGoal } = useGoal();
  const { login, signup } = useAuth();

  const isFromOnboarding = (location.state as any)?.fromOnboarding;
  const [isSignUp, setIsSignUp] = useState<boolean>(
    initialMode === 'signup' || Boolean(isFromOnboarding)
  );

  const [email, setEmail] = useState('alex.rivera@nova.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Alex Rivera');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await signup(email, password, name);
      } else {
        await login(email, password, name);
      }

      // Successful auth -> redirect to intended target or /today
      const from = (location.state as any)?.from?.pathname || '/today';
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await login('alex.rivera@nova.edu', 'google_sso', 'Alex Rivera');
      const from = (location.state as any)?.from?.pathname || '/today';
      navigate(from, { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-nova-charcoal dark:text-slate-100 flex items-center justify-center p-4 md:p-8 font-sans selection:bg-nova-lavender relative overflow-hidden">
      {/* Subtle Futuristic Ambient Glows & Mesh Gradients (Clean Bright Aesthetic) */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-rose-200/40 dark:bg-rose-900/20 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-emerald-100/30 via-indigo-100/30 to-purple-100/30 dark:from-emerald-950/10 dark:via-indigo-950/10 dark:to-purple-950/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Neural SVG Particles */}
      <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10%" cy="20%" r="3" fill="#A78BFA" className="animate-ping" style={{ animationDuration: '6s' }} />
        <circle cx="90%" cy="30%" r="4" fill="#FF6B6B" className="animate-ping" style={{ animationDuration: '7s' }} />
        <circle cx="50%" cy="85%" r="3" fill="#34D399" className="animate-ping" style={{ animationDuration: '5s' }} />
      </svg>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Side: Login / Sign Up Form Card */}
        <motion.div
          className="lg:col-span-6"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-8 md:p-10 shadow-2xl border border-gray-100 dark:border-slate-800 rounded-3xl space-y-6">
            {/* Header / Brand */}
            <div className="flex items-center justify-between">
              <Link to="/login" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-nova-coral via-nova-lavender to-nova-mint p-[2px] shadow-sm transition-transform group-hover:scale-105">
                  <div className="w-full h-full bg-nova-charcoal rounded-[14px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-nova-coral" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-nova-charcoal dark:text-slate-100 tracking-tight flex items-center gap-1">
                    NOVA
                    <span className="w-2 h-2 rounded-full bg-nova-coral inline-block" />
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    Learning Intelligence
                  </span>
                </div>
              </Link>
              <Badge variant="lavender" className="py-1 px-3 text-xs font-semibold">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Badge>
            </div>

            {/* Onboarding Welcome Banner */}
            {isFromOnboarding && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-100 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-200 font-semibold flex items-center gap-2.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>
                  Target Goal set to <strong className="text-purple-950 dark:text-white">{targetGoal}</strong>! Create your account to save your learning path.
                </span>
              </motion.div>
            )}

            {/* Title & Description */}
            <div className="space-y-1 text-left">
              <h1 className="text-2xl md:text-3xl font-black text-nova-charcoal dark:text-slate-100 tracking-tight">
                {isSignUp ? 'Create Your NOVA Account' : 'Welcome Back to NOVA'}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
                {isSignUp
                  ? 'Unlock adaptive AI learning twin, dynamic knowledge maps & daily execution.'
                  : 'Enter your credentials to access your personalized learning dashboard.'}
              </p>
            </div>

            {/* Auth Toggle Segment Control */}
            <div className="grid grid-cols-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setErrorMessage(null);
                }}
                className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                  !isSignUp
                    ? 'bg-white dark:bg-slate-900 text-nova-charcoal dark:text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:text-nova-charcoal dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setErrorMessage(null);
                }}
                className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                  isSignUp
                    ? 'bg-white dark:bg-slate-900 text-nova-charcoal dark:text-white shadow-md'
                    : 'text-slate-500 dark:text-slate-400 hover:text-nova-charcoal dark:hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error Notification Alert */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-50 dark:bg-rose-950/40 p-3.5 rounded-2xl border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* Google SSO Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-nova-charcoal dark:text-slate-100 font-semibold text-xs md:text-sm flex items-center justify-center gap-3 transition-all shadow-sm disabled:opacity-60 cursor-pointer min-h-[44px]"
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
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center my-2">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-slate-900 px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest absolute">
                or email credentials
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div
                    key="name-field"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1 text-left"
                  >
                    <label className="text-[11px] font-bold text-nova-charcoal dark:text-slate-200 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={isSignUp}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-nova-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-nova-lavender text-xs md:text-sm font-medium transition-all"
                        placeholder="Alex Rivera"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-bold text-nova-charcoal dark:text-slate-200 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-nova-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-nova-lavender text-xs md:text-sm font-medium transition-all"
                    placeholder="alex.rivera@nova.edu"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-nova-charcoal dark:text-slate-200 uppercase tracking-wider">
                    Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => {
                        setForgotEmail(email);
                        setShowForgotModal(true);
                      }}
                      className="text-xs font-bold text-nova-coral hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-nova-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-nova-lavender text-xs md:text-sm font-medium transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                variant="coral"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="w-full justify-center gap-2 min-h-[44px] shadow-nova-soft text-sm font-bold cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : isSignUp ? (
                  <>
                    Create Account & Continue <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Sign In to Dashboard <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
              {isSignUp ? (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsSignUp(false)}
                    className="font-bold text-nova-coral hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account yet?{' '}
                  <button
                    onClick={() => setIsSignUp(true)}
                    className="font-bold text-nova-coral hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </span>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Right Side: Futuristic Learning Twin Telemetry Preview */}
        <motion.div
          className="lg:col-span-6 hidden lg:block"
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-nova-charcoal via-slate-900 to-purple-950 text-white shadow-2xl overflow-hidden border border-slate-800 space-y-6">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-nova-coral/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-nova-lavender/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-nova-coral animate-spin" style={{ animationDuration: '10s' }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    AI Twin Telemetry Engine
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Adaptive State
                </div>
              </div>

              <div className="space-y-2 text-left">
                <h2 className="text-2xl font-black leading-tight text-white">
                  Continuous Learning Intelligence
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  NOVA constructs a real-time digital twin of your knowledge graph, measuring mastery retention, speed multipliers, and readiness probabilities.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-nova-coral to-rose-500 text-white font-black flex items-center justify-center text-sm shadow-md">
                      {name ? name.substring(0, 2).toUpperCase() : 'AR'}
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
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Mastery</div>
                    <div className="text-base font-extrabold text-nova-mint">72%</div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Speed</div>
                    <div className="text-base font-extrabold text-purple-300">1.2x</div>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Readiness</div>
                    <div className="text-base font-extrabold text-nova-coral">68%</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Encrypted Auth Session</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Zap className="w-4 h-4 text-nova-coral flex-shrink-0" />
                  <span>Neon DB Real-time Sync</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="bg-white dark:bg-slate-900 p-6 md:p-8 max-w-md w-full rounded-3xl space-y-4 border border-slate-200 dark:border-slate-800 shadow-2xl">
              <h3 className="text-xl font-black text-nova-charcoal dark:text-slate-100">Reset Your Password</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter your registered email address to receive a password reset link.
              </p>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-nova-charcoal dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-nova-lavender"
              />
              {resetSent ? (
                <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold text-center">
                  Reset link sent to {forgotEmail || email}! Check your inbox.
                </div>
              ) : (
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowForgotModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="coral" size="sm" onClick={() => setResetSent(true)}>
                    Send Reset Link
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
