/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: 'var(--color-void)',
        surface: 'var(--color-surface)',
        hover: 'var(--color-hover)',
        accent: 'var(--color-accent)', // #2563EB primary
        glow: 'var(--color-glow)',     // #06B6D4 secondary
        success: '#10B981',
        warning: 'var(--color-warning)', // #F59E0B accent
        danger: '#EF4444',
        muted: 'var(--color-muted)',
        light: 'var(--color-light)',
      },
      fontFamily: {
        display: ['Outfit', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px var(--color-shadow)',
        'glass-lg': '0 16px 48px var(--color-shadow-lg)',
        'glow': '0 0 20px rgba(6, 182, 212, 0.3)',
      },
      borderRadius: {
        'standard': '12px',
        'lg': '16px',
        'sm': '8px',
        'premium': '18px',
        '2xl': '18px',
      },
      transitionTimingFunction: {
        'cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
