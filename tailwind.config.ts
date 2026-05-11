import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#004225',
        accent: '#B8860B',
        surface: '#FDFCF0',
        'text-dark': '#1A1A1A',
        'text-muted': '#6B6B5E',
        available: '#2D6A4F',
        reserved: '#B8860B',
        sold: '#7B2D2D',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      letterSpacing: {
        wider: '0.2em',
      },
      keyframes: {
        'pulse-ring': {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1.2)',
            opacity: '0',
          },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s infinite',
      },
    },
  },
  plugins: [],
}

export default config
