/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nova-bg': '#FAF9F6',
        'nova-card': '#FFFFFF',
        'nova-charcoal': '#1A1D20',
        'nova-muted': '#6B7280',
        'nova-coral': '#FF6B6B',
        'nova-lavender': '#A78BFA',
        'nova-mint': '#34D399',
        'nova-yellow': '#FCD34D',
      },
      boxShadow: {
        'nova-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'nova-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
