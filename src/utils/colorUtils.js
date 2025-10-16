/**
 * SHOP UP - Modern Color Utility System
 * Centralized color management for light and dark modes
 */

export const getThemeColors = (mode) => {
  const isDark = mode === 'dark';
  
  return {
    // Primary Colors
    primary: {
      main: isDark ? '#60a5fa' : '#3b82f6',
      hover: isDark ? '#93c5fd' : '#2563eb',
      light: isDark ? '#93c5fd' : '#dbeafe',
      dark: isDark ? '#3b82f6' : '#1e3a8a',
    },
    
    // Secondary Colors
    secondary: {
      main: isDark ? '#c084fc' : '#a855f7',
      hover: isDark ? '#d8b4fe' : '#9333ea',
      light: isDark ? '#e9d5ff' : '#f3e8ff',
      dark: isDark ? '#a855f7' : '#6b21a8',
    },
    
    // Accent Colors
    accent: {
      main: isDark ? '#34d399' : '#10b981',
      hover: isDark ? '#6ee7b7' : '#059669',
      light: isDark ? '#a7f3d0' : '#d1fae5',
      dark: isDark ? '#10b981' : '#064e3b',
    },
    
    // Background Colors
    background: {
      primary: isDark ? '#0f172a' : '#f8fafc',
      secondary: isDark ? '#1e293b' : '#f1f5f9',
      tertiary: isDark ? '#334155' : '#ffffff',
    },
    
    // Surface Colors
    surface: {
      main: isDark ? '#1e293b' : '#ffffff',
      hover: isDark ? '#334155' : '#f8fafc',
      active: isDark ? '#475569' : '#f1f5f9',
    },
    
    // Text Colors
    text: {
      primary: isDark ? '#f1f5f9' : '#0f172a',
      secondary: isDark ? '#cbd5e1' : '#475569',
      tertiary: isDark ? '#94a3b8' : '#64748b',
      inverse: isDark ? '#0f172a' : '#ffffff',
    },
    
    // Border Colors
    border: {
      main: isDark ? '#334155' : '#e2e8f0',
      hover: isDark ? '#475569' : '#cbd5e1',
      focus: isDark ? '#60a5fa' : '#3b82f6',
    },
    
    // Semantic Colors
    semantic: {
      success: isDark ? '#34d399' : '#10b981',
      error: isDark ? '#f87171' : '#ef4444',
      warning: isDark ? '#fbbf24' : '#f59e0b',
      info: isDark ? '#60a5fa' : '#3b82f6',
    },
    
    // E-commerce Specific
    ecommerce: {
      price: {
        original: '#64748b',
        discount: '#ef4444',
        sale: '#dc2626',
      },
      badge: {
        new: isDark ? '#60a5fa' : '#3b82f6',
        sale: '#ef4444',
        hot: '#f59e0b',
        featured: isDark ? '#c084fc' : '#a855f7',
      },
      stock: {
        inStock: isDark ? '#34d399' : '#10b981',
        lowStock: '#f59e0b',
        outOfStock: '#ef4444',
      },
      rating: '#fbbf24',
    },
  };
};

/**
 * Get shadow styles based on theme
 */
export const getThemeShadow = (mode, size = 'md') => {
  const isDark = mode === 'dark';
  
  const shadows = {
    sm: isDark ? '0 1px 2px 0 rgba(0, 0, 0, 0.3)' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: isDark ? '0 4px 6px -1px rgba(0, 0, 0, 0.4)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: isDark ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: isDark ? '0 20px 25px -5px rgba(0, 0, 0, 0.6)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };
  
  return shadows[size] || shadows.md;
};

/**
 * Get button styles based on variant and theme
 */
export const getButtonStyles = (mode, variant = 'primary') => {
  const colors = getThemeColors(mode);
  
  const variants = {
    primary: {
      backgroundColor: colors.primary.main,
      color: '#ffffff',
      border: 'none',
      hover: {
        backgroundColor: colors.primary.hover,
      },
    },
    secondary: {
      backgroundColor: colors.secondary.main,
      color: '#ffffff',
      border: 'none',
      hover: {
        backgroundColor: colors.secondary.hover,
      },
    },
    accent: {
      backgroundColor: colors.accent.main,
      color: '#ffffff',
      border: 'none',
      hover: {
        backgroundColor: colors.accent.hover,
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary.main,
      border: `2px solid ${colors.border.main}`,
      hover: {
        backgroundColor: colors.surface.hover,
        borderColor: colors.primary.main,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.text.primary,
      border: 'none',
      hover: {
        backgroundColor: colors.surface.hover,
      },
    },
    danger: {
      backgroundColor: colors.semantic.error,
      color: '#ffffff',
      border: 'none',
      hover: {
        backgroundColor: '#dc2626',
      },
    },
  };
  
  return variants[variant] || variants.primary;
};

/**
 * Get input/form field styles
 */
export const getInputStyles = (mode) => {
  const colors = getThemeColors(mode);
  
  return {
    backgroundColor: colors.surface.main,
    color: colors.text.primary,
    borderColor: colors.border.main,
    placeholder: colors.text.tertiary,
    focus: {
      borderColor: colors.border.focus,
      ring: `0 0 0 3px ${colors.primary.main}20`,
    },
  };
};

/**
 * Get card styles
 */
export const getCardStyles = (mode) => {
  const colors = getThemeColors(mode);
  
  return {
    backgroundColor: colors.surface.main,
    color: colors.text.primary,
    borderColor: colors.border.main,
    shadow: getThemeShadow(mode, 'md'),
    hover: {
      backgroundColor: colors.surface.hover,
      shadow: getThemeShadow(mode, 'lg'),
    },
  };
};

/**
 * Transition utility
 */
export const transitions = {
  default: 'all 0.3s ease-in-out',
  fast: 'all 0.15s ease-in-out',
  slow: 'all 0.5s ease-in-out',
  colors: 'color 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out',
};
