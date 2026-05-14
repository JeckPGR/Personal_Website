/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0a0a12',
        surface: 'rgba(255,255,255,0.03)',
        'surface-hover': 'rgba(255,255,255,0.06)',
        border: 'rgba(255,255,255,0.08)',
        'border-accent': 'rgba(120,80,220,0.25)',
        'accent-purple': '#7c50e0',
        'accent-violet': '#c060f0',
        'accent-lavender': '#c9bfff',
        'text-primary': '#f0ecff',
        'text-secondary': '#9d92cc',
        'text-muted': '#6e6898',
        'green-status': '#4fd080',
        'green-bg': 'rgba(80,200,120,0.13)',
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
