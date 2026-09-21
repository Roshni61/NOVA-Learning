import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverEffect = true,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-nova-card border border-gray-100/80 rounded-3xl p-6 shadow-nova-soft transition-all duration-300',
        hoverEffect && 'hover:shadow-nova-hover hover:-translate-y-1 hover:border-gray-200/90',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
