/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Bright, playful color palette for children
        'sunshine': '#FFB703',
        'ocean': '#8ECAE6', 
        'deep-ocean': '#219EBC',
        'coral': '#FF6B6B',
        'lemon': '#FFD166',
        'mint': '#06FFA5',
        'lavender': '#B19CD9',
        'peach': '#FFB5A7'
      },
      fontFamily: {
        'heading': ['Baloo 2', 'cursive'],
        'body': ['Nunito', 'sans-serif'],
        'fun': ['Fredoka', 'cursive']
      },
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};