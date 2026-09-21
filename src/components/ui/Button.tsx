import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'coral' | 'lavender';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-nova-charcoal text-white hover:bg-black focus:ring-nova-charcoal shadow-nova-soft',
    secondary: 'bg-white text-nova-charcoal border border-gray-200 hover:bg-gray-50 focus:ring-gray-300 shadow-nova-soft',
    ghost: 'text-nova-charcoal hover:bg-gray-100/60 focus:ring-gray-300',
    coral: 'bg-nova-coral text-white hover:bg-red-500 focus:ring-nova-coral shadow-nova-soft',
    lavender: 'bg-nova-lavender text-nova-charcoal hover:bg-purple-300 focus:ring-nova-lavender shadow-nova-soft',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-2xl gap-2',
    lg: 'px-6 py-3.5 text-base rounded-2xl gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
