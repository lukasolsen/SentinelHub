/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./node_modules/flowbite/**/*.js"],
  darkMode: "media",
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
