/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'from-orange-500',
    'to-red-600',
    'from-blue-500',
    'to-purple-600',
    'bg-orange-500',
    'bg-red-500',
    'bg-blue-600',
    'bg-purple-600',
    'text-orange-500',
    'text-orange-400',
    'border-orange-500',
    'ring-orange-500',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        basketball: {
          orange: '#FF6B35',
          dark: '#1a1a2e',
          court: '#CD853F',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
