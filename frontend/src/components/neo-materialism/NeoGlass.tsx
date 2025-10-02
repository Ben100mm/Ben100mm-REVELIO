'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface NeoGlassProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'tinted' | 'frosted' | 'crystal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  blur?: 'light' | 'medium' | 'heavy';
  opacity?: 'subtle' | 'medium' | 'strong';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const NeoGlass: React.FC<NeoGlassProps> = ({
  children,
  variant = 'default',
  size = 'md',
  blur = 'medium',
  opacity = 'medium',
  className,
  onClick,
  interactive = false,
}) => {
  const baseClasses = 'transition-all duration-300 ease-out';

  const variantClasses = {
    default: 'neo-glass',
    dark: 'neo-glass-dark',
    tinted: 'neo-glass-tinted',
    frosted: 'backdrop-blur-xl bg-white/10 border border-white/20',
    crystal: 'backdrop-blur-sm bg-gradient-to-br from-white/5 via-cyan-500/10 to-purple-500/10 border border-cyan-500/30',
  };

  const sizeClasses = {
    sm: 'p-4 rounded-xl',
    md: 'p-6 rounded-2xl',
    lg: 'p-8 rounded-3xl',
    xl: 'p-12 rounded-3xl',
  };

  const blurClasses = {
    light: 'backdrop-blur-sm',
    medium: 'backdrop-blur-md',
    heavy: 'backdrop-blur-xl',
  };

  const opacityClasses = {
    subtle: 'bg-white/5',
    medium: 'bg-white/10',
    strong: 'bg-white/20',
  };

  const interactiveClasses = interactive ? 'cursor-pointer hover:bg-white/15 hover:scale-[1.02] active:scale-[0.98]' : '';

  const glassClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    blurClasses[blur],
    opacityClasses[opacity],
    interactiveClasses,
    className
  );

  return (
    <div 
      className={glassClasses}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {children}
    </div>
  );
};

export default NeoGlass;
