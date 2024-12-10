import typographyPlugin from "@tailwindcss/typography";

/** @typ/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typographyPlugin],
};
