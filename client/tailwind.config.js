/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "text-primary": "#343A40",
        "text-secondary": "#ADB5BD",
        "background": "#F0F3F6",
        "background-dark": "#DEE2E6",
        "accent": "#48cae4"
      },
      fontFamily: {
        "poppins": ["Poppins"]
      }
    },
  },
  plugins: [],
}

