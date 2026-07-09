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
        void: '#0D1117',
        surface: '#1C2128',
        hover: '#262C33',
        accent: '#6366F1',
        glow: '#A78BFA',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        muted: '#6B7280',
        light: '#E5E7EB',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(99, 102, 241, 0.08)',
        'glass-lg': '0 16px 48px rgba(99, 102, 241, 0.12)',
        'glow': '0 0 20px rgba(167, 139, 250, 0.3)',
      },
      borderRadius: {
        'standard': '12px',
        'lg': '16px',
        'sm': '8px',
      },
      transitionTimingFunction: {
        'cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
}
