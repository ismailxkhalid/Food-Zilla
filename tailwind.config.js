/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // Include App files in the root
    "./src/**/*.{js,jsx,ts,tsx}", // Include all files within the src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
