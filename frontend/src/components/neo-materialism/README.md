# Neo-Materialism Component Library

This directory contains all Neo-Materialism UI components that follow the design system principles.

## 📁 **Component Structure**

```
neo-materialism/
├── README.md                 # This file
├── NeoCard.tsx              # Material cards with depth and lighting
├── NeoButton.tsx            # Interactive buttons with energy effects
├── NeoGlass.tsx             # Glass morphism panels and containers
├── NeoInput.tsx             # Form inputs with material styling
├── NeoNavigation.tsx        # Navigation with spatial depth
├── NeoModal.tsx             # Modal dialogs with backdrop blur
├── NeoProgress.tsx          # Progress indicators with energy flow
├── NeoBadge.tsx             # Status badges with glow effects
├── NeoTooltip.tsx           # Tooltips with 3D positioning
├── NeoDropdown.tsx          # Dropdown menus with physics
├── NeoSlider.tsx            # Range sliders with material feedback
├── NeoToggle.tsx            # Toggle switches with smooth transitions
├── NeoAccordion.tsx         # Collapsible content with morphing
├── NeoTable.tsx             # Data tables with glass styling
├── NeoChart.tsx             # Charts with 3D visualization
└── index.ts                 # Component exports
```

## 🎨 **Design Principles**

Each component follows these core Neo-Materialism principles:

1. **Material Authenticity** - Realistic lighting and shadows
2. **Spatial Depth** - Proper 3D positioning and layering
3. **Physics-Based Interactions** - Natural movement and feedback
4. **Luminous Clarity** - Clear visual hierarchy with light
5. **Minimal Complexity** - Purposeful effects that enhance UX

## 🔧 **Usage Guidelines**

### **Importing Components**
```tsx
import { NeoCard, NeoButton, NeoGlass } from '@/components/neo-materialism';
```

### **Basic Usage**
```tsx
// Material Card
<NeoCard className="p-6">
  <h3 className="text-xl font-semibold mb-4">Card Title</h3>
  <p className="text-slate-300">Card content with material styling</p>
</NeoCard>

// Interactive Button
<NeoButton variant="primary" size="lg" onClick={handleClick}>
  Action Button
</NeoButton>

// Glass Panel
<NeoGlass className="p-8 rounded-2xl">
  <div className="text-center">
    <h2 className="neo-text-holographic text-3xl mb-4">Glass Panel</h2>
    <p className="text-slate-300">Content with backdrop blur effect</p>
  </div>
</NeoGlass>
```

## 🎯 **Component Variants**

### **NeoButton Variants**
- `primary` - Electric blue gradient with glow
- `secondary` - Glass morphism with subtle border
- `accent` - Holographic cyan with energy flow
- `ghost` - Transparent with hover effects
- `danger` - Red gradient with warning glow

### **NeoCard Variants**
- `default` - Standard material card
- `elevated` - Higher elevation with stronger shadows
- `interactive` - Hover effects and click feedback
- `glass` - Glass morphism variant
- `crystal` - Crystal transparency with rainbow effects

### **NeoGlass Variants**
- `default` - Standard glass panel
- `dark` - Darker glass with subtle tint
- `tinted` - Color-tinted glass
- `frosted` - Heavy blur effect
- `crystal` - Crystal clear with rainbow edges

## 🎨 **Customization**

### **CSS Custom Properties**
All components use CSS custom properties for easy theming:

```css
:root {
  --neo-primary: #3B82F6;
  --neo-secondary: #8B5CF6;
  --neo-accent: #06B6D4;
  --neo-surface: #1E293B;
  --neo-surface-elevated: #334155;
}
```

### **Component Props**
Most components accept standard props plus Neo-Materialism specific ones:

```tsx
interface NeoButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  glow?: boolean;
  energy?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}
```

## 🚀 **Performance Considerations**

- All animations use `transform` and `opacity` for GPU acceleration
- Components implement `will-change` for animated elements
- Backdrop filters are used sparingly for performance
- Reduced motion preferences are respected
- Components lazy-load when possible

## 📱 **Responsive Design**

All components are mobile-first and responsive:
- Touch-friendly interaction areas
- Optimized animations for mobile
- Adaptive spacing and typography
- Gesture support where appropriate

## ♿ **Accessibility**

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences
- Focus indicators with material styling

## 🧪 **Testing**

Each component includes:
- Unit tests for functionality
- Visual regression tests
- Accessibility tests
- Performance benchmarks
- Cross-browser compatibility tests

---

*This component library represents the cutting edge of web UI design, combining advanced 3D graphics with modern accessibility and performance standards.*
