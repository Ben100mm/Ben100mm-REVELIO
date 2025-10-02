# Neo-Materialism Implementation Guide
*Step-by-step guide for implementing Neo-Materialism design system*

## 🚀 **Quick Start**

### **1. Install Dependencies**
```bash
npm install clsx tailwind-merge
```

### **2. Import Styles**
```css
/* In your main CSS file */
@import '../styles/neo-materialism-tokens.css';
@import '../styles/neo-materialism.css';
@import '../styles/neo-materialism-patterns.css';
```

### **3. Basic Usage**
```tsx
import { NeoButton, NeoCard, NeoInput } from '@/components/neo-materialism';

function App() {
  return (
    <div className="neo-container">
      <NeoCard variant="elevated" className="p-6">
        <h1 className="neo-heading-1">Welcome to Neo-Materialism</h1>
        <NeoInput label="Your Name" placeholder="Enter your name" />
        <NeoButton variant="primary">Get Started</NeoButton>
      </NeoCard>
    </div>
  );
}
```

## 🎨 **Component Implementation Patterns**

### **Basic Component Structure**
```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  variant?: 'default' | 'alternative';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
}) => {
  const baseClasses = 'neo-component';
  const variantClasses = {
    default: 'neo-component-default',
    alternative: 'neo-component-alternative',
  };
  const sizeClasses = {
    sm: 'neo-component-sm',
    md: 'neo-component-md',
    lg: 'neo-component-lg',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
};
```

### **Advanced Component with Effects**
```tsx
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface AdvancedComponentProps {
  glow?: boolean;
  energy?: boolean;
  animated?: boolean;
  interactive?: boolean;
  onClick?: () => void;
}

export const AdvancedComponent: React.FC<AdvancedComponentProps> = ({
  glow = false,
  energy = false,
  animated = false,
  interactive = false,
  onClick,
}) => {
  const [isActive, setIsActive] = useState(false);

  const effectClasses = cn(
    glow && 'neo-pulse-glow',
    energy && 'neo-energy-flow',
    animated && 'neo-float',
    interactive && 'cursor-pointer hover:scale-105'
  );

  return (
    <div
      className={cn('neo-component', effectClasses)}
      onClick={interactive ? onClick : undefined}
      onMouseEnter={() => interactive && setIsActive(true)}
      onMouseLeave={() => interactive && setIsActive(false)}
    >
      {/* Component content */}
    </div>
  );
};
```

## 📐 **Layout Implementation**

### **Page Layout Structure**
```tsx
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="neo-nav-primary">
        <div className="neo-container">
          <div className="flex items-center justify-between">
            <Logo />
            <NavigationMenu />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="neo-section">
        <div className="neo-container">
          <div className="neo-content">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="neo-glass p-8 mt-16">
        <div className="neo-container">
          <FooterContent />
        </div>
      </footer>
    </div>
  );
}
```

### **Grid Layouts**
```tsx
// Feature grid
<div className="neo-grid-3 neo-spacing-lg">
  {features.map((feature, index) => (
    <NeoCard
      key={feature.id}
      variant="elevated"
      className="neo-animate-slide-up neo-stagger-{index + 1}"
    >
      <FeatureCard {...feature} />
    </NeoCard>
  ))}
</div>

// Responsive form layout
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <NeoInput label="First Name" />
  <NeoInput label="Last Name" />
  <NeoInput label="Email" type="email" />
  <NeoInput label="Phone" type="tel" />
</div>
```

## 🎭 **Animation Implementation**

### **Page Transitions**
```tsx
import { motion } from 'framer-motion';

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="neo-page-enter"
    >
      {children}
    </motion.div>
  );
}
```

### **Staggered Animations**
```tsx
function StaggeredGrid({ items }: { items: any[] }) {
  return (
    <div className="neo-grid-3 neo-spacing-md">
      {items.map((item, index) => (
        <NeoCard
          key={item.id}
          className={cn(
            'neo-animate-slide-up',
            `neo-stagger-${Math.min(index + 1, 6)}`
          )}
        >
          <ItemCard {...item} />
        </NeoCard>
      ))}
    </div>
  );
}
```

### **Interactive Animations**
```tsx
function InteractiveCard({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="neo-card neo-morph"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
        rotateY: isHovered ? 5 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

## 🎨 **Theming Implementation**

### **Custom Theme Creation**
```tsx
function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const customTheme = {
    '--neo-primary-500': '#your-brand-color',
    '--neo-secondary-500': '#your-secondary-color',
    '--neo-accent-500': '#your-accent-color',
  };

  return (
    <div style={customTheme} data-theme="custom">
      {children}
    </div>
  );
}
```

### **Dynamic Theme Switching**
```tsx
function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <NeoButton variant="ghost" onClick={toggleTheme}>
      {theme === 'dark' ? '☀️' : '🌙'} Toggle Theme
    </NeoButton>
  );
}
```

## 📱 **Responsive Implementation**

### **Mobile-First Approach**
```tsx
function ResponsiveComponent() {
  return (
    <div className="neo-container">
      {/* Mobile: single column, Desktop: multi-column */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <NeoCard size="md" className="p-4 md:p-6">
          <h3 className="neo-heading-4">Responsive Card</h3>
          <p className="neo-text-body">Content adapts to screen size</p>
        </NeoCard>
      </div>

      {/* Responsive button sizing */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <NeoButton size="md" className="w-full sm:w-auto">
          Responsive Button
        </NeoButton>
      </div>
    </div>
  );
}
```

### **Touch-Friendly Design**
```tsx
function TouchOptimizedComponent() {
  return (
    <div className="neo-touch-target">
      <NeoButton
        size="lg"
        className="min-h-[44px] min-w-[44px]"
        variant="primary"
      >
        Touch Target
      </NeoButton>
    </div>
  );
}
```

## ♿ **Accessibility Implementation**

### **Keyboard Navigation**
```tsx
function AccessibleComponent() {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="neo-card neo-card-interactive"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label="Interactive card"
    >
      <h3>Accessible Card</h3>
      <p>Press Enter or Space to activate</p>
    </div>
  );
}
```

### **Screen Reader Support**
```tsx
function ScreenReaderFriendly() {
  return (
    <div>
      <NeoProgress
        value={75}
        label="Upload Progress"
        aria-label="File upload is 75% complete"
      />
      
      <div role="status" aria-live="polite">
        Upload completed successfully
      </div>
    </div>
  );
}
```

### **Focus Management**
```tsx
function FocusManagedModal({ isOpen, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <NeoModal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEscape={true}
    >
      <div ref={modalRef} tabIndex={-1}>
        {/* Modal content */}
      </div>
    </NeoModal>
  );
}
```

## 🚀 **Performance Optimization**

### **Lazy Loading Components**
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  {
    loading: () => (
      <div className="neo-container p-8">
        <NeoProgress value={0} label="Loading..." />
      </div>
    ),
    ssr: false
  }
);
```

### **Optimized Animations**
```tsx
function OptimizedAnimatedComponent() {
  return (
    <motion.div
      className="neo-gpu-accelerated"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ willChange: 'opacity' }}
    >
      <NeoCard glow energy>
        Optimized Component
      </NeoCard>
    </motion.div>
  );
}
```

### **Conditional Effects**
```tsx
function ConditionalEffects({ enableEffects }: { enableEffects: boolean }) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  
  return (
    <NeoCard
      glow={enableEffects && !prefersReducedMotion}
      energy={enableEffects && !prefersReducedMotion}
    >
      <h3>Adaptive Effects</h3>
      <p>Effects respect user preferences</p>
    </NeoCard>
  );
}
```

## 🧪 **Testing Implementation**

### **Component Testing**
```tsx
import { render, screen } from '@testing-library/react';
import { NeoButton } from '@/components/neo-materialism';

describe('NeoButton', () => {
  it('renders with correct variant classes', () => {
    render(<NeoButton variant="primary">Click me</NeoButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('neo-button-primary');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<NeoButton onClick={handleClick}>Click me</NeoButton>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is accessible', () => {
    render(<NeoButton aria-label="Test button">Click me</NeoButton>);
    expect(screen.getByLabelText('Test button')).toBeInTheDocument();
  });
});
```

### **Visual Regression Testing**
```tsx
import { render } from '@testing-library/react';
import { NeoCard } from '@/components/neo-materialism';

describe('NeoCard Visual Tests', () => {
  it('matches design system tokens', () => {
    const { container } = render(
      <NeoCard variant="elevated" glow>
        Test content
      </NeoCard>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

## 🔧 **Development Tools**

### **Component Validation**
```tsx
import { validateComponentProps, logValidationResult } from '@/utils/neo-materialism-validator';

function DevelopmentComponent(props: any) {
  // Validate props in development
  if (process.env.NODE_ENV === 'development') {
    const validation = validateComponentProps('NeoButton', props, {
      strictMode: true,
      enforceAccessibility: true,
    });
    logValidationResult(validation, 'NeoButton');
  }

  return <NeoButton {...props} />;
}
```

### **Design Token Inspector**
```tsx
function TokenInspector() {
  const tokens = {
    primary: getComputedStyle(document.documentElement).getPropertyValue('--neo-primary-500'),
    secondary: getComputedStyle(document.documentElement).getPropertyValue('--neo-secondary-500'),
    spacing: getComputedStyle(document.documentElement).getPropertyValue('--neo-space-4'),
  };

  return (
    <NeoCard variant="glass" className="p-4">
      <h3>Design Tokens</h3>
      <pre>{JSON.stringify(tokens, null, 2)}</pre>
    </NeoCard>
  );
}
```

## 📊 **Analytics Integration**

### **Component Usage Tracking**
```tsx
function TrackedComponent(props: any) {
  useEffect(() => {
    if (props.onClick) {
      analytics.track('component_interaction', {
        component: 'NeoButton',
        variant: props.variant,
        timestamp: Date.now(),
      });
    }
  }, [props.onClick, props.variant]);

  return <NeoButton {...props} />;
}
```

---

*This implementation guide provides comprehensive patterns for building consistent, accessible, and performant Neo-Materialism applications.*
