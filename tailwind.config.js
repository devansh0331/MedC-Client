/** @type {import('tailwindcss').Config} */

import withMe from "@material-tailwind/react/utils/withMT";

export default withMe({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#01bcf4",
        secondary: "#3c9184",
        black: "#222222",
        white: "#ffffff",
        success: "#23d97e",
        alert: "#f45050",
        notice: "#fbd605",
        offWhite: "#ddf6f1",
        grayText: "#374151",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
});
