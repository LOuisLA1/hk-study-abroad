/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hk: {
          navy: '#0b1e36',
          blue: '#163b65',
          gold: '#c5a059',
          amber: '#e5b869',
          emerald: '#0f766e',
          ruby: '#991b1b',
          sand: '#faf8f5',
          card: '#ffffff',
          darkcard: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(15, 31, 56, 0.08)',
        'premium': '0 20px 40px -15px rgba(11, 30, 54, 0.12)',
        'glow': '0 0 25px rgba(197, 160, 89, 0.35)',
      }
    },
  },
  plugins: [],
}
