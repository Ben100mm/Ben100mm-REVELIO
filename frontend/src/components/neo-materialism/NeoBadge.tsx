'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface NeoBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'crystal' | 'energy';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  animated?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
}

const NeoBadge: React.FC<NeoBadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  glow = false,
  animated = false,
  className,
  icon,
  iconPosition = 'left',
  onClick,
}) => {
  const baseClasses = 'inline-flex items-center font-medium transition-all duration-200 ease-out';

  const variantClasses = {
    default: 'bg-slate-700/50 text-slate-200 border border-slate-600/50',
    success: 'bg-green-900/50 text-green-200 border border-green-600/50',
    warning: 'bg-yellow-900/50 text-yellow-200 border border-yellow-600/50',
    error: 'bg-red-900/50 text-red-200 border border-red-600/50',
    info: 'bg-blue-900/50 text-blue-200 border border-blue-600/50',
    crystal: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-200 border border-cyan-500/50',
    energy: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border border-blue-500/50 neo-energy-flow',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs rounded-md',
    md: 'px-3 py-1.5 text-sm rounded-lg',
    lg: 'px-4 py-2 text-base rounded-xl',
  };

  const effectClasses = cn(
    glow && 'neo-pulse-glow',
    animated && 'neo-float',
    onClick && 'cursor-pointer hover:scale-105 active:scale-95'
  );

  const badgeClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    effectClasses,
    className
  );

  const iconClasses = cn(
    'flex-shrink-0',
    iconPosition === 'left' ? 'mr-1.5' : 'ml-1.5',
    size === 'sm' && 'w-3 h-3',
    size === 'md' && 'w-4 h-4',
    size === 'lg' && 'w-5 h-5'
  );

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={iconClasses}>
          {icon}
        </span>
      )}
      
      <span>{children}</span>
      
      {icon && iconPosition === 'right' && (
        <span className={iconClasses}>
          {icon}
        </span>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={badgeClasses}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <span className={badgeClasses}>
      {content}
    </span>
  );
};

export default NeoBadge;
