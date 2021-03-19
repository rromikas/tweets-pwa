const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  important: true,

  theme: {
    filter: {
      invert: "invert(0.7)",
    },
    fontFamily: {
      jost: ["Jost", "sans-serif"],
    },
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    colors: {
      green: "#4fff9e",
      blue: {
        500: "#524eee",
        501: "#403bed",
        502: "#1B189D",
        600: "#26264e",
        700: "#1d1d42",
        800: "#141432",
        900: "#101028",
        1000: "#0e0e26",
      },
      red: { 500: "#ff4f4f", 501: "#f93f3f", 502: "#AA2929" },
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      yellow: colors.amber,
    },
  },

  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [
    require("tailwindcss-filters"),
    require("tailwind-bootstrap-grid")({
      containerMaxWidths: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    }),
  ],
};
