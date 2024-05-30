const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4ED1F8",
        secondary: "#3c9184",
        background: "#F6FCFE",
        black: "#222222",
        white: "#ffffff",
        success: "#23d97e",
        alert: "#f45050",
        notice: "#fbd605",
        offWhite: "#ddf6f1",
        grayText: "#374151",
        gradient1: "#04B4E8",
        gradient2: "#9CE0FF",
        gradient3: "#D8F3FF",
        blue1: "#47C8EE"
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        open: ["Open Sans", "sans-serif"]
      },
      lineHeight: {
        'custom': '3.2rem', // Add custom line height
      },
      fontSize: {
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px
        'xl': '1.25rem',    // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.6rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
        '7xl': '4.5rem',    // 72px
        '8xl': '6rem',      // 96px
        '9xl': '8rem',      // 128px
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#cdcdcd',
            borderRadius: '6px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#A8A8A8',
            cursor: 'pointer',
          },
        },
      }

      addUtilities(newUtilities, ['responsive'])
    }
  ],
});
