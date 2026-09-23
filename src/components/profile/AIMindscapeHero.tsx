import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';
import { Badge } from '../ui';

interface AIMindscapeHeroProps {
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  targetGoal: string;
  userLevel: number;
  userXP: number;
  streak: number;
}

export const AIMindscapeHero: React.FC<AIMindscapeHeroProps> = ({
  user,
  targetGoal,
  userLevel,
  userXP,
  streak,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated Particle Data Nodes Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 260;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle nodes
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particle nodes & connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 63, 94, ${p.alpha})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.25 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-slate-950 rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden text-white border border-slate-800 shadow-2xl space-y-6"
    >
      {/* 1. Animated Canvas Neural Node Matrix Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40 pointer-events-none"
      />

      {/* Floating Code Snippets Primitives */}
      <div className="absolute top-4 right-10 text-[10px] font-mono text-purple-400/20 select-none pointer-events-none hidden md:block">
        <div>const neuralTwin = new LearningEngine();</div>
        <div>await neuralTwin.syncProgress();</div>
        <div>// Retention: 94% Top 5%</div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Avatar with Glowing Particle Halo */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative group cursor-pointer"
          >
            {/* Pulsing AI Glow Rings */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-nova-coral via-purple-500 to-emerald-400 blur-md opacity-75 animate-pulse group-hover:opacity-100 transition-opacity" />

            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover relative z-10 border-2 border-white/20 shadow-2xl"
            />

            <div className="absolute -bottom-2 -right-2 z-20 bg-slate-900 border border-purple-500/50 p-1.5 rounded-xl text-nova-coral">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </motion.div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge variant="coral" className="gap-1.5 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Motion AI Telemetry Active
              </Badge>
              <Badge variant="lavender" className="text-xs font-bold">
                Target: {targetGoal}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {user.email}
            </p>
          </div>
        </div>

        {/* Gamification Level & XP Telemetry Cards */}
        <div className="flex items-center gap-3 bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl border border-white/15 shadow-xl">
          <div className="text-center px-3">
            <div className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">Level</div>
            <div className="text-2xl font-black text-nova-yellow">{userLevel}</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center px-3">
            <div className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">Total XP</div>
            <div className="text-2xl font-black text-white">{userXP}</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center px-3">
            <div className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">Active Streak</div>
            <div className="text-2xl font-black text-nova-coral flex items-center gap-1">
              <Flame className="w-5 h-5 fill-nova-coral text-nova-coral animate-bounce" />
              {streak}d
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
