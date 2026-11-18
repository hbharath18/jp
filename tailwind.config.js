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
        base: '#0A0D12',
        surface: '#10151C',
        elevated: '#161C25',
        hover: '#1B222D',
        'border-default': 'rgba(148, 163, 184, 0.12)',
        'border-strong': 'rgba(148, 163, 184, 0.22)',
        'text-primary': '#E5E9F0',
        'text-secondary': '#9AA4B2',
        'text-muted': '#667085',
        emerald: {
          DEFAULT: '#2FBF8F',
          hover: '#249E76',
          soft: 'rgba(47, 191, 143, 0.12)',
        },
        slate: {
          accent: '#7C8DB5',
          soft: 'rgba(124, 141, 181, 0.12)',
        },
        warning: {
          DEFAULT: '#C9A66B',
          soft: 'rgba(201, 166, 107, 0.12)',
        },
        danger: {
          DEFAULT: '#E07A7A',
          soft: 'rgba(224, 122, 122, 0.12)',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tight: '-0.02em',
        eyebrow: '0.12em',
      },
      borderRadius: {
        card: '20px',
        panel: '16px',
        control: '12px',
      },
      boxShadow: {
        subtle: '0 4px 16px -2px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
