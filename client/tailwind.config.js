/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./node_modules/flowbite/**/*.js"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        // Main Global Background
        background: "#0D0D15",
        // Other backgrounds
        surface: "#1A1A24",
        card: "#1F1F29",
        modal: "rgba(13, 13, 21, 0.9)",
        // Text colors
        text: {
          primary: "#FFFFFF",
          secondary: "#BDBDBD",
          dark: "#7E7E7E",
          error: "#FF3E3E",
        },
        // Button colors
        button: {
          primary: {
            light: "#5E73FF",
            DEFAULT: "#35459E",
            dark: "#222E5F",
          },
          secondary: {
            light: "#FF8E44",
            DEFAULT: "#E65E00",
            dark: "#A04300",
          },
        },
        // Severity levels
        severity: {
          severe: "#FF3E3E",
          moderate: "#F29E4E",
          minor: "#FFD700",
          info: "#40BFFF",
          success: "#4CAF50",
        },
        // threat and Suspicious
        threat: {
          threat: "#FF3838",
          suspicious: "#FFD700",
        },
        // Inputs
        input: {
          large: {
            DEFAULT: "#1F1F29",
            focus: "#222E5F",
            error: "#FF3838",
            success: "#4CAF50",
          },
        },
        // HR colors
        hr: {
          light: "#BDBDBD",
          dark: "#7E7E7E",
          kaspersky: "#d0d7fb2b",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
