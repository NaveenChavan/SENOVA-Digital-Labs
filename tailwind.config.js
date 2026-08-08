/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4k': '2560px',
      },
      colors: {
        bg: {
          primary: '#0b1120',
          secondary: '#070b14',
          elevated: '#131c2e',
        },
        surface: '#131c2e',
        accent: {
          DEFAULT: '#2563EB',
          hover: '#3B82F6',
        },
        text: {
          primary: '#ffffff',
          secondary: '#9999a1',
          muted: '#6b6b72',
        },
        border: {
          DEFAULT: '#22304a',
          soft: '#22304a',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(37, 99, 235, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
