/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/.*/*.{js,ts,jsx,tsx}", // 🔥 Include one-level dot folders
    "./src/**/.*/**/*.{js,ts,jsx,tsx}", // 🔥 Include nested dot folders
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
