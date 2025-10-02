/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors (Cyan → Blue → Purple)
        primary: {
          50: '#f0fdff',
          100: '#ccf7fe',
          200: '#99eefd',
          300: '#66e5fc',
          400: '#33dcfb',
          500: '#00D4FF', // Neon Cyan
          600: '#00aacc',
          700: '#008099',
          800: '#005666',
          900: '#002c33',
        },
        secondary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c1d3ff',
          300: '#a2bdff',
          400: '#83a7ff',
          500: '#3A86FF', // Primary Blue
          600: '#2e6bcc',
          700: '#225099',
          800: '#173566',
          900: '#0b1a33',
        },
        accent: {
          50: '#faf5ff',
          100: '#f5ebff',
          200: '#ebd7ff',
          300: '#e1c3ff',
          400: '#d7afff',
          500: '#8338EC', // Neon Purple
          600: '#692dba',
          700: '#4f2287',
          800: '#351754',
          900: '#1b0c21',
        },
        // Creative Gradient Colors (Gold → Pink → Violet)
        creative: {
          gold: '#FFD700',
          pink: '#FF6B9D',
          violet: '#8B5CF6',
        },
        // Chart & Data Visualization Colors
        chart: {
          cyan: '#00D4FF',
          blue: '#3A86FF',
          purple: '#8338EC',
          pink: '#F72585',
        },
        // Dark Mode Colors
        dark: {
          violet: '#1A1240',
          slate: '#18181b',
        },
        // Neon Accent Colors
        neon: {
          cyan: '#00D4FF',
          purple: '#8338EC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        '3d-sm': '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        '3d-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        '3d-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        '3d-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        '3d-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'inner-3d': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'glow-primary': '0 0 20px rgba(14, 165, 233, 0.3), 0 0 40px rgba(14, 165, 233, 0.1)',
        'glow-accent': '0 0 20px rgba(217, 70, 239, 0.3), 0 0 40px rgba(217, 70, 239, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Primary Brand Gradients
        'primary-gradient': 'linear-gradient(135deg, #00D4FF 0%, #3A86FF 50%, #8338EC 100%)',
        'primary-gradient-horizontal': 'linear-gradient(90deg, #00D4FF 0%, #3A86FF 50%, #8338EC 100%)',
        // Creative Gradients
        'creative-gradient': 'linear-gradient(135deg, #FFD700 0%, #FF6B9D 50%, #8B5CF6 100%)',
        'creative-gradient-horizontal': 'linear-gradient(90deg, #FFD700 0%, #FF6B9D 50%, #8B5CF6 100%)',
        // Secondary Gradients
        'secondary-gradient': 'linear-gradient(135deg, #00D4FF 0%, #3A86FF 100%)',
        'text-gradient-primary': 'linear-gradient(135deg, #00D4FF 0%, #8338EC 100%)',
        'text-gradient-creative': 'linear-gradient(135deg, #FFD700 0%, #8B5CF6 100%)',
        // Legacy gradients (keeping for compatibility)
        'mesh-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'aurora': 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'fade-in': 'fade-in 0.5s ease-in-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'gradient-flow': 'gradient-flow 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom'
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right center'
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'gradient-flow': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
