/** @type {import(tailwindcss).Config} */ export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "primary-blue": "#0D1931",
      },
      boxShadow: {
        "custom-light": "0px 1px 4px rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [],
};
