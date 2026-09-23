import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedFlameIcon: React.FC = () => (
  <div className="relative w-10 h-10 flex items-center justify-center">
    {/* Outer Glow */}
    <div className="absolute inset-0 bg-rose-500/30 rounded-full blur-md animate-pulse" />
    <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>
      <motion.path
        d="M12 2C10.5 4.5 9 6.5 9 9C9 11.2 10.3 13 12 14.5C13.7 13 15 11.2 15 9C15 6.5 13.5 4.5 12 2Z"
        fill="url(#flameGrad)"
        animate={{ scale: [1, 1.1, 0.95, 1], y: [0, -1, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      />
      <motion.path
        d="M12 15C8.13 15 5 18.13 5 22C7.5 22 9.5 21 11 19.5C12.5 21 14.5 22 17 22C17 18.13 13.87 15 12 15Z"
        fill="url(#flameGrad)"
        opacity="0.9"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      />
    </svg>
  </div>
);

export const AnimatedPlanetIcon: React.FC = () => (
  <div className="relative w-10 h-10 flex items-center justify-center">
    <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-md animate-pulse" />
    <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="planetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      {/* Planet Sphere */}
      <circle cx="12" cy="12" r="7" fill="url(#planetGrad)" />
      {/* Orbiting Ring */}
      <motion.ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="3.5"
        stroke="#F43F5E"
        strokeWidth="1.8"
        fill="none"
        style={{ transformOrigin: 'center center' }}
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
      />
    </svg>
  </div>
);

export const AnimatedGemIcon: React.FC = () => (
  <div className="relative w-10 h-10 flex items-center justify-center">
    <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-md animate-pulse" />
    <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <motion.path
        d="M6 3H18L22 9L12 21L2 9L6 3Z"
        fill="url(#gemGrad)"
        stroke="#FFFFFF"
        strokeWidth="1"
        animate={{ rotate: [-3, 3, -3], scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      />
    </svg>
  </div>
);

export const AnimatedShieldIcon: React.FC = () => (
  <div className="relative w-10 h-10 flex items-center justify-center">
    <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-md animate-pulse" />
    <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <motion.path
        d="M12 2L4 5V11C4 16.55 7.4 21.74 12 23C16.6 21.74 20 16.55 20 11V5L12 2Z"
        fill="url(#shieldGrad)"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      <motion.path
        d="M9 12L11 14L15 10"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  </div>
);
