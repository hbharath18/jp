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
        base: '#07070A',
        surface: '#0E0E12',
        elevated: '#15151A',
        hover: '#1B1B22',
        'border-subtle': 'rgba(255, 255, 255, 0.06)',
        'border-default': 'rgba(255, 255, 255, 0.10)',
        'border-strong': 'rgba(255, 255, 255, 0.16)',
        'text-primary': '#F5F5F7',
        'text-secondary': '#A1A1AA',
        'text-muted': '#6B6B75',
        'accent-amber': '#F59E0B',
        'amber-soft': 'rgba(245, 158, 11, 0.12)',
        'accent-indigo': '#6366F1',
        'indigo-soft': 'rgba(99, 102, 241, 0.12)',
        success: '#34D399',
        'success-soft': 'rgba(52, 211, 153, 0.12)',
        warning: '#FBBF24',
        'warning-soft': 'rgba(251, 191, 36, 0.12)',
        danger: '#F87171',
        'danger-soft': 'rgba(248, 113, 113, 0.12)',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.03em',
        eyebrow: '0.14em',
      },
      borderRadius: {
        'card': '24px',
        'panel': '16px',
        'control': '14px',
      },
      boxShadow: {
        'glow-amber': '0 8px 32px -8px rgba(245, 158, 11, 0.5)',
        'glow-amber-lg': '0 12px 40px -6px rgba(245, 158, 11, 0.6)',
        'glow-indigo': '0 8px 32px -8px rgba(99, 102, 241, 0.45)',
        'glass-card': '0 20px 60px -20px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
