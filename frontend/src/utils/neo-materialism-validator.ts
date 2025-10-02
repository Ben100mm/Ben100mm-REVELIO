/**
 * Neo-Materialism Design System Validator
 * Ensures consistent implementation of Neo-Materialism patterns and components
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

export interface ComponentValidationOptions {
  strictMode?: boolean;
  allowCustomVariants?: boolean;
  enforceAccessibility?: boolean;
  checkPerformance?: boolean;
}

/**
 * Validates Neo-Materialism component props
 */
export function validateComponentProps(
  componentName: string,
  props: Record<string, any>,
  options: ComponentValidationOptions = {}
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  const {
    strictMode = false,
    allowCustomVariants = false,
    enforceAccessibility = true,
    checkPerformance = true,
  } = options;

  // Component-specific validation
  switch (componentName) {
    case 'NeoButton':
      validateNeoButton(props, errors, warnings, suggestions, options);
      break;
    case 'NeoCard':
      validateNeoCard(props, errors, warnings, suggestions, options);
      break;
    case 'NeoInput':
      validateNeoInput(props, errors, warnings, suggestions, options);
      break;
    case 'NeoModal':
      validateNeoModal(props, errors, warnings, suggestions, options);
      break;
    default:
      warnings.push(`Unknown component: ${componentName}`);
  }

  // General Neo-Materialism validation
  validateGeneralProps(props, errors, warnings, suggestions, options);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}

/**
 * Validates NeoButton component props
 */
function validateNeoButton(
  props: Record<string, any>,
  errors: string[],
  warnings: string[],
  suggestions: string[],
  options: ComponentValidationOptions
): void {
  const validVariants = ['primary', 'secondary', 'accent', 'ghost', 'danger'];
  const validSizes = ['sm', 'md', 'lg', 'xl'];

  if (props.variant && !validVariants.includes(props.variant)) {
    if (options.strictMode || !options.allowCustomVariants) {
      errors.push(`Invalid variant '${props.variant}'. Must be one of: ${validVariants.join(', ')}`);
    } else {
      warnings.push(`Custom variant '${props.variant}' detected. Consider using standard variants for consistency.`);
    }
  }

  if (props.size && !validSizes.includes(props.size)) {
    errors.push(`Invalid size '${props.size}'. Must be one of: ${validSizes.join(', ')}`);
  }

  if (props.glow && props.energy) {
    warnings.push('Using both glow and energy effects may impact performance. Consider using only one.');
  }

  if (props.loading && !props.disabled) {
    suggestions.push('Consider disabling the button when loading to prevent multiple submissions.');
  }

  // Accessibility validation
  if (options.enforceAccessibility) {
    if (props.disabled && !props['aria-disabled']) {
      suggestions.push('Add aria-disabled attribute for disabled buttons.');
    }

    if (!props.children && !props['aria-label']) {
      errors.push('Button must have either children or aria-label for accessibility.');
    }
  }

  // Performance validation
  if (options.checkPerformance) {
    if (props.energy && !props.animated) {
      suggestions.push('Energy effects work best with animation enabled.');
    }
  }
}

/**
 * Validates NeoCard component props
 */
function validateNeoCard(
  props: Record<string, any>,
  errors: string[],
  warnings: string[],
  suggestions: string[],
  options: ComponentValidationOptions
): void {
  const validVariants = ['default', 'elevated', 'interactive', 'glass', 'crystal'];
  const validSizes = ['sm', 'md', 'lg', 'xl'];

  if (props.variant && !validVariants.includes(props.variant)) {
    if (options.strictMode || !options.allowCustomVariants) {
      errors.push(`Invalid variant '${props.variant}'. Must be one of: ${validVariants.join(', ')}`);
    } else {
      warnings.push(`Custom variant '${props.variant}' detected.`);
    }
  }

  if (props.size && !validSizes.includes(props.size)) {
    errors.push(`Invalid size '${props.size}'. Must be one of: ${validSizes.join(', ')}`);
  }

  if (props.interactive && !props.onClick) {
    warnings.push('Interactive cards should have an onClick handler.');
  }

  if (props.glow && props.energy) {
    warnings.push('Using both glow and energy effects may be visually overwhelming.');
  }

  // Accessibility validation
  if (options.enforceAccessibility) {
    if (props.interactive && !props.role) {
      suggestions.push('Interactive cards should have role="button" for accessibility.');
    }

    if (props.onClick && !props['aria-label'] && !props.children) {
      warnings.push('Clickable cards should have descriptive aria-label or children.');
    }
  }
}

/**
 * Validates NeoInput component props
 */
function validateNeoInput(
  props: Record<string, any>,
  errors: string[],
  warnings: string[],
  suggestions: string[],
  options: ComponentValidationOptions
): void {
  const validVariants = ['default', 'glass', 'crystal', 'energy'];
  const validSizes = ['sm', 'md', 'lg'];
  const validTypes = ['text', 'email', 'password', 'number', 'tel', 'url'];

  if (props.variant && !validVariants.includes(props.variant)) {
    if (options.strictMode || !options.allowCustomVariants) {
      errors.push(`Invalid variant '${props.variant}'. Must be one of: ${validVariants.join(', ')}`);
    }
  }

  if (props.size && !validSizes.includes(props.size)) {
    errors.push(`Invalid size '${props.size}'. Must be one of: ${validSizes.join(', ')}`);
  }

  if (props.type && !validTypes.includes(props.type)) {
    warnings.push(`Unusual input type '${props.type}'. Consider using standard HTML input types.`);
  }

  if (props.error && props.success) {
    errors.push('Input cannot have both error and success states simultaneously.');
  }

  if (props.glow && props.variant === 'energy') {
    warnings.push('Using glow with energy variant may create visual conflict.');
  }

  // Accessibility validation
  if (options.enforceAccessibility) {
    if (!props.label && !props['aria-label']) {
      warnings.push('Input should have either label or aria-label for accessibility.');
    }

    if (props.error && !props['aria-describedby']) {
      suggestions.push('Error messages should be associated with aria-describedby.');
    }

    if (props.required && !props['aria-required']) {
      suggestions.push('Required inputs should have aria-required attribute.');
    }
  }
}

/**
 * Validates NeoModal component props
 */
function validateNeoModal(
  props: Record<string, any>,
  errors: string[],
  warnings: string[],
  suggestions: string[],
  options: ComponentValidationOptions
): void {
  const validVariants = ['default', 'glass', 'crystal'];
  const validSizes = ['sm', 'md', 'lg', 'xl', 'full'];

  if (props.variant && !validVariants.includes(props.variant)) {
    if (options.strictMode || !options.allowCustomVariants) {
      errors.push(`Invalid variant '${props.variant}'. Must be one of: ${validVariants.join(', ')}`);
    }
  }

  if (props.size && !validSizes.includes(props.size)) {
    errors.push(`Invalid size '${props.size}'. Must be one of: ${validSizes.join(', ')}`);
  }

  if (props.isOpen && !props.onClose) {
    errors.push('Open modals must have an onClose handler.');
  }

  if (props.closeOnOverlayClick && props.closeOnEscape === false) {
    warnings.push('Consider allowing escape key to close modal for better accessibility.');
  }

  // Accessibility validation
  if (options.enforceAccessibility) {
    if (props.isOpen && !props.title && !props['aria-labelledby']) {
      warnings.push('Modals should have a title or aria-labelledby for accessibility.');
    }

    if (props.isOpen && !props['aria-modal']) {
      suggestions.push('Modals should have aria-modal="true" attribute.');
    }
  }
}

/**
 * Validates general Neo-Materialism props
 */
function validateGeneralProps(
  props: Record<string, any>,
  errors: string[],
  warnings: string[],
  suggestions: string[],
  options: ComponentValidationOptions
): void {
  // Check for common anti-patterns
  if (props.className && props.className.includes('!important')) {
    warnings.push('Avoid using !important in Neo-Materialism components. Use proper specificity instead.');
  }

  if (props.style && typeof props.style === 'object') {
    const inlineStyles = Object.keys(props.style);
    const neoProps = ['variant', 'size', 'glow', 'energy'];
    
    for (const style of inlineStyles) {
      if (neoProps.some(prop => style.toLowerCase().includes(prop))) {
        warnings.push(`Consider using component props instead of inline styles for ${style}.`);
      }
    }
  }

  // Performance checks
  if (options.checkPerformance) {
    if (props.glow && props.energy && props.animated) {
      warnings.push('Multiple animation effects may impact performance on lower-end devices.');
    }

    if (props.className && props.className.includes('backdrop-blur-xl')) {
      suggestions.push('Heavy backdrop blur may impact performance. Consider using backdrop-blur-md instead.');
    }
  }

  // Accessibility checks
  if (options.enforceAccessibility) {
    if (props.disabled && !props['aria-disabled']) {
      suggestions.push('Add aria-disabled for disabled components.');
    }

    if (props.loading && !props['aria-busy']) {
      suggestions.push('Add aria-busy for loading states.');
    }
  }
}

/**
 * Validates color usage in Neo-Materialism
 */
export function validateColorUsage(color: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Check if color is a Neo-Materialism token
  if (color.startsWith('#')) {
    warnings.push('Consider using Neo-Materialism color tokens instead of hex colors for consistency.');
    
    // Check for accessibility
    if (isLightColor(color)) {
      suggestions.push('Light colors should be used on dark backgrounds.');
    }
  }

  if (color.includes('rgb') || color.includes('hsl')) {
    warnings.push('Consider using CSS custom properties for colors to support theming.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}

/**
 * Validates spacing usage
 */
export function validateSpacing(spacing: string | number): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  if (typeof spacing === 'number') {
    // Check if it's a valid Neo-Materialism spacing value
    const validSpacing = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96];
    
    if (!validSpacing.includes(spacing)) {
      warnings.push(`Consider using standard Neo-Materialism spacing values: ${validSpacing.join(', ')}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}

/**
 * Helper function to check if a color is light
 */
function isLightColor(color: string): boolean {
  // Simple heuristic - in a real implementation, you'd use a proper color library
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

/**
 * Validates entire component tree for Neo-Materialism compliance
 */
export function validateComponentTree(
  components: Array<{ name: string; props: Record<string, any> }>,
  options: ComponentValidationOptions = {}
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  for (const component of components) {
    const result = validateComponentProps(component.name, component.props, options);
    errors.push(...result.errors);
    warnings.push(...result.warnings);
    suggestions.push(...result.suggestions);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}

/**
 * Development helper to log validation results
 */
export function logValidationResult(result: ValidationResult, componentName?: string): void {
  const prefix = componentName ? `[${componentName}]` : '[Neo-Materialism]';
  
  if (result.errors.length > 0) {
    console.error(`${prefix} Validation Errors:`, result.errors);
  }
  
  if (result.warnings.length > 0) {
    console.warn(`${prefix} Validation Warnings:`, result.warnings);
  }
  
  if (result.suggestions.length > 0) {
    console.info(`${prefix} Suggestions:`, result.suggestions);
  }
  
  if (result.isValid) {
    console.log(`${prefix} ✅ Component is valid`);
  }
}
