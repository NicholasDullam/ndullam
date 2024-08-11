const { plugins } = require("prismjs");
const { transform } = require("typescript");
const { content, theme } = require("./tailwind.config");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        grow: "grow 1.5s ease infinite",
        fade: "fade 500ms ease",
        left: "left 300ms ease",
      },
      keyframes: {
        grow: {
          "0%": {
            transform: "scale(1)",
            opacity: "0.5",
          },
          "50%": {
            transform: "scale(2)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "0.5",
          },
        },
        fade: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        left: {
          "0%": {
            paddingRight: "-20px",
          },
          "100%": {
            paddingRight: "40px",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
