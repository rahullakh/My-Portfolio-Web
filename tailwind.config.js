/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translate(-50%, -150%)', opacity: '0' },
          '100%': { transform: 'translate(-50%, -25%)', opacity: '1' },
        },
      },
      animation: {
        slideDown: 'slideDown 1s ease forwards',
      },
    },
  },
  plugins: [],
}

