/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',//kyo ki ham class me use kre ge//defult(  darkMode: 'selector',)
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}