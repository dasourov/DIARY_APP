/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        vt323: ["VT323", "monospace"],
      },
      boxShadow: {
        custom: [
          "5px 5px rgba(58, 27, 86, 0.4)",
          "10px 10px rgba(58, 27, 86, 0.3)",
          "15px 15px rgba(58, 27, 86, 0.2)",
          "20px 20px rgba(58, 27, 86, 0.1)",
          "25px 25px rgba(58, 27, 86, 0.05)",
        ],
      },
    },
  },
  plugins: [],
};
