/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magic: {
          primary: '#0f0c29',
          secondary: '#302b63',
          accent: '#24243e',
          gold: '#ffd700',
          silver: '#c0c0c0',
          spell: '#9370db',
        }
      },
      fontFamily: {
        title: ['Cinzel', 'serif'],
        body: ['Inter', 'sans-serif'],
        magic: ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-15px) rotate(5deg)' },
          '66%': { transform: 'translateY(8px) rotate(-3deg)' },
        },
        glow: {
          '0%': { textShadow: '0 0 5px rgba(255,215,0,0.5)' },
          '100%': { textShadow: '0 0 20px rgba(255,215,0,0.8)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.5, transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
