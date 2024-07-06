import {tailwindColors} from "./src/index.js";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: tailwindColors,
    extend: {},
  },
  plugins: [],
}