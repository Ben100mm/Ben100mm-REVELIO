'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface NeoCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'interactive' | 'glass' | 'crystal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  energy?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const NeoCard: React.FC<NeoCardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  glow = false,
  energy = false,
  className,
  onClick,
  disabled = false,
}) => {
  const baseClasses = 'neo-card transition-all duration-300 ease-out';
  
  const variantClasses = {
    default: 'neo-card',
    elevated: 'neo-card hover:shadow-2xl',
    interactive: 'neo-card neo-card-interactive cursor-pointer',
    glass: 'neo-glass',
    crystal: 'neo-glass-tinted',
  };

  const sizeClasses = {
    sm: 'p-4 rounded-xl',
    md: 'p-6 rounded-2xl',
    lg: 'p-8 rounded-3xl',
    xl: 'p-12 rounded-3xl',
  };

  const effectClasses = cn(
    glow && 'neo-pulse-glow',
    energy && 'neo-energy-flow',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
  );

  const cardClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    effectClasses,
    className
  );

  return (
    <div 
      className={cardClasses}
      onClick={disabled ? undefined : onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && !disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};

export default NeoCard;
