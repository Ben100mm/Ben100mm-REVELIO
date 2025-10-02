'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface NeoProgressProps {
  value: number; // 0-100
  max?: number;
  variant?: 'default' | 'energy' | 'crystal' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
  color?: 'blue' | 'purple' | 'cyan' | 'green' | 'red' | 'gradient';
}

const NeoProgress: React.FC<NeoProgressProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = true,
  label,
  animated = true,
  className,
  color = 'blue',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    cyan: 'from-cyan-500 to-cyan-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    gradient: 'from-blue-500 via-purple-500 to-cyan-500',
  };

  const variantClasses = {
    default: 'bg-slate-700/50 border border-slate-600/50',
    energy: 'bg-slate-800/50 border border-slate-600/50 neo-energy-flow',
    crystal: 'bg-gradient-to-r from-slate-700/30 to-slate-600/30 border border-cyan-500/30',
    glow: 'bg-slate-700/50 border border-slate-600/50 neo-pulse-glow',
  };

  const progressBarClasses = cn(
    'relative w-full rounded-full overflow-hidden',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const progressFillClasses = cn(
    'h-full rounded-full transition-all duration-500 ease-out',
    colorClasses[color],
    animated && 'neo-energy-flow',
    variant === 'glow' && 'neo-pulse-glow'
  );

  const progressStyle = {
    width: `${percentage}%`,
    transition: animated ? 'width 0.5s ease-out' : 'none',
  };

  return (
    <div className="w-full">
      {/* Label */}
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-300">
            {label || 'Progress'}
          </span>
          <span className="text-sm text-slate-400">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      {/* Progress Bar */}
      <div className={progressBarClasses}>
        {/* Background */}
        <div className="absolute inset-0 rounded-full" />
        
        {/* Progress Fill */}
        <div 
          className={progressFillClasses}
          style={progressStyle}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || `Progress: ${Math.round(percentage)}%`}
        >
          {/* Energy flow effect for energy variant */}
          {variant === 'energy' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
          )}
          
          {/* Crystal shimmer effect for crystal variant */}
          {variant === 'crystal' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent opacity-60" />
          )}
        </div>
      </div>
      
      {/* Value indicator for small progress */}
      {size === 'sm' && (
        <div className="mt-1 text-xs text-slate-400 text-center">
          {value} / {max}
        </div>
      )}
    </div>
  );
};

export default NeoProgress;
