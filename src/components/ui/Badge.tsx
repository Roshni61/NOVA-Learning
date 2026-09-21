import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'lavender' | 'coral' | 'mint' | 'yellow' | 'charcoal' | 'outline';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'lavender',
  className,
  children,
  ...props
}) => {
  const variants = {
    lavender: 'bg-nova-lavender/20 text-purple-900 border border-nova-lavender/40',
    coral: 'bg-nova-coral/15 text-rose-900 border border-nova-coral/30',
    mint: 'bg-nova-mint/20 text-emerald-900 border border-nova-mint/40',
    yellow: 'bg-nova-yellow/30 text-amber-900 border border-nova-yellow/50',
    charcoal: 'bg-nova-charcoal text-white',
    outline: 'bg-white/80 text-nova-charcoal border border-gray-200 shadow-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-all',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
