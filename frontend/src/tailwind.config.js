/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        harry: {
          dark: '#1a1a2e',
          gold: '#d4af37',
          red: '#8b0000',
          parchment: '#f5e6d3',
        }
      },
    },
  },
  plugins: [],
}
