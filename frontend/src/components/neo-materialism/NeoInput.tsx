'use client';

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface NeoInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  variant?: 'default' | 'glass' | 'crystal' | 'energy';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: string;
  success?: boolean;
  glow?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const NeoInput: React.FC<NeoInputProps> = ({
  label,
  placeholder,
  value = '',
  onChange,
  type = 'text',
  variant = 'default',
  size = 'md',
  disabled = false,
  error,
  success = false,
  glow = false,
  className,
  icon,
  iconPosition = 'left',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const baseClasses = 'w-full transition-all duration-300 ease-out focus:outline-none';

  const variantClasses = {
    default: 'bg-slate-800/50 border border-slate-600/50 focus:border-blue-500/70 focus:bg-slate-800/70',
    glass: 'neo-glass border border-white/20 focus:border-blue-400/50',
    crystal: 'bg-gradient-to-r from-slate-800/30 to-slate-700/30 border border-cyan-500/30 focus:border-cyan-400/70',
    energy: 'bg-slate-900/50 border border-purple-500/30 focus:border-purple-400/70 neo-energy-flow',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-3 text-base rounded-xl',
    lg: 'px-6 py-4 text-lg rounded-xl',
  };

  const stateClasses = {
    error: 'border-red-500/70 bg-red-900/20 focus:border-red-400/70',
    success: 'border-green-500/70 bg-green-900/20 focus:border-green-400/70',
    disabled: 'opacity-50 cursor-not-allowed bg-slate-800/30',
  };

  const effectClasses = cn(
    glow && 'neo-pulse-glow',
    isFocused && 'ring-2 ring-blue-500/20'
  );

  const inputClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    error && stateClasses.error,
    success && !error && stateClasses.success,
    disabled && stateClasses.disabled,
    effectClasses,
    className
  );

  const containerClasses = cn(
    'relative',
    icon && 'flex items-center'
  );

  const iconClasses = cn(
    'absolute z-10 text-slate-400 transition-colors duration-200',
    iconPosition === 'left' ? 'left-3' : 'right-3',
    isFocused && 'text-blue-400',
    error && 'text-red-400',
    success && !error && 'text-green-400'
  );

  const labelClasses = cn(
    'block text-sm font-medium mb-2 transition-colors duration-200',
    error ? 'text-red-400' : success ? 'text-green-400' : 'text-slate-300',
    disabled && 'text-slate-500'
  );

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="w-full">
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className={containerClasses}>
        {icon && iconPosition === 'left' && (
          <div className={iconClasses}>
            {icon}
          </div>
        )}
        
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            inputClasses,
            icon && iconPosition === 'left' && 'pl-10',
            icon && iconPosition === 'right' && 'pr-10'
          )}
        />
        
        {icon && iconPosition === 'right' && (
          <div className={iconClasses}>
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {success && !error && (
        <p className="mt-2 text-sm text-green-400 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Success
        </p>
      )}
    </div>
  );
};

export default NeoInput;
