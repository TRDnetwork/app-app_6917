// PERF: Self-hosted Tailwind config to reduce reliance on CDN and enable JIT
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#faf8f5',
        'surface': '#ffffff',
        'text': '#1a2e1a',
        'text-dim': '#5a5a5a',
        'accent': '#e66000',
        'accent-alt': '#ff8c42',
      },
      fontFamily: {
        sans: ['Satoshi', 'ui-sans-serif'],
        display: ['Fraunces', 'ui-serif'],
      },
      letterSpacing: {
        tight: '-0.05em',
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}