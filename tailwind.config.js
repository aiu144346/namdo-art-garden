/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFAF0', // Warm White
        surface: '#F5F5DC',    // Beige
        primary: {
          DEFAULT: '#228B22',  // Forest Green
          foreground: '#FFFFFF',
          dark: '#1b6e1b',     // Hover state
        },
        muted: '#A9A9A9',
      },
      fontFamily: {
        serif: ['"Nanum Myeongjo"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'slow-zoom': 'slow-zoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
