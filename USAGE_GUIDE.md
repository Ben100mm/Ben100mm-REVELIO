# Revelio Design System - Usage Guide

> A comprehensive guide for implementing the Revelio Creator Marketplace design system with 3D modern aesthetics and glassmorphism effects.

## Table of Contents

1. [Logo Specifications](#logo-specifications)
2. [Background System](#background-system)
3. [Typography System](#typography-system)
4. [Button & CTA System](#button--cta-system)
5. [Charts & Data Visualization](#charts--data-visualization)
6. [Visual Ratio System](#visual-ratio-system)
7. [Implementation Examples](#implementation-examples)
8. [CSS Classes Reference](#css-classes-reference)

---

## Logo Specifications

### Primary Logo
- **Default Fill**: Cyan → Blue → Purple gradient
- **Usage**: Primary brand representation across all interfaces
- **Background**: White or light backgrounds

```css
.logo-primary {
  background: linear-gradient(135deg, #00D4FF 0%, #3A86FF 50%, #8338EC 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### White Logo Variant
- **Fill**: White (#FFFFFF)
- **Usage**: Dark gradient backgrounds
- **Contrast**: Ensures visibility on dark surfaces

```css
.logo-white {
  color: #FFFFFF;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
```

### Creative Alternate (Submark)
- **Fill**: Gold → Pink → Violet gradient
- **Usage**: Creative contexts, social media, alternative branding
- **Application**: Smaller logo variants, favicons, social icons

```css
.logo-creative {
  background: linear-gradient(135deg, #FFD700 0%, #FF6B9D 50%, #8B5CF6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## Background System

### Primary App Background
- **Gradient**: Cyan → Blue → Purple
- **Usage**: Main application backgrounds, hero sections
- **Coverage**: 40% of total interface

```css
.bg-primary-gradient {
  background: linear-gradient(135deg, #00D4FF 0%, #3A86FF 50%, #8338EC 100%);
  background-size: 400% 400%;
  animation: gradient-flow 15s ease infinite;
}

@keyframes gradient-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### Glassmorphism Cards
- **Effect**: Blurred transparency with subtle glow
- **Usage**: Cards, modals, overlays
- **Coverage**: 25% of total interface

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}
```

### Dark Mode Sections
- **Color**: Dark Violet (#1A1240)
- **Usage**: Deep sections, navigation, sidebars
- **Contrast**: High contrast for text readability

```css
.bg-dark-violet {
  background: #1A1240;
  color: #FFFFFF;
}
```

---

## Typography System

### Primary Fonts
- **Primary**: Inter (modern, clean)
- **Alternatives**: Poppins, Source Sans Pro
- **Fallback**: system-ui, sans-serif

```css
.font-primary {
  font-family: 'Inter', 'Poppins', 'Source Sans Pro', system-ui, sans-serif;
}
```

### Text Colors

#### Body Text
- **Color**: White (#FFFFFF)
- **Shadow**: Subtle shadow for readability on gradients
- **Usage**: Main content, descriptions, body copy

```css
.text-body {
  color: #FFFFFF;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
```

#### Headers
- **Style**: Gradient text (Cyan → Purple)
- **Usage**: H1, H2, H3 headings, emphasis
- **Weight**: Bold (700-900)

```css
.text-gradient-header {
  background: linear-gradient(135deg, #00D4FF 0%, #8338EC 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}
```

#### Highlight Text/Badges
- **Primary**: Neon Cyan (#00D4FF)
- **Secondary**: Neon Purple (#8338EC)
- **Usage**: Badges, highlights, callouts

```css
.text-highlight-cyan {
  color: #00D4FF;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.text-highlight-purple {
  color: #8338EC;
  text-shadow: 0 0 10px rgba(131, 56, 236, 0.5);
}
```

---

## Button & CTA System

### Primary CTA
- **Gradient**: Gold → Pink → Violet
- **Text**: White
- **Usage**: Main actions, sign-ups, purchases
- **Coverage**: 10% of interface

```css
.btn-primary-cta {
  background: linear-gradient(135deg, #FFD700 0%, #FF6B9D 50%, #8B5CF6 100%);
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 
    0 4px 15px rgba(255, 215, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.btn-primary-cta:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 25px rgba(255, 215, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.2);
}
```

### Secondary CTA
- **Gradient**: Cyan → Blue
- **Text**: White
- **Usage**: Secondary actions, learn more, explore

```css
.btn-secondary-cta {
  background: linear-gradient(135deg, #00D4FF 0%, #3A86FF 100%);
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 
    0 4px 15px rgba(0, 212, 255, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.btn-secondary-cta:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 25px rgba(0, 212, 255, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.2);
}
```

### Tertiary (Alerts/Urgent)
- **Color**: Neon Purple (#8338EC)
- **Text**: White
- **Usage**: Alerts, urgent actions, warnings

```css
.btn-tertiary-alert {
  background: #8338EC;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 
    0 4px 15px rgba(131, 56, 236, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.btn-tertiary-alert:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 25px rgba(131, 56, 236, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.2);
}
```

### Disabled State
- **Style**: Translucent glass card
- **Text**: White at 40% opacity
- **Usage**: Inactive buttons, loading states

```css
.btn-disabled {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.4);
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: not-allowed;
}
```

---

## Charts & Data Visualization

### Color Palette

#### Primary Series
- **Color**: Cyan (#00D4FF)
- **Usage**: Main data points, primary metrics
- **Application**: Line charts, primary bars

```css
.chart-primary {
  fill: #00D4FF;
  stroke: #00D4FF;
  filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.3));
}
```

#### Secondary Series
- **Color**: Blue (#3A86FF)
- **Usage**: Secondary data points, comparisons
- **Application**: Secondary lines, comparison bars

```css
.chart-secondary {
  fill: #3A86FF;
  stroke: #3A86FF;
  filter: drop-shadow(0 0 8px rgba(58, 134, 255, 0.3));
}
```

#### Highlights
- **Color**: Purple (#8338EC)
- **Usage**: Important data points, peaks, anomalies
- **Application**: Highlighted values, special markers

```css
.chart-highlight {
  fill: #8338EC;
  stroke: #8338EC;
  filter: drop-shadow(0 0 12px rgba(131, 56, 236, 0.5));
}
```

#### Alerts/Negative Values
- **Color**: Pink/Red (#F72585)
- **Usage**: Negative trends, alerts, warnings
- **Application**: Negative bars, warning indicators

```css
.chart-alert {
  fill: #F72585;
  stroke: #F72585;
  filter: drop-shadow(0 0 8px rgba(247, 37, 133, 0.3));
}
```

### Axis & Gridlines
- **Color**: White at 30-50% opacity
- **Usage**: Chart axes, grid lines, reference lines
- **Background**: Over gradient backgrounds

```css
.chart-axis {
  stroke: rgba(255, 255, 255, 0.3);
  stroke-width: 1;
}

.chart-grid {
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 0.5;
}
```

---

## Visual Ratio System

### Distribution Guidelines

#### 40% - Gradient Backgrounds
- Primary app backgrounds
- Hero sections
- Section dividers

```css
.ratio-gradient-bg {
  /* Applied to 40% of total interface */
  background: linear-gradient(135deg, #00D4FF 0%, #3A86FF 50%, #8338EC 100%);
}
```

#### 25% - Glassmorphism Cards
- Content cards
- Modal surfaces
- Navigation panels

```css
.ratio-glass-cards {
  /* Applied to 25% of total interface */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

#### 15% - Gradient Typography & Icons
- Headers and emphasis text
- Icon backgrounds
- Brand elements

```css
.ratio-gradient-text {
  /* Applied to 15% of total interface */
  background: linear-gradient(135deg, #00D4FF 0%, #8338EC 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

#### 10% - CTA Gradients
- Primary action buttons
- Call-to-action elements
- Interactive highlights

```css
.ratio-cta-gradients {
  /* Applied to 10% of total interface */
  background: linear-gradient(135deg, #FFD700 0%, #FF6B9D 50%, #8B5CF6 100%);
}
```

#### 10% - Neon Accents
- Highlight elements
- Status indicators
- Interactive feedback

```css
.ratio-neon-accents {
  /* Applied to 10% of total interface */
  color: #00D4FF;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}
```

---

## Implementation Examples

### Hero Section
```html
<section class="hero-section">
  <div class="bg-primary-gradient">
    <div class="container">
      <h1 class="text-gradient-header heading-1">
        Welcome to Revelio
      </h1>
      <p class="text-body text-lg">
        Transform your content creation journey
      </p>
      <button class="btn-primary-cta">
        Get Started
      </button>
    </div>
  </div>
</section>
```

### Dashboard Card
```html
<div class="dashboard-card">
  <div class="glass-card">
    <div class="card-header">
      <h3 class="text-gradient-header heading-5">
        Performance Metrics
      </h3>
      <span class="text-highlight-cyan badge">
        Live
      </span>
    </div>
    <div class="card-content">
      <canvas class="chart-container"></canvas>
    </div>
  </div>
</div>
```

### Navigation Bar
```html
<nav class="navigation-bar">
  <div class="bg-dark-violet">
    <div class="nav-brand">
      <img src="logo-white.svg" alt="Revelio" class="logo-white">
    </div>
    <div class="nav-actions">
      <button class="btn-secondary-cta">Sign In</button>
      <button class="btn-primary-cta">Get Started</button>
    </div>
  </div>
</nav>
```

---

## CSS Classes Reference

### Background Classes
```css
.bg-primary-gradient     /* Cyan → Blue → Purple */
.bg-creative-gradient    /* Gold → Pink → Violet */
.glass-card             /* Glassmorphism effect */
.bg-dark-violet         /* Dark violet background */
```

### Text Classes
```css
.text-gradient-header   /* Cyan → Purple gradient text */
.text-body             /* White text with shadow */
.text-highlight-cyan   /* Neon cyan highlight */
.text-highlight-purple /* Neon purple highlight */
```

### Button Classes
```css
.btn-primary-cta       /* Gold → Pink → Violet */
.btn-secondary-cta     /* Cyan → Blue */
.btn-tertiary-alert    /* Neon purple */
.btn-disabled          /* Translucent glass */
```

### Chart Classes
```css
.chart-primary         /* Cyan (#00D4FF) */
.chart-secondary       /* Blue (#3A86FF) */
.chart-highlight       /* Purple (#8338EC) */
.chart-alert          /* Pink/Red (#F72585) */
.chart-axis           /* White 30% opacity */
.chart-grid           /* White 20% opacity */
```

### Ratio Classes
```css
.ratio-gradient-bg     /* 40% of interface */
.ratio-glass-cards     /* 25% of interface */
.ratio-gradient-text   /* 15% of interface */
.ratio-cta-gradients   /* 10% of interface */
.ratio-neon-accents    /* 10% of interface */
```

---

## Best Practices

### Do's
- ✅ Use the specified color ratios for consistent visual balance
- ✅ Apply glassmorphism effects to cards and modals
- ✅ Use gradient text for headers and emphasis
- ✅ Implement subtle shadows for text readability
- ✅ Apply hover effects to interactive elements
- ✅ Use the neon accent colors sparingly for highlights

### Don'ts
- ❌ Mix gradient directions inconsistently
- ❌ Use too many neon accents (stick to 10% ratio)
- ❌ Apply gradients to body text (use white with shadow)
- ❌ Overuse glassmorphism effects
- ❌ Ignore the visual ratio guidelines
- ❌ Use low contrast combinations

---

## Browser Support

### Modern Browsers
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### Features
- ✅ CSS Gradients
- ✅ Backdrop Filter (glassmorphism)
- ✅ CSS Custom Properties
- ✅ Modern Flexbox/Grid
- ✅ CSS Animations

### Fallbacks
- Gradient fallbacks to solid colors
- Glassmorphism fallbacks to semi-transparent backgrounds
- Animation fallbacks to static states

---

*This usage guide ensures consistent implementation of the Revelio design system across all interfaces and platforms.*
