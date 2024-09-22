/** @type {import('tailwindcss').Config} */

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ['"Sora"', "sans-serif"],
            serif: ['"Rubik"', "serif"],
            body: ['"Sora"', "sans-serif"],
        },
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};
