/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SHOP UP Modern Color Scheme
        // Light Mode Colors
        light: {
          primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',  // Main brand blue
            600: '#2563eb',  // Hover state
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
          secondary: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',  // Main purple
            600: '#9333ea',  // Hover state
            700: '#7e22ce',
            800: '#6b21a8',
            900: '#581c87',
          },
          accent: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',  // Success green
            600: '#059669',  // Hover state
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
          },
          background: {
            DEFAULT: '#f8fafc',
            secondary: '#f1f5f9',
            tertiary: '#ffffff',
          },
          surface: {
            DEFAULT: '#ffffff',
            hover: '#f8fafc',
            active: '#f1f5f9',
          },
          text: {
            primary: '#0f172a',
            secondary: '#475569',
            tertiary: '#64748b',
            inverse: '#ffffff',
          },
          border: {
            DEFAULT: '#e2e8f0',
            hover: '#cbd5e1',
            focus: '#3b82f6',
          },
        },
        // Dark Mode Colors
        dark: {
          primary: {
            50: '#1e3a8a',
            100: '#1e40af',
            200: '#1d4ed8',
            300: '#2563eb',
            400: '#3b82f6',
            500: '#60a5fa',  // Main brand blue (brighter for dark mode)
            600: '#93c5fd',  // Hover state
            700: '#bfdbfe',
            800: '#dbeafe',
            900: '#eff6ff',
          },
          secondary: {
            50: '#581c87',
            100: '#6b21a8',
            200: '#7e22ce',
            300: '#9333ea',
            400: '#a855f7',
            500: '#c084fc',  // Main purple (brighter for dark mode)
            600: '#d8b4fe',  // Hover state
            700: '#e9d5ff',
            800: '#f3e8ff',
            900: '#faf5ff',
          },
          accent: {
            50: '#064e3b',
            100: '#065f46',
            200: '#047857',
            300: '#059669',
            400: '#10b981',
            500: '#34d399',  // Success green (brighter for dark mode)
            600: '#6ee7b7',  // Hover state
            700: '#a7f3d0',
            800: '#d1fae5',
            900: '#ecfdf5',
          },
          background: {
            DEFAULT: '#0f172a',
            secondary: '#1e293b',
            tertiary: '#334155',
          },
          surface: {
            DEFAULT: '#1e293b',
            hover: '#334155',
            active: '#475569',
          },
          text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
            tertiary: '#94a3b8',
            inverse: '#0f172a',
          },
          border: {
            DEFAULT: '#334155',
            hover: '#475569',
            focus: '#60a5fa',
          },
        },
        // Semantic Colors (work in both modes)
        semantic: {
          success: {
            light: '#10b981',
            dark: '#34d399',
          },
          error: {
            light: '#ef4444',
            dark: '#f87171',
          },
          warning: {
            light: '#f59e0b',
            dark: '#fbbf24',
          },
          info: {
            light: '#3b82f6',
            dark: '#60a5fa',
          },
        },
        // E-commerce Specific Colors
        ecommerce: {
          price: {
            original: '#64748b',
            discount: '#ef4444',
            sale: '#dc2626',
          },
          badge: {
            new: '#3b82f6',
            sale: '#ef4444',
            hot: '#f59e0b',
            featured: '#a855f7',
          },
          stock: {
            inStock: '#10b981',
            lowStock: '#f59e0b',
            outOfStock: '#ef4444',
          },
          rating: {
            filled: '#fbbf24',
            empty: '#e5e7eb',
          },
        },
      },
      boxShadow: {
        'light-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'light-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'light-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'light-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}