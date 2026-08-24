import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          accent: '#E5A93C',
          glow: 'rgba(229, 169, 60, 0.15)',
        },
        dark: {
          950: '#070709',
          900: '#0c0c0e',
          850: '#121215',
          800: '#17171c',
          750: '#1f1f26',
          700: '#272730',
          600: '#3a3a46',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      transitionTimingFunction: {
        'fluid': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'bezel-dark': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'bezel-amber': 'inset 0 1px 1px 0 rgba(251, 191, 36, 0.3), 0 10px 25px -5px rgba(229, 169, 60, 0.25)',
        'card-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 20px rgba(229, 169, 60, 0.12)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
