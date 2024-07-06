/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary-muted": "oklch(var(--primary-muted) / <alpha-value>)",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          // importing the built-in 'light' theme
          // and setting the color values for '--primary-muted'
          // (numbers are OKLCH values)
          ...require("daisyui/src/theming/themes")["black"],
          "--primary-muted": "65% 0.2 295",
        },
      },
    ],
  },
};
