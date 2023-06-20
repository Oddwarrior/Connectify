/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "text-primary": "#343A40",
        "text-secondary": "#ADB5BD",
        "backgroundBody": "#F7F7F7",
        "background": "#fafaff",
        "background-secondary": "#DEE2E6",
        "accent": "#48cae4",

        "backgroundBody-dark": '#082032',
        "background-dark": '#2C394B',
        "background-seondary-dark": "#526D82 ",
        "text-primary-dark": "#DEE2E6",
        "text-secondary-dark": "#9DB2BF",
      },
      fontFamily: {
        "poppins": ["Poppins"]
      }
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp')
  ],
}

