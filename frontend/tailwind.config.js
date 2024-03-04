/** @type {import('tailwindcss').Config} */
export default {
  server: {
    host: '0.0.0.0',
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}