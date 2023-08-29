/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./node_modules/flowbite/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Global Colors
        background: "#0D0D15",
        // Other backgrounds
        surface: "#1A1A24",
        card: "#1F1F29",
        modal: "rgba(13, 13, 21, 0.9)",
        primary: "#5E73FF",
        secondary: "#FF8E44",

        // Text Colors
        bodyTextWhite: "#20242c",
        // ... (other colors)
      },
      fontSize: {
        // Font Sizes
        xs: "0.625rem", // 10px
        sm: "0.75rem", // 12px
        mid_sm: "0.8125rem", // 13px
        base: "0.900rem", // 14px
        lg: "1rem", // 16px
        xl: "1.125rem", // 18px
        // ... (other font sizes)
      },

      severity: {
        severe: "#FF3E3E",
        moderate: "#F29E4E",
        minor: "#FFD700",
        info: "#40BFFF",
        success: "#4CAF50",
      },
      components: {
        // Pre-defined Components
        card: {
          backgroundColor: "#1F1F29",
          borderColor: "#333",
          padding: "1rem",
          borderRadius: "0.5rem",
        },
        button: {
          primary: {
            backgroundColor: "#5E73FF",
            textColor: "#FFFFFF",
            hoverBackgroundColor: "#35459E",
          },
          secondary: {
            backgroundColor: "#FF8E44",
            textColor: "#FFFFFF",
            hoverBackgroundColor: "#E65E00",
          },
          // ... (other button styles)
        },
        // Severity levels

        // Threat and Suspicious
        threat: {
          threat: "#7E0A0A", // Darker red
          suspicious: "#9A8400", // Darker yellow
          safe: "#4CAF50", // Darker green
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
