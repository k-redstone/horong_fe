import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        theme: '#a4c7fe',

        warning: '#F26B76',
        primary: '#ACBEFF',

        'text-disabled': 'rgba(255, 255, 255, 0.38)',
        'text-md': 'rgba(255, 255, 255, 0.6)',
        'text-high': 'rgba(255, 255, 255, 0.87)',

        'grey-100': '#090A0C',
        'grey-90': '#121318',
        'grey-80': '#1B1D24',
        'grey-70': '#2D303B',
        'grey-60': '#424754',
        'grey-50': '#575C6D',
        'grey-40': '#6D7387',
        'grey-30': '#888EA1',
        'grey-20': '#A1A5B5',
        'grey-10': '#BDC1CF',
      },
      fontSize: {
        '3xl': ['1.5rem', { lineHeight: '2rem' }],
        '2xl': ['1.375rem', { lineHeight: '1.875rem' }],
        xl: ['1.25rem', { lineHeight: '1.625rem' }],
        lg: ['1.125rem', { lineHeight: '1.5rem' }],
        md: ['1rem', { lineHeight: '1.375rem' }],
        sm: ['.875rem', { lineHeight: '1.25rem' }],
        xs: ['.75rem', { lineHeight: '1rem' }],
        'xs-bold': ['.75rem', { lineHeight: '1rem', fontWeight: 'bold' }],
        '2xs': ['.6875rem', { lineHeight: '.875rem' }],
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
