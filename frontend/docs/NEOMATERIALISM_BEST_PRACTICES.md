# Neo-Materialism Best Practices & Usage Patterns
*Comprehensive guide for implementing Neo-Materialism design system consistently*

## 🎯 **Core Principles**

### **1. Material Authenticity**
- Every surface should behave like its real-world counterpart
- Use realistic lighting, shadows, and material properties
- Maintain consistent depth relationships between elements

### **2. Spatial Hierarchy**
- Establish clear visual hierarchy through depth and elevation
- Use z-index layers consistently across components
- Group related elements in the same spatial plane

### **3. Physics-Based Interactions**
- All interactions should feel natural and responsive
- Use appropriate easing functions for different interaction types
- Provide immediate visual feedback for user actions

### **4. Luminous Clarity**
- Use light and energy effects purposefully
- Maintain readability and accessibility
- Balance visual appeal with functional clarity

## 📐 **Layout Patterns**

### **Grid System**
```css
/* Neo-Materialism Grid Classes */
.neo-grid-1 { grid-template-columns: repeat(1, 1fr); }
.neo-grid-2 { grid-template-columns: repeat(2, 1fr); }
.neo-grid-3 { grid-template-columns: repeat(3, 1fr); }
.neo-grid-4 { grid-template-columns: repeat(4, 1fr); }
.neo-grid-auto { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
```

### **Spacing System**
```css
/* Consistent spacing using Neo-Materialism scale */
.neo-spacing-xs { gap: var(--neo-space-2); }    /* 8px */
.neo-spacing-sm { gap: var(--neo-space-4); }    /* 16px */
.neo-spacing-md { gap: var(--neo-space-6); }    /* 24px */
.neo-spacing-lg { gap: var(--neo-space-8); }    /* 32px */
.neo-spacing-xl { gap: var(--neo-space-12); }   /* 48px */
```

### **Container Patterns**
```tsx
// Standard page container
<div className="neo-container">
  <div className="neo-content">
    {/* Page content */}
  </div>
</div>

// Card grid layout
<div className="neo-grid-3 neo-spacing-md">
  <NeoCard>...</NeoCard>
  <NeoCard>...</NeoCard>
  <NeoCard>...</NeoCard>
</div>

// Form layout
<div className="neo-form-layout">
  <NeoInput label="Field 1" />
  <NeoInput label="Field 2" />
  <div className="neo-form-actions">
    <NeoButton variant="secondary">Cancel</NeoButton>
    <NeoButton variant="primary">Submit</NeoButton>
  </div>
</div>
```

## 🎨 **Component Usage Patterns**

### **Button Patterns**

#### **Primary Actions**
```tsx
// Main call-to-action buttons
<NeoButton variant="primary" size="lg" glow>
  Get Started
</NeoButton>

// Form submission
<NeoButton variant="primary" type="submit" fullWidth>
  Create Account
</NeoButton>
```

#### **Secondary Actions**
```tsx
// Secondary actions
<NeoButton variant="secondary">
  Learn More
</NeoButton>

// Navigation
<NeoButton variant="ghost">
  Back to Home
</NeoButton>
```

#### **Destructive Actions**
```tsx
// Dangerous actions
<NeoButton variant="danger" size="sm">
  Delete Account
</NeoButton>
```

### **Card Patterns**

#### **Content Cards**
```tsx
// Standard content display
<NeoCard variant="default" className="p-6">
  <h3 className="text-xl font-semibold mb-4">Card Title</h3>
  <p className="text-slate-300">Card content...</p>
</NeoCard>

// Interactive content cards
<NeoCard variant="interactive" onClick={handleClick}>
  <div className="p-6">
    <h3 className="text-xl font-semibold mb-4">Clickable Card</h3>
    <p className="text-slate-300">This card is clickable</p>
  </div>
</NeoCard>
```

#### **Feature Cards**
```tsx
// Feature showcase
<NeoCard variant="elevated" glow className="p-8 text-center">
  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
    <Icon className="w-8 h-8 text-white" />
  </div>
  <h3 className="text-2xl font-bold mb-4">Feature Title</h3>
  <p className="text-slate-300">Feature description...</p>
</NeoCard>
```

### **Form Patterns**

#### **Input Groups**
```tsx
// Standard form layout
<div className="space-y-6">
  <NeoInput
    label="Full Name"
    placeholder="Enter your full name"
    variant="glass"
    icon={<UserIcon />}
  />
  
  <NeoInput
    label="Email Address"
    type="email"
    placeholder="Enter your email"
    variant="glass"
    icon={<MailIcon />}
  />
  
  <NeoInput
    label="Password"
    type="password"
    placeholder="Enter your password"
    variant="glass"
    icon={<LockIcon />}
  />
</div>
```

#### **Form Validation**
```tsx
// Error states
<NeoInput
  label="Required Field"
  placeholder="This field is required"
  error="This field is required"
  variant="glass"
/>

// Success states
<NeoInput
  label="Valid Email"
  placeholder="email@example.com"
  success
  variant="glass"
/>
```

### **Navigation Patterns**

#### **Primary Navigation**
```tsx
// Main navigation bar
<nav className="neo-glass p-4 rounded-2xl">
  <div className="flex items-center justify-between">
    <Logo />
    <div className="flex space-x-4">
      <NeoButton variant="ghost">Home</NeoButton>
      <NeoButton variant="ghost">Features</NeoButton>
      <NeoButton variant="ghost">About</NeoButton>
      <NeoButton variant="primary">Get Started</NeoButton>
    </div>
  </div>
</nav>
```

#### **Breadcrumbs**
```tsx
// Breadcrumb navigation
<nav className="flex items-center space-x-2 text-sm">
  <NeoButton variant="ghost" size="sm">Home</NeoButton>
  <span className="text-slate-400">/</span>
  <NeoButton variant="ghost" size="sm">Products</NeoButton>
  <span className="text-slate-400">/</span>
  <span className="text-slate-300">Current Page</span>
</nav>
```

## 🎭 **Animation Patterns**

### **Page Transitions**
```css
/* Page entrance animations */
.neo-page-enter {
  opacity: 0;
  transform: translateY(20px);
}

.neo-page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s ease-out;
}
```

### **Element Animations**
```tsx
// Staggered card animations
<div className="neo-grid-3 neo-spacing-md">
  {items.map((item, index) => (
    <NeoCard 
      key={item.id}
      className="neo-animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {item.content}
    </NeoCard>
  ))}
</div>
```

### **Loading States**
```tsx
// Button loading state
<NeoButton variant="primary" loading>
  Processing...
</NeoButton>

// Progress indicators
<NeoProgress value={progress} label="Uploading..." variant="energy" />
```

## 🌈 **Color Usage Patterns**

### **Semantic Colors**
```tsx
// Success states
<NeoBadge variant="success">Success</NeoBadge>
<NeoProgress color="green" value={100} />

// Warning states
<NeoBadge variant="warning">Warning</NeoBadge>
<NeoProgress color="red" value={25} />

// Info states
<NeoBadge variant="info">Info</NeoBadge>
<NeoProgress color="blue" value={75} />
```

### **Brand Colors**
```tsx
// Primary brand elements
<NeoButton variant="primary">Primary Action</NeoButton>
<h1 className="neo-text-holographic">Brand Title</h1>

// Accent elements
<NeoButton variant="accent">Secondary Action</NeoButton>
<NeoCard variant="crystal">Special Content</NeoCard>
```

## 📱 **Responsive Patterns**

### **Mobile-First Approach**
```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <NeoCard>...</NeoCard>
</div>

// Responsive spacing
<div className="p-4 md:p-6 lg:p-8">
  <NeoInput size="md" />
</div>

// Responsive button sizes
<NeoButton size="md" className="w-full md:w-auto">
  Responsive Button
</NeoButton>
```

### **Touch-Friendly Design**
```css
/* Minimum touch target size */
.neo-touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

## ♿ **Accessibility Patterns**

### **Keyboard Navigation**
```tsx
// Focus management
<NeoModal
  isOpen={isOpen}
  onClose={onClose}
  closeOnEscape={true}
>
  {/* Modal content */}
</NeoModal>

// Tab order
<div className="space-y-4">
  <NeoInput label="First Field" />
  <NeoInput label="Second Field" />
  <NeoButton>Submit</NeoButton>
</div>
```

### **Screen Reader Support**
```tsx
// Descriptive labels
<NeoProgress
  value={75}
  label="Upload Progress"
  aria-label="File upload is 75% complete"
/>

// Status announcements
<div role="status" aria-live="polite">
  {statusMessage}
</div>
```

### **Reduced Motion**
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .neo-animate-slide-up,
  .neo-float,
  .neo-energy-flow {
    animation: none;
  }
}
```

## 🚀 **Performance Patterns**

### **Lazy Loading**
```tsx
// Dynamic component loading
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <NeoProgress value={0} />,
  ssr: false
});
```

### **Optimized Animations**
```css
/* GPU acceleration */
.neo-gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}

/* Efficient transitions */
.neo-smooth-transition {
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}
```

## 🧪 **Testing Patterns**

### **Component Testing**
```tsx
// Test component variants
describe('NeoButton', () => {
  it('renders primary variant correctly', () => {
    render(<NeoButton variant="primary">Click me</NeoButton>);
    expect(screen.getByRole('button')).toHaveClass('neo-button-primary');
  });
});
```

### **Visual Regression Testing**
```tsx
// Test visual consistency
it('matches Neo-Materialism design tokens', () => {
  const { container } = render(<NeoCard>Test content</NeoCard>);
  expect(container.firstChild).toMatchSnapshot();
});
```

## 📊 **Analytics Patterns**

### **Interaction Tracking**
```tsx
// Track component interactions
<NeoButton 
  variant="primary"
  onClick={() => {
    analytics.track('button_clicked', { variant: 'primary' });
    handleClick();
  }}
>
  Tracked Action
</NeoButton>
```

## 🔧 **Development Patterns**

### **Component Composition**
```tsx
// Compose complex components
const FeatureSection = () => (
  <section className="neo-section">
    <div className="neo-container">
      <h2 className="neo-heading">Features</h2>
      <div className="neo-grid-3 neo-spacing-lg">
        {features.map(feature => (
          <NeoCard key={feature.id} variant="elevated">
            <FeatureCard {...feature} />
          </NeoCard>
        ))}
      </div>
    </div>
  </section>
);
```

### **Theme Customization**
```tsx
// Custom theme implementation
const customTheme = {
  '--neo-primary': '#your-brand-color',
  '--neo-secondary': '#your-secondary-color',
};

<div style={customTheme}>
  <NeoButton variant="primary">Custom Themed Button</NeoButton>
</div>
```

---

*These patterns ensure consistent, accessible, and performant implementation of Neo-Materialism across all applications.*
